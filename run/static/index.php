<?php
define('APPPATH', dirname(dirname(dirname(__FILE__))));
/**
 * configs
 * 
 * 
 */
$runtime = new Runtime();










$_conf = [
	'scope'	=>	[
		'magister'	=>	'/run/static/themes/magister/',
	],
	'content_type'	=>	[
		'css'	=>	'text/css',
		'less'	=>	'text/css',
		'js'	=>	'application/x-javascript'
	],
	'compress'	=>	TRUE,
	'cache'		=>	TRUE,
	'cache_dir'	=>	'/cache/compose',
	'cache_expire_time'	=>	'30 days',
];












$runtime->start();
/*
 * compose start
 * 
 */
$output = '';
$files = query_string_to_file($_conf);
$runtime->stop('(parsurl)');
header('Content-Type:' . (isset($_conf['content_type'][$files['is_file'][0]['type']]) ? $_conf['content_type'][$files['is_file'][0]['type']] : 'text/html'));


if (!empty($files['is_file'])) {
	$output = get_file($files['is_file'], $_conf, $runtime);
}
/*
 * compose end
 */


header('Dump-runtime:' . implode(',', $runtime->spent()));
echo $output;
/**
 * functions
 * 
 * 
 */

function query_string_to_file($_conf = []) {
	$files = [
		'is_file'	=>	[],
		'not_file'	=>	[],
	];
	$_file_arr = explode(';', $_SERVER['QUERY_STRING']);
	
	if (count($_file_arr) > 0) {
		foreach ($_file_arr as $_file) {
			$_file = explode('!', $_file);
			$_arr = explode('/', $_file[0]);
			$tmp_file = [
				'path'	=>	'',
				'error'	=>	'',
				'scope'	=>	'',
				'type'	=>	'',
				'attr'	=>	[],
			];
			//处理文件属性
			if (isset($_file[1])) $tmp_file['attr'] = explode(',', $_file[1]);
			switch (count($_arr)) {
				case 2:
					//default scope
					
					$tmp_file['path'] = pos($_conf['scope']) . $_arr[0] . '/' . $_arr[1] . '.' . $_arr[0];
					$tmp_file['scope'] = array_keys($_conf['scope'], pos($_conf['scope']));
					$tmp_file['type'] = $_arr[0];
					break;
				case 3:
					if (empty($_arr[0])) {
						$tmp_file['path'] = pos($_conf['scope']) . $_arr[1] . '/' . $_arr[2] . '.' . $_arr[1];
						$tmp_file['scope'] = array_keys($_conf['scope'], pos($_conf['scope']));
						$tmp_file['type'] = $_arr[1];
					}
					elseif (!isset($_conf['scope'][$_arr[0]])) {
						$tmp_file['error'] = 'no this scope';
						$tmp_file['scope'] = $_arr[0];
						$tmp_file['type'] = $_arr[1];
					}
					else {
						$tmp_file['path'] = $_conf['scope'][$_arr[0]] . $_arr[1] . '/' . $_arr[2] . '.' . $_arr[1];
						$tmp_file['scope'] = $_arr[0];
						$tmp_file['type'] = $_arr[1];
					}
					break;
				default:
					break;
			}
			
			
			
			if (empty($tmp_file['error']) && is_file(APPPATH . $tmp_file['path'])) $files['is_file'][] = $tmp_file;
			else $files['not_file'][] = $tmp_file;
		}
	}
	
	return $files;
}

function get_file($_files, $_conf, $_runtime) {
	$_result = '';
	foreach ($_files as $file) {
		$content = FALSE;
		/**
		 * if cache enabled, get cache first.
		 */
		
		if ($_conf['cache'] === TRUE && !in_array('no-cache', $file['attr']) && check_cache($file['path'], $_conf['cache_dir'], $_conf['cache_expire_time'])) {
			$_runtime->start();
			$content = get_cache($file['path'], $_conf['cache_dir'], $_runtime);
			$_runtime->stop($file['path'].'(cached)');
		}
		/**
		 * get cache failed, get content normally.
		 */
		if ($content === FALSE) {
			$_compress = $_conf['compress'];
			if (in_array('no-compress', $file['attr'])) $_compress = FALSE;
			
			$content = parse_file(APPPATH . $file['path'], $file['type'], $_compress, $_runtime);
			/**
			 * put cache.
			 */
			if ($_conf['cache'] === TRUE) put_cache($file['path'], $_conf['cache_dir'], $content);
		}
		if ($content !== FALSE) {
			$_result .= '/*!
 * SAS Composer 0.1.0
 * http://www.07studio.org
 * @断翅lv26(weibo.com/shijingye)
 * file:' . $file['path'] . '
 * type:' . $file['type'] . '
 *---file start-----------------------------------------------*/
' . $content . '
/*!-----------------------------------------------file end---*/

';
		}
	}
	
	return $_result;
}

function parse_file($_file, $_type, $_compress = FALSE ,$_runtime) {
	$_result = FALSE;
	$_runtime->start();
	switch ($_type) {
		case 'less':
			$_result = exec_less($_file, $_compress);
			break;
		case 'css':
			$_result = exec_css($_file, $_compress);
			break;
		case 'js':
			$_result = exec_js($_file, $_compress);
			break;
		default:
			
			break;
	}
	$_runtime->stop($_file.'(compose)');
	/**
	 * 
	 * compress if defined
	 * 
	 * 
	 */
	$_runtime->start();
	if ($_compress === TRUE && $_result != FALSE) {
	
		if ($_type == 'css' || $_type == 'less') {
			if (!class_exists('CSSmin')) {
				include_once APPPATH . '/libraries/Access/Compose/Css.php';
			}
			$compressor = new \Access\Compose\CSSmin();
			$_result = $compressor->run($_result, 5000);
		}
		elseif ($_type == 'js') {
			if (!class_exists('JSMinPlus')) {
				include_once APPPATH . '/libraries/Access/Compose/Jsplus.php';
			}
			$_result = \Access\Compose\JSMinPlus::minify($_result);
		}
	}
	$_runtime->stop($_file.'(compress)');
	
	return $_result;
}

function exec_less ($_file, $_compress = FALSE) {
	if (!class_exists('lessc')) {
		include_once APPPATH . '/libraries/Access/Compose/Less.php';
	}
	$_result = FALSE;
	
	$less_handler = new \Access\Compose\lessc();
	try {
		$_result = $less_handler->compileFile($_file);
	} catch (exception $e) {
		echo "fatal error: " . $e->getMessage();
	}
	
	return $_result;
}

function exec_css($_file, $_compress = FALSE) {
	return file_get_contents($_file);
}

function exec_js($_file, $_compress = FALSE) {
	return file_get_contents($_file);
}


function check_cache($_file, $_cache_dir = '' , $_cache_expire_time = '30 days') {
	$_result = FALSE;
	$hash = md5($_file);
	$cache_time = ( is_file(APPPATH . $_cache_dir . DIRECTORY_SEPARATOR . $hash . '.compcache') ? filemtime(APPPATH . $_cache_dir . DIRECTORY_SEPARATOR . $hash . '.compcache') : 0);
	
	//if less/css file perhaps @import
	/*if (($_file_type == 'less' || $_file_type == 'css') && ($cache_time > strtotime('-' . $_cache_expire_time))) {
		//check if has @import
	}*/
	/**
	 * @todo to get how to detect @import file changed
	 */
	if ((filemtime(APPPATH . $_file) > $cache_time) || ($cache_time < strtotime('-' . $_cache_expire_time))) ;
	else $_result = TRUE;
	
	return $_result;
}

function get_cache($_file, $_cache_dir = '') {
	return file_get_contents(APPPATH . $_cache_dir . DIRECTORY_SEPARATOR . md5($_file) . '.compcache');
}

function put_cache($_file, $_cache_dir = '', $_data) {
	return file_put_contents(APPPATH . $_cache_dir . DIRECTORY_SEPARATOR . md5($_file) . '.compcache', $_data);
}



class Runtime {
	private $start_time = 0;
	private $stop_time = 0;
	private $spend_time = [];
	private $total_time = 0;

	function __construct() {
		$this->total_time = $this->get_microtime();
	}
	function __destruct() {
	}

	function get_microtime()
	{
		list($usec, $sec) = explode(' ', microtime());
		return ((float)$usec + (float)$sec);
	}

	function start()
	{
		$this->start_time = $this->get_microtime();
	}

	function stop($_flag = '')
	{
		$this->stop_time = $this->get_microtime();
		$this->_spent($_flag);
	}
	
	private function _spent($_flag = '')
	{
		$time = round(($this->stop_time - $this->start_time) * 1000, 1);
		$this->spend_time[] = (!empty($_flag) ? '[' . $_flag . ']' : '') .$time.' ms';
	}
	
	function spent() {
		$this->total();
		return $this->spend_time;
	}
	
	function total() {
		$this->spend_time[] = '[total]' .round(($this->get_microtime() - $this->total_time) * 1000, 1).' ms';
	}

}

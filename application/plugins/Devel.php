<?php
/* 
 * @todo 完善header信息写入
 */
class DumpPlugin extends Yaf\Plugin_Abstract {
	private $_config;
	private $_runtime;
	
	function __construct() {
		$this->_runtime = new \Dump\Runtime();
	}
	public function routerStartup(Yaf\Request_Abstract $request, Yaf\Response_Abstract $response) {
		if ($this->_config['enable_runtime']) $this->_runtime->start();
	}

	public function routerShutdown(Yaf\Request_Abstract $request, Yaf\Response_Abstract $response) {
	}

	public function dispatchLoopStartup(Yaf\Request_Abstract $request, Yaf\Response_Abstract $response) {
	}

	public function preDispatch(Yaf\Request_Abstract $request, Yaf\Response_Abstract $response) {
	}

	public function postDispatch(Yaf\Request_Abstract $request, Yaf\Response_Abstract $response) {
	}

	public function dispatchLoopShutdown(Yaf\Request_Abstract $request, Yaf\Response_Abstract $response) {
			$this->_runtime->stop();
			header('Dump-Runtime:'.$this->_runtime->spent());
	}
	
	public function preResponse(Yaf\Request_Abstract $request, Yaf\Response_Abstract $response) {
		
	}
}
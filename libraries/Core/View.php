<?php
/**
 * Created by PhpStorm.
 * User: lovemybud
 * Date: 14/7/18
 * Time: 22:42
 */

namespace Core;


class View {

	protected static $_engine   = 'Blitz';

	private static $__instance  = NULL;


	public static function initialize($_request = NULL, $_options = [], $_engine = NULL) {
		$_config = get_config('application.view');
		$_engine == NULL ? $_engine = $_config->engine : FALSE;
		self::$_engine = $_engine;

		$_class = '\Core\View\\'. $_engine;
		$_options = self::_parse_options($_config, $_options);

		self::$__instance = new $_class($_options);
		self::$__instance->setScriptPath(
			$_config->template_dir_prefix
			.
			(strtolower($_request->module) == 'index' ? '' : DIRECTORY_SEPARATOR.'modules'.DIRECTORY_SEPARATOR.$_request->module)
			.
			$_config->template_dir);
	}

	public static function get_instance() {
		return self::$__instance;
	}

	protected static function _parse_options($_common_options = NULL, $_extend_options = []) {
		$_result = [];
		$_engine = strtolower(self::$_engine);
		foreach ($_common_options as $_key => $_value) {
			if (!is_object($_value)) {
				$_result[$_key] = $_value;
			} elseif ($_key == $_engine) {
				foreach($_value as $_sub_key => $_sub_value) {
					$_result[$_sub_key] = $_sub_value;
				}
			}
		}

		return array_merge($_result, $_extend_options);
	}

} 
<?php
class ViewPlugin extends Yaf\Plugin_Abstract {

	function __construct() {

	}
	public function routerStartup(Yaf\Request_Abstract $request, Yaf\Response_Abstract $response) {
		ob_start();
	}
	
	public function routerShutdown(Yaf\Request_Abstract $request, Yaf\Response_Abstract $response) {
		
		/*$script_path =
			\Yaf\Registry::get('config')->application->view->template_dir_prefix
			.
			(strtolower($request->module) == 'index' ? '' : DIRECTORY_SEPARATOR.'modules'.DIRECTORY_SEPARATOR.$request->module)
			.
			\Yaf\Registry::get('config')->application->view->template_dir;
		
		\Adapter::init('\Core\View',[$script_path, Yaf\Registry::get('config')->get('application')->get('view')]);
		$_GUID = get_guid($request);
		\Adapter::getInstance('\Core\View')->assign('_URI', [
			'GUID'			=>	(empty($_GUID) ? '/' : $_GUID),
			'module'		=>	strtolower($request->module),
			'controller'	=>	strtolower($request->controller),
			'action'		=>	strtolower($request->action),
		]);*/
		
	}
	
	public function dispatchLoopStartup(Yaf\Request_Abstract $request, Yaf\Response_Abstract $response) {
		//Yaf\Dispatcher::getInstance()->setView(\Adapter::getInstance('\Core\View'));
		\Core\View::initialize($request);
		Yaf\Dispatcher::getInstance()->setView(\Core\View::get_instance());
	}
	
	public function preDispatch(Yaf\Request_Abstract $request, Yaf\Response_Abstract $response) {

	}
	
	public function postDispatch(Yaf\Request_Abstract $request, Yaf\Response_Abstract $response) {

	}
	
	public function dispatchLoopShutdown(Yaf\Request_Abstract $request, Yaf\Response_Abstract $response) {

	}
	
	public function preResponse(Yaf\Request_Abstract $request, Yaf\Response_Abstract $response) {

	}
}
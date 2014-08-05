<?php
class DashboardPlugin extends Yaf\Plugin_Abstract {
	
	protected $_config = [
		'menu'	=>	[
			[
				'name'			=>	'分类目录',
				'title'			=>	'Category',
				'img'			=>	'<i class="glyphicon glyphicon-list"></i> ',
				'GUID'			=>	'dashboard',
				'sub_menu'		=>	[
					[
						'name'	=>	'新目录',
						'title'	=>	'New Category',
						'img'	=>	'',
						'GUID'	=>	'dashboard/category/new_category',
					],
					[
						'name'	=>	'目录管理',
						'title'	=>	'Category List',
						'img'	=>	'',
						'GUID'	=>	'dashboard/category',
					],
				],
			],
				
			[
				'name'			=>	'页面',
				'title'			=>	'Page',
				'img'			=>	'<i class="glyphicon glyphicon-file"></i> ',
				'GUID'			=>	'dashboard/page',
				'sub_menu'		=>	[
					[
						'name'	=>	'新页面',
						'title'	=>	'New Page',
						'img'	=>	'',
						'GUID'	=>	'dashboard/page/new_page',
					],
					[
						'name'	=>	'页面管理',
						'title'	=>	'Page List',
						'img'	=>	'',
						'GUID'	=>	'dashboard/page',
					],
				],
			],
				
			[
				'name'			=>	'内容',
				'title'			=>	'Content',
				'img'			=>	'<i class="glyphicon glyphicon-barcode"></i> ',
				'GUID'			=>	'dashboard/content',
				'sub_menu'		=>	[
					[
						'name'	=>	'新内容',
						'title'	=>	'New Content',
						'img'	=>	'',
						'GUID'	=>	'dashboard/content/new_content',
					],
					[
						'name'	=>	'页面管理',
						'title'	=>	'Content List',
						'img'	=>	'',
						'GUID'	=>	'dashboard/content',
					],
				],
			],
				
			[
				'name'			=>	'站点设置',
				'title'			=>	'Settings',
				'img'			=>	'<i class="glyphicon glyphicon-cog"></i> ',
				'GUID'			=>	'dashboard/settings',
				'sub_menu'		=>	NULL,
			],
				
			[
				'name'			=>	'系统状态',
				'title'			=>	'Status',
				'img'			=>	'<i class="glyphicon glyphicon-hdd"></i> ',
				'GUID'			=>	'dashboard/status',
				'sub_menu'		=>	NULL,
			],
		],
	];
	
	function __construct() {
	}
	function __destruct() {
	}
	
	public function routerStartup(Yaf\Request_Abstract $request, Yaf\Response_Abstract $response) {
		
	}
	
	public function routerShutdown(Yaf\Request_Abstract $request, Yaf\Response_Abstract $response) {
		if (strtolower($request->module) == 'dashboard') {
			
			$this->_get_active_menu($this->_config['menu'], get_guid($request));
			\Adapter::getInstance('\View')->assign('_DASHBOARD', $this->_config);
			\Adapter::init('\Dashboard\Profile');
		
			//check login
		
			if (\Adapter::getInstance('\Dashboard\Profile')->check_login() && strtolower($request->controller == 'profile') && $request->action == 'login') {
				//已经登录 && 当前controller = login, 跳转到dashboard
				header('Location: /dashboard');
				
			} elseif (!\Adapter::getInstance('\Dashboard\Profile')->check_login() && strtolower($request->controller) == 'profile' && $request->action == 'login') {
		
				//没有登录 && 当前controller = login, 不调转
		
			} elseif (!\Adapter::getInstance('\Dashboard\Profile')->check_login()) {
				//没有登录 跳转到 dashboard/login
				header('Location: /dashboard/profile/login');
			}
			\Adapter::getInstance('\View')->assign('_USER', $_SESSION['user']);
		}
	}
	
	public function dispatchLoopStartup(Yaf\Request_Abstract $request, Yaf\Response_Abstract $response) {
	
	}
	
	public function preDispatch(Yaf\Request_Abstract $request, Yaf\Response_Abstract $response) {
	
	}
	
	public function postDispatch(Yaf\Request_Abstract $request, Yaf\Response_Abstract $response) {
	
	}
	
	public function dispatchLoopShutdown(Yaf\Request_Abstract $request, Yaf\Response_Abstract $response) {
	
	}
	
	public function preResponse(Yaf\Request_Abstract $request, Yaf\Response_Abstract $response) {
	
	}
	
	private function _get_active_menu (&$_menu, $_GUID) {
		$_result = FALSE;
	
		foreach ($_menu as $key => $item) {
			if ($_GUID == $item['GUID']) {
				$_menu[$key]['active'] = TRUE;
				$_result = TRUE;
				break;
			} elseif (isset($item['sub_menu']) && $this->_get_active_menu($_menu[$key]['sub_menu'], $_GUID)) {
				$_menu[$key]['active'] = TRUE;
				$_result = TRUE;
				break;
			}
		}
	
		return $_result;
	}
}

?>
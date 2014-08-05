<?php

class PostsController extends Yaf\Controller_Abstract {
	public function indexAction($query_string) {
		$_catalog_handler		= new CatalogModel();
		$_post_handler			= new PostModel();
		
		$_POST = $_post_handler->get($query_string, TRUE);
		
		$_CATALOG = FALSE;
		
		$_RESULT = FALSE;
		
		//GET CATALOG
		if (isset($_POST['type']) && ($_POST['type'] != 'catalog' && $_POST['type'] != 'page')) {
			$_CATALOG = $_catalog_handler->get($_POST['page_GUID'], 'published', FALSE, TRUE);;
		} else{
			$_CATALOG = $_catalog_handler->get($query_string, 'published', FALSE, TRUE);;
		}
		
		//GET_RESULT


		if(!empty($_POST)) {
			$_RESULT = [
				'page_title'	=>	$_catalog_handler->get_title($_CATALOG)
			];
			//GET PARENT POST TO LIST
			if ($_POST['type'] != 'catalog') {
				$_PARENT_POST = $_post_handler->get($_POST['page_GUID'], TRUE);
				$_RESULT['related'] = $_post_handler->get_related($_PARENT_POST['GUID'], FALSE, $_PARENT_POST['related_type']);
			} else {
				$_RESULT['related'] = $_post_handler->get_related($query_string, FALSE, $_POST['related_type']);
			}
		}

		//IF CATALOG OR PAGE, CHANGE
		//取消默认显示收个列表项目
		/*if (isset($_POST['type']) && isset($_POST['show_in_nav']) && ($_POST['show_in_nav'] == '1')) {
			
			if(isset($_RESULT['related']['posts']) && $_RESULT['related']['posts'] != FALSE) {
				$_POST = $_post_handler->get($_RESULT['related']['posts'][0]['GUID'], TRUE);
			}
		}*/
		
		$_POST['objects'] = json_decode($_POST['objects'],TRUE);

		$this->getView()->_CATALOG = $_CATALOG;
		$this->getView()->_POST = $_POST;
		$this->getView()->_RESULT = $_RESULT;

		return TRUE;
	}
	
	public function jewelriesAction($query_string) {
		$_catalog_handler		= new CatalogModel();
		$_post_handler			= new PostModel();
		
		$_POST = $_post_handler->get($query_string, TRUE);
		
		$_CATALOG = FALSE;
		
		$_RESULT = FALSE;
		
		//GET CATALOG
		if (isset($_POST['type']) && ($_POST['type'] != 'catalog' && $_POST['type'] != 'page')) {
			$_CATALOG = $_catalog_handler->get($_POST['page_GUID'], 'published', FALSE, TRUE);;
		} else{
			$_CATALOG = $_catalog_handler->get($query_string, 'published', FALSE, TRUE);;
		}
		
		//GET_RESULT
		if(!empty($_POST)) {
			$_RESULT = [
				'page_title'	=>	$_catalog_handler->get_title($_CATALOG),
				'related'		=>	$_post_handler->get_related($query_string, FALSE, $_POST['related_type']),
			];
		}
		
		//IF CATALOG OR PAGE, CHANGE
		if (isset($_POST['type']) && ($_POST['show_in_nav'] == '1')) {
			
			if(isset($_RESULT['related']['posts']) && $_RESULT['related']['posts'] != FALSE) {
				$_POST = $_post_handler->get($_RESULT['related']['posts'][0]['GUID'], TRUE);
			}
		}
		
		$_POST['objects'] = json_decode($_POST['objects'],TRUE);
		
		$this->getView()->_CATALOG = $_CATALOG;
		$this->getView()->_POST = $_POST;
		$this->getView()->_RESULT = $_RESULT;
		
		return TRUE;
	}
}
<?php

class CatalogModel {
	function __construct() {
	}
	
	function __destruct() {
	}
	
	protected $_has_active = FALSE;
	
	public function get($_active_GUID = '/', $_show_type = 'ALL', $_show_detail = FALSE, $_recursion = FALSE, $_end_GUID = NULL) {
		$_result = FALSE;
	
		if ($_show_detail == TRUE) {
			$_sql = 'SELECT `PAGE_ID` AS `id`, `name`, `title`, `sub_title`, `summary`, `content`, `GUID`, `type`, `page_GUID`, `related_type`, `order`, `UID`, `create_time`, `status`, `comment_status`, `show_in_nav`, `objects`, `attachments`
					 FROM `sas_pages`
					 WHERE `show_in_nav` = 1 AND';
		} else {
			$_sql = 'SELECT `PAGE_ID` AS `id`, `name`, `title`, `sub_title`, `summary`, `GUID`, `type`, `page_GUID`, `related_type`, `order`, `status`, `show_in_nav`, `attachments`
					 FROM `sas_pages`
					 WHERE `show_in_nav` = 1 AND';
		}
		switch ($_show_type) {
			case 'HIDDEN':
				$_sql .= '`status` = \'hidden\'';
				break;
			case 'ALL':
				$_sql .= '`status` IN (\'published\', \'hidden\')';
				break;
			default:
				$_sql .= '`status` = \'published\'';
		}
		$_sql .= ' ORDER BY `order`,`page_GUID`,`id` ASC' . ($_recursion == FALSE ? ' LIMIT 1;' : ';');
		
		DB::query($_sql);
		$pre_result = DB::result_array();
		
		if  ($_recursion != TRUE) {
			$_result = $pre_result;
		} else {
		//广度优先算法序列化分类目录
			$_result = $this->_combine_catalogs($pre_result, $_active_GUID, $_end_GUID);
		}
	
		return $_result;
	}
	
	public function get_title($_source, $_from_top = FALSE) {
		$_result = [];
		
		if (!empty($_source)) {
			foreach ($_source as $value) {
				if ($value['active'] == TRUE) {
					$_result = $value;
					unset($_result['sub_catalogs']);
					if (isset($value['sub_catalogs'])) {
						$next = $this->get_title($value['sub_catalogs'], $_from_top);
						if (empty($next)) {
							$_result = [$_result];
						} else {
						if ($_from_top == TRUE) {
							$_result = array_merge([$_result], $next);
						} else {
							$_result = array_merge($next, [$_result]);
						}
						}
					}
					break;
				}
			}
		}
		
		return $_result;
	}
	
	protected  function _combine_catalogs(&$_rest_items, $_active_GUID, $_end_GUID = NULL, &$_is_active = FALSE) {
		$_result = [];
		//广度搜索本级菜单
		if (!empty($_rest_items)) {
			foreach ($_rest_items as $key => $item) {
				if ($item['page_GUID'] == $_end_GUID) {
					if ($this->_has_active == FALSE && $item['GUID'] == $_active_GUID) {
						$_result[] = array_merge($item, ['active'=>TRUE]);
						$_is_active = TRUE;
						$this->_has_active = TRUE;
					} else {
						$_result[] = array_merge($item, ['active'=>FALSE]);
					}
					unset($_rest_items[$key]);
				}
			}
			//下一级菜单
			foreach ($_result as $key => $item) {
				$tmp = $this->_combine_catalogs($_rest_items, $_active_GUID, $item['GUID'], $_result[$key]['active']);
				if (!empty($tmp)) $_result[$key]['sub_catalogs'] = $tmp;
				else $_result[$key]['sub_catalogs'] = FALSE;
			}
		}
		
		return $_result;
	}
}

?>
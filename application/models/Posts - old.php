<?php
class PostsModel {
	
	function __construct() {
		
	}
	
	function __destruct() {
	
	}
	
	protected $_has_active = FALSE;
	
	public function get_catalogs($_show_type = 'DISPLAYED', $_cid) {
		$_result = FALSE;
		
		$_sql = 'SELECT `CID` as `id`, `name`, `title`, `GUID`, `parent_id`, `order`, `type`, `is_display`
				 FROM `sas_catalogs`
				 WHERE `is_display` ';
		switch ($_show_type) {
			case 'HIDDEN':
				$_sql .= '= 0';
				break;
			case 'ALL':
				$_sql .= '! -1';
				break;
			default:
				$_sql .= '= 1';
		}
		$_sql .= ' ORDER BY `order`,`parent_id`,`id` ASC;';
		
		DB::query($_sql);
		$pre_result = DB::result_array();
		
		//广度优先算法序列化分类目录
		$_result = $this->_find_catalogs($pre_result, 0, $_cid);
		
		return $_result;
	}
	
	private function _find_catalogs(&$_rest_items, $_parent_id, $_cid, &$_is_active = FALSE) {
		$_result = [];
		
		
		//广度搜索本级菜单
		if (!empty($_rest_items)) {
			foreach ($_rest_items as $key => $item) {
				if ($item['parent_id'] == $_parent_id) {
					if ($this->_has_active == FALSE && $item['id'] == $_cid) {
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
				$tmp = $this->_find_catalogs($_rest_items, $item['id'], $_cid, $_result[$key]['active']);
				if (!empty($tmp)) $_result[$key]['sub_catalogs'] = $tmp;
				else $_result[$key]['sub_catalogs'] = FALSE;
			}
		}
		return $_result;
	}
	
	public function get_results($_GUID, $_type = 'THUMB', $_page_size = -1, $_page = 1) {
		
		$_result = FALSE;
		$_GUID = str_replace('/index', '', '/'.trim(strtolower($_GUID),'/'));
		empty($_GUID) ? $_GUID = '/' : FALSE;
		
		$_result['post'] = $this->_get_post($_GUID);
		
		if ($_result['post'] != FALSE) {
			
			/* if ($_result['post']['type'] == 'related') {
				$_result['catalog'] = $this->_get_catalog($_result['post']['post_parent']);
			} else {
				$_result['catalog'] = FALSE;
			} */
			
			$_result['parent'] = $this->_get_parent($_result['post']['post_parent']);
			
			$_result = array_merge($_result, $this->_get_results($_result['post']['id'], $_type, $_result['post']['post_type'], $_page_size, $_page));
		}
		
		$_result['catalog'] = $this->_get_catalog(($_result['post'] == FALSE || $_result['post']['type'] == 'related') ? $_GUID : $this->_get_catalog_item($_result['post']['post_parent']), 'RELATED');
		
		return $_result;
	}
	
	public function get_page_result($_GUID) {
		$_result = FALSE;
		$_GUID = str_replace(['home','/index'], '', strtolower($_GUID));
		
		$_sql = 'SELECT `POST_ID` as `id`, `post_title`, `post_sub_title`, `post_name`, `post_content`, `post_fields`, `UID`, `post_time`, `post_status`, `comment_status`, `GUID`, `post_parent`, `attachments`, `post_order`, `update_time`
				 FROM `sas_posts`
				 WHERE `GUID` = ? AND `post_status` = \'open\' LIMIT 1;';
		DB::query($_sql, $_GUID);
		if (DB::num_rows() > 0) {
			$_result = DB::row_array(); 
		}
		
		return $_result;
	}
	
	public function get_list($_post_parent, $_post_type = 'posts', $_type = 'THUMB', $_page_size = -1, $_page = 1) {
		return $this->_get_results($_post_parent, $_type, $_post_type, $_page_size, $_page);
	}
	
	protected function _get_catalog_item($_post_id) {
		
		$_result = 0;
		$_sql = 'SELECT `POST_ID`, `GUID`, `post_parent`, `type`
				 FROM `sas_posts`
				 WHERE `POST_ID` = ? LIMIT 1;';
		DB::query($_sql, $_post_id);
		if (DB::num_rows() > 0) {
			$tmp = DB::row_array();
			if ($tmp['type'] == 'related') {
				$_result = $tmp['GUID'];
			} else $_result = $this->_get_catalog_item($tmp['post_parent']);
		} else {
			$_sql = 'SELECT `CID`, `GUID`, `post_parent`, `type`
					 FROM `sas_posts`
					 WHERE `POST_ID` = ? LIMIT 1;';
			DB::query($_sql, $_post_id);
		}
		
		return $_result;
	}
	
	protected function _get_parent($_post_id) {
		$_result = 0;
		$_sql = 'SELECT `POST_ID` as `id`, `title`, `sub_title`, `name`, `content`, `fields`, `UID`, `post_time`, `status`, `comment_status`, `GUID`, `post_parent`, `type`, `post_type`, `attachments`, `order`, `update_time`
						 FROM `sas_posts`
						 WHERE `POST_ID` = ? AND `status` = \'open\' ORDER BY `order`, `post_time` LIMIT 1;';
		DB::query($_sql, $_post_id);
		if (DB::num_rows() > 0) {
			$_result = DB::row_array();
		}
		
		return $_result;
	}
	
	protected function _get_post($_GUID = '/') {
		$_result = FALSE;
		$_sql = 'SELECT `POST_ID` as `id`, `title`, `sub_title`, `name`, `content`, `fields`, `UID`, `post_time`, `status`, `comment_status`, `GUID`, `post_parent`, `type`, `post_type`, `attachments`, `order`, `update_time`
						 FROM `sas_posts`
						 WHERE `GUID` = ? AND `status` = \'open\' ORDER BY `order`, `post_time` LIMIT 1;';
		DB::query($_sql, $_GUID);
		$_result = (DB::num_rows() > 0 ? DB::result_array()[0] : FALSE);
		
		if ($_result != FALSE) {
			$_result['attachments'] = $this->_get_attachments($_result['attachments']);
		}
		
		return $_result;
	}
	
	protected function _get_catalog($_GUID = '/', $_type = 'RELATED') {
		$_result = FALSE;
		if (is_numeric($_GUID)) {
			$_sql = 'SELECT `CID` as `id`, `name`, `title`, `sub_title`, `GUID`, `parent_id`, `type` FROM `sas_catalogs` WHERE `CID` = ? LIMIT 1;';
		} else {
			$_sql = 'SELECT `CID` as `id`, `name`, `title`, `sub_title`, `GUID`, `parent_id`, `type` FROM `sas_catalogs` WHERE `GUID` = ? LIMIT 1;';
		}
		DB::query($_sql, $_GUID);
		if (DB::num_rows() > 0) {
				
			//set result sample
			$_result = DB::row_array();
			if ($_type == 'RELATED') {
				$_result['parent'] = $this->_get_catalog($_result['parent_id'], $_type);
			}
		}
		
		return $_result;
	}
	
	protected function _get_results($_cid, $_type = 'THUMB', $_post_type = 'default', $_page_size = -1, $_page = 1) {
		
		$_result = [
			'posts'	=>	FALSE,
			'news'	=>	FALSE,
			'slideshow'	=>	FALSE,
		];
		
		switch ($_post_type) {
			
			case 'static':
				
				break;
			
			case 'news':
				
				if ($_type != 'THUMB') {
					$_sql = 'SELECT `POST_ID` as `id`, `title`, `sub_title`, `content`, `UID`, `post_time`, `status`, `comment_status`, `GUID`, `post_parent`, `attachments`, `order`, `update_time`
							 FROM `sas_news`
							 WHERE `post_parent` = ? AND `status` = \'open\' ORDER BY `post_order`, `post_time`';
				} else {
					$_sql = 'SELECT `POST_ID` as `id`, `title`, `sub_title`, `post_time`, `status`, `GUID`, `post_parent`, `attachments`, `order`
							 FROM `sas_news`
							 WHERE `post_parent` = ? AND `status` = \'open\' ORDER BY `post_order`, `post_time`';
				}
				if ($_page_size != -1) {
					$_sql .= ' LIMIT ?,?;';
					DB::query($_sql, [$_cid, ($_page - 1) * $_page_size, $_page_size]);
				} else {
					$_sql .= ';';
					DB::query($_sql, $_cid);
				}
				$_result['news'] = (DB::num_rows() > 0 ? DB::result_array() : FALSE);
				
				if ($_result['news'] != FALSE) foreach ($_result['news'] as $key => $_post) {
					$_result['news'][$key]['attachments'] = $this->_get_attachments($_post['attachments'], ($_type == 'THUMB') ? 1:0);
				}
				
				break;
				
			case 'slideshow':
				
				if ($_type != 'THUMB') {
					$_sql = 'SELECT `SLIDE_ID` as `id`, `title`, `sub_title`, `name`, `content`, `image`, `related_GUID`, `related_type`, `status`, `comment_status`, `post_parent`, `update_time`
							 FROM `sas_slideshows`
							 WHERE `post_parent` = ? AND `status` = \'open\' ORDER BY `update_time`';
				} else {
					$_sql = 'SELECT `SLIDE_ID` as `id`, `title`, `sub_title`, `name`, `image`, `status`, `post_parent`
							 FROM `sas_slideshows`
							 WHERE `post_parent` = ? AND `status` = \'open\' ORDER BY `update_time`';
				}
				if ($_page_size != -1) {
					$_sql .= ' LIMIT ?,?;';
					DB::query($_sql, [$_cid, ($_page - 1) * $_page_size, $_page_size]);
				} else {
					$_sql .= ';';
					DB::query($_sql, $_cid,TRUE, TRUE);
				}
				$_result['slideshow'] = (DB::num_rows() > 0 ? DB::result_array() : FALSE);
				break;
				
			case 'posts':
				
				if ($_type != 'THUMB') {
					$_sql = 'SELECT `POST_ID` as `id`, `title`, `sub_title`, `name`, `content`, `fields`, `UID`, `post_time`, `status`, `comment_status`, `GUID`, `post_parent`, `type`, `post_type`, `attachments`, `order`, `update_time`
							 FROM `sas_posts`
							 WHERE `post_parent` = ? AND `status` = \'open\' AND `type` != \'related\' ORDER BY `order`, `post_time`';
				} else {
					$_sql = 'SELECT `POST_ID` as `id`, `title`, `sub_title`, `post_time`, `status`, `GUID`, `post_parent`, `post_type`, `attachments`, `order`
							 FROM `sas_posts`
							 WHERE `post_parent` = ? AND `status` = \'open\' AND `type` != \'related\' ORDER BY `order`, `post_time`';
				}
				if ($_page_size != -1) {
					$_sql .= ' LIMIT ?,?;';
					DB::query($_sql, [$_cid, ($_page - 1) * $_page_size, $_page_size]);
				} else {
					$_sql .= ';';
					DB::query($_sql, $_cid);
				}
				$_result['posts'] = (DB::num_rows() > 0 ? DB::result_array() : FALSE);
				
				if ($_result['posts'] != FALSE) foreach ($_result['posts'] as $key => $_post) {
					$_result['posts'][$key]['attachments'] = $this->_get_attachments($_post['attachments'], ($_type == 'THUMB') ? 1:0);
				}
				
				break;
			default;
				
		}
		
		return $_result;
	}
	
	protected function _get_attachments ($_post_ids = NULL, $_num = 0) {
		$_result = NULL;
		
		if ($_post_ids != NULL) {
			$_sql = 'SELECT `ATTACH_ID` as `id`, `attachment_code`, `attachment_file_name`, `attachment_name`, `mime_type`
					 FROM `sas_attachments`
					 WHERE `ATTACH_ID` IN (?) AND `attachment_status` = \'open\''.($_num == 0 ? ';': ' LIMIT '.$_num.';');
			DB::query($_sql, "'".str_replace(',', "', '", $_post_ids)."'");
			$_result = (DB::num_rows() > 0 ? DB::result_array() : NULL);
		}
		return $_result;
	}
}
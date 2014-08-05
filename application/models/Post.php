<?php

class PostModel {
	function __construct() {
	}
	function __destruct() {
	}
	
	public function get($_GUID, $_show_detail = FALSE, $_type = NULL) {
		$_result = FALSE;
		
		$_GUID = str_replace('/index', '', '/'.trim(strtolower($_GUID),'/'));
		empty($_GUID) ? $_GUID = '/' : FALSE;
		switch ($_type) {
			case 'post':
				$_result = $this->get_posts($_GUID, $_show_detail);
				break;
			case 'news':
				$_result = $this->get_news($_GUID, $_show_detail);
				break;
			case 'page':
				$_result = $this->get_pages($_GUID, $_show_detail);
				break;
			default:
				//判断是page还是post
				$_retval = $this->get_pages($_GUID, $_show_detail);
				if (!empty($_retval)) {
					$_result = $_retval;
				} else {
					$_retval = $this->get_posts($_GUID, $_show_detail);
					//如果不是page,在post结果中查找static的结果
					$_result = $_retval;
				}
				break;
		}
		if (!empty($_result) && $_result != FALSE) $_result = $_result[0];
		
		return $_result;
	}
	
	public function get_related($_parent_GUID, $_show_detail = FALSE, $_type = 0, $_page_size = -1, $_page = 1) {
		$_result = [
			'posts'			=>	FALSE,
			'slideshow'		=>	FALSE,
			'news'			=>	FALSE,
			'pages'			=>	FALSE,
		];
		$_categories = $this->trans_related_type($_type);
		
		if ($_categories['posts'] == TRUE) {
			$_result['posts'] = $this->get_posts($_parent_GUID, $_show_detail, TRUE, $_page_size, $_page);
		}
		if ($_categories['slideshow'] == TRUE) {
			$_result['slideshow'] = $this->get_slideshow($_parent_GUID);
		}
		if ($_categories['news'] == TRUE) {
			$_result['news'] = $this->get_news($_parent_GUID, $_show_detail, TRUE, $_page_size, $_page);
		}
		if ($_categories['pages'] == TRUE) {
			$_result['pages'] = $this->get_pages($_parent_GUID, $_show_detail, TRUE, $_page_size, $_page);
		}
		
		return $_result;
	}
	
	public function get_posts($_GUID, $_show_detail = FALSE, $_show_list = FALSE, $_page_size = -1, $_page = 1) {
		$_result = FALSE;
		
		if ($_show_detail == TRUE) {
			$_sql = 'SELECT `POST_ID` AS `id`, `title`, `name`, `sub_title`, `summary`, `content`, `objects`, `UID`, `create_time`, `status`, `comment_status`, `GUID`, `page_GUID`, `related_GUID`, `related_type`, `type`, `attachments`, `order`
						 FROM `sas_posts`
						 ';
		} else {
			$_sql = 'SELECT `POST_ID` AS `id`, `title`, `name`, `sub_title`, `summary`, `status`, `GUID`, `page_GUID`, `related_GUID`, `related_type`, `attachments`, `type`, `order`
						 FROM `sas_posts`
						 ';
		}
		
		if ($_show_list == TRUE) {
			$_sql .= 'WHERE `related_GUID` = ? AND `status` NOT IN (\'suspend\', \'deleted\') ORDER BY `order`,`id` ASC';
			if ($_page_size == -1) {
				$_sql .= ';';
			} else {
				$_sql = ' LIMIT ?,?;';
			}
			DB::query($_sql, [$_GUID, ($_page - 1) * $_page_size, $_page_size]);
		} else {
			$_sql .= 'WHERE `GUID` = ? AND `status` NOT IN (\'suspend\', \'deleted\') LIMIT 1;';
			DB::query($_sql, $_GUID);
		}
		
		$_result = DB::result_array();
		
		foreach($_result as $key => $value) {
			$_result[$key]['attachments'] = $this->get_attachments($value['attachments'], $_show_detail);
		}
		
		return $_result;
	}
	
	public function get_news($_GUID, $_show_detail = FALSE, $_show_list = FALSE, $_page_size = -1, $_page = 1) {
		$_result = FALSE;
		
		if ($_show_detail == TRUE) {
			$_sql = 'SELECT `POST_ID` AS `id`, `title`, `sub_title`, `content`, `UID`, `create_time`, `status`, `comment_status`, `GUID`, `page_GUID`, `related_GUID`, `related_type`, `attachments`, `order`
						 FROM `sas_news`
						 ';
		} else {
			$_sql = 'SELECT `POST_ID` AS `id`, `title`, `sub_title`, `UID`, `status`, `GUID`, `page_GUID`, `related_GUID`, `related_type`, `attachments`, `order`
						 FROM `sas_posts`
						 ';
		}
		
		if ($_show_list == TRUE) {
			$_sql .= 'WHERE `related_GUID` = ? AND `status` NOT IN (\'suspend\', \'deleted\') ORDER BY `order`,`id` ASC';
			if ($_page_size == -1) {
				$_sql = ';';
			} else {
				$_sql = ' LIMIT ?,?;';
			}
			DB::query($_sql, [$_GUID, ($_page - 1) * $_page_size, $_page_size]);
		} else {
			$_sql .= 'WHERE `GUID` = ? AND `status` NOT IN (\'suspend\', \'deleted\') LIMIT 1;';
			DB::query($_sql, $_GUID);
		}
		
		$_result = DB::result_array();
		
		foreach($_result as $key => $value) {
			$_result[$key]['attachments'] = $this->get_attachments($value['attachments'], $_show_detail);
		}
		
		return $_result;
	}
	
	public function get_slideshow($_GUID) {
		$_result = FALSE;
		
		$_sql = 'SELECT `SLIDE_ID` AS `id`, `name`, `title`, `sub_title`, `content`, `page_GUID`, `image`, `related_GUID`, `related_type`, `status`, `comment_status`
				 FROM `sas_slideshows`
			 	 WHERE `related_GUID` = ? AND `status` NOT IN (\'suspend\', \'deleted\') ORDER BY `id` ASC';
		
		DB::query($_sql, $_GUID);
		
		$_result = DB::result_array();
		
		return $_result;
	}
	
	public function get_pages($_GUID, $_show_detail = FALSE, $_show_list = FALSE, $_page_size = -1, $_page = 1) {
		$_result = FALSE;
		
		if ($_show_detail == TRUE) {
			$_sql = 'SELECT `PAGE_ID` AS `id`, `name`, `title`, `sub_title`, `summary`, `content`, `GUID`, `type`, `page_GUID`, `related_type`, `order`, `UID`, `create_time`, `status`, `comment_status`, `show_in_nav`, `objects`, `attachments`
						 FROM `sas_pages`
						 ';
		} else {
			$_sql = 'SELECT `PAGE_ID` AS `id`, `name`, `title`, `sub_title`, `summary`, `GUID`, `type`, `page_GUID`, `related_type`, `order`, `status`, `show_in_nav`, `attachments`
						 FROM `sas_pages`
						 ';
		}
		
		if ($_show_list == TRUE) {
			$_sql .= 'WHERE `page_GUID` = ? AND `status` NOT IN (\'suspend\', \'deleted\') ORDER BY `order`,`id` ASC';
			if ($_page_size == -1) {
				$_sql = ';';
			} else {
				$_sql = ' LIMIT ?,?;';
			}
			DB::query($_sql, [$_GUID, ($_page - 1) * $_page_size, $_page_size]);
		} else {
			$_sql .= 'WHERE `GUID` = ? AND `status` NOT IN (\'suspend\', \'deleted\') LIMIT 1;';
			DB::query($_sql, $_GUID);
		}
		
		$_result = DB::result_array();
		
		foreach($_result as $key => $value) {
			$_result[$key]['attachments'] = $this->get_attachments($value['attachments'], $_show_detail);
		}
		
		return $_result;
	}
	
	protected function get_attachments($_attachment_codes = '', $_show_detail = TRUE) {
		$_result = NULL;
		
		if ($_attachment_codes != NULL) {
			$_sql = 'SELECT `ATTACH_ID` as `id`, `attachment_code`, `attachment_file_name`, `attachment_name`, `mime_type`
					 FROM `sas_attachments`
					 WHERE `attachment_code` IN (?) AND `attachment_status` = \'published\''.($_show_detail == TRUE ? ';': ' LIMIT 1;');
			DB::query($_sql, "'".str_replace(',', "', '", $_attachment_codes)."'");
			$_result = (DB::num_rows() > 0 ? DB::result_array() : NULL);
		}
		return $_result;
	}
	
	protected function trans_related_type($_type = 0) {
		$_str = decbin($_type);
		$_result = [
			'posts'		=>	FALSE,
			'slideshow'	=>	FALSE,
			'news'		=>	FALSE,
			'pages'		=>	FALSE,
		];
		if (($_str & 0001) == 0001) $_result['posts'] = TRUE;
		if (($_str & 0010) == 0010) $_result['slideshow'] = TRUE;
		if (($_str & 0100) == 0100) $_result['news'] = TRUE;
		if (($_str & 1000) == 1000) $_result['pages'] = TRUE;
		return $_result;
	}
}

?>
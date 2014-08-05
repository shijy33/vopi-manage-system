<?php
/**
 * @name TestController
 * @author duanChi <http://weibo.com/shijingye>
 * @desc 默认控制器
 * @see http://www.php.net/manual/en/class.yaf-controller-abstract.php
 */
class TestController extends Yaf\Controller_Abstract {

	/** 
     * 默认动作
     * Yaf支持直接把Yaf_Request_Abstract::getParam()得到的同名参数作为Action的形参
     * 对于如下的例子, 当访问http://yourhost/dashboard/index/index/index/name/duanChi <http://weibo.com/shijingye> 的时候, 你就会发现不同
     */
	public function envAction() {
		var_dump($this->getRequest());
		$this->getView()->assign('test','test');
		$this->getView()->locate = 'test1';
		return TRUE;
	}
}

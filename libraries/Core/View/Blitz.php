<?php
/**
 * Created by PhpStorm.
 * User: shijy33
 * Date: 14-7-18
 * Time: 13:34
 */

namespace Core\View;


class Blitz implements \Yaf\View_Interface {

	protected $_ext                 = 'tmpl.html';
	protected $_template_dir_prefix = '';
	protected $_template_dir        = '';
	protected $_script_path         = '';
	protected $_display_path        = '';

	private $__view = NULL;
	private $__vars = [];

	function __construct($_options = NULL) {

		$this->__view = new \Blitz();

		if (!empty($_options)) foreach ($_options as $_key => $_value) {
			$_key = '_'.$_key;
			$this->$_key = $_value;
		}
	}

	public function getEngine() {
		return $this->__view;
	}

	public function getScriptPath() {
		return $this->_script_path;
	}

	public function setScriptPath($_path = '') {
		$this->_script_path = $_path;
		return TRUE;
	}

	public function setDisplayPath($_module = '', $_controller = 'index', $_action = 'index') {

		strtolower($_module) == 'index' ? $_module = '' : FALSE;

		$this->_display_path = $_module.DIRECTORY_SEPARATOR.$_controller.DIRECTORY_SEPARATOR.$_action;

	}

	public function getDisplayPath() {
		return $this->_display_path;
	}

	/**
	 * Alias for setScriptPath
	 *
	 * @param string $path
	 * @param string $prefix Unused
	 * @return void
	 */
	public function setBasePath($path, $prefix = 'Zend_View')
	{
		return $this->setScriptPath($path);
	}

	/**
	 * Alias for setScriptPath
	 *
	 * @param string $path
	 * @param string $prefix Unused
	 * @return void
	 */
	public function addBasePath($path, $prefix = 'Zend_View')
	{
		return $this->setScriptPath($path);
	}

	/**
	 * Assign a variable to the template
	 *
	 * @param string $key The variable name.
	 * @param mixed $val The variable value.
	 * @return void
	 */
	public function __set($key, $val)
	{
		$this->assign($key, $val);
	}

	/**
	 * Allows testing with empty() and isset() to work
	 *
	 * @param string $key
	 * @return boolean
	 */
	/*public function __isset($key)
	{
		return (null !== $this->__view->get_template_vars($key));
	}*/

	/**
	 * Allows unset() on object properties to work
	 *
	 * @param string $key
	 * @return void
	 */
	public function __unset($key)
	{
		$this->__view->clean($key);
	}

	/**
	 * Assign variables to the template
	 *
	 * Allows setting a specific key to the specified value, OR passing
	 * an array of key => value pairs to set en masse.
	 *
	 * @see __set()
	 * @param string|array $spec The assignment strategy to use (key or
	 * array of key => value pairs)
	 * @param mixed $value (Optional) If assigning a named variable,
	 * use this as the value.
	 * @return void
	 */
	public function assign($key, $value = null) {
		$this->__vars[$key] = $value;
	}

	/**
	 * Clear all assigned variables
	 *
	 * Clears all variables assigned to Zend_View either via
	 * {@link assign()} or property overloading
	 * ({@link __get()}/{@link __set()}).
	 *
	 * @return void
	 */
	public function clean($key = NULL) {
		if ($key == NULL) {
			$this->__vars = [];
		} else {
			unset($this->__vars[$key]);
		}
	}

	/**
	 * Processes a template and returns the output.
	 *
	 * @param string $name The template to process.
	 * @return string The output.
	 */
	public function render($name, $value = NULL) {
		//return $this->_smarty->fetch($name);
		return $this->display($name);
	}

	public function display($name, $value = NULL) {

		$this->__view->load(file_get_contents($this->_script_path . $name));
		$this->__view->display($this->__vars);
	}
} 
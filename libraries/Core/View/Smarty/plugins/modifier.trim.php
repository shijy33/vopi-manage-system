<?php
/**
 * Smarty plugin
 *
 * @package Smarty
 * @subpackage PluginsModifier
 */

/**
 * Smarty trim modifier plugin
 *
 * Type:     modifier<br>
 * Name:     trim<br>
 * Purpose:  trim
 *
 * @link http://smarty.php.net/manual/en/language.modifier.regex.replace.php
 *          regex_replace (Smarty online manual)
 * @author Monte Ohrt <monte at ohrt dot com>
 * @param string       $string   input string
 * @param string       $charlist char(s) to trim
 * @return string
 */
function smarty_modifier_trim($string, $charlist = null)
{
    return ($charlist == null) ? trim($string) : trim($string, $charlist);
}

?>
<?php /* Smarty version Smarty-3.1.11, created on 2014-07-19 16:07:37
         compiled from "/Projects/VOPI/open-api-manual/application/views/test/env.tmpl.html" */ ?>
<?php /*%%SmartyHeaderCode:156411006753ca2749b8ca08-48667447%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '06681fbec8a0e4c11a3533654368298ded52f28f' => 
    array (
      0 => '/Projects/VOPI/open-api-manual/application/views/test/env.tmpl.html',
      1 => 1405689336,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '156411006753ca2749b8ca08-48667447',
  'function' => 
  array (
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.11',
  'unifunc' => 'content_53ca2749b8fcd1_02803365',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_53ca2749b8fcd1_02803365')) {function content_53ca2749b8fcd1_02803365($_smarty_tpl) {?><!doctype html>
<html>
<head>
<meta charset="UTF-8">
<title>颐彩珠宝</title>
<link href="/static/?css/lib!no-compress;less/index!no-compress,no-cache" rel="stylesheet" type="text/css" />
</head>

<body>
<form action="/test/u" enctype="multipart/form-data" method="post">
    <input type="file" name="upload" />
    <input type="text" name="file_name" />
    <input type="submit" />
</form>
</body>
</html><?php }} ?>
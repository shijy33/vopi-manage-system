{capture name='_smarty_debug' assign=debug_output}
<style type="text/css">
{literal}
#_smarty_console body, #_smarty_console h1, #_smarty_console h2, #_smarty_console td, #_smarty_console th, #_smarty_console p {
    font-family: sans-serif;
    font-weight: normal;
    font-size: 0.9em;
    margin: 1px;
    padding: 0;
}

#_smarty_console h1 {
    margin: 0;
    text-align: left;
    padding: 2px;
    background-color: #f0c040;
    color:  black;
    font-weight: bold;
    font-size: 1.2em;
 }

#_smarty_console h2 {
    background-color: #9B410E;
    color: white;
    text-align: left;
    font-weight: bold;
    padding: 2px;
    border-top: 1px solid black;
}
#_smarty_console {
	overflow-y:auto;
}
#_smarty_console body {
    background: black; 
}

#_smarty_console p, #_smarty_console table, #_smarty_console div {
    background: #f0ead8;
} 

#_smarty_console p {
    margin: 0;
    font-style: italic;
    text-align: center;
}

#_smarty_console table {
    width: 100%;
}

#_smarty_console th, #_smarty_console td {
    font-family: monospace;
    vertical-align: top;
    text-align: left;
    width: 50%;
}

#_smarty_console td {
    color: green;
}

#_smarty_console .odd {
    background-color: #eeeeee;
}

#_smarty_console .even {
    background-color: #fafafa;
}

#_smarty_console .exectime {
    font-size: 0.8em;
    font-style: italic;
}

#table_assigned_vars th {
    color: blue;
}

#table_config_vars th {
    color: maroon;
}
{/literal}
</style>
</head>
<body>

<h1>Smarty Debug Console  -  {if isset($template_name)}{$template_name|debug_print_var nofilter}{else}Total Time {$execution_time|string_format:"%.5f"}{/if}</h1>

{if !empty($template_data)}
<h2>included templates &amp; config files (load time in seconds)</h2>

<div>
{foreach $template_data as $template}
  <font color=brown>{$template.name}</font>
  <span class="exectime">
   (compile {$template['compile_time']|string_format:"%.5f"}) (render {$template['render_time']|string_format:"%.5f"}) (cache {$template['cache_time']|string_format:"%.5f"})
  </span>
  <br>
{/foreach}
</div>
{/if}

<h2>assigned template variables</h2>
<table id="table_assigned_vars">
    {foreach $assigned_vars as $vars}
       <tr class="{if $vars@iteration % 2 eq 0}odd{else}even{/if}">   
       <th>${$vars@key|escape:'html'}</th>
       <td>{$vars|debug_print_var nofilter}</td></tr>
    {/foreach}
</table>

<h2>assigned config file variables (outer template scope)</h2>

<table id="table_config_vars">
    {foreach $config_vars as $vars}
       <tr class="{if $vars@iteration % 2 eq 0}odd{else}even{/if}">   
       <th>{$vars@key|escape:'html'}</th>
       <td>{$vars|debug_print_var nofilter}</td></tr>
    {/foreach}

</table>
{/capture}
<script type="text/javascript">
{$id = $template_name|default:''|md5}
_smarty_console = document.createElement('div');
_smarty_console.id = '_smarty_console';
_smarty_console.setAttribute('style','position:fixed; bottom:0; width:100%; height:300px; background:#000;');
_smarty_console.innerHTML = '{$debug_output|escape:"javascript" nofilter}';
document.body.appendChild(_smarty_console);
    //_smarty_console = window.open("","console{$id}","width=680,height=600,resizable,scrollbars=yes");
    //_smarty_console.document.write("{$debug_output|escape:'javascript' nofilter}");
    //_smarty_console.document.close();
</script>

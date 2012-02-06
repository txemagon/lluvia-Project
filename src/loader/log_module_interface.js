function giveme_node(id){
  var node = document.getElementById(id)
  if (!node){
    node = document.createElement("div")
    node.setAttribute("id", id)
    document.getElementsByTagName("body")[0].appendChild(node)
  }
  return node
}

function get_log_load(){
    return lluvia_load =giveme_node("lluvia_load")
}

function explain(div, title, text){
    var whole_html_text = ""
    if (div) {
        whole_html_text += title + ": " + text + "<br/>\n"
        div.innerHTML += whole_html_text
    }
}

function ll_module_to_include(module_source){
    explain(get_log_load(), "About to load module", module_source.module)
    module_loading[module_source.module] = new LogModuleLoad(module_source)
}

function ll_module_included(module_source){
    get_log_load().innerHTML += module_loading[module_source.module].endLoad()
}

function ll_file_included(file_source, module_source, last_file, last_module){
    module_loading[module_source.module].addFile(file_source)
    if (last_file) 
        ll_module_included(module_source)
    if (last_file && last_module)
      if (!$K_loading_app && $K_app_dependencies){
         $K_loading_app = true
         _includeScript('dependencies.js', 'onload', '_includeDependencies()') 
      }else
        ll_start()
}

function highlight(language){
    dp.SyntaxHighlighter.ClipboardSwf = 'vendor/SyntaxHighlighter/Scripts/clipboard.swf'
    code = document.getElementsByTagName('pre')
    for (var i = 0; i < code.length; i++) 
        if (code[i].className == language) 
            dp.SyntaxHighlighter.HighlightAll(code[i].getAttribute('name'))
}

function ll_start(){
  try{
    highlight('javascript')
  } catch(err){;}
  if (typeof(main) == "function")
      try{ main() } catch (err) { Exception.parse(err) }
}

function sanitize(code){
    return code.replace("&lt;", "<")
}

function run(code_fragment){
    var snippets = document.getElementsByName(code_fragment)	
    for (var i = 0; i < snippets.length; i++) 	    
        eval(sanitize(snippets[i].innerHTML))
}

function clear(div){
    div = div || "debug"
    giveme_node("debug").innerHTML = ""
}




function get_log_load(){
    return lluvia_load = document.getElementById("lluvia_load")
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
    highlight('javascript')
}

function sanitize(code){
    return code.replace("&lt;", "<")
}

function run(code_fragment){
    var snippets = document.getElementsByName(code_fragment)	
    for (var i = 0; i < snippets.length; i++) 	    
        eval(sanitize(snippets[i].innerHTML))
}

function clear(){
    document.getElementById("debug").innerHTML = ""
}



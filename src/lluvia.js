if (typeof($K_appServer) == "undefined")
  $K_appServer = "" + location.protocol + "//" + location.host
  
if (typeof($K_appRelPath) == "undefined")
  $K_appRelPath = "/javascript/"

$K_appPath = location.pathname.replace(/\/[^\/]*\.html?/, "")

if (typeof($K_lluviaServer) == "undefined")
  $K_lluviaServer = $K_appServer

if (typeof($K_lluviaPath) == "undefined")
  $K_lluviaPath = $K_appPath + "/../../src/"
    
var $K_WHERELL  = $K_lluviaServer + $K_lluviaPath
var $K_WHEREApp = $K_appServer + $K_appPath + $K_appRelPath

var $K_loading_app = false

function _includeScript(src, event, callback){
    var script = document.createElement('script')
    script.setAttribute('type', 'text/javascript')
    script.setAttribute('src', ($K_loading_app ? $K_WHEREApp : $K_WHERELL) + src)
    if (event && callback) 
        script.setAttribute(event, callback)
    document.getElementsByTagName('head')[0].appendChild(script)
}

function _getProjectDependencies(){
    _includeScript('loader/log_module_load.js')
    _includeScript('loader/log_module_interface.js')
    _includeScript('dependencies.js', 'onload', '_includeDependencies()')
}

function _includeModule(module, last){
    if (ll_module_to_include) 
        ll_module_to_include(module)
    for (var i = 0; i < module.files.length; i++) {
        if (ll_file_included && i == module.files.length - 1) 
            if (last) 
                _includeScript(module.path + module.files[i].name, "onload", "ll_file_included(" + module.files[i].toSource() + ", " + module.toSource() + ", true, true )")
            else 
                _includeScript(module.path + module.files[i].name, "onload", "ll_file_included(" + module.files[i].toSource() + ", " + module.toSource() + ", true )")
        else 
            _includeScript(module.path + module.files[i].name, "onload", "ll_file_included(" + module.files[i].toSource() + ", " + module.toSource() + ", false)")
    }
}

function _includeDependencies(){
    if ($K_loading_app)
      for (var i = 0; i < $K_app_dependencies.length; i++) 
        _includeModule($K_app_dependencies[i], i == ($K_app_dependencies.length - 1))
    else
      for (var i = 0; i < $K_dependencies.length; i++) 
        _includeModule($K_dependencies[i], i == ($K_dependencies.length - 1))
}

function bringLLuvia(debug_level){
    if (debug_level) 
        $K_debug_level = debug_level
    _getProjectDependencies()
}


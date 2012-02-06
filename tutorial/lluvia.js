function _includeScript(src, event, callback){
    var script = document.createElement('script')
    script.setAttribute('type', 'text/javascript')
    script.setAttribute('src', '../src/' + src)
    if (event && callback) 
        script.setAttribute(event, callback)
    document.getElementsByTagName('head')[0].appendChild(script)
}

function _getProjectDependencies(){
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
    for (var i = 0; i < $K_dependencies.length; i++) 
        _includeModule($K_dependencies[i], i == ($K_dependencies.length - 1))
}

function bringLLuvia(debug_level){
    if (debug_level) 
        $K_debug_level = debug_level
    _getProjectDependencies()
}


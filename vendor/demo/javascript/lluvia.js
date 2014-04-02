function _includeScript(src, event, callback){
	
	var script = document.createElement('script')
	script.setAttribute('type', 'text/javascript')
	script.setAttribute('src', src)
	if (event && callback)
		script.setAttribute(event, callback)
	document.getElementsByTagName('head')[0].appendChild(script)
}

function _getProjectDependencies(){
	_includeScript('lluvia/dependencies.js', 'onload', '_includeDependencies()')
}

function _includeModule(module){
	for (var i = 0; i<module.files.length; i++) 
		_includeScript(module.path + module.files[i].name)
}

function _includeDependencies(){
	for(var i=0; i<$K_dependencies.length; i++)
		_includeModule($K_dependencies[i])
}

function bringLLuvia(debug_level){
	if (debug_level)
		$K_debug_level = debug_level
	_getProjectDependencies()
}

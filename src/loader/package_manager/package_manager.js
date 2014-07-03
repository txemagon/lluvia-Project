/**
 * @class PackageManager
 * Description.
 */

/**
 * @method constructor
 * Description.
 *  
 * @param 
 */
function PackageManager(server){
	this.server = server
	this.packages_server = []
	this.catalog = []
}

/**
 * 
 */
PackageManager.all_packages = []

/**
 * 
 */
PackageManager.prototype.include_script = function(src){
	var script = document.createElement('script')
	script.setAttribute('type', 'text/javascript')
	script.src = src
	script.async = false
	document.getElementsByTagName('head')[0].appendChild(script)
}

/**
 * 
 */
PackageManager.prototype.create_catalog = function(catalog){
	var catalog = catalog || {}

	this.catalog = catalog
    
}

/**
 * 
 */
PackageManager.prototype.through = function(block, config){ 
    var config = config || {}
    config.last_package = config.last_package || this
    config.already_there = config.already_there || []

    var actual_package = config.last_package
    var dependencies = ["requires", "provides", "offers"]

    function is_already_there$U(path){
        for(var i=0; i<config.already_there.length; i++)
            if(config.already_there[i] == path)
                return true
            return false
    }

    for(var i=0; i<dependencies.length; i++){
        if(actual_package[dependencies[i]]){
            for(var a=0; a<actual_package[dependencies[i]].length; a++){
                if(!is_already_there$U(actual_package[dependencies[i]][a].path)){
                    config.already_there.push(actual_package[dependencies[i]][a].path)
                    alert(actual_package[dependencies[i]][a].toSource()) // el probelma ahora sq a through hay que pasarle el siguiente paquete
                    actual_package[dependencies[i]][a].through(block, {last_package: actual_package[dependencies[i]][a], already_there: config.already_there})
                    block(actual_package[dependencies[i]][a])
                }
            }
        }
    }
}

/**
 * 
 */
PackageManager.prototype.is_in$U = function(catalog){
        
}


/**
 * 
 */
PackageManager.prototype.require = function(){

}
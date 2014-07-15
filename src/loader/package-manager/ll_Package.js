/**
 * 
 */
function Package(pk, my_manager){
 this.pk = pk || {}
 this.my_manager = my_manager || {}
}

/**
 *
 */
Package.prototype.catalog = function(already){
    var dependencies = ["requires", "provides", "offers"]
    var already_there = already || []

    for(var i in this.pk)
        this[i] = this.pk[i]
    
    function is_already_there$U(path){
        for(var i=0; i<already_there.length; i++)
            if(already_there[i] == path)
                return true
            return false
    }

    for(var i=0; i<dependencies.length; i++)
        if(this[dependencies[i]]){
            for(var a=0; a<this[dependencies[i]].length; a++){
                if(!is_already_there$U(this[dependencies[i]][a]._path)){
                    already_there.push(this[dependencies[i]][a]._path)
                    var new_pk = new Package(this[dependencies[i]][a], this.my_manager)
                    new_pk.catalog(already_there)
                    this[dependencies[i]][a] = new_pk
                }
            }
        }
}

/**
 * 
 */
Package.prototype.through = function(block, config){ 
    var config = config || {}
    config.last_package = config.last_package || this
    config.already_there = config.already_there || []

    var actual_package = config.last_package
    var dependencies = ["requires", "this", "provides", "offers"]

    function is_already_there$U(path){
        for(var i=0; i<config.already_there.length; i++)
            if(config.already_there[i] == path)
                return true
            return false
    }

    for(var i=0; i<dependencies.length; i++){
        if(dependencies[i] == "this"){
            if(!is_already_there$U(this._path)){
                config.already_there.push(this._path)
                this.through(block, {last_package: this, prune: config.prune, already_there: config.already_there})
                block(this)
            }
        }
        else if(actual_package[dependencies[i]]){
            for(var a=0; a<actual_package[dependencies[i]].length; a++){
                if(!is_already_there$U(actual_package[dependencies[i]][a]._path)){
                    config.already_there.push(actual_package[dependencies[i]][a]._path)
                    actual_package[dependencies[i]][a].through(block, {last_package: actual_package[dependencies[i]][a], already_there: config.already_there})
                    block(actual_package[dependencies[i]][a])
                }
            }
        }
    }
}
/**
 * 
 */
function Package(pk){
 this.pk = pk || {}
}

Package.prototype.catalog = function(){
    var dependencies = ["requires", "provides", "offers"]

    for(var i in this.pk)
        if (i != "path")
            this[i] = this.pk[i]
        else{
            if (this._path[0] != "/")
                this.path = this.path +  this.pk[i]
            else
                this.path = this.pk[i]
        }


    for(var i=0; i<dependencies.length; i++)
        if(this[dependencies[i]]){
            for(var a=0; a<this[dependencies[i]].length; a++){
                var new_pk = new Package(this[dependencies[i]][a])
                new_pk.catalog()
                this[dependencies[i]][a] = new_pk
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
                //if(!is_already_there$U(actual_package[dependencies[i]][a].path)){
                //    config.already_there.push(actual_package[dependencies[i]][a].path)
                    actual_package[dependencies[i]][a].through(block, {last_package: actual_package[dependencies[i]][a], already_there: config.already_there})
                    block(actual_package[dependencies[i]][a])
                //}
            }
        }
    }
}
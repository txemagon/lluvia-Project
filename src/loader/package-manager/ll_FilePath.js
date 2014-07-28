/**
 * @class FilePath
 *
 * 
 *
 */

/**
 * @method constructor
 * Creates a new FilePath
 *
 * @param {String} path The path it's going to be used.
 */ 
function FilePath(path){
   this.path = path
}

/**
 * @method normalize
 * Normalize the path.
 *
 * ### Example
 *
 *     var a = new FilePath("Work\\dan\\..\\joe\\js\\..")
 *     a.normalize()
 *     //=> "Work\\joe\\"
 *
 *     var a = new FilePath("./Work/me/proyect/..")
 *     a.normalize()
 *     //=> "./Work/me/"
 *     
 *     var a = new FilePath(".////Work//me/proyect/..")
 *     a.normalize()
 *     //=> "./Work/me/"
 *
 *     var a = new FilePath("Work\\me\\proyect\\\\..")
 *     a.normalize()
 *     //=> "Work\\me\\"
 *
 *     var a = new FilePath("Work\\me\\proyect")
 *     a.normalize()
 *     //=> "Work\\me\\proyect"
 *
 * @return {String} path_normalized The path normalized. 
 */
FilePath.prototype.normalize = function(path){

    var old_path = path || this.path
    if(old_path == undefined)
	return "Path undefined"
    var slash= this.slash_used(old_path)    

    if(slash == "/")
	old_path = old_path.replace(/\\/g, "/") 
    else
	old_path = old_path.replace(/\//g, "\\") 

    //Avoid multiple consecutive slashes. 
    old_path = old_path.replace(/\/{2,}/g, "/")
    old_path = old_path.replace(/\\{2,}/g, "\\")
    var path_normalized = ""
    
    while(old_path.length > 0){
       //How many positions will be moved.
       var move = (old_path.search(/(\/|\\)/)+1)>0 ? old_path.search(/(\/|\\)/)+1 : old_path.length
       //The size of the remaining path.
       var size = (old_path.length-1)
       
       //Auxiliary Variable that will filter special characters such as /, \ \ and .. .
       var filter = old_path.slice(0, move)
       //Checks whether the extracted fragment is a special character. How come ..
       if( filter.search(/^(\.\.\/|\.\.\\)/) != -1 || (filter.search(/^\.\./) != -1 && filter.length == 2)){
           //Extrae todo el path menos el final
           var aux = path_normalized.slice(0,final_index+1)
           path_normalized = aux
       }
        else{
	    //To put double backslash.
            if(filter.search(/\\/) != -1){
                filter = filter.replace(/\\/g, "\\\\")
            }
	    if(filter.search(/^(\.\/|\.\\)/) == -1 && filter.length != 1 ? true : filter.search(/^\./) == -1){
           //Adds to the new path the new fragment already filtered
           path_normalized += filter
           //Change the final index is used to clear the end of the path in case of .. .
           var final_index = path_normalized.length - (filter.length+1)
	   }
        }
       //It updates the old path
       var aux = old_path.slice((move), old_path.length)
       old_path = aux
    }
    
    return path_normalized
}


/*
 * @method join  
 * Join all arguments together and normalize the resulting path. 
 *
 */

FilePath.prototype.join = function(args){

    var slash = this.slash_used.apply(null, arguments)
    var path_complete=""
    for(var i = 0; i < arguments.length; i++){
       if(typeof(arguments[i]) === "string"){
           var path_fragment = arguments[i]
               if(path_complete[path_complete.length-1] != slash && path_fragment[0] != slash)
                   path_complete += slash
           path_complete += path_fragment
       }
    }
    return FilePath.prototype.normalize(path_complete)
}

/*
 *
 *
 */
FilePath.prototype.slash_used = function(args){
    var count_slash     = 0
    var count_backslash = 0
    for(var i = 0; i < arguments.length; i++){
        if(typeof(arguments[i]) != "string")
	    continue
	if(arguments[i].match(/\//g) != null)
	count_slash += arguments[i].match(/\//g).length
	else
	    if(arguments[i].match(/\\/g) != null)
		count_backslash += arguments[i].match(/\\/g).length
    }
    if(count_slash>count_backslash)
	return "/"
    else
        if(count_slash<count_backslash)
	   return "\\\\"
	else
	    return "/"
}








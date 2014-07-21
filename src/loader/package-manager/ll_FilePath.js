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
 * Normalize the path
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
FilePath.prototype.normalize = function(){

    var old_path = this.path
        
    //Avoid multiple consecutive slashes. 
    old_path = old_path.replace(/\/{2,}/g, "/")
    old_path = old_path.replace(/\\{2,}/g, "\\")
    var path_normalized = ""
    
    for(;old_path.length > 0;){
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
           //Adds to the new path the new fragment already filtered
           path_normalized += filter
           //Change the final index is used to clear the end of the path in case of .. .
           var final_index = path_normalized.length - (filter.length+1)
        }
       //It updates the old path
       var aux = old_path.slice((move), old_path.length)
       old_path = aux
    }
    
    return path_normalized
}

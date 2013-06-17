__Module.prototype = new Module
__Module.prototype.constructor = Module
function __Module(){ ; }

Module.prototype.constructor = Module
function Module(module_name, block){
  
  var module = new __Module

  if (typeof(block) !== "undefined")
     block.call(module)
  
  $global_space["$constants"][module_name] = module
  
  eval.call( null, 
  	         module_name + 
  	         " = $global_space['$constants']['" + 
  	         module_name + "']" )
  return module

}


function require(){
  //todo: define require to require another libraries not included in the index.js
}

/**
 * @method alias_method
 *
 * Creates a compu of the old name function.
 * 
 * @param  {string} new_name 
 * @param  {string} old_name
 * @return {Function}  returns a reference to the newly created function.
 */
Module.prototype.alias_method = function(new_name, old_name){

}
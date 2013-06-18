Module.prototype.constructor = Module
Module._constants = new Hash()

function Module(module_name, block){
  if (module_name){
    var module = new Module
    Module._constants = Module._constants || new Hash()
  
    if (typeof(block) !== "undefined")
       block.call(module)
    
    Module._constants[module_name] = module
    $global_space["$constants"][module_name] = module
    
    eval.call( null, 
               module_name + 
               " = $global_space['$constants']['" + 
               module_name + "']" )
    return module
  }

}

Module.constant_names = function(){ 
    return Module._constants.self_keys()
  }

Module.constants = function(){ 
    return Module._constants.values()
}

function require(){
  //todo: define require to require another libraries not included in the index.js
}

/**
 * @method alias_method
 *
 * Creates a copy of the old name function with the new name.
 * 
 * @param  {string | Function} new_name 
 * @param  {string} old_name
 * @return {Function}  returns a reference to the newly created function.
 */
Module.prototype.alias_method = function(new_name, old_name){
  if (String.is_string$U(old_name))
    this[new_name] = eval( this[old_name].toSource() )

  return this[new_name]
}
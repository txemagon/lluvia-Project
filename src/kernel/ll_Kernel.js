$KC_dl = {
    USER: 0,
    PROGRAMMER: 25,
    TESTING: 50,
    DEVELOPER: 100,
    INNERWORKING: 200
}

try {
	$K_debug_level
} 
catch (e) {
	$K_debug_level = $KC_dl.USER
}	

$global_space = (function(){return this;}).call(null) 
$global_space["$constants"] = {}


/**
 * Creates wrapped objects for simple types.
 * 
 * @param {boolean | number | string} variable [description]
 */
function O(variable){
  var t = typeof(variable)
  if (t === "boolean" || t === "number" || t === "string"){
    t = t.charAt(0).toUpperCase() + t.slice(1)
    if (t !== "String")
      return eval("new " + t + "(" + variable + ")")
    else
      return eval("new " + t + "('" + variable + "')")
  }
  return variable
}

function method_missing(error, method, params){
  if (/Class_[a-zA-Z_$][a-zA-Z_$0-9]*/.test(method))
    return _ClassFactory(/Class_([a-zA-Z_$][a-zA-Z_$0-9]*)/.exec(method)[1], params)
  throw error
}

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

$K_logger = null

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

/**
 * @metod requires
 *
 * Waits until a list of classes or objects are fully parsed by the browser.
 * It doesn't actually fetch any code from the server
 *
 * @param {String} list_of_objects list of elements required to proceed with the execution.
 */
function requires(list_of_objects){
    for (var i=0; i<arguments.length; i++)
    if (arguments[i] instanceof Array)
	requires.apply(null, arguments[i])
    else
	var count = 0
    while(1){
	if (count > 2)
	    break
	try{
	    eval(arguments[i])
	}catch(e){
	    alert("Wait until " + arguments[i] + " is fully parsed.")
	} finally {
	    count ++
	}
    }
}

/**
 * Dinamically called when a no existent function is invoked
 *
 * @param  {Object} error  [The error that triggers method_missing call.]
 * @param  {String} method [Name of the method that was invoked]
 * @param  {Array}  params List of params in the invokation.
 * @return {[type]}        [description]
 *
 * **NOTE:**
 *
 *  Class_<Name>() function calls generates a class with the
 *  scaffolding.
 */
function method_missing(error, method, params){
    if (/Class_[a-zA-Z_$][a-zA-Z_$0-9]*/.test(method))
return _ClassFactory(/Class_([a-zA-Z_$][a-zA-Z_$0-9]*)/.exec(method)[1], params)
throw error
}

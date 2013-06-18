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

function method_missing(error, method, params){
  if (/Class_[a-zA-Z_$][a-zA-Z_$0-9]*/.test(method))
    return _ClassFactory(/Class_([a-zA-Z_$][a-zA-Z_$0-9]*)/.exec(method)[1], params)
  throw error
}

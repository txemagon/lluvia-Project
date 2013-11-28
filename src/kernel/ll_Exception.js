MethodMissingError.prototype = new Error
MethodMissingError.prototype.constructor = MethodMissingError

function MethodMissingError(){
  Error.apply(this, arguments)
  this.name = "MethodMissingError"
}

Exception.prototype.constructor = Exception

function Exception(){
  
}

Exception.is$U = function(err, type){
  var error_with = false

  if ( /function call/i.test(type) ){
    error_with = err.toString().match(/ReferenceError:\s*([^\.]+)\s+is not defined.*/)
    if (error_with)
      error_with = error_with[1]
    else throw(err);
    }
  if ( /method call/i.test(type) )
    error_with = err.toString().match(/TypeError:\s*([^\.]+)\.([^\.]+)\s+is not a function.*/)

  if ( /singleton method/i.test(type) )
    error_with = err.toString().match(/\s*([^\.]+)\.([^\.]+)\s+is undefined.*/)
  return error_with
}

Exception.closures = 0

Exception.parse = function(err){

  var actual_parameters = []

  function get_params(method_name, obj_name){
      var search_text = obj_name ? (obj_name + ".") : ""
      search_text += method_name

      var src = (new JavascriptSource(err.fileName)).code_from(err.lineNumber-1)
      var params  = new CodeBlockFinder( src, search_text, {open:'(', close: ')'}).start()
      params = params.substr(0, params.length-1)  // Rip parenthesis

       // functions passed as parameters to dynamical methods are just functions
       // not closures.
       // 
      err.stack.split("\n")[0].search(/(.*)@/)
      var scope = eval(RegExp.$1)
      scope.closures = scope.closures || []


      var actual_parameters = CodeBlockFinder.parse_params(params.substr(1))
      
      for (var i=0; i<actual_parameters.length; i++)
        /* Parenthesis added to evaluate function definitions */
           actual_parameters[i] = eval( "(" + actual_parameters[i] + ")" )

           return actual_parameters
  }

/* Catch scoped calls*/
   var obj = null
   var m = err.toString().match(/TypeError:\s*([^\.]+)\.([^\s]*)\s+is not a function.*/)
   if ( m && (m.length == 3) )
     if ( (obj = eval(m[1])) instanceof Object){
      actual_parameters = get_params(m[2], m[1])
      
      return obj.method_missing(m[2], m[1],  actual_parameters) 
     }

/* catch global calls */
   var obj = null

   var m = err.toString().match(/ReferenceError:\s*([^\.]+)\s+is not defined.*/)
   if ( m && (m.length == 2) ){
      actual_parameters = get_params(m[1])

       // actual_parameters were evaluated twice to suppor TDD
       return method_missing(err, m[1], actual_parameters )
      }

/* catch singleton methods */
   var obj = null

   var m = err.toString().match(/\s*([^\.]+)\.([^\.]+)\s+is undefined.*/)
  if ( m && (m.length == 3) )

     if ( (obj = eval(m[1])) instanceof Object){
       actual_parameters = get_params()

       return obj.method_missing(m[2], m[1],  actual_parameters)
     }

     throw(err)
}

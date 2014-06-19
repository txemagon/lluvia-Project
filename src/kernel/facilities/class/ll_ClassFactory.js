/**
 * @method Kernel.Facilities.Class._ClassFactory
 *
 * Creates a new class
 *
 * @param  {String} class name
 * @param  {String} initial functions
 *
 * @return {String} new_class
 *
 * ###Example
 *    // Create class MyClass
 *    Class_MyClass()  // _ClassFactory is internally call and make the class.
 *
 *    // Create class Person
 *    _ClassFactory('Person', 'function initialize(name){ this.name = name }, function greet(name){ return class_name }')
 *
 */
function _ClassFactory(class_name, initial_functions){
  var whole_class_name = class_name
  class_name           = whole_class_name.split(/\$\$/)[0]
  var parent_class     = whole_class_name.split(/\$\$/)[1] || "Class"

  function parse_arguments(){
    for (var i=1; i<initial_functions.length; i++){
      if (typeof(initial_functions[i]) === "function" )
        initial_functions[i] = initial_functions[i].toSource()
      initial_functions[i].match(/function\s*([^(]*)\(/)
      if (RegExp.$1 != ""){
        var fn_name = RegExp.$1

        var class_method = /^self_/.test(fn_name)
        if (class_method)
          initial_functions[i] = initial_functions[i].replace(/function\s+self_/, "function ")

        var f = eval("$F$ = " + initial_functions[i]).deconstruct()

        var fun = []
        if (f.params != "")
          fun = f.params.clone()
        fun.push(f.body.replace(/self\./g, class_name + "."))
        if (class_method)
          try {
            eval(class_name)[f.name] = ( function(){
                                                   var super_mthd = eval(parent_class + ".prototype." + f.name);
                                                   with(this)
                                                   return eval("$$F$$ = function " + f.name + "(" + f.params + "){ this.call_before('" + f.name + "');\n " + f.body.replace(/self\./g, class_name + ".").replace(/Self(?!\s*\()/g, "(eval('this'))").replace(/Super\(\s*\)/, parent_class + "." + f.name + ".apply(this, arguments)").replace(/Super\(/, parent_class + "." + f.name + "( ") + ";\nthis.call_after('" + f.name + "');\n}" )}
                                               )()
          } catch (err) {
            alert("Impossible to create the function.\n" + err + "\n" + fun)
          }
        else
          eval(class_name).prototype[f.name] = ( function(){
                                                   var super_mthd = eval(parent_class + ".prototype." + f.name);
                                                   var Self =  function(){ return self }
                                                   var aux_body = f.body.replace(/self\./g, class_name + ".").replace(/Self(?!\s*\()/g, "(eval('this.constructor'))").replace(/Super\(\s*\)/, parent_class + ".prototype." + fn_name + ".apply(this, arguments)").replace(/Super\(/, parent_class + ".prototype." + fn_name + "( ") + ";"

                                                   eval(class_name + ".prototype._" + f.name +" = function(" + f.params + "){"+aux_body+"}")
                                                   with(this)
                                                   return eval("$$F$$ = function " + f.name + "(" + f.params + "){\n var return_value;\nthis.call_before('" + f.name + "');\n" + "return_value = this._"+ f.name +"(" + f.params + "); \nthis.call_after('" + f.name + "');\nreturn return_value;\n}" )}
                                                   //Original-->//return eval("$$F$$ = function " + f.name + "(" + f.params + "){ this.call_before('" + f.name + "');\n" + f.body.replace(/self\./g, class_name + ".").replace(/Self(?!\s*\()/g, "(eval('this.constructor'))").replace(/Super\(\s*\)/, parent_class + ".prototype." + fn_name + ".apply(this, arguments)").replace(/Super\(/, parent_class + ".prototype." + fn_name + "( ") + ";\nthis.call_after('" + f.name + "');\n}" )}
                                               )()
       }
     }
  }

  /* eval only works properly when in expressions so we've added the = sign */
  var initializer = initial_functions[0] || "function (){ }"
  if (typeof(initializer) === "function" )
     initializer = initializer.toSource()
  initializer = initializer.replace(
      /function\s*\(([^\)]*)\)\s*{(.*)/m,
      "function " + class_name + "($1){ \n \
        this.inheritance_level = this.inheritance_level || 0 \n\
        this.inheritance_level++ \n\
        try{" + parent_class + ".apply(this, arguments);}catch(err){;};\n\
        this.inheritance_level-- \n\
        var self = " + class_name + " \n\
	var that = this \n\
	$2\n\
	").replace(/}$/m,
	" \n\
        if (!" + class_name + ".initialized ){ \n\
          if (typeof(arguments[0]) != 'undefined' && arguments[0].initialize)\n\
            try{" + class_name + ".initialize()}catch(err){;}\n\
          " + class_name + ".initialized = true \n\
        }\n\
        else if (this instanceof " + class_name + " && this.inheritance_level == 0 )\n\
         try{this.initialize.apply(this, arguments)}catch(err){;} \n\
        }; \n\
      ")
   eval(class_name + "= new Function();")

  function basic_proto(){

	  eval.call(null, class_name + ".prototype = new " + parent_class + ";")
	  eval.call(null, class_name + ".prototype.constructor = " + class_name +";" )
	  eval.call(null, class_name + ".prototype.super_class = " + parent_class + ";")
	}
  basic_proto()
  var initialize = eval.call(null, "$$NeWCLaSs = " + initializer  )

  var new_class = $global_space[class_name] = initialize
basic_proto()

  parse_arguments()

  eval.call(null, class_name + ".prototype.class = " + class_name + ";")
  eval.call(null, class_name + ".superclass = function (){ return " + parent_class + "};")
  eval.call(null, class_name + ".ancestors = function (){ \n\
    var ancestor  = " + class_name + "\n\
    var ancestors = [] \n\
    while( (ancestor = ancestor.superclass()) )\n\
      ancestors.push(ancestor);\n\
    return ancestors\n\
    };")

  eval.call(null, class_name + ".Self = function (){ \n\
     return this.prototype.constructor };")
  eval.call(null, class_name + ".prototype.Self = function (){ \n\
     return this.constructor };")
  eval.call(null, class_name + ".method_missing = function(method, object, argument){ \n\
                                                     var ancestors = this.ancestors();\n\
                                                     for (var i=0; i< ancestors.length; i++)\n\
                                                       try{ return ancestors[i][method].apply(object, argument) } catch(err){;}\n\
                                                       throw ('Method missing: ' + object + '.' + method + '(' + argument + ')' )\n\
                                                     return " + parent_class + "[method].apply(object, argument) \n\
                                                  }; ")

  $global_space[class_name].call(eval(class_name + "({initialize: true})")) // Execute as a function (class initialization)
  Class.all.push(new_class)
  alert(new_class)
  return new_class
}


// todo: copy argument into arguments = [] to support inner functions


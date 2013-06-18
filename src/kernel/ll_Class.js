var $classes = []

Class.prototype = new Module
Class.prototype.constructor = Class
function Class(){
  var self = this instanceof Function ? this : eval(this.constructor.name)
  var that = this
  this.before_filters = {}
  this.after_filters  = {}
  this.attr_readers = []
  this.attr_writers = []
}

Class.prototype.create_attr = function(attr){
   if (typeof(this[attr]) == "undefined")
  this[attr] = null
}

Class.prototype.attr_reader = function (names){
   for (var i=0; i<arguments.length; i++){
      name = arguments[i]
      try{
        this.create_attr(name)
        this.attr_readers.push(name) 
        this["get" + name.replace(name[0], name[0].toUpperCase())] = this["get_" + name] = function(){ return eval("this." + name) }
      }catch(err){
         //todo: Warn something on upper debug levels if attr_reader is not supported.
      }
   }
}


Class.prototype.attr_writer = function (names){
for (var i=0; i<arguments.length; i++){
      name = arguments[i]
      try{
        this.create_attr(name)
        this.attr_writers.push(name) 
        this["set" + name.replace(name[0], name[0].toUpperCase())] = this["set_" + name] = function(value){ this[name] = value }
      }catch(err){
         //todo: Warn something on upper debug levels if attr_writer is not supported.
      }
  }
}

Class.prototype.attr_accessor = function(name){
     this.attr_reader(name) 
     this.attr_writer(name) 
}


function _$_add_filter(where, single_param){
  if (!(single_param instanceof Array))
    single_param = [single_param]
  for (var i=0; i<single_param.length; i++)
    where.push(single_param[i])
}

Class.superclass = function() { return null }
Class.ancestors  = function() { return [] }
Class.prototype.get_this   = function() { return this }
  
//todo: accept strings as argument names. Accept blocks, too.
Class.prototype.add_before_filter   = function(observed_function, filters) {
   if (typeof(this.before_filters[observed_function]) == "undefined")
      this.before_filters[observed_function] = []
   for (var i=1; i<arguments.length; i++)
      _$_add_filter(this.before_filters[observed_function], arguments[i])
}

Class.prototype.add_after_filter   = function(observed_function, filters) {

   if (typeof(this.after_filters[observed_function]) == "undefined")
      this.after_filters[observed_function] = []
   for (var i=1; i<arguments.length; i++)
      _$_add_filter(this.after_filters[observed_function], arguments[i])
}

Class.prototype.call_before = function(fn_name){
  for (var i=0; i<this.before_filters[fn_name].length; i++)
    this.before_filters[fn_name][i]();
}

Class.prototype.call_after = function(fn_name){
   alert("hello")
    for (var i=0; i<this.after_filters[fn_name].length; i++)
       this.after_filters[fn_name][i]();
}

Class.method_missing = function(method, object, args){ throw object + "." + method + "(" + args + ") invalid method call." }

function _ClassFactory(class_name, initial_functions){
  
  var whole_class_name = class_name
  class_name           = whole_class_name.split(/\$\$/)[0] 
  var parent_class     = whole_class_name.split(/\$\$/)[1] || "Class"

  function parse_arguments(){
    for (var i=1; i<initial_functions.length; i++){
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
                                                   var Self =  function(){ return "hello" }
                                                   with(this)
                                                   return eval("$$F$$ = function " + f.name + "(" + f.params + "){ this.call_before('" + f.name + "');\n" + f.body.replace(/self\./g, class_name + ".").replace(/Self(?!\s*\()/g, "(eval('this.constructor'))").replace(/Super\(\s*\)/, parent_class + ".prototype." + fn_name + ".apply(this, arguments)").replace(/Super\(/, parent_class + ".prototype." + fn_name + "( ") + ";\nthis.call_after('" + f.name + "');\n}" )} 
                                               )()
       }
     }
  }

  /* eval only works properly when in expressions so we've added the = sign */
  var initializer = initial_functions[0] || "function (){ }"
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
  $classes.push(new_class)
  return new_class
}


// todo: copy argument into arguments = [] to support inner functions


/**
 * @var $classes
 * @static
 *
 * All classes created.
 */
var $classes = []

/**
 * @class Kernel.Facilities.Class.Class
 *
 * Base class of all lluvia classes.
 *
 * @property {Object} before_filters Hash with all the functions to be called before a particular method.
 * @property {Object} after_filters  Hash with all the functions to be called after a particular method.
 *
 * ###Example
 *
 * The greet method would be called after _introduce_ and _prepare_
 *
 *     this.before_filters = { greet: [ function introduce(){ alert("introduce") },
 *                                      function prepare()  { alert("prepare")   } ]
 *
 * Do not handle theses properties directly. Use add _ before _ filter and add _ after _ filter instead.
 *
 * @property [Array] attr_readers list of getters.
 * @property [Array] attr_writers list of setters.
 */
//Class.prototype = new Module
Class.prototype.constructor = Class

function Class(){
   var self = this instanceof Function ? this : eval(this.constructor.name)
   var that = this
   this.before_filters = {}
   this.after_filters  = {}
   this.attr_readers = []
   this.attr_writers = []
}

/**
 * @method create_attr
 *
 * Creates an attribute.
 *
 * @param  {String} attr attribute to be created.
 * @param  initial_value Inital value for attr.
 * @return {Array} List of newly created attributes names.
 *
 * ###Example
 *
 *     Person.prototype = new Class
 *     Person.prototype.constructor = Person
 *
 *     function Person() {;}
 *
 *     var me = new Person()
 *     me.create_attr( 'name' )
 *     me.create_attr( 'age', 'height' )
 *     me.create_attr( ['age', 'height'] )
 *     me.create_attr( ['age', 'height'], name, ['money', 'studies'] )
 *     me.create_attr( {name: 'james', age: 22} )
 *
 */
Class.prototype.create_attr = function(attributes){

   var that = this
   var effective_attributes = []

   function add_value(attr, initial_value) {
	  if (typeof(that[attr]) == "undefined") {
		 initial_value = initial_value || null
		 that[attr] = initial_value
		 effective_attributes.push( attr )
	  }
   }

   for (var i=0; i<arguments.length; i++){
	  var attr = arguments[i]
	  if ( String.is_string$U(attr) )
		 attr = [attr]

	  if (attr instanceof Array)
		 for (var j=0; j<attr.length; j++)
	  add_value(attr[j])
	  else if (attr instanceof Object)
		 attr.self_keys().each( function(key) {
			add_value( key, attr[key] )
		 })
   }

   return effective_attributes
}

/**
 * @method attr_reader
 *
 * Decorator function that creates attribute getters along with the attribute itself.
 * It doesn't do anything if attribute exists.
 *
 * @param  { String | Array | Object } attr_names Arrays are parsed element by element.
 *         Default values are possible passing an Object as a parameter.
 *         See Class#create_attr for further details
 *
 * ###Example
 *
 *     Person.prototype = new Class
 *     Person.prototype.constructor = Person
 *
 *     function Person() {;}
 *     me = new Person()
 *     me.attr_reader('name')
 *     me.attr_reader('age', 'height')
 *
 *  Then camelcased and undescored getters are provided.
 *
 *     me.get_name()
 *     me.getName()
 *
 *
 * A big todo is to achieve the class inside usage.
 *
 *     function Person() {
 *         this.attr_reader('name')
 *     }
 *
 *
 */
Class.prototype.attr_reader = function (attr_names){
   try{
	  attr_names = this.create_attr(attr_names)

	  for(var i=0; i<attr_names.length; i++) {
		 name = attr_names[i]
		 this.attr_readers.push(name)
		 this["get" + name.replace(name[0], name[0].toUpperCase())] = this["get_" + name] = function(){ return eval("this." + name) }
	  }
   }catch(err){
	  //todo: Warn something on upper debug levels if attr_reader is not supported.
   }
}

/**
 * @method attr_writer
 *
 * Decorator function that creates attribute setters along with the attribute itself.
 * It doesn't do anything if attribute exists.
 *
 * @param  { String | Array | Object } attr_names Arrays are parsed element by element.
 *         Default values are possible passing an Object as a parameter.
 *         See Class#create_attr for further details
 *
 * ###Example
 *
 *     Person.prototype = new Class
 *     Person.prototype.constructor = Person
 *
 *     function Person() {;}
 *     me = new Person()
 *     me.attr_writer('name')
 *     me.attr_writer('age', 'height')
 *
 *  Then camelcased and undescored getters are provided.
 *
 *     me.set_name('james')
 *     me.setName('jim')
 *
 */
Class.prototype.attr_writer = function (attr_names){
   try{
	  attr_names = this.create_attr(attr_names)
	  for(var i=0; i<attr_names.length; i++) {
		 name = attr_names[i]
		 this.attr_writers.push(name)
		 this["set" + name.replace(name[0], name[0].toUpperCase())] = this["set_" + name] = function(value){ this[name] = value }
	  }
   } catch(err) {
	  //todo: Warn something on upper debug levels if attr_writer is not supported.
   }
}

/**
 * @method attr_accessor
 *
 * Creates an attribute along with a setter and a getter. See Class#attr_reader or Class#attr_writer.
 **
 * @param  { String | Array | Object } attr_names Arrays are parsed element by element.
 *         Default values are possible passing an Object as a parameter.
 *         See Class#create_attr for further details
 *
 * ###Example
 *
 *     Person.prototype = new Class
 *     Person.prototype.constructor = Person
 *
 *     function Person() {;}
 *     me = new Person()
 *     me.attr_accessor('name')
 *     me.attr_accessor('age', 'height')
 *
 */
Class.prototype.attr_accessor = function(attr_names){
   try{
	  attr_names = this.create_attr(attr_names)
	  for(var i=0; i<attr_names.length; i++) {
		 name = attr_names[i]
		 this.attr_readers.push(name)
		 this.attr_writers.push(name)
		 this["get" + name.replace(name[0], name[0].toUpperCase())] = this["get_" + name] = function(){ return eval("this." + name) }
		 this["set" + name.replace(name[0], name[0].toUpperCase())] = this["set_" + name] = function(value){ this[name] = value }
	  }
   } catch(err) {
	  //todo: Warn something on upper debug levels if attr_writer is not supported.
   }
}

/*
 * Auxiliar method.
 *
 */
function _$_add_filter(where, single_param){
   if (!(single_param instanceof Array))
	  single_param = [single_param]
   for (var i=0; i<single_param.length; i++)
   where.push(single_param[i])
}

Class.superclass = function() { return null }
Class.ancestors  = function() { return [] }
Class.prototype.get_this   = function() { return this }

/**
 * @method add_before_filter
 *
 * Adds a function to be called before a particular method invocation..
 *
 * @param  {String} observed_function Name of the method to be wrapped.
 * @param  {function()} filters Function or functions to be called before the observed one.
 *
 * ###Example
 *
 *    var a = false;
 *    var b = 0;
 *
 *    function change(){
 *      a = true;
 *    };
 *    function Person() {;}
 *
 *    Person.prototype.greet = function (name){ return class_name };
 *
 *    me = new Person('Txema');
 *    me.add_before_filter('greet', change, function(){ b = 2 } );
 *    me.greet();
 *    a //=> true
 *    b //=> 2
 *
 * todo: When defined inside class it should keep track of scope. For this purpose
 * use Function#bind nowadays.
 *
 */
//todo: accept strings as argument names. Accept blocks, too.
Class.prototype.add_before_filter   = function(observed_function, filters) {
   if (typeof(this.before_filters[observed_function]) == "undefined")
	  this.before_filters[observed_function] = []
   for (var i=1; i<arguments.length; i++)
   _$_add_filter(this.before_filters[observed_function], arguments[i])
}

/**
 * @method add_after_filter
 * Adds a function to be called before a particular method invocation..
 *
 * @param  {String} observed_function Name of the method to be wrapped.
 * @param  {function()} filters Function or functions to be called after the observed one.
 *
 * ###Example
 *
 *    var a = false;
 *    var b = 0;
 *
 *    function change(){
 *      a = true;
 *    };
 *    function Person() {;}
 *
 *    Person.prototype.greet = function (name){ return class_name };
 *
 *    me = new Person('Txema');
 *    me.add_after_filter('greet', change, function(){ b = 2 } );
 *    me.greet();
 *    a //=> true
 *    b //=> 2
 *
 * todo: When defined inside class it should keep track of scope. For this purpose
 * use Function#bind nowadays.
 *
 */
Class.prototype.add_after_filter   = function(observed_function, filters) {

   if (typeof(this.after_filters[observed_function]) == "undefined")
	  this.after_filters[observed_function] = []
   for (var i=1; i<arguments.length; i++)
   _$_add_filter(this.after_filters[observed_function], arguments[i])
}

/**
 * @method call_before
 *
 * Executes all the before filters for a given function. Filters
 * are executed automatically when _ClassFactory is used
 *
 * @param  {String} function_name Name of the observed method.
 *
 */
Class.prototype.call_before = function(fn_name){
   this.before_filters[fn_name] = this.before_filters[fn_name] || []
   for (var i=0; i<this.before_filters[fn_name].length; i++)
   this.before_filters[fn_name][i]();
}
/* todo: define a notation in _ClassFactory to avoid filters' call by default */

/**
 * @method call_after
 *
 * Executes all the after filters for a given function.
 *
 * @param  {String} function_name Name of the observed method.
 */
Class.prototype.call_after = function(fn_name){
   this.after_filters[fn_name] = this.after_filters[fn_name] || []
   for (var i=0; i<this.after_filters[fn_name].length; i++)
   this.after_filters[fn_name][i]();
}

/**
 * @method method_missing
 *
 * Throws an exception when a method is not defined.
 *
 * provides the following dynamic method:
 *
 * Class_<ClassName>()
 *
 * ###Example:
 *     // Create class MyClass
 *     Class_MyClass()
 *
 *     // Create class Person
 *     Class_Person(function(name){this.name = 'juan'},
 *                  function initialize(name){ this.name = name },
 *                  function(){this.name = 'luis'});
 *
 *
 * @param  {String} method
 * @param  {String} object
 * @param  {String} arguments
 *
 */
Class.method_missing = function(method, object, args){ throw object + "." + method + "(" + args + ") invalid method call." }



/**  Note: Extending Object's prototype will address you
 *  to the hub of hell (hellHub) in programmer's
 *  collective mind, but freedom is the rider of
 *  love. Bear it in your mind and practice:
 *
 *      Object.defineProperty(this, "nonEnum", {
 *              enumerable: false,
 *              value: 'noEnum'
 *      });
 *
 *  as much as you can.
 */
if (typeof Object.extend !== 'function') {
    Object.extend = function (o) {
	function $F() {}
	$F.prototype = o;
	return new $F();
    };
}

Object.prototype.to_a = function(){
    return [this]
}
/**
 * @method alias
 *
 * Creates a reference to an original method. Changing
 * the original one behavior, the alias is also changing.
 *
 * @param  {string} alias_name      Name of the new method.
 * @param  {string} original_method Name of the original method.
 */
Object.prototype.alias = function(alias_name, original_method){
    this[alias_name] = function(){
	return this[original_method].apply(this, arguments)
    }
}
/*
 *
 * a = {a: 2, b:3}
 * b = Object.extend(a)
 * alert(b.a)
 * b.a++
 * alert(a.a)
 * alert(b.a)
 *
 * RESULTS
 * 2,2,3
 *
 * CONCLUSIONS
 *
 * As long as the constructor $F is an inner function each time we extend/create an object
 * we get a different object, and, thus, a different prototype. In this way we don't share the
 * prototipical attribute a and b.
 */



Object._$NUM_ERR = 0.000001

Object.prototype.inspect = function(sp){
    sp = sp || [""]
    var output = "{\n"
    sp.push("")
    if (sp.length > 3)
	return ""
    for (var i in this){
	output += sp.join("\t") + i + ": \t"

	if (this[i] != null)
	    if (typeof(this[i]) == "object")
		output += (this[i].toSource? this[i].toSource(sp): this[i])
	else
	    output += this[i]
	else
	    output += "null"
	output += " \n "

    }
    sp.pop()
    output += sp.join("\t") + "}"
    return output
}

Object.prototype.keys = function(re){
    var the_keys = []
    for (var i in this)
	if (!re || re.test(i))
	    if (i !== "keys")
		the_keys.push(i)
    return the_keys
}

Object.prototype.self_keys = function(re){
    var the_keys = []
    for (var i in this)
	if (!re || re.test(i))
	    if (i !== "keys" && this.hasOwnProperty(i) )
		the_keys.push(i)
    return the_keys
}

Object.prototype.own_keys = function(re){
    return this.self_keys(re)
}

// Masking the prototype
Object.prototype.plain = function(){
    var pojo = new Object()
    for (var i in pojo){
	this[i] = null
    }
    return this
}

Object.prototype.clone = function(){
    var the_clone = {}
    for (var i in this)
	the_clone[i] = this[i]
    return the_clone
}

Object.prototype.eql$U = function(model){
    if (typeof(model) === "undefined" )
	return false

    /* End of support */
    return model.toSource() == this.toSource()
}
// Ruby no tiene esta clase. to_a solamente está en String y Array...
/*Object.prototype.to_a = function(){
  var that = []
  that.push(this)
  return that
  }*/
////////////////////////////////////////////////////////////////////

/**
 * @method _$innerObject
 *
 * ### Example
 *
 * Godman inherits from Device
 *
 *  Godman calls the Device contructor that executes:
 *
 *      this.openDevice    = _$innerObject(this, "device")
 *  So:
 *      me = that = Godman device object
 *      parentName = device
 *
 *  Anywhere inside person we can read:
 *
 *      var AHuman = this.openDevice(Human)
 *      var person = new AHuman(name)
 *
 *  openDevice returns an anonymous function that redirects all its calls
 *  to Human (the innerObject) but this function (used as a constructor)
 *  appends this.device = Godman through:
 *
 *      this[parentName] = me
 *
 * The price to be paid in exchange for this benefit is that:
 *
 *    AHuman instanceof Human == false
 *
 * So to fix this
 *
 *     $F_innerObj.prototype = new arguments[0]
 *     $F_innerObj.prototype.constructor = arguments[0]
 *
 * is added. Now
 *    AHuman instanceof Human == true
 *
 *    todo: One single property is taken into account now. A better design
 *    will accept an outer object like this: _$innerObject({device: Godman, other_key: value})
 *
 * @param {Object} that
 * @param {String} parentName
 */
function _$innerObject(that, parentName){
    var me = that
    return function(){
	var clss = arguments[0]
	var args = []
	for (var i = 1; i < arguments.length; i++)
	args.push(arguments[i])
	function $F_innerObj(){
	    if (parentName)
		this[parentName] = me;
	    else
		this.that = me
	    clss.apply(this, arguments);
	}
	$F_innerObj.prototype = new arguments[0]
	$F_innerObj.prototype.constructor = arguments[0]

	return $F_innerObj
    }
}


function implement(iface, obj){
    if (iface.iface)
	for (var i in iface.iface)
	    obj.prototype[i] = iface.iface[i]
}

/* Warning this are static methods */
Object.prototype.tainted = false
Object.prototype._trust = true
Object.prototype._FROZEN = false

Object.prototype.taint  = function (){
    this.tainted = true
}

Object.prototype.untaint  = function (){
    this.tainted = false
}

Object.prototype.tainted$U  = function (){
    return !this.tainted
}

Object.prototype.trust  = function (){
    this._trust = true
}

Object.prototype.untrust  = function (){
    this._trust = false
}

Object.prototype.untrusted$U = function (){
    return !this._trust
}

Object.prototype.trusted$U = function (){
    return this._trust
}

Object.prototype.freeze = function (){
    this._FROZEN = true
}

Object.prototype.frozen$U  = function(){
    return this._FROZEN || false
}

Object.prototype.respond_to = function(function_name){
    return typeof(this[function_name]) === "function"
}

Object.prototype.respond_to$U = function(function_name){
    return this.respond_to(function_name)
}

Object.prototype.equals = function(model){
    return this == model
}

Object.prototype.eql$U = function(model){
    return this.equals(model)
}

Object.prototype.identic = function( model ){
    if (model.respond_to("valueOf"))
	return this.value_of() == model.valueOf()
    return this === model
}

Object.prototype.to_s = function (){
    return this.toString()
}

Object.prototype.to_str = function (){
    return this.to_str()
}

Object.prototype.value_of = function (){
    if (this.respond_to("valueOf") )
	return this.valueOf()
    return this.toSource()
}

Object.prototype.is_a$U = function (clss){
    return this instanceof clss
}

Object.prototype.kind_of$U = function (clss){
    return this.is_a$U(clss)
}

Object.prototype.instance_of$U = function (clss){
    return this.constructor == clss
}

/**
 * @method_missing
 *
 * Automatically called whenever a non existing method is called
 * in an object. Provides boilerplate getter and setters.
 *
 * ###Example
 *      function N(){
 *         this.a = 2;
 *      }
 *
 *      n = new N()
 *      n.set_a(3)
 *      n.get_a()
 *      //=> 3
 *
 * @param  {string} method Method name
 * @param  {Object} obj   Scope of the method call
 * @param  {Array} params List of params of the method call
 */
Object.prototype.method_missing = function (method, obj, params){
    var that = this
    function bad_function(){
	throw(new MethodMissingError(method + " missing in " + obj + "::" + that.constructor.name +". Params: " + params.join(', ') ))
    }

    function is_in(list, word){
	var is = false
	for (var i=0; i<list.length; i++)
	if (list[i] == word)
	    is = true
	return is
    }

    obj = obj || ""
    params = params || []

    if (/get_/.test(method)){
	var attr = method.match(/get_(\w*)/)[1]
	if (!is_in(eval("" + obj + ".attr_readers"), attr))
	    bad_function()
	return eval("" + obj + "." + attr)
    }

    if (/set_/.test(method)){
	var attr  = method.match(/set_(\w*)/)[1]
	if (!is_in(eval("" + obj + ".attr_writers"), attr))
	    bad_function()
	var ob = eval("" + obj )
	ob[attr] = params[0]
	return ob[attr]
    }
    //todo: Provide camel case getter and setters
    bad_function()
}

Object.prototype.merge = function(source){
    if (!source.respond_to$U("self_keys"))
        throw "Invalid source. Impossible to merge."
    var that = this
    source.self_keys().each(function(key){
        that[key] = source[key]
    })
    return this
}

Object.prototype.soft_merge = function(source){
    if (!source.respond_to$U("self_keys"))
        throw "Invalid source. Impossible to merge."
    var that = this
    source.self_keys().each(function(key){
        that[key] = that[key] || source[key]
    })
    return this
}

Object.prototype.override = function(source){
    if (!source.respond_to$U("self_keys"))
        throw "Invalid source. Impossible to merge."
    var that = this
    source.self_keys().each(function(key){
        if (that[key])
            that[key] = source[key]
    })
    return this
}


Object.reflect = function(){
    var result
    var return_value = {}
    var calling_class = eval(this.name)

    function duplicate(original_method){
        calling_class.prototype[original_method + "$B"] = function(){
            var substitute = calling_class.prototype[original_method].apply(this, arguments)

            //this.clear()
            for (var i=0; i<substitute.length; i++)
            this[i] = substitute[i]

            return this
        }
        return [ original_method + "$B", calling_class.prototype[original_method + "$B"] ]
    }

    for(var i=0; i<arguments.length; i++)
    if (arguments[i] instanceof Array)
        for(var j=0; j<arguments[i].length; j++){
            result = duplicate(arguments[i][j])
            return_value[result[0]] = result[1]
        }
        else {
            result = duplicate(arguments[i])
            return_value[result[0]] = result[1]
        }
        return return_value

}

Object.bang_methods = ["merge", "soft_merge", "override"]
Object.reflect(Object.bang_methods)

delete(Object.reflect)

Object.prototype.alias("own_keys", "self_keys")

/* Non enumerable properties */

var $$_$$ = [ "to_a", "alias", "inspect", "own_keys",
    "plain", "clone", "eql$U", "taint", "untaint", "tainted$U", "trust",
    "untrust", "untrusted$U", "trusted$U", "freeze", "frozen$U",
    "equals", "eql$U", "identic",
    "to_s", "to_string", "to_str", "is_a$U", "kind_of$U",
    "instance_of$U",
    "bang_methods",
    "merge", "merge$B",
    "keys", "self_keys", "respond_to", "respond_to$U",
    "soft_merge", "soft_merge$B", "override", "override$B",
    "method_missing"
]

for (var i=0; i<$$_$$.length; i++)
   Object.defineProperty(Object.prototype, $$_$$[i], { enumerable: false })

delete($$_$$)

/* Value property has to be defined at the end, as long as
 * it is used by defined property */
Object.defineProperty( Object.prototype, "value", { value: function (){
    return this.value_of()
}, enumerable: false })


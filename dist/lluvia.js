Function.prototype.bind = function (object)
{
	var method = this;
	return function ()
	{
		return method.apply(object, arguments);
	};
};
function Event()
{
	this.events = [];
	this.builtinEvts = [];
}
Event.prototype.getActionIdx = function(obj,evt,action,binding)
{
	if(obj && evt)
	{
		var curel = this.events[obj][evt];
		if(curel)
		{
			var len = curel.length;
			for(var i = len-1;i >= 0;i--)
			{
				if(curel[i].action == action && curel[i].binding == binding)
				{
					return i;
				}
			}
		}
		else
		{
			return -1;
		}
	}
	return -1;
};
Event.prototype.addListener = function(obj,evt,action,binding)
{
	if(this.events[obj])
	{
		if(this.events[obj][evt])
		{
			if(this.getActionIdx(obj,evt,action,binding) == -1)
			{
				var curevt = this.events[obj][evt];
				curevt[curevt.length] = {action:action,binding:binding};
			}
		}
		else
		{
			this.events[obj][evt] = [];
			this.events[obj][evt][0] = {action:action,binding:binding};
		}
	}
	else
	{
		this.events[obj] = [];
		this.events[obj][evt] = [];
		this.events[obj][evt][0] = {action:action,binding:binding};
	}
};
Event.prototype.removeListener = function(obj,evt,action,binding)
{
	if(this.events[obj])
	{
		if(this.events[obj][evt])
		{
			var idx = this.actionExists(obj,evt,action,binding);
			if(idx >= 0)
			{
				this.events[obj][evt].splice(idx,1);
			}
		}
	}
};
Event.prototype.fireEvent = function(e,obj,evt,args)
{
	if(!e){e = window.event;}
	if(obj && this.events)
	{
		var evtel = this.events[obj];
		if(evtel)
		{
			var curel = evtel[evt];
			if(curel)
			{
				for(var act in curel)
				{
					var action = curel[act].action;
					if(curel[act].binding)
					{
						action = action.bind(curel[act].binding);
					}
					action(e,args);
				}
			}
		}
	}
};
Event.prototype.getBuiltinListenerIdx = function(obj,evt,action,binding)
{
	for(var i = this.builtinEvts.length-1;i >= 0;i--)
	{
		var ArrayEl = this.builtinEvts[i];
		if(ArrayEl)
			if(ArrayEl.obj == obj && ArrayEl.evt == evt && ArrayEl.action == action && ArrayEl.binding == binding)
				return i;
	}
	return -1;
};
Event.prototype.addBuiltinListener = function(obj,evt,action,binding, captura)
{
	if(obj && evt && action)
	{
		if(this.getBuiltinListenerIdx(obj,evt,action,binding) < 0)
		{
			var boundAction = action;
			if(binding)
				boundAction = action.bind(binding);
			if(obj.addEventListener)
				if (!captura)
					obj.addEventListener(evt,boundAction, false);
				else
					obj.addEventListener(evt,boundAction, captura);
			else if(obj.attachEvent)
				obj.attachEvent('on' + evt,boundAction);
			else
				obj['on' + evt] = boundAction;
			this.builtinEvts[this.builtinEvts.length] = {obj:obj,evt:evt,action:action,binding:binding,boundAction:boundAction};
		}
	}
};
Event.prototype.removeBuiltinListener = function(obj,evt,action,binding)
{
	for(var i = this.builtinEvts.length-1;i >= 0;i--)
	{
		var ArrayEl = this.builtinEvts[i];
		if(ArrayEl)
		{
			if(obj && evt && action && binding){
				if(ArrayEl.obj == obj && ArrayEl.evt == evt && ArrayEl.action == action && ArrayEl.binding == binding)
				{
					this.detachListener(ArrayEl,i);
					break;
				}
			}else if(obj && evt && action){
				if(ArrayEl.obj == obj && ArrayEl.evt == evt && ArrayEl.action == action)
					this.detachListener(ArrayEl,i);
			}else if(obj && evt){
				if(ArrayEl.obj == obj && ArrayEl.evt == evt)
					this.detachListener(ArrayEl,i);
			}else if(obj){
				if(ArrayEl.obj == obj)
					this.detachListener(ArrayEl,i);
			}else
				this.detachListener(ArrayEl,i);
		}
	}
};
Event.prototype.detachListener = function(arrayEl,idx)
{
	var obj = arrayEl.obj;
	var evt = arrayEl.evt;
	var boundAction = arrayEl.boundAction;
	if(obj.removeEventListener)
		obj.removeEventListener(evt,boundAction,false);
	evt = 'on' + evt;
	if(obj.detachEvent)
		obj.detachEvent(evt,boundAction);
	obj[evt] = null;
	delete arrayEl.obj;
	delete arrayEl.evt;
	delete arrayEl.action;
	delete arrayEl.binding;
	delete arrayEl.boundAction;
	delete this.builtinEvts[idx];
	this.builtinEvts.splice(idx,1);
};
Point.prototype.constructor = Point;
function Point(coordX, coordY){
	if ((arguments.length == 1) && (arguments[0] instanceof Point)){
		this.x = arguments[0].x;
		this.y = arguments[0].y;
		return this;
	}
	this.x = coordX;
	this.y = coordY;}
Point.prototype.multiply = function (amount){
	this.x *= amount;
	this.y *= amount;}
Point.prototype.divide = function (amount){
	this.x /= amount;
	this.y /= amount;}
rectangle.prototype.constructor = rectangle;
function rectangle(coord,dimen){
	this.x0 = coord.x;
	this.y0 = coord.y;
	this.x1 = this.x0 + dimen.x;
	this.y1 = this.y0 + dimen.y;}
rectangle.prototype.getRectDimen = function(){
			return new Point(this.x1 - this.x0, this.y1 - this.y0);
} 
rectangle.prototype.getRectCoord = function(){
	return new Point(this.x0, this.y0);}rectangle.prototype.displace = function (despl){
	this.x0 += despl.x;
	this.y0 += despl.y;
	this.x1 += despl.x;
	this.y1 += despl.y;
}
rectangle.prototype.elarge = function (despl){
	this.x1 += despl.x;
	this.y1 += despl.y;}
Continue.prototype.constructor = Continue;function Continue(magnitude){	this.magnitude0 = new magnitude.constructor(magnitude);	this.magnitude  = new magnitude.constructor(magnitude);}Continue.prototype.set = function (magnitude){	this.magnitude0 = this.magnitude;	this.magnitude  = new magnitude.constructor(magnitude);}Continue.prototype.clone = function(){	var copy = new Continue(this.magnitude);	copy.magnitude0 = this.magnitude0;	return copy;	}Continue.prototype.derive = function(regard){	var derived = this.clone().magnitude;	var prp = new Array();	for (var j in regard.magnitude)		prp.push(j);	for (var i in derived)		try{			derived[i] = (this.magnitude[i] - this.magnitude0[i]) / (regard.magnitude[prp[0]] - regard.magnitude0[prp[0]]);		} catch (error) {			alert("The derivative is infinite: " + error.toString());			}	return derived;}Continue.prototype.differential = function (regard){	var differential = this.clone().magnitude;	var prp = new Array();	for (var j in regard.magnitude)		prp.push(j);	for (var i in differential)			differential[i] = this.magnitude[i] * (regard.magnitude[prp[0]] - regard.magnitude0[prp[0]]);	return differential;}Continue.prototype.integrate = function(amount){	var newValue = this.clone().magnitude;	for( var i in newValue)		newValue[i] += amount[i];		this.magnitude = newValue;}Time.prototype.constructor = Time;function Time(t){	if ((arguments.length == 1) && (arguments[0] instanceof Time)){		this.date = arguments[0].date;		return this;	}	this.date = t;}Mobile.prototype.constructor = Mobile;function Mobile(position, velocity, acceleration, time){	this.position     = new Continue(position);	this.velocity     = new Continue(velocity);	this.acceletation = new Continue(acceleration);	this.moment       = new Continue(time);}Mobile.prototype.update = function(moment){	var i = this.moment.clone();	delete i;	this.moment.set(moment);	this.velocity.moment(this.acceleration.differential(this.moment));	this.position.moment(this.velocity.differential(this.moment));}SystemDamped.prototype.constructor = SystemDamped;function SystemDamped(rigidity, damping, mass, initialPosition, anchorage){	this.rigideity = rigidity;	this.damping   = damping;	this.mass      = mass;	this.position  = new Mobile(initialPosition, new Point(0,0), new Point(0,0), new Point(0,0));	this.anchorage = new Mobile(anchorage, new Point(0,0), new Point(0,0), new Point(0,0));}SystemDamped.prototype.update = function(moment){	var Frx = - this.rigidity * (this.position.positcion.magnitude.x - this.anchorage.position.magnitude.x);	var Fry = - this.rigidity * (this.position.position.magnitude.y - this.anchorage.position.magnitude.y);	var Fvx = - this.damping / this.mass * this.position.velocity.magnitude.x;	var Fvy = - this.damping / this.mass * this.position.velocity.magnitude.y;	this.position.acceleration.set(new Point((Frx+ Fvx) / this.mass, (Fry + Fvy)/this.mass));	this.position.update(moment);}
$KC_dl = {    USER: 0,    PROGRAMMER: 25,    TESTING: 50,    DEVELOPER: 100,    INNERWORKING: 200}try {	$K_debug_level}catch (e) {	$K_debug_level = $KC_dl.USER}$K_logger = console$global_space = (function(){return this;}).call(null)$global_space["$constants"] = []function O(variable){  var t = typeof(variable)  if (t === "boolean" || t === "number" || t === "string"){    t = t.charAt(0).toUpperCase() + t.slice(1)    if (t !== "String")      return eval("new " + t + "(" + variable + ")")    else      return eval("new " + t + "('" + variable + "')")  }  return variable}function requires(list_of_objects){    for (var i=0; i<arguments.length; i++)    if (arguments[i] instanceof Array)	requires.apply(null, arguments[i])    else	var count = 0    while(1){	if (count > 2)	    break	try{	    eval(arguments[i])	}catch(e){	    alert("Wait until " + arguments[i] + " is fully parsed.")	} finally {	    count ++	}    }}function method_missing(error, method, params){    if (/Class_[a-zA-Z_$][a-zA-Z_$0-9]*/.test(method))return _ClassFactory(/Class_([a-zA-Z_$][a-zA-Z_$0-9]*)/.exec(method)[1], params)throw error}MethodMissingError.prototype = new Error
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
Exception.parse = function(err, source_code){
  var actual_parameters = []
  function get_params(method_name, obj_name){
      var search_text = obj_name ? (obj_name + ".") : ""
      search_text += method_name
      var src = source_code || (new JavascriptSource(err.fileName)).code_from(err.lineNumber-1)
      var params  = new CodeBlockFinder( src, search_text, {open:'(', close: ')'}).start()
      params = params.replace(/\(\s*/, "")
      params = params.replace(/\s*\)\s*$/, "")
      var actual_parameters = CodeBlockFinder.parse_params(params)
      for (var i=0; i<actual_parameters.length; i++)
           actual_parameters[i] = eval( "(" + actual_parameters[i] + ")" )
           return actual_parameters
  }
   var obj = null
   var m = err.toString().match(/TypeError:\s*([^\.]+)\.([^\s]*)\s+is not a function.*/)
   if ( m && (m.length == 3) )
     if ( (obj = eval(m[1])) instanceof Object){
      actual_parameters = get_params(m[2], m[1])
      return obj.method_missing(m[2], m[1],  actual_parameters) 
     }
   var obj = null
   var m = err.toString().match(/ReferenceError:\s*([^\.]+)\s+is not defined.*/)
   if ( m && (m.length == 2) ){
      actual_parameters = get_params(m[1])
       return method_missing(err, m[1], actual_parameters )
      }
   var obj = null
   var m = err.toString().match(/\s*([^\.]+)\.([^\.]+)\s+is undefined.*/)
  if ( m && (m.length == 3) )
     if ( (obj = eval(m[1])) instanceof Object){
       actual_parameters = get_params()
       return obj.method_missing(m[2], m[1],  actual_parameters)
     }
     throw(err)
}
Object.prototype.to_a = function() {
    return [this]
}
Object.prototype.rip_array = function(object) {
    var res = []
    for (var i in object)
        if (parseInt(i))
            res[parseInt(i)] = object[i]
    return res
}
Object.prototype.alias = function(alias_name, original_method) {
    this[alias_name] = function() {
        return this[original_method].apply(this, arguments)
    }
    if (!this.propertyIsEnumerable(original_method))
        this.stop_enumerating(alias_name)
}
Object._$NUM_ERR = 0.000001
Object.prototype.inspect = function(sp) {
    sp = sp || [""]
    var output = "{\n"
    sp.push("")
    if (sp.length > 3)
        return ""
    for (var i in this) {
        output += sp.join("\t") + i + ": \t"
        if (this[i] != null)
            if (typeof(this[i]) == "object")
                output += (this[i].toSource ? this[i].toSource(sp) : this[i])
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
Object.prototype.keys = function(re) {
    var the_keys = []
    for (var i in this)
        if (!re || re.test(i))
            if (i !== "keys")
                the_keys.push(i)
    return the_keys
}
Object.prototype.self_keys = function(re) {
    var the_keys = []
    for (var i in this)
        if (!re || re.test(i))
            if (i !== "keys" && this.hasOwnProperty(i))
                the_keys.push(i)
    return the_keys
}
Object.prototype.clone = function() {
    var the_clone = {}
    for (var i in this)
        the_clone[i] = this[i]
    return the_clone
}
function _$innerObject(that, parentName) {
    var me = that
    return function() {
        var clss = arguments[0]
        var args = []
        for (var i = 1; i < arguments.length; i++)
            args.push(arguments[i])
        function $F_innerObj() {
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
function implement(iface, obj) {
    if (iface.iface)
        for (var i in iface.iface)
            obj.prototype[i] = iface.iface[i]
}
Object.prototype.tainted = false
Object.prototype._trust = true
Object.prototype._FROZEN = false
Object.prototype.taint = function() {
    this.tainted = true
}
Object.prototype.untaint = function() {
    this.tainted = false
}
Object.prototype.tainted$U = function() {
    return !this.tainted
}
Object.prototype.trust = function() {
    this._trust = true
}
Object.prototype.untrust = function() {
    this._trust = false
}
Object.prototype.untrusted$U = function() {
    return !this._trust
}
Object.prototype.trusted$U = function() {
    return this._trust
}
Object.prototype.freeze = function() {
    this._FROZEN = true
}
Object.prototype.frozen$U = function() {
    return this._FROZEN || false
}
Object.prototype.respond_to = function(function_name) {
    return typeof(this[function_name]) === "function"
}
Object.prototype.alias("respond_to$U", "respond_to")
Object.prototype.eql$U = function(model) {
    if (typeof(model) === "undefined")
        return false
    return model.toSource() == this.toSource()
}
Object.prototype.equals = function(model) {
    return this == model
}
Object.prototype.value_of = function() {
    if (this.respond_to("valueOf"))
        return this.valueOf()
    return this.toSource()
}
Object.prototype.identic = function(model) {
    if (model.respond_to("valueOf"))
        return this.value_of() == model.valueOf()
    return this === model
}
Object.prototype.to_s = function() {
    return this.toString()
}
Object.prototype.to_str = function() {
    return this.to_s()
}
Object.prototype.is_a$U = function(clss) {
    return this instanceof clss
}
Object.prototype.alias("kind_of$U", "is_a$U")
Object.prototype.alias("instance_of$U", "is_a$U")
Object.prototype.method_missing = function(method, obj, params) {
    var that = this
        function bad_function() {
            throw (new MethodMissingError(method + " missing in " + obj + "::" + that.constructor.name + ". Params: " + params.join(', ')))
        }
        function is_in(list, word) {
            var is = false
            for (var i = 0; i < list.length; i++)
                if (list[i] == word)
                    is = true
            return is
        }
    obj = obj || ""
    params = params || []
    if (/get_/.test(method)) {
        var attr = method.match(/get_(\w*)/)[1]
        if (!is_in(eval("" + obj + ".attr_readers"), attr))
            bad_function()
        return eval("" + obj + "." + attr)
    }
    if (/set_/.test(method)) {
        var attr = method.match(/set_(\w*)/)[1]
        if (!is_in(eval("" + obj + ".attr_writers"), attr))
            bad_function()
        var ob = eval("" + obj)
        ob[attr] = params[0]
        return ob[attr]
    }
    bad_function()
}
Object.prototype.merge = function(source) {
    if (!source.respond_to$U("self_keys"))
        throw "Invalid source. Impossible to merge."
    var that = this
    source.self_keys().each(function(key) {
        that[key] = source[key]
    })
    return this
}
Object.prototype.soft_merge = function(source) {
    if (!source.respond_to$U("self_keys"))
        throw "Invalid source. Impossible to merge."
    var that = this
    source.self_keys().each(function(key) {
        that[key] = that[key] || source[key]
    })
    return this
}
Object.prototype.override = function(source) {
    if (!source.respond_to$U("self_keys"))
        throw "Invalid source. Impossible to merge."
    var that = this
    source.self_keys().each(function(key) {
        if (that[key])
            that[key] = source[key]
    })
    return this
}
Object.prototype.stop_enumerating = function(methods) {
    for (var i = 0; i < arguments.length; i++)
        if (arguments[i] instanceof Array)
            Object.prototype.stop_enumerating.apply(this, arguments[i])
        else
            Object.defineProperty(this, arguments[i], {
                value: this[arguments[i]],
                enumerable: false
            })
}
Object.reflect = function() {
    var result
    var return_value = {}
    var calling_class = eval(this.name)
        function duplicate(original_method) {
            calling_class.prototype[original_method + "$B"] = function() {
                var substitute = calling_class.prototype[original_method].apply(this, arguments)
                for (var i = 0; i < substitute.length; i++)
                    this[i] = substitute[i]
                return this
            }
            return [original_method + "$B", calling_class.prototype[original_method + "$B"]]
        }
    for (var i = 0; i < arguments.length; i++)
        if (arguments[i] instanceof Array)
            for (var j = 0; j < arguments[i].length; j++) {
                result = duplicate(arguments[i][j])
                return_value[result[0]] = result[1]
            } else {
                result = duplicate(arguments[i])
                return_value[result[0]] = result[1]
            }
    return return_value
}
Object.bang_methods = ["merge", "soft_merge", "override"]
Object.reflect(Object.bang_methods)
Object.prototype.alias("own_keys", "self_keys")
Object.prototype.stop_enumerating(["to_a", "alias", "inspect", "own_keys",
    "plain", "clone", "eql$U", "taint", "untaint", "tainted$U", "trust",
    "untrust", "untrusted$U", "trusted$U", "freeze", "frozen$U",
    "equals", "eql$U", "identic",
    "to_s", "to_string", "to_str", "is_a$U", "kind_of$U",
    "instance_of$U",
    "bang_methods",
    "merge", "merge$B",
    "keys", "self_keys", "respond_to", "respond_to$U", "rip_array",
    "soft_merge", "soft_merge$B", "override", "override$B",
    "method_missing", "stop_enumerating",
    "tainted", "_trust", "_FROZEN", "value_of"
])
Object.stop_enumerating("reflect")
Object.defineProperty(Object, "constructor", {
  writable: true,
  enumerable: false
})
Object.defineProperty(Object, "super", {
  writable: true,
  enumerable: false
})
Number.ERROR = 0.00001
Number.eql$U = function(model, value){
   if (typeof(model) === "number")
     return (model > (value - Number.ERROR)) && (model < (value + Number.ERROR))
   return this == model
}
isNumber = is_number = is_a_number = isANumber = isNumber$U = is_number$U = is_a_number$U = isANumber$U = function(op){ return !isNaN(op) }
Function.prototype.bind = function(object) {
    var f = this
    return function() {
        f.apply(object, arguments)
    }
}
Function.prototype.bind_params = function() {
    var args = arguments
    var f = this
    return function() {
        f.apply(f, args)
    }
}
Function.prototype.yield = function() {
    for (var i = this.arguments.length - 1; i >= 0; i--)
        if (typeof(this.arguments[i]) === "function")
            return this.arguments[i].apply(this, arguments)
}
Function.prototype.get_block = function() {
    for (var i = this.arguments.length - 1; i >= 0; i--)
        if (typeof(this.arguments[i]) === "function")
            return this.arguments[i]
}
Function.prototype.block_given$U = function() {
    var given = false
    for (var i = this.arguments.length - 1; !given && i >= 0; i--)
        if (typeof(this.arguments[i]) === "function")
            given = this.arguments[i]
    return given
}
Function.prototype.deconstruct = function() {
    return {
        name: this.name,
        params: this.toSource().match(/function[^\(]*\(([^)]*)\)/)[1].split(","),
        body: this.toSource().match(/{(.*)}/)[1]
    }
}
Function.deconstruct = function(src) {
    return {
        name: src.match(/function\s+([^\(]+)/)[1],
        params: src.match(/function[^\(]*\(([^)]*)\)/)[1].split(","),
        body: src.match(/{(.*)}/)[1]
    }
}
Function.prototype.extend = function(superclass, args) {
    var that = this
    var s = new superclass()
    s.keys().each(function(k) {
        that.prototype[k] = s[k];
    })
    superclass.keys().each(function(k) {
        that.prototype[k] = superclass[k];
    })
    if (this.Class && this.Class.before_extended && (typeof(this.Class.before_extended) == "function"))
        this.super.Class.before_extended.apply(this, args)
    if (this.Class && this.Class.after_extended && (typeof(this.Class.after_extended) == "function"))
        this.super.Class.after_extended(this)
}
Function.prototype.reflect = function() {
    var result
    var return_value = {}
    var calling_class = eval(this.name)
    function duplicate(original_method) {
        calling_class.prototype[original_method + "$B"] = function() {
            var substitute = calling_class.prototype[original_method].apply(this, arguments)
            for (var i = 0; i < substitute.length; i++)
                this[i] = substitute[i]
            return this
        }
        return [original_method + "$B", calling_class.prototype[original_method + "$B"]]
    }
    for (var i = 0; i < arguments.length; i++)
        if (arguments[i] instanceof Array)
            for (var j = 0; j < arguments[i].length; j++) {
                result = duplicate(arguments[i][j])
                return_value[result[0]] = result[1]
            } else {
                result = duplicate(arguments[i])
                return_value[result[0]] = result[1]
            }
    return return_value
}
String.prototype.capitalize = function() {
    word = this.toLowerCase()
    return word.replace(word[0], word[0].toUpperCase())
}
String.prototype.humanize = function() {
    var word = this.strip()
    var first = word[0]
    word = word.substring(1).replace(/_+/g, " ").replace(/([A-Z])/g, " $1").replace(/\s+/g, " ")
    to_lower = word.downcase()
    return first + (to_lower ? to_lower : word)
}
String.prototype.underscore = function() {
    return this.humanize().replace(/\s+_*/g, "_")
}
String.prototype.camel_case = function() {
    var sentence = ""
    var first = this.strip()[0]
    this.strip().split(/[\s_]+/g).each(function(word) {
        sentence += word[0].toUpperCase()
        sentence += word.substring(1)
    })
    return first + sentence.substring(1)
}
String.prototype.class_name = function() {
    var sentence = ""
    var first = this.strip()[0]
    this.strip().split(/[\s_]+/g).each(function(word) {
        sentence += word[0].toUpperCase()
        sentence += word.substring(1)
    })
    return first.toUpperCase() + sentence.substring(1)
}
String.prototype.index = function() {
    if (arguments.length == 0 || arguments.length > 2)
        return null
    var pos
    var str = arguments[0].toString()
    if (arguments.length > 1) {
        pos = this.normalize_index(arguments[1])
        if (pos == null)
            return pos
        var find = this.substr(pos, this.length - pos)
    }
    if (str[0] == '/' && str[str.length - 1] == '/' && str[1] == '[' && str[str.length - 2] == ']') {
        var min = this.length
        var entradoAlMenosUnaVez = false
        for (var i = 2; i < str.length - 2; i++)
            if (min >= find.search(str[i]) && find.search(str[i]) >= 0) {
                min = find.search(str[i]) + pos
                entradoAlMenosUnaVez = true
            }
        return min >= 0 && entradoAlMenosUnaVez ? min : null
    }
    return this.indexOf(arguments[0]) < 0 ? null : this.indexOf(arguments[0])
}
String.prototype.normalize_index = function() {
    if (typeof(arguments[0]) === "number")
        if (arguments[0] < 0 ? Math.abs(arguments[0]) <= this.length : Math.abs(arguments[0]) <= this.length - 1)
            return arguments[0] < 0 ? arguments[0] + this.length : arguments[0]
    return null
}
String.prototype.insert = function() {
    if (arguments.length == 0 || arguments.length > 2)
        return null
    if (arguments[0] == this.length)
        return this + arguments[1]
    else if (arguments[0] == -(this.length + 1))
        return arguments[1] + this
    var pos = arguments[0] >= 0 ? this.normalize_index(arguments[0]) : this.normalize_index(arguments[0]) + 1
    if (this.normalize_index(arguments[0]) == null)
        return null
    var str = ""
    for (var i = 0; i <= this.length; i++)
        if (i == pos) {
            str = str + arguments[1]
            var add = true
        } else
    if (!i == 0 && add)
        str = str + this[i - 1]
    else
        str = str + this[i]
    return str
}
String.prototype.ljust = function() {
    var str = this
    var j = 0
    for (var i = 0; i < (arguments[0] - this.length); i++)
        if (arguments.length > 1 && arguments[1].length > 1)
            str = str + arguments[1][i % arguments[1].length]
        else
    if (arguments.length > 1)
        str = str + arguments[1]
    else
        str = str + " "
    return str
}
String.prototype.lstrip = function() {
    return this.replace(/^\s+/g, "")
}
String.prototype.swapcase = function() {
    var str = []
    for (var i = 0; i < this.length; i++) {
        if ((this[i].charCodeAt(0) > 64) && (this[i].charCodeAt(0) < 97)) {
            str[i] = this[i].toLowerCase()
        } else {
            str[i] = this[i].toUpperCase()
        }
    }
    var word = str.join("")
    return word
}
String.prototype.empty$U = function() {
    if (arguments.length > 0)
        return null
    return this.length > 0 ? false : true
}
String.prototype.downcase = function() {
    return this.toLowerCase() == this ? null : this.toLowerCase()
}
String.prototype.casecmp = function() {
    if (arguments.length < 1)
        throw ("ArgumentError: Wrong number of arguments")
    var str1 = this.toLowerCase()
    var str2 = arguments[0].toLowerCase()
    return ((str1 == str2) ? 0 : ((str1 > str2) ? 1 : -1));
}
String.prototype.ord = function() {
    return this.charCodeAt(0)
}
String.prototype.oct = function() {
    oct = this.match(/^[(-7)-7]+/)
    oct = oct || ["0"]
    return parseInt(oct[0], 8)
}
String.prototype.reverse = function() {
    return this.split("").reverse().join("")
}
String.prototype.include$U = function() {
    return (this.lastIndexOf(arguments[0]) > -1) ? true : false
}
String.prototype.include_some_of$U = function() {
    var included = false
    for (var i = 0; i < arguments.length; i++) {
        if (typeof(arguments[i]) == "string")
            included = included || this.include$U(arguments[i])
        if (arguments[i] instanceof Array)
            included = included || String.prototype.include_some_of$U.apply(this, arguments[i])
    }
    return included
}
String.prototype.rindex = function(search) {
    if (arguments.length == 0)
        return null
    return (this.lastIndexOf(search) > 0) ? this.lastIndexOf(search) : false
}
String.prototype.center = function(length, padding) {
    if (arguments.length == 0 || arguments.length > 2)
        throw ("wrong number arguments")
    if (this.length >= length)
        return this
    var str = ""
    var i = 0
    var j = 0
    while (i <= (length - this.length)) {
        if (i == (length - this.length) / 2) {
            j = 0
            str += this
        } else if (arguments.length > 1) {
            str += padding.length == 1 ? padding : padding[j]
            j = (j + 1) % padding.length
        } else
            str += " "
        i++
    }
    return str
}
String.prototype.chomp = function() {
    if (arguments.length == 1)
        return this.replace(arguments[0], "")
    if (this.search(/\r\n/i) == this.length - 2)
        return this.replace("\r\n", "")
    if (this.search(/\r/i) == this.length - 1)
        return this.replace("\r", "")
    if (this.search(/\n/i) == this.length - 1)
        return this.replace("\n", "")
    return this
}
String.prototype.chop = function() {
    if (arguments.length > 0)
        return null
    var str = this.chomp()
    if (str.length == this.length)
        return str.slice(0, this.length - 1)
    return str
}
String.prototype.hex = function() {
    if (this.search("0x") == 0)
        return parseInt(this)
    return isNaN(parseInt(this, 16)) ? 0 : parseInt(this, 16)
}
String.prototype.chr = function() {
    if (this.length > 1)
        return this[0]
    return this
}
String.prototype.rjust = function() {
    if (this.length >= arguments[0])
        return this
    var str = ""
    var i = 0
    while (i < (arguments[0] - this.length)) {
        if (arguments.length > 1) {
            str += arguments[1].length == 1 ? arguments[1] : arguments[1][i % arguments[1].length]
        } else
            str += " "
        i++
    }
    return str + this
}
String.prototype.succ = function() {
    var str = ""
    var i
    var vuelta = true
    for (i = this.length - 1; i >= 0 && vuelta; i--) {
        if (this[i] == '>' || this[i] == '<')
            str = this[i] + str
        else if (this[i] == 'z' || this[i] == 'Z')
            str = (this[i] == 'z' ? 'a' : 'A') + str
        else if (this[i] == '9')
            str = '0' + str
        else
            str = String.fromCharCode(this[i].charCodeAt() + 1) + str
        vuelta = this[i] == 'z' || this[i] == 'Z' || this[i] == '9' || this[i] == '<' || this[i] == '>'
    }
    if (this[0] == '<' && i < 0 && (this[2] == 'z' || this[2] == 'Z'))
        return "<<" + str[2] + str.substr(2, str.length - 2)
    else if (this[0] == '<' && i < 0 && this[2] == '9')
        return "<<" + str[2].succ() + str.substr(2, str.length - 2)
    return i < 0 && (this[0] == 'z' || this[0] == 'Z') ? str[0] + str : i < 0 && this[0] == '9' ? str[0].succ() + str : this.substr(0, i + 1) + str
}
String.prototype.next = function() {
    return this.succ.apply(this, arguments)
}
String.prototype.to_i = function() {
    var base = 10 
    var result = 0 
    if (arguments.length > 1)
        return null
    if (arguments.length != 0)
        if (isNaN(arguments[0]) || (arguments[0] < 2) || (arguments[0] > 36))
            return null
        else base = arguments[0]
    return isNaN(parseInt(this, base)) ? 0 : parseInt(this, base)
}
String.prototype.to_f = function() {
    if (arguments.length > 0)
        return null
    return isNaN(parseFloat(this)) ? 0.0 : parseFloat(this);
}
String.prototype.strip = function() {
    return this.lstrip().rstrip()
}
String.prototype.setbyte = function(position, ascii) {
    var that = this.split("")
    if (arguments[0] < that.length)
        that[arguments[0]] = String.fromCharCode(arguments[1])
    else
        return null
    str = ""
    for (var i = 0; i < that.length; i++)
        str += that[i]
    return str
}
String.prototype.partition = function() {
    var ary = [3]
    var str = arguments[0].toString()
    var pos = this.search(arguments[0])
    if (pos < 0)
        ary = [this.substr(0, this.length), "", ""]
    else if (str[0] == '/' && str[str.length - 1] == '/')
        ary = [this.substr(0, pos), this.substr(pos, str.length - 2), this.substr(pos + str.length - 2, this.length - pos)]
    else
        ary = [this.substr(0, pos), this.substr(pos, str.length), this.substr(pos + str.length, this.length - pos)]
    return ary
}
String.prototype.rstrip = function() {
    return this.replace(/\s+$/g, '')
}
String.prototype.upto = function(end, block) {
    var num = this
    var str = ""
    while (num != arguments[0] && num.length <= arguments[0].length && num < arguments[0]) {
        str += String.prototype.upto.yield(num)
        num = num.succ()
    }
    if (num.length > arguments[0].length)
        return str
    return str + String.prototype.upto.yield(num)
}
String.prototype.each_char = function() {
    var str = ""
    for (var i = 0; i < this.length; i++)
        str += String.prototype.each_char.yield(this[i])
    return str
}
String.prototype.chars = function() {
    return this.each_char.apply(this, arguments)
}
String.prototype.sum = function() {
    var suma = 0
    for (var i = 0; i < this.length; i++)
        suma += this.charCodeAt(i)
    return suma
}
String.prototype.intersection = function() {
    var str = this
    for (var i = 0; i < arguments.length; i++) {
        var regex = "[" + arguments[i] + "]"
        str = str.match(new RegExp(regex, "g")).join("")
    }
    return str
}
String.prototype.sub = function(pattern, replacement) {
    return this.replace(pattern, replacement)
}
String.prototype.bytes = function() {
    for (var i = 0; i < this.length; i++)
        return this.charCodeAt(i)
}
String.prototype.ascii_only$U = function() {
    return isNaN(this)
}
String.prototype.each_line = function(split) {
    var ary = this
    var arycpy = [] 
    var posEnd = 0 
    var ind = 0 
    var regExp = /\n/g
    var argZero = false 
    if (arguments.length == 0 || arguments.length > 2)
        return null
    if (typeof(arguments[0]) !== "function") {
        if (arguments[0] != "")
            regExp = RegExp(arguments[0])
        else {
            regExp = /\n{2,}/g
            argZero = true
        }
    }
    posEnd = ary.search(regExp) + 1
    while ((posEnd < ary.length) && (posEnd > 0)) {
        if (argZero) {
            var trash = ary.substring(posEnd)
            posEnd += trash.search(/./g)
        }
        arycpy[ind] = ary.substring(0, posEnd)
        ary = ary.substring(posEnd)
        arycpy[ind] = ary.each_line.yield(arycpy[ind])
        ind++
        posEnd = ary.search(regExp) + 1
    }
    ary = ary.substring(posEnd)
    ary.each_line.yield(ary)
    return this
}
String.prototype.each_codepoint = function() {
    var str = ""
    for (var i = 0; i < this.length; i++)
        str += String.prototype.each_codepoint.yield(this[i].charCodeAt(0))
    return str
}
String.prototype.codepoint = function() {
    return this.each_codepoint.apply(this, arguments)
}
String.prototype.rpartition = function() {
    var ary = [3]
    var str = arguments[0].toString()
    if (this.search(arguments[0]) == -1) {
        ary = ["", "", this.substr(0, this.length)]
        return ary
    } else {
        auxstr = str.substr(2, str.length - 3)
        var pos = str[0] == '/' && str[str.length - 1] == '/' ? this.lastIndexOf(auxstr) : this.lastIndexOf(str)
        if (str[0] == '/' && str[str.length - 1] == '/')
            ary = [this.substr(0, pos - 1), this.substr(pos - 1, auxstr.length + 1), this.substr(pos + auxstr.length, this.length - pos)]
        else
            ary = [this.substr(0, pos), this.substr(pos, str.length), this.substr(pos + str.length, this.length - pos)]
    }
    return ary
}
String.prototype.scan = function() {
    var ary = this.match(arguments[0])
    if (ary.length > 1 && arguments.length < 2)
        ary.shift()
    if (arguments.length > 1 && typeof(arguments[1]) === "function") {
        ary = this
        while (ary.length > 0 && ary.search(arguments[0]) != -1) {
            var finds = []
            var find = ary.match(arguments[0])
            ary = ary.replace(arguments[0], "")
            for (var i = 1; i < 9; i++)
                if (RegExp["$" + i] != "")
                    finds.push(RegExp["$" + i])
            if (finds.length == 0)
                finds = find
            arguments[1].apply(arguments[1], finds)
        }
        return this
    }
    return ary
}
String.prototype.erase = function() {
    var erase = this
    for (var i = 0; i < arguments.length; i++)
        erase = this.intersection(erase, arguments[i])
    var regex = "[^" + erase + "]"
    erase = this.match(new RegExp(regex, "g")).join("")
    return erase
}
String.prototype.end_With$U = function(str) {
    return (this.match(str + "$") == str)
}
String.prototype.eql$U = function(string) {
    return this == string
}
String.prototype.getbyte = function(index) {
    return this.charCodeAt(index)
}
String.prototype.to_str = function() {
    return this.toString()
}
String.prototype.to_r = function() {
    var str1 
    var str2 
    var op1 = "0/1" 
    var op2 = 1 
    var pos
    var mcd
    var dec
    str1 = this.strip() 
    if (str1.search(/^[\d\+.-]/g) == -1) 
        return op1
    str2 = str1 = str1.replace(/[_]/g, "") 
    pos = str1.search(/\//g) 
    if (pos > 0) {
        str1 = str1.substring(0, pos)
        str2 = str2.substring(pos + 1)
    } else
        str2 = null
    if (isNaN((op1 = parseFloat(str1)))) 
        return op1
    if (isNaN(str1) || isNaN(op2 = parseInt(str2)))
        op2 = 1
    dec = decimal(op1)
    op1 = op1 * Math.pow(10, dec)
    if (op2 == 1) 
        op2 = Math.pow(10, dec)
    else
        op2 = op2 * Math.pow(10, dec)
    mcd = intMcd(op1, op2)
    if (mcd == null)
        mcd = 1
    return op1 / mcd + "/" + op2 / mcd
}
function decimals() {
    if (isNaN(arguments[0]))
        return -1
    var num = new Number(arguments[0])
    if (num < Number.MIN_VALUE || num > Number.MAX_VALUE)
        return 0
    var ary = num.toString(10)
    var trash = ary
    var decUno = 0
    var decDos = 0
    if (ary.search("e") > 0) {
        decUno = ary.substring(ary.search("e") + 1)
        trash = ary.substring(0, ary.search("e"))
    }
    if (ary.search("[.]") > 0) {
        decDos = trash.substring(trash.search("[.]") + 1)
        decDos = decDos.length
    }
    return parseInt(decUno) >= decDos ? 0 : (decUno - decDos) * -1
}
function intMcd() {
    if (arguments.length != 2 || isNaN(arguments[0]) || isNaN(arguments[1]))
        return null
    var op1 = parseInt(arguments[0])
    var op2 = parseInt(arguments[1])
    if (arguments[0] == 0 || arguments[1] == 0)
        return null
    if (arguments[0] < 0)
        op1 *= -1
    if (arguments[1] < 0)
        op2 *= -1
    while (op1 != op2 || op1 < 0 || op2 < 0) {
        if (op1 > op2)
            op1 = op1 - op2
        else
            op2 = op2 - op1
    }
    if (op1 == op2)
        return op1
    return null
}
String.prototype.bytesize = function() {
    return this.length
}
String.is_string$U = function(name) {
    return typeof(name) === "string" || name instanceof String
}
Array.bang_methods = [
    "collect",
    "map",
    "clone",
    "compact",
    "sort_by",
    "distribute"
]
Array.reflect = function() {
    var result
    var return_value = {}
    function duplicate(original_method) {
        Array.prototype[original_method + "$B"] = function() {
            var substitute = Array.prototype[original_method].apply(this, arguments)
            this.clear()
            for (var i = 0; i < substitute.length; i++)
                this[i] = substitute[i]
            return this
        }
        return [original_method + "$B", Array.prototype[original_method + "$B"]]
    }
    for (var i = 0; i < arguments.length; i++)
        if (arguments[i] instanceof Array)
            for (var j = 0; j < arguments[i].length; j++) {
                result = duplicate(arguments[i][j])
                return_value[result[0]] = result[1]
            } else {
                result = duplicate(arguments[i])
                return_value[result[0]] = result[1]
            }
    return return_value
}
Array.prototype.each = function() {
    var callback = Array.prototype.each.get_block()
    for (var i = 0; i < this.length; i++)
        callback(this[i])
    return this
}
Array.prototype.each_index = function() {
    for (var i = 0; i < this.length; i++)
        Array.prototype.each_index.yield(i)
}
Array.prototype.each_with_index = function() {
    for (var i = 0; i < this.length; i++)
        Array.prototype.each_with_index.yield(this[i], i)
}
Array.prototype.count = function(obj) {
    if (typeof(obj) === "undefined")
        return this.length
    var count = 0
    for (var i = 0; i < this.length; i++)
        if ((typeof(obj) === "function" ?
            Array.prototype.count.yield(this[i]) :
            this[i] == obj
        ))
            count++
            return count
}
Array.prototype.reverse_each = function() {
    var l = this.length - 1
    for (var i = l; i >= 0; i--)
        Array.prototype.reverse_each.yield(this[i])
}
Array.prototype.collect = function() {
    var collectable = []
    if (String.is_string$U(arguments[0]))
        for (var i = 0; i < this.length; i++)
            collectable.push(this[i][arguments[0]])
    else
        for (var i = 0; i < this.length; i++)
            collectable.push(Array.prototype.collect.yield(this[i]))
    return collectable
}
Array.prototype.alias("map", "collect")
Array.prototype.select_if = function() {
    var collectable = []
    for (var i = 0; i < this.length; i++)
        if (Array.prototype.select_if.yield(this[i]))
            collectable.push(this[i])
    return collectable
}
Array.prototype.indexOf = function(searchElement, fromIndex) {
    var i
    for (i = fromIndex || 0; i < this.length && this[i] !== searchElement; i++);
    i = i >= this.length ? null : i
    return i
}
Array.prototype.clone = function() {
    var ary = []
    for (var i = 0; i < this.length; i++)
        ary[i] = this[i]
    return ary
}
Array.prototype.clear = function() {
    while (this.length > 0)
        this.pop()
}
Array.prototype.equals$U = function(other) {
    var same = true
    if (this.length != other.length)
        return false
    for (var i = 0; i < this.length; i++)
        if (this[i] != other[i])
            same = false
    return same
}
Array.prototype.uniq = function() {
    var uniq = []
    var comparable = []
    var block = arguments.length && typeof(arguments[0]) == "function"
    var element = null
    for (var i = 0; i < this.length; i++) {
        element = block ? arguments[0](this[i]) : this[i]
        if (!Array.includes(element, comparable))
            uniq.push(this[i])
        comparable.push(element)
    }
    return uniq
}
Array.prototype.uniq$B = function() {
    var uniq = this.uniq()
    if (uniq.equals$U(this))
        return null
    this.clear()
    for (var i = 0; i < uniq.length; i++)
        this[i] = uniq[i]
    return this
}
Array.prototype.first = function() {
    if (this.length == 0)
        return null
    if (arguments.length == 0)
        return this[0]
    var ary = []
    for (var i = 0; i < arguments[0] && i < this.length; i++)
        ary[i] = this[i]
    return ary
}
Array.prototype.last = function() {
    if (this.length == 0)
        return null
    if (arguments.length == 0)
        return this[this.length - 1]
    var ary = []
    for (var i = 0; i < Math.min(arguments[0], this.length); i++)
        ary[i] = this[this.length - Math.min(arguments[0], this.length) + i]
    return ary
}
Array.prototype.erase$B = function() {
    if (arguments.length > 1)
        return null
    var find = false
    for (var i = this.length - 1; i >= 0; i--)
        if (this[i] == arguments[0]) {
            this.splice(i, 1)
            find = true;
        }
    return find ? this : null
}
Array.prototype.erase_at$B = function() {
    if (!is_a_number(arguments[0]))
        return null
    if (arguments.length > 1)
        return null
    if (arguments[0] > this.length)
        return null
    this.splice(arguments[0], 1)
    return this
}
Array.prototype.erase_if = function() {
    if (arguments.length > 1)
        return null
    var ary = []
    for (var i = 0; i < this.length; i++)
        if (!Array.prototype.erase_if.yield(this[i]))
            ary.push(this[i])
    return ary.compact()
}
Array.prototype.erase_if$B = function() {
    if (arguments.length > 1)
        return null
    for (var i = 0; i < this.length; i++)
        if (!Array.prototype.erase_if.yield(this[i]))
            this.splice(i, 1)
    return this
}
Array.prototype.replace = function() {
    if (arguments.length == 0)
        return null
    if (arguments.length > 1)
        return null
    if (!(arguments[0] instanceof Array))
        return null
    this.clear()
    for (var i = 0; i < arguments[0].length; i++)
        this[i] = arguments[0][i]
    return this
}
Array.prototype.delete$B = function(obj) {
    var position = this.indexOf(obj)
    if (position === null || position == -1)
        if (Array.prototype.delete$B.block_given$U())
            return Array.prototype.delete$B.yield()
        else
            return null
    while ((position = this.indexOf(obj)) != null && position != -1)
        this.splice(position, 1)
    return obj
}
Array.prototype.include$U = function() {
    if (arguments.length != 1)
        return null
    var find = false
    for (var i = 0; i < this.length; i++)
        if (arguments[0] == this[i])
            find = true
    return find
}
Array.prototype.assoc = function() {
    if (arguments.length > 1)
        return null
    for (var i = 0; i < this.length; i++)
        if (arguments[0] == this[i][0])
            return this[i]
    return null
}
Array.prototype.at = function() {
    if (arguments.length > 1)
        if (arguments[0] > this.length)
            return null
    if (isNaN(arguments[0]))
        return null
    if (arguments[0] < 0 && (this.length + arguments[0]) < 0)
        return null
    return arguments[0] >= 0 ? this[arguments[0]] : this[this.length + (arguments[0])]
}
Array.prototype.compact = function() {
    var ary = []
    for (var i = 0; i < this.length; i++)
        if (this[i] != null)
            ary.push(this[i])
    return ary
}
Array.prototype.merge = function(ary2) {
    var ary = [] 
    for (var i = 0; i < this.length; i++)
        ary.push(this[i])
    for (var i = 0; i < ary2.length; i++)
        ary.push(ary2[i])
    return ary
}
Array.prototype.drop = function() {
    if (arguments.length > 1 || arguments.length < 1)
        return null
    if (isNaN(arguments[0]))
        return null
    var ary = []
    if (arguments[0] > this.length - 1)
        return ary
    ary = this.clone()
    for (var i = 0; i < arguments[0]; i++)
        ary.splice(0, 1)
    return ary
}
Array.prototype.drop_while = function() {
    if (arguments.length > 1)
        return null
    var ary = []
    for (var i = 0; i < this.length; i++) {
        if (Array.prototype.drop_while.yield(this[i]))
            ary.push(this[i])
    }
    return ary.compact()
}
Array.prototype.flatten = function(level) {
    if (level == 0)
        return this
    level = level || 1000
    return Array.unpack(this, [], level)
}
Array.prototype.index = function() {
    for (var i = 0; i < this.length; i++)
        if (typeof(arguments[0]) === "function" ?
            Array.prototype.index.yield(this[i]) :
            this[i] == arguments[0])
            return i
    return null
}
Array.prototype.product = function() {
    var ary = []
    if (!(arguments[0])) {
        for (var i = 0; i < this.length; i++)
            ary[i] = [this[i]]
        return ary
    }
    if (arguments[0].length < 1)
        return ary
    if (arguments.length >= 1) {
        if (arguments.length == 1)
            return Array.product(this, arguments[0])
    }
}
Array.prototype.rassoc = function() {
    if (arguments.length > 1 || arguments.length < 1)
        return null
    var existsArray = false
    for (var i = 0; i < this.length; i++)
        if (this[i] instanceof Array)
            if (this[i].length == 2)
                existingArray = true
    if (existingArray) {
        for (var i = 0; i < this.length; i++)
            if (this[i] instanceof Array)
                if (this[i][1] == arguments[0])
                    return this[i]
    }
    return null
}
Array.prototype.rindex = function() {
    if (arguments.length != 1)
        return null
    for (var i = this.length - 1; i >= 0; i--)
        if (this[i] == arguments[0])
            return i
    return null
}
Array.prototype.rotate = function(obj) {
    if (typeof(obj) === "undefined") {
        var ary = this.clone()
        ary.push(ary.shift())
        return ary
    }
    if (arguments.length > 1)
        return null
    var ary = this.clone()
    if (arguments) {
        if (isNaN(arguments[0]))
            return null
        if (arguments[0] < 0) {
            if (Math.abs(arguments[0]) > this.length - 1)
                return null
            return _rotate(Math.abs(arguments[0]), this, ary)
        }
        if (arguments[0] > this.length - 1)
            return null
        for (var i = 0; i < ary.length; i++) {
            ary[i] = this[arguments[0]]
            arguments[0]++
            if (arguments[0] == this.length)
                arguments[0] = 0
        }
        return ary
    }
    return _rotate(this.length - 1, this, ary)
}
Array.prototype.take = function() {
    if (!(arguments[0]) || arguments.length > 1)
        return null
    if (isNaN(arguments[0]))
        return null
    var ary = []
    if (arguments[0] > this.length)
        arguments[0] = this.length
    for (var i = 0; i < arguments[0]; i++)
        ary[i] = this[i]
    return ary
}
Array.prototype.take_while = function() {
    var ary = []
    var taking = true
    for (var i = 0; taking && i < this.length; i++)
        if (Array.prototype.take_while.yield(this[i]))
            ary.push(this[i])
        else
            taking = false
    return ary
}
Array.prototype.shuffle = function() {
    if (arguments.length > 0)
        return null
    randomizedArray = [];
    usedNumbers = [];
    while (randomizedArray.length < this.length) {
        finded = false;
        var number = Math.round(getRandomArbitary(0, this.length));
        for (var i = 0; i < usedNumbers.length; i++)
            if (number == usedNumbers[i])
                finded = true;
        if (!finded && number < this.length) {
            usedNumbers.push(number);
            randomizedArray.push(this[number]);
        }
    }
    return randomizedArray;
}
Array.prototype.transpose = function() {
    for (var i = 0; i < this.length; i++)
        if (!(this[i] instanceof Array))
            return null
    for (var i = 0; i < this.length; i++)
        if ((this[0].length) != (this[i].length))
            return null
    var ary = []
    if ((this.length) == (this[0].length)) {
        ary = this.clone()
        for (var i = 0; i < this.length; i++) {
            ary[i] = []
            for (var j = 0; j < this[i].length; j++)
                ary[i][j] = this[j][i]
        }
        return ary
    }
    for (var i = 0; i < this[0].length; i++)
        ary.push(_transpose(i, this))
    return ary
}
Array.prototype.zip = function() {
    var ary = []
    for (var i = 0; i < this.length; i++) {
        ary[i] = []
        ary[i][0] = this[i]
        for (var j = 0; j < arguments.length; j++)
            if (arguments[j][i] == (void 0))
                ary[i][j + 1] = null
            else
                ary[i][j + 1] = arguments[j][i]
    }
    return ary;
}
Array.prototype.empty$U = function() {
    if (arguments.length > 0)
        return null
    return this.length == 0 ? true : false
}
Array.prototype.eql$U = function(model) {
    if (arguments.length > 1)
        return null
    if (!(arguments[0] instanceof Array))
        return false
    if (this.length != arguments[0].length)
        return false
    var that = this
    return model.inject_with_index(true,
        function(el, index, acum) {
            if (typeof(el) === "number")
                return acum && el == that[index] 
            return acum && ((el != null) ? el.eql$U(that[index]) : true)
        });
}
Array.prototype.inject = function(init_value, block) {
    var callback = Array.prototype.inject.get_block() 
    for (var i = 0; i < this.length; i++)
        init_value = callback(this[i], init_value)
    return init_value
}
Array.prototype.inject_with_index = function(init_value) {
    for (var i = 0; i < this.length; i++)
        init_value = Array.prototype.inject_with_index.yield(this[i], i, init_value)
    return init_value
}
Array.prototype.reverse = function() {
    var ary = []
    pos = 0
    for (var i = this.length - 1; i >= 0; i--) {
        ary[pos] = this[i]
        pos++
    }
    return ary
}
Array.prototype.values_at = function() {
    for (var i = 0; i < arguments.length; i++)
        if (isNaN(arguments[i]))
            return null
    var ary = []
    for (var i = 0; i < arguments.length; i++) {
        arguments[i] = Math.round(arguments[i])
        if ((arguments[i]) >= (this.length))
            ary.push(null)
        else if (arguments[i] < 0) {
            if ((arguments[i] + (arguments[i] * -2)) >= this.length)
                ary.push(null)
            else
                ary.push(this[this.length + (arguments[i])])
        } else
            ary.push(this[arguments[i]])
    }
    return ary
}
Array.prototype.to_a = function() {
    return this
}
Array.prototype.cycle = function(times) {
    if (times < 0 || this.empty$U())
        return
    times = times || -1
    while (times--)
        this.each.apply(this, arguments)
    return null
}
Array.prototype.strip_all = function() {
    return this.collect(function(el) {
        return el.respond_to("strip") ? el.strip() : el
    })
}
Array.prototype.combination = function(number) {
    if (!is_a_number(number))
        throw "Array#combination. Parameter must be a number."
    if (number == 0)
        return [
            []
        ]
    if (number > this.length)
        return []
    if (number == this.length)
        return [this.clone()]
    if (number == 1)
        return this.collect(function(el) {
            return [el]
        })
    var combinations = []
    for (var i = 0; i < this.length - number + 1; i++) {
        var r = [this[i]]
        r = this.__secure_combination(number - 1, r, i + 1)
        for (var j = 0; j < r.length; j++)
            combinations.push(r[j])
    }
    return combinations
}
Array.prototype.__secure_combination = function(number, base, initial) {
    if (number <= 0)
        return base
    var result = []
    for (var i = initial; i < this.length - number + 1; i++) {
        var r = base.clone()
        r.push(this[i])
        r = this.__secure_combination(number - 1, r.clone(), i + 1)
        if (number > 1)
            for (var j = 0; j < r.length; j++)
                result.push(r[j])
        else
            result.push(r)
    }
    return result.clone()
}
Array.prototype.sort_by = function() {
    var indexed = []
    if (Array.prototype.sort_by.block_given$U()) {
        var ordered = []
        for (var i = 0; i < this.length; i++)
            indexed.push([Array.prototype.sort_by.yield(this[i]), this[i]])
        if (is_a_number$U(indexed[0][0]))
            indexed.sort(function(a, b) {
                return a[0] - b[0]
            })
        else
            indexed.sort()
        for (var i = 0; i < this.length; i++)
            ordered.push(indexed[i][1])
        return ordered
    } else
        return this.sort()
}
Array.prototype.distribute = function(op2) {
    var result = []
    for (var i = 0; i < this.length; i++)
        for (var j = 0; j < op2.length; j++)
            result.push([this[i], op2[j]])
    return result
}
Array.prototype.compose = function() {
    var copy = this.clone()
    if (this.length < 2)
        return copy
    var args = []
    for (var i = 0; i < arguments.length; i++)
        args[i] = arguments[i]
    var roller = copy.shift().to_a()
    for (var i = 0; copy.length; i++) {
        var next = copy.shift().to_a()
        var inner_arrays = false
        for (var h = 0; h < next.length; h++)
            if (next[h] instanceof Array)
                inner_arrays = true
        if (inner_arrays) {
            next = Array.prototype.compose.apply(next, args[i + 1])
            args.splice(i + 1, 1)
        }
        var result = roller.distribute(next)
        roller = result.collect(function(el) {
            return el.join(args[i])
        })
    }
    return roller
}
Array.prototype.to_v = function(dim) {
    var coord1 = 0
    var coord2 = 0
    var vec_array = []
    var dimension = dim || 2
    if (this.length % dimension == 0) {
        for (var i = 0; i < this.length; i++) {
            if (coord1 == 0)
                coord1 = this[i]
            else
                coord2 = this[i]
            if (coord1 != 0 && coord2 != 0) {
                vec_array.push(new Vector(coord1, coord2))
                coord1 = 0
                coord2 = 0
            }
        }
        return vec_array
    } else
        throw "Odd number of arguments. Add one more number to create array"
}
Array.prototype.get_cool_var_names = function() {
    var a = [
        "billa",
        "bacoa",
        "co",
        "bara",
        "bie",
        "ita",
        "celona",
        "tolo",
        "ritar",
        "itono",
        "ba",
        "manolo",
        "reinols",
        "simpson",
        "tolome",
        "ices",
        "avillosho",
        "icela",
        "ademedir"
    ]
    var cool_names = []
    for (var i = 0; i < a.length; i++)
        cool_names[i] = "var " + a[i]
    return cool_names
}
Array.includes = function(el, array) {
    for (var i = 0; i < array.length; i++)
        if (array[i] == el)
            return true
    return false
}
Array.unpack = function(model, array, level) {
    var l = level;
    for (var i = 0; i < model.length; i++) {
        if ((model[i] instanceof Array) && (l > 0)) {
            Array.unpack(model[i], array, l - 1)
        } else {
            array.push(model[i])
        }
    }
    return array
}
Array.product = function(array1, array2) {
    var nary = []
    var arrays = array1.length * array2.length
    for (var i = 0; i < arrays; i++) {
        nary[i] = []
    }
    var pos = 0
    for (var i = 0; i < array1.length; i++)
        for (var j = 0; j < array2.length; j++) {
            nary[pos][0] = array1[i]
            nary[pos][1] = array2[j]
            pos++
        }
    return nary
}
function _rotate(number, array1, array2) {
    var pos = 1
    array2[number] = array1[0]
    var arg = number
    if (arg == array1.length - 1)
        arg = 0
    else
        arg++
        for (var i = arg; i != number; i++) {
            array2[i] = array1[pos]
            if (i == (array1.length - 1))
                i = -1;
            pos++
        }
    return array2
}
function getRandomArbitary(min, max) {
    return Math.random() * (max - min) + min;
}
function _transpose(pos, nary) {
    var array = []
    for (var i = 0; i < nary.length; i++)
        array[i] = nary[i][pos]
    return array
}
Array.reflect(Array.bang_methods)
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
                                               )()
       }
     }
  }
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
  $global_space[class_name].call(eval(class_name + "({initialize: true})")) 
  Class.all.push(new_class)
  alert(new_class)
  return new_class
}
Object.defineProperty(Object.prototype, "get_constructor", {
    value: function() {
        var that = this
        return function() {
            var index = 0
            for (var i in that)
                this[i] = that[i] || arguments[index++]
        }
    },
    enumerable: false
})
Object.defineProperty(Object.prototype, "to_class", {
    value: function(class_name) {
        return window[class_name] = this.get_constructor()
    },
    enumerable: false
})
function VersionNumber(initial_string, sep) {
    if (!initial_string || initial_string == "")
        return
    if (initial_string instanceof VersionNumber) {
        var level = this
        initial_string.each(function(number, value, container) {
            level[number] = new VersionNumber()
            var branches = container.branches()
            for (var i = branches.length - 1; i >= 0; i--) {
                level[branches[i]] = container[branches[i]]
            }
            level = level[number]
        })
        return
    }
    Object.defineProperty(this, "sep", {
        value: sep || ".",
        enumerable: false
    })
    var coefficients = initial_string.split(this.sep)
    var last = this
    for (var i = 0; i < coefficients.length; i++)
        last[coefficients[i]] = (last = new VersionNumber())
}
VersionNumber.prototype.toString = function() {
    if (this.inner_data)
        return this.inner_data
    var obj = this
    var text = ""
    var key = null
    while (key = Object.keys(obj)[0]) {
        text += key + "."
        obj = obj[key]
    }
    Object.defineProperty(this, 'inner_data', {
        value: text.replace(/.$/, ""),
        writable: false,
        enumerable: false
    })
    return this.inner_data
}
VersionNumber.prototype.number_value = function() {
    for (var i in this)
        if (!isNaN(i))
            return parseInt(i)
}
VersionNumber.prototype.number = function() {
    for (var i in this)
        if (!isNaN(i))
            return this[i]
}
VersionNumber.prototype.get = function(version) {
    if (!(version instanceof Array))
        version = new String(version)
    if (version instanceof String)
        version = version.split(".")
    if (version == "")
        return this
    var key = version.shift()
    if (!version.length)
        return this[key]
    return this[key].get(version)
}
VersionNumber.prototype.last = function() {
    var last = 0
    var obj = this
    while (key = Object.keys(obj)[0]) {
        if (key)
            last = obj
        obj = obj[key]
    }
    return last
}
VersionNumber.prototype.last_value = function() {
    var last = 0
    var obj = this
    while (key = Object.keys(obj)[0]) {
        obj = obj[key]
        if (key)
            last = key
    }
    return last
}
VersionNumber.prototype.valueOf = function() {
    var last = this.last_value()
    return parseInt(last) || last
}
VersionNumber.prototype.branch = function(version, first_label) {
    if (!first_label || first_label == "")
        throw "VersionNumber#branch: Anonymous branches not " +
            "allowed. Provide first_label in function call."
    if (version instanceof VersionNumber)
        version = version.toString()
    version = new String(version)
    var insertion_point = this.get(version)
    if (!insertion_point || !(insertion_point instanceof VersionNumber))
        throw "VersionNumber#branch: version (" + version + ") not found."
    for (var i = 1; i < arguments.length; i++) {
        var label = arguments[i]
        try {
            label = label.toString()
        } catch (e) {}
        var parts = label.split(":")
        if (parts[1])
            parts[1] = new VersionNumber(parts[1].replace(/^\s+/g, "").replace(/\s+$/g, ""))
        var value = parts[1] || {}
        if (i + 1 < arguments.length && typeof(arguments[i + 1]) !== "string")
            value = arguments[++i]
        insertion_point[parts[0]] = value
    }
}
VersionNumber.prototype.branches = function() {
    var response = []
    for (var i in this)
        if (isNaN(i) && this.hasOwnProperty(i))
            response.push(i)
    return response
}
VersionNumber.prototype.each = function(block) {
    if (!block || typeof(block) !== "function")
        return
    var obj = this.number()
    if (obj)
        block(this.number_value(), obj, this)
    if ((obj instanceof Object) && "each" in obj && typeof(obj.each) === "function")
        obj.each(block)
}
VersionNumber.stop_enum = function(method) {
    for (var i = 0; i < method.length; i++)
        Object.defineProperty(VersionNumber.prototype, method[i], {
            value: VersionNumber.prototype[method[i]],
            enumerable: false
        })
}
VersionNumber.stop_enum([
    "toString", "valueOf",
    "number_value", "number", "get", "last",
    "last_value", "branch", "branches", "each"
])
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
}
Module.prototype.alias_method = function(new_name, old_name){
  if (String.is_string$U(old_name))
    this[new_name] = eval( this[old_name].toSource() )
  return this[new_name]
}
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
Class.all = []
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
Class.prototype.attr_reader = function (attr_names){
   try{
	  attr_names = this.create_attr(attr_names)
	  for(var i=0; i<attr_names.length; i++) {
		 name = attr_names[i]
		 this.attr_readers.push(name)
		 this["get" + name.replace(name[0], name[0].toUpperCase())] = this["get_" + name] = function(){ return eval("this." + name) }
	  }
   }catch(err){
   }
}
Class.prototype.attr_writer = function (attr_names){
   try{
	  attr_names = this.create_attr(attr_names)
	  for(var i=0; i<attr_names.length; i++) {
		 name = attr_names[i]
		 this.attr_writers.push(name)
		 this["set" + name.replace(name[0], name[0].toUpperCase())] = this["set_" + name] = function(value){ this[name] = value }
	  }
   } catch(err) {
   }
}
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
   }
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
   this.before_filters[fn_name] = this.before_filters[fn_name] || []
   for (var i=0; i<this.before_filters[fn_name].length; i++)
   this.before_filters[fn_name][i]();
}
Class.prototype.call_after = function(fn_name){
   this.after_filters[fn_name] = this.after_filters[fn_name] || []
   for (var i=0; i<this.after_filters[fn_name].length; i++)
   this.after_filters[fn_name][i]();
}
Class.method_missing = function(method, object, args){ throw object + "." + method + "(" + args + ") invalid method call." }
function Delegate(class_name){
  this.delegate_class = eval(class_name)
}
Delegate.prototype.method_missing = function(method, params){
  return this.delegate_class[method].call(this, params)
}
function ProxyConstructor(Constructor, rest_of_arguments) {
    var args = Array.prototype.slice.call(arguments, 1)
    return function() {
            var $$F$$ = function() {}
            $$F$$.prototype = Constructor.prototype
            var obj = new $$F$$
            var yield_back = Constructor.apply(obj, args)
            return Object(yield_back) == yield_back ? yield_back : obj
        }
}
function ApplyProxyConstructor(Constructor, arguments_array) {
    arguments_array = Array.prototype.slice.call(arguments_array, 0)
    arguments_array.unshift(Constructor)
    return ProxyConstructor.apply(this, arguments_array)
}
Set.prototype = new Array
Set.prototype.constructor = Set
Set.prototype.super = Array
function Set(){
  Array.apply(this, arguments)
}
Set.prototype.inner_data = function(){
  var inner = []
  for (var i=0; i<this.length; i++)
    inner.push(this[i])
  return inner
}
Set.prototype.push = function(obj){
    if (!this.inner_data().include$U(obj)){
      this[this.length] = obj
      this.length++
    }
}
Set.prototype.clear$B = function(){
  this.splice(0, this.length)
}
Set.prototype.toSource = function(){
    return this.inner_data().toSource()
}
Set.prototype.toString = function(){
    return this.inner_data().toString()
}
function Hash(initial_data) {
    if (initial_data)
        this.merge$B(initial_data)
}
Hash.prototype.values = function() {
    var that = this
    return this.keys().collect(function(i) {
        return that[i]
    })
}
Hash.prototype.stop_enumerating("values")
Hash.prototype.self_values = function() {
    for (var i in this)
        Object.defineProperty(this, i, {
            enumerable: false
        })
    var that = this
    return this.self_keys().collect(function(i) {
        return that[i]
    })
}
Hash.prototype.stop_enumerating("self_values")
Hash.prototype.alias("own_values", "self_values")
Hash.prototype.each = function() {
    for (var i in this)
        if (this.hasOwnProperty(i))
            Hash.prototype.each.yield(i, this[i])
}
Hash.prototype.stop_enumerating("each")
Hash.prototype.collect = function() {
    var result = []
    for (var i in this)
        result.push(Hash.prototype.each.yield(i, this[i]))
    return result
}
Hash.prototype.stop_enumerating("collect")
Hash.prototype.size = function() {
    return this.self_keys().count()
}
Hash.prototype.stop_enumerating("size")
AutoHash.prototype = new Hash
AutoHash.prototype.constructor = AutoHash
function AutoHash(intial_data, block) {
    if (!block)
        if (initial_data && typeof(initial_data) === "function")
            block = initial_data
        else
            block = function() {};
    var that = this
    this.data = new HashData()
    if (initial_data && typeof(initial_data) !== "function")
        this.data.merge$B(initial_data)
    this.__noSuchMethod__ = function(id, args) {
        if (!(id in that.data))
            that.data[id] = (block)(that, id)
        if (typeof(that[id] !== "function"))
            that[id] = (function(value) {
                if (!value)
                    return this[id]
                this.value = value
            })()
        return that.data[id]
    }
}
function Constant(name, value) {
    this[name] = value
    Object.defineProperty(this, "name", {
        value: name,
        enumerable: false
    })
    try{
        $global_space["$constants"].push(this)
    } catch (e) {
        if ($K_debug_level > $KC_dl.USER)
            $K_logger.warn("Error Creating Constant: " + e)
    }
}
Constant.prototype.valueOf = function() {
    return this.name
}
Constant.prototype.toString = function() {
    return this[this.name]
}
Constant.prototype.equals = function(obj) {
    return this[this.name] == obj
}
function Enumeration(constants) {    var args = arguments     if (constants instanceof Enumeration)        args = constants.ia     Object.defineProperty(this, "ia", {        value: new(ApplyProxyConstructor(InterleavedArray, args)),        enumerable: false,        writable: true    })    Enumeration.prototype.transpose.call(this)}Enumeration.prototype.transpose = function(Type) {    Type = Type || this.Type || VersionNumber    var keys = this.ia.keys()    for (var k = 0; k < keys.length; k++) {        var ia_value = this.ia[keys[k]]        var deep = this        var key_chain = keys[k].split(".")        for (var i = 0; i < key_chain.length - 1; i++) {            var parent = this.ia[key_chain.slice(0, i + 1).join(".")]            if (parent in deep)                deep = deep[parent]        }        deep[ia_value] = deep[ia_value] || new Type(keys[k])        Object.defineProperty(deep[ia_value], "name", {            value: ia_value,            writable: true        })    }}Enumeration.prototype.full_name = function(key){    var name = ""    var indices = key.split('.')    for (var i=0; i<indices.length; i++)        name += this.ia[indices.slice(0, i+1).join('.')] + "."    return name.substr(0, name.length-1)}Enumeration.prototype.each = function() {    var that = this    this.ia.keys().each(function(string_key) {        var key = string_key.split(".")        var value = that        for (var i = 0; i < key.length;            value = value[that.ia[key.slice(0, i + 1).join('.')]],            i++);        Enumeration.prototype.each.yield(that.full_name(string_key), value)    })}Enumeration.prototype.get = function(label) {    label = new String(label)    if ( /\d+(?:\.\d+)*/.test(label) )        if (this.ia.keys().include$U(label))            return this.get(this.full_name(label))        else            return null    var position = null    this.each(function (key, value) {        if (key == label)            position = value    })    return position}Enumeration.prototype.get$B = function(label) {        var position = null        label = label.split(".")        var reached = []        while(label.length){            var new_key = label.shift()            reached.push(new_key)            if ( !(position = this.get(reached.join(".")))){                reached.pop()                var host = this.get(reached.join("."))                this.ia.infiltrate(new_key, host)                this.transpose()                label.unshift(new_key)            }        }    return position}Enumeration.prototype.add = function(constants, place){    if (!constants || constants == "")        return this    if (place)        place = this.get(place)    this.ia.infiltrate(constants, place)    Enumeration.prototype.transpose.call(this)    return place || this}Enumeration.prototype.add$B = function(constants, place){    if (!constants || constants == "")        return this    if (place)        place = this.get$B(place)    this.ia.infiltrate(constants, place)    Enumeration.prototype.transpose.call(this)    return place || this}Enumeration.prototype.stop_enumerating(["transpose", "each", "full_name", "get", "add", "get$B", "add$B"])EnumerationOf.prototype = new Enumeration
Enumeration.prototype.constructor = EnumerationOf
EnumerationOf.prototype.super = Enumeration
function EnumerationOf(type) {
	Object.defineProperty(this, "Type", {
		value: type,
		enumerable: false
	})
    var args = Array.prototype.slice.call(arguments, 1)
    if (args[0] instanceof Enumeration)
        args[0] = [args[0]] 
    Enumeration.apply(this, args[0])
    this.transpose(type)
}
function Map() {
}
InterleavedArray.prototype = new Array
InterleavedArray.prototype.constructor = InterleavedArray
InterleavedArray.prototype.super = Array
function InterleavedArray(elements) {
    Object.defineProperty(this, 'subarray', {
        value: [],
        enumerable: false,
        writable: true
    })
    Object.defineProperty(this, "length", {
        enumerable: false,
        writable: true
    })
    var last_was_number = 0
    for (var el = 0; el < arguments.length; el++) {
        if (!(arguments[el] instanceof Array)) {
            this.push(arguments[el])
            last_was_number = 1
        } else {
            if (!((this.length - last_was_number) in this)) {
                this.push(undefined)
                last_was_number = 1
            }
            this.subarray[this.length - last_was_number] = new(ApplyProxyConstructor(InterleavedArray, arguments[el]))
            last_was_number = 0
        }
    }
    for (var i = 0; i < this.subarray.length; i++)
        if (this.subarray[i] instanceof Array)
            this.enumerate(i, this.subarray[i])
}
InterleavedArray.prototype.enumerate = function(base_index, subarray) {
    for (var i = 0; i < subarray.length; i++) {
        var index = base_index + "." + (i + 1)
        this[index] = subarray[i]
        if (subarray.subarray[i] instanceof Array)
            this.enumerate(index, subarray.subarray[i])
    }
}
InterleavedArray.prototype.infiltrate = function(element, position) {
    if (typeof (position) !== "undefined" && position != null)
       position = new String(position)
     if (!(element instanceof Array))
        element = [element]
    var ia = new(ApplyProxyConstructor(InterleavedArray, element)) 
    var subarray = this.go(position)
    if (!subarray){
        if (this[position]){
            var up   = this.hover(position)
            var dot  = position.lastIndexOf('.') + 1
            position = parseInt(position.substring(dot)) - (dot? 1 : 0)
            subarray = up[position] = new InterleavedArray()
            Object.defineProperty(
                up[position],
                "subarray", {
                value: [],
                writable: true,
                enumerable: false
            })
        }
    }
    var l = subarray.length
    for (var i = 0; i < ia.subarray.length; i++)
        subarray.subarray[l + i] = ia.subarray[i]
    Array.prototype.push.apply(subarray, ia)
    for (var i = 0; i < this.subarray.length; i++)
        if (this.subarray[i] instanceof Array)
            this.enumerate(i, this.subarray[i])
    return this
}
InterleavedArray.prototype.go = function(index) {
    var subarray = this
    if (typeof(index) === "undefined")
        return subarray
    var indices = (new String(index)).split(".")
    for (var i = 0; i < indices.length; i++)
        subarray = subarray.subarray[indices[i] - (i ? 1 : 0)]
    return subarray
}
InterleavedArray.prototype.hover = function(index) {
    var subarray = this
    var last
    if (typeof(index) === "undefined")
        return subarray
    var indices = (new String(index)).split(".")
    for (var i = 0; i < indices.length; i++){
        last = subarray
        subarray = subarray.subarray[indices[i] - (i ? 1 : 0)]
    }
    return last.subarray
}
InterleavedArray.prototype.to_a = function(index) {
    var array = []
    if (typeof(index) !== "undefined")
        try {
            return this.go(index).to_a()
        } catch (e) {
            return []
        }
    for (var i = 0; i < this.length; i++) {
        array.push(this[i])
        if (this && this.subarray[i] && "to_a" in this.subarray[i])
            array.push(this.subarray[i].to_a())
    }
    return array
}
InterleavedArray.prototype.keys = function() {
    var array = Object.keys(this)
    var aux;
    for (var i = 0; i < array.length; i++)
        for (var j = i + 1; j < array.length; j++)
            if (array[i] > array[j]) {
                aux = array[i]
                array[i] = array[j]
                array[j] = aux
            }
    return array
}
InterleavedArray.prototype.size = function() {
    if (this.subarray.length > 0) {
        var count = 0
        for (var i = 0; i < this.subarray.length; i++)
            if (this.subarray[i] instanceof Array)
                count += this.subarray[i].size()
        return this.length + count
    }
    return this.length
}
InterleavedArray.prototype.inspect = function(index) {
    var txt = ""
    var position = ""
    for (var i = 0; i < this.length; i++) {
        position = index + (i + 1) || i
        txt += position + ": " + this[i] + "\n"
        if (this.subarray[i] instanceof Array)
            txt += this.subarray[i].inspect(position + ".")
    }
    return txt
}
InterleavedArray.stop_enum = function(method) {
    for (var i = 0; i < method.length; i++)
        Object.defineProperty(InterleavedArray.prototype, method[i], {
            value: InterleavedArray.prototype[method[i]],
            enumerable: false
        })
}
InterleavedArray.stop_enum(["go", "inspect", "enumerate", "size", "constructor", "to_a", "infiltrate", "keys", "hover"])
ArrayClass.prototype = Array
ArrayClass.prototype.constructor = ArrayClass
function ArrayClass() {
    this.length = 0
}
function giveme_node(id){
  var node = document.getElementById(id)
  if (!node){
    node = document.createElement("div")
    node.setAttribute("id", id)
    document.getElementsByTagName("body")[0].appendChild(node)
  }
  return node
}
function get_log_load(){
    return lluvia_load =giveme_node("lluvia_load")
}
function explain(div, title, text){
    var whole_html_text = ""
    if (div) {
        whole_html_text += title + ": " + text + "<br/>\n"
        div.innerHTML += whole_html_text
    }
}
function ll_module_to_include(module_source){
    explain(get_log_load(), "About to load module", module_source.module)
    module_loading[module_source.module] = new LogModuleLoad(module_source)
}
function ll_module_included(module_source){
    get_log_load().innerHTML += module_loading[module_source.module].endLoad()
}
function ll_file_included(file_source, module_source, last_file, last_module){
    module_loading[module_source.module].addFile(file_source)
    if (last_file) 
        ll_module_included(module_source)
    if (last_file && last_module)
      if (!$K_loading_app && $K_app_dependencies){
         $K_loading_app = true
         _includeScript('dependencies.js', 'onload', '_includeDependencies()') 
      }else
        ll_start()
}
function highlight(language){
    dp.SyntaxHighlighter.ClipboardSwf = 'vendor/SyntaxHighlighter/Scripts/clipboard.swf'
    code = document.getElementsByTagName('pre')
    for (var i = 0; i < code.length; i++) 
        if (code[i].className == language) 
            dp.SyntaxHighlighter.HighlightAll(code[i].getAttribute('name'))
}
function ll_start(){
  try{
    highlight('javascript')
  } catch(err){;}
  if (typeof(main) == "function")
      try{ main() } catch (err) { Exception.parse(err) }
}
function sanitize(code){
    return code.replace("&lt;", "<")
}
function run(code_fragment){
    var snippets = document.getElementsByName(code_fragment)	
    for (var i = 0; i < snippets.length; i++) 	    
        eval(sanitize(snippets[i].innerHTML))
}
function clear(div){
    div = div || "debug"
    giveme_node("debug").innerHTML = ""
}
var module_loading = {}
function $timeStamp(){
  var dat = new Date()
  var timestamp = ""
  timestamp += dat.getHours() + " : " + dat.getMinutes() + " : " + dat.getSeconds()
  return timestamp
}
function LogFileIncluded(file_source){
  this.template = [
    "<div class='_LogFile'>",
    file_source.name,
    " [" + $timeStamp() + "]",
    ": ",
    file_source.description,
    "</div>"
  ]
}
LogFileIncluded.prototype.toString = function(){
  return this.template.join("")
}
function LogModuleLoad(module_source){
  this.template = [
      "<div class='_LogModule'>",
      "<h3 class='_LogModuleName'> MODULE: ",
      "I02:Module Name",
      "</h3>\n",
      "<span class='_LogModulePath'>&nbsp;&nbsp;(",
      "I05: Module Path",
      ")</span>\n<br/>",
      "<span class='_LogModuleDescription'>",
      "I08: Module Description",
      "</span>\n<br/>",
      "Load Start Time: ",
      "I11: start Time",
      "<br/>\n",
      "Load Finish Time: ",
      "I14: Finish Time: ",
      "<br/>\n",
      "Load Time: ",
      "I17: Elapsed Time: ",
      " s.<br/>",
      "FILES:<br/>",
      "I20: FILES",
      "<br/>",
      "</div>"
    ]
 this.start = new Date().getTime()
 this.end   = new Date().getTime()
 this.template[11] = $timeStamp()
 this.template[2]  = module_source.module
 this.template[5]  = module_source.path
 this.template[8]  = module_source.description
 this.files = []
}
LogModuleLoad.prototype.addFile = function(file_source){
 this.files.push(new LogFileIncluded(file_source))
}
LogModuleLoad.prototype.endLoad = function(){
  this.end   = new Date().getTime()
  this.template[14] = $timeStamp()     
  this.template[17] = "" + ( Math.round((this.end - this.start) / 10) / 100);
  return this.toString()
}
LogModuleLoad.prototype.toString = function(){  
  this.template[20] = ""
  for (var i=0; i<this.files.length; i++)
    this.template[20] += this.files[i].toString()
  return this.template.join('\n')
}
function Socket(uri, protocols) {
    this.uri = uri || ""
    this.protocols = protocols || ['soap', 'xmpp']
    this.connection = new WebSocket("ws:" + this.uri)
}
Socket.prototype.open_socket = function(msg, block, callback) {
    var that = this
    this.connection.onopen = function() {
        that.communication(msg, block, callback)
    }
}
Socket.prototype.close_socket = function(msg) {
    var that = this
    this.connection.onclose = function() {
        that.connection.send(msg)
    }
}
Socket.prototype.is_open$U = function() {
    if (this.connection.readyState == 1)
        return true
    return false
}
Socket.prototype.communication = function(msg, block, callback) {
    var that = this
    this.connection.send(msg)
    this.connection.onmessage = function(e) {
        if (typeof block === 'function')
            block(e.data)
        if (typeof callback === 'function')
            callback()
    }
    this.connection.onerror = function(error) {
        console.log('WebSocket Error ' + error)
    }
}
Socket.prototype.send_msg = function(msg, block, callback) {
    if (!this.is_open$U())
        this.open_socket(msg, block, callback)
    else
        this.communication(msg, block, callback)
}
function Package(pk, my_manager){
 this.pk = pk || {}
 this.my_manager = my_manager || {}
}
Package.prototype.catalog = function(already){
    var dependencies = ["requires", "provides", "offers"]
    var already_there = already || []
    for(var i in this.pk)
        this[i] = this.pk[i]
    function is_already_there$U(path){
        for(var i=0; i<already_there.length; i++)
            if(already_there[i] == path)
                return true
            return false
    }
    for(var i=0; i<dependencies.length; i++)
        if(this[dependencies[i]]){
            for(var a=0; a<this[dependencies[i]].length; a++){
                if(!is_already_there$U(this[dependencies[i]][a]._path)){
                    already_there.push(this[dependencies[i]][a]._path)
                    var new_pk = new Package(this[dependencies[i]][a], this.my_manager)
                    new_pk.catalog(already_there)
                    this[dependencies[i]][a] = new_pk
                }
            }
        }
}
Package.prototype.through = function(block, config){ 
    var config = config || {}
    config.last_package = config.last_package || this
    config.already_there = config.already_there || []
    var actual_package = config.last_package
    var dependencies = ["requires", "this", "provides", "offers"]
    function is_already_there$U(path){
        for(var i=0; i<config.already_there.length; i++)
            if(config.already_there[i] == path)
                return true
            return false
    }
    for(var i=0; i<dependencies.length; i++){
        if(dependencies[i] == "this"){
            if(!is_already_there$U(this._path)){
                config.already_there.push(this._path)
                this.through(block, {last_package: this, prune: config.prune, already_there: config.already_there})
                block(this)
            }
        }
        else if(actual_package[dependencies[i]]){
            for(var a=0; a<actual_package[dependencies[i]].length; a++){
                if(!is_already_there$U(actual_package[dependencies[i]][a]._path)){
                    config.already_there.push(actual_package[dependencies[i]][a]._path)
                    actual_package[dependencies[i]][a].through(block, {last_package: actual_package[dependencies[i]][a], already_there: config.already_there})
                    block(actual_package[dependencies[i]][a])
                }
            }
        }
    }
}
function PackageManager(uri, socket) {
    this.uri = uri || ""
    this.packages_server = []
    this.catalog = []
    this.offers = []
    if (typeof socket != "undefined")
        this.socket = new Socket(socket)
    this.package_uncharged = []
    PackageManager.all_packages_managers.push(this)
}
PackageManager.all_packages = []
PackageManager.offers = []
PackageManager.include_script = function(url, callback) {
    var script = document.createElement("script")
    script.type = "text/javascript"
    script.async = false
    if (script.readyState) { 
        script.onreadystatechange = function() {
            if (script.readyState == "loaded" ||
                script.readyState == "complete") {
                script.onreadystatechange = null
                callback()
            }
        }
    } else { 
        script.onload = function() {
            if (typeof callback == "function") {
                callback()
            }
        }
    }
    script.src = url
    document.getElementsByTagName("head")[0].appendChild(script)
}
PackageManager.prototype.get_catalog = function(callback) {
    if (!this.catalog.length)
        PackageManager.include_script("../../dist/" + "catalog.js", callback.bind(this))
}
PackageManager.prototype.create_catalog = function(initial_package, callback) {
    var that = this
    var pk = new Package(initial_package, this)
    PackageManager.all_packages.push(pk)
    pk.catalog()
    pk.through(function(pk) {
        if (typeof pk.offers != "undefined")
            for (var i = 0; i < pk.offers.length; i++) {
                PackageManager.offers.push(pk.offers[i].package)
            }
    })
    if (typeof callback == "function")
        callback()
}
PackageManager.prototype.is_in$U = function(name_package) {
    var exist = false
    for (var i = 0; i < this.catalog.length; i++)
        this.catalog[i].through(function(pk) {
            if (pk.package == name_package)
                exist = true
        })
    return exist
}
PackageManager.is_offer$U = function(name_package) {
    var is_offer = false
    for (var i = 0; i < PackageManager.offers.length; i++)
        if (PackageManager.offers[i] == name_package) {
            is_offer = true
        }
    return is_offer
}
PackageManager.what_offers = function() {
    var offers = ""
    for (var i = 0; i < offers.length; i++) {
        offers += offers[i]
        if (i != offers.length - 1)
            offers += ","
    }
    return offers
}
PackageManager.find_package = function(name_package) {
    var package = {}
    for (var i = 0; i < PackageManager.all_packages.length; i++)
        PackageManager.all_packages[i].through(function(pk) {
            if (pk.package == name_package)
                package = pk
        })
    return package
}
PackageManager.drop = function() {
    if (typeof arguments[arguments.length - 1] === 'function')
        var callback = arguments[arguments.length - 1]
    var name_packages = arguments
    for (var i = 0; i < name_packages.length; i++) {
        if (PackageManager.is_offer$U(name_packages[i])) {
            var pk = PackageManager.find_package(name_packages[i])
            pk.my_manager.package_uncharged.push(pk.package)
        }
    }
    if (callback)
        PackageManager.download(callback)
}
PackageManager.all_packages_managers = []
PackageManager.package_uncharged = []
PackageManager.download = function(callback) {
    if (window.WebSocket) {
        var pk_uncharged = 0
        for (var i = 0; i < PackageManager.all_packages_managers.length; i++) {
            pk_uncharged += PackageManager.all_packages_managers[i].package_uncharged.length
        }
        if (pk_uncharged != 0) {
            for (var i = 0; i < PackageManager.all_packages_managers.length; i++) {
                if (PackageManager.all_packages_managers[i].package_uncharged.length) {
                    var packages = PackageManager.all_packages_managers[i].package_uncharged.join()
                    var pm = PackageManager.all_packages_managers[i]
                    if (pk_uncharged == 1) {
                        pk_uncharged--
                        pm.socket.send_msg('{"type": "charge_packages", "body":"' + packages + '"}', eval, callback)
                    } else {
                        pk_uncharged--
                        pm.socket.send_msg('{"type": "charge_packages", "body":"' + packages + '"}', eval)
                    }
                    PackageManager.all_packages_managers[i].package_uncharged = []
                }
            }
        } else {
            callback()
        }
    } else {
        var array_path = []
        for (var i = 0; i < PackageManager.all_packages_managers.length; i++) {
            if (PackageManager.all_packages_managers[i].package_uncharged.length) {
                for (var e = 0; e < PackageManager.all_packages_managers[i].package_uncharged.length; e++) {
                    var pk = PackageManager.find_package(PackageManager.all_packages_managers[i].package_uncharged[e])
                    for (var a = 0; a < pk.files.length; a++) {
                        var path = PackageManager.all_packages_managers[i].uri + pk._path + pk.files[a].name
                        array_path.push(path)
                    }
                }
            }
        }
        if (array_path.length) {
            for (var i = 0; i < array_path.length; i++) {
                if (i != array_path.length - 1)
                    PackageManager.include_script(array_path[i])
                else {
                    PackageManager.include_script(array_path[i], callback)
                }
            }
        } else {
            callback()
        }
    }
}
function navigator_version() { return navigator.appVersion }
function is_firefox(ffversion){
	ffversion = ffversion || ""
	return navigator.userAgent.toLowerCase().indexOf('firefox/'+ffversion) > -1;
}
function CodeBlockFinder(snippet, start_after, delimiters, counted_character){
	delimiters = delimiters || {}
	delimiters.open  = delimiters.open  || '{'
    delimiters.close = delimiters.close || '}'
    this.delimiters = delimiters
    this.counted_character = counted_character || "\n"
    this.search_start = 0
    if (start_after){
	    if (typeof(start_after) === "number")
	    	this.search_start = start_after
	    if (start_after.constructor.name == "String" ||
	    	start_after.constructor.name == "RegExp"    )
	    	this.search_start = snippet.search(start_after)
    }
    if (this.search_start < 0)
        throw "Impossible to set up the CodeBlockFinder" +
              "with params: " + arguments.toSource()
    this.source    = snippet + " " 
    this.reset()
}
CodeBlockFinder.States  = new Enumeration("searching", "scanning", "ended")
CodeBlockFinder.prototype.reset = function(){
	this.initial    = this.search_start
    this.final      = this.search_start
    this.status     = CodeBlockFinder.States.searching
    this.delimiter  = this.delimiters.open  
    this.nested     = 0
    this.lines_read = 0
}
CodeBlockFinder.prototype.start = function(){
	var car  = null 
	var text = []
    while(car = this.source[this.initial]){
    	if (car == this.counted_character)
    		this.lines_read++
    	switch(this.status){
    		case CodeBlockFinder.States.searching:
	    		if (car == this.delimiter){
	    			text.push(car)
	    			this.delimiter = this.delimiters.close 
	    			this.status    = CodeBlockFinder.States.scanning
	    		}      
	    		break;
	    	case CodeBlockFinder.States.scanning:
	    	    text.push(car)
	    	    if (car == this.delimiters.open)
	    	    	this.nested++
	    		if (car == this.delimiter){
	    			if (this.nested > 0)
	    				this.nested--
	    			else
	    			    this.status = CodeBlockFinder.States.ended
	    		}      
	    		break;
	    	case CodeBlockFinder.States.ended:
	    	   this.text = text.join("")
	    	   return this.text
	    	default:
	    	  throw "Inconsistent state parsing code block"
	    	  break;
    	}
    	this.initial++
    }
    return ""
}
CodeBlockFinder.parse_params = function(string_of_params){
   var params = []
   if (/^\s*$/.test(string_of_params))
    return params
   var possible_param = string_of_params.split(/,\s*/)
   var items = possible_param.length
   var position_line = 0
   var position_initialize = 1  
   for (var i=0; i<items; i++){
        if (!possible_param[i].match(/function\s+initialize/))
            position_line++
        else
            position_initialize = position_line
    }
   for (var i=0; i<items; i++){
     if (possible_param[i].match(/function/)){
        var closure = ""
        var closure_param = new CodeBlockFinder(possible_param.slice(i).join(','), /function/, {open: '(', close: ')'}, ',')
        closure_param.start()
        var delta = closure_param.lines_read 
        closure_param     = new CodeBlockFinder(possible_param.slice(i).join(','), '{', null, ',')
        closure_param.start()
        delta +=  closure_param.lines_read + (position_initialize)
        closure = possible_param.slice(i, i + delta).join(", ")
        params.push(closure)
        i += delta - (position_initialize)
     } else
        params.push(possible_param[i])
   }
   return params
}
function get_HTML_element(html_element, create){
	if (typeof(html_element) === "string"){
		var element = document.getElementById(html_element)
		if (!element){
			element = document.createElement("div")
			element.setAttribute("id", html_element)
			document.body.appendChild(element)
			html_element = element
		}
	}
    return html_element
}
function JavascriptSource (file_name) {
	this.file_name = file_name
	this.source = JavascriptSource.read(file_name)
	this.lines = this.source.split("\n")
	JavascriptSource.read_files[file_name] = this
}
JavascriptSource.prototype.line = function(line_number){ 
	return this.lines[line_number-1]
}
JavascriptSource.prototype.lines_from = function(start, end){
	start = start || 0
	end   = end   || this.lines.length
	return this.lines.slice(start, end)
}
JavascriptSource.prototype.code_from = function(line_number, end_line){
	return this.lines_from.apply(this, arguments).join("\n")
}
JavascriptSource.read_files = {}
JavascriptSource.read = function(file_name){
	if (JavascriptSource.read_files[file_name])
		return JavascriptSource.read_files[file_name]
	var request = new XMLHttpRequest();
	request.open("GET", file_name, false);
	try{
	   request.send(null);
	} catch (err){
		throw "NetError. Imposible to reach file " + file_name
	}
	var returnValue = request.responseText;
	return returnValue;
}
function $Logger(html_element, severity){
	this.panel    = get_HTML_element(html_element || "ll_logger")
	this.severity = severity || "TESTING"
	this.logs     = []
}
$Logger.prototype.log = function(message, severity){
	severity = severity || this.severity
	if ($K_debug_level >= $KC_dl[severity]){
		this.panel.innerHTML = "[" + new Date().toLocaleTimeString() + "]:" + severity + ": " + 
		                       message + "<br/>\n" + this.panel.innerHTML
		this.logs.push(message)
	}
}
Processor.prototype.constructor = Processor;
function Processor() {
    this.now = new Date()
    this.events = new Event()
    this.threads = []
    Object.defineProperty(this, "run_bound", {
        value: Processor.prototype.run.bind(this),
        enumerable: false
    })
}
Processor.prototype.register = function(cObject, solicitorF) {
    var obj = null
    var fun = null
    if (cObject) {
        obj = cObject
        if (solicitorF)
            fun = solicitorF
        else if (cObject.run)
            fun = cObject.run
        if (!fun)
            throw "The current processor can´t get a valid solicitor"
    }
    this.threads.push({
        object: cObject,
        solicitor: (solicitorF ? solicitorF : cObject.run)
    });
}
Processor.prototype.kill = function(rObject, solicitorF) {
    for (var i in this.threads)
        if (this.threads[i] == {
            object: rObject,
            solicitor: solicitorF
        })
            this.threads.slice(i, i + 1);
}
Processor.prototype.step = function(date) {
    this.now = date || new Date();
    try {
        for (var i = 0; i < this.threads.length; i++)
            this.threads[i].solicitor.call(this.threads[i].object, this.now);
    } catch (e) {
    }
}
Processor.prototype.run = function(date) {
    this.now = new Date();
    this.step(this.now)
    setTimeout(this.run_bound, 20)
}
Processor.prototype.start = function() {
    this.run()
    return this;
}
Processor.prototype.newThread = function() {
    var t = new Thread(null, this)
    t.run = Processor.prototype.newThread.block_given$U() || function() {;
    }
    return t;
}
Processor.prototype.get = Processor.prototype.get = function(object) {
    var collect = []
    var len = this.threads.length
    for (var i = 0; i < len; i++) {
        var candidate = this.threads[i].object
        if (candidate && !collect.include$U(candidate) &&
            (candidate == object || candidate instanceof object)
        )
            collect.push(candidate)
    }
    return collect
}
$Processor = new Processor().start()
Thread.prototype.constructor = Thread;
function Thread(solicitor, processor){
	this.before = new Date()
	this.now = processor? processor.now: new Date();
	if (!solicitor)
		solicitor = this.run;
	if (processor && processor instanceof Processor)
		processor.register(this, solicitor);
}
Thread.prototype.run = function(processors_time){
	this.now = processors_time
	throw "The solicitor function remains still undefined."
}
State.prototype = new VersionNumber
State.prototype.constructor = State
function State(label) {
    VersionNumber.apply(this, arguments)
    var that = this
    this.before_hooks = []
    this.after_hooks = []
    Object.defineProperties(this, {
        before_hooks: {
            value: this.before_hooks,
            enumerable: false
        },
        after_hooks: {
            value: this.after_hooks,
            enumerable: false
        }
    })
    Object.defineProperty(this, "regime", {
        value: State.REGIME.up,
        writable: true,
        configurable: true
    })
    this.run = function() {}
    this[this] = function() {
        return State.prototype._run.apply(that, arguments)
    }
}
State.prototype._run = function() {
    var response = []
    var reference = this.owner || this
    var args = Array.prototype.slice.call(arguments, 0)
    args.push(reference)
    for (var i = this.before_hooks.length - 1; i >= 0; i--)
        this.before_hooks[i].apply(reference, args)
    response[0] = this.run.apply(reference, arguments)
    if (this.run[this.regime.name])
        response[1] = this.run[this.regime.name].apply(reference, arguments)
    args.push(response)
    if (this.after_hooks.length)
        for (var i = this.after_hooks.length - 1; i >= 0; i--)
            this.after_hooks[i].apply(reference, args)
    return response
}
Object.defineProperty(State.prototype, "_run", {
    value: State.prototype._run,
    enumerable: false,
    writable: false,
    configurable: false
})
State.REGIME = new Enumeration("up", "steady", "down")
State.NONE = new State("-1")
Automata.prototype.constructor = Automata;
function Automata(states, solicitor) {
    var that = this
    function initialize() {
        function find_initial_state(state_level, initial_state) {
            initial_state = initial_state || ""
            for (var i = 0; i < state_level.length; i++) {
                if (state_level[i] instanceof Array) {
                    initial_state += "." + state_level[i - 1]
                    return find_initial_state(state_level[i], initial_state)
                }
                if (Object.prototype.toString.call(state_level[i]) === "[object String]") {
                    if (/^\*/.test(state_level[i])) {
                        state_level[i] = state_level[i].substring(1)
                        return initial_state + "." + state_level[i]
                    }
                }
            }
        }
        var i_state = (find_initial_state(states) || "").substring(1).split(".")
        if (states instanceof Array)
            states = new(ProxyConstructor(EnumerationOf, State, states))
        that.state = states ? states : new Enumeration()
        that.state.each(function(k, v) {
            v.owner = that
            Object.defineProperty(v, 'owner', {
                enumerable: false,
                writable: false
            })
        })
        that.state.none = new State(State.NONE)
        var initial_state
        for (initial_state = that.state; i_state.length; initial_state = initial_state[i_state.shift()]);
        that.current = new StateGear(that, initial_state)
        that.current.zip(solicitor)
    }
    if (arguments.length)
        initialize()
}
Automata.prototype.switch = function(state) {
    if (Object.prototype.toString.call(state) == "[object String]") {
        state = state.split(".")
        var s
        for (s = this.state; state.length; s = s[state.shift()]);
        state = s
    }
    this.current.requested = state
}
Automata.prototype.run = function() {
    return this.current.drive_state.apply(this.current, arguments)
}
function StateGear(automata, initial_state) {
    this.automata = automata
    this.previous = State.NONE
    this.current = State.NONE
    this.requested = initial_state || State.NONE
}
StateGear.prototype.valueOf = function() {
    return this.current
}
StateGear.prototype.toString = function() {
    return this.current.toString()
}
StateGear.prototype.drive_state = function() {
    var s = this.current
    if (this.requested != this.automata.state.none) {
        s.regime = State.REGIME.down
        s[s].apply(s, arguments)
        this.previous = this.current;
        this.current = this.requested;
        this.requested = this.automata.state.none;
        var s = this.current
        s.regime = State.REGIME.up
        s[s].apply(s, arguments)
        s.regime = State.REGIME.steady
    }
    return s[s].apply(s, arguments)
}
StateGear.prototype.zip = function(solicitors, base_state) {
    base_state = base_state || this.automata.state
    function add_state(name, driver) {
        var base = base_state
        name = name.split(".")
        if (name.length == 1)
            base[i].run = driver
        else {
            while (name.length > 1) {
                var current
                try {
                    base = base[current = name.shift()]
                } catch (e) {
                    throw "State " + current + " is not defined."
                }
            }
            var regime = name.shift()
            var included = false
            State.REGIME.each(function(k, v) {
                if (k == regime)
                    included = true
            })
            if (!included)
                throw "Invalid regime " + regime + "."
            base.run[regime] = driver
        }
    }
    for (var i in solicitors) {
        if (solicitors[i] instanceof Function)
            add_state(i, solicitors[i])
        else if (solicitors[i] instanceof Array) {
            add_state(i, solicitors[i].shift())
            this.zip(solicitors[i][0], base_state[i])
        }
    }
}
ThreadAutomata.prototype = new Thread
ThreadAutomata.extend(Automata)
ThreadAutomata.prototype.constructor = ThreadAutomata
ThreadAutomata.prototype.super = Automata
function ThreadAutomata(state, solicitor, processor) {
    if (arguments.length) {
        Automata.call(this, state, solicitor);
        Thread.call(this, ThreadAutomata.prototype.run, processor);
    }
}
ThreadAutomata.prototype.run = function(processors_time) {
    if (this.now)
        this.before = this.now
    this.now = processors_time
    Automata.prototype.run.call(this, this.now, this.before);
}
Device.prototype = new Processor
Device.extend(ThreadAutomata) 
Device.prototype.constructor = Device
Device.STATE = new EnumerationOf(State, ["suspended", "running", "suspending", "killing", "killed"])
Device.default_solicitors = {
            running: function() {
                this.gate_runner(this.now)
                this.child_runner(this.now);
            },
            suspending: function() {
                this.child_runner(this.now);
            },
            killing: function() {
                this.gate_runner(this.now)
            }
        }
function Device(view, state, solicitors, parent, block) {
    var that = this
    this._class = that
    function engage_drivers(){
        var usher = new Device.StateUsher(that)
        var attr = that.keys()
        state.each(function(key, value){
            var reg = new RegExp("^" + key + "_")
            for (var i=0; i<attr.length; i++)
                if (reg.test(attr[i]))
                    usher.add(attr[i], key, value)
        })
    }
    function initialize() { 
        state = state  || new EnumerationOf(State, Device.STATE)
        that.solicitors = solicitors || Device.default_solicitors
        if (view)
            that.view = (typeof(view) === "string" ? document.getElementById(view) : view)
        that.event_dispatcher = new EventDispatcher();
        that.gates = []
        that.open_device = _$innerObject(that, "device")
        that.event_dispatcher.device = that
        that.register(that.event_dispatcher, that.event_dispatcher.shift)
        if (that.self_events)
            that.event_dispatcher.joinPorts(that.self_events)
        ThreadAutomata.call(that, state, that.solicitors, parent || $Processor);
        engage_drivers()
        Device.yield(that.state)
        that.switch("running")
    }
    if (arguments.length) 
        initialize();
}
Device.prototype.gate_runner = function() {
    for (var i = 0; i < this.gates.length; i++)
        this.gates[i].run(this.now, this.before)
}
Device.prototype.child_runner = function() {
    if (this.current_state != this.state.killed) {
        this.now = arguments[0]
        for (var i in this.threads)
            try {
                this.threads[i].solicitor.call(this.threads[i].object, this.now);
            } catch (e) {
            }
    }
}
Device.prototype.new_gate = function(el, ClassCons, config) {
    try {
        var Cons = this.open_device(ClassCons)
        var view = this.view || null
        var ob = new Cons(el, view, config)
        ob.device = this
        this.gates.push(ob)
        return ob
    } catch (e) {
        if ($K_debug_level >= $KC_dl.DEVELOPER)
            alert("No event handlers were found.\nException: " + e.toSource())
    }
}
Device.prototype.attend = function(date, mssg) {
    this["attend_" + mssg.name](date, mssg) 
}
Device.prototype._y = function(htmlElement, stopAt) {
    stopAt = stopAt || null
    if (typeof(stopAt) === "string")
        stopAt = document.getElementById(stopAt)
    if (stopAt !== htmlElement && htmlElement.offsetParent)
        return htmlElement.offsetTop + Device.prototype._y(htmlElement.offsetParent, stopAt)
    return 0
}
Device.prototype._x = function(htmlElement, stopAt) {
    stopAt = stopAt || null
    if (typeof(stopAt) === "string")
        stopAt = document.getElementById(stopAt)
    if (stopAt && htmlElement && stopAt === htmlElement)
        return 0
    if (htmlElement.offsetParent)
        return htmlElement.offsetLeft + Device.prototype._x(htmlElement.offsetParent, stopAt)
    return 0
}
Device.prototype.y_calc = function() {
    if (this.view) {
        this.y = this._y(this.view)
        return this.y
    }
    return null
}
Device.prototype.x_calc = function() {
    if (this.view) {
        this.x = this._x(this.view)
        return this.x
    }
    return null
}
Device.prototype.fire_event = function(mssg) {
    for (var i = 0; i < this.event_dispatcher.ports[mssg.name].length; i++)
        this.event_dispatcher.ports[mssg.name][i].event_dispatcher.enqueue(mssg.clone())
}
Device.prototype.add_port = function(mssg_name, device) {
    this.event_dispatcher.add_port(mssg_name, device)
}
Device.prototype.new_message = function(type, name, data) {
    if (type && name)
        return systemEv(type, {
            name: name,
            data: data || "no extra data available"
        }, this)
}
Device.prototype.send_message = function(type, name, data, receiptant) {
    receiptant.event_dispatcher.enqueue(this.new_message(type, name, data))
}
Device.prototype.appear = function() {
    this.view.style.display = "block"
}
Device.prototype.hide = function() {
    this.view.style.display = "none"
}
Device.prototype.method_missing = function(method, obj, params) {
    if (this.respond_to$U(method.underscore()))
        return method.underscore.apply(this, params)
    obj = obj || ""
    params = params || []
    throw (new MethodMissingError(method + " missing in " + obj + "::" + this.constructor.name + ". Params: " + params.join(', ')))
}
Device.StateUsher = function(I) {
    this.i = I
    this.state = I.state
}
Device.StateUsher.prototype.add = function(driver_name, hook_name, state) {
    var host = state
    var substates = driver_name.split("_")
    for (var i=0; i<hook_name.split("_").length; i++)
        substates.shift()
    var regime = false
    while (substates.length){
        var new_level = substates.shift() 
        for (var r in State.REGIME)
            if ( r == new_level )
                regime = new_level
        if (!regime){
            if (!host[new_level]) 
                this.state.add(new_level, host.toString())
            host = host[new_level]
        }
    }
    host = host.run
    if (regime)
        host[regime] = this.i[driver_name]
    else
        host = this.i[driver_name]
}
EventDispatcher.prototype = new ThreadAutomata
EventDispatcher.prototype.constructor = EventDispatcher
function EventDispatcher() {
    var that = this; 
    this.ids = 0
    this.ports = {
    }
    this.inqueue = []
    this.clss = that 
    this.getId = function() {
        return ++that.ids;
    }
}
EventDispatcher.prototype.enqueue = function(mssg) {
    var ev = this
    mssg.received = {
        id: ev.getId(),
        time: new Date()
    };
    this.inqueue.push(mssg)
    return mssg.received.id
}
EventDispatcher.prototype.add_port = function(event, device) {
    if (this.ports[event])
        this.ports[event].push(device)
}
EventDispatcher.prototype.joinPorts = function(listArray) {
    for (var i = 0; i < listArray.length; i++)
        this.ports[listArray[i]] = []
}
EventDispatcher.prototype.delPort = function(event, device) {
    if (this.clss.ports[event])
        for (var i = 0; i < this.clss.ports.length; i++)
            if (this.clss.ports[i] === device)
                this.clss.ports[i].splice(i, 1)
}
EventDispatcher.prototype.fireEvent = function(event) {
    if (this.clss.ports[event.name])
        for (var i = 0; i < this.clss.ports[event.name].length; i++)
            this.clss.ports[event.name][i](event);
}
EventDispatcher.prototype.shift = function() { 
    for (var i = 0; i < this.inqueue.length; i++)
        try {
            var mssg = this.inqueue[i]
            if (mssg.status[mssg.current] === "closed")
                this.inqueue.splice(i, 1)
            if (this.inqueue[i]) {
                mssg = this.inqueue[i]
                if (mssg.status[mssg.current] === "sent") {
                    this.device.attend(arguments[0], mssg)
                    mssg.current++
                }
            }
        } catch (e) {
            if ($K_debug_level >= $KC_dl.PROGRAMMER)
                alert("No event handler for message. \nException: " + e.toSource())
        }
    return true;
}
EventDispatcher.prototype.run = function() {
    return shift.apply(this, arguments)
}
function _stitchWorlds(gate, solicitor) {
    return function(e) {
        e = e || window.event
        try {
            return gate[solicitor](e, this)
        } catch (err) {
            Exception.parse(err)
        }
    }
}
function Gate(element, parent, config) {
    var that = this
    var args = arguments
    function initialize() {
        if (element) {
            if (typeof(element) === "string")
                if (document.getElementById(element))
                    element = document.getElementById(element)
                else {
                    var element_name = element
                    element = document.createElement("div")
                    element.setAttribute('id', element_name)
                    if (parent) {
                        if (typeof(parent) === "string")
                            parent = document.getElementById(parent)
                        if (parent) parent.appendChild(element)
                    }
                }
            that.panel = element
        }
        if (!element) {
            that.panel = document.createElement("div")
            if (parent)
                parent.appendChild(that.panel)
            else
                document.body.appendChild(that.panel)
        }
        if (config)
            that.merge$B(config)
        that.keys(/do_.*/).each(function(handler) {
            handler.match(/do_(.*)/)
            that.panel[RegExp.$1] = _stitchWorlds(that, handler)
        })
        that.threads = []
    }
    if (arguments.length)
        initialize()
}
Gate.prototype.listen = function(event, handler) {
    this.panel[event] = _stitchWorlds(this, handler)
}
Gate.prototype.getCanvas = function() {
    return this.panel.lastChild;
} 
Gate.prototype.applySkin = function(skin) {
    var div = document.createElement("div")
    div.setAttribute("class", skin)
    this.panel.appendChild(div)
}
Gate.prototype.run = function(now, before) {
    for (var i = 0; i < this.threads.length; i++)
        this.threads[i].run(now, before)
}
Gate.prototype.new_effect = function(eff) {
    this.threads.push(eff)
    return eff
}
Lookup.prototype.constructor = Lookup
function Lookup(){
    this.levers = []
    this.ports = []
    this.applications = []
    this.eventDispatcher = null
    this.global = []
    this.view = null
}
Lookup.prototype.add = function(obj){
    if (obj.isPrototypeOf(EventDispatcher)) 
        this.eventDispatcher = obj
	else this.global.push(obj)
}
Lookup.prototype.get = function(interfc){
	var objects = []
	for (var i=0; i<this.global.length; i++)
		if (interfc.isPrototypeOf(this.global[i]))
			if (this.global[i].lookupGet)
				objects.push(this.global[i].lookupGet())
			else
				objects.push(this.global[i])
}
Lookup.prototype.off = function(object){
	for (var i=0; i<this.global.length; i++)
		if (this.global[i] == object)
			this.global.splice(i,1);
}
var systemEv = (function(){
    return (function $_sev(type, event, behalf){
	var args = arguments
	function setup(){
	    var sEvs = {
		"sync": {	type    : "synchronous",					
		    name	: null,
		    creation: {creator: null, time: null},		
		    current : 0,								
		    status  : ["sent", "attended", "closed"],	
		    event   : {}
		}
	    }
	    newOb = sEvs[type]
	    newOb.name             = event.name
	    newOb.event[event.name]= event
	    newOb.creation.creator = (typeof (behalf) === "object")? behalf : null
	    newOb.creation.time    = new Date()
	    return newOb
	}
	var ob_msg = setup(  )
	$_sev.yield(ob_msg)
	return  ob_msg; })
})()
MoveLeftEffect.prototype = new ThreadAutomata
MoveLeftEffect.prototype.constructor = MoveLeftEffect
MoveLeftEffect.prototype.super = ThreadAutomata
function MoveLeftEffect(view, final_coord, initial_coord, velocity) {
    var that = this
    if (Object.prototype.toString.call(view) == "[object String]")
        view = document.getElementById(view)
    this.view = view
    this.final_coord = final_coord
    this.coord = this.initial_coord = initial_coord
    this.velocity = velocity || [70, 0]
    var solicitors = {
        "running": function(now, before) {
            for (var i = that.coord.length - 1; i >= 0; i--)
                that.coord[i] += that.velocity[i] * (now - before) / 1000
            that.view.style.width = "" + that.coord[0] + "px"
            if (that.coord[0] >= that.final_coord[0])
                that.switch("stopped")
        }
    }
    ThreadAutomata.call(this, ["stopped", "*running"], solicitors)
}
MoveDownEffect.prototype = new ThreadAutomata
MoveDownEffect.prototype.constructor = MoveDownEffect
MoveDownEffect.prototype.super = ThreadAutomata
function MoveDownEffect(view, final_coord, initial_coord, velocity) {
    var that = this
    if (Object.prototype.toString.call(view) == "[object String]")
        view = document.getElementById(view)
    this.view = view
    this.final_coord = final_coord
    this.coord = this.initial_coord = initial_coord
    this.velocity = velocity || [0, 20]
    var solicitors = {
        "running": function(now, before) {
            for (var i = that.coord.length - 1; i >= 0; i--)
                that.coord[i] += that.velocity[i] * (now - before) / 1000
            that.view.style.height = "" + that.coord[1] + "px"
            if (that.coord[1] >= that.final_coord[1])
                that.switch("stopped")
        }
    }
    ThreadAutomata.call(this, ["stopped", "*running"], solicitors)
}
RectangleEffect.prototype = new ThreadAutomata
RectangleEffect.prototype.constructor = RectangleEffect
RectangleEffect.prototype.super = ThreadAutomata
function RectangleEffect(view, final_coord, initial_coord, velocity) {
    var that = this
    if (Object.prototype.toString.call(view) == "[object String]")
        view = document.getElementById(view)
    this.view = view
    this.final_coord = final_coord
    this.coord = this.initial_coord = initial_coord
    this.velocity = velocity || [51, 3]
    var solicitors = {
        "running": function(now, before) {
            for (var i = that.coord.length - 1; i >= 0; i--)
                that.coord[i] += that.velocity[i] * (now - before) / 1000
            that.view.style.width = "" + that.coord[0] + "px"
            that.view.style.height = "" + that.coord[1] + "px"
            if (that.coord[0] >= that.final_coord[0])
                that.switch("stopped")
        }
    }
    ThreadAutomata.call(this, ["stopped", "*running"], solicitors)
}
RotateEffect.prototype = new ThreadAutomata
RotateEffect.prototype.constructor = RotateEffect
RotateEffect.prototype.super = ThreadAutomata
function RotateEffect(view, config) {
    var that = this
    if (Object.prototype.toString.call(view) == "[object String]")
        view = document.getElementById(view)
    this.view = view
    config = config || {}
    this.angle = config.angle
    this.final_coord = config.final_coord || [0, 0]
    this.coord = this.initial_coord = config.initial_coord || [0, 0]
    this.velocity = config.velocity || [20, 20]
    var solicitors = {
        "running": function(now, before) {
            for (var i = that.coord.length - 1; i >= 0; i--)
                that.coord[i] += that.velocity[i] * (now - before) / 1000
            that.view.style.transform = 'rotate(' + that.coord[0] + 'deg)'
            that.view.style.webkitTransform = 'rotate(' + that.coord[0] + 'deg)'
            that.view.style.mozTransform = 'rotate(' + that.coord[0] + 'deg)'
            that.view.style.msTransform = 'rotate(' + that.coord[0] + 'deg)'
            that.view.style.oTransform = 'rotate(' + that.coord[0] + 'deg)'
            if (that.angle && that.coord[0] >= that.angle)
                that.switch("stopped")
        }
    }
    ThreadAutomata.call(this, ["stopped", "*running"], solicitors)
}
SideRotationEffect.prototype = new ThreadAutomata
SideRotationEffect.prototype.constructor = SideRotationEffect
SideRotationEffect.prototype.super = ThreadAutomata
function SideRotationEffect(view, config) {
    var that = this
    if (Object.prototype.toString.call(view) == "[object String]")
        view = document.getElementById(view)
    this.view = view
    config = config || {}
    this.angle = config.angle
    this.origin = config.origin || [0, 0]
    this.final_coord = config.final_coord || [0, 0]
    this.coord = this.initial_coord = config.initial_coord || [0, 0]
    this.velocity = config.velocity || [20, 20]
    var solicitors = {
        "running": function(now, before) {
            for (var i = that.coord.length - 1; i >= 0; i--)
                that.coord[i] += that.velocity[i] * (now - before) / 1000
            that.view.style.transform = 'rotate(' + that.coord[0] + 'deg)'
            that.view.style.transformOrigin = '' + that.origin[0] + '%' + that.origin[1] + '%'
            that.view.style.webkitTransform = 'rotate(' + that.coord[0] + 'deg)'
            that.view.style.webkitTransformOrigin = '' + that.origin[0] + '%' + that.origin[1] + '%'
            that.view.style.mozTransform = 'rotate(' + that.coord[0] + 'deg)'
            that.view.style.mozTransformOrigin = '' + that.origin[0] + '%' + that.origin[1] + '%'
            that.view.style.msTransform = 'rotate(' + that.coord[0] + 'deg)'
            that.view.style.msTransformOrigin = '' + that.origin[0] + '%' + that.origin[1] + '%'
            that.view.style.oTransform = 'rotate(' + that.coord[0] + 'deg)'
            that.view.style.oTransformOrigin = '' + that.origin[0] + '%' + that.origin[1] + '%'
            if (that.angle && that.coord[0] >= that.angle)
                that.switch("stopped")
        }
    }
    ThreadAutomata.call(this, ["stopped", "*running"], solicitors)
}
SideRotationEffect.prototype = new ThreadAutomata
SideRotationEffect.prototype.constructor = SideRotationEffect
SideRotationEffect.prototype.super = ThreadAutomata
function SideRotationEffect(view, config) {
    var that = this
    if (Object.prototype.toString.call(view) == "[object String]")
        view = document.getElementById(view)
    this.view = view
    config = config || {}
    this.angle = config.angle
    this.origin = config.origin || [0, 0]
    this.final_coord = config.final_coord || [0, 0]
    this.coord = this.initial_coord = config.initial_coord || [0, 0]
    this.velocity = config.velocity || [20, 20]
    var solicitors = {
        "running": function(now, before) {
            for (var i = that.coord.length - 1; i >= 0; i--)
                that.coord[i] += that.velocity[i] * (now - before) / 1000
            that.view.style.transform = 'rotate(' + that.coord[0] + 'deg)'
            that.view.style.transformOrigin = '' + that.origin[0] + '%' + that.origin[1] + '%'
            that.view.style.webkitTransform = 'rotate(' + that.coord[0] + 'deg)'
            that.view.style.webkitTransformOrigin = '' + that.origin[0] + '%' + that.origin[1] + '%'
            that.view.style.mozTransform = 'rotate(' + that.coord[0] + 'deg)'
            that.view.style.mozTransformOrigin = '' + that.origin[0] + '%' + that.origin[1] + '%'
            that.view.style.msTransform = 'rotate(' + that.coord[0] + 'deg)'
            that.view.style.msTransformOrigin = '' + that.origin[0] + '%' + that.origin[1] + '%'
            that.view.style.oTransform = 'rotate(' + that.coord[0] + 'deg)'
            that.view.style.oTransformOrigin = '' + that.origin[0] + '%' + that.origin[1] + '%'
            if (that.angle && that.coord[0] >= that.angle)
                that.switch("stopped")
        }
    }
    ThreadAutomata.call(this, ["stopped", "*running"], solicitors)
}
BackgroundMoveEffect.prototype = new ThreadAutomata
BackgroundMoveEffect.prototype.constructor = BackgroundMoveEffect
BackgroundMoveEffect.prototype.super = ThreadAutomata
function BackgroundMoveEffect(view, config) {
    var that = this
    if (Object.prototype.toString.call(view) == "[object String]")
        view = document.getElementById(view)
    this.view = view
    this.final_coord = config.final_coord
    this.coord = this.initial_coord = config.initial_coord || [0, 0]
    this.velocity = config.velocity || [70, 0]
    var solicitors = {
        "running": function(now, before) {
            for (var i = that.coord.length - 1; i >= 0; i--)
                that.coord[i] += that.velocity[i] * (now - before) / 1000
            that.view.style.backgroundPosition = "" + that.coord[0] + "%" + that.coord[1] + "%"
            if (that.final_coord && that.coord[0] >= that.final_coord[0])
                that.switch("stopped")
        }
    }
    ThreadAutomata.call(this, ["stopped", "*running"], solicitors)
}
function SymbolsTable(elements) {
    this.elements = elements || []
}
SymbolsTable.prototype.insert = function(name, value) {
    var element = {
        name: name,
        value: value
    }
    this.elements.push(element)
}
SymbolsTable.prototype.update_value = function(position, new_value) {
    this.elements[position].value = new_value
}
SymbolsTable.prototype.position = function(element) {
    var position = null
    var name = element.name || ""
    for (var i = 0; i < this.elements.length; i++) {
        if (name == this.elements[i])
            position = i
    }
    return position
}
SymbolsTable.prototype.is_in$U = function(element) {
    var element = element || {}
    for (var i = 0; i < this.elements.length; i++)
        if (this.elements.name == element.name)
            return true
    return false
}
function Builder() {
    this.lluvia_nodes = []
    this.prefix = ""
    this.space_name = null
    this.symbols_table = new SymbolsTable()
    if (arguments.length)
        for (var i = 0; i < arguments.length; i++) {
            if (typeof arguments[i] == "string")
                this.prefix = arguments[i]
            else if (typeof arguments[i] == "object")
                this.space_name = arguments[i]
        }
}
Builder.prototype.get_lluvia_nodes = function(actual_node) {
    var actual_node = actual_node || {}
    for (var i = 0; i < actual_node.childNodes.length; i++) {
        if (actual_node.childNodes[i].childNodes.length)
            this.get_lluvia_nodes(actual_node.childNodes[i])
        if (actual_node.childNodes[i].className != undefined && Builder.is_lluvia_element$U(actual_node.childNodes[i].className))
            this.lluvia_nodes.push(actual_node.childNodes[i])
        else if (actual_node.childNodes[i].nodeType == Node.COMMENT_NODE && Builder.is_lluvia_comment$U(actual_node.childNodes[i].nodeValue))
            this.lluvia_nodes.push(actual_node.childNodes[i])
    }
}
Builder.is_lluvia_element$U = function(element, separator) {
    var separator = separator || "-"
    var previous_word = element.split(separator)
    if (previous_word[0] == "lluvia" || previous_word[0] == "ll")
        return true
    return false
}
Builder.is_lluvia_comment$U = function(comment, token) {
    var comment = comment || ""
    var token = token || "#!ll"
    var not_found = -1
    if (comment.search(token) != not_found)
        return true
    return false
}
Builder.prototype.analize = function() {
}
Builder.prototype.scanner = function(text) {
}
Builder.prototype.analize_node = function(node, prefix) {
    var node = node || {}
    var descompose_node = node.className.split(" ")
    var class_css = descompose_node[1]
    var type = descompose_node[0].split("-")
    var result = {
        id: node.id,
        name: prefix + node.id,
        type: type[1],
        class_css: class_css,
        params: node.dataset.params,
        data_set: node.dataset
    }
    return result
}
Builder.prototype.clasify_element = function(element) {
    var element = element || {}
    if (element.type != "undefined")
        return "object"
}
Builder.prototype.create_element = function(node, type) {
    switch (type) {
        case "object":
            if (this.space_name == null)
                eval.call(null, "var " + node.name + " = new " + node.type + "(" + node.params + ")")
            else
                this.space_name[node.name] = eval("new " + node.type + "(" + node.params + ")")
            node.id.className = node.class_css
            break
    }
}
Builder.prototype.create_methods_element = function(element) {
    var dataset = element.data_set || {}
    var element_class = element.type || ""
    var new_methods = []
    function search_new_methods() {
        for (var i in dataset) {
            if (i.search("method") == 0) {
                var method = {
                    name: i.replace("method$", ""),
                    block: dataset[i]
                }
                new_methods.push(method)
            }
        }
    }
    search_new_methods()
    for (var i = 0; i < new_methods.length; i++) {
        eval(element.name + "." + new_methods[i].name + "=" + new_methods[i].block)
    }
}
Builder.prototype.run_methods = function(element) {
    var dataset = element.data_set || {}
    var methods = []
    function search_methods() {
        for (var i in dataset)
            if (i.search("run") == 0) {
                var method = {
                    name: i.replace("run$", ""),
                    params: dataset[i]
                }
                methods.push(method)
            }
    }
    search_methods()
    for (var i = 0; i < methods.length; i++)
        eval(element.name + "." + methods[i].name + "(" + methods[i].params + ")")
}
Builder.prototype.search_prefix = function(node_body) {
    var prefix = ""
    if (node_body.dataset.lluviaPrefix)
        prefix = node_body.dataset.lluviaPrefix
    return prefix
}
Builder.prototype.build = function() {
    var round = 2
    var element_creates = []
    this.get_lluvia_nodes(document)
    if (this.prefix == "")
        this.prefix = this.search_prefix(document.body)
    function is_in$U(name) {
        var result = false
        for (var i = 0; i < element_creates.length; i++)
            if (element_creates[i] == name)
                result = true
        return result
    }
    for (var a = 0; a < round; a++) {
        for (var i = 0; i < this.lluvia_nodes.length; i++) {
            var analize_result = this.analize_node(this.lluvia_nodes[i], this.prefix)
            var clasify_result = this.clasify_element(analize_result)
            if (!is_in$U(analize_result.name)) {
                try {
                    this.create_element(analize_result, clasify_result)
                    this.create_methods_element(analize_result)
                    this.run_methods(analize_result)
                    element_creates.push(analize_result.name)
                } catch (e) {
                    console.log(e)
                }
            }
        }
    }
}
CanvasDevice.prototype = new GraphicDevice
CanvasDevice.prototype.constructor = CanvasDevice
function CanvasDevice(screen, drawable_obj, incarnation) {
    GraphicDevice.call(this, screen, drawable_obj, incarnation)
    this.context = this.screen.getContext("2d")
    if (!this.context)
        throw "Unable to initialize context for 2d screen."
}
CanvasDevice.prototype.draw = function(){
	this.screen.width = this.screen.width
    this.context.translate(0, this.screen.height)
    this.context.scale(1, -1)
	for(var i = 0; i < this.drawable.length; i++)
		if("draw" in this.incarnation[this.incarnation.search_element(this.drawable[i])] && typeof(this.incarnation[this.incarnation.search_element(this.drawable[i])].draw) == "function")
		   this.incarnation[this.incarnation.search_element(this.drawable[i])].draw(this.drawable[i], this.context)
}
CanvasDevice.prototype.add_drawable_obj = function(drawable_obj){
    this.drawable.push(drawable_obj)
}
function GraphicDevice(screen, drawable_obj, incarnation) {
    if (typeof(screen) === "string")
        screen = document.getElementById(screen)
    if (!screen)
        screen = document.querySelector('canvas')
    if (!(screen instanceof HTMLElement))
        return
    if(incarnation)
       if(this.constructor.name != incarnation.graphic_type)
          throw "Invalid screen type"
       else
          this.incarnation = incarnation
    else
        this.incarnation = null
    this.drawable = drawable_obj
    this.screen = screen
    this.context = null
    GraphicDevice.screen = GraphicDevice.screen || []
    GraphicDevice.screen.push(this)
}
GraphicDevice.get_best_device_for = function(screen, drawable_obj, incarnation) {
    if (WebGl.available$U())
        return new WebGl(screen, drawable_obj, incarnation)
    return new CanvasDevice(screen, drawable_obj, incarnation)
}
WebGl.prototype = new GraphicDevice
WebGl.prototype.constructor = WebGl
function WebGl(screen, drawable_obj, incarnation, camera) {
    var that = this
    function initialize() {
        GraphicDevice.call(that, screen, drawable_obj, incarnation)
        that.context = new THREE.WebGLRenderer({
            canvas: that.screen,
            antialias:true
        })
        that.context.setClearColor(0xFFFFFF, 1)
        that.context.shadowMapEnabled = true;
        that.context.shadowMapType = THREE.PCFSoftShadowMap
        that.scene = new THREE.Scene()
        that.cameras = []
        that.selected_camera = 0
        that.merge_drawable_obj(drawable_obj)
        var aspect = that.screen.width / that.screen.height
        var view_angle = 45
        var near = 0.1
        var far = 1000000
        that.add_camera(aspect, view_angle, near, far, 0, 0, 500)
        that.controls = new THREE.OrbitControls( that.cameras[0] );
        that.controls.addEventListener( 'change', that.render );
        that.cameras[0].lookAt({x:500, y:200, z:0});
        that.context.setSize(that.screen.width, that.screen.height)
        var sphere = new THREE.Mesh(
            new THREE.SphereGeometry(5  , 60  , 24  ),
            new THREE.MeshLambertMaterial({
                color: 0xFFFF00
            })
        )
        sphere.castShadow = true
        that.scene.add(sphere);
        var ambientLight = new THREE.AmbientLight(0x000000);
        that.scene.add(ambientLight);
        var directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1);
        directionalLight.position.set(-500,0,500)
        directionalLight.castShadow = true
        directionalLight.shadowDarkness = 10;   
        directionalLight.shadowCameraRight    =  1000;
        directionalLight.shadowCameraLeft     = -1000;
        directionalLight.shadowCameraTop      = 1000; 
        directionalLight.shadowCameraBottom   = -1000;
        directionalLight.intensity = 2
        that.scene.add(directionalLight);
        that.context.render(that.scene, that.camera);
    }
    if (arguments.length) 
        initialize()
}
WebGl.prototype.merge_drawable_obj = function(drawable){
    this.drawable = []
    var drawable_obj = drawable.slice() || []
    for(var i = 0; i<drawable_obj.length; i++)
      this.add_drawable_obj(drawable_obj[i])
}
WebGl.prototype.add_drawable_obj = function(drawable_obj){
    this.drawable.push({obj: drawable_obj, three_obj:[]})
    this.create_3d_object(this.drawable[this.drawable.length-1].obj)
}
WebGl.prototype.create_3d_object = function(drawable_obj){
    var obj = null
    for (var i in this.incarnation[this.incarnation.search_element(drawable_obj)].mesh){
        obj = this.incarnation[this.incarnation.search_element(drawable_obj)].mesh[i](drawable_obj)
        this.scene.add(obj)
        this.add_3d_object(drawable_obj, obj)
    }
}
WebGl.prototype.add_3d_object = function(obj, three_obj){
  for(var i in this.drawable)
     if(obj == this.drawable[i].obj){
        this.drawable[i].three_obj.push(three_obj)
        break;
    }
}
WebGl.prototype.render = function(){
    this.update()
    this.context.render(this.scene, this.cameras[this.selected_camera])
}
WebGl.prototype.update = function(){
    for(var i = 0; i < this.drawable.length; i++)
        for(var j = 0; j < this.drawable[i].three_obj.length; j++)
            if("update" in this.drawable[i].three_obj[j] && typeof(this.drawable[i].three_obj[j].update) == "function")
               this.drawable[i].three_obj[j].update(this.drawable[i].obj)
}
WebGl.prototype.change_camera = function(){
    if(this.selected_camera+1 >= this.cameras.length)
       this.selected_camera = 0
    else
       this.selected_camera ++
}
WebGl.prototype.add_camera = function(aspect, angle, near, far, x, y ,z){
    var camera = null
    var aspect = aspect
    var view_angle = angle
    var near = near
    var far = far
    this.cameras.push( camera = new THREE.PerspectiveCamera(
        view_angle,
        aspect,
        near,
        far))
    this.scene.add(camera)
    camera.position.z = z
    camera.position.x = x
    camera.position.y = y
}
WebGl.available$U = function() {
    var webgl = false
    var canvas = document.createElement('canvas')
    try {
        webgl = !!window.WebGLRenderingContext &&
            !!canvas.getContext('webgl')
    } catch (e) {
        try {
            webgl = !!window.WebGLRenderingContext &&
                !!canvas.getContext('experimental-webgl')
        } catch (e) {
            webgl = false
        }
    }
    return webgl
}
Angle.prototype.constructor = Angle
Angle.mode = "rad"  
Angle.valid_modes = ["rad", "deg"]
var PI = Math.PI
function Angle(){
  var that = this
  this._value
  function parseInput(args){
    if (typeof(args[0] === "number"))
      that._value = args[0]
    if (typeof(args[0]) === "string"){
       var formula = args[0].replace(/\s+/g, "")
       formula = formula.replace(/pi/gi, "PI").replace(/PI/g, Math.PI)
       var k = formula.indexOf("º") == -1 ? 1 : Math.PI / 180
       that._value = k * eval(formula.match( /[^º]*/ ).toString())
    }
  }
  if (arguments.length > 0)
    parseInput(arguments)
}
Angle.prototype.valueOf = function(){
  return this._value
}
Angle.prototype.canonical = function(){
  var canon = this.value()
  var sign = canon  > 0 ? 1 : -1 
  while (canon > 2 * Math.PI || canon < 0)
    canon -= (sign) * 2 * Math.PI
  return canon
}
Angle.prototype.rounds = function(){
  var canon = this.value()
  var rounds = 0
  var sign = canon  > 0 ? 1 : -1 
  while (canon > 2 * Math.PI || canon < 0){
    canon -= (sign) * 2 * Math.PI
    rounds += sign
  }
  return rounds
}
Angle.prototype.equals = function(angle){
  var max = angle.value_of() > this.value_of() ? angle.value_of(): this.value_of();
  var min = angle.value_of() + this.value_of() - max
  while (max > min)
    max -= 2 * Math.PI
  return max == min
}
Angle.prototype.to_str = function(mode){ 
  mode = mode || Angle.mode
  mode = mode.toLowerCase()
  if (Angle.mode == "deg")
    return Angle.to_deg(this)
  return this.value()
}
Angle.to_deg = function (angle){
  if (! (angle instanceof Angle) )
    angle = new Angle(angle)
  return angle.value() * 180 / Math.PI
}
Expression.prototype = new String("")
Expression.prototype.constructor = Expression
function Expression(formula){
  this.formula = formula || ""
}
Expression.prototype.toString = function () {
  return this.formula
}
Expression.prototype.toSource = function () {
  return this.to_s
}
Expression.prototype.valueOf = function () {
  return this.to_s
}
Expression.math = {
  constants: [ "E", "LN2", "LN10", "LOG2E", "LOG10E", "PI", "SQRT1_2", "SQRT2" ],
  functions: [ "abs", "acos", "asin", "atan", "atan2", "ceil", "cos", "exp", 
               "floor", "log", "max", "min", "pow", "random", "round", "sin", 
	       "sqrt", "tan" ]
}
Expression.parse = function(string){
  return string.split(/,/) 
}
Complex.prototype.constructor = Complex    
Complex.prefix_sep = false  
Complex.sep = "i"          
Complex.valid_binomial_sep = ["i", "j"]
Complex.valid_polar_sep    = [";", ":", "\\|", "\\("]
Complex.output_mode = "binomial"
Complex.valid_output_modes = ["binomial", "polar", "exponential"]
function Complex () {
  var that = this
  this._real = 0
  this._img  = 0
  this._k_pi = 0
  function parse_input(args){
    if (args[0] instanceof Complex){
     that._real = args[0].real()
     that._img  = args[0].img()
    }
    if (args[0] instanceof Array){
      that._real = args[0][0] || 0
      that._img  = args[0][1] || 0
    }
    if (args.length == 2 && 
	typeof(args[0]) == "number" ||
	typeof(args[1]) == "number" )
	if (typeof(args[2]) == "string" && args[2][0].toLowerCase() == "p")
	  args[0] = "" + args[0] + ";" + args[1]
      else{
        that._real = args[0] || 0
        that._img  = args[1] || 0
      }
    if ( typeof(args[0]) == "string"){
      var text = args[0].replace(/,/g, ".")
      if (Complex.is_valid_binomial(args[0])){
	   that._real = eval( Complex.get_members("real", text).join(" ") ) || 0
	   that._img  = eval( Complex.get_members("img" , text).join(" ") ) || 0
      }
      if (Complex.is_valid_polar(args[0])){
         var mod = eval( Complex.get_members("mod", text).join(" ") ) || 0
         var ang = new Angle( Complex.get_members("arg", text) )
         var arg = ang.value() || 0
	   that._real = mod * Math.cos( arg )
	   that._img  = mod * Math.sin( arg )
	   that._k_pi = ang.rounds()
      }
    }
  }
  if (arguments.length != 0)
    parse_input(arguments)
}
Complex.prototype.real = function(){
  return this._real
}
Complex.prototype.re = function(){
  return this.real()
}
Complex.prototype.img = function(){
  return this._img
}
Complex.prototype.im = function(){ 
  return this.img()
}
Complex.prototype.imag = function(){ 
  return this.img()
}
Complex.prototype.imaginary = function(){ 
  return this.img()
}
Complex.prototype.valueOf = function(){
  return [this.real(), this.img()]
}
Complex.prototype.to_str = function(mode){
  mode = mode || Complex.output_mode.toLowerCase()
  mode = mode.toLowerCase()
  if ( mode[0] == "p" )  
    return "polar"
  return this.real() + _dress_img(this.img())  
}
Complex.prototype.toString = function(){
  return this.to_str()
}
Complex.prototype.equals = function(re, im){
  var model 
  if ( typeof(re) == "number" || typeof(im) == "number")
       model = new Complex(re, im)
  else 
         model = new Complex(re)
  return _$same_number(model.real(),this.real()) && _$same_number(model.img(), this.img())
}
Complex.prototype.identical = function(re, im){
  var model 
  if ( typeof(re) == "number" || typeof(im) == "number")
       model = new Complex(re, im)
  else 
         model = new Complex(re)
  return _$same_number(model.real(),this.real()) && 
         _$same_number(model.img(), this.img() ) &&
         _$same_number(model._k_pi, this._k_pi)  
}
Complex.prototype.is_real$U = function(){
  return this.img() == 0
}
Complex.prototype.is_img$U = function(){
  return this.real() == 0
}
Complex.prototype.is_im$U = function(){
  return this.is_img$u()
}
Complex.prototype.is_imag$U = function(){
  return this.is_img$u()
}
Complex.prototype.is_imaginary$U = function(){
  return this.is_img$u()
}
Complex.prototype.module = function(){
  var r = this.real();
  var i = this.img();
  return Math.sqrt( r * r + i * i )
}
Complex.prototype.arg = function(){
}
Complex.prototype.argument = function(){ 
  return this.arg()
}
Complex.get_members = function(real, text){
  real = real.toLowerCase()
  if (real[0] == "r" || real[0] == "i"){ 
    real = real.indexOf("r") == 0
    var terms = _split_terms(text)
    var result = []
    terms.each(function(el){
       if (real && !el.include_some_of$U(Complex.valid_binomial_sep))
         result.push(el)
       if (!real && el.include_some_of$U(Complex.valid_binomial_sep))
         result.push(el.replace(new RegExp("[" + Complex.valid_binomial_sep +"]", "g"), ""))
       })
    return result
  }else{
    var module = real[0] == "m"
    text = text.replace(/\s+/g, "")
    if (module)
      return text.match( /^[\d\.,]+/ )
    else{
      return text.match( new RegExp( "[" + Complex.valid_polar_sep.join("") + "](.*)$") )[1] || 0
      }
  }
}
Complex.is_valid_binomial = function (text){
  text = text.replace(/\s/g, "")
  return text.search(new RegExp( "[^"+ Complex.valid_binomial_sep.join("") + "\\d\\.,\\+-]" )) == -1 &&
         _complex_not_at_the_same_time( text, ["\\.", ","]) && 
         _complex_not_at_the_same_time(text, Complex.valid_binomial_sep)
}
Complex.is_valid_polar = function (text){
  text = text.replace(/\s/g, "").replace(/;;/g, ";")
  return text.search( new RegExp("^[\\d\.,]+[" + Complex.valid_polar_sep + "].*º?$", "g") ) != -1 &&
         _complex_not_at_the_same_time( text, ["\\.", ","]) && 
         !Complex.is_valid_binomial(text)
 }
function _append_complex_sep( term ){
  if (Complex.prefix_sep)
    return Complex.sep + term
  return term + Complex.sep
}
function _dress_img(term){
  var sign = term < 0 ? " - " : " + "
  return sign + _append_complex_sep(Math.abs(term))
}
function _split_terms(text){
  var terms = []
  text.split("+").each(function(el){ 
    el.split("-").each_with_index( function (subel, index){
      if (subel.length != 0)
        subel = (index == 0? "+" : "-" ) + subel 
      if ( (subel.search(/\d/) == -1) &&
	   subel.include_some_of$U(Complex.valid_binomial_sep) )
        subel += "1"
      terms.push(subel)
    })
  })
  return terms
}
function _complex_not_at_the_same_time(text, incompatibilities){
  var counters = {}
  for (var i=0; i<incompatibilities.length; i++)
    counters[incompatibilities[i]] = 0;
  incompatibilities.each(function(el){
        if (text.search(el) != -1)
        counters[el] = 1
      })
  var sum = 0
  for (var i=0; i<incompatibilities.length; i++)
    sum += counters[incompatibilities[i]];
  return sum < 2
}
function _$same_number(op1, op2){
  return Math.abs(op1 - op2) < Object._$NUM_ERR
}
Func.prototype.constructor = Func
function Func(formula, param){
   if (arguments[0] instanceof Func)
     return new Func(arguments[0].formula, arguments[0].param)
   if (typeof(formula) != "string")
     return null;
   this.formula = formula.replace( /\s+/g, "")
   this.param = this.sanitize_params(param)
}
Func.prototype.equals = function(model){
  if (!(model instanceof Func))
    model = new Func(model)
  return this.formula.replace(/\s+/g, "") == model.formula.replace(/\s+/g, "")
}
Func.prototype.value_of = function(){
  return this.formula
}
Func.prototype.value_in = function(param){
  var param = this.sanitize_params(param)
  var formula = this.formula
  for(var i in param){
     var rp = param[i]
     if (typeof(param[i]) === "function")
       rp = param[i]()
     if (param[i] instanceof Func)
       rp = param[i].value_in()
     formula = formula.replace( new RegExp("{" + i + "}", "g"), rp )
  }
  try{
   return eval(formula)
  } catch(err){
   return formula
  }
}
Func.prototype.set_param = function(param){
  this.param = this.sanitize_params(param)
  return this
}
Func.prototype._in = function(param){
  var that = this
  param = this.sanitize_params(param)
  return function(){
    return that.value_in(param)
  }
}
Func.prototype.sanitize_params = function(param){
    param = param || this.param || {}
    try{ param = param.plain() } catch(err){;}
    return param
}
Func.prototype.add = function(){
  var func = this
  for (var i=0; i<arguments.length; i++)
      func = new Func(func.formula + " + " + new Func(arguments[i]).formula)
  return func
}
Func.prototype.add$B = function(){
   this.formula = this.add.apply(this, arguments).formula
   return this
}
Func.prototype.sub = function(){
  var func = this
  for (var i=0; i<arguments.length; i++)
      func = new Func(func.formula + " - (" + new Func(arguments[i]).formula + ")")
  return func
}
Func.prototype.sub$B = function(){
   this.formula = this.sub.apply(this, arguments).formula
   return this
}
Func.prototype.mul = function(){
 var func = new Func( "(" + this.formula + ")" )
  for (var i=0; i<arguments.length; i++)
      func = new Func(func.formula + " * (" + new Func(arguments[i]).formula + ")")
  return func
}
Func.prototype.mul$B = function(){
   this.formula = this.mul.apply(this, arguments).formula
   return this
}
Func.prototype.div = function(){
 var func = new Func( "(" + this.formula + ")" )
  for (var i=0; i<arguments.length; i++)
      func = new Func(func.formula + " / (" + new Func(arguments[i]).formula + ")")
  return func
}
Func.prototype.div$B = function(){
   this.formula = this.div.apply(this, arguments).formula
   return this
}
Func.prototype.method_missing = function (method, obj, params){ 
    if (params && params[0] == "")
      params.shift()
    if ( Math[method] === "undefinded" || !( Math[method] instanceof Function ))
      throw "TypeError: " + obj + "." + method + "is not a function."
    if (params && (params instanceof Array) )
      for(var i=0; i<params.length; i++)
        params[i] = (eval(params[i]) instanceof Object)? eval(params[i]).value_of() : eval(params[i])
    params.unshift(this.formula.toString())
    while (params[params.length-1] == null)
       params.pop()
    return new Func(method + "(" + params.join(',') + ")")
}
 Trail.prototype.constructor = Trail
 function Trail(obj){
   obj.trail = []
   if (obj instanceof Func)
     ;
 }
Vector.prototype.constructor = Vector
function Vector() {
    var coord_temp = []
    var coordinate_system
    var that = this
    this.Coord = []
    var argument = []
    function is_valid_cs$U(cs) {
        return typeof(cs) == "string" && Vector.valid_cs.inject(true, function(el, val) {
            return el == cs || val
        })
    }
    for (var i = 0; i < arguments.length; i++)
        if (Object.prototype.toString.call(arguments[i]) !== "[object String]")
            this.Coord.push(arguments[i])
    for (var i = 0; i < arguments.length; i++)
        argument[i] = arguments[i]
    for (var i = 0; i < argument.length; i++)
        if (is_valid_cs$U(arguments[i]))
            argument.push(argument.splice(i, 1)[0])
    if (typeof(argument[argument.length - 1]) == "string")
        coordinate_system = argument[argument.length - 1]
    else
        coordinate_system = "cart"
    function transformCoordinates() {
        if (coordinate_system == "pol") {
            that.Coord[0] = coord_temp[0] * Math.cos(coord_temp[1])
            that.Coord[1] = coord_temp[0] * Math.sin(coord_temp[1])
        }
        if (coordinate_system == "cyl") {
            that.Coord[0] = coord_temp[0] * Math.cos(coord_temp[1])
            that.Coord[1] = coord_temp[0] * Math.sin(coord_temp[1])
            that.Coord[2] = coord_temp[2]
        }
        if (coordinate_system == "sph") {
            that.Coord[0] = coord_temp[0] * Math.sin(coord_temp[1]) * Math.cos(coord_temp[2])
            that.Coord[1] = coord_temp[0] * Math.sin(coord_temp[1]) * Math.sin(coord_temp[2])
            that.Coord[2] = coord_temp[0] * Math.cos(coord_temp[1])
        }
        if (coordinate_system == "cart") {
            for (i = 0; i < coord_temp.length; i++)
                that.Coord[i] = coord_temp[i]
        }
    }
    if (argument[0] instanceof Vector)
        for (var i = 0; i < argument[0].Coord.length; i++)
            this.Coord[i] = argument[0].Coord[i]
    else {
        if (typeof(argument[0]) == "number")
            for (var i = 0; i < argument.length; i++)
                if (typeof(argument[i]) == "number")
                    coord_temp[i] = argument[i]
        if (argument[0] instanceof Array)
            for (var i = 0; i < argument[0].length; i++)
                coord_temp[i] = argument[0][i]
        transformCoordinates()
    }
    this._module = Vector.prototype.module.call(this)
    this.uVector = Vector.prototype.scale.call(this, 1 / this._module)
}
Vector.is_valid_cs$U = function(cs) {
    return typeof(cs) == "string" && Vector.valid_cs.inject(true, function(el, val) {
        return el == cs || val
    })
}
Vector.prototype.has_same_dimension_as$U = function(vector_to_compare) {
    if (this.Coord.length == vector_to_compare.Coord.length)
        return true
    return false
}
Vector.prototype.standarize_coordinates = function(vector_to_compare) {
    if (this.Coord.length >= vector_to_compare.Coord.length) {
        var difference = this.Coord.length - vector_to_compare.Coord.length
        for (var i = 0; i < difference; i++) {
            vector_to_compare.Coord.push(0)
        }
    }
    if (this.Coord.length <= vector_to_compare.Coord.length) {
        var difference = vector_to_compare.Coord.length - this.Coord.length
        for (var i = 0; i < difference; i++) {
            this.Coord.push(0)
        }
    }
}
Vector.prototype.unit = function() {
    return new Vector(this.uVector || this.scale(1 / this._module))
}
Vector.prototype.parseInput = function(args) {
    var argument = []
    for (var i = 0; i < arguments.length; i++)
        argument[i] = arguments[i]
    function convertToArray() {
        var output = []
        if (argument[0] instanceof Array && argument[0][0] instanceof Vector)
            return argument[0];
        if (argument[0] instanceof Vector)
            return [argument[0]]
        if (typeof(argument[0]) == "number" || argument[0] instanceof Number) {
            for (var i = 0; i < argument.length; i++)
                output[i] = argument[i].valueOf()
            return [new Vector(output)]
        }
        if (argument[0] instanceof Array) {
            if (!(argument[0][0] instanceof Vector))
                output = [new Vector(argument[0])]
        }
        return output
    }
    var out = convertToArray()
    for (var i = 0; i < out.length; i++)
        if (out[i].Coord.length != this.Coord.length)
            throw ("Invalid vector dimension for vector " + (i + 1) + ". Got: " + out[i].Coord.length + "D. Expected: " + this.Coord.length + "D.")
    return out
}
Vector.prototype.cloneCoords = function(vectCpy) {
    for (var i = 0; i < vectCpy.Coord.length; i++)
        this.Coord[i] = vectCpy.Coord[i]
    this._module = this.module()
}
Vector.prototype.add = function(vectAdd) {
    var vectRes = [];
    function addVector(vector) {
        for (var i = 0; i < vector.Coord.length; i++) {
            if (!vectRes[i])
                vectRes[i] = 0
            vectRes[i] += vector.Coord[i]
        }
    }
    vectAdd = Vector.prototype.parseInput.apply(this, arguments)
    addVector(this)
    for (var i = 0; i < vectAdd.length; i++)
        addVector(vectAdd[i])
    return new Vector(vectRes)
}
Vector.prototype.add$B = function(vectAdd) {
    var vectRes = Vector.prototype.add.apply(this, arguments)
    this.cloneCoords(vectRes)
    return vectRes
}
Vector.prototype.subs = function(vectSubs) {
    var vectRes = [];
    for (var i = 0; i < this.Coord.length; i++)
        vectRes[i] = this.Coord[i];
    function subsVector(vector) {
        for (var i = 0; i < vector.Coord.length; i++) {
            if (!vectRes[i])
                vectRes[i] = 0
            vectRes[i] -= vector.Coord[i]
        }
    }
    vectSubs = Vector.prototype.parseInput.apply(this, arguments)
    for (var i = 0; i < vectSubs.length; i++)
        subsVector(vectSubs[i])
    return new Vector(vectRes)
}
Vector.prototype.subs$B = function(vectSubs) {
    var vectRes = Vector.prototype.subs.apply(this, arguments)
    this.cloneCoords(vectRes)
    return vectRes
}
Vector.prototype.dot = function(vectors) {
    var dt = 0
    var vectors = Vector.prototype.parseInput.apply(this, arguments)
    vectors.push(new Vector(this.Coord))
    if (vectors.length >= 2)
        for (var cor = 0; cor < vectors[0].Coord.length; cor++) {
            var aux = 1
            for (var v = 0; v < vectors.length; v++)
                aux *= (vectors[v].Coord[cor] || 0)
            dt += aux
        } else
            throw "There must be at least two vectors for the scalar product"
    return dt
}
function _simple_cross(vector1, vectorArray) {
    var vector2 = vectorArray.shift()
    var vectAux = new Vector(vector1.Coord[1] * vector2.Coord[2] - vector1.Coord[2] * vector2.Coord[1],
        vector1.Coord[2] * vector2.Coord[0] - vector1.Coord[0] * vector2.Coord[2],
        vector1.Coord[0] * vector2.Coord[1] - vector1.Coord[1] * vector2.Coord[0])
    if (vectorArray.length == 0)
        return vectAux
    return _simple_cross(vectAux, vectorArray)
}
Vector.prototype.cross = function(vectors) {
    vectCross = Vector.prototype.parseInput.apply(this, arguments)
    vectCross.push(new Vector(this.Coord))
    if (vectCross.length < 2)
        throw "At least one operand needed in cross product."
    return _simple_cross(vectCross.shift(), vectCross)
}
function _simple_cross$B(vector1, vectorArray) {
    var vector2 = vectorArray.shift()
    var vectAux = new Vector(vector1.Coord[1] * vector2.Coord[2] - vector1.Coord[2] * vector2.Coord[1],
        vector1.Coord[2] * vector2.Coord[0] - vector1.Coord[0] * vector2.Coord[2],
        vector1.Coord[0] * vector2.Coord[1] - vector1.Coord[1] * vector2.Coord[0])
    if (vectorArray.lenth == 0) {
        for (var i = 0; i < vectAux.Coord.length; i++)
            this.Coord[i] = vecAux.Coord[i]
        return vectAux
    }
    return _simple_cross(vectAux, vectorArray)
}
Vector.prototype.cross$B = function(vectors) {
    vectCross$B = Vector.prototype.parseInput.apply(this, arguments)
    vectCross$B.push(new Vector(this.Coord))
    if (vectCross$B.length < 2)
        throw "At least one operand needed in cross product."
    return _simple_cross$B(vectCross & B.shift(), vectCross$B)
}
Vector.prototype.dCross = function(vector1, vector2, vector3) {
    var vectorAux = new Array();
    vectorAux = cross(vector1, vector2);
    vectorAux = cross(this.vectorAux, vector3);
    return vectorAux;
}
Vector.prototype.dCross$B = function(vector1, vector2, vector3) {
    var vectorAux = new Array();
    vectorAux = cross(vector1, vector2);
    vectorAux = cross(this.vectorAux, vector3);
    return vectorAux;
}
Vector.prototype.scale = function(number) {
    var sc = []
    for (var i = 0; i < this.Coord.length; i++)
        sc[i] = this.Coord[i] * number
    return sc
}
Vector.prototype.scale$B = function(vector, number) {
    for (var i = 0; i < this.Coord.length; i++)
        vector.Coord[i] = vector.Coord[i] * number
    return vector
}
Vector.prototype.projection = function(vector1) {
    if (vector1.lentgh < 1 && this.length < 1)
        throw "Invalid vector dimension"
    if (vector1.length != this.length && this.length < 1)
        throw "Lengths of vectors are different"
    else
        return new Vector(vector1.scale(this.dot(vector1) / vector1.dot(vector1)))
}
Vector.prototype.projection$B = function(vector1) {
    vectProject = this.projection(vector1)
    for (var i = 0; i < vectProject.length; i++)
        this.Coord[i] += vectProject[i]
    return this
}
Vector.prototype.linearCombination$U = function(vectorSet) {
    var norm = Matrix.normalize(vectorSet)
    var nz = 0 
    var li = true; 
    for (var i = 0; i < norm.length && li; i++) {
        for (var j = 0; j < norm[i].length; j++)
            if (norm[i][j] == 0)
                nz++
                if (nz == norm[i].length)
                    li = false
    }
    return li
}
Vector.prototype.box = function(vectors) {
    if ((vectors.length >= 3) &&
        (typeof(vectors[0]) == Array) &&
        (vectors[0].length == 3) &&
        (typeof(vectors[1]) == Array) &&
        (typeof(vectors[2]) == Array) &&
        (vectors[0].length == vectors[1].length) &&
        (vectors[1].length == vectors[2].length)) {
        return vectors[0][0] * vectors[1][1] * vectors[2][2] +
            vectors[1][0] * vectors[2][1] * vectors[0][2] +
            vectors[0][1] * vectors[1][2] * vectors[2][0] -
            vectors[0][2] * vectors[1][1] * vectors[2][0] -
            vectors[1][2] * vectors[2][1] * vectors[0][0] -
            vectors[2][2] * vectors[1][0] * vectors[0][1]
    }
    return undefined
}
Vector.prototype.coplanar$U = function(vector) {
    switch (vector.length) {
        case 0:
            return undefined
        case 1:
        case 2:
            return true
    }
    var dim = vector[0].length
    for (var i = 1; i < vector.length; i++)
        if (dim != vector[i].length)
            throw "Invalid dimensions"
    for (var i = 2; i < vector.length; i++)
        if (Vector.box(vector[0], vector[1], vector[i]))
            return false
    return true
}
Vector.prototype.angle = function() {
    v1 = new Vector(1, 1, 1)
    Vector.apply(v1, arguments) 
    if (v1.Coord.length == this.Coord.length)
        if (this.Coord.length == 2) {
            var angle2 = Math.acos(v1.Coord[0] / v1.module()) 
            var angle1 = Math.acos(this.Coord[0] / this.module()) 
            return angle2 - angle1
        } else
            return Math.acos(this.dot(v1) / this.module() / v1.module())
    else
        throw "Invalid Input, angle() method needs/recives a vector of dimension " + this.Coord.length + "."
}
Vector.prototype.module = function() {
    var suma = 0
    for (var i = 0; i < this.Coord.length; i++)
        suma += this.Coord[i] * this.Coord[i]
    return Math.sqrt(suma)
}
Vector.prototype.toCylindrical = function() {
    coords = []
    v2 = new Vector(this.Coord[0], this.Coord[1])
    coords[0] = Math.sqrt(pow(this.Coord[0], 2) + Math.pow(this.Coord[1], 2))
    coords[1] = Math.atan2(this.Coord[1] / this.Coord[0])
    coords[2] = this.Coord[2]
    return coords
}
Vector.prototype.toSpherical = function() {
    coords = []
    v2 = new Vector(this.Coord[0], this.Coord[1], this.Coord[2])
    coords[0] = Math.sqrt(Math.pow(this.Coord[0], 2) + Math.pow(this.Coord[1], 2) + Math.pow(this.Coord[2], 2))
    coords[1] = Math.acos(this.Coord[2] / coords[0])
    coords[2] = Math.acos(this.Coord[0] / (coords[0] * Math.sin(coords[1])))
    return coords
}
Vector.prototype.torque = function(point, vect) {
    return cross(subs(vect.origin, point), vect);
}
Vector.prototype.value_of = function() {
    return this.Coord
}
Vector.prototype.get_coord = function() {
    if (arguments.length == 0) 
        return this.value_of()
    if (arguments[0] > this.length)
        return null
    if (arguments[0] >= 'a' && arguments[0] <= 'z' || arguments[0] >= 'A' && arguments[0] <= 'Z') {
        var pos = arguments[0] >= 'a' && arguments[0] <= 'z' ? arguments[0].charCodeAt(0) - "z".charCodeAt(0) + (this.Coord.length - 1) : arguments[0].charCodeAt(0) - "Z".charCodeAt(0) + (this.Coord.length - 1)
        return this.Coord[pos]
    }
    return this.Coord[arguments[0]] || 0
}
Vector.prototype.eql$U = function(model) {
    model = new Vector(model)
    return model.Coord.eql$U(this.Coord)
}
Vector.valid_cs = ["pol", "cart", "cyl", "sph"]
Vector.prototype.get = function(coordinate) {
    return this.Coord[coordinate] || 0
}
Vector.prototype.is_equal_to$U = function(vec) {
    var r_eq = 0
    if (this.Coord.length == vec.Coord.length) {
        for (var i = 0; i < this.Coord.length; i++)
            if (this.Coord[i] == vec.Coord[i])
                r_eq++
                else
                    r_eq--
                    if (r_eq == this.Coord.length)
                        return true
                    else
                        return false
    } else
        return false
}
Vector.prototype._ = Vector.prototype.get
Vector.prototype.constructor = Vector;
Vector.add = function(){
  return argument.shift.add(argument)
}
  Vector.add = function(vectAdd){
	var vectRes = [];
	alert(arguments)
	for (var i=0; i< vectAdd[0].length; i++)
		vectRes[i] = 0;
	for (var i=0; i<vectAdd[i].length; i++){
		for (var j=0; j<vectAdd[j].length; j++){		    
			vectRes[j] += vectAdd[i][j]
			alert(vectRes)
			}
     }
	return vectRes
 }
 Vector.subs = function(vectSubs){
	var vectRes = [];
	for (var i=0; i< vectSubs[0].length; i++)
		vectRes[i] = 0;
	for (var i=0; i<vectSubs[i].length; i++)
		for (var j=0; j<vectSubs[j].length; j++)
			vectRes[j] -= vectSubs[i][j]
	return vectRes
 }
 Vector.dot = function(vectors){
	if ((vectors.length >= 2) && 
		(typeof (vectors[0]) == Array) && 
		(typeof (vectors[1]) == Array) &&
		(vectors[0].length == vectors[1].length)){
		var dt = 0
		for (var i=0; i<vectors[0].length; i++)
			dt += vectors[0][i] * vectors[1][i]
		return dt
	}
	return undefined			
}
Vector.cross = function(vectors){	
	if ((vectors.length >= 2) && 
		(typeof (vectors[0]) == Array) && 
		(typeof (vectors[1]) == Array) &&
		(vectors[0].length == vectors[1].length)){
		var cross = [ 	[vectors[0][1] * vectors[1][2] - vectors[0][2] * vectors[1][1]],
						[vectors[0][2] * vectors[1][0] - vectors[0][0] * vectors[1][2]],
						[vectors[0][0] * vectors[1][1] - vectors[0][1] * vectors[1][0]]]
		return cross
	}
	return undefined			
}
Vector.dCross = function(vector1, vector2, vector3){
	var vectorAux = new Array();
	vectorAux = cross(vector1, vector2);
	vectorAux = cross(this.vectorAux, vector3);
	return vectorAux;
}
Vector.scale = function(vector, number){
 	var sc = []
	if ((typeof(vector) == Number) && (typeof(number) == Vector)){
		var aux = number
		number  = vector
		vector  = aux
	}
	if (typeof(vector) == Array)
		for (var i=0; i<vector.length; i++)
			sc[i] = vector[i] * number
	else sc = vector * number
	return sc	
 }
 Vector.projection = function(vector1, vector2){
	var resultVect = new Array();
	var dt1 = 0
	var dt2 = 0
	var vectors= new Array(2);
	vectors[0]= verctor1;
	vectors[1]= vector2;
	this.dt1 = Vector.prototype.dot (vectors)
	var dt2 = 0
	for (var i=0; i<vectors[1].length; i++)
		this.dt2 += vectors[1][i] * vectors[1][i]
	var ortoResult = dt1/dt2
	for (var i=0; i<vectors[0].length; i++)
	this.resultVect[i]= (vectors[1][i] * ortoResult)
	return this.resultVect;				
}
Vector.linearCombination$U = function(vectorSet){
	var norm = Matrix.normalize(vectorSet)
	var nz = 0		
	var li = true;	
	for (var i = 0; i < norm.length && li; i++) {
		for (var j = 0; j < norm[i].length; j++) 
			if (norm[i][j] == 0) 
				nz++
		if (nz == norm[i].length)
			li = false
	}
	return li;	
}
Vector.box = function(vectors){
	if ((vectors.length >= 3) &&
	(typeof(vectors[0]) == Array) &&
	(vectors[0].length == 3) &&
	(typeof(vectors[1]) == Array) &&
	(typeof(vectors[2]) == Array) &&
	(vectors[0].length == vectors[1].length) &&
	(vectors[1].length == vectors[2].length)) {
		return vectors[0][0] * vectors[1][1] * vectors[2][2] +
		vectors[1][0] * vectors[2][1] * vectors[0][2] +
		vectors[0][1] * vectors[1][2] * vectors[2][0] -
		vectors[0][2] * vectors[1][1] * vectors[2][0] -
		vectors[1][2] * vectors[2][1] * vectors[0][0] -
		vectors[2][2] * vectors[1][0] * vectors[0][1]
	}
	return undefined
}
Vector.coplanar$U = function(vector){
	switch (vector.length) {
		case 0:
			return undefined
		case 1:
		case 2:
			return true
	}
	var dim = vector[0].length
	for (var i = 1; i < vector.length; i++) 
		if (dim != vector[i].length) 
			throw "Invalid dimensions"
	for (var i = 2; i < vector.length; i++) 
		if (Vector.box(vector[0], vector[1], vector[i])) 
			return false
	return true
}
Vector.angle = function(vectors){
	var arc
	if ((vectors.length >= 3) && (typeof(vectors[0]) == Array) )
	 	arc = arcos (dot (u/module(u)), (v/module(v)))
	return arc
}
Vector.module = function(vectModule){
 	var suma
	if (typeof(vectModule) == Array )	
 		for (var i = 0; i < vectModule.length; i++)
 	 		suma += vectModule[i] * vectModule[i]
	else
	    for (var i = 0; i < vectModule.length; i++)
 	 		suma += vectModule.Coord[i] * vectModule.Coord[i]
	return Math.sqrt(suma)
 }
 Vector.toCylindrical = function(vectors){
	var i
	for (i=0; i<vectors.length; i++)
		if ((vectors[i].length <= 3) && typeof(vectors == Array)){
			vectors[i][0] = Math.sqrt((vectors[i][0]*vectors[i][0])+(vectors[i][1]*vectors[1]))
			vectors[i][1] = arctg (vectors[i][1]/vectors[i][0])
		}
	if ((vectors.length >= 3) && typeof(vectors == Array)) {
		vectors[0] = Math.sqrt((vectors[0] * vectors[0]) + (vectors[1] * vectors[1]))
		vectors[1] = arctg(vectors[1] / vectors[0])
	}
	return vectors
}
Vector.prototype.torque = function (point, vect){
	return cross(subs(vect.origin, point), vect);
}
	Vector.scale = function(vector, number){
		var sc = []
		if (typeof(vector) == Number) {
			var aux = number
			number = vector
			vector = aux
		}
		if (typeof(vector) == Array) 
			for (var i = 0; i < vector.length; i++) 
				sc[i] = vector[i] * number
		else 
			for (var i = 0; i < vector.Coord.length; i++) 
				sc[i] = vector.Coord[i] * number
		return sc
	}
	Vector.prototype.scale$B = function(vector, number){
		if (typeof(vector) == Number) {
			var aux = number
			number = vector
			vector = aux
		}
		if (typeof(vector) == Array) 
			for (var i = 0; i < vector.length; i++) 
				vector[i] = vector[i] * number
		else 
			for (var i = 0; i < vector.Coord.length; i++) 
				vector.Coord[i] = vector.Coord[i] * number
		return vector
	}
Vector.angle  = function(vectors){
    var arc
    if ((vectors.length >= 3) && (typeof(vectors[0]) == Array)) 
        arc = arcos(dot(u / module(u)), (v / module(v)))
    return arc
}
Vector.toCylindrical = function(vectors){
    var i
    for (i = 0; i < vectors.length; i++) 
        if ((vectors[i].length <= 3) && typeof(vectors == Array)) {
            vectors[i][0] = Math.sqrt((vectors[i][0] * vectors[i][0]) + (vectors[i][1] * vectors[1]))
            vectors[i][1] = arctg(vectors[i][1] / vectors[i][0])
        }
    if ((vectors.length >= 3) && typeof(vectors == Array)) {
        vectors[0] = Math.sqrt((vectors[0] * vectors[0]) + (vectors[1] * vectors[1]))
        vectors[1] = arctg(vectors[1] / vectors[0])
    }
    return vectors
}
FixedVector.prototype = new Vector
FixedVector.prototype.constructor = FixedVector
FixedVector.super = Vector
function FixedVector(input) {
    var that = this
    if (!input)
        input = []
    var is_head = false
    var free_vector
    this.foot = new Vector()
    function check_arg(arg) {
        if (arg instanceof String || typeof(arg) === "string")
            is_head = arg
        if (arg instanceof Array)
            if (typeof(arg[0]) === "number")
                if (!free_vector)
                    free_vector = new Vector(arg)
                else
                    that.foot = new Vector(arg)
        else
            for (var i = 0; i < arg.length; i++)
                check_arg(arg[i])
        if (arg instanceof Vector)
            if (!free_vector)
                free_vector = arg
            else
                that.foot = arg
        if (arg instanceof FixedVector) {
            Vector.call(that, arg)
            Vector.call(that.foot, new Vector(arg.foot))
        }
    }
    for (var i = 0; i < arguments.length; i++)
        check_arg(arguments[i])
    free_vector = free_vector || new Vector(0, 0)
    this.foot = this.foot || new Vector(0, 0)
    this.foot.standarize_coordinates(free_vector)
    if (is_head)
        free_vector = free_vector.subs(this.foot)
    Object.defineProperty(this, "_head", {
        value: this.foot.add(free_vector),
        enumerable: false
    })
    Vector.call(this, free_vector)
}
FixedVector.prototype.eql$U = function(vector_to_compare) {
    if (this.foot.eql$U(vector_to_compare.foot) && this.Coord.eql$U(vector_to_compare.Coord))
        return true
    return false
}
FixedVector.prototype.add = function(vec) {
    var that = this
    var first_time = true
    var checks = false
    var new_free
    function checkVec(vect) {
        if (that._head.Coord.eql$U(vect.foot.Coord)) {
            checks = true
        } else {
            checks = false
            throw ("Invalid operation for fixed vectors." +
                " First vector head must be equal to second's foot")
        }
        that = vect
    }
    vec = Vector.prototype.parseInput.apply(this, arguments)
    for (var i = 0; i < vec.length; i++)
        checkVec(vec[i])
    if (checks)
        new_free = vec[vec.length - 1]._head.subs(this.foot)
    return new FixedVector(new_free, this.foot)
}
FixedVector.prototype.subs = function(vec) {
    var new_free, new_foot
    vec = Vector.prototype.parseInput.apply(this, arguments)
    new_foot = this._head
    new_free = vec[vec.length - 1]._head.subs(this._head)
    return new FixedVector(new_free, new_foot)
}
FixedVector.prototype.scle = function(number) { 
    scalable = new Vector(this.Coord)
    scalable = scalable.scale(number)
    fv_foot = this.foot.scale(number)
    return new FixedVector(scalable, fv_foot)
}
FixedVector.prototype.virial = function() {
    var new_free, virial
    new_free = new Vector(this.Coord)
    virial = new_free.dot(this.foot)
    return virial
}
FixedVector.prototype.planar_momentum = function(plane_pt) {
    var vector_r = new FixedVector(this.foot, plane_pt.foot)
    var unitary = plane_pt.unit()
    var vec_module = this.module()
    var res = vector_r.cross(unitary).scale(vec_module)
    return res
}
require("vector")
function ReferenceFrame(drift, trihedron_components){
   this.drift = drift
   this.transformation_matrix = trihedron_components
}
ReferenceFrame.prototype.coord_of = function (point){
}
function bring_lluvia() {
    function init_program() {
        if (typeof required_packages == 'function')
            required_packages()
        PackageManager.download(main)
    }
    function load_dependencies() {
        if (typeof $K_app_dependencies != 'undefined') {
            var app_path = location.pathname.replace(/\/[^\/]*\.html?/, '')
            var app_rel_path = '/javascript/'
            var app_package = new PackageManager(app_path + app_rel_path)
            app_package.create_catalog($K_app_dependencies)
            for (var i = 0; i < $K_app_dependencies.files.length; i++) {
                if (i != $K_app_dependencies.files.length - 1)
                    PackageManager.include_script(app_path + app_rel_path + $K_app_dependencies.path + $K_app_dependencies.files[i].name)
                else {
                    PackageManager.include_script(app_path + app_rel_path + $K_app_dependencies.path + $K_app_dependencies.files[i].name, init_program)
                }
            }
        } else {
            init_program()
        }
    }
    function load_packages() {
        var p = new PackageManager('/home/txema/work/lluvia-Project/util/compress-core/../..')
        p.create_catalog($K_script_response, load_dependencies)
    }
    PackageManager.include_script('../../dist/catalog.js', load_packages)
}
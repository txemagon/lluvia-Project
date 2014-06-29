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
	this.y = coordY;
}

Point.prototype.multiply = function (amount){
	this.x *= amount;
	this.y *= amount;
}

Point.prototype.divide = function (amount){
	this.x /= amount;
	this.y /= amount;
}

rectangle.prototype.constructor = rectangle;


function rectangle(coord,dimen){
	this.x0 = coord.x;
	this.y0 = coord.y;
	this.x1 = this.x0 + dimen.x;
	this.y1 = this.y0 + dimen.y;
}


rectangle.prototype.getRectDimen = function(){
			return new Point(this.x1 - this.x0, this.y1 - this.y0);
} 


rectangle.prototype.getRectCoord = function(){

	return new Point(this.x0, this.y0);
}


rectangle.prototype.displace = function (despl){
	this.x0 += despl.x;
	this.y0 += despl.y;
	this.x1 += despl.x;
	this.y1 += despl.y;
}


rectangle.prototype.elarge = function (despl){
	this.x1 += despl.x;
	this.y1 += despl.y;
}Continue.prototype.constructor = Continue;


function Continue(magnitude){
	this.magnitude0 = new magnitude.constructor(magnitude);
	this.magnitude  = new magnitude.constructor(magnitude);
}


Continue.prototype.set = function (magnitude){
	this.magnitude0 = this.magnitude;
	this.magnitude  = new magnitude.constructor(magnitude);
}


Continue.prototype.clone = function(){
	var copy = new Continue(this.magnitude);
	copy.magnitude0 = this.magnitude0;
	return copy;	
}


Continue.prototype.derive = function(regard){
	var derived = this.clone().magnitude;
	var prp = new Array();
	for (var j in regard.magnitude)
		prp.push(j);
	for (var i in derived)
		try{
			derived[i] = (this.magnitude[i] - this.magnitude0[i]) / (regard.magnitude[prp[0]] - regard.magnitude0[prp[0]]);
		} catch (error) {
			alert("The derivative is infinite: " + error.toString());	
		}
	return derived;
}


Continue.prototype.differential = function (regard){
	var differential = this.clone().magnitude;
	var prp = new Array();
	for (var j in regard.magnitude)
		prp.push(j);
	for (var i in differential)
			differential[i] = this.magnitude[i] * (regard.magnitude[prp[0]] - regard.magnitude0[prp[0]]);
		
	return differential;
}


Continue.prototype.integrate = function(amount){
	var newValue = this.clone().magnitude;
	for( var i in newValue)
		newValue[i] += amount[i];	
	this.magnitude = newValue;
}

Time.prototype.constructor = Time;


function Time(t){
	if ((arguments.length == 1) && (arguments[0] instanceof Time)){
		this.date = arguments[0].date;
		return this;
	}
	this.date = t;
}


Mobile.prototype.constructor = Mobile;


function Mobile(position, velocity, acceleration, time){
	this.position     = new Continue(position);
	this.velocity     = new Continue(velocity);
	this.acceletation = new Continue(acceleration);
	this.moment       = new Continue(time);
}



Mobile.prototype.update = function(moment){
	var i = this.moment.clone();
	delete i;
	this.moment.set(moment);
	this.velocity.moment(this.acceleration.differential(this.moment));
	this.position.moment(this.velocity.differential(this.moment));
}

SystemDamped.prototype.constructor = SystemDamped;

function SystemDamped(rigidity, damping, mass, initialPosition, anchorage){
	this.rigideity = rigidity;
	this.damping   = damping;
	this.mass      = mass;
	this.position  = new Mobile(initialPosition, new Point(0,0), new Point(0,0), new Point(0,0));
	this.anchorage = new Mobile(anchorage, new Point(0,0), new Point(0,0), new Point(0,0));
}

SystemDamped.prototype.update = function(moment){
	var Frx = - this.rigidity * (this.position.positcion.magnitude.x - this.anchorage.position.magnitude.x);
	var Fry = - this.rigidity * (this.position.position.magnitude.y - this.anchorage.position.magnitude.y);
	var Fvx = - this.damping / this.mass * this.position.velocity.magnitude.x;
	var Fvy = - this.damping / this.mass * this.position.velocity.magnitude.y;
	this.position.acceleration.set(new Point((Frx+ Fvx) / this.mass, (Fry + Fvy)/this.mass));
	this.position.update(moment);
}





// Conflicts with ECMAScript 5
// if (typeof Object.extend !== 'function') {
//     Object.extend = function (o) {
// 	function $F() {}
// 	$F.prototype = o;
// 	return new $F();
//     };
// }


Object.prototype.to_a = function() {
    return [this]
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

// Object.prototype.eql$U = function(model){
//     return this.equals(model)
// }


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
    //todo: Provide camel case getter and setters
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

                //this.clear()
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
    "keys", "self_keys", "respond_to", "respond_to$U",
    "soft_merge", "soft_merge$B", "override", "override$B",
    "method_missing", "stop_enumerating"
])

Object.stop_enumerating("reflect")


// remove value property. Now is widely used by Harmony.

Object.defineProperty(Object.prototype, "value", {
    value: function() {
        return this.value_of()
    },
    enumerable: false
})

Number.ERROR = 0.00001

Number.eql$U = function(model, value){
   if (typeof(model) === "number")
     return (model > (value - Number.ERROR)) && (model < (value + Number.ERROR))
   return this == model
}

isNumber = is_number = is_a_number = isANumber = isNumber$U = is_number$U = is_a_number$U = isANumber$U = function(op){ return !isNaN(op) }


Function.prototype.bind = function(object){
	var f = this
	return function(){ f.apply(object, arguments) }
}

Function.prototype.bind_params = function(){
	var args = arguments
	var f = this
	return function(){ f.apply(f, args) }
}

Function.prototype.yield = function(){
     for (var i=this.arguments.length-1; i>=0; i--)
        if (typeof(this.arguments[i]) === "function")
            return this.arguments[i].apply(this, arguments)
}

Function.prototype.block_given$U = function(){
     var given = false
     for (var i=this.arguments.length-1; !given && i>=0; i--)
        if (typeof(this.arguments[i]) === "function")
           given = this.arguments[i]
     return given
}


Function.prototype.deconstruct = function(){
  return { name: this.name,
           params: this.toSource().match(/function[^\(]*\(([^)]*)\)/)[1].split(","),
           body: this.toSource().match(/{(.*)}/)[1]
           }
}

Function.deconstruct = function(src){
  return { name: src.match(/function\s+([^\(]+)/)[1],
           params: src.match(/function[^\(]*\(([^)]*)\)/)[1].split(","),
           body: src.match(/{(.*)}/)[1]
           }
}











Function.prototype.extend = function(superclass, args){
  var that = this

  var s = new superclass()
  s.keys().each( function(k) {
       if (typeof(that.prototype[k]) == "undefined")
         that.prototype[k] = s[k];
     } )

  superclass.keys().each( function(k) {
       that.prototype[k] = superclass[k];
     } )

  if ( this.Class && this.Class.before_extended && ( typeof(this.Class.before_extended) == "function" ) )
    this.super.Class.before_extended.apply(this, args)

  if ( this.Class && this.Class.after_extended && ( typeof(this.Class.after_extended) == "function" ) )
    this.super.Class.after_extended(this)

}



Function.prototype.reflect = function(){
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




String.prototype.capitalize = function(){
    word = this.toLowerCase()
    return word.replace(word[0], word[0].toUpperCase())
}


String.prototype.humanize = function(){
    var word = this.strip()
    var first = word[0]
    word = word.substring(1).replace(/_+/g, " ").replace(/([A-Z])/g, " $1" ).replace(/\s+/g, " ")
    to_lower = word.downcase()
    return first + (to_lower? to_lower: word)
}



String.prototype.underscore = function(){

    return this.humanize().replace(/\s+_*/g, "_")
}


String.prototype.camel_case = function(){
    var sentence = ""
    var first = this.strip()[0]
    this.strip().split(/[\s_]+/g ).each(function(word){
	sentence += word[0].toUpperCase()
	sentence += word.substring(1)
    })

    return first + sentence.substring(1)
}


String.prototype.class_name = function(){
    var sentence = ""
    var first = this.strip()[0]
    this.strip().split(/[\s_]+/g ).each(function(word){
	sentence += word[0].toUpperCase()
	sentence += word.substring(1)
    })

    return first.toUpperCase() + sentence.substring(1)
}


String.prototype.index = function(){
    if (arguments.length == 0 || arguments.length > 2)
	//throw ("wrong number of arguments")
	return null
	var pos
	var str = arguments[0].toString()
	if (arguments.length > 1){
	    pos = this.normalize_index(arguments[1])
	    if(pos == null)
		return pos
	    var find = this.substr(pos, this.length - pos)
	}
	if (str[0] == '/' && str[str.length-1] == '/' && str[1] == '[' && str[str.length-2] == ']'){
	    var min = this.length
	    var entradoAlMenosUnaVez = false
	    for(var i=2;i<str.length - 2; i++)
	    if (min >= find.search(str[i]) && find.search(str[i]) >= 0){
		min = find.search(str[i])+pos
		entradoAlMenosUnaVez = true
	    }
	    return min >= 0 && entradoAlMenosUnaVez? min : null
	}
	return this.indexOf(arguments[0]) < 0? null : this.indexOf(arguments[0])
	// todo: Falta que funcione al pasar por parametros
	// ? y una letra, ya que da error de sintaxis
}


String.prototype.normalize_index = function(){
    if (typeof(arguments[0]) === "number")
	if (arguments[0] < 0? Math.abs(arguments[0]) <= this.length : Math.abs(arguments[0]) <= this.length - 1)
	    return arguments[0] < 0? arguments[0] + this.length : arguments[0]
    return null
}


String.prototype.insert = function(){
    if (arguments.length == 0 || arguments.length > 2)
	//throw ("wrong number of arguments")
	return null
	if (arguments[0] == this.length)
	    return this + arguments[1]
	else if (arguments[0] == -(this.length + 1))
	    return arguments[1] + this
	var pos = arguments[0] >= 0? this.normalize_index(arguments[0]) : this.normalize_index(arguments[0]) + 1
	if (this.normalize_index(arguments[0]) == null)
	    return null
	//throw("index out of string")
	var str = ""
	for(var i=0;i<=this.length;i++)
	if(i == pos){
	    str = str + arguments[1]
	    var add = true
	}
	else if(!i==0 && add)
	    str = str + this[i - 1]
	else
	    str = str + this[i]
	return str
}


String.prototype.ljust = function(){
    var str = this
    var j = 0
    for(var i = 0; i < (arguments[0] - this.length); i++)
    if (arguments.length > 1 && arguments[1].length > 1)
	str = str + arguments[1][i % arguments[1].length]
    else if (arguments.length > 1)
	str = str + arguments[1]
    else
	str = str + " "
    return str
}


String.prototype.lstrip = function(){
    return this.replace(/^\s+/g,"")
}


String.prototype.swapcase= function(){
    var str = []
    for(var i = 0; i < this.length;i++){
	if ((this[i].charCodeAt(0) > 64) && (this[i].charCodeAt(0) < 97)){
	    str[i] = this[i].toLowerCase()
	}
	else{
	    str[i] = this[i].toUpperCase()
	}
    }
    var word = str.join("")
    return word
}


String.prototype.empty$U = function(){
    if(arguments.length > 0)
	//throw ("wrong number of arguments. This function not needs arguments")
	return null
	return this.length>0? false : true
}


String.prototype.downcase = function(){
    return this.toLowerCase() == this? null : this.toLowerCase()
}


String.prototype.casecmp = function(){

    if (arguments.length < 1)
	throw("ArgumentError: Wrong number of arguments")
    var str1 = this.toLowerCase()
    var str2 = arguments[0].toLowerCase()
    return ( ( str1 == str2 ) ? 0 : ( ( str1 > str2 ) ? 1 : -1 ) );

}


String.prototype.ord = function(){
    return this.charCodeAt(0)
}


String.prototype.oct = function(){
    oct = this.match( /^[(-7)-7]+/)
    oct= oct || ["0"]
    return parseInt(oct[0], 8)
}


String.prototype.reverse = function(){
    return this.split("").reverse().join("")
}


String.prototype.include$U = function(){
    return (this.lastIndexOf(arguments[0]) > -1)? true : false
}


// Can receive comma-separated strings or an array
String.prototype.include_some_of$U = function(
){
    var included = false
    for (var i=0; i<arguments.length; i++){
	if (typeof(arguments[i]) == "string")
	    included = included || this.include$U(arguments[i])
	if (arguments[i] instanceof Array)
	    included = included || String.prototype.include_some_of$U.apply(this, arguments[i])
    }
    return included
}


String.prototype.rindex = function(search){
    if (arguments.length == 0)
	return null
    return (this.lastIndexOf(search) > 0)? this.lastIndexOf(search) : false
}


String.prototype.center = function(length, padding){
    if (arguments.length == 0 || arguments.length > 2)
	throw("wrong number arguments")
    if (this.length >= length)
	return this
    var str = ""
    var i = 0
    var j = 0
    while(i<=(length - this.length)){
	if (i == (length-this.length) / 2){
	    j = 0
	    str += this
	}
	else if (arguments.length > 1){
	    str += padding.length == 1? padding : padding[j]
	    j = (j+1) % padding.length
	}
	else
	    str += " "
	i++
    }
	return str
}


String.prototype.chomp = function(){
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


String.prototype.chop = function(){
    if (arguments.length > 0)
	//     throw("wrong number of arguments")
	return null
	var str = this.chomp()
	if (str.length == this.length)
	    return str.slice(0,this.length-1)
	return str
}


String.prototype.hex = function(){
    if (this.search("0x") == 0)
	return parseInt(this)
    return isNaN(parseInt(this,16))? 0 : parseInt(this,16)
}


String.prototype.chr = function(){
    if (this.length > 1)
	return this[0]
    return this
}


String.prototype.rjust = function(){
    alert("okk");
    if (this.length >= arguments[0])
	return this
    var str = ""
    var i = 0
    while(i<(arguments[0] - this.length)){
	if (arguments.length > 1){
	    str += arguments[1].length == 1? arguments[1] : arguments[1][i%arguments[1].length]
	}
	else
	    str += " "
	i++
    }
	return str+this
}


String.prototype.succ = function(){
    var str = ""
    var i
    var vuelta = true
    for(i=this.length-1;i>=0 && vuelta;i--){
	if (this[i] == '>' || this[i] == '<')
	    str = this[i] + str
	else if(this[i]=='z' || this[i]=='Z')
	    str = (this[i]=='z'? 'a':'A') + str
	else if(this[i] == '9')
	    str = '0' + str
	else
	    str = String.fromCharCode(this[i].charCodeAt()+1) + str
	vuelta =this[i] == 'z' || this[i] == 'Z' || this[i]=='9' || this[i]=='<' || this[i]=='>'
    }
    if (this[0] == '<' && i < 0 && (this[2] == 'z' || this[2] == 'Z'))
	return "<<" + str[2] + str.substr(2,str.length-2)
    else if (this[0] == '<' && i < 0 && this[2] == '9')
	return "<<" + str[2].succ() + str.substr(2,str.length-2)
    return i < 0 && (this[0]=='z' || this[0]=='Z')? str[0] + str : i < 0 && this[0] == '9'? str[0].succ() + str : this.substr(0,i+1)+str
}


String.prototype.next = function(){
    return this.succ.apply(this,arguments)
}


String.prototype.to_i = function() {
    var base = 10 //Base por defecto
    var result = 0 //Resultado por defecto

    //Exception
    if(arguments.length > 1)
	//throw ("wrong number of arguments. to_i( [base: 2 ... 36]) ")
	return null

	if(arguments.length != 0)
	    if(isNaN(arguments[0]) || (arguments[0] < 2) || (arguments[0] > 36))
		//throw ("Invalid argument for base (2 - 36)")
		return null
		else base = arguments[0]

		    return isNaN( parseInt(this,base) )? 0 : parseInt(this,base)
}


String.prototype.to_f = function() {
    //Exception
    if(arguments.length > 0)
	//throw ("This function doesn't need arguments")
	return null

	return isNaN(parseFloat(this))? 0.0 : parseFloat(this) ;
}


String.prototype.strip = function() {
    return this.lstrip().rstrip()
}


String.prototype.setbyte = function(position, ascii){
    var that = this.split("")
    if(arguments[0] < that.length)
	that[arguments[0]] = String.fromCharCode(arguments[1])
    else
	//throw("Wrong index")
	return null
	str = ""
	for(var i = 0; i < that.length; i++)
	str += that[i]
	return str
}


String.prototype.partition = function(){
    var ary = [3]
    var str = arguments[0].toString()
    var pos = this.search(arguments[0])
    if (pos < 0)
	ary = [this.substr(0,this.length), "", ""]
    else if (str[0] == '/' && str[str.length-1] == '/')
	ary = [this.substr(0, pos), this.substr(pos,str.length-2),this.substr(pos+str.length - 2,this.length-pos)]
    else
	ary = [this.substr(0, pos), this.substr(pos,str.length),this.substr(pos+str.length,this.length-pos)]
    return ary
}


String.prototype.rstrip = function(){
    return this.replace(/\s+$/g,'')
}


String.prototype.upto = function(end, block){
    var num = this
    var str = ""
    while( num != arguments[0] && num.length <= arguments[0].length && num < arguments[0] ){
	str += String.prototype.upto.yield(num)
	num = num.succ()
    }
    if( num.length > arguments[0].length )
	return str
    return str + String.prototype.upto.yield(num)
}


String.prototype.each_char = function(){
    var str = ""
    for (var i = 0; i<this.length;i++)
    str += String.prototype.each_char.yield(this[i])
    return str
}

String.prototype.chars = function(){
    return this.each_char.apply(this, arguments)
}


String.prototype.sum = function(){
    var suma = 0
    for (var i = 0; i<this.length;i++)
    suma += this.charCodeAt(i)
    return suma
}


//Falta que coja el argumento ("x-y")



String.prototype.intersection = function(){
    var str = this
    for (var i=0; i<arguments.length; i++){
	var regex = "[" + arguments[i] + "]"
	str = str.match( new RegExp(regex , "g" )).join("")
    }
    return str
}


String.prototype.sub= function(pattern, replacement){
    return this.replace(pattern, replacement)
}


String.prototype.bytes = function(){
    for(var i = 0; i < this.length; i++)
    return this.charCodeAt(i)
}


String.prototype.ascii_only$U = function(){
    return isNaN(this)
}


String.prototype.each_line = function(split){
    var ary = this
    var arycpy = []  //ary with string result
    var posEnd = 0		//position to split the origin string
    var ind = 0			//index for ary
    var regExp = /\n/g
    var argZero = false	//Indicates if the arguments zero is a ""

    if(arguments.length == 0 || arguments.length > 2)
	return null

    if( typeof(arguments[0]) !== "function" ){
	if(arguments[0] != "")
	    regExp = RegExp(arguments[0])
	else {
	    regExp = /\n{2,}/g
	    argZero = true
	}
    }
    posEnd = ary.search(regExp) + 1
    while( (posEnd < ary.length) && (posEnd >0) ){
	if(argZero){
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


String.prototype.each_codepoint = function(){
    var str = ""
    for (var i=0;i<this.length;i++)
    str += String.prototype.each_codepoint.yield(this[i].charCodeAt(0))
    return str
}


String.prototype.codepoint = function(){
    return this.each_codepoint.apply(this,arguments)
}


String.prototype.rpartition = function(){
    var ary = [3]
    var str = arguments[0].toString()
    if (this.search(arguments[0]) == -1){
	ary = ["","",this.substr(0,this.length)]
	return ary
    }
    else{
	auxstr = str.substr(2,str.length-3)
	var pos = str[0] == '/' && str[str.length-1] == '/'? this.lastIndexOf(auxstr):this.lastIndexOf(str)
	if (str[0] == '/' && str[str.length-1] == '/')
	    ary = [this.substr(0, pos-1), this.substr(pos-1,auxstr.length+1),this.substr(pos+auxstr.length ,this.length-pos)]
	else
	    ary = [this.substr(0, pos), this.substr(pos,str.length),this.substr(pos+str.length,this.length-pos)]
    }
    return ary
}


String.prototype.scan = function(){
    var ary = this.match(arguments[0])
    if (ary.length > 1 && arguments.length <2)
	ary.shift()
    if ( arguments.length > 1 && typeof(arguments[1]) === "function" ){
	ary = this

	while( ary.length > 0 && ary.search(arguments[0]) != -1){
	    var finds = []
	    var find = ary.match(arguments[0])
	    ary = ary.replace(arguments[0], "")
	    for (var i=1; i<9; i++)
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


String.prototype.erase = function(){
    var erase = this
    for(var i = 0; i < arguments.length; i++)
    erase = this.intersection(erase, arguments[i])
    var regex = "[^" + erase + "]"
    erase = this.match(new RegExp(regex, "g")).join("")
    return erase
}



String.prototype.end_With$U = function(str){
    return (this.match(str+"$")==str)
}



String.prototype.eql$U = function(string) {
    return this == string
}


String.prototype.getbyte = function(index){
    return this.charCodeAt(index)
}


String.prototype.to_str = function(){
    return this.toString()
}


String.prototype.to_r = function(){
    var str1 	//String auxiliar
    var str2 	//String auxiliar
    var op1 = "0/1" //operando one rational number
    var op2 = 1	//operando two rational number
    var pos
    var mcd
    var dec

    str1 = this.strip() //Returns a copy of str with leading and trailing whitespace removed
    if( str1.search(/^[\d\+.-]/g) == -1 ) //Comprueba si el primer caracter es una letra o un caracter no valido)
	return op1
    str2 = str1 = str1.replace(/[_]/g,"")  //Replace underscore
    pos = str1.search(/\//g) //Find the "/" character
	if( pos > 0) {
	str1 = str1.substring(0,pos)
	str2 = str2.substring(pos+1)
    }
    else
	str2 = null

    if( isNaN( (op1 = parseFloat(str1)) ) )//Checks the string is a number
	return op1
    //Comprueba si la primera cadena tiene caracteres no validos y la segunda cadena se puede pasar a numero
    if( isNaN(str1) || isNaN( op2 = parseInt(str2) ) )
	op2 = 1

    //Dejo el primer numero sin decimales pasando los decimales que tuviese a la izquierdaReturns a copy of str with uppercase alphabetic characters converted to lowercase and lowercase characters converted to uppercase. Note: case conversion is effective only in ASCII region.
    dec = decimal(op1)
    op1 = op1 * Math.pow(10,dec)
    if( op2 == 1)//Si solo tenemos el operando 1
	op2 = Math.pow(10,dec)
    else
	op2 = op2 * Math.pow(10,dec)
    //Calculo el maximo comun divisor de los 2 operandos
    mcd = intMcd(op1,op2)
    if (mcd == null)
	mcd = 1
    return op1/mcd + "/" + op2/mcd
}




//todo: Move to Math
 function decimals() {
    if(isNaN(arguments[0]))
	return -1

    var num = new Number(arguments[0])
    if( num < Number.MIN_VALUE || num > Number.MAX_VALUE)
	return 0

    var ary = num.toString(10)
    var trash = ary
    var decUno = 0
    var decDos = 0
    if ( ary.search("e") > 0)    {
	decUno = ary.substring(ary.search("e")+1)
	trash = ary.substring(0, ary.search("e"))
    }
    if ( ary.search("[.]") > 0){
	decDos = trash.substring(trash.search("[.]")+1)
	decDos = decDos.length
    }
    return parseInt(decUno)>=decDos? 0 : (decUno - decDos) * -1
}


function intMcd() {

    if(arguments.length != 2 || isNaN(arguments[0]) || isNaN(arguments[1]) )
	return null

    var op1 = parseInt(arguments[0])
    var op2 = parseInt(arguments[1])

    if(arguments[0] == 0 || arguments[1] == 0)
	return null
    if (arguments[0] < 0)
	op1 *= -1
    if (arguments[1] < 0)
	op2 *= -1

    while ( op1 != op2 || op1 < 0 || op2< 0 ){
	if(op1 > op2)
	    op1 = op1-op2
	else
	    op2 = op2-op1
    }
    if( op1 == op2)
	return op1
    return null
}




String.prototype.bytesize = function(){
    return this.length
}


String.is_string$U = function(name){
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


Array.reflect = function(){
    var result
    var return_value = {}

    function duplicate(original_method){
        Array.prototype[original_method + "$B"] = function(){
            var substitute = Array.prototype[original_method].apply(this, arguments)

            this.clear()
            for (var i=0; i<substitute.length; i++)
            this[i] = substitute[i]

            return this
        }
        return [ original_method + "$B", Array.prototype[original_method + "$B"] ]
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



Array.prototype.each = function(){
    for (var i = 0; i < this.length; i++)
        Array.prototype.each.yield(this[i])

    return this
}



Array.prototype.each_index = function(){
  for (var i = 0; i < this.length; i++)
    Array.prototype.each_index.yield(i)
}



Array.prototype.each_with_index = function(){
  for (var i = 0; i < this.length; i++)
    Array.prototype.each_with_index.yield(this[i], i)
}



Array.prototype.count = function(obj){
  if (typeof(obj) === "undefined" )
    return this.length

      var count = 0
      for (var i=0; i<this.length; i++)
        if ( ( typeof(obj) === "function" ?
              Array.prototype.count.yield(this[i]) :
              this[i] == obj
            ))
          count++

   return count
}




Array.prototype.reverse_each = function(){
  var l = this.length - 1
    for (var i=l; i>=0; i--)
      Array.prototype.reverse_each.yield(this[i])
}



Array.prototype.collect = function(){
    var collectable = []

    if ( String.is_string$U(arguments[0]) )
        for (var i = 0; i < this.length; i++)
          collectable.push(this[i][arguments[0]])
    else
        for (var i = 0; i < this.length; i++)
          collectable.push(Array.prototype.collect.yield(this[i]))

    return collectable
}






Array.prototype.alias("map", "collect")






Array.prototype.select_if = function(){
  var collectable = []
    for (var i = 0; i < this.length; i++)
      if ( Array.prototype.select_if.yield(this[i]) )
        collectable.push(this[i])
          return collectable
}



Array.prototype.indexOf = function(searchElement, fromIndex){
  var i
    for (i = fromIndex || 0; i <this.length && this[i] !== searchElement; i++);
  i = i>=this.length? null: i
    return i
}



Array.prototype.clone = function(){
  var ary = []
    for (var i=0; i<this.length; i++)
      ary[i] = this[i]
        return ary
}






Array.prototype.clear = function(){
  while( this.length > 0)
    this.pop()
}



Array.prototype.equals$U = function(other){
    var same = true
    if(this.length != other.length)
        return  false
    for (var i=0; i<this.length; i++)
    if (this[i] != other[i])
        same = false
    return same
}


Array.prototype.uniq = function(){
  var uniq = []
    var comparable = []
    var block = arguments.length && typeof(arguments[0]) == "function"
    var element = null

    for (var i=0; i<this.length; i++){
      element = block ? arguments[0](this[i]) : this[i]
        if (!Array.includes(element, comparable))
          uniq.push(this[i])
            comparable.push(element)
    }
  return uniq
}



Array.prototype.uniq$B = function(){
  var uniq = this.uniq()

  if (uniq.equals$U(this))
      return null

        this.clear()

        for(var i=0; i<uniq.length; i++)
          this[i] = uniq[i]

  return this
}



Array.prototype.first = function(){
  if (this.length == 0)
   return null
      if (arguments.length == 0)
        return this[0]
          var ary = []
          for (var i=0; i < arguments[0] && i < this.length ; i++)
            ary[i] = this[i]
              return ary
}



Array.prototype.last = function(){
  if (this.length == 0)
    return null
      if (arguments.length == 0)
        return this[this.length -1]
          var ary = []

          for (var i= 0; i < Math.min(arguments[0], this.length); i++)
            ary[i] = this[ this.length - Math.min(arguments[0], this.length) +i ]
              return ary
}



Array.prototype.erase$B = function(){
    if(arguments.length > 1)
        return null

    var find = false
    for(var i = this.length-1; i>=0; i--)
       if(this[i] == arguments[0]){
          this.splice(i,1)
            find = true;
        }
  return find? this: null
}



Array.prototype.erase_at$B = function(){
  if( !is_a_number(arguments[0]) )
    return null
    if(arguments.length > 1)
      return null
        //throw ("Wrong number of parameters")
        if(arguments[0] > this.length)
          return null
            this.splice(arguments[0],1)
  return this
}



Array.prototype.erase_if = function(){

  if(arguments.length > 1)
    //throw("Wrong number of arguments")
    return null

  var ary = []
  for(var i = 0; i < this.length; i++)

  if ( !Array.prototype.erase_if.yield(this[i]) )
          ary.push(this[i])
            return ary.compact()
}



Array.prototype.erase_if$B = function(){

  if(arguments.length > 1)
    //throw("Wrong number of arguments")
    return null

  for(var i = 0; i < this.length; i++)
    if ( !Array.prototype.erase_if.yield(this[i]) )
      this.splice(i, 1)

  return this
}



Array.prototype.replace = function(){
  if(arguments.length == 0)
    return null
      if(arguments.length > 1)
        return null
          //throw("wrong number of arguments")
          if (!(arguments[0] instanceof Array))
            return null
              //throw("Invalid parameter type: Array expected.")
              this.clear()
              for(var i = 0; i < arguments[0].length; i++)
                this[i] = arguments[0][i]
                  return this
}


Array.prototype.delete$B = function(obj){
  var position = this.indexOf(obj)
    if ( position === null || position == -1 )
      if (Array.prototype.delete$B.block_given$U())
        return Array.prototype.delete$B.yield()
      else
        return null

  while ( (position = this.indexOf(obj)) != null && position != -1 )
      this.splice(position, 1)

  return obj
}



Array.prototype.include$U = function(){
  if(arguments.length != 1)
    //throw "wrong number of arguments (it needs one argument)"
    return null
      var find = false
      for(var i = 0; i < this.length; i++)
        if( arguments[0] == this[i])
          find = true
            return find
}



Array.prototype.assoc = function(){
  if(arguments.length > 1)
    //throw "wrong number of arguments"
    return null
      for(var i=0; i<this.length; i++)
        if(arguments[0] == this[i][0])
          return this[i]
            return null
}



Array.prototype.at = function(){
  if(arguments.length > 1)
    //throw "wrong number of arguments"
    if(arguments[0] > this.length)
      return null
        if(isNaN(arguments[0]))
          //throw "wrong type paremeter" Converts any argument to array, then merges elements of itself with corresponding elements from each argument.
          return null
            if(arguments[0] < 0 && (this.length + arguments[0]) < 0)
              return null
                return arguments[0]>=0? this[arguments[0]] : this[this.length+(arguments[0])]
}



Array.prototype.compact = function(){
  var ary = []
    for(var i = 0; i < this.length; i++)
      if(this[i] != null)
        ary.push(this[i])
          return ary
}






Array.prototype.merge = function(ary2){
  var ary = []// PROBLEMAS CON EL TEST, LA VARIABLE ARY CONTIENE DATOS PERO EN EL TEST SE MUESTRA COMO UNDEFINED
    for(var i = 0; i < this.length; i++)
      ary.push(this[i])
        for(var i = 0; i < ary2.length; i++)
          ary.push(ary2[i])
            return ary
}



Array.prototype.drop = function(){
  if(arguments.length > 1 || arguments.length < 1)
    //throw "Wrong number of arguments"
    return null
      if(isNaN(arguments[0]))
        //throw "Invalid type argument"
        return null
          var ary = []
          if(arguments[0] > this.length-1)
            return ary
              ary = this.clone()
              for(var i = 0; i < arguments[0]; i++)
                ary.splice(0,1)
                  return ary
}



Array.prototype.drop_while = function(){
  if(arguments.length > 1)
    //throw("Wrong number of parameters")
    return null

  var ary = []
  for(var i = 0; i < this.length; i++){
      if (Array.prototype.drop_while.yield(this[i]))
        ary.push( this[i])
  }
          return ary.compact()
}



Array.prototype.flatten = function(level){
  if(level == 0)
    return this
      level = level || 1000
      return Array.unpack(this, [], level)
}



Array.prototype.index = function(){
  for(var i = 0; i < this.length; i++)
    if ( typeof(arguments[0]) === "function" ?
          Array.prototype.index.yield( this[i]) :
          this[i] == arguments[0] )
      return i
        return null
}



Array.prototype.product = function(){
  var ary = []

    if(!(arguments[0])){
      for(var i = 0; i < this.length; i++)
        ary[i] = [this[i]]
          return ary
    }

  if(arguments[0].length < 1)
    return ary

      if(arguments.length >= 1){
        if(arguments.length == 1)
          return Array.product(this,arguments[0])
      }
}



Array.prototype.rassoc = function(){
  if(arguments.length > 1 || arguments.length < 1)
    //throw ("wrong number of arguments")
    return null
      var existsArray = false
      for(var i = 0; i < this.length; i++)
        if(this[i] instanceof Array)
          if(this[i].length == 2)
            existingArray = true

              if(existingArray){
                for(var i = 0; i < this.length; i++)
                  if(this[i] instanceof Array)
                    if(this[i][1] == arguments[0])
                      return this[i]
              }
  return null
}



Array.prototype.rindex = function(){
  if(arguments.length != 1)
    //throw ("Wrong number of arguments")
    return null

      for(var i = this.length-1; i >= 0; i--)
        if(this[i] == arguments[0])
          return i
            return null
}



Array.prototype.rotate = function(obj){
  if (typeof(obj) === "undefined"){
    var ary = this.clone()
      ary.push(ary.shift())
      return ary
  }
  if(arguments.length > 1)
    //throw ("Wrong number of arguments")
    return null
      var ary = this.clone()
      if(arguments){
        if(isNaN(arguments[0]))
          //throw ("Wrong type argument")
          return null

            if(arguments[0] < 0){
              if(Math.abs(arguments[0]) > this.length-1)
                //throw("Invalid index")
                return null
                  return _rotate(Math.abs(arguments[0]), this, ary)
            }
        if(arguments[0] > this.length-1)
          //throw("Invalid index")
          return null
            for(var i = 0; i < ary.length; i++){
              ary[i] = this[arguments[0]]
                arguments[0]++
                if(arguments[0] == this.length)
                  arguments[0] = 0
            }
        return ary
      }
  return _rotate(this.length-1, this, ary)
}



Array.prototype.take = function(){
  if(!(arguments[0]) || arguments.length > 1)
    //throw ("Wrong number of parameters")
    return null

      if(isNaN(arguments[0]))
        //throw ("Wrong type of parameters")
        return null

          var ary = []
          if(arguments[0] > this.length)
            arguments[0] = this.length
              for(var i = 0; i < arguments[0]; i++)
                ary[i] = this[i]
                  return ary
}



Array.prototype.take_while = function(){
  var ary    = []
  var taking = true

  for (var i=0; taking && i<this.length; i++)
    if ( Array.prototype.take_while.yield(this[i]) )
      ary.push(this[i])
    else
      taking = false
    return ary
}



Array.prototype.shuffle = function()
{
  if(arguments.length > 0)
    //throw("Wrong number of arguments")
    return null

      randomizedArray = [];
  usedNumbers = [];

  while(randomizedArray.length < this.length)
  {
    finded = false;
    var number = Math.round(getRandomArbitary(0,this.length));
    for (var i=0; i < usedNumbers.length; i++)
      if (number == usedNumbers[i])
        finded = true;
    if(!finded && number < this.length)
    {
      usedNumbers.push(number);
      randomizedArray.push(this[number]);
    }
  }

  return randomizedArray;
}



Array.prototype.transpose = function(){

  for(var i = 0; i < this.length; i++)
    if(!(this[i] instanceof Array))
      //throw("Wrong type of parameters into Array" + typeof(arguments[i]))
      return null

        for(var i = 0; i < this.length; i++)
          if((this[0].length) != (this[i].length))
            //throw("Element size differs")
            return null

              var ary = []


              //Square matrices
              if((this.length) == (this[0].length)){
                ary = this.clone()
                  for(var i = 0; i < this.length;i++){
                    ary[i] = []
                      for(var j = 0;j < this[i].length; j++)
                        ary[i][j] = this[j][i]
                  }

                return ary
              }

  //Non-square matrices

  for(var i = 0; i < this[0].length;i++)
    ary.push(_transpose(i,this))

      return ary
}



Array.prototype.zip = function(){
  var ary = []
    for(var i=0;i<this.length;i++){
      ary[i] = []
        ary[i][0]=this[i]
        for (var j=0; j<arguments.length; j++)
          if(arguments[j][i] == (void 0))
            ary[i][j+1]=null
          else
            ary[i][j+1]=arguments[j][i]
    }
  return ary;
}



Array.prototype.empty$U = function(){
  if(arguments.length > 0)
    //throw("Wrong number of parameters")
    return null
      return this.length==0? true: false
}



Array.prototype.eql$U = function(model){
  if(arguments.length > 1)
    //throw("Wrong number of arguments")
    return null

      if(!(arguments[0] instanceof Array))
        return false

          if(this.length != arguments[0].length)
            return false
              var that = this
              return model.inject_with_index( true,
                  function (el, index, acum){
                    if (typeof(el) === "number")
                return acum && el == that[index] //Number.eql$U(el, that[index])
                return acum && ((el != null)? el.eql$U(that[index]) : true)
                  });

}



Array.prototype.inject = function(init_value, block){
  for (var i=0; i<this.length; i++)
    init_value = Array.prototype.inject.yield(this[i], init_value)
      return init_value
}



Array.prototype.inject_with_index = function(init_value){
  for (var i=0; i<this.length; i++)
    init_value = Array.prototype.inject_with_index.yield(this[i], i, init_value)
      return init_value
}



Array.prototype.reverse = function(){
  var ary = []
    pos = 0
    for(var i = this.length-1; i >= 0; i--){
      ary[pos] = this[i]
        pos++
    }
  return ary
}



Array.prototype.values_at = function(){
  for(var i = 0; i < arguments.length; i ++)
    if(isNaN(arguments[i]))
      //throw ("Invalid type of paramenter")
      return null

        var ary = []
        for(var i = 0; i < arguments.length; i++){
          //Converts real numbers (if exists) into integer.
          arguments[i] = Math.round(arguments[i])

            if((arguments[i]) >= (this.length))
              ary.push(null)

            else if(arguments[i] < 0){
              if((arguments[i]+(arguments[i]*-2)) >= this.length)
                ary.push(null)
              else
                ary.push(this[this.length+(arguments[i])])
            }

            else
              ary.push(this[arguments[i]])
        }
  return ary
}



Array.prototype.to_a = function(){
  return this
}



Array.prototype.cycle = function(times){
  if (times < 0 || this.empty$U())
    return

  times = times || -1
  while(times--)
    this.each.apply(this, arguments)
  return null
}



Array.prototype.strip_all = function(){
  return this.collect(function(el){
    return el.respond_to("strip") ? el.strip() : el
  })
}



Array.prototype.combination = function(number){
  if (! is_a_number(number) )
    throw "Array#combination. Parameter must be a number."
  if (number == 0)
    return [[]]
  if (number > this.length)
    return []
  if (number == this.length)
    return [this.clone()]
  if (number == 1)
    return this.collect(function(el){ return [el] })

  var combinations = []
  for (var i=0; i<this.length-number + 1; i++){
    var r = [this[i]]
    r = this.__secure_combination(number-1, r, i + 1)
    for (var j=0; j<r.length; j++)
      combinations.push(r[j])
  }

  return combinations

}

Array.prototype.__secure_combination = function(number, base, initial){

  if (number <= 0)
    return base
  var result = []
  for (var i=initial; i<this.length-number + 1; i++){
    var r = base.clone()
    r.push(this[i])
    r = this.__secure_combination( number-1, r.clone(), i+1 )
    if (number > 1)
      for (var j=0; j<r.length; j++)
        result.push(r[j])
    else
      result.push(r)

  }

  return result.clone()
}



Array.prototype.sort_by = function(){
  var indexed = []
  if (Array.prototype.sort_by.block_given$U()) {
     var ordered = []

     for (var i=0; i<this.length; i++)
             indexed.push( [ Array.prototype.sort_by.yield(this[i]), this[i] ] )
           if (is_a_number$U( indexed[0][0]) )
       indexed.sort( function(a,b){ return a[0] - b[0] } )
     else
       indexed.sort()

     for (var i=0; i<this.length; i++)
              ordered.push( indexed[i][1] )

    return ordered
    } else
      return this.sort()

}






Array.prototype.distribute = function(op2) {
    var result = []

    for (var i=0; i<this.length; i++)
      for (var j=0; j<op2.length; j++)
         result.push( [this[i], op2[j]] )

    return result
}






Array.prototype.compose = function(){
    var copy = this.clone()

    if (this.length < 2)
        return copy

    var args   = []
    for (var i=0; i<arguments.length; i++)
      args[i] = arguments[i]

    var roller = copy.shift().to_a()

    for(var i=0; copy.length; i++){
        var next = copy.shift().to_a()
        var inner_arrays = false
        for (var h=0; h<next.length; h++)
           if (next[h] instanceof Array)
               inner_arrays = true
        if (inner_arrays){
            next = Array.prototype.compose.apply(next, args[i+1])
            args.splice(i+1,1)
        }
        var result = roller.distribute(next)
        roller = result.collect(function(el) { return el.join(args[i]) })
    }
    return roller
}



Array.includes = function(el, array) {
    for (var i=0; i<array.length; i++)
    if (array[i] == el)
        return true
    return false
}



Array.unpack = function(model, array, level){
    var l = level;

    for (var i=0; i<model.length; i++){
        if ( (model[i] instanceof Array) && (l > 0)){
            Array.unpack(model[i], array, l-1)
        }
        else{
            array.push(model[i])
        }
    }
    return array
}



Array.product = function(array1, array2) {
    var nary = []
    var arrays = array1.length * array2.length
    for(var i = 0; i < arrays; i++){
        nary[i] = []
    }
    var pos = 0
    for(var i = 0; i < array1.length; i++)
    for(var j = 0; j < array2.length; j++){
        nary[pos][0] = array1[i]
        nary[pos][1] = array2[j]
        pos++
    }
        return nary
}

function _rotate(number, array1, array2){
    var pos = 1
    array2[number] = array1[0]
    var arg = number
    if(arg == array1.length-1)
        arg = 0
    else
        arg++
        for(var i = arg; i != number;i++){
            array2[i] = array1[pos]
            if(i == (array1.length-1))
                i = -1;
            pos++
        }
            return array2
}

function getRandomArbitary (min, max) {
    return Math.random() * (max - min) + min;
}



function _transpose(pos, nary){
    var array = []
    for(var i = 0; i < nary.length; i++)
    array[i] = nary[i][pos]
    return array
}

Array.reflect(Array.bang_methods)




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



$K_logger = console



$global_space = (function(){return this;}).call(null)
$global_space["$constants"] = []



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


function method_missing(error, method, params){
    if (/Class_[a-zA-Z_$][a-zA-Z_$0-9]*//* I think this is needed for pigs and sheeps 
      alert(err.stack.split("\n"))
      err.stack.split("\n")[0].search(/(.*)@/)
      alert(RegExp.$1)
      var scope = eval(RegExp.$1)
      scope.closures = scope.closures || []
      */

      var actual_parameters = CodeBlockFinder.parse_params(params)
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
/**
 * @class Processor
 * Multiprocess components / state machines
 * Create a Processor to run threads.
 * lluviaProject provides a default processor $Processor in the global scope.
 *
 */

Processor.prototype.constructor = Processor;
/**
 * @method constructor
 * @return				{Processor}	retuns a new processor.
 */
function Processor(){

	// Variables member
	this.now	 = new Date();
	this.events  = new Event();
	this.threads = new Array();
}


// Operations

/**
 * Add a thread in the execution queue
 * @method		register
 * @param		{Thread}    cObject		Is the caller object to be porocessed through the thread interface.
 * @param		{Function}  solicitorF		Control loop object. Typically "run".
 */
Processor.prototype.register = function(cObject, solicitorF){
	var obj = null
	var fun = null
	if (cObject){
		obj = cObject
		if (solicitorF)
			fun = solicitorF
		else if (cObject.run)
			fun = cObject.run
		if (!fun)
			throw "The current processor can´t get a valid solicitor"

	}

	this.threads.push({object: cObject, solicitor: (solicitorF? solicitorF: cObject.run) });

}

/**
 * Removes a thread out of the execution queue.
 *
 * @method		 kill
 * @param		{Thread}		rObject		Object to be removed from the execution queue.
 * @param		{Function}	solicitorF  As far as an object can be processed by several parallel solicitors function, one can be removed. (This is a fairly overenthusiastic feature indeed)
 */
Processor.prototype.kill = function(rObject, solicitorF){
	for (var i in this.threads)
		if (this.threads[i] == {object: rObject, solicitor: solicitorF})
			this.threads.slice(i,i+1);
}

/**
 * Execute all threads one step.
 *
 * @method		step
 */
Processor.prototype.step = function (date){

	this.now = date || new Date();
	try {
	  for (var i=0; i<this.threads.length; i++)
            this.threads[i].solicitor.call(this.threads[i].object, this.now);
    }
    catch (e) {

    }
}

/**
 * @method run
 * Execute all threads. Top processors are called by themselves.
 * Lower tiers can belong (be registered) in another's Processor#thread. Then
 * a date is passed as a parameter in order to keep lower time lags between
 * Thread#run calls. Thus, all registered threads are informed of the same (date)
 * time.
 *
 * @param {Date} date Parent's processor time.
 *
 */
Processor.prototype.run = function (date){
    this.now =  new Date();
    try {
	this.step(this.now)
    }
    catch (e) {

    }

    setTimeout(this.run.bind(this), 20);
}

/**
 * @method start
 *
 * Start Processor#run cycle.
 */
Processor.prototype.start = function(){
    this.run()
    return this;
}

/**
 * @method newThread
 * Executes periodically a function in a new Thread.
 *
 * Not tested. ruby -e "puts 'sorry ' * 20"
 *
 * ### Example
 *
 *    $Processor.newThread(function() {
 *      for (var i=0; i<1000; i++)
 *         "Love others as your code"
 *    })
 */
Processor.prototype.newThread = function(){
    var t = new Thread(null, this)

    t.run = Processor.prototype.newThread.block_given$U() || function() {;}
    return t;
}

/**
 *  @method get
 *  Stereotypical mirage fetcher. Get objects or functions passed as a reference or
 *  belonging to a class hierarchy.
 *  A object can be repeated as long as you can push an object twice in the threads array
 *  with the same or different solicitor function. Processor#get avoids repetion as
 *  in sql select distinct.
 *
 * @param {Object} object object or class reference.
 * @return {Array}  Array with collected objects or an empty array is anything is found.
 */
Processor.prototype.get = Processor.prototype.get = function (object) {
    var collect = []

    var len = this.threads.length
    for (var i=0; i<len; i++) {
	var candidate = this.threads[i].object
       if ( candidate && !collect.include$U(candidate) &&
	    ( candidate == object ||  candidate instanceof object )
	  )
      collect.push(candidate)
    }

    return collect
}

// Global Application Processor creation
$Processor = new Processor().start()



Thread.prototype.constructor = Thread;

/**
 * @class Engine.Thread 
 * abstract class (future interface/module) to instantiate executions threads.
 */

/**
 * @method constructor
 *  
 * @param  {Function} 	    solicitor Function attending processor calls.
 * @return {object} 	    New execution thread
 */
function Thread(solicitor, processor){
	this.before = new Date()
	this.now = processor? processor.now: new Date();
	if (!solicitor)
		solicitor = this.run;

	if (processor && processor instanceof Processor)
		processor.register(this, solicitor);
}



/**
 * @method    run	
 * State machine manager.
 * Thread execution step. Is an abstract method.
 *
 */
Thread.prototype.run = function(processors_time){
	this.now = processors_time
	throw "The solicitor function remains still undefined."
}

/**
 * @class Engine.Automata
 * 
 * Creates a state machine. A lluvia state machine has a continous and derivable state,
 * made of the previous, the current and the requested one. During state transition, several solicitor functions
 * get executed: down function of the current state, up solicitor of the requested state and finally we arrive to the
 * steady state.
 */

/**
 * @method constructor 
 *
 * ## Example 
 *
 *     var state = new Enumeration("initial", "running", "sleeping")
 *     var a = new Automata( states, 
 *                          {previous:  state.initial,
 *                           current:   state.initial,
 *                           requested: state.running })
 *
 *
 * or, for nested states:
 *
 *     var a = new Automata(["killing", ["running", ["phase1", "phase2"], "supended" ]])
 *
 * 
 * @param  {Object | Array}   states Possibles states of an automata (Enumeration).
 *                                   Array is an extesnsion for Hierarchical State Machines.
 * @param  {Object}   initialState	 Initial state of the automata.
 * @param  {Array}    solicitor		 State Manager functions. An array with three functions (up, steady, down).
 * @return {Automata}				 New created state machine automata..
 * @constructor
 */
Automata.prototype.constructor = Automata;
function Automata(states, initialState, solicitor){

	if (states instanceof Array)
		

	this.state = states == null ? { none: -1 } : states;
	this.state_name = []
	for (var key in this.state)
		if (this.state.hasOwnProperty(key))
			this.state_name[this.state[key]] = key

	this.stateChange  = {	up: 0, steady:1, down: 2};
	this.currentState = initialState != null ? initialState:
						{	previous  : this.state.none,
							current   : this.state.none,
							requested : this.state.none };
	this.solicitor = (solicitor || solicitor != null) ? solicitor : new Array(new Array(null, null, null));
}


/**
 * @method drive_state
 * Executes the solicitor functions related to the fsm state.
 * All arguments are passed to solicitors.
 *
 */
Automata.prototype.drive_state = function() {

	var base   = this.state_name[this.currentState.current]
	var down   = base + "_down"
	var steady = base + "_steady"
	var up     = base + "_up"

	if ( this.currentState.requested != this.state.none ){
		this.solicitor[this.currentState.current][this.stateChange.down].apply(this, arguments)
		if ( this[down])
			this[down]()

		this.solicitor[this.currentState.requested][this.stateChange.up].apply(this, arguments)
		if (this[up])
			this[up]()

	}

	this.solicitor[this.currentState.current][this.stateChange.steady].apply(this, arguments)
	if (this[steady])
		this[steady]()

}

/**
 * @method	  run
 * Behavior of the automata according to its internal state.
 * This function takes care of state transitions.
 *
 */
Automata.prototype.run = function(){

	Automata.prototype.drive_state.apply(this, arguments)
	if ( this.currentState.requested != this.state.none ){
		this.currentState.previous  = this.currentState.current;
		this.currentState.current   = this.currentState.requested;
		this.currentState.requested = this.state.none;
	}
}

ThreadAutomata.prototype  = new Thread;
extend(ThreadAutomata, Automata);

ThreadAutomata.prototype.constructor = ThreadAutomata;

/**
 * @class Engine.ThreadAutomata
 * Creates an automata for atomic processing.
 */

/**
 * @method constructor
 * 
 * @param {Object} state			Available automata states.
 * @param {Object} currentState	    Initial automata state.
 * @param {Object} solicitor		Functions state managers.
 * @return {ThreadAutomata}			Newly created automata.
 */
function ThreadAutomata(state, currentState, solicitor, processor){
	if (arguments.length){
		Automata.call(this, state, currentState, solicitor);
		Thread.call(this, ThreadAutomata.prototype.run, processor);
	}
}


/**
 * Calls a function that manages the next activity in function
 * for the state of the object. It is responsible of state transitions through Automata#run.
 * The main difference between ThreadAutomata#run and Automata#run lies on
 * the type of the solicitor functions, designed to make atomic operations.
 *
 * @method	  run
 *
 */

ThreadAutomata.prototype.run = function(processors_time){
	if (this.now)
		this.before = this.now
	this.now    = processors_time
	Automata.prototype.run.call(this, this.now, this.before);
}


/**
 * @class Engine.Device
 * @extends Processor
 * @mixins Engine.ThreadAutomata
 *
 * Provides an asynchronous mechanism for communicating with another devices.
 * In practical terms, it uses a message queue and fires events.
 * I doesn't have a window on his own but handles Gates to communicate
 * with HTML DOM.
 *
 * ###Example of use:
 *
 *
 *     // EXAMPLE APP DEVICE
 *     // ButtonGate Example
 *     ButtonGate.prototype = new Gate
 *     ButtonGate.prototype.constructor = ButtonGate
 *
 *     function ButtonGate(el){
 *     	if (arguments.length)
 *     		Gate.call(this, el)
 *     }
 *     // No 'device' references are provided in the constructor
 *
 *
 *     ButtonGate.prototype.do_onclick = function(event, element){
 *     	alert("You have made click.")
 *     }
 *
 *     TryApp.prototype = new Device
 *     TryApp.prototype.constructor = TryApp
 *
 *
 *
 *     function TryApp(){
 *     	//  self reference for static methods
 *     	var that = this;
 *
 *     	// class reference for instance objects
 *     	this._class = that
 *
 *
 *     	//  private static vars
 *     	Device.call(this, null)
 *     	this.newGate("llaveEnMano", ButtonGate)
 *      // Device#newGate inject a device property inside
 *      // the ButtonGate object pointing to _this_.
 *     	this.solicitors[this.state.running][this.stateChange.steady] = function(){
 *     		that.gates[0].panel.innerHTML = new Date()
 *     	}
 *     }
 *
 *
 *
 * We have to be very carefull with non idempotent methods (specially function references),
 * because they are called twice during inheritance processes. Once in xxx.prototype = new yy
 * and another time at object initialization " yyy.call(xxx, params) "
 *
 * Third generation inheritance generates constructor calls with null arguments
 *
 * @property {Object} state Enumeration with all possible states. Default values are listed below.
 * @property {Number} [state.suspended=0] The device is not using its executdion turn.
 * @property {Number} [state.running=1]  Normal work operations.
 * @property {Number} [state.suspending=2] The device is cleaning up before sleeping.
 * @property {Number} [state.killing=3] Write your last will.
 * @property {Number} [state.killed=4] No aim to recover.
 *
 * @property {Array} solicitors The three functions (up, steady and down) that drive any state.
 *
 * @property {Object} eventDispatcher EventDispatcher object. Handles in and out communications.
 * @property {Object} currentState    Holds the current state of the device.
 * @property currentState.previous    Record of the previous state.
 * @property currentState.current     State we are currently in.
 * @property currentState.requested   State to change in the next run.
 *
 * @property {Array} gates List of all attached Gates.
 */

Device.prototype = new Processor
extend(Device, ThreadAutomata)  // ThreadAutomata is the last class in the inheritance chain in order to keep its run method unredefinided
Device.prototype.constructor = Device


/** 
 * @method constructor
 * Creates a Device.
 *
 * @param {String | HTMLElement} [view] (optional) A possible view associated with the Device.
 * @param {Object} [state] (optional) Default Device states -as ll_Enumeration- are: suspended, running, suspending, killing and killed.
 * @param {Object} [currentState={ previous: state.suspended, current: state.suspended, requested: state.running }] Sets the initial conditions for the device to start.
 * @param {Object} [parent=Processor] Parent Device or processor this Device belongs to.
 *
 */

function Device(view, state, currentState, parent){
	/* Inheritance initialization */


	/* Class accesors*/
	var that    = this
	this._class = that

	state = state || Device.STATE

      state.self_keys().each(function(key){  // Define overridable functions
		   ["up", "steady", "down"].each(function(substate){
		     Device.prototype[state + "_" + substate] = function(){;}
		})})

		//todo: refactor to Hashes along with states
	this.solicitors = [
		/* suspended */	[
			function(){
				;
			},
			function(){
				;
			},
			function(){
				;
			}
		],
		/* running */ 	[
			function(){
				;
			},
			function (){
				/* TO DO */ ;
				this.gateRunner(this.now)
				this.childRunner(this.now);
			},
			function(){
				;
			}
		],
		/* suspending */[
			function(){
				;
			},
			function(){
				/* TO DO */ ;
				this.childRunner(this.now);
			},
			function(){
				;
			}
		],
		/* killing */ 	[
			function(){
				;
			},
			function(){
				/* TO DO */ ;
				this.gateRunner(this.now)
			},
			function(){
				;
			}
		],
		/* killed */ 	[
			function(){
				;
			},
			function(){
				;
			},
			function(){
				;
			}
		]
	]

	/* Instance vars */
	if (view)
		this.view = (typeof (view) === "string"? document.getElementById(view) : view)
	this.lookup = new Lookup();
	this.eventDispatcher = new EventDispatcher(this.lookup);
	this.currentState = currentState ||
						{ 	previous:  Device.STATE.suspended,
							current:   Device.STATE.suspended,
							requested: Device.STATE.running
						}
	this.gates		   = []

	/* privileged functions (mainly public static accessors)*/
	this.getSolicitors = function() { return that.solicitors; }
	this.getStates	   = function() { return state; }
	this.openDevice	   = _$innerObject(this, "device")
	/* construction */
	function initialize(){ // Use that. This would refer to the function object.
		that.eventDispatcher.device = that
		that.register(that.eventDispatcher, that.eventDispatcher.shift)
		if (that.self_events)
			that.eventDispatcher.joinPorts(that.self_events)
		ThreadAutomata.call(that, state, that.currentState, that.solicitors, parent || $Processor);
	}

	if (arguments.length)	// Avoid registering during prototype copy while inheritance process
		initialize();


}

/**
 * Device default states
 * @property {Object} Device.STATE Enumeration constant.
 */
Device.STATE = new Enumeration("suspended", "running", "suspending", "killing", "killed")

/**
* @method state_substate
* Dynamic
*
* Default method to handle any state.
*
* ###Example
*
*     Device.prototype.running_steady = function(){;}
*
* When functionality is required, override the required method.
*/

/**
 * @method getSolicitors
 *
 * Return the array of solicitors.
 *
 * @return {Array} Array of three functions (up, steady and running) by state, packed in a global array.
 */

/**
 * @method getStates
 * Return the list of all possible states for this Device.
 *
 * @return {Array} List of states.
 */

/**
 * @method gateRunner
 * @private
 *
 * Simulates multithreading for each gate by calling the run method.
 */
Device.prototype.gateRunner = function(){

		for (var i=0; i<this.gates.length; i++)
			this.gates[i].run( this.now, this.before )

}

/**
 * @method childRunner
 * @private
 *
 * Simulates multithreading for each device attached to this one.
 */
Device.prototype.childRunner = function(){
	if (this.currentState != this.getStates().killed) {
		this.now = arguments[0]
		for (var i in this.threads)
			try {
				this.threads[i].solicitor.call(this.threads[i].object, this.now);
			}
			catch (e) {

			}
	}

	// If they are devices we shall call them just in case they are running

}

/**
 * @method newGate
 *
 * Creates a new Object using a derived class of Gate and attaches it to the gates array own property.
 *
 * @param {String | HTMLElement} el See (@link Gate)
 * @param {Function} ClassCons Class constructor deriving from Gate.
 */
Device.prototype.newGate = function(el, ClassCons, config){
	try {
		var Cons = this.openDevice(ClassCons)
		var view = this.view || null
		var ob = new Cons(el, view, config)
        ob.device = this
		this.gates.push( ob )
		return ob
	} catch (e) {
		if ($K_debug_level >= $KC_dl.DEVELOPER)
			alert("No event handlers were found.\nException: " + e.toSource())
	}
}

/**
 * @method attend
 *
 * Generic meesage dispatcher. Seeks for a more specific message handler.
 *
 * @param {Date} date   Time in which the message was attended in the inqueue.
 * @param {Object} mssg Message object shifted from the message queue.
 *
 * ### Note:
 *
 *   To attend a message called "close" define:
 *
 *       Device.prototype.attend_close = function(){;}
 *
 *  Make the previous definition in a derived class.
 */
Device.prototype.attend = function(date, mssg){
	this["attend_"+ mssg.name](date, mssg)  // If attend_ method doesn't exist then we shall provide a generic dispatcher.
}

Device.prototype._y = function(htmlElement, stopAt){
	stopAt = stopAt || null
	if (typeof(stopAt) === "string")
		stopAt = document.getElementById(stopAt)
	if (stopAt !== htmlElement && htmlElement.offsetParent)
		return htmlElement.offsetTop + Device.prototype._y(htmlElement.offsetParent, stopAt)
	return 0
}

Device.prototype._x = function(htmlElement, stopAt){
	stopAt = stopAt || null
	if (typeof(stopAt) === "string")
		stopAt = document.getElementById(stopAt)
	if (stopAt && htmlElement && stopAt === htmlElement)
		return 0
	if (htmlElement.offsetParent)
		return htmlElement.offsetLeft + Device.prototype._x(htmlElement.offsetParent, stopAt)
	return 0
}

Device.prototype.y_calc = function(){
	if (this.view) {
		this.y = this._y(this.view)
		return this.y
	}
	return null
}

Device.prototype.x_calc = function(){
	if (this.view) {
		this.x = this._x(this.view)
		return this.x
	}
	return null
}

/**
 * @method fireEvent
 *
 * Notifies to all the listeners that this device has generated an event.
 *
 * @param {Object} mssg The message to be triggered.
 */
Device.prototype.fireEvent = function (mssg){
	for (var i=0; i<this.eventDispatcher.ports[mssg.name].length; i++)
	  /* Attending a mssg in one queue remains different from another queue */
	  this.eventDispatcher.ports[mssg.name][i].eventDispatcher.enqueue(mssg.clone())

}

/**
 * @method addPort
 *
 * Adds an specific port (reference to a listener) to the selected event listeners list.
 *
 * @param {Object} mssg_name The message to be triggered.
 * @param {Object} device Device to be added to the ports array
 *
 */
Device.prototype.addPort = function (mssg_name, device){
	this.eventDispatcher.addPort(mssg_name, device)
}

/**
 * @method newMessage
 *
 * Creates new message.
 *
 * @param {String} type Message type.
 * @param {String} name Name of the event
 * @param {String} data If defined, gives extra information about the event
 *
 */
Device.prototype.newMessage = function(type, name, data){
      // logger.innerHTML += "data: " +  systemEv(type , {name: name, data: data || "no extra data available"}, this).toSource() + "<br/>"
	if (type && name)
		return systemEv(type , {name: name, data: data || "no extra data available"}, this)
}

/**
 * @method sendMessage
 *
 * Sends a message to a particular device, without using the listeners list.
 *
 * @param {String} type Message type.
 * @param {String} name Name of the event
 * @param {String} data If defined, gives extra information about the event
 * @param {Object} receiptant Device that receives the message
 *
 */
Device.prototype.sendMessage = function(type, name, data, receiptant){
	receiptant.eventDispatcher.enqueue(this.newMessage(type, name, data))

}

/**
 * @method method_missing
 *
 * Throws an exception when a method is not defined, unless someone has used the
 * camel case version of an existing method. In that particular case it recovers
 * from the crash and executes the call.
 *
 * @param {String} method Name of the non-existing method.
 * @param {String} obj Name of the object to which the method applies
 * @param {Array} params List of the parameter taken by the method
 *
 */
Device.prototype.method_missing = function (method, obj, params){
  if (this.respond_to$U(method.underscore()))
    return method.underscore.apply(this, params)
  obj = obj || ""
  params = params || []
  throw(new MethodMissingError(method + " missing in " + obj + "::" + this.constructor.name +". Params: " + params.join(', ') ))
}

/**
 * @class Engine.EventDispatcher
 * @extends ThreadAutomata
 *
 * Handle in and out asynchronous communications via a message queue
 * and a listener mechanism (ports).
 *
 * @constructor
 * Creates a EventDispatcher.
 *
 * @param {Object} lookup
 *
 */

EventDispatcher.prototype = new ThreadAutomata
EventDispatcher.prototype.constructor = EventDispatcher

function EventDispatcher(lookup){
	// Private static vars
	var that = this; // Class reference for static functions
	this.ids   = 0
	this.ports = {
		 // List event listeners. "app_down": []
	}

	// Public vars
	this.inqueue = []
	this.clss = that	// Reference for static members to be used inside instances

	// Privileged methods
	this.getId = function(){return ++that.ids;}

	// Initialization
	lookup.add(this)
}

/**
 * @method enqueue
 *
 * Receives incoming messages stamping the arrival number. The arrival
 * order can be used to identificate messages.
 *
 * @param {Object} mssg Message object pushed into the message queue.
 *
 * @return {Number} Order of arrival
 *
 */
EventDispatcher.prototype.enqueue = function(mssg){
	var ev = this
	mssg.received = {id: ev.getId(), time: new Date()};
	this.inqueue.push(mssg)
	return mssg.received.id
}

/**
 * @method addPort
 *
 * Adds an specific device referer in the list of event listeners for a
 * particular event.
 *
 * @param {String} event Name of the event to listen
 * @param {Object} device Device to be added to the ports array (dock).
 *
 */
EventDispatcher.prototype.addPort = function (event, device){
	if (this.ports[event])
		this.ports[event].push(device)
}

/**
 * @method joinPorts
 *
 * Builds an empty dock (port array) for every event.
 *
 * @param {Array} listArray
 */
EventDispatcher.prototype.joinPorts = function (listArray){
	for (var i=0; i<listArray.length; i++)
		this.ports[listArray[i]] = []
}

/**
 * @method delPort
 *
 * Removes a listener from the dock.
 *
 * @param {Object} event Event that we were listening to
 * @param {Object} device Device to be deleted to the ports array
 *
 */
EventDispatcher.prototype.delPort = function (event, device){
	if (this.clss.ports[event])
		for (var i=0; i<this.clss.ports.length; i++)
			if (this.clss.ports[i] === device)
				this.clss.ports[i].splice(i,1)
}

/**
 * @method fireEvent
 *
 * Notifies to all the listeners that this device has generated an event.
 *
 * @param {Object} event Event generated
 */
EventDispatcher.prototype.fireEvent = function(event){
	if (this.clss.ports[event.name])
		for (var i=0; i<this.clss.ports[event.name].length; i++)
			this.clss.ports[event.name][i](event);
}

/**
 * @method shift
 *
 * Extract messages from the queue and send them
 * to the device default dispatcher. If the dispatcher
 * has closed the message being processed then it removes
 * it from the message queue. Otherwise is kept until
 * operations around this message are finished.
 *
 * @return {Boolean} true Confirms removal
 */
EventDispatcher.prototype.shift = function(){ //attend the inqueue
	for (var i=0; i<this.inqueue.length; i++)
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

/**
 * @method run
 *
 * Drives the incoming message queue.
 *
 * @return {Boolean} true
 */
EventDispatcher.prototype.run = function(){
	return shift.apply(this, arguments)
}
/**
 * Event to message mapper.
 *
 * @author Txema
 */

/*
 * lluvia devices run in the processor/s time/s, events occur in real time. Gates map
 * human/HTML events to message system dynamics.
 */


function _stitchWorlds(gate, solicitor){
	return function(e){
		e = e || window.event
		try{
		 return gate[solicitor](e, this)
		} catch (err) {
			Exception.parse(err) }
	}
}

/**
 * @class Engine.Gate
 *
 * A Gate is a lluvia (javascript) wrapper for html elements. They're conceived
 * to respond to html events keeping the object scope.
 *
 * @param {String | HTMLElement} [element] (optional) HTML Element to wrap.
 * @param {String | HTMLElement} [parent]  (optional) HTML container to place the Gate.
 * @param {Object}               [config]  (optional) Action responders.
 *
 * ### Example
 *
 * Given this HTML:
 *
 *     <div id="button_bar">&nbsp;</div>
 *
 * We write:
 *
 *     var brush_button = new Gate("brush_btn", "button_bar")
 *
 * That generates a div with id "brush_btn" and a javascript object that will respond to
 * every html event whenever it defines the corresponding handler.
 *
 * Don't use this class directly, but subclassify it preferently as in the following example.
 *
 * ### Usage
 *
 *     Button.prototype = new Gate
 *     Button.prototype.constructor = Button
 *
 *     function Button(element){
 *
 *		try {
 *			if (arguments.length)
 *				Gate.call(this, element)	// Call to the super constructor (it does all the work).
 *		} catch (e) {
 *			if ($K_debug_level >= $KC_dl.DEVELOPER)
 *				alert("No event handlers were found.\nException: " + e.toSource())
 *		}
 *     }
 *
 *     Button.prototype.do_onclick   = function(event, element){
 *		alert("You have made click.")
 *     }
 *
 * ### Example
 *
 *     var b = new Button(id_of_html_element, null, {
 *         do_onmouseover: function(event, element) {
 *             alert("Hello")
 *         }
 *     })
 */
function Gate(element, parent, config){
    var that = this
    var args = arguments

    function initialize(){
	if (element){
	    if (typeof(element) === "string")
		if (document.getElementById(element))
		    element = document.getElementById(element)
	    else{
		var element_name = element
		element = document.createElement("div")
		element.setAttribute('id', element_name)
		if (parent){
		    if (typeof (parent) === "string" )
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

	that.keys(/do_.*/).each(function(handler){
        handler.match( /do_(.*)/ )
        that.panel[RegExp.$1] = _stitchWorlds(that, handler)
	})

	that.threads = []

    }

    if (arguments.length)
	initialize()
}

Gate.prototype.listen = function(event, handler){
    this.panel[event] = _stitchWorlds(this, handler)
}
//getCanvas not finish yet
Gate.prototype.getCanvas = function(){ return this.panel.lastChild; } // This is wrong

Gate.prototype.applySkin = function(skin){
    var div = document.createElement("div")
    div.setAttribute("class", skin)
    this.panel.appendChild(div)
}

/**
 * @method run
 * @private
 *
 * Animates all the threads that depends on this gate.
 * A gate is supposed to have threads in order to generate animations -Effects.
 */
Gate.prototype.run = function(now, before){
    for (var i=0; i<this.threads.length; i++)
    this.threads[i].run(now, before)
}

/**
 * @method new_effect
 *
 * Registers a new effect for the Gate. An effect is a ThreadAutomata used to handle
 * the gate html element (body of the gate) creating visual effects.
 *
 * @param {ThreadAutomata} eff  Visual effect to handle the div of the Gate.
 *
 * @return {Object}  ThreadAutomata created.
 */
Gate.prototype.new_effect = function(eff){
    this.threads.push(eff)
    return eff
}
/**
 * @author txema
 */
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

// Returns all the object/proxies with a given interface
Lookup.prototype.get = function(interfc){
	var objects = []
	for (var i=0; i<this.global.length; i++)
		if (interfc.isPrototypeOf(this.global[i]))
			if (this.global[i].lookupGet)
				objects.push(this.global[i].lookupGet())
			else
				objects.push(this.global[i])
}

// Return and eliminate an object
Lookup.prototype.off = function(object){
	for (var i=0; i<this.global.length; i++)
		if (this.global[i] == object)
			this.global.splice(i,1);
}
/**
 * @author txema
 */

/* Example event 
{
    "sync": {	type    : "synchronous",           // Message type
	name: "app_down",
	creation: {creator: null, time: null},     // Reference to creator object and creation time
	current : 0,                               // Index of current status.
	status  : ["sent", "attended", "closed"]}, // Valid object status
	event   : {
	    "app_down": null                       // Inner data specific to the particular event
	}
	this.rId = null;                           // Inqueue assigned id
}
*/

var systemEv = (function(){


    return (function $_sev(type, event, behalf){
	var args = arguments
	function setup(){
	    var sEvs = {
		"sync": {	type    : "synchronous",					// Message type
		    name	: null,
		    creation: {creator: null, time: null},		// Reference to creator object and creation time
		    current : 0,								// Index of current status.
		    status  : ["sent", "attended", "closed"],	// Valid object status
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

/**
 * Syntax:
 *
 * SystemEv(type_of_message, {name: message_name, data: extra_data}[, creator_reference] [, setup_function] )
 *
 * You can provide an specific setup function for a particular message
 *
 * Example of use:
 *
 * alert(systemEv("sync", {name: "activated", data: "no extra data available"}).toSource())
 *
 * systemEv("sync", {name: "activated", data: "no extra data available"}, function(p){alert(p.toSource());})
 *
 * systemEv("sync", {name: "activated", data: "no extra data available"}, new Date(), function(p){alert(p.toSource());})
 *
 systemEv( "sync", {name: "activated", data: "no extra data available"},
 new Date(),
 function(msg){
 msg.event["activated"].data = "this is an activation message";
 alert(msg.toSource());
 }
 )
 */


function navigator_version() { return navigator.appVersion }

function is_firefox(ffversion){
	ffversion = ffversion || ""
	return navigator.userAgent.toLowerCase().indexOf('firefox/'+ffversion) > -1;
}/**
 * @class CodeBlockFinder
 *
 * Pushdown Automaton for identifying code blocks
 *
 * @param {String} snippet A text containing the code block to search for.
 * @param {(Number | String | RegExp)} [start_after] First point to start looking at.
 * @param {Object} [delimiter] Code block delimiters
 * @param {String} delimiter.open  One character string to open code blocks
 * @param {string} delimiter.close One character strint to close code blocks
 *
 * **Note:** When delimiter is larger than one character then tokenization is 
 * required.
 *
 *    ###Example:
 *    var code = "for {var i=0; i<3; i++){      \n\
 *                   alert("hello " + i)        \n\
 *                 }                            \n\
 *                                              \n\
 *                 function name(){             \n\
 *                   function inner_function(){ \n\
 *                     ;                        \n\
 *                     }                        \n\
 *                    ;                         \n\
 *                 }                            \n\
 *                                              \n\
 *                 function main(){;}              "
 *    (new CodeBlockFinder(code, /function\s+name/))
 */

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
    
    this.source    = snippet + " " // Ensure last char is readed
    this.reset()
}

CodeBlockFinder.States  = new Enumeration("searching", "scanning", "ended")

/**
 * Reset the finite state Machine
 * 
 * @return {void} 
 */
CodeBlockFinder.prototype.reset = function(){
	this.initial    = this.search_start
    this.final      = this.search_start
    this.status     = CodeBlockFinder.States.searching
    this.delimiter  = this.delimiters.open  
    this.nested     = 0
    this.lines_read = 0
}

/**
 * Start the Pushdown Automaton
 * 
 * @return {String} Returns a complete code block.
 */
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

/**
 * Extract params of a function call. 
 *
 * Given a string of comma separated parameters:
 *
 * Let a function call be:
 * 
 *    add(2, 3)
 *
 * the string of params,
 * 
 *    "2, 3"
 *
 * this method split params.
 * 
 * @param  {string} string_of_params list of comma separated parameters.
 * @return {array}                   list of parameters
 *
 *    ###Example
 *    
 *    CodeBlockFinder.parse_params( "2, 3, a + 2 * b / 5, function(a, b){\n\
 *                            var j = 0 \n\
 *                            for (var i=0; i<3; i++, j+=2*i % 3);
 *                        })
 *    // => ["2", "3", "a+2*b/5", "function(a, b){ ... }"]
 */
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

        /* Count commas (lines) inside parameters and function body */
        var closure_param = new CodeBlockFinder(possible_param.slice(i).join(','), /function/, {open: '(', close: ')'}, ',')
        closure_param.start()
        var delta = closure_param.lines_read 
        /* Count commas inside function body */

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
/**
 * Fetch or create an HTML Element
 * 
 * @param {string|HTMLElement} html_element  id string or HTMLElement 
 * @param {boolean} [create=false]      when true, the a new HTML element will be created if not found.
 */
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
}/**
 * @class JavascriptSource
 *
 * Reads a Javascript Source code f.ile as text
 * 
 * @param {String} file_name Full url of the source file
 */
function JavascriptSource (file_name) {
	
	this.file_name = file_name
	this.source = JavascriptSource.read(file_name)
	this.lines = this.source.split("\n")
	JavascriptSource.read_files[file_name] = this
}

/**
 * Fetch one line of code as it was typed
 * 
 * @param  {Number} line_number in the source file
 * @return {String}             The text in that line.
 */
JavascriptSource.prototype.line = function(line_number){ 
	return this.lines[line_number-1]
}

/**
 * Get the Array of lines starting at a particular line number.
 * 
 * @param  {Number} start Starting line
 * @param  {Number} end   Ending line
 * @return {Array}        The source code starting at _line_number_
 */
JavascriptSource.prototype.lines_from = function(start, end){
	start = start || 0
	end   = end   || this.lines.length
	return this.lines.slice(start, end)
}

/**
 * Get all the lines, as text, starting at a particular line number.
 * @param  {Number} line_number Starting line
 * @param  {Number} end_line    Ending line
 * @return {String}       The source code starting at _line_number_
 */
JavascriptSource.prototype.code_from = function(line_number, end_line){
	return this.lines_from.apply(this, arguments).join("\n")
}

/**
 * Already read files.
 * @property {Object} Hash with already read files.
 * @static
 */
JavascriptSource.read_files = {}

/**
 * AJAX reading of a file
 * @param  {String} file_name 
 * @return {String}           Text of given file
 */
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
}/**
 * @class $Logger
 * Logger class. Creates a logger object attached to an HTML element
 *
 * 
 * @param  {string | HTMLElement} html_element HTMLElemnt or id of the output panel.
 * @param  {string} [severity="TESTING"] (see $Logger#log)
 * @return {Object}              The logger object
 */
function $Logger(html_element, severity){
	this.panel    = get_HTML_element(html_element || "ll_logger")
	this.severity = severity || "TESTING"
	this.logs     = []
}

/**
 * Writes a message into the log.
 * 
 * @param  {string} message  
 * @param  {string} severity One of: USER, PROGRAMMER, TESTING, INNERWORKING (see $KC_dl keys in ll_Kernel) 
 * @return {[type]}          [description]
 */
$Logger.prototype.log = function(message, severity){
	severity = severity || this.severity

	if ($K_debug_level >= $KC_dl[severity]){
		this.panel.innerHTML = "[" + new Date().toLocaleTimeString() + "]:" + severity + ": " + 
		                       message + "<br/>\n" + this.panel.innerHTML
		this.logs.push(message)
	}
}
/**
 * @classDescription Creates an angular magnitude.
 *
 * @param  {}
 * @return {Angle}
 * @constructor
 */
Angle.prototype.constructor = Angle
Angle.mode = "rad"  // This is a representational feature. Internally always rad.
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

/* Class Methods */

Angle.to_deg = function (angle){
  if (! (angle instanceof Angle) )
    angle = new Angle(angle)
  return angle.value() * 180 / Math.PI
}

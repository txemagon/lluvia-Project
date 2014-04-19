if (typeof Object.extend !== 'function') {
    Object.extend = function (o) {
        function $F() {}
        $F.prototype = o;
        return new $F();
    };
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



Object.prototype.toSource = function(sp){
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


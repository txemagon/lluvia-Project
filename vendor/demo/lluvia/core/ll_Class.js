var $classes = {}

function $import(module){
    // ## Module is an object or a String?. What anout nested resources?
    function atomic_import(name){
        if (module[name] instanceof Function) 
            this[name] = module[name].bind(this)
        else 
            this[name] = moudle[name]
    }
    
    if (arguments.length == 1) 
        for (var name in module) 
            atomic_import(name)
    else 
        for (var i = 1; i < arguments.length; i++) 
            atomic_import(arguments[i])
}

function $Class(object){
	// Attributes
	this.$name = object.$name || null;
	this.$type = object.$type || "class"
	this.$self = object.$self || null;
	this.$super = object.$super || [];
	this.$mixin = object.$mixin || [];
	this.before_filter = object.before_filter || [];
	this.after_filter = object.after_filter || [];
	
	// Methods
	
	
	this.send = function(method){
		var args = []
		for (var i = 1; i < arguments.length; i++) 
			args.push(arguments[i])

		var length = this.before_filter.length
		
		if (this[method])
			this[method](args)
		else if (this.$mixin[method]) 
			this.$mixin[method](args)
		else 
			this.method_missing.apply( this, arguments)
		length = this.after_filter.length
		for (var i = 0; i < length; i++) 
			this.after_filter[i](arguments);
			
	}
	
	this.method_missing = function(){
		var method = arguments[0] || null
		var error = new Error()
		error.name = "Method missing"
		error.message = "Method" + (method ? (": " + method) : " ") + " wasn't found"
		var where = " " + (this.$name || "Object")
		if (!(this instanceof Function)) 
			where += "::" + (this.$super.$name || "Class")
		throw (error)
	}
	
	this.add_before_filter = function(filter){
		this.before_filter.push(filter)
	}
	
	this.add_after_filter = function(filter){
		this.after_filter.push(filter)
	};
	
	this.remove_before_filter = function(filter){
		var length = this.before_filter.length
		for (var i = 0; i < length; i++) 
			if (filter.toString() == this.before_filter[i].toString()) 
				this.before_filter.splice(i, 1);
	}
	
	this.remove_after_filter = function(filter){
		var length = this.after_filter.length
		for (var i = 0; i < length; i++) 
			if (filter.toString() == this.after_filter[i].toString()) 
				this.after_filter.splice(i, 1);
	}
	
	this.$import = $import
	
	this.extend = function(){
		for (var i = 0; i < arguments.length; i++) {
			this.$super.unshift(arguments[i]);
			Class(arguments[i])
		}
	}
	
	
	
}

function Class(_class){

    var _class_parts = {
        s_method: [],
        bi_method: [],
        i_method: [],
        s_attribute: [],
        bi_attribute: []
    }
    
    
    function _sieve_methods(prefix){
        prefix = prefix || ""
        if (prefix == "i_") 
            prefix = ""
        var s_methods = null;
        if (_class_as_text) {
        
            // Analize static members and build the static object
            try {
                var _a_static_function = new RegExp("\\b(?:var\\s+|this\.)?\\b" + prefix + "[A-Za-z_]\\w+\\s*=\\s*function[\\s*\\(][^\\)]*\\)\\s*\\{", "g")
                s_methods = _class_as_text.match(_a_static_function)
                if (s_methods) {
                    var _m_length = s_methods.length
                    for (var i = 1; i <= _m_length; i++) {
                        var _m_beg = _class_as_text.indexOf(s_methods[_m_length - i])
                        var _m_end = _m_beg;
                        do {
                            _m_end++
                        }
                        while (_class_as_text[_m_end] != '{')
                        var _inner_functions = 0
                        do {
                            if (_class_as_text[_m_end] == '{') 
                                _inner_functions++
                            if (_class_as_text[_m_end] == '}') 
                                _inner_functions--
                            _m_end++
                        }
                        while (_inner_functions > 0)
                        s_methods[_m_length - i] = _class_as_text.substring(_m_beg, _m_end)
                        _class_as_text = _class_as_text.substring(0, _m_beg) + _class_as_text.substring(_m_end + 1)
                    }
                }
            } 
            catch (e) {
                if ($K_debug_level >= $KC_dl.PROGRAMMER) 
                    alert("Error:" + e.toString() + ", while parsing your \n\n\tClass: " + class_name + "\tPrefix: " + prefix)
            }
        }
        
        if (prefix == "") 
            prefix = "i_"
        
        if (s_methods) 
			for (var i = 0; i < s_methods.length; i++) 
				_class_parts[prefix + "method"].push(s_methods[i])        
        
    }
    
    function _sieve_attributes(prefix){
        prefix = prefix || ""
        if (prefix == "i_") 
            prefix = ""
        var s_attributes = _class_as_text.match(new RegExp("\\b(?:var\\s+|this\.)?\\b" + prefix + "[A-Za-z_].*", "g"))
        if (s_attributes) {
            var _a_length = s_attributes.length
            for (var i = 1; i <= _a_length; i++) {
                var _a_beg = _class_as_text.indexOf(s_attributes[_a_length - i]);
                try {
                    _class_as_text = _class_as_text.substring(0, _a_beg) +
                    _class_as_text.substring(_a_beg + s_attributes[_a_length - i].length + 1)
                } 
                catch (e) {
                    if ($K_debug_level >= $KC_dl.PROGRAMMER) 
                        alert(e + ", while sieving attributes")
                }
            }
            
            if (prefix == "") 
                prefix = "i_"
            
            
            for (var i = 0; i < s_attributes.length; i++) 
                _class_parts[prefix + "attribute"].push(s_attributes[i])
        }
    }
    
    function _get_class_name(){
        var _class_name
        try {
            _class_name = _class_as_text.match(/^function\s+(.+)\(/)[1]
			_class_as_text = _class_as_text.replace(new RegExp(_class_name), "")
        } 
        catch (e) {
            _class_name = "Anonymous"
        }
        return _class_name
    }
	
	function prototype_v_insert(src_str_arr){
		for (var i = 0; i < src_str_arr.length; i++) {
	  		var match = src_str_arr[i].match(/(?:var\s+|this\.)?._([A-Za-z_].*)\s*=\s*((?:.*\n*)*)$/)
			if (RegExp.$1 && RegExp.$2)
	  			_class_level.prototype[RegExp.$1] = eval(RegExp.$2)
	  }
	}
	
	function prototype_m_insert(src_str_arr){
		for (var i = 0; i < src_str_arr.length; i++) {
	  		var match = src_str_arr[i].match(/(?:var\s+|this\.)?._([A-Za-z_].*)\s*=\s*(function(?:.*\n*)*)$/)
			if (RegExp.$1 && RegExp.$2){
				var fn_name = RegExp.$1
				var fn_body = RegExp.$2
				fn_name = fn_name.replace(/[\s\t\n]*/g, "")
				eval("var fn = " + fn_body)
	  			_class_level.prototype[fn_name] = fn
			}

	  }
	}
	
	function method_insert(src_str_arr){
		for (var i = 0; i < src_str_arr.length; i++){
			var match = src_str_arr[i].match(/(?:var\s+|this\.)?(.*)\s*=\s*(function(?:.*\n*)*)$/)
			if (RegExp.$1 && RegExp.$2) {
				var fn_name = RegExp.$1
				var fn_body = RegExp.$2
				fn_name = fn_name.replace(/[\s\t\n]*/g, "")
				eval("var fn = " + fn_body)
	  			_new_class.prototype[fn_name] = fn
			}
	  }
		
	}
    
	function initialize(){
		return function (src){
			try {
				eval(src)
			} catch (e){
				if ($K_debug_level >= $KC_dl.PROGRAMMER)
					alert( "Parsing Error while initializing " + class_name + ".\n\n " + e.toString())
				if ($K_debug_level >= $KC_dl.TESTING)
					alert(src)
			}
		}
	}

	function init_code(){
		var init_str
		init_str = _class_parts.rest.replace(/\bfunction\s*.*\{/, "")
		init_str = init_str.substring(0,init_str.lastIndexOf("}") )
		init_str = init_str.replace(/[\n]+/g, "\n")
		
		return init_str
	}

    var open_class
    if (_class) {
		var class_name
		var _class_as_text
		if (_class instanceof String) 
			class_name = _class
		else {
			_class_as_text = _class.toString();
			_class_as_text = _class_as_text.replace(/\br_([a-zA-Z_].*)\(\b/g, "send( \"$1\", ")
			class_name = _get_class_name()
		}
		if ($classes[class_name]) 
			open_class = $classes[class_name]
		else {
			if (_class instanceof Function) {
			
				for (var part in _class_parts) {
					/(.*_)(.*)/.exec(part)
					eval("_sieve_" + RegExp.$2 + "s('" + RegExp.$1 + "')")
				}
				_class_parts.rest = _class_as_text
				
				_class.class_name = class_name;
				_class.type = "class"
			}
			
			var _class_level = new Function()
			_class_level.prototype = new $Class({
				$name: class_name,
				$type: "class"
			})
			
			
			prototype_v_insert(_class_parts.s_attribute)
			prototype_m_insert(_class_parts.s_method)
			
			var _new_class
			eval(class_name + " = " + _class_parts.rest)
			eval("_new_class = " + class_name)
			_new_class.prototype = new _class_level
			method_insert(_class_parts.i_method)
			
			if (!/anonymous/i.test(class_name))
				$classes[class_name] = _new_class
			
		}
		return $classes[class_name]
	}
	else 
		if ($K_debug_level >= $KC_dl.PROGRAMMER) 
			alert("Error raised in the Class Factory:\n\n You need to provide a class to operate.");
}



/**
 * @class Kernel.CoreExt.Object
 * Extends Javascript Native Object class.
 *
 *
 *  Note: Extending Object's prototype will address you
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



// Conflicts with ECMAScript 5
// if (typeof Object.extend !== 'function') {
//     Object.extend = function (o) {
// 	function $F() {}
// 	$F.prototype = o;
// 	return new $F();
//     };
// }

/**
 * @method to_a
 * Returns this object inside an array.
 *
 * ## Example
 *
 *    var a = { name: "superman" }
 *    a.to_a()
 *    // => [{ name: "superman" }]
 *
 * @return {Array}
 */
Object.prototype.to_a = function() {
    return [this]
}


/**
 * @method rip_array
 * @static
 * Creates a new Array extracting the integer keys of an object.
 *
 * ### Example
 *
 *     var a = {
 *         name: "John",
 *         1: "first son",
 *         2: "daughter"
 *     }
 *
 *     var b = Array.rip_array(a)
 *     //=> [undefined, "first son", "daughter"]
 *
 * Even though Array.rip_array would be a better design, Array is not extensible.
 *
 * @param  {Object} object Model to rip numeric keys from.
 * @return {Array}        New Array
 */
Object.prototype.rip_array = function(object) {
    var res = []

    for (var i in object)
        if (parseInt(i))
            res[parseInt(i)] = object[i]

    return res
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
Object.prototype.alias = function(alias_name, original_method) {
    this[alias_name] = function() {
        return this[original_method].apply(this, arguments)
    }

    if (!this.propertyIsEnumerable(original_method))
        this.stop_enumerating(alias_name)
}

Object._$NUM_ERR = 0.000001

/**
 * @method inspect
 * Shows an object pretty printed. Is an improved version of toSource()
 *
 * @param {Array} sp Used to add information recursively by calling Object#inspect on inner elements.
 * @return {String}
 */
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

/**
 * @method keys
 * Yields all the accesible attributes of an object.
 *
 * ### Example
 *
 *    function Arachnid() {
 *       this.limbs = 8
 *       this.lips  = false
 *       this.lap   = true
 *    }
 *
 *    Tarantula.prototype = new Arachnid
 *    Tarantula.prototype.constructor = Tarantula
 *    function Tarantula() {
 *       this.poisson = true
 *    }
 *
 *    var venom = new Tarantula()
 *    venom.keys()
 *    // => ["poisson", "lap", "lips", "limbs"]
 *
 * A regular expression is accepted to filter output.
 *
 * ### Example
 *
 *     venom.keys(/^l.*s$/)
 *     // => ["lips", "limbs"]
 *
 * @param {RegExp} re A regular expression to filter output.
 * @return {Array} An array with the keys of the object.
 */
Object.prototype.keys = function(re) {
    var the_keys = []
    for (var i in this)
        if (!re || re.test(i))
            if (i !== "keys")
                the_keys.push(i)
    return the_keys
}


/**
 * @method self_keys
 * Return the attributes defined in this object. This method excludes further seeking via
 * the prototype chain. See Object#keys for usage.
 *
 * @param {RegExp} re A Regular Expression to filter output.
 * @return
 */
Object.prototype.self_keys = function(re) {
    var the_keys = []
    for (var i in this)
        if (!re || re.test(i))
            if (i !== "keys" && this.hasOwnProperty(i))
                the_keys.push(i)
    return the_keys
}


/**
 * @method clone
 * Shallow copy of an object.
 *
 * #Example
 *
 *     var me = new Person()
 *     var one = {first: 1, second: me }
 *     var two = one.clone()
 *     // => { first: 1, second: me }
 *
 * Notice that changing two.second affects one.second as long as they're
 * pointers to the same object.
 *
 * @return {Object} Shallow copy of the given object.
 */
Object.prototype.clone = function() {
    var the_clone = {}
    for (var i in this)
        the_clone[i] = this[i]
    return the_clone
}

/**
 * @method _$innerObject
 * Class augmentation. Creates a constructor based on another. This let us
 * to add extra attributes.
 *
 * ### Example
 *
 * Godman inherits from Device
 *
 *  Godman calls the Device contructor that executes:
 *
 *      this.openDevice    = _$innerObject(this, "device")
 *  So for _$innerObject:
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


/**
 * @method implement
 * Defines all the interface mentods in a object
 *
 * @param iface
 * @param obj
 * @return
 */
function implement(iface, obj) {
    if (iface.iface)
        for (var i in iface.iface)
            obj.prototype[i] = iface.iface[i]
}

/* Warning this are static methods */
Object.prototype.tainted = false
Object.prototype._trust = true
/* Carefull ECMAScript 5 defines similar freeze */
Object.prototype._FROZEN = false

/**
 * @method taint
 * Marks an object as tainted.
 *
 */
Object.prototype.taint = function() {
    this.tainted = true
}

/**
 * @method untaint
 * Removes the tainted mark from an object.
 *
 */
Object.prototype.untaint = function() {
    this.tainted = false
}

/**
 * @method tainted$U
 * tainted predicate.
 *
 * @return {Boolean}
 */
Object.prototype.tainted$U = function() {
    return !this.tainted
}

/**
 * @method trust
 * Set an object as trustable.
 *
 */
Object.prototype.trust = function() {
    this._trust = true
}

/**
 * @method untrust
 * Mark an object as untrustable.
 *
 */
Object.prototype.untrust = function() {
    this._trust = false
}

/**
 * @method untrusted$U
 * trustable predicate.
 *
 * @return {Boolean}
 */
Object.prototype.untrusted$U = function() {
    return !this._trust
}

Object.prototype.trusted$U = function() {
    return this._trust
}

/**
 * @method freeze
 * @deprecated
 * Mark an object as frozen.
 *
 */
Object.prototype.freeze = function() {
    this._FROZEN = true
}

/**
 * @method frozen$U
 * @deprecated
 * Frozen predicate
 *
 * @return {Boolean}
 *
 */
Object.prototype.frozen$U = function() {
    return this._FROZEN || false
}

/**
 * @method respond_to
 * Checks for the existence of a method. Use it
 * for Duck typing.
 *
 * @param function_name
 * @return
 */
Object.prototype.respond_to = function(function_name) {
    return typeof(this[function_name]) === "function"
}
/**
 * @method respond_to$U
 * Alias of Object#respond_to
 */
Object.prototype.alias("respond_to$U", "respond_to")

/**
 * @method eql$U
 * Compares two objects. Returns true when Object#toSource() is the same on both
 * objects.
 *
 * @param model
 * @return
 */
Object.prototype.eql$U = function(model) {
    if (typeof(model) === "undefined")
        return false

    /* End of support */
    return model.toSource() == this.toSource()
}


/**
 * @method equals
 * Alias of ==
 *
 * @param model
 * @return
 */
Object.prototype.equals = function(model) {
    return this == model
}

// Object.prototype.eql$U = function(model){
//     return this.equals(model)
// }

/**
 * @method value_of
 * Gets the inner value of an object whenever is possible.  If not a
 * Object#toSource() representation is taken.
 *
 * @return {Object} Best representation for an object.
 */
Object.prototype.value_of = function() {
    if (this.respond_to("valueOf"))
        return this.valueOf()
    return this.toSource()
}

/**
 * @method identic
 * Check if the best representation of two objects are identical.
 *
 * @param model
 * @return
 */
Object.prototype.identic = function(model) {
    if (model.respond_to("valueOf"))
        return this.value_of() == model.valueOf()
    return this === model
}

/**
 * @method to_s
 * Object#toString alias
 *
 * @return
 */
Object.prototype.to_s = function() {
    return this.toString()
}

/**
 * @method to_str
 * Object#to_s alias.
 *
 * @return
 */
Object.prototype.to_str = function() {
    return this.to_s()
}

/**
 * @method is_a$U
 *
 * Check if an object is descendant of a class
 *
 * ### Example
 *
 * Imagine that line inhetits from Shape.
 *
 *     var l = new Line()
 *     l.is_a$U(Shape)
 *     // => true
 *
 * @param {Function} clss Class to check belonging
 * @return {Boolean}
 */

Object.prototype.is_a$U = function(clss) {
    return this instanceof clss
}

/**
 * @method kind_of$U
 * Object#is_a$U alias.
 *
 * @return
 */
Object.prototype.alias("kind_of$U", "is_a$U")

/**
 * @method instance_of$U
 * Object#is_a$U alias.
 *
 * @return
 */
Object.prototype.alias("instance_of$U", "is_a$U")

/**
 * @method method_missing
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

/**
 * @method merge
 * Merges all the self keys of an object _source_ whith this.
 * This method is actually a bang method. Further discussion is needed.
 *
 * Shall we merge only self keys?
 * Aren't self_keys part of a behaviour to enjail in Hash?
 * Shall we clone objects?
 *
 * @return
 */
Object.prototype.merge = function(source) {
    if (!source.respond_to$U("self_keys"))
        throw "Invalid source. Impossible to merge."
    var that = this
    source.self_keys().each(function(key) {
        that[key] = source[key]
    })
    return this
}

/**
 * @method soft_merge
 * Works as Object#merge, but source can not override already
 * existing keys.
 *
 * @param {Object} source Object to read from.
 * @return
 */
Object.prototype.soft_merge = function(source) {
    if (!source.respond_to$U("self_keys"))
        throw "Invalid source. Impossible to merge."
    var that = this
    source.self_keys().each(function(key) {
        that[key] = that[key] || source[key]
    })
    return this
}

/**
 * @method override
 * Works as Object#merge but cannot augment this object.
 *
 * @param {Object} source Object to read from.
 * @return
 */
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

/**
 * @method stop_enumeratng
 * Make a property not enumerable.
 *
 * @param  {String | Array } methods List of methods/properties to be hidden.
 */
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

/**
 * @method reflect
 * Creates a bang version of a given method. It reflects the response changes over
 * the _this_ object.
 *
 * @return
 */
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

/**
 * @method merge$B
 * See Object#merge
 */

/**
 * @method soft_merge$B
 * See Object#soft_merge
 */

/**
 * @method override$B
 * See Object#override
 */
Object.bang_methods = ["merge", "soft_merge", "override"]
Object.reflect(Object.bang_methods)


/**
 * @method own_keys
 * Alias of Object#self_keys
 */
Object.prototype.alias("own_keys", "self_keys")

/* Non enumerable properties */

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
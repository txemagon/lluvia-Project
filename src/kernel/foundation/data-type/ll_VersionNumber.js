/**
 * @class  Kernel.Foundation.DataType.VersionNumber
 * Creates a class to manage version numbers. For instance: "2.3.5" or "5.7.10.9".
 *
 *
 * ## Inner Structure
 *
 *     new VersionNumber("2.3.5")
 *     //=> {2: {3: {5: {}}}}
 *
 * Notice that the above inline objects ( {} ) are instances of new VersionNumber too.
 *
 * Default actions can be obtained via #branch. See Hack section.
 *
 * ## Extensions
 *
 * Adding keys to these objects is not recommended. Adding enumerable properties is
 * definitely not allowed. Use this extension capability to add branches. See #branch
 * for further information.
 *
 * ## Notice
 *
 * These are not decimal numbers, therefore:
 *
 *     "5.1" is different to "5.10"
 */

/**
 * @method constructor
 * Creates a VersionNumber object
 *
 * ### Example
 *
 *     new VersionNumber("1.2.3")
 *     new VersionNumber("1-2-3", "-")
 *
 * @param {String} initial_string Version number.
 * @param {String} [sep="."]            String to delimitate major minor and patch numbers.
 */
function VersionNumber(initial_string, sep) {
    if (!initial_string || initial_string == "")
        return
    Object.defineProperty(this, "sep", {
        value: sep || ".",
        enumerable: false
    })
    var coefficients = initial_string.split(this.sep)

    var last = this
    for (var i = 0; i < coefficients.length; i++)
        last[coefficients[i]] = (last = new VersionNumber())
}


/**
 * @method toString
 * Prints the version number.
 *
 * ### Example
 *
 *     var v = new VersionNumber("7.4.1")
 *     v.toString()
 *     //=> "7.4.1"
 *
 * @return {String} Printable version of VersionNumber objects.
 */
VersionNumber.prototype.toString = function() {
    var obj = this
    var text = ""
    var key = null

    while (key = Object.keys(obj)[0]) {
        text += key + "."
        obj = obj[key]
    }

    return text.replace(/.$/, "")
}


/**
 * @method number_value
 * Returns the numeric key of VersionNumber.
 *
 * ### Example
 *
 *     var a = new VersionNumber("1.5.2")
 *     a.era1 = new VersionNumber("2.7")
 *     //=> {
 *     //=>   1:    {5: {2: {}}},
 *     //=>   era1: {2: {7: {}}}
 *     //=> }
 *     a.number_value()
 *     //=> 1
 *
 * The era1 key is discarded. _number\_value_ will only return the first numeric key.
 *
 * @return {Number | undefined} Numeric key of this.
 */
VersionNumber.prototype.number_value = function() {
    for (var i in this)
        if (!isNaN(i))
            return parseInt(i)
}


/**
 * @method number
 * Returns the object associated with the numeric key of VersionNumber.
 *
 * ### Example
 *
 *     var a = new VersionNumber("1.5.2")
 *     a.era1 = new VersionNumber("2.7")
 *     //=> {
 *     //=>   1:    {5: {2: {}}},
 *     //=>   era1: {2: {7: {}}}
 *     //=> }
 *     a.number()
 *     //=> {5: {2: {}}}
 *
 * The era1 key is discarded. If two numeric keys are present, only the first
 * one will be taken into account.
 *
 * @return {Number | undefined} Value associated the numeric key.
 */
VersionNumber.prototype.number = function() {
    for (var i in this)
        if (!isNaN(i))
            return this[i]
}


/**
 * @method get
 * Returns the queried subelement.
 *
 * ### Example
 *
 *     var a = new VersionNumber("1.5.2")
 *     //=> {1: {5: {2: {}}}}
 *     a.get("1.5")
 *     //=> {2: {}}
 *
 * @param  {String | VersionNumber} version "1.5.3" or new VersionNumber("1.5.3") for instance.
 * @return {VersionNumber}         Reference to the object retrieved or null if not found.
 */
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


/**
 * @method last
 * Returns the last object.
 *
 * @return {VersionNumber}         Reference to last object retrieved.
 */
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


/**
 * @method last_value
 * Returns the last value
 *
 * @return {VersionNumber}         Last object key.
 */
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


/**
 * @method valueOf
 * Yields the las integer of the number as a number or the value itself.
 *
 * ### Example
 *
 *     var a = new VersionNumber("1.2.3")
 *     a.valueOf()
 *     //=> 3
 *
 *     a == 3
 *     //=> true
 *
 *     var a = new VersionNumber("1.2.a")
 *     a.valueOf()
 *     //=> "a"
 *
 * @return {Number | String}
 */
VersionNumber.prototype.valueOf = function() {
    var last = this.last_value()
    return parseInt(last) || last
}

/**
 * @method branch
 *
 * ## Syntax
 *
 *     VersionNumber#branch(level, (<label>[, version_number])+ )
 *     <label> ::= "name[:value]"
 *
 * When _value_ and _version\_number_ are present at the same time,
 * _version\_number_ overrides value.
 *
 * _version\_number_ is frequently an instance of VersionNumber but can
 * be anything but a string. When the value needs to be a string, convert
 * it to String object.
 *
 *
 * ### Example
 *
 *     var a = new VersionNumber("2.3.5")
 *     a.branch("", "era1")
 *     a.branch("2.3", "era1", "era2")
 *     a.branch("2.3", "era1", "era2:1.5.7")
 *     a.branch("2.3", "era1", "era2", new VersionNumber("1.5.3"), "era4")
 *
 * VersionNumber can be used as labels: Please be careful. It can lead you to errors.
 *
 *     a.branch("2.3", new VersionNumber("1.3"), function action(){} )
 *     //=> {
 *     //=>   2: {3: {}},
 *     //=>   "1.3": function action(){}
 *     //=> }
 *
 * The above example can drive you to mistake a["1.3"] as a is VersionNumber when it
 * actually isn't.
 *
 * ## Hack
 *
 * Notice that defining a key with the value returned by toString can drive
 * you to a default action.
 *
 * ### Example
 *
 *     var a = new VersionNumber("1.5.4")
 *     a.branch("", "1.5.4", function action() {
 *         alert("Hello")
 *     })
 *     a[a]()
 *
 * This example triggers a "Hello" alert. When a is used as an index of toString()
 * is automatically called, yielding the key of the function.
 *
 */
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


        this[parts[0]] = value
    }
}

/**
 * @method branches
 * Returns all the subbranches of a VersionNumber
 *
 * ### Example
 *
 * Let the VersionNumber, v, be:
 *
 *     //=> {
 *     //=>   1:    {5: {2: {}}},
 *     //=>   era1: {2: {7: {}}},
 *     //=>   era2: {2: {8: {}}}
 *     //=> }
 *     v.branches()
 *     //=> ["era1", "era2"]
 *
 * @return {Array} Branches (non numeric keys) of a level in a VersionNumber object.
 */
VersionNumber.prototype.branches = function() {
    var response = []
    for (var i in this)
        if (isNaN(i) && this.hasOwnProperty(i))
            response.push(i)
    return response
}

/**
 * @method each
 * Calls the block for every numeric value in this VersionNumber object.
 *
 * ### Example
 *
 *     var a = new VersionNumber("1.5.9")
 *     //=> { 1: { 5: { 9: {}}} }
 *
 *     a.each( function(number, value_of_number, container){;} )
 *
 * In the first call param values are:
 *
 *     number          //=> 1
 *     value_of_number //=> { 5: { 9: {}}}
 *     container       //=> { 1: { 5: { 9: {}}} }
 *
 *
 * @param  {function(Number,Object, Object)}      block Function block to be called.
 */
VersionNumber.prototype.each = function(block) {
    if (!block || typeof(block) !== "function")
        return
    var obj = this.number()
    if (obj)
        block(this.number_value(), obj, this)
    if ("each" in obj && typeof(obj.each) === "function")
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
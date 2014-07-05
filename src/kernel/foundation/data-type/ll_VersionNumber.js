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
        last[coefficients[i]] = (last = {})
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
 * @method get
 * Returns the queried subelement.
 *
 * @param  {String | VersionNumber} version "1.5.3" or new VersionNumber("1.5.3") for instance.
 * @return {VersionNumber}         Reference to the object retrieved or null if not found.
 */
VersionNumber.prototype.get = function(version) {
    var found = null
    var obj = this
    while (!found && (key = Object.keys(obj)[0])) {
        if (key && obj.toString() == version.toString())
            found = obj
        obj = obj[key]
    }
    return found
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
 * ### Example
 *
 *     var a = new VersionNumber("2.3.5")
 *
 *
 * @return {[type]} [description]
 */
VersionNumber.prototype.branch = function() {

}

/**
 * @method values
 * Returns all the subvalues of a VersionNumber
 *
 * @return {[type]} [description]
 */
VersionNumber.prototype.values = function() {

}

VersionNumber.stop_enum = function(method) {
    for (var i = 0; i < method.length; i++)
        Object.defineProperty(VersionNumber.prototype, method[i], {
            value: VersionNumber.prototype[method[i]],
            enumerable: false
        })
}

VersionNumber.stop_enum(["toString", "valueOf", "values", "get", "last", "last_value", "branch"])
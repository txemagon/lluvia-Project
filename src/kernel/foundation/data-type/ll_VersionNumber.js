/**
 * @class  Kernel.Foundation.DataType.VersionNumber
 * Creates a class to manage version numbers. For instance: "2.3.5" or "5.7.10.9".
 *
 * Adding keys to these objects is not recommended. Adding enumerable properties is
 * definitely not allowed.
 *
 * ### Inner Structure
 *
 *     new VersionNumber("2.3.5")
 *     //=> {2: {3: {5: {}}}}
 *
 * ### Notice
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
    var last = 0
    var obj = this
    while (key = Object.keys(obj)[0]) {
        obj = obj[key]
        if (key)
            last = key
    }

    return parseInt(last) || last
}


VersionNumber.stop_enum = function(method) {
    for (var i = 0; i < method.length; i++)
        Object.defineProperty(VersionNumber.prototype, method[i], {
            value: VersionNumber.prototype[method[i]],
            enumerable: false
        })
}

VersionNumber.stop_enum(["toString", "valueOf"])
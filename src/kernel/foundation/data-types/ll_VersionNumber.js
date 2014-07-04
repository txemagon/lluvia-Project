/**
 * @class  VersionNumber
 * Creates a class to manage version numbers. For instance: "2.3.5" or "5.7.10.9"
 *
 * ### Notice
 *
 *  "5.7.10.9" is different to "5.7.1.9"
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
    var coefficients = initial_string.split(sep)

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
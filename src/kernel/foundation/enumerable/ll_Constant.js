/**
 * @class Kernel.Foundation.Enumerable.Constant
 *
 * Defines Constants similar to C define preprocesor directives.
 *
 * ## Constant's structure
 *
 *     new Constant("euro", 166.386)
 *     //=> { name: "euro",
 *     //=>   euro: 166.386
 *     //=> }
 *
 * Only euro attribute is enumerable.
 *
 * ## Usage
 *
 *     var first = new Constant("Txema", 1101)
 *
 *     first == "Txema"
 *     //=> true
 *
 *     first.equals(1101)
 *     //=> true
 *
 * Constants are specially usefull as Array indexes.
 *
 *     var monday  = new Constant("monday", 0)
 *     var week_income = [1000, 2000, 3000, 500, 2000, 0, 0]
 *     week_income[monday]
 *     //=> 1000
 */


/**
 * @method constructor
 * Receives two parameters to set the constant value.
 *
 * @param {String} name string value
 * @param {Number} value number value
 */
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


/**
 * @method valueOf
 * Returns the value of the name of obj
 *
 * @return {string}
 */
Constant.prototype.valueOf = function() {
    return this.name
}


/**
 * @method toString
 * Returns an number.
 *
 * @return {Number}
 */
Constant.prototype.toString = function() {
    return this[this.name]
}


/**
 * @method equals
 * Returns true or false, if the name has that number.
 *
 * @return {Boolean}
 */
Constant.prototype.equals = function(obj) {
    return this[this.name] == obj
}

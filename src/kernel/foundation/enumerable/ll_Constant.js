
/**
 * @class
 *
 * { name: "pepe",
 *   pepe: 36 
 * }
 *
 */

/**
 * @method constructor
 * 
 * Receives two parameters to give a value to the constant.
 *
 * @param {String} Constant string value 
 * @param {Number} Constant number value
 *
 * var me = new Constant("pepe", 36)
 *
 * me == "pepe"
 * me.equals(36)
 *
 */
function Constant(name, value) {
    this[name] = value
    Object.defineProperty(this, "name", {
        value: name,
        enumerable: false
    })
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

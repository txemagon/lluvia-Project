/**
 * @class mathematics.geometry.VectorSystem
 * Creates a vector system as an array of anything that derives from Vector
 *
 */

VectorSystem.prototype = new Array
VectorSystem.prototype.constructor = VectorSystem
VectorSystem.super = Array

function VectorSystem(vectors) {
    for (var i = 0; i < arguments.length; i++)
        this.push(arguments[i])
}

VectorSystem.prototype.push = function(elements) {
    for (var i = 0; i < arguments.length; i++)
        if (arguments[i] instanceof Vector)
            Array.prototype.push.call(this, arguments[i])
        else
            throw ("VectorSystem#push: Invalid input.\n" + arguments[i] + " must be a Vector or derived from it")
}

/**
 * @method distribute$B
 * [description]
 *
 * @return {[]} [description]
 */
VectorSystem.prototype.distribute$B = function(op2) {
    throw "No a valid function for VectorSystem"
}

/**
 * @method map$B
 * [description]
 *
 * @return {[]} [description]
 */
VectorSystem.prototype.map$B = function(block) {
    for (var i = 0; i < this.length; i++)
        this[i].map$B(block)
    return this
}

/**
 * @method sort_by$B
 * [description]
 *
 * @return {[]} [description]
 */
VectorSystem.prototype.sort_by$B = function() {}

/**
 * @method uniq$B
 * [description]
 *
 * @return {[]} [description]
 */
VectorSystem.prototype.uniq$B = function() {}

/**
 * @method inject
 * [description]
 *
 * @return {[]} [description]
 */
VectorSystem.prototype.inject = function() {}

/**
 * @method inject_with_index
 * [description]
 *
 * @return {[]} [description]
 */
VectorSystem.prototype.inject_with_index = function() {}

/**
 * @method merge
 * [description]
 *
 * @return {[]} [description]
 */
VectorSystem.prototype.merge = function() {}

/**
 * @method splice
 * [description]
 *
 * @return {[]} [description]
 */
VectorSystem.prototype.splice = function() {}

/**
 * @method unshift
 * [description]
 *
 * @return {[]} [description]
 */
VectorSystem.prototype.unshift = function() {}
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
 * @method get_vectors
 *
 * @return {[type]} [description]
 */
VectorSystem.prototype.get_vectors = function() {
    var a = []
    for (var i = 0; i < this.length; i++)
        a.push(this[i].Coord)
    return a
}

//class that checks that everything that gets in and out of vectorSystem is a vector
VectorSystem.check_integrity = function() {}

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
 * Returns an array with the coordinates from the vectors of the vector system
 * modified by the block passed as parameter
 *
 * @param {Function} block Function to be used to modified the VectorSystem
 * @return {Array}
 */
VectorSystem.prototype.map$B = function(block) {
    var res = Array.prototype.map.apply(this, arguments)
    //res must only have vectors
    //erase elements from this (this.clear())
    return res
}

/**
 * @method uniq$B
 * [description]
 *
 * @return {[]} [description]
 */
VectorSystem.prototype.uniq$B = function() { //doesn't work yet
    var a = this.get_vectors()
    a.uniq$B()

    for (var i = 0; i < this.length; i++)
        this[i].Coord = a[i]
    return this
}

/**
 * @method inject
 * [description]
 *
 * @return {[]} [description]
 */
VectorSystem.prototype.inject = function(vec) {

}

/**
 * @method inject_with_index
 * [description]
 *
 * @return {[]} [description]
 */
VectorSystem.prototype.inject_with_index = function(arg) {

}

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
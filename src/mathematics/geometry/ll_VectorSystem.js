/**
 * @class mathematics.geometry.VectorSystem
 * Creates a vector system as an array of anything that derives from Vector
 *
 */

VectorSystem.prototype = new Array
VectorSystem.prototype.constructor = VectorSystem
VectorSystem.super = Array

function VectorSystem(vectors) {
    for (var i = 0; i < arguments.length; i++) {
        this.push(arguments[i])
    }

}

VectorSystem.prototype.push = function(elements) {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[0] instanceof Array) {
            for (var j = 0; j < arguments[0].length; j++) {
                if (arguments[0][j] instanceof Vector) {
                    Array.prototype.push.call(this, arguments[0][j])
                    //this.push(arguments[i][j])
                    //alert(arguments[i][j].toSource())
                }
            }
        }
        if (arguments[i] instanceof Vector)
            Array.prototype.push.call(this, arguments[i])
        else
            throw ("VectorSystem#push: Invalid input.\n" + arguments[i] + " must be a Vector or derived from it")
    }
}
/**
 * @method push_with_index
 * Pushed vectors into this according to a given position
 *
 * @return {VectorSystem} Returns this
 */
VectorSystem.prototype.push_with_index = function() {
    var new_index = []
    var args = []
    var position = 0
    var number = 0

    for (var i = 0; i < arguments.length; i++) {
        args[i] = arguments[i]
        if (typeof(arguments[i]) === "number") {
            position = args[i]
            number = i
        }
    }
    args.erase_at$B(number)

    for (var i = 0; i < position; i++)
        new_index[i] = this[i]

    for (var i = 0; i < args.length; i++)
        new_index[i + position] = args[i]

    for (var i = position; i < this.length; i++)
        new_index[i + args.length] = this[i]

    this.clear()

    VectorSystem.prototype.push.apply(this, new_index)

    return this
}

/**
 * @method to_a
 * Transforms the coordinates of all the vectors of the Vector System into an array
 *
 *
 * @return {Array}
 */
VectorSystem.prototype.to_a = function() {
    var a = []
    for (var i = 0; i < this.length; i++)
        a.push(this[i].Coord)
    return a
}

/**
 * @method check_integrity
 * @static
 * description
 *
 * @return {[type]} [description]
 */
VectorSystem.check_integrity = function() {
    //class that checks that everything that gets in and out of vectorSystem is a vector
    var a = true
    for (var i = 0; i < this.length; i++)
        if (!this[i] instanceof Vector)
            a = false
    return a
}

/**
 * @method distribute$B
 * Method not valid for VectorSystem. When called, throws an exception
 *
 */
VectorSystem.prototype.distribute$B = function(op2) {
    throw "No a valid function for VectorSystem"
}

/**
 * @method map$B
 * description
 *
 * @param {Function} block Function to be used to modified the VectorSystem
 * @return {Array}
 */
VectorSystem.prototype.map$B = function(block) {

    var res = Array.prototype.map.apply(this, arguments)
    this.clear()

    for (var i = 0; i < res.length; i++)
        this[i] = res[i]

    return this
}

/**
 * @method uniq$B
 * [description]
 *
 * @return {[]} [description]
 */
VectorSystem.prototype.uniq$B = function() { //doesn't work yet
    var a = this.to_a().flatten()
    //var uniq_a = Array.prototype.uniq$B(this, 0)
    //
    a.uniq$B(0)

    alert(a)

    for (var i = 0; i < this.length; i++)
        this[i] = a[i]
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

VectorSystem.check_integrity()
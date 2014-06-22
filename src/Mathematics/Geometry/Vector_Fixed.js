/**
 * @class FixedVector
 * Creates a vector fixed in a coordinates axis.
 *
 * @param  {foot}
 * @param  {free_vector}
 * @return {Vector}
 * @constructor
 */

FixedVector.prototype = new Vector
FixedVector.prototype.constructor = FixedVector
FixedVector.super = Vector


function FixedVector(free_vector, foot) {

    this.free_vector = free_vector || new Vector(0, 0)
    this.foot = foot || new Vector(0, 0)

    if (this.free_vector instanceof Array)
        this.free_vector = new Vector(free_vector)

    if (this.foot instanceof Array)
        this.foot = new Vector(foot)

    this.foot.standarize_coordinates(this.free_vector)

    Vector.call(this, this.free_vector)
    Vector.call(this, this.foot)

    Object.defineProperty(this, "_head", {
        value: this.foot.add(this.free_vector),
        enumerable: false
    })

}

/**
 * Gives the free vector of the given one
 *
 * @return {Vector} Returns the free vector
 */

FixedVector.prototype.freed = function() {
    return this.free_vector
}

/**
 * Tells if a vector is equal to the given one
 *
 * @return {Vector} Returns true if vectors are equal and false if not
 */
FixedVector.prototype.equals_to$U = function(vector_to_compare) {
    if (this.foot.eql$U(vector_to_compare.foot) && +this.free_vector.eql$U(vector_to_compare.free_vector))
        return true
    return false
}

/**
 * Adds one vector to another as long as the first's head equals the latter's foot
 *
 * @return {}
 */

FixedVector.prototype.add = function(vec) {
    if (this._head.eql$U(vec.foot)) {
        var new_free = this.free_vector.add(vec.free_vector)

        return new FixedVector(new_free, this.foot)

    } else
        throw ("Invalid operation for fixed vectors." +
            " First vector head must be equal to second's foot")
}

/**
 *
 *
 * @return {}
 */
FixedVector.prototype.add$B = function(vectAdd) {
    var vectRes = FixedVector.prototype.add.apply(this, arguments)
    this.cloneCoords(vectRes)

    //return vectRes

    var c = new Vector(vectRes)

    c.foot = vec.foot.add(vec)

    return new FixedVector(c, c.foot)
}

/**
 *
 *
 * @return {}
 */

FixedVector.prototype.subs = function(vec) {
    var new_free = this._head.subs(vec._head)
    var new_foot = vec._head

    return new FixedVector(new_free, new_foot)
}
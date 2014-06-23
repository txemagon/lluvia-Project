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

    free_vector = free_vector || new Vector(0, 0)
    this.foot = foot || new Vector(0, 0)

    if (free_vector instanceof Array)
        free_vector = new Vector(free_vector)

    if (this.foot instanceof Array)
        this.foot = new Vector(foot)

    this.foot.standarize_coordinates(free_vector)

    Vector.call(this, free_vector)

    Object.defineProperty(this, "_head", {
        value: this.foot.add(free_vector),
        enumerable: false
    })

}


/**
 * Tells if a vector is equal to the given one
 *
 * @return {Vector} Returns true if vectors are equal and false if not
 */
FixedVector.prototype.equals_to$U = function(vector_to_compare) {
    if (this.foot.eql$U(vector_to_compare.foot) && +this.eql$U(vector_to_compare))
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
        var aux = new Vector(this.Coord)
        var new_free = aux.add(vec.Coord)

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

FixedVector.prototype.subs = function(vec) {
    var new_free = this._head.subs(vec._head)
    var new_foot = vec._head

    return new FixedVector(new_free, new_foot)
}


/**
 * @class FixedVector
 * Creates a vector fixed in a coordinates axis.
 *
 * @param  {Array} input Array with a free vector and a foot
 * @return {Vector}
 * @constructor
 */

FixedVector.prototype = new Vector
FixedVector.prototype.constructor = FixedVector
FixedVector.super = Vector

function FixedVector(input) {
    if (!input)
        input = []

    var input_args = []
    for (var i = 0; i < input.length; i++)
        input_args[i] = input[i]

    free_vector = input_args[0] || new Vector(0, 0)
    this.foot = input_args[1] || new Vector(0, 0)

    if (free_vector instanceof Array)
        free_vector = new Vector(free_vector)

    if (this.foot instanceof Array)
        this.foot = new Vector(this.foot)

    this.foot.standarize_coordinates(free_vector)

    Vector.call(this, free_vector)

    Object.defineProperty(this, "_head", {
        value: this.foot.add(free_vector),
        enumerable: false
    })

}


/**
 * Tells if one vector equals the given one
 *
 * @return {Vector} Returns true if vectors are equal and false if not
 */
FixedVector.prototype.eql$U = function(vector_to_compare) {
    if (this.foot.eql$U(vector_to_compare.foot) && this.Coord.eql$U(vector_to_compare.Coord))
        return true
    return false
}

/**
 * Adds one vector to another/s as long as the former's head equals the latter's foot
 *
 * @param {FixedVector || Array} vec FixedVector or array of them passed as parameter
 * @return {FixedVector} Returns the FixedVector of the addition
 */

FixedVector.prototype.add = function(vec) {
    var that = this
    var first_time = true


        function addVec(vect) {
            if (that._head.Coord.eql$U(vect.foot.Coord)) {
                aux = new Vector(vect.Coord)
                if (first_time) {
                    new_free = new Vector(that.Coord)
                    first_time = false
                }

                new_free = new_free.add(aux)
                that = vect
            } else
                throw ("Invalid operation for fixed vectors." +
                    " First vector head must be equal to second's foot")
        }

    if (vec instanceof Array)
        for (var i = 0; i < vec.length; i++) {
            addVec(vec[i])
        }
    if (vec instanceof FixedVector)
        addVec(vec)

    return new FixedVector([new_free, this.foot])
}

/**
 * Substracts one fixed vector from another or group of them
 *
 * @param {FixedVector || Array} vec FixedVector or array of them passed as parameter
 * @return {FixedVector} Returns the FixedVector of the substraction
 */

FixedVector.prototype.subs = function(vec) {
    var that = this

        function subsVec(vect) {
            new_free = that._head.subs(vect._head)
            new_foot = vect._head
        }

    if (vec instanceof Array)
        subsVec(vec[vec.length - 1])
    if (vec instanceof FixedVector)
        subsVec(vec)

    return new FixedVector([new_free, new_foot])
}

/**
 *Scales a FixedVector with a number
 *
 * @param {Number} number number passed as parameter
 * @return {FixedVector} Returns a scaled FixedVector
 */

FixedVector.prototype.scle = function(number) { //see why it effs on full name
    scalable = new Vector(this.Coord)
    scalable = scalable.scale(number)
    fv_foot = this.foot.scale(number)

    return new FixedVector([scalable, fv_foot])
}
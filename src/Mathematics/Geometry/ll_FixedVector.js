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

/**
 * @method constructor
 *
 * ### Example
 * 
 *     new FixedVector()
 *     //=> this.foot = (0,0)
 *     //=> this._head = (0,0) 
 *
 *     Cases of usage:
 *     constructor accepts only the free vector
 *     constructor accepts only the _head (foot = (0,0))
 *     constructor doesn't accept only foot (it wouldn't know where it ends)
 *     constructor can accept a minimun of 0 parameters and a maximun of 3
 *
 * //NOTA: Vector.prototype.add.call(this, this.foot) //suma this a this.foot usando el metodo de vector
 */


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
 * @method eql$U
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
    var checks = false
    var new_free

    function checkVec(vect){
        if (that._head.Coord.eql$U(vect.foot.Coord)) {
            checks = true
        }else{
            checks = false
        throw ("Invalid operation for fixed vectors." +
            " First vector head must be equal to second's foot")
        }
        that = vect
    }

    vec = Vector.prototype.parseInput.apply(this, arguments)

    for (var i = 0; i < vec.length; i++)
        checkVec(vec[i])
    if(checks)
        new_free = vec[vec.length - 1]._head.subs(this.foot)

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
    var new_free, new_foot

    vec = Vector.prototype.parseInput.apply(this, arguments)

    new_foot = this._head
    new_free = vec[vec.length - 1]._head.subs(this._head)

    return new FixedVector([new_free, new_foot])
}

/**
 * Scales a FixedVector according to a number
 *
 * @param {Number} number number passed as parameter
 * @return {FixedVector} Returns a scaled FixedVector
 */

FixedVector.prototype.scle = function(number) { //scale from Vector needs to be redifined
    scalable = new Vector(this.Coord)
    scalable = scalable.scale(number)
    fv_foot = this.foot.scale(number)

    return new FixedVector([scalable, fv_foot])
}

//producto vectorial. See if it is necessary to redifined
//FixedVector.prototype.cross = function(){}

/**
 * 
 *
 * @param {Number} number number passed as parameter
 * @return {FixedVector} Returns a scaled FixedVector
 */

FixedVector.prototype.virial = function() {
    var new_free = new Vector(this.Coord)
    var virial = new_free.dot(this.foot)

    return virial
}
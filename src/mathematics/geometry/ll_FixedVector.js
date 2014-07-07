/**
 * @class Mathematics.Geometry.FixedVector
 * Creates a vector fixed in a coordinate axis.
 *
 */
FixedVector.prototype = new Vector
FixedVector.prototype.constructor = FixedVector
FixedVector.super = Vector

/**
 * @method constructor
 *
 * ### Example
 *
 *     Cases of usage:
 *
 *     -Constructor can accept a minimun of 0 parameters and a maximun of 2
 *     -Constructor accepts either vectors or arrays to define the free_vector and the foot
 *     -Constructor accepts only the free vector
 *     -Constructor accepts only the _head (where foot would be 0,0)
 *     -Constructor doesn't accept only foot (it wouldn't know where vector ends)
 *     -Constructor accepts free_vector and foot when is_head is not defined or is false and
 *     accepts _head and foot when is_head has a value
 *
 *     new FixedVector()
 *     //=> this.foot = (0,0)
 *     //=> this._head = (0,0)
 *     //=> this.Coord = (0,0)
 *
 *     new FixedVector( new Vector(3,5) )
 *     //=> this.foot = (0,0)
 *     //=> this._head = (3,5)
 *     //=> this.Coord = (3,5)
 *
 *     new FixedVector( new Vector(8,2), "abs" )
 *     //=> this.foot = (0,0)
 *     //=> this._head = (8,2)
 *     //=> this.Coord = (8,2)
 *
 *     new FixedVector( new Vector(3,5), new Vector(6,1) )
 *     //=> this.foot = (6,1)
 *     //=> this._head = (9,6)
 *     //=> this.Coord = (3,5)
 *
 *     new FixedVector( [3,5], new Vector(6,2) )
 *     //=> this.foot = (6,2)
 *     //=> this._head = (9,7)
 *     //=> this.Coord = (3,5)
 *
 *     new FixedVector( [3,5], [4,2] )
 *     //=> this.foot = (4,2)
 *     //=> this._head = (7,7)
 *     //=> this.Coord = (3,5)
 *
 *     new FixedVector( [3,1], [5,2] , "abs")
 *     //=> this.foot = (5,2)
 *     //=> this._head = (8,3)
 *     //=> this.Coord = (-2,-1)
 *
 *     new FixedVector( new Vector(3,1), [5,2], "abs")
 *     //=> this.foot = (5,2)
 *     //=> this._head = (8,3)
 *     //=> this.Coord = (-2,-1)
 *
 *     new FixedVector( "abs", [5,2] )
 *     //=> this.foot = (0,0)
 *     //=> this._head = (5,3)
 *     //=> this.Coord = (5,2)
 *
 *     new FixedVector( [2,6], "abs" )
 *     //=> this.foot = (0,0)
 *     //=> this._head = (2,6)
 *     //=> this.Coord = (2,6)
 *
 *     new FixedVector([ new Vector(3,1), [5,2], "abs" ])
 *     //=> this.foot = (5,2)
 *     //=> this._head = (8,3)
 *     //=> this.Coord = (-2,-1)
 *
 *     var a = new FixedVector([2,6], "abs", new Vector(3,8))
 *     var b = new FixedVector(a)
 *     //=> this.foot = (3,8)
 *     //=> this._head = (2,6)
 *     //=> this.Coord = (-1,-2)
 *
 * //NOTA: Vector.prototype.add.call(this, this.foot) //suma this a this.foot usando el metodo de vector
 *
 * @param  {Array} input Array with a free vector and a foot
 * @param {Boolean} is_head Indicates if the parameters passed through input are free_vector and foot or
 *                          _head and foot
 *
 * @return {Vector}
 *
 * new Fv(fixed) // Clones fixed into a new FixedVector (Copy Constructor)
 */

function FixedVector(input) {
    var that = this

    if (!input)
        input = []

    var is_head = false
    var free_vector
    this.foot = new Vector()

        function check_arg(arg) {
            if (arg instanceof String || typeof(arg) === "string")
                is_head = arg

            if (arg instanceof Array)
                if (typeof(arg[0]) === "number")
                    if (!free_vector)
                        free_vector = new Vector(arg)
                    else
                        that.foot = new Vector(arg)
                    else
                        for (var i = 0; i < arg.length; i++)
                            check_arg(arg[i])

            if (arg instanceof Vector)
                if (!free_vector)
                    free_vector = arg
                else
                    that.foot = arg

            if (arg instanceof FixedVector) {
                Vector.call(that, arg)
                Vector.call(that.foot, new Vector(arg.foot))
            }
        }

    for (var i = 0; i < arguments.length; i++)
        check_arg(arguments[i])

    free_vector = free_vector || new Vector(0, 0)
    this.foot = this.foot || new Vector(0, 0)

    this.foot.standarize_coordinates(free_vector)

    if (is_head)
        free_vector = free_vector.subs(this.foot)

    Object.defineProperty(this, "_head", {
        value: this.foot.add(free_vector),
        enumerable: false
    })

    Vector.call(this, free_vector)
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
 * @method add
 * Adds one vector to another/s as long as the former's head equals the latter's foot
 *
 * @param {FixedVector | Array} vec FixedVector or array of them passed as parameter
 * @return {FixedVector} Returns the FixedVector of the addition
 */

FixedVector.prototype.add = function(vec) {
    var that = this
    var first_time = true
    var checks = false
    var new_free

        function checkVec(vect) {
            if (that._head.Coord.eql$U(vect.foot.Coord)) {
                checks = true
            } else {
                checks = false
                throw ("Invalid operation for fixed vectors." +
                    " First vector head must be equal to second's foot")
            }
            that = vect
        }

    vec = Vector.prototype.parseInput.apply(this, arguments)

    for (var i = 0; i < vec.length; i++)
        checkVec(vec[i])
    if (checks)
        new_free = vec[vec.length - 1]._head.subs(this.foot)

    return new FixedVector(new_free, this.foot)
}

/**
 * @method subs
 * Substracts one fixed vector from another or group of them
 *
 * @param {FixedVector | Array} vec FixedVector or array of them passed as parameter
 * @return {FixedVector} Returns the FixedVector of the substraction
 */

FixedVector.prototype.subs = function(vec) {
    var new_free, new_foot

        vec = Vector.prototype.parseInput.apply(this, arguments)

        new_foot = this._head
        new_free = vec[vec.length - 1]._head.subs(this._head)

        return new FixedVector(new_free, new_foot)
}

/**
 * @method scle
 * Scales a FixedVector according to a number
 *
 * @param {Number} number number passed as parameter
 * @return {FixedVector} Returns a scaled FixedVector
 */

FixedVector.prototype.scle = function(number) { //todo: scale from Vector needs to be redefined
    scalable = new Vector(this.Coord)
    scalable = scalable.scale(number)
    fv_foot = this.foot.scale(number)

    return new FixedVector(scalable, fv_foot)
}

/**
 * @method virial
 * Scalar product of a vector and its foot
 *
 * @param {Vector} vec FixedVector to operate with
 * @param {Number} angle Angle between the two Fixed vectors
 *
 * @return {FixedVector} Returns the virial of a vector or vectors
 */
FixedVector.prototype.virial = function(vec, angle) {
    var new_free, virial
        new_free = new Vector(this.Coord)
        virial = new_free.dot(this.foot)

        return virial
}

/**
 * @method planar_momentum
 * Momentum of a vector in a plane
 *
 * @param {FixedVector} vec FixedVector to operate with
 * @param {FixedVector} plane_pt FixedVector made from a point in the plane
 *
 * @return {FixedVector} Returns the virial of a vector or vectors
 */
FixedVector.prototype.planar_momentum = function(vec, plane_pt) {
    var vector_r = new FixedVector(vec.foot, plane_pt.foot)
    var unitary = plane_pt.unit()
    var vec_module = vec.module()

    var res = vector_r.cross(unitary).scale(vec_module)

    return res
}
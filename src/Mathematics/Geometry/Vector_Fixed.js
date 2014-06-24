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


// function FixedVector(free_vector, foot) {

//     free_vector = free_vector || new Vector(0, 0)
//     this.foot = foot || new Vector(0, 0)

//     if (free_vector instanceof Array)
//         free_vector = new Vector(free_vector)

//     if (this.foot instanceof Array)
//         this.foot = new Vector(foot)

//     this.foot.standarize_coordinates(free_vector)

//     Vector.call(this, free_vector)

//     Object.defineProperty(this, "_head", {
//         value: this.foot.add(free_vector),
//         enumerable: false
//     })

// }

function FixedVector(input) {
    if(!input)
        input = []

    var input_args = []
    for(var i=0; i<input.length; i++)
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
 * Adds one vector to another as long as the former's head equals the latter's foot
 *
 * @return {}
 */

FixedVector.prototype.add = function(vec) {
    //alert(this.toSource())
    //alert(vec.toSource())
    var that = this
    var new_fv
    var last_head = this._head
    var fv_foot = this.foot
    function addVec(vect) {
        if (last_head.Coord.eql$U(vect.foot.Coord)) {
            alert(that._head.Coord)
            var aux = new Vector(that.Coord)
            var vec_aux = new Vector(vect.Coord)
            var new_free = aux.add(vec_aux)

            new_fv = new FixedVector([new_free, fv_foot])
            last_head = vect._head
            that = vect
        } else
            throw ("Invalid operation for fixed vectors." +
                   " First vector head must be equal to second's foot")
    }

    if(vec instanceof Array)
        for (var i = 0; i < vec.length; i++){
            addVec(vec[i])
            //alert(vec[i].toSource())
        }
    if(vec instanceof FixedVector)
        addVec(vec)

    return new_fv
}

/**
 *
 *
 * @return {}
 */

FixedVector.prototype.subs = function(vec) {
    var new_free = this._head.subs(vec._head)
    var new_foot = vec._head

    return new FixedVector([new_free, new_foot])
}
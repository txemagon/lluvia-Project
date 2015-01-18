/**
 * @class mathematics.geometry.Vector
 * Creates a vector.
 *
 *
 */
Vector.prototype.constructor = Vector

/**
 * VALID INPUT!
 *
 * PARAMETER TYPES
 * ([ Vector | Coordinates | Array( {Coordinates} ) ])
 *
 * @param  {}
 * @return {Vector}
 * @constructor
 *
 */

function Vector() {
    var coord_temp = []
    var coordinate_system
    var that = this
    this.Coord = []

    var argument = []

    function is_valid_cs$U(cs) {
        return typeof(cs) == "string" && Vector.valid_cs.inject(true, function(el, val) {
            return el == cs || val
        })
    }

    for (var i = 0; i < arguments.length; i++)
        this.Coord.push(arguments[i])

    // arguments is not array, just array-like
    for (var i = 0; i < arguments.length; i++)
        argument[i] = arguments[i]

    //moves the coordinate system string (if exists) to the last position
    for (var i = 0; i < argument.length; i++)
        if (is_valid_cs$U(arguments[i]))
            argument.push(argument.splice(i, 1)[0])

    if (typeof(argument[argument.length - 1]) == "string")
        coordinate_system = argument[argument.length - 1]
    else
        coordinate_system = "cart"

    function transformCoordinates() {

        //converts into cartesian coordinates if needed and creates the vector Coord array
        if (coordinate_system == "pol") {
            that.Coord[0] = coord_temp[0] * Math.cos(coord_temp[1])
            that.Coord[1] = coord_temp[0] * Math.sin(coord_temp[1])
        }

        if (coordinate_system == "cyl") {
            that.Coord[0] = coord_temp[0] * Math.cos(coord_temp[1])
            that.Coord[1] = coord_temp[0] * Math.sin(coord_temp[1])
            that.Coord[2] = coord_temp[2]
        }

        if (coordinate_system == "sph") {
            that.Coord[0] = coord_temp[0] * Math.sin(coord_temp[1]) * Math.cos(coord_temp[2])
            that.Coord[1] = coord_temp[0] * Math.sin(coord_temp[1]) * Math.sin(coord_temp[2])
            that.Coord[2] = coord_temp[0] * Math.cos(coord_temp[1])
        }

        if (coordinate_system == "cart") {
            for (i = 0; i < coord_temp.length; i++)
                that.Coord[i] = coord_temp[i]
        }

    }

    if (argument[0] instanceof Vector)
        for (var i = 0; i < argument[0].Coord.length; i++)
            this.Coord[i] = argument[0].Coord[i]
    else {
        if (typeof(argument[0]) == "number")
            for (var i = 0; i < argument.length; i++)
                if (typeof(argument[i]) == "number")
                    coord_temp[i] = argument[i]

        if (argument[0] instanceof Array)
            for (var i = 0; i < argument[0].length; i++)
                coord_temp[i] = argument[0][i]

        transformCoordinates()
    }

    //calculates the vector module
    this._module = Vector.prototype.module.call(this)

    //calculates the unit vector
    this.uVector = Vector.prototype.scale.call(this, 1 / this._module)
}

/**
 * @method is_valid_cs$U
 * @static
 * Checks if the type of coordinates system is a cartesian one
 *
 * @param  {String}  cs Type of coordinates system
 * @return {Boolean}    Returns true if system is cartesian and false if not
 */
Vector.is_valid_cs$U = function(cs) {
    return typeof(cs) == "string" && Vector.valid_cs.inject(true, function(el, val) {
        return el == cs || val
    })
}

/**
 * @method has_same_dimension_as$U
 * Compares the dimension of two vectors
 *
 * ###Example:
 *     var a = new Vector(2,3)
 *     var b = new Vector(9,8)
 *     a.has_same_dimension_as$U(b)
 *     //=> true
 *
 *     var a = new Vector(9,4)
 *     var b = new Vector(1,8,5)
 *     a.has_same_dimension_as$U(b)
 *     //=> false
 *
 * @param {Vector} vector_to_compare Vector which dimensions are to be checked
 * @return {Boolean} Returns true if dimensions are equal and false if not
 */
Vector.prototype.has_same_dimension_as$U = function(vector_to_compare) {
    if (this.Coord.length == vector_to_compare.Coord.length)
        return true
    return false
}

/**
 * Checks if two vector have the same number of coordinates.
 * If not, fills the missing coordinates with zeros
 *
 * Example:
 *     var a = new Vector(4, 2, 6)
 *     var b = new Vector(2, 3)
 *     a.standarize_coordinates(b)
 *     b.Coord
 *     //=> [2, 3, 0]
 *
 * @param {Vector} vector_to_compare Vector to compare to the given one
 *
 */
Vector.prototype.standarize_coordinates = function(vector_to_compare) {
    if (this.Coord.length >= vector_to_compare.Coord.length) {
        var difference = this.Coord.length - vector_to_compare.Coord.length
        for (var i = 0; i < difference; i++) {
            vector_to_compare.Coord.push(0)
        }
    }

    if (this.Coord.length <= vector_to_compare.Coord.length) {
        var difference = vector_to_compare.Coord.length - this.Coord.length
        for (var i = 0; i < difference; i++) {
            this.Coord.push(0)
        }
    }
}

/**
 * Transforms the given vector into its unitarian
 *
 * ###Example:
 *    var e = new Vector(5,6)
 *    e.unit().Coord
 *    //=> [0.6401843996644798, 0.7682212795973759]
 *
 * @return {Vector} Returns the unitarian vector
 */
Vector.prototype.unit = function() {
    return new Vector(this.uVector || this.scale(1 / this._module))
}

/**
 * @method parseInput
 * This function can add two or more vectors. It adds the common part of vector from different dimensions.
 *
 *  VALID INPUT!
 *
 *   PARAMETER TYPES
 *   ([ Vector | Coordinates | Array( {[Vector | Coordinates}] ])
 *
 *
 * @param       {Vector}      vector Array of at least one vector. Only one vector will be processed.
 * @return      {Vector}      Return an array of vectors
 *
 * Comments:   This function works creating a vector from the length of the biggest vector to add,
 *             which initial elements are '0', and replace 0 by the addition of the terms of the vectors.
 *
 */
Vector.prototype.parseInput = function(args) {

    var argument = []
    for (var i = 0; i < arguments.length; i++)
        argument[i] = arguments[i]


    function convertToArray() {

        var output = []


        if (argument[0] instanceof Array && argument[0][0] instanceof Vector)
            return argument[0];

        // If I only get a vector
        if (argument[0] instanceof Vector)
            return [argument[0]]

        // If I get standalone coordinates
        if (typeof(argument[0]) == "number" || argument[0] instanceof Number) {
            for (var i = 0; i < argument.length; i++)
                output[i] = argument[i].valueOf()
            return [new Vector(output)]
        }

        // If I get a array
        if (argument[0] instanceof Array) {
            if (!(argument[0][0] instanceof Vector))
                output = [new Vector(argument[0])]
        }

        return output
    }

    var out = convertToArray()


    for (var i = 0; i < out.length; i++)
        if (out[i].Coord.length != this.Coord.length)
            throw ("Invalid vector dimension for vector " + (i + 1) + ". Got: " + out[i].Coord.length + "D. Expected: " + this.Coord.length + "D.")


    return out
}

/**
 * @method cloneCoords
 * description
 *
 * @param  {[type]} vectCpy [description]
 *
 */
Vector.prototype.cloneCoords = function(vectCpy) {
    for (var i = 0; i < vectCpy.Coord.length; i++)
        this.Coord[i] = vectCpy.Coord[i]

    this._module = this.module()
}

/**
 * @method add
 * description
 *
 * VALID INPUT!
 *
 *   PARAMETER TYPES
 * ([ Vector | Coordinates | Array( {[Vector | Coordinates}] ])
 *
 *   DIMENSIONS
 * Paremeters dimensions must have the same dimensions as the this Vector. Otherwise raises different dimension error.
 * Minimal dimension is 1.
 * With dimension = 0 return this.
 *
 *   CAPTION
 * {} = Data type
 * Coordinates = Number[]
 *
 * @param {Vector} vectAdd Vector to add to this
 * @return {Vector} Returns a new Vector with result of the addition
 */
Vector.prototype.add = function(vectAdd) {
    /**

     */
    var vectRes = [];

    function addVector(vector) {
        for (var i = 0; i < vector.Coord.length; i++) {
            if (!vectRes[i])
                vectRes[i] = 0
            vectRes[i] += vector.Coord[i]
        }
    }

    vectAdd = Vector.prototype.parseInput.apply(this, arguments)

    addVector(this)
    for (var i = 0; i < vectAdd.length; i++)
        addVector(vectAdd[i])

    return new Vector(vectRes)
}

/**
 * add$B
 *
 * Bang methods ...$B operates in `this` object.
 * (see Vector#add)
 *
 *  VALID INPUT!
 *
 *   PARAMETER TYPES
 * ([Vector | Coordinates])*
 * (Array( {[Vector | Coordinates}] )
 *
 *   DIMENSIONS
 * Paremeters dimensions must have the same dimensions as the this Vector. Otherwise raises different dimension error.
 * Minimal dimension is 1.
 * With dimension = 0 return this.
 *
 *   CAPTION
 * {} = Data type
 * Coordinates = Number[]
 */
Vector.prototype.add$B = function(vectAdd) {
    var vectRes = Vector.prototype.add.apply(this, arguments)
    this.cloneCoords(vectRes)

    return vectRes
}

/**
 * This function can add two or more vectors. It adds the common part of vector from different dimensions.
 *
 * @memberOf    {vector}
 * @method      length        returns a number whitch is the final result of the vector length.
 * @param       (vector)      vector array of at least vector. Only one vector will be processed.
 *
 * @return      (vector)      lenght
 *
 *  VALID INPUT!
 *
 *   PARAMETER TYPES
 * ([Vector | Coordinates])*
 * (Array( {[Vector | Coordinates}] )
 *
 *   DIMENSIONS
 * Paremeters dimensions must have the same dimensions as the this Vector. Otherwise raises different dimension error.
 * Minimal dimension is 1.
 * With dimension = 0 return this.
 *
 *   CAPTION
 * {} = Data type
 * Coordinates = Number[]
 *
 *Comments:   This function works creating a vector from the length of the biggest vector to substract,
 *            witch initial elements are '0', and replace 0 by the substract of the terms of the vectors.
 */
Vector.prototype.subs = function(vectSubs) {
    var vectRes = [];

    for (var i = 0; i < this.Coord.length; i++)
        vectRes[i] = this.Coord[i];

    function subsVector(vector) {
        for (var i = 0; i < vector.Coord.length; i++) {
            if (!vectRes[i])
                vectRes[i] = 0
            vectRes[i] -= vector.Coord[i]
        }
    }

    vectSubs = Vector.prototype.parseInput.apply(this, arguments)

    for (var i = 0; i < vectSubs.length; i++)
        subsVector(vectSubs[i])

    return new Vector(vectRes)
}

/**
 * @method subs$B
 * description
 *
 *  VALID INPUT!
 *
 *   PARAMETER TYPES
 * ([Vector | Coordinates])*
 * (Array( {[Vector | Coordinates}] )
 *
 *   DIMENSIONS
 * Paremeters dimensions must have the same dimensions as the this Vector. Otherwise raises different dimension error.
 * Minimal dimension is 1.
 * With dimension = 0 return this.
 *
 *   CAPTION
 * {} = Data type
 * Coordinates = Number[]
 * @param  {[type]} vectSubs [description]
 * @return {[type]}          [description]
 */
Vector.prototype.subs$B = function(vectSubs) {
    var vectRes = Vector.prototype.subs.apply(this, arguments)
    this.cloneCoords(vectRes)

    return vectRes
}

/**
 * Returns the scalar product of two vectors. Over an array of vectors the dot variation it's operated
 * in the following way:
 *
 * Let A = [v1, v2, v3]
 *
 * where v1 (v11, v12, ... , v1i ... v1n)
 *
 * r = v1·v2·v3 = v11 x v21 x v31 +  v12 x v22 x v32 + v13 x v23 x v33
 *
 *
 *  VALID INPUT!
 *
 *   PARAMETER TYPES
 * ([Vector | Coordinates])*
 * (Array( {[Vector | Coordinates}] )
 *
 *   DIMENSIONS
 * Paremeters dimensions must have the same dimensions as the this Vector. Otherwise raises different dimension error.
 * Minimal dimension is 1.
 * With dimension = 0 return this.
 * The maximum number of vectors (as vectors or amount of coordinates) is two.
 *
 *   CAPTION
 * {} = Data type
 * Coordinates = Number[]
 *
 * @memberOf    {Vector}
 * @method      dot         Returns a number that is the scalar product of two vectors.
 * @param       {Vector}    Vectors Array of at least two Vector. Only two vectors will be processed.
 *
 * @return      {Number}    Scalar product
 */
Vector.prototype.dot = function(vectors) {
    var dt = 0
    var vectors = Vector.prototype.parseInput.apply(this, arguments)
    vectors.push(new Vector(this.Coord))

    if (vectors.length >= 2)
        for (var cor = 0; cor < vectors[0].Coord.length; cor++) {
            var aux = 1
            for (var v = 0; v < vectors.length; v++)
                aux *= (vectors[v].Coord[cor] || 0)
            dt += aux
        } else
            throw "There must be at least two vectors for the scalar product"

    return dt
}

function _simple_cross(vector1, vectorArray) {
    var vector2 = vectorArray.shift()
    var vectAux = new Vector(vector1.Coord[1] * vector2.Coord[2] - vector1.Coord[2] * vector2.Coord[1],
        vector1.Coord[2] * vector2.Coord[0] - vector1.Coord[0] * vector2.Coord[2],
        vector1.Coord[0] * vector2.Coord[1] - vector1.Coord[1] * vector2.Coord[0])

    if (vectorArray.length == 0)
        return vectAux

    return _simple_cross(vectAux, vectorArray)
}

/**
 * This fuction return the vector product of 2 vectors size 3.
 * @method      cross        returns a vector which is the result of 2 vector product
 *
 *  VALID INPUT!
 *
 *   PARAMETER TYPES
 * ([Vector | Coordinates])*
 * (Array( {[Vector | Coordinates}] )
 *
 *   DIMENSIONS
 * Paremeters dimensions must have the same dimensions as the this Vector. Otherwise raises different dimension error.
 * Minimal dimension is 1.
 * With dimension = 0 return this.
 *
 *   CAPTION
 * {} = Data type
 * Coordinates = Number[]
 * @param {Object} vectors
 *
 *
 */
Vector.prototype.cross = function(vectors) {
    vectCross = Vector.prototype.parseInput.apply(this, arguments)
    vectCross.push(new Vector(this.Coord))

    if (vectCross.length < 2)
        throw "At least one operand needed in cross product."

    return _simple_cross(vectCross.shift(), vectCross)
}

/**
 * [_simple_cross$B description]
 * @param  {[type]} vector1     [description]
 * @param  {[type]} vectorArray [description]
 * @return {[type]}             [description]
 */
function _simple_cross$B(vector1, vectorArray) {
    var vector2 = vectorArray.shift()
    var vectAux = new Vector(vector1.Coord[1] * vector2.Coord[2] - vector1.Coord[2] * vector2.Coord[1],
        vector1.Coord[2] * vector2.Coord[0] - vector1.Coord[0] * vector2.Coord[2],
        vector1.Coord[0] * vector2.Coord[1] - vector1.Coord[1] * vector2.Coord[0])

    if (vectorArray.lenth == 0) {
        for (var i = 0; i < vectAux.Coord.length; i++)
            this.Coord[i] = vecAux.Coord[i]
        return vectAux
    }

    return _simple_cross(vectAux, vectorArray)
}

/**
 * @method cross$B
 * description
 *
 *  VALID INPUT!
 *
 *   PARAMETER TYPES
 * ([Vector | Coordinates])*
 * (Array( {[Vector | Coordinates}] )
 *
 *   DIMENSIONS
 * Paremeters dimensions must have the same dimensions as the this Vector. Otherwise raises different dimension error.
 * Minimal dimension is 1.
 * With dimension = 0 return this.
 *
 *   CAPTION
 * {} = Data type
 * Coordinates = Number[]
 *
 * @param  {[type]} vectors [description]
 * @return {[type]}         [description]
 */
Vector.prototype.cross$B = function(vectors) {
    vectCross$B = Vector.prototype.parseInput.apply(this, arguments)
    vectCross$B.push(new Vector(this.Coord))

    if (vectCross$B.length < 2)
        throw "At least one operand needed in cross product."

    return _simple_cross$B(vectCross & B.shift(), vectCross$B)
}

/**
 * @method      dCross      Returns an Array which is the vector product of three vectors.
 * Returns the vector product of three vectors ((vector1 * vector2)*vector3).
 *
 *
 *  VALID INPUT!
 *
 *   PARAMETER TYPES
 * ([Vector | Coordinates])*
 * (Array( {[Vector | Coordinates}] )
 *
 *   DIMENSIONS
 * Paremeters dimensions must have the same dimensions as the this Vector. Otherwise raises different dimension error.
 * Minimal dimension is 1.
 * With dimension = 0 return this.
 * The maximum number of vectors (as vectors or amount of coordinates) is three.
 *
 *   CAPTION
 * {} = Data type
 * Coordinates = Number[]
 *
 * @param       {Vector}    Vector Array of at least two components.
 * @var         {vectorAux} Two parameters vector product.
 * @return      {Vector}        Vector product
 */
Vector.prototype.dCross = function(vector1, vector2, vector3) {
    var vectorAux = new Array();
    vectorAux = cross(vector1, vector2);
    vectorAux = cross(this.vectorAux, vector3);

    return vectorAux;
}

/**
 * @method dCross$B
 * description
 *
 *  VALID INPUT!
 *
 *   PARAMETER TYPES
 * ([Vector | Coordinates])*
 * (Array( {[Vector | Coordinates}] )
 *
 *   DIMENSIONS
 * Paremeters dimensions must have the same dimensions as the this Vector. Otherwise raises different dimension error.
 * Minimal dimension is 1.
 * With dimension = 0 return this.
 * The maximum number of vectors (as vectors or amount of coordinates) is three.
 *
 *   CAPTION
 * {} = Data type
 * Coordinates = Number[]
 *
 * @param  {[type]} vector1 [description]
 * @param  {[type]} vector2 [description]
 * @param  {[type]} vector3 [description]
 * @return {[type]}         [description]
 */
Vector.prototype.dCross$B = function(vector1, vector2, vector3) {
    var vectorAux = new Array();
    vectorAux = cross(vector1, vector2);
    vectorAux = cross(this.vectorAux, vector3);

    return vectorAux;
}

/**
 * scale takes one vector and a number and returns the product of the scalar and the vecor.
 * Vector can be one scalar or an array of scalars. The order in the parameters is not important.
 *
 *   DIMENSIONS
 * Paremeters dimensions must have the same dimensions as the this Vector. Otherwise raises different dimension error.
 * Minimal dimension is 1.
 * With dimension = 0 return this.
 * It can operate a vector and one number.
 *
 *   CAPTION
 * {} = Data type
 * Coordinates = Number[]
 *
 * @param {Vector} vector   One vector for the scalar product.
 * @param {Number} number   One scalar for the scalar product.
 *
 * @return {Var} Returns either a number or an array with the scalar product of a Vector and a number
 */
Vector.prototype.scale = function(number) {
    var sc = []

    for (var i = 0; i < this.Coord.length; i++)
        sc[i] = this.Coord[i] * number

    return sc
}

/**
 * @method scale$B
 * description
 *
 *
 *   DIMENSIONS
 * Paremeters dimensions must have the same dimensions as the this Vector. Otherwise raises different dimension error.
 * Minimal dimension is 1.
 * With dimension = 0 return this.
 * It can operate a vector and one number.
 *
 *   CAPTION
 * {} = Data type
 * Coordinates = Number[]
 *
 * @param  {[type]} vector [description]
 * @param  {[type]} number [description]
 *
 * @return {[type]}        [description]
 */
Vector.prototype.scale$B = function(vector, number) {
    for (var i = 0; i < this.Coord.length; i++)
        vector.Coord[i] = vector.Coord[i] * number

    return vector
}

/**
 * @method projection
 * Projection of one vector over another.
 *
 * VALID INPUT!
 *
 *   PARAMETER TYPES
 * ([Vector | Coordinates] [Vector | Coordinates])
 * (Array( {[Vector | Coordinates] [Vector | Coordinates]} )
 *
 *   DIMENSIONS
 * Paremeters dimensions must have the same dimensions as the this Vector. Otherwise raises different dimension error.
 * Minimal dimension is 1.
 * With dimension = 0 return this.
 * The maximum number of vectors (as vectors or amount of coordinates) is two.
 *
 *   CAPTION
 * {} = Data type
 * Coordinates = Number[]
 *
 * @method      projection  Dice two vectors, we want obtain the orthogonal projection of one vector on another.
 * @param       {Vector}    Vectors Array of at least two vectors. Only two vectors will be processed
 *
 * @return      {Vector}    Proyection returns a vector
 */
Vector.prototype.projection = function(vector1) {
    if (vector1.lentgh < 1 && this.length < 1)
        throw "Invalid vector dimension"
    if (vector1.length != this.length && this.length < 1)
        throw "Lengths of vectors are different"
    else
        return new Vector(vector1.scale(this.dot(vector1) / vector1.dot(vector1)))
}

/**
 * @method projection$B
 * description
 *
 * VALID INPUT!
 *
 *   PARAMETER TYPES
 * ([Vector | Coordinates] [Vector | Coordinates])
 * (Array( {[Vector | Coordinates] [Vector | Coordinates]} )
 *
 *   DIMENSIONS
 * Paremeters dimensions must have the same dimensions as the this Vector. Otherwise raises different dimension error.
 * Minimal dimension is 1.
 * With dimension = 0 return this.
 * The maximum number of vectors (as vectors or amount of coordinates) is two.
 *
 *   CAPTION
 * {} = Data type
 * Coordinates = Number[]
 *
 * @param  {[type]} vector1 [description]
 * @return {[type]}         [description]
 */
Vector.prototype.projection$B = function(vector1) {
    vectProject = this.projection(vector1)

    for (var i = 0; i < vectProject.length; i++)
        this.Coord[i] += vectProject[i]

    return this
}

/**
 * @method      linearCombination
 * This function compares vectors for finding a common point on its.
 *
 * VALID INPUT!
 *
 *   PARAMETER TYPES
 * ([Vector | Coordinates])
 * (Array( {[Vector | Coordinates}] )
 *
 *   DIMENSIONS
 * Paremeters dimensions must have the same dimensions as the this Vector. Otherwise raises different dimension error.
 * Minimal dimension is 1.
 * With dimension = 0 return this.
 *
 *   CAPTION
 * {} = Data type
 * Coordinates = Number[]
 *
 * @param       {vector}      vector Array of at least vector.
 * @return      {boolean}     Returns true or false if there are or not linear combination.
 *
 * Comments:   This function works creating a vector from the length of the biggest vector to substract,
 *            witch initial elements are '0', and replace 0 by the substract of the terms of the vectors.
 */
Vector.prototype.linearCombination$U = function(vectorSet) {
    var norm = Matrix.normalize(vectorSet)
    var nz = 0 // Number of zeros)
    var li = true; // Linear independence
    for (var i = 0; i < norm.length && li; i++) {
        for (var j = 0; j < norm[i].length; j++)
            if (norm[i][j] == 0)
                nz++
                if (nz == norm[i].length)
                    li = false
    }
    return li
}

/**
 * @method box
 * Returns the mixed triple product
 *
 *  VALID INPUT!
 *
 *   PARAMETER TYPES
 * ([Vector | Coordinates])
 * (Array( {[Vector | Coordinates}] )
 *
 *   DIMENSIONS
 * Paremeters dimensions must have the same dimensions as the this Vector. Otherwise raises different dimension error.
 * Minimal dimension is 1.
 * With dimension = 0 return this.
 * The maximum number of vectors (as vectors or amount of coordinates) is three.
 *
 *   CAPTION
 * {} = Data type
 * Coordinates = Number[]
 *
 * @param       {Vectors}       Vectors Array of at least two Vector.only two vectors will be processed.
 * @return      {Number}        Box
 */
Vector.prototype.box = function(vectors) {
    if ((vectors.length >= 3) &&
        (typeof(vectors[0]) == Array) &&
        (vectors[0].length == 3) &&
        (typeof(vectors[1]) == Array) &&
        (typeof(vectors[2]) == Array) &&
        (vectors[0].length == vectors[1].length) &&
        (vectors[1].length == vectors[2].length)) {

        return vectors[0][0] * vectors[1][1] * vectors[2][2] +
            vectors[1][0] * vectors[2][1] * vectors[0][2] +
            vectors[0][1] * vectors[1][2] * vectors[2][0] -
            vectors[0][2] * vectors[1][1] * vectors[2][0] -
            vectors[1][2] * vectors[2][1] * vectors[0][0] -
            vectors[2][2] * vectors[1][0] * vectors[0][1]
    }

    return undefined
}

/**
 * @method      coplanar
 * Says if the vectors are in the same plane
 *
 *  VALID INPUT!
 *
 *   PARAMETER TYPES
 * ([Vector | Coordinates])*
 * (Array( {[Vector | Coordinates}] )
 *
 *   DIMENSIONS
 * Paremeters dimensions must have the same dimensions as the this Vector. Otherwise raises different dimension error.
 * Minimal dimension is 1.
 * With dimension = 0 return this.
 *
 *   CAPTION
 * {} = Data type
 * Coordinates = Number[]
 *
 * @param       {Vector}        Vectors Array of at least two Vector.Only two vectors will be processed.
 * @return      {Boolean}       Returns true or false if the vectors are in the same plane.
 */
Vector.prototype.coplanar$U = function(vector) {
    switch (vector.length) {
        case 0:
            return undefined
        case 1:
        case 2:
            return true
    }

    // check out the dimensions
    var dim = vector[0].length
    for (var i = 1; i < vector.length; i++)
        if (dim != vector[i].length)
            throw "Invalid dimensions"

    for (var i = 2; i < vector.length; i++)
        if (Vector.box(vector[0], vector[1], vector[i]))
            return false

    return true
}

/**
 * @method      angle
 * Calculates the angle between two vectors
 *
 * @param       {Vectors}
 * @return      {Number}        Return the angle between two vectors.
 */
Vector.prototype.angle = function() {
    v1 = new Vector(1, 1, 1)
    Vector.apply(v1, arguments) // Pasarle los argumentos de angle a new Vector
    if (v1.Coord.length == this.Coord.length)
        if (this.Coord.length == 2) {
            var angle2 = Math.acos(v1.Coord[0] / v1.module()) // Returns dot product with versor i ( first director angle)
            var angle1 = Math.acos(this.Coord[0] / this.module()) // The same
            return angle2 - angle1
        } else
            return Math.acos(this.dot(v1) / this.module() / v1.module())
    else
        throw "Invalid Input, angle() method needs/recives a vector of dimension " + this.Coord.length + "."
}

/**
 * @method      module        returns a number whitch is the final result of the vector lenght.
 * This function can add two or more vectors. It adds the common part of vector from different dimensions.
 *
 *  VALID INPUT!
 *
 *   PARAMETER TYPES
 *
 *
 *   DIMENSIONS
 * Paremeters dimensions must have the same dimensions as the this Vector. Otherwise raises different dimension error.
 * Minimal dimension is 1.
 * With dimension = 0 return this.
 * The maximum number of vectors (as vectors or amount of coordinates) is one.
 *
 *   CAPTION
 * {} = Data type
 * Coordinates = Number[]
 *
 * @param       (vector)      vector array of at least vector. Only one vector will be processed.
 * @return      (number)      module
 *
 */
Vector.prototype.module = function() {
    var suma = 0
    for (var i = 0; i < this.Coord.length; i++)
        suma += this.Coord[i] * this.Coord[i]

    return Math.sqrt(suma)
}


/**
 *  TODO: Queremos hacer
 *        3D: v1.to_cylindrical(), v1.to_cyl(), v1.to_sph(), v1.to_spherical()
 *        2D: v1.to_polar(), v1.to_pol()
 */

/**
 * Converts coordinates in cartesian system cylinder and the cylinder returns a vector.
 * @memberOf    {Vectors}
 * @method      toCylindrical   Returns cylindrical coordinates
 * @param       {Vectors}
 * @return      {Number}        Coordinates
 */
Vector.prototype.toCylindrical = function() {
    coords = []
    v2 = new Vector(this.Coord[0], this.Coord[1])
    coords[0] = Math.sqrt(pow(this.Coord[0], 2) + Math.pow(this.Coord[1], 2))
    coords[1] = Math.atan2(this.Coord[1] / this.Coord[0])
    coords[2] = this.Coord[2]
    return coords

}

// todo: toSpherical
Vector.prototype.toSpherical = function() {
    coords = []
    v2 = new Vector(this.Coord[0], this.Coord[1], this.Coord[2])
    coords[0] = Math.sqrt(Math.pow(this.Coord[0], 2) + Math.pow(this.Coord[1], 2) + Math.pow(this.Coord[2], 2))
    coords[1] = Math.acos(this.Coord[2] / coords[0])
    coords[2] = Math.acos(this.Coord[0] / (coords[0] * Math.sin(coords[1])))
    return coords
}

// todo: toPolar
/**
 * @method      torque       returns a vector which is the torque of another two vectors.
 * This function calculates the torque of two vectors.
 *
 * VALID INPUT!
 *
 *   PARAMETER TYPES
 * (Vector Number)
 * (Array( {[Vector | Number}] )
 *
 *   DIMENSIONS
 * Paremeters dimensions must have the same dimensions as the this Vector. Otherwise raises different dimension error.
 * Minimal dimension is 1.
 * With dimension = 0 return this.
 * It can operate a vector and one number.
 *
 *   CAPTION
 * {} = Data type
 * Coordinates = Number[]
 *
 * @param       (point, aplicationPoint, vector)    aplication point is a point of the vector.
 * @return      (vector)     torque
 *
 * Comments:    this function creates a vector with two points (point and aplicationPoint)
 *              and calculates the cross of the resultant vector and the other vector.
 */
Vector.prototype.torque = function(point, vect) {

    /**
     *
     */
    return cross(subs(vect.origin, point), vect);
}

/**
 * This function calculates the torque of two vectors.
 *
 * @memberOf    {vector}
 * @method      value_of       returns a coordinates array.
 *
 * @return      (Array)     Coordinates
 *
 */
Vector.prototype.value_of = function() {
    return this.Coord
}

/**
 * @method      get_coord
 * This function return first coordinate of this vector.
 *
 *
 * @return {Object}     Returns the first coordinate as an array.
 *
 */
Vector.prototype.get_coord = function() {
    if (arguments.length == 0) // Solo coje arrays numericos aunque creo que eso es porq al crear un array no lo crea con
    // Strings
        return this.value_of()
    if (arguments[0] > this.length)
        return null
    if (arguments[0] >= 'a' && arguments[0] <= 'z' || arguments[0] >= 'A' && arguments[0] <= 'Z') {
        var pos = arguments[0] >= 'a' && arguments[0] <= 'z' ? arguments[0].charCodeAt(0) - "z".charCodeAt(0) + (this.Coord.length - 1) : arguments[0].charCodeAt(0) - "Z".charCodeAt(0) + (this.Coord.length - 1)
        return this.Coord[pos]
    }
    return this.Coord[arguments[0]] || 0
}

Vector.prototype.eql$U = function(model) {
    model = new Vector(model)
    return model.Coord.eql$U(this.Coord)
}

/* Class Variables and Methods */
Vector.valid_cs = ["pol", "cart", "cyl", "sph"]

/**
 * @method get
 *
 *
 * @param  {Number} coordinate Position in the Coord array
 * @return {Number} Returns the value of the position passed as parameter.
 *                  If it doesn't exist, returns 0
 */
Vector.prototype.get = function(coordinate) {
    return this.Coord[coordinate] || 0
}

/**
 * @method are_equal$U
 * Checks if two vectors are equal. If so, returns true. Else, returns false
 *
 * @param  {Vector}  vec Vector to compare
 * @return {Boolean}     Returns true if vectors are equal
 */
Vector.prototype.is_equal_to$U = function(vec) {
    var r_eq = 0
    if (this.Coord.length == vec.Coord.length) {
        for (var i = 0; i < this.Coord.length; i++)
            if (this.Coord[i] == vec.Coord[i])
                r_eq++
                else
                    r_eq--

                    if (r_eq == this.Coord.length)
                        return true
                    else
                        return false
    } else
        return false
}

Vector.prototype._ = Vector.prototype.get
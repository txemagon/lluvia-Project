Vector.prototype.constructor = Vector;

/** Ejemplo **/
Vector.add = function(){
  // Si fueran vectores argument == [v1, v2, v3]
  return argument.shift.add(argument)
}

/**
 * @classDescription Creates a vector.
 * 
 * @param  {} 	
 * @return {Vector} 	
 * @constructor 
 */

//constructor de clase

/**
 * This function can add two or more vectors. It adds the common part of vector from different dimensions. 
 * 
 * @memberOf 	{vector}
 * @method 		lenght        returns a number whitch is the final result of the vector lenght. 	  
 * @param       (vector)      vector array of at least vector. Only one vector will be processed.
 * 
 * @return      (vector)      lenght
 * 
 * Coded by: blitobaz
 * 
 * Comments:   This function works creating a vector from the length of the biggest vector to add, 
 *			  witch initial elements are '0', and replace 0 by the add of the terms of the vectors.
 */

  Vector.add = function(vectAdd){
 	
	var vectRes = [];
	alert(arguments)
	for (var i=0; i< vectAdd[0].length; i++)
		vectRes[i] = 0;
	
	for (var i=0; i<vectAdd[i].length; i++){
	
	
		for (var j=0; j<vectAdd[j].length; j++){		    
			vectRes[j] += vectAdd[i][j]
			alert(vectRes)
			}
     }
	return vectRes
 }
 
 /**
 * This function can add two or more vectors. It adds the common part of vector from different dimensions. 
 * 
 * @memberOf 	{vector}
 * @method 		lenght        returns a number whitch is the final result of the vector lenght. 	  
 * @param       (vector)      vector array of at least vector. Only one vector will be processed.
 * 
 * @return      (vector)      lenght
 * 
 * Coded by: blitobaz
 * 
 *Comments:   This function works creating a vector from the length of the biggest vector to substract, 
 *			  witch initial elements are '0', and replace 0 by the substract of the terms of the vectors.
 */
 
 Vector.subs = function(vectSubs){
 	
	var vectRes = [];
	for (var i=0; i< vectSubs[0].length; i++)
		vectRes[i] = 0;
	
	for (var i=0; i<vectSubs[i].length; i++)
		for (var j=0; j<vectSubs[j].length; j++)
			vectRes[j] -= vectSubs[i][j]

	return vectRes
 }
 
 /**
 * Returns the scalar product of two vectors.
 * @memberOf	{Vector}
 * @method		dot			Returns a number which is the scalar product of two vectors.
 * @param 		{Vector} 	Vectors Array of at least two Vector.only two vectors will be processed.
 * 
 * @return		{Number}	Scalar product
 */
 
 Vector.dot = function(vectors){
	
	if ((vectors.length >= 2) && 
		(typeof (vectors[0]) == Array) && 
		(typeof (vectors[1]) == Array) &&
		(vectors[0].length == vectors[1].length)){
		var dt = 0
		for (var i=0; i<vectors[0].length; i++)
			dt += vectors[0][i] * vectors[1][i]
		return dt
	}
	return undefined			
}

/**
 * This fuction return the vector product of 2 vectors size 3.
 * 
 * @memberOf 	{vector}
 * @method 		cross        returns a vector which is the result of 2 vector product
 * @param {Object} vectors
 * 
 * coded by Antonio Carhuatocto
 */

Vector.cross = function(vectors){	
	
	if ((vectors.length >= 2) && 
		(typeof (vectors[0]) == Array) && 
		(typeof (vectors[1]) == Array) &&
		(vectors[0].length == vectors[1].length)){
		
		var cross = [ 	[vectors[0][1] * vectors[1][2] - vectors[0][2] * vectors[1][1]],
						[vectors[0][2] * vectors[1][0] - vectors[0][0] * vectors[1][2]],
						[vectors[0][0] * vectors[1][1] - vectors[0][1] * vectors[1][0]]]
		
		return cross
	}
	return undefined			
}

/**
 * Returns the vector product of three vectors ((vector1 * vector2)*vector3).
 * @memberOf	{Vector}
 * @method		dCross		Returns an Array which is the vector product of three vectors.
 * @param 		{Vector} 	Vector Array of at least two components.
 * @var			{vectorAux}	Two parameters vector product.
 * @return		{Array}		Vector product
 */

Vector.dCross = function(vector1, vector2, vector3){
	
	var vectorAux = new Array();
	vectorAux = cross(vector1, vector2);
	vectorAux = cross(this.vectorAux, vector3);
	
	return vectorAux;
}

/**
 * scalar takes one vecto and a number and returns the scalar product of both of them.
 * Vector can be one scalar or an array of scalars. The order in the parameters is not important.
 * @param {Vector} vector	One vector for the scalar product.
 * @param {Number} number   One scalar for the scalar product.
 * 
 * @return {Var} Returns either a number or an array with the scalar product of a Vector and a number
 */

Vector.scale = function(vector, number){
 	var sc = []
	
	// Swap arguments for the appropiate order
	if ((typeof(vector) == Number) && (typeof(number) == Vector)){
		var aux = number
		number  = vector
		vector  = aux
	}
	
	if (typeof(vector) == Array)
		for (var i=0; i<vector.length; i++)
			sc[i] = vector[i] * number
	else sc = vector * number
	
	return sc	
 }
 
 /**
 * Projection of one vector about another.
 * @memberOf	{Vector}
 * @method		projection  Dice two vectors, we want obtain the orthogonal projection of one vector on another.
 * @param 		{Vector} 	Vectors Array of at least two vectors. Only two vectors will be processed
 
 *  
 * @return		{Vector}	Proyection returns a vector
 */
 
 Vector.projection = function(vector1, vector2){
	
	var resultVect = new Array();
	var dt1 = 0
	var dt2 = 0
	var vectors= new Array(2);
	vectors[0]= verctor1;
	vectors[1]= vector2;
	
	this.dt1 = Vector.prototype.dot (vectors)
	var dt2 = 0
	for (var i=0; i<vectors[1].length; i++)
		this.dt2 += vectors[1][i] * vectors[1][i]
	var ortoResult = dt1/dt2
	for (var i=0; i<vectors[0].length; i++)
	this.resultVect[i]= (vectors[1][i] * ortoResult)
	
	return this.resultVect;				
}

/**
 * This function compares vectors for finding a common point on its. 
 * 
 * @memberOf 	{vector}
 * @method 		linearCombination       returns true or false if there are or not linear combination. 	  
 * @param       (vector)      vector array of at least vector.
 * 
 * @return      (boolean)     boolean
 * 
 * Coded by: blitobaz
 * 
 *Comments:   This function works creating a vector from the length of the biggest vector to substract, 
 *			  witch initial elements are '0', and replace 0 by the substract of the terms of the vectors.
 */

Vector.linearCombination$U = function(vectorSet){
	var norm = Matrix.normalize(vectorSet)
	var nz = 0		// Number of zeros)
	var li = true;	// Linear independence
	
	for (var i = 0; i < norm.length && li; i++) {
		for (var j = 0; j < norm[i].length; j++) 
			if (norm[i][j] == 0) 
				nz++
		if (nz == norm[i].length)
			li = false
	}
	return li;	
}

/**
 * Returns the mixt product
 * @memberOf	{Vectors}
 * @method		box				Return .
 * @param 		{Vectors} 		Vectors Array of at least two Vector.only two vectors will be processed.
 * @return		{Number}		Box
 */

Vector.box = function(vectors){
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
 * Says if the vectors are in the same plane
 * @memberOf	{Vector}
 * @method		coplanar 		Returns true or false if the vectors are in the same plane.
 * @param 		{Vector}		Vectors Array of at least two Vector.Only two vectors will be processed.
 *
 * @return		{Boolean}		True or false.
 */

Vector.coplanar$U = function(vector){

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
 * Calculate the angle between two vectors
 * @memberOf	{Vectors}
 * @method		angle			Return the angle between two vectors.
 * @param 		{Vectors} 		
 * @return		{Number}		Angle
 */

Vector.angle = function(vectors){
	var arc
	
	if ((vectors.length >= 3) && (typeof(vectors[0]) == Array) )
	 	arc = arcos (dot (u/module(u)), (v/module(v)))
	 
	return arc
}

/**
 * This function can add two or more vectors. It adds the common part of vector from different dimensions. 
 * 
 * @memberOf 	{vector}
 * @method 		module        returns a number whitch is the final result of the vector lenght. 	  
 * @param       (vector)      vector array of at least vector. Only one vector will be processed.
 * 
 * @return      (number)      module
 * 
 * Coded by: blitobaz
 */

Vector.module = function(vectModule){
 
 	var suma
	
	if (typeof(vectModule) == Array )	
 		for (var i = 0; i < vectModule.length; i++)
 	 		suma += vectModule[i] * vectModule[i]
	else
	    for (var i = 0; i < vectModule.length; i++)
 	 		suma += vectModule.Coord[i] * vectModule.Coord[i]
    
	return Math.sqrt(suma)
 }
 
 /**
 * Converts coordinates in cartesian coordinate cylinder and the cylinder returns a vector.
 * @memberOf	{Vectors}
 * @method		toCylindrical	Returns cylindrical coordinates
 * @param 		{Vectors} 		
 * @return		{Number}		Coordinates
 */
 
 Vector.toCylindrical = function(vectors){
	/* Calculo para un array */
	var i
	for (i=0; i<vectors.length; i++)
		if ((vectors[i].length <= 3) && typeof(vectors == Array)){
			vectors[i][0] = Math.sqrt((vectors[i][0]*vectors[i][0])+(vectors[i][1]*vectors[1]))
			vectors[i][1] = arctg (vectors[i][1]/vectors[i][0])
		}
	/* Calculo para un vector */
	if ((vectors.length >= 3) && typeof(vectors == Array)) {
		vectors[0] = Math.sqrt((vectors[0] * vectors[0]) + (vectors[1] * vectors[1]))
		vectors[1] = arctg(vectors[1] / vectors[0])
	}
	 		
	return vectors
}

//toSpherical

/**
 * This function calculates the torque of two vectors. 
 * 
 * @memberOf 	{vector}
 * @method 		torque       returns a vector which is the torque of another two vectors.
 *
 * @param       (point, aplicationPoint, vector)    aplication point is a point of the vector.
 * 
 * @return      (vector)     torque
 * 
 *
 * 
 *Comments:     this function creates a vector whith two points (point and aplicationPoint)
 *				and calculates the cross of the resultant vector and the other vector.
 */

Vector.prototype.torque = function (point, vect){
	return cross(subs(vect.origin, point), vect);
}


/**
	 * scale takes one vector and a number and returns the product of the scalar and the vecor.
	 * Vector can be one scalar or an array of scalars. The order in the parameters is not important.
	 * @param {Vector} vector	One vector for the scalar product.
	 * @param {Number} number   One scalar for the scalar product.
	 *
	 * @return {Var} Returns either a number or an array with the scalar product of a Vector and a number
	 */
	Vector.scale = function(vector, number){
	
		/**
		 *	VALID INPUT!
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
		 */
		var sc = []
		
		// Swap arguments for the appropiate order
		if (typeof(vector) == Number) {
			var aux = number
			number = vector
			vector = aux
		}
		
		if (typeof(vector) == Array) 
			for (var i = 0; i < vector.length; i++) 
				sc[i] = vector[i] * number
		else 
			for (var i = 0; i < vector.Coord.length; i++) 
				sc[i] = vector.Coord[i] * number
		
		return sc
	}
	
	Vector.prototype.scale$B = function(vector, number){
	
		/**
		 *	VALID INPUT!
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
		 */
		
		// Swap arguments for the appropiate order
		if (typeof(vector) == Number) {
			var aux = number
			number = vector
			vector = aux
		}
		
		if (typeof(vector) == Array) 
			for (var i = 0; i < vector.length; i++) 
				vector[i] = vector[i] * number
		else 
			for (var i = 0; i < vector.Coord.length; i++) 
				vector.Coord[i] = vector.Coord[i] * number
		
		return vector
	}


Vector.angle  = function(vectors){

    /**
     *	VALID INPUT!
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
     */
    var arc
    
    if ((vectors.length >= 3) && (typeof(vectors[0]) == Array)) 
        arc = arcos(dot(u / module(u)), (v / module(v)))
    
    return arc
}

Vector.toCylindrical = function(vectors){

    /**
     *	VALID INPUT!
     *
     *   PARAMETER TYPES
     * ([Vector | Coordinates])
     * (Array( {[Vector | Coordinates}] )
     *
     *   DIMENSIONS
     * Paremeters dimensions must have the same dimensions as the 'this' Vector. Otherwise raises different dimension error.
     * Minimal dimension is 1.
     * With dimension = 0 return this.
     * The maximum number of vectors (as vectors or amount of coordinates) is one.
     *
     *   CAPTION
     * {} = Data type
     * Coordinates = Number[]
     */
    /* Calculo para un array */
    var i
    for (i = 0; i < vectors.length; i++) 
        if ((vectors[i].length <= 3) && typeof(vectors == Array)) {
            vectors[i][0] = Math.sqrt((vectors[i][0] * vectors[i][0]) + (vectors[i][1] * vectors[1]))
            vectors[i][1] = arctg(vectors[i][1] / vectors[i][0])
        }
    /* Calculo para un vector */
    if ((vectors.length >= 3) && typeof(vectors == Array)) {
        vectors[0] = Math.sqrt((vectors[0] * vectors[0]) + (vectors[1] * vectors[1]))
        vectors[1] = arctg(vectors[1] / vectors[0])
    }
    
    return vectors
}

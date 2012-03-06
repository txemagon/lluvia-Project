require("vector")

/**
 * @classDescription Creates a ReferenceFrame.
 *
 * @param  {}  When no params are given it defaults to pos 0,0,0 with normal versors
 * @return {ReferenceFrame}
 * @constructor
 */
function ReferenceFrame(drift, trihedron_components){

   var drift_coords = [] 
   for (var i=0; i<arguments.length; i++)
      if (i != arguments.length - 1)
	 drift_coords.push(arguments[i])
      else
	 if (  (arguments[i] instanceof Array) && 
	        ( ( arguments[i][0] instanceof Array) || (arguments[i][0] instanceof Vector) )
	    )
	    this.transformation_matrix = ReferenceFrame.normalize(arguments[i])
	 else
	    drift_coords.push(arguments[i])

     if (drift_coords.length == 0)
	drift_coords = [0,0,0]

     this.drift = new Vector(drift_coords)

   this.default_transformation_matrix = [ [1, 0, 0], 
                                          [0, 1, 1], 
					  [0, 0, 1] ]
   // todo: raise an error with no normalized trihedrons
}

ReferenceFrame.prototype.get_transformation_matrix = function(){
   return this.transformation_matrix || this.default_transformation_matrix
}

ReferenceFrame.prototype.coord_of = function (point){
   var args = Function.args(arguments) 

   if (!(point instanceof Vector))
      point = eval("new Vector(" + args.join(", ") +")")

   var ro = new Vector(point).subs(this.drift)
   if (!this.transformation_matrix)
      return ro

   return ro.transform(this.transformation_matrix)
}

ReferenceFrame.normalize = function(matrix){
   if (matrix.frozen$U())
      return matrix

  for (var i=0; i<matrix.length; i++)
     matrix[i] = (new Vector(matrix[i])).uVector

  if (matrix.length < matrix[0].length-1)
     throw "Incomplete Reference Frame"

//todo: Provide versor completion for other dimensions different from 3.
  if (matrix.length == matrix[0].length-1)
     matrix.push( (new Vector(matrix[0])).cross(new Vector(matrix[1])).get_coord() )

  return matrix
}

//todo: provide two predicates indicating if the trihedron is right-handed (dextrogiro) or left-handed (levogiro)
//todo: provide a method that checks linear independence in the reference frame.
//todo: provide another reference frame to establish a chain of matrix transformations.
//todo: implement a mechanism to calculate final transformation chains within the reference chain

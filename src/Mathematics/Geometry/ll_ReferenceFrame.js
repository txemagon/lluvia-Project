require("vector")

/**
 * @classDescription Creates a ReferenceFrame.
 *
 * @param  {}  When no params are given it defaults to pos 0,0,0 with normal versors
 * @return {ReferenceFrame}
 * @constructor
 */
function ReferenceFrame(drift, trihedron_components){
   this.drift = drift
   this.transformation_matrix = trihedron_components
}

ReferenceFrame.prototype.coord_of = function (point){
  
}

//todo: provide coordinates transformations between reference frames.
//todo: Store the parent referenceFrame if any to provide traceability. Thus, reference systems
//      are homegenous transformation matrices that map displacement, rotation and scaling.
//todo: Provide a getter for the transformation matrix.

//todo: provide a way to normalize the trihedron

/*
 * todo: provide a sweeter input parser.
 *
 * Some use cases:
 * new ReferenceFrame()
 * new ReferenceFrame(1,2) => We provide a position 2D
 * new ReferenceFrame(1,2,3) => 3D Position provided.
 * new ReferenceFrame(1,2,3,4) => 4D Position provided
 *
 * new ReferenceFrame([1,2]) => We provide a position 2D
 * new ReferenceFrame([1,2,3]) => 3D Position provided.
 * new ReferenceFrame([1,2,3,4]) => 4D Position provided
 *
 * new ReferenceFrame(r:Vector) => One vector sets position
 *
 * Given one of the following positions or none at all, se state the axis in coordinates realtive to another frame.
 *
 * new ReferenceFrame([1,2], [3,4]) => 2 vectors. It normalizes the trihedron by default
 * new ReferenceFrame([1,2], [3,4], "!n") => 2 vectors. Do not normalize the trihedron.
 * valid synonums for "!n": "not normalize", "do not normalize", "don't normalize", "quiet", "be quiet", "leave alone" and "leave it alone". Case is not relevant.
 * new ReferenceFrame([1,2], [2,4]) shall raise an exception since they're linearly dependent.
 * new ReferenceFrame([1,2]) collide with of the cases above, but if it were one of the vectors the other one should be calculated to be perpendicualar. Note that it only collides with dimension 2 vectors.
 * new ReferenceFrame([1,2], [2,4], [5,6]) shall raise an error.
 * new ReferenceFrame([1,2], [2,4,5], [5,6]) v1 and v3 shall be padded with zeros.
 * Vector can be passed instead of arrays.
 * 
 * new ReferenceFrame([1,2], [3,4]) => Collides as a two axes collides against position + axis.
 * new ReferenceFrame([1,2], [[3,4]]) or new ReferenceFrame([[1,2], [3,4]]) wrapping the vector system inside an array resolves the ambiguity.
 */

Perspective.ScaleTransformation.prototype = new  Perspective.Transformation
Perspective.ScaleTransformation.prototype.constructor = Perspective.ScaleTransformation

Perspective.ScaleTransformation = function(sx, sy){
    this.transformation_matrix = [
        [sx,  0,   0],
        [0,   sy,  0],
        [0,   0,   1]
    ]

}

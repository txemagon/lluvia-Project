Perspective.RotateTransformation.prototype = new  Perspective.Transformation
Perspective.RotateTransformation.prototype.constructor = Perspective.RotateTransformation

Perspective.RotateTransformation = function(angle){
    var cos = Math.cos(angle)
    var sin = Math.sin(angle)
    this.transformation_matrix = [
        [cos , -sin , 0],
        [sin ,  cos , 0],
        [0   , 0    , 1]
    ]

}

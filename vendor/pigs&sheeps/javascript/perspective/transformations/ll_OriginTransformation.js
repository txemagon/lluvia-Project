Perspective.OriginTransformation.prototype = new  Perspective.Transformation
Perspective.OriginTransformation.prototype.constructor = Perspective.OriginTransformation

Perspective.OriginTransformation = function(x,y){
    this.transformation_matrix = [
        [1, 0, x],
        [0, 1, y],
        [0, 0, 1]
    ]

}

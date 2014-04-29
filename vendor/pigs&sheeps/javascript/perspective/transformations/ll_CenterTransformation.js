Perspective.CenterTransformation.prototype = new  Perspective.Transformation
Perspective.CenterTransformation.prototype.constructor = Perspective.CenterTransformation

/* Transformations origin from a typical right x down y (windows coordinates)
* to a centered right x up y */
Perspective.CenterTransformation = function(width, height){
    this.transformation_matrix = [
        [ 1 , 0  , width  / 2 ],
        [ 0 , -1 , height / 2 ],
        [ 0 , 0  , 1          ]
    ]

}

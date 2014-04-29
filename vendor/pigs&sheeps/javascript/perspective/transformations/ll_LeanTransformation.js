Perspective.LeanTransformation.prototype = new  Perspective.Transformation
Perspective.LeanTransformation.prototype.constructor = Perspective.LeanTransformation


/**
 * @class LeanTransformation
 * Leans the frame that we are looking through. Its just
 * intended to change top views to isometrics.
 *
 * Imagine the followin intial case
 *
 *                    X
 *                   / \ Eye                   /
 *                    |                       /
 *                    |                      /   angle
 * FRAME    ----------+--p------   ----------------------
 *                    |
 *                    |
 * WORLD    ----------+----P----
 *
 * Then you're watching World's P(X,Y) in screen's p(x,y)
 * If you lean the eye and the frame a given angle then p has to change.
 *
 * @param {Number} angle Angle measured from perpendicular to lean the frame.
 * @param {Number} frame_distance Distance from world to screen.
 * @param {Number} vision Distance from eye to screen.
 *
 */
Perspective.LeanTransformation = function(angle, frame_distance, vision){
    var cos = Math.cos(angle)
    var sin = Math.sin(angle)

    this.transformation_matrix = [
        [1 , 0                   , 0],
        [0 , 1 / Math.sin(angle) , 0],
        [0 , 0                   , 1]
    ]
}

/**
 * @method get_unit_at
 * The further the y, the smaller the objects.
*/
Perspective.LeanTransformation.prototype.get_unit_at = function(y) {

}

/**
 * @class AlignmentBehavior
 *
 * Creates Itinerant Behavior: alignment. See {@link Behavior}
 *
 * @constructor Alignment Behavior
 *
 * @return {AlignmentBehavior}
*/

AlignmentBehavior.prototype = new Behavior
AlignmentBehavior.prototype.constructor = AlignmentBehavior
AlignmentBehavior.prototype.super = Behavior

function AlignmentBehavior(){
  Behavior.apply(this, arguments)
}

AlignmentBehavior.prototype.desired_acceleration = function(){

}

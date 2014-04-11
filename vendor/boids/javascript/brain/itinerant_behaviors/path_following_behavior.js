
/**
 * @classDescription Creates Itinerant Behavior: path following
 *
 * @return {PathFollowingBehavior}
 * @constructor
*/


PathFollowingBehavior.prototype = new Behavior
PathFollowingBehavior.prototype.constructor = PathFollowingBehavior
PathFollowingBehavior.prototype.super = Behavior

function PathFollowingBehavior(){
  Behavior.apply(this, arguments)
}

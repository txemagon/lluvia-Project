requires('Behavior')

/**
 * @class PathFollowingBehavior
 * Creates Itinerant Behavior: path following
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

/**
 * @method desired_acceleration
 *
 * Calculates the acceleration the boid needs to change its position
 *
 * @param {} 
 * 
 * @return {Vector}  Returns a vector with the boid's desired acceleration
 */
PathFollowingBehavior.prototype.desired_acceleration = function() {
  return new Vector(0,0)
}


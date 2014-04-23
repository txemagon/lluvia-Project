/**
 * @class WanderBehavior
 *
 * Creates Itinerant Behavior: wander
 *
 * @constructor WanderBehavior
 */


WanderBehavior.prototype = new Behavior
WanderBehavior.prototype.constructor = WanderBehavior
WanderBehavior.prototype.super = Behavior

function WanderBehavior(){
  Behavior.apply(this, arguments)
  this.target = null
  this.D = 50
  this.R = 40
  this.theta = 0
  this.initiate_updates()
}

/**
 * @method get_update_target_function
 *
 * Gets an updated function of the target data 
 *
 * @return {Function} Returns a function with update target data
 */
WanderBehavior.prototype.get_update_target_function = function () {
  var that = this
  return function() { that.theta += .5 * (Math.random() * 2 - 1) }
}

/**
 * @method initiate_updates
 *
 * Calls get_update_target_function function every 100 milli seconds
 *
 * @return {} 
 */
WanderBehavior.prototype.initiate_updates = function() {
    setInterval(this.get_update_target_function(), 100)
}

/**
 * @method target_at
 *
 * Get the distance between the given boid and its target
 *
 * @return {Vector} Returns a vector with the distance to target
 */
WanderBehavior.prototype.target_at = function(){
  return (new Vector(this.me.heading().scale(this.D))).add( new Vector(this.R, this.theta, "pol") )
}

/**
 * @method desired_velocity
 *
 * Calculates the velocity the boid needs to change its position
 *
 * @param {} 
 * 
 * @return {Vector}  Returns a vector with the boid's desired velocity
 */
WanderBehavior.prototype.desired_velocity = function(){
  return new Vector(this.target_at().unit().scale(this.me.vel_max))
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
WanderBehavior.prototype.desired_acceleration = function(){
   return this.desired_velocity().subs(this.me.velocity())
}


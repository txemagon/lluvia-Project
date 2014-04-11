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

WanderBehavior.prototype.get_update_target_function = function () {
  var that = this
  return function() { that.theta += .5 * (Math.random() * 2 - 1) }
}

WanderBehavior.prototype.initiate_updates = function() {
    setInterval(this.get_update_target_function(), 100)
}

WanderBehavior.prototype.target_at = function(){
  return (new Vector(this.me.heading().scale(this.D))).add( new Vector(this.R, this.theta, "pol") )
}

WanderBehavior.prototype.desired_velocity = function(){
  return new Vector(this.target_at().unit().scale(this.me.vel_max))
}

WanderBehavior.prototype.desired_acceleration = function(){
   return this.desired_velocity().subs(this.me.velocity())
}


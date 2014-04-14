
/**
 * @class FleeBehavior
 *
 * Creates Itinerant Behavior: flee
 *
 * @constructor
 *
 */
FleeBehavior.prototype = new Behavior
FleeBehavior.prototype.constructor = FleeBehavior
FleeBehavior.prototype.super = Behavior

function FleeBehavior(){
  Behavior.apply(this, arguments)
  this.target = null
}

/**
 * @method set_target
 *
 * Search a target boid
 *
 * @param  {Object} boid Target boid
 *
 */
FleeBehavior.prototype.set_target = function(boid){
  this.target = boid || new Boid({
                          position:      new Vector(1,1),
                          velocity:      new Vector(1,1),
                          acceleration:  new Vector(1,1)
      }, "red")
}

/**
 * @method target_data
 *
 * Position information of boid
 *
 * @return {Object} this.target.geo_data Position information of boid
 */
FleeBehavior.prototype.target_data = function(){
  if (!this.target)
    throw "FleeBehavior Disabled. Still no target."
  return this.target ? this.target.geo_data : null
}

/**
 * @method get_target
 *
 * Get a targetboid
 *
 * @return {Object} this.target_data() Position information of boid
 */
FleeBehavior.prototype.get_target = function(){
  return this.target_data()
}

/**
 * @method target_at
 *
 * Description
 *
 * @return {}
 */
FleeBehavior.prototype.target_at = function(){
  return this.get_target().position.subs( this.me.geo_data.position )
}

/**
 * @method desired_velocity
 *
 * Desired velocity by boid
 *
 * @return {Object} vector Vector velocity
 */
FleeBehavior.prototype.desired_velocity = function(){
  var arrival_distance
  try{
    arrival_distance = this.target_at().module()
  }catch(err){
    arrival_distance = 0
  }
  var scale = 1

  return (new Vector(this.target_at().unit().scale(-scale * this.me.vel_max)))
}

/**
 * @method desired_acceleration
 *
 * Desired acceleration by boid
 *
 * @return {Object} vector Vector acceleration
 *
 */
FleeBehavior.prototype.desired_acceleration = function(){
  return this.desired_velocity().subs(this.me.velocity())
}


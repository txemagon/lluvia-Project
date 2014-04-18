/**
 * @class PursueBehavior
 *
 * Creates Itinerant Behavior: pursue
 *
 * @constructor PursueBehavior
 *
 */

PursueBehavior.prototype = new Behavior
PursueBehavior.prototype.constructor = PursueBehavior
PursueBehavior.prototype.super = Behavior

function PursueBehavior(){
  Behavior.apply(this, arguments)
  this.target = null
  this.X = 0
}


/**
 * @method set_target
 *
 * Search a target boid
 *
 * @param  {Object} boid Target boid
 *
 */
PursueBehavior.prototype.set_target = function(boid){
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
PursueBehavior.prototype.target_data = function(){
  if (!this.target)
    throw "PursueBehavior Disabled. Still no target."
  return this.target ? this.target.geo_data : null
}


/**
 * @method get_target
 *
 * Get a targetboid
 *
 * @return {Object} this.target_data() Position information of boid
 */
PursueBehavior.prototype.get_target = function(){
  return this.target_data()
}


/**
 * @method target_at
 *
 * Description
 *
 * @return {}
 */
PursueBehavior.prototype.target_at = function() {
  var boid_target_pos      = this.get_target().position
  var boid_target_rel_pos  = boid_target_pos.subs(this.me.geo_data.position)
  var boid_target_velocity = this.get_target().velocity
  var impact_time          = boid_target_rel_pos.module() / this.me.geo_data.velocity.module()

  return boid_target_pos.add( boid_target_velocity.scale( impact_time )).subs( this.me.geo_data.position )
}


/**
 * @method desired_velocity
 *
 * Desired velocity by boid
 *
 * @return {Object} vector Vector velocity
 */
PursueBehavior.prototype.desired_velocity = function(){
  var arrival_distance
  try{
    arrival_distance = this.target_at().module()
  }catch(err){
    arrival_distance = 0
  }
  var scale = 1

  return new Vector( this.target_at().unit().scale( scale * this.me.vel_max ) )
}


/**
 * @method desired_acceleration
 *
 * Desired acceleration by boid
 *
 * @return {Object} vector Vector acceleration
 *
 */
PursueBehavior.prototype.desired_acceleration = function(){
  return this.desired_velocity().subs(this.me.velocity())
}


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
 * Searches a target boid
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
 * Information about the position of boid
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
 * Gets a target boid
 *
 * @return {Object} this.target_data() Position information of boid
 */
PursueBehavior.prototype.get_target = function(){
  return this.target_data()
}


/**
 * @method target_at
 *
 * Get the distance between the given boid and its target
 *
 * @return {}
 */
PursueBehavior.prototype.target_at = function(){
  //=> X=X0 + V(t-t0)
  var x = new Vector((this.get_target().position.add(new Vector(this.get_target().velocity))).scale(1))
  this.X = x
  return x.subs( this.me.geo_data.position )
}


/**
 * @method desired_velocity
 *
 * Gets the desired velocity of the boid
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
  /* Arrival behavior Modifier
  if (this.approach_distance > arrival_distance)
    scale = arrival_distance / this.approach_distance
    */
  return (new Vector(this.target_at().unit().scale(scale * this.me.vel_max)))
}


/**
 * @method desired_acceleration
 *
 * Gets the desired acceleration by boid
 *
 * @return {Object} vector Vector acceleration
 *
 */
PursueBehavior.prototype.desired_acceleration = function(){
  return this.desired_velocity().subs(this.me.velocity())
}


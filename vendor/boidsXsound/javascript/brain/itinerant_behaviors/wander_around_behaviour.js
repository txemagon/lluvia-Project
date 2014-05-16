
/**
 * @class WanderBehavior 
 *
 * Creates Itinerant Behavior: wander around
 *
 * @constructor
 */
WalkBehavior.prototype = new Behavior
WalkBehavior.prototype.constructor = WalkBehavior
WalkBehavior.prototype.super = Behavior

function WalkBehavior(){
  Behavior.apply(this, arguments)
  this.target = null
  this.timer = (Math.random()* (300 - 200 +1)) + 200 
  this.aux = 0
}


/**
 * @method set_target
 *
 * Search a target boid
 *
 * @param  {Object} boid Target boid
 *
 */
WalkBehavior.prototype.set_target = function(boid){
  this.target = boid || new Boid({
                          position:      new Vector(Math.floor(Math.random()*400),Math.floor(Math.random()*400)),
                          velocity:      new Vector(0,0),
                          acceleration:  new Vector(0,0)
      }, "red")
}

/**
 * @method target_data
 *
 * Position information of boid
 *
 * @return {Object} this.target.geo_data Position information of boid
 */
WalkBehavior.prototype.target_data = function(){
  //timer = (Math.random()* 300) + 200
  if (!this.target)
    throw "WalkBehavior Disabled. Still no target."
  else if(this.aux >= this.timer){
    this.set_target()
    this.aux = 0
  }
  this.aux++

  return this.target ? this.target.geo_data : null
}

/**
 * @method get_target
 *
 * Get a targetboid 
 *
 * @return {Object} this.target_data() Position information of boid
 */
WalkBehavior.prototype.get_target = function(){
  return this.target_data()
}

/**
 * @method target_at
 *
 * Get the distance between the given boid and its target
 *
 * @return {}
 */
WalkBehavior.prototype.target_at = function(){
  return this.get_target().position.subs( this.me.geo_data.position )
}

/**
 * @method desired_velocity
 *
 * Desired velocity by boid
 *
 * @return {Object} vector Vector velocity
 */
WalkBehavior.prototype.desired_velocity = function(){
  var arrival_distance
  try{ 
    arrival_distance = this.target_at().module()
  }catch(err){
    arrival_distance = 0
  }
  var scale = 1
  
  return (new Vector(this.target_at().unit().scale(scale * this.me.vel_max)))
}

/**
 * @method desired_acceleration
 *
 * Desired acceleration by boid
 *
 * @return {Object} vector Vector acceleration
 *
 */
WalkBehavior.prototype.desired_acceleration = function(){
  return this.desired_velocity().subs(this.me.velocity())
}

/**
 * @classDescription Creates Itinerant Behavior: wall following
 *
 * @return {WallFollowingBehavior}
 * @constructor
*/


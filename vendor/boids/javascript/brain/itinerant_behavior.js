/**
 * @class SeekBehavior
 *
 * Creates Itinerant Behavior: seek
 *
 * @constructor
 * 
 */

SeekBehavior.prototype = new Behavior
SeekBehavior.prototype.constructor = SeekBehavior
SeekBehavior.prototype.super = Behavior

function SeekBehavior(){
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
SeekBehavior.prototype.set_target = function(boid){
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
SeekBehavior.prototype.target_data = function(){
  if (!this.target)
    throw "SeekBehavior Disabled. Still no target."
  return this.target ? this.target.geo_data : null
}

/**
 * @method get_target
 *
 * Get a targetboid 
 *
 * @return {Object} this.target_data() Position information of boid
 */
SeekBehavior.prototype.get_target = function(){
  return this.target_data()
}

/**
 * @method target_at
 *
 * Description
 *
 * @return {}
 */
SeekBehavior.prototype.target_at = function(){
  return this.get_target().position.subs( this.me.geo_data.position )
}

/**
 * @method desired_velocity
 *
 * Desired velocity by boid
 *
 * @return {Object} vector Vector velocity
 */
SeekBehavior.prototype.desired_velocity = function(){
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
 * Desired acceleration by boid
 *
 * @return {Object} vector Vector acceleration
 *
 */
SeekBehavior.prototype.desired_acceleration = function(){
  return this.desired_velocity().subs(this.me.velocity())
}

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


/**
 * @class WanderBehavior 
 *
 * Creates Itinerant Behavior: wander
 *
 * @constructor
 */


WanderBehavior.prototype = new Behavior
WanderBehavior.prototype.constructor = WanderBehavior
WanderBehavior.prototype.super = Behavior

function WanderBehavior(){
  Behavior.apply(this, arguments)
}

/**
 * @class WanderBehavior 
 *
 * Creates Itinerant Behavior: wander around
 *
 * @constructor
 */
WanderAroundBehavior.prototype = new Behavior
WanderAroundBehavior.prototype.constructor = WanderAroundBehavior
WanderAroundBehavior.prototype.super = Behavior

function WanderAroundBehavior(){
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
WanderAroundBehavior.prototype.set_target = function(boid){
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
WanderAroundBehavior.prototype.target_data = function(){
  //timer = (Math.random()* 300) + 200
  if (!this.target)
    throw "WanderAroundBehavior Disabled. Still no target."
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
WanderAroundBehavior.prototype.get_target = function(){
  return this.target_data()
}

/**
 * @method target_at
 *
 * Description
 *
 * @return {}
 */
WanderAroundBehavior.prototype.target_at = function(){
  return this.get_target().position.subs( this.me.geo_data.position )
}

/**
 * @method desired_velocity
 *
 * Desired velocity by boid
 *
 * @return {Object} vector Vector velocity
 */
WanderAroundBehavior.prototype.desired_velocity = function(){
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
WanderAroundBehavior.prototype.desired_acceleration = function(){
  return this.desired_velocity().subs(this.me.velocity())
}

/**
 * @classDescription Creates Itinerant Behavior: wall following
 *
 * @return {WallFollowingBehavior}
 * @constructor
*/


WallFollowingBehavior.prototype = new Behavior
WallFollowingBehavior.prototype.constructor = WallFollowingBehavior
WallFollowingBehavior.prototype.super = Behavior

function WallFollowingBehavior(){
  Behavior.apply(this, arguments)
}

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


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
}

/**
 * @method set_target
 *
 * Searches for a target boid
 *
 * @param  {Object} boid Target boid
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
  var that = this
  if (!this.target)
    throw "FleeBehavior Disabled. Still no target."
  if (this.target instanceof Function){
    var targets = []
      this.me.visible_objects().each(function(visible_object){
         visible_object.brain.active_behaviors.keys().each(function(b){
          if (Behavior.type_of(b) == that.target)
            targets.push(visible_object)
          })
        })

      return targets
    }

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
  //return this.target_data()
  return this.targets
}

/**
 * @method target_at
 *
 * Get the distance between the given boid and its target
 *
 * @return {}
 */
FleeBehavior.prototype.target_at = function(target){
  return target.position.subs( this.me.geo_data.position )
}

/**
 * @method desired_velocity
 *
 * Desired velocity by boid
 *
 * @return {Object} vector Vector velocity
 */
FleeBehavior.prototype.desired_velocity = function(target){
  var arrival_distance
  try{
    arrival_distance = this.target_at(target).module()
  }catch(err){
    arrival_distance = 0
  }
  var scale = 1

  return (new Vector(this.target_at(target).unit().scale(-scale * this.me.vel_max)))
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
  var that = this
  var target = this.get_target()
  if (!target || !target.length)
    return new Vector(0, 0)
  if (target instanceof Array){
      if (target.length > 1)
        target.sort_by(function(el){
          return el.geo_data.position.subs(that.me.geo_data.position).module()
        })
      target = target[0]
  }
  return this.desired_velocity(target.geo_data).subs(this.me.velocity())
}

FleeBehavior.prototype.add_target = function(someone){
  var that = this
  someone.brain.active_behaviors.keys().each(function(b){
          if ( b != "undefined" && Behavior.type_of(b) == that.target)
            that.targets.push(someone)
          })
}
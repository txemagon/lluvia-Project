/**
 * @class Brain
 *
 * Creates a Brain for the Boid
 *
 * @constructor Brain
 *
 * @return {Brain}
*/
function Brain(body){
   this.body = body
   var that = this
   this.behaviors = {}
}

/**
 * @method can$U
 *
 * Checks if the boid can activate an specific behavior
 *
 * @param {String}   behavior Name of the behavior to be checked
 *
 * @return {Boolean}  Returns true if the boid accepts the behavior. False if not
 */
Brain.prototype.can$U = function(behavior){
  return this.behaviors.inject(false, function(group, can){
      return can || group.can$U(behavior)
      })
}

/**
 * @method can_be_in$U
 *
 * Checks if a given behavior can be used by a certain boid
 *
 * @param {String}  behavior Name of the behavior to be checked
 *
 * @return {Boolean}  Returns true if the boid can use the behavior. False if not.
 */
Brain.prototype.can_be_in$U = function(behavior){
  return Brain.prototype.can$U.apply(this, arguments)
}

/**
 * @method activate
 *
 * Activates the boid's behaviors
 *
 * @param {}
 * 
 */
Brain.prototype.activate = function(){
  for (var i=0; i<arguments.length; i++){
    do_something = arguments[i]
    this.behaviors.each(function(this_behavior){
        if (this_behavior.can$U(do_something))
          this_behavior.activate(do_something)
        })
  }
}

/**
 * @method is_in$U
 *
 * Check if the boid's list of behaviors have the given behavior 
 *
 * @param {String}  behavior Name of the behavior to check
 *
 * @return {Boolean} Returns true if the behavior exists. False if not.
 */
Brain.prototype.is_in$U = function(behavior){
   behavior = Behavior.decompose_name(behavior)[1]
   return this.behaviors.inject(false, function(group, is_in){
      return is_in || group.is_active$U(behavior)
      })
}

/**
 * @method active_behaviors
 *
 * Obtains all the behavior that are currently activated
 *
 * @param {}
 *
 * @return {}  Returns an array with the active behaviors
 */
Brain.prototype.active_behaviors = function(){
  return this.behaviors.inject([], function(el, behaviors){
          behaviors.push(el.active_behaviors())
	  return behaviors
      }).flatten()
}

/**
 * @method all_behaviors
 *
 * Obtains all the behaviors the boid can access
 *
 * @param {}
 *
 * @return {Array}  Returns an array with all the behaviors
 */
Brain.prototype.all_behaviors = function(){
  return this.behaviors.inject([], function(group, behaviors){
    return group.behavior.self_keys().collect(function(key){
      return group.behavior[key]
    })
  }).flatten()
}

/**
 * @method get_behavior
 *
 * Obtains the behavior passed as parameter
 *
 * @param {String} b_name String that contains the name of the desired behavior
 *
 * @return {}  Returns the desired behavior if the boid can access to it
 */
Brain.prototype.get_behavior = function(b_name){
  b_name = Behavior.decompose_name(b_name)[1]

  return this.behaviors.inject(null, function(group, requested){
    if (group.can$U(b_name))
      return group.behavior[b_name]
    return requested
  })
}

/**
 * @method desired_accelerations
 *
 * Gets all the desired accelerations of the given boid
 *
 * @param {}
 *
 * @return {Array}  Returns an array of vectors with the boid's accelerations
 */
Brain.prototype.desired_accelerations = function(){
  return this.behaviors.inject( { none: new Vector(0,0) }, function(el_group, accelerations){
          var da = el_group.desired_accelerations() || {}
	  da.self_keys().each(function(key){ accelerations[key] = da[key] })
	  return accelerations
      })
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
Brain.prototype.desired_acceleration = function(){ // This is the place for a neural net
  var da = this.desired_accelerations()
  return da.self_keys().inject(new Vector(0,0), function(behavior, sum){
	  return sum.add(da[behavior])
	})
}

/*
Behaviors
=========

  1.  seek
  2.  flee
  3.  wander
  4.  wall following
  5.  path following


  flow field following (it isn't a behavior but an aditive force)

  Auxiliary Behaviors
  ===================

  1.  arrival (is a substate of seeking, and may be pursuing)
  2.  obstacle avoidance
  3.  containment
  4.  Separation
  5.  Alignment
  6.  Cohesion

  Combined (named) behaviors
  ==========================
  1.  pursue
  2.  evade
  3.  flocking
  4.  Crowd path following
  5.  Leader following
  6.  Unaligned collision avoidance
  7.  Queuing
*/

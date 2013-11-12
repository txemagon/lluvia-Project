/**
 * @classDescription Creates a Brain for the Boid
 *
 * @return {Brain}
 * @constructor
*/


function Brain(body){
   this.body = body
   var that = this
   this.behaviors = []

}

Brain.prototype.add_behaviors = function(list_of_behaviors, behavior_type){
   behavior_type = behavior_type || BehaviorList /* BehaviorSet || BehaviorList */
   this.behaviors.push( 
     list_of_behaviors.inject( new behavior_type(), function(behavior, set){
           var b_name = Behavior.decompose_name(behavior)
           set.append(behavior, eval("new " + b_name[1].class_name() + "Behavior(that, body, '" + b_name[0] + "', '" + b_name[2] + "')") )
     return set
   })
     )
}

Brain.prototype.can$U = function(behavior){
  return this.behaviors.inject(false, function(group, can){
      return can || group.can$U(behavior)
      })
}

Brain.prototype.can_be_in$U = function(behavior){
  return Brain.prototype.can$U.apply(this, arguments)
}

Brain.prototype.activate = function(){
  for (var i=0; i<arguments.length; i++){
    do_something = arguments[i]
    this.behaviors.each(function(this_behavior){
        if (this_behavior.can$U(do_something))
          this_behavior.activate(do_something)
        })
  }
}

Brain.prototype.is_in$U = function(behavior){
   behavior = Behavior.decompose_name(behavior)[1]
   return this.behaviors.inject(false, function(group, is_in){
      return is_in || group.is_active$U(behavior)
      })
}

Brain.prototype.active_behaviors = function(){
  return this.behaviors.inject([], function(el, behaviors){
          behaviors.push(el.active_behaviors())
	  return behaviors
      }).flatten()
}

Brain.prototype.all_behaviors = function(){
  return this.behaviors.inject([], function(group, behaviors){
    return group.behavior.self_keys().collect(function(key){
      return group.behavior[key]
    })
  }).flatten()
}

Brain.prototype.get_behavior = function(b_name){
  b_name = Behavior.decompose_name(b_name)[1]

  return this.behaviors.inject(null, function(group, requested){
    if (group.can$U(b_name))
      return group.behavior[b_name]
    return requested
  })
}

Brain.prototype.desired_accelerations = function(){
  return this.behaviors.inject( { none: new Vector(0,0) }, function(el_group, accelerations){
          var da = el_group.desired_accelerations() || {}
	  da.self_keys().each(function(key){ accelerations[key] = da[key] })
	  return accelerations
      })
}


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

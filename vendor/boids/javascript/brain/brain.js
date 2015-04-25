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

   var that  = this
   this.body = body

   /*  Behavior.catalog holds all known behaviors.
    *  Lower this in brain derived classes to reduce skills.
    */
   this.possible_behaviors = Behavior.catalog
   this.active_behaviors   = new Hash(
      { undefined: [{target:null, desired_acceleration: new Vector(0,0)}]
   })

}

/**
 * @method can$U
 *
 * Checks if the boid can activate an specific behavior
 *
 * @param  {String}   behavior Name of the behavior to be checked
 * @return {Boolean}  Returns true if the boid accepts the behavior. False if not.
 */
Brain.prototype.can$U = function(behavior){
   return this.possible_behaviors[behavior] ? true : false
}

/**
 * @method can_be_in$U
 *
 * Checks if a given behavior can be used by a certain boid
 *
 * @param  {String}  behavior Name of the behavior to be checked
 * @return {Boolean} Returns true if the boid can use the behavior. False if not.
 */
Brain.prototype.can_be_in$U = function(behavior){
   return Brain.prototype.can$U.apply(this, arguments)
}

/**
 * @method activate
 *
 * Activates one boid behavior. Intransitive behavior have an undefined target.
 *
 * @param {String} behavior Behavior name ('seek>arrival').
 * @param {Object} [target]   Direct object of behavior verb.
 */
Brain.prototype.activate = function(behavior, target_after){
   var verbose_behavior = Behavior.decompose_name(behavior)
   var behavior_class = verbose_behavior[1]

   this.active_behaviors[behavior_class] = this.active_behaviors[behavior_class] || []
   if (this.possible_behaviors[behavior_class]){
      this.active_behaviors[behavior_class].push( {
	 target: target_after,
	 behavior: Behavior.new(this, behavior, target_after)
      })
      if(target_after instanceof Boid)
         this.body.target.push(target_after)
      else
         if(typeof(target_after) == "function")
            this.body.target.push(target_after.name.split(/Behavior/i)[0].toLocaleLowerCase())
      this.body.behavior.push(behavior.toLocaleLowerCase())
   }
}

/**
 * @method deactivate
 *
 * Deactivates one boid behavior. Intransitive behavior have an undefined target.
 *
 * @param {String} behavior   Behavior name ('seek').
 * @param {Object} [target]   Direct object of behavior verb.
 */
Brain.prototype.deactivate = function(behavior, target){
   behavior = behavior || []
   this.active_behaviors[behavior].erase_if$B(function(element) { element.target = target })
}

/**
 * @method is_in$U
 *
 * Check if the boid's list of behaviors have the given behavior
 *
 * @param  {String}  behavior Name of the behavior to check
 * @param  {Object}  [target]   Direct object of behavior verb.
 * @return {Boolean} Returns true if the behavior exists. False if not.
 */
Brain.prototype.is_in$U = function(behavior, target){
   behavior = behavior || []
   return this.active_behaviors[behavior].collect(function (obj) {
      return obj.target
   }).include$U(target)
}

/**
 * @method get_behavior
 *
 * Obtains the behavior passed as parameter
 *
 * @param  {String}  b_name String that contains the name of the desired behavior
 * @param  {Object}  [target]   Direct object of behavior verb.
 * @return {Object}  Returns the desired behavior if the boid can access to it
 */
Brain.prototype.get_behavior = function(b_name, target){

   if ( !this.active_behaviors[b_name] )
      return null

   return this.active_behaviors[b_name].inject(null, function(possible, found) {
      if ( possible.target == target )
	 return possible.behavior
      return found
   })
}

Brain.prototype._$see_accelerations = function (){
   var be = this.active_behaviors
   var see = ""

   if (this.body.name)
      see += "name: " + this.body.name  + "\n"

   see += "Behaviors: " + be.self_keys() + "\n"

   be.each(function(key, value) {
      see += "\n" + key + ": "
      value.each(function(target) {
	 see += target.desired_acceleration.Coord
      })
   })

   see += "\n\n" + be.toSource()

   return see
}

/**
 * @method desired_accelerations
 *
 * Gets all the desired accelerations of the given boid
 *
 *    {
 *      none:   new Vector(0,0),
 *      seek:   [
 *               {
 *                target: boid1,
 *                behavior: behavior_ptr,
 *                desired_acceleration: new Vector(5,3)
 *               },
 *               {
 *                target: boid2,
 *                behavior: behavior_ptr,
 *                desired_acceleration: new Vector(1,4)
 *               }
 *              ],
 *      wander: [
 *               {
 *                target: undefined,
 *                behavior: wander_behavior_ptr,
 *                desired_acceleration: new Vector(2,3)
 *               }
 *              ]
 *    }
 *
 */
Brain.prototype.desired_accelerations = function(){
   var result
   try {

      this.active_behaviors.each( function(name, behaviour){
	 behaviour.each( function(target) {
	    if (target && target.behavior)
	       target.desired_acceleration =  target.behavior.desired_acceleration()  || target.desired_acceleration || new Vector(0,0)
	 })
      })
   } catch(err) {
      throw "Error in Brain#desired_accelerations"
   }

}

/**
 * @method desired_acceleration
 *
 * Calculates the acceleration the boid needs to change its position
 *
 * @return {Vector}  Returns a vector with the boid's desired acceleration
 */
Brain.prototype.desired_acceleration = function(){ // This is the place for a neural net
   this.desired_accelerations()
   //alert(this._$see_accelerations())
   var be = this.active_behaviors
   var be_keys
   var result = new Vector(0,0)

   if (be && (be_keys = be.self_keys()) ) {
      result= be_keys.inject(new Vector(0,0),
        		     function(behavior, sum){
        			var result =  be[behavior].inject(sum, function(target, sum){
        			   return sum.add(target.desired_acceleration) || sum
        			}) || new Vector(0,0)
				return result
        		     })

   }

   return result || new Vector(0,0)
}


/*ESTO CREO QUESOBRARA*/
// Brain.prototype.clean_behavior_targets = function(){
//    this.active_behaviors.each( function(name, behaviour){
//       behaviour.each( function(target) {
//          if (target && target.behavior)
//             target.behavior.clean_targets()
//       })
//    })
// }

// Brain.prototype.interested_in_this = function(someone){
//    if(!(someone instanceof Boid))
//       return
//       try {
//       this.active_behaviors.each( function(name, behaviour){
//          behaviour.each( function(target) {
//             if (target && target.behavior)
//                target.behavior.add_target(someone)
//          })
//       })
//    } catch(err) {
//       throw "Error in Brain#interested_in_this"
//    }
// }

/*
   Behaviors Wish List
   ===================

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

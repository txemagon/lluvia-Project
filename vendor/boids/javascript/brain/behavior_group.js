/**
 * @class BehaviorGroup
 *
 * Behavior Factory
 *
 * @constructor Behavior Group
 *
 * @return {BehaviorGroup} Returns a Behaviour constructor
*/
function BehaviorGroup(type){
  if (BehaviorGroup.invalid_type$U( type ) )
    throw "Invalid Behaviour Group Type"
  if (arguments.length)
    return function (behavior){
           this.type = BehaviorGroup.valid_types[type]
           this._active_behaviors = new Set()
           this.behavior = behavior || { none: 0 }  // Try to include none as the idle behavior
         }
}

BehaviorGroup.valid_types = Enumeration("set", "list")


/**
 * @method invalid_type$U
 *
 * Checks if the type of behavior is a group behavior
 *
 * @param {} type Behavior to be checked
 * 
 * @return {} Returns false if type is not a group behavior or is not defined
 */
BehaviorGroup.invalid_type$U = function(type){
  if (!type)
    return false
  return !BehaviorGroup.valid_types.self_keys().include$U( type.toLowerCase() )
}
/**
 * @method append
 *
 * Adds a behavior to the behavior group
 *
 * @param {String} name Name of the behavior to be added
 * @param {Object} obj Object to which the behavior is addded
 * 
 * @return {} Returns the added behavior 
 */
BehaviorGroup.prototype.append = function(name, obj){
  this.behavior[Behavior.decompose_name(name)[1]] = obj
  return this
}

/**
 * @method can$U
 *
 * Asks if the given behavior can be a group behavior
 *
 * @param {String} behavior Name of the behavior to be checked 
 * 
 * @return {Boolean} Returns true if behavior is a group behavior. False if not
 */
BehaviorGroup.prototype.can$U = function(behavior){
  behavior = Behavior.decompose_name(behavior)[1]
  if (this.behavior[behavior])
    return true
  return  false
}

/**
 * @method activate
 *
 * Activates the group behavior if it isn't active already
 *
 * @param {String} state State of the behavior
 * 
 * @return {} 
 */
BehaviorGroup.prototype.activate = function(state){
  if (this.type == BehaviorGroup.valid_types.set)
    this._active_behaviors[0] = state
  else{
    if (arguments[0] instanceof Array)
      for (var i=0; i<arguments[0].length; i++)
        this._active_behaviors.push(arguments[0][i])
    else
      for (var i=0; i<arguments.length; i++)
        this._active_behaviors.push(arguments[i])
  }
}

/**
 * @method active_behavior
 *
 * Gets the behavior that is active at the moment
 *
 * @param {} 
 * 
 * @return {} Returns the behavior currently activated
 */
BehaviorGroup.prototype.active_behavior = function(){

  if (this.type == BehaviorGroup.valid_types.set)
    return this._active_behaviors[0]

  return this._active_behaviors
}

/**
 * @method active_behaviors
 *
 * Gets a list of all the current active behaviors
 *
 * @param {} 
 * 
 * @return {} Returns a list of active behaviors 
 */
BehaviorGroup.prototype.active_behaviors = function(){
  return this.active_behavior()
}

/**
 * @method is_active$U
 *
 * Checks if the given behavior is active
 *
 * @param {String} state Current state of the behavior
 * 
 * @return {Boolean} Returns true if behavior is active. False if not
 */
BehaviorGroup.prototype.is_active$U = function(state){
  if (this.type == BehaviorGroup.valid_types.set)
      return this._active_behaviors[0] == state

  return this.active_behaviors().include$U(state.toLowerCase())
}

/**
 * @method desired_accelerations
 *
 * Gets a list of all the acceleration used by the behavior
 *
 * @param {} 
 * 
 * @return {Array} Returns a list of desired accelerations
 */
BehaviorGroup.prototype.desired_accelerations = function(){

    if ( (typeof(this._active_behaviors) == "undefined"))
      return {none: new Vector(0,0)}
    var that = this
    var bh_list = this.active_behaviors()
    if (this.type == BehaviorGroup.valid_types.set)
      bh_list = [ bh_list ]

    return bh_list.inject( {}, function(state, results){
        if (typeof(that.behavior[state]) !== "undefined")
          results[state] = that.behavior[state].respond_to("desired_acceleration")? that.behavior[state].desired_acceleration() : new Vector(0, 0)
	  return results
	})
}

/**
 * @method get_behavior
 *
 * Gets a specific behavior
 *
 * @param {String} b_name Name of the desired behavior
 * 
 * @return {} Returns the requested behavior
 */
BehaviorGroup.prototype.get_behavior = function( b_name ){
  return this.behavior[b_name]
}

/**
 * @method activate_modifier
 *
 * Actives a behavior modifier of the current behavior
 *
 * @param {String} c_name Name of the modifier
 * 
 * @return {} 
 */
BehaviorGroup.prototype.activate_modifier = function( c_name ){
  var that = this
  c_name = Behavior.decompose_name(c_name)
  this.behavior.self_keys().each(function(behavior){
    if (behavior == c_name[1] )
    for (var i=0; i<3; i = i + 2)
      c_name[i].each(function(modifier){
          that.behavior[behavior].activate_modifier(modifier)
      })
  })
}

/**
 * @class BehaviorSet
 *
 * Creates a Set of Behaviours. Only one behavior can be activated at a time.
 *
 * @constructor Behavior Sets
 *
 * @return {BehaviorSet}
*/
BehaviorSet.prototype  = new BehaviorGroup
BehaviorSet.prototype.constructor = BehaviorGroup("set")

function BehaviorSet(behavior){
  BehaviorSet.prototype.constructor.call(this, behavior)
}

/**
 * @class BehaviorList
 *
 * Creates a Set of Behaviours. Several behaviors can be activated at the same time.
 *
 * @constructor Behavior List
 *
 * @return {BehaviorList}
*/
BehaviorList.prototype = new BehaviorGroup
BehaviorList.prototype.constructor = BehaviorGroup("list")

function BehaviorList(behavior){
  BehaviorList.prototype.constructor.call(this, behavior)
}
/**
 * @method deactivate
 *
 * Turns off a specific behavior from the Behavior List
 *
 * @param {} 
 * 
 * @return {} 
 */
BehaviorList.prototype.deactivate = function(){
  if (arguments[0] instanceof Array)
    for(var i=0; i<arguments[0].length; i++)
      this._active_behaviors.delete$B(arguments[0][i])
  else
    for(var i=0; i<arguments.length; i++)
      this._active_behaviors.delete$B(arguments[i])
}
/**
 * @method reset_to
 *
 * Reset the list of behaviors and adds the behavior passed as parameter
 *
 * @param {} behavior Behavior to include in the lis of behavior
 * 
 * @return {} 
 */
BehaviorList.prototype.reset_to = function(behavior){
  this._active_behaviors.clear$B()
  this._active_behaviors.push(behavior)
}

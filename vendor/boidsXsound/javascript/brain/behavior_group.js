/**
 * @classDescription Behavior Factory
 *
 * @return {Behaviour} Returns a Behaviour constructor
 * @constructor
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
BehaviorGroup.invalid_type$U = function(type){
  if (!type)
    return false
  return !BehaviorGroup.valid_types.self_keys().include$U( type.toLowerCase() )
}

BehaviorGroup.prototype.append = function(name, obj){
  this.behavior[Behavior.decompose_name(name)[1]] = obj
  return this
}

BehaviorGroup.prototype.can$U = function(behavior){
  behavior = Behavior.decompose_name(behavior)[1]
  if (this.behavior[behavior])
    return true
  return  false
}

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

BehaviorGroup.prototype.active_behavior = function(){
  
  if (this.type == BehaviorGroup.valid_types.set)
    return this._active_behaviors[0]
 
  return this._active_behaviors
}

BehaviorGroup.prototype.active_behaviors = function(){
  return this.active_behavior()
}

BehaviorGroup.prototype.is_active$U = function(state){
  if (this.type == BehaviorGroup.valid_types.set)
      return this._active_behaviors[0] == state

  return this.active_behaviors().include$U(state.toLowerCase())
}

BehaviorGroup.prototype.desired_accelerations = function(){
   
    if ( (typeof(this._active_behaviors) == "undefined"))
      return {none: new Vector(0,0)}
    var that = this
    var bh_list = this.active_behaviors()
    if (this.type == BehaviorGroup.valid_types.set)
      bh_list = [ bh_list ]
    
    return bh_list.inject( {}, function(state, results){
        if (typeof(that.behavior[state]) !== "undefined")
	  results[state] = that.behavior[state].respond_to("desired_acceleration")? that.behavior[state].desired_acceleration() : new Vector(0,0)
	  return results
	})
}

BehaviorGroup.prototype.get_behavior = function( b_name ){
  return this.behavior[b_name]
}

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
 * @classDescription Creates a Set of Behaviours
 * Only one behavior can be activated at a time.
 *
 * @return {BehaviorSet}
 * @constructor
*/

BehaviorSet.prototype  = new BehaviorGroup
BehaviorSet.prototype.constructor = BehaviorGroup("set")

function BehaviorSet(behavior){
  BehaviorSet.prototype.constructor.call(this, behavior)
}

/**
 * @classDescription Creates a Set of Behaviours
 * Several behaviors can be activated at the same time.
 *
 * @return {BehaviorList}
 * @constructor
*/
BehaviorList.prototype = new BehaviorGroup
BehaviorList.prototype.constructor = BehaviorGroup("list")

function BehaviorList(behavior){
  BehaviorList.prototype.constructor.call(this, behavior)
}

BehaviorList.prototype.deactivate = function(){
  if (arguments[0] instanceof Array)
    for(var i=0; i<arguments[0].length; i++)
      this._active_behaviors.delete$B(arguments[0][i])
  else
    for(var i=0; i<arguments.length; i++)
      this._active_behaviors.delete$B(arguments[i])
}

BehaviorList.prototype.reset_to = function(behavior){
  this._active_behaviors.clear$B()
  this._active_behaviors.push(behavior)
}

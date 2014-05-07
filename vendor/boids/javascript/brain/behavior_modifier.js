/**
 * @class BehaviorModifier
 *
 * Creates Itinerant BehaviorModifier
 *
 * @constructor Behavior Modifier
 *
 * @return {BehaviorModifier}
*/
function BehaviorModifier(behavior){
  this.behavior = behavior || null
}

/**
 * @method type_of
 *
 * Checks the modifier passed as parameter
 *
 * @param {String} mod_name Name of the modifier
 *
 * @return {String}  Returns the name of the behavior modifier
 */
BehaviorModifier.type_of = function(mod_name){
  return eval(mod_name.class_name().capitalize() + "BehaviorModifier")
}

/**
 * @method is_a$U
 *
 * Checks if a behavior has the given modifier
 *
 * @param {String} mod_name Name of the modifier
 *
 * @return {Boolean} Returns true if the behavior is a modifier. False if not
 */
BehaviorModifier.prototype.is_a$U = function(mod_name){
  try{
    return this instanceof BehaviorModifier.type_of(mod_name)
  } catch(err){
    return false
  }
}

/**
 * @method unfreeze
 *
 * Changes a behavior modifier to active
 *
 * @param {}
 *
 * @return {}
 */
BehaviorModifier.prototype.unfreeze = function(){
  this._FROZEN = false
}

/**
 * @class BeforeBehaviorModifier
 *
 * Creates Itinerant BeforeBehaviorModifier
 *
 * @constructor Before Behavior Modifier
 *
 * @return {BeforeBehaviorModifier}
*/
BeforeBehaviorModifier.prototype = new BehaviorModifier;
BeforeBehaviorModifier.prototype.constructor = BeforeBehaviorModifier
BeforeBehaviorModifier.prototype.super = BehaviorModifier

function BeforeBehaviorModifier(){
  BehaviorModifier.apply(this, arguments)
}

/**
 * @class AfterBehaviorModifier
 *
 * Creates Itinerant AfterBehaviorModifier
 *
 * @constructor After Behavior Modifier
 *
 * @return {AfterBehaviorModifier}
*/
AfterBehaviorModifier.prototype = new BehaviorModifier
AfterBehaviorModifier.prototype.constructor = AfterBehaviorModifier
AfterBehaviorModifier.prototype.super = BehaviorModifier

function AfterBehaviorModifier(){
  BehaviorModifier.apply(this, arguments)
}

/**
 * @class ArrivalBehaviorModifier
 *
 * Creates Itinerant BehaviorModifier: arrival
 *
 * @constructor Arrival Behavior Modifier
 *
 * @return {ArrivalBehaviorModifier}
*/
ArrivalBehaviorModifier.prototype = new BehaviorModifier
ArrivalBehaviorModifier.prototype.constructor = ArrivalBehaviorModifier
ArrivalBehaviorModifier.prototype.super = BehaviorModifier

function ArrivalBehaviorModifier(){
  BehaviorModifier.apply(this, arguments)
  this.approach_distance = 80
}




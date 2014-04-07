/**
 * @classDescription Creates Itinerant BehaviorModifier
 *
 * @return {BehaviorModifier}
 * @constructor
*/

function BehaviorModifier(behavior){
  this.behavior = behavior || null
}

BehaviorModifier.type_of = function(mod_name){
  return eval(mod_name.class_name().capitalize() + "BehaviorModifier")
}

BehaviorModifier.prototype.is_a$U = function(mod_name){
  try{
    return this instanceof BehaviorModifier.type_of(mod_name)
  } catch(err){
    return false
  }
}


BehaviorModifier.prototype.unfreeze = function(){
  this._FROZEN = false
}


BeforeBehaviorModifier.prototype = new BehaviorModifier;
BeforeBehaviorModifier.prototype.constructor = BeforeBehaviorModifier
BeforeBehaviorModifier.prototype.super = BehaviorModifier

function BeforeBehaviorModifier(){ 
  BehaviorModifier.apply(this, arguments)
}

AfterBehaviorModifier.prototype = new BehaviorModifier
AfterBehaviorModifier.prototype.constructor = AfterBehaviorModifier
AfterBehaviorModifier.prototype.super = BehaviorModifier

function AfterBehaviorModifier(){ 
  BehaviorModifier.apply(this, arguments)
}

/**
 * @classDescription Creates Itinerant BehaviorModifier: arrival
 *
 * @return {ArrivalBehaviorModifier}
 * @constructor
*/

ArrivalBehaviorModifier.prototype = new BehaviorModifier
ArrivalBehaviorModifier.prototype.constructor = ArrivalBehaviorModifier
ArrivalBehaviorModifier.prototype.super = BehaviorModifier

function ArrivalBehaviorModifier(){
  BehaviorModifier.apply(this, arguments)
  this.approach_distance = 80
}




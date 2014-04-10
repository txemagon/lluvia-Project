
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


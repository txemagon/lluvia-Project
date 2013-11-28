/**
 * @classDescription Creates Avatar Behavior
 *
 * @return {AvatarBehavior}
 * @constructor
*/

AvatarBehavior.prototype = new Behavior
AvatarBehavior.prototype.constructor = AvatarBehavior
AvatarBehavior.prototype.super = Behavior

function AvatarBehavior(){
  Behavior.apply(this, arguments)
  this.target = null
}

AvatarBehavior.prototype.desired_acceleration = function(){
  return new Vector(1,1)
}

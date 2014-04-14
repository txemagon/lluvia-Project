requires('Behavior')

WallFollowingBehavior.prototype = new Behavior
WallFollowingBehavior.prototype.constructor = WallFollowingBehavior
WallFollowingBehavior.prototype.super = Behavior

function WallFollowingBehavior(){
  Behavior.apply(this, arguments)
}

WallFollowingBehavior.prototype.desired_acceleration = function() {
  return new Vector(0,0)
}


/**
 * @class SeparationBehavior
 *
 * Creates Itinerant Behavior: separation. See {@link Behavior}
 *
 * @constructor Separation Behavior
 *
 * @return {SeparationBehavior}
*/
SeparationBehavior.prototype = new Behavior
SeparationBehavior.prototype.constructor = SeparationBehavior
SeparationBehavior.prototype.super = Behavior

function SeparationBehavior(){
  Behavior.apply(this, arguments)
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
SeparationBehavior.prototype.desired_acceleration = function(){
  var that = this
  var x = 0
  var y = 0
  var count = 0

  this.me.visible_objects().each( function(boid){
    var target_at = boid.geo_data.position.subs( that.me.geo_data.position )
    var r = target_at.module()
    x += target_at.get_coord(0) / r
    y += target_at.get_coord(1) / r
    count++
  })

  return new Vector(x/count, y/count).scale(-1)
}

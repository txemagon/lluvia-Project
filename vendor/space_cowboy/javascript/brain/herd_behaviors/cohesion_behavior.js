/**
 * @class CohesionBehavior
 *
 * Creates Itinerant Behavior: Cohesion. See {@link Behavior}
 *
 * @constructor Cohesion Behavior
 *
 * @return {CohesionBehavior}
*/

CohesionBehavior.prototype = new Behavior
CohesionBehavior.prototype.constructor = CohesionBehavior
CohesionBehavior.prototype.super = Behavior

function CohesionBehavior(){
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
CohesionBehavior.prototype.desired_acceleration = function(){
  var x = 0
  var y = 0
  var count = 0
  this.me.visible_objects().each( function(boid){
   var direction = boid.position
      x += direction.get_cord(0)
      y += direction.get_cord(1)
      count++
  })
  var velocity = this.me.geo_data.velocity
  var desired_velocity = velocity.projection(new Vector(x/count, y/count))

  return desired_velocity.subs(velocity)
}


/**
 * @class AlignmentBehavior
 *
 * Creates Itinerant Behavior: alignment. See {@link Behavior}
 *
 * @constructor Alignment Behavior
 *
 * @return {AlignmentBehavior}
*/

AlignmentBehavior.prototype = new Behavior
AlignmentBehavior.prototype.constructor = AlignmentBehavior
AlignmentBehavior.prototype.super = Behavior

function AlignmentBehavior(){
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
AlignmentBehavior.prototype.desired_acceleration = function(){
  var x = 0
  var y = 0
  var count = 0
  this.me.visible_objects().each( function(boid){
   try {
   var direction = boid.heading()
   x += direction.get_coord(0)
   y += direction.get_coord(1)
   count++
 }catch(e){
    alert("Something went wrong when calculating heading for boid " + boid.id)
 }
  })
  var velocity = this.me.geo_data.velocity
  
  if(count == 0)
    return new Vector(0, 0)

  var desired_velocity = velocity.projection(new Vector(x/count, y/count))

  return desired_velocity.subs(velocity)
}

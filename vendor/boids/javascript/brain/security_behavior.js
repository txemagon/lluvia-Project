/**
 * @class ObstacleAvoidanceBehavior
 *
 * Creates Itinerant Behavior: obstacleAvoidance. See {@link Behavior}
 *
 * @constructor Obstacle Avoidance Behavior
 *
 * @return {ObstacleAvoidanceBehavior}
*/
ObstacleAvoidanceBehavior.prototype = new Behavior
ObstacleAvoidanceBehavior.prototype.constructor = ObstacleAvoidanceBehavior
ObstacleAvoidanceBehavior.prototype.super = Behavior

function ObstacleAvoidanceBehavior(){
  Behavior.apply(this, arguments)
}

/**
 * @class ContainmentBehavior
 *
 * Creates Itinerant Behavior: containment. See {@link Behavior}
 *
 * @constructor Containment Behavior
 *
 * @return {ContainmentBehavior}
*/
ContainmentBehavior.prototype = new Behavior
ContainmentBehavior.prototype.constructor = ContainmentBehavior
ContainmentBehavior.prototype.super = Behavior

function ContainmentBehavior(){
  Behavior.apply(this, arguments)
}


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
  //alert(velocity.Coord)
  //alert(desired_velocity.subs(velocity))

  return desired_velocity.subs(velocity)
  //return new Vector(0, 0)
}



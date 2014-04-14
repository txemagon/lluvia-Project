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

AlignmentBehavior.prototype.desired_acceleration = function(){
  alert("pepe")
	// var x = 0
	// var y = 0
	// var count = 0
	// this.me.visible_objects().each( function(boid){
	// 	var direction = boid.heading()
 //      x += direction.get_cord(0)
 //      y += direction.get_cord(1)
 //      count++
	// })
	// var velocity = this.me.geo_data.velocity
	// var desired_velocity = velocity.projection(new Vector(x/count, y/count))

 //  return desired_velocity.subs(velocity)
  return new Vector(0, 0)
}

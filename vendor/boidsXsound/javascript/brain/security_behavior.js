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

ContainmentBehavior.prototype.desired_acceleration = function(){
  var p = this.me.geo_data.position
  var v = this.me.geo_data.velocity
  var path = this.me.my_world.path
  var l2 = new StraightLine(new Vector(p.get_coord(0), p.get_coord(1)), new Vector(p.get_coord(0) + v.get_coord(0), p.get_coord(1) + v.get_coord(1)))

  for(var i=0; i<path.length; i++){
    if(Line.intersects_segment$U(path[i],l2))
      return new Vector(path[i].get_normal()).scale(200)
}
  return new Vector(0,0)
}

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
* @return {Vector} Returns a vector with the boid's desired acceleration
*/
SeparationBehavior.prototype.desired_acceleration = function(){
  var that = this
  var x = 0
  var y = 0
  var count = 0
  this.me.visible_objects().each( function(boid){
    var target_at = boid.geo_data.position.subs( that.me.geo_data.position )
    var r = target_at.module() || 1
    r /= 28
    x += target_at.get_coord(0) / r
    y += target_at.get_coord(1) / r
    count++
  })

  if(count != 0)
    return new Vector(-x/count, -y/count)
  else
    return new Vector(0,0)
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
* @return {Vector} Returns a vector with the boid's desired acceleration
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

  if(count != 0)
    return desired_velocity.subs(velocity)
  else
    return new Vector(0,0)
  
}


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
* @return {Vector} Returns a vector with the boid's desired acceleration
*/
CohesionBehavior.prototype.desired_acceleration = function(){
  var that = this
  var x = 0
  var y = 0
  var count = 0
  
  this.me.visible_objects().each( function(boid){
    var target_at = boid.geo_data.position
    x += target_at.get_coord(0)
    y += target_at.get_coord(1)
    count++
  })
  if(count != 0)
    //return (new Vector((new Vector(x/count, y/count)).subs(this.me.geo_data.position).unit().scale(this.me.vel_max))).subs(this.me.geo_data.velocity)
    return (new Vector(x/count, y/count)).subs(this.me.geo_data.position)
  else
    return new Vector(0,0)
  
}
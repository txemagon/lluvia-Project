/**
 * @classDescription Creates Itinerant Behavior: obstacle avoidance
 *
 * @return {ObstacleAvoidanceBehavior}
 * @constructor
*/

ObstacleAvoidanceBehavior.prototype = new Behavior
ObstacleAvoidanceBehavior.prototype.constructor = ObstacleAvoidanceBehavior
ObstacleAvoidanceBehavior.prototype.super = Behavior

function ObstacleAvoidanceBehavior(){
  Behavior.apply(this, arguments)
}

/**
 * @classDescription Creates Itinerant Behavior: containment
 *
 * @return {ContainmentBehavior}
 * @constructor
*/

ContainmentBehavior.prototype = new Behavior
ContainmentBehavior.prototype.constructor = ContainmentBehavior
ContainmentBehavior.prototype.super = Behavior

function ContainmentBehavior(){
  Behavior.apply(this, arguments)
}

/**
 * @classDescription Creates Itinerant Behavior: separation
 *
 * @return {SeparationBehavior}
 * @constructor
*/

SeparationBehavior.prototype = new Behavior
SeparationBehavior.prototype.constructor = SeparationBehavior
SeparationBehavior.prototype.super = Behavior

function SeparationBehavior(){
  Behavior.apply(this, arguments)
}

SeparationBehavior.prototype.desired_acceleration = function(){
  var that = this
  var x = 0
  var y = 0
  var count = 0
  
  this.me.visible_objects().each( function(boid){
    var target_at = boid.geo_data.position.subs( that.me.geo_data.position ) 
    x += target_at.get_coord(0)
    y += target_at.get_coord(1)
    count++
  })
  
  return new Vector(x/count, y/count).scale(-1)
}

/**
 * @classDescription Creates Itinerant Behavior: cohesion
 *
 * @return {CohesionBehavior}
 * @constructor
*/

CohesionBehavior.prototype = new Behavior
CohesionBehavior.prototype.constructor = CohesionBehavior
CohesionBehavior.prototype.super = Behavior

function CohesionBehavior(){
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


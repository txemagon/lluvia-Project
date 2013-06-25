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

/**
 * @classDescription Creates Itinerant Behavior: alignment
 *
 * @return {AlignmentBehavior}
 * @constructor
*/

AlignmentBehavior.prototype = new Behavior
AlignmentBehavior.prototype.constructor = AlignmentBehavior
AlignmentBehavior.prototype.super = Behavior

function AlignmentBehavior(){
  Behavior.apply(this, arguments)
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


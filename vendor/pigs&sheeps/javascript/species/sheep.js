/**
 * @classDescription Creates a Sheep
 *
 * @return {Sheep}
 * @constructor
 */
 Sheep.prototype = new Boid
 Sheep.prototype.constructor = Sheep
 Sheep.super = Boid

 function Sheep(){
 	var that = this
    Sheep.super.apply(this, arguments)

 	function initialize(){
 		that.vel_max = 50
 		that.mass = 2
 		that.vision = {radius: 100, angle: 130 * Math.PI / 180}

 		that.force_limits = {
 			thrust: 20,
 			steering: 50,
 			braking: 70
 		}

 	}

 	if (arguments.length)
 		initialize
 }

 SheepBrain.prototype = new Brain
 SheepBrain.prototype.constructor = SheepBrain
 SheepBrain.prototype.super = Brain

 function SheepBrain(){

 	var that = this

 	function initialize(){
 		Brain.apply(that, arguments)
 		that.add_behaviors(["cohesion", "alignment"])
 	}

 	if (arguments.length)
 		initialize()

 }

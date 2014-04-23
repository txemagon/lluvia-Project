/**
 * @classDescription Creates a Shepard Pig
 *
 * @return {Pig}
 * @constructor
 */
 Pig.prototype = new Boid
 Pig.prototype.constructor = Pig
 Pig.super = Boid

 function Pig(){
 	var args = []
 	for (var i=0; i<arguments.length; i++)
 		args[i] = arguments[i]
 	var that = this
    
 	function initialize(){ //constructor
 		that.colour = "pink"
 		that.vel_max = 40
 		that.mass = 1.5
 		that.vision = {radius: 100, angle: 130 * Math.PI / 180}

 		that.force_limits = {
 			thrust: 30, //aceleracion
 			steering: 60, //giro
 			braking: 80 //frenada
 		}
      Pig.super.apply(that, args)
 	}

 	if (arguments.length)
 		return initialize()

 }

 PigBrain.prototype = new Brain
 PigBrain.prototype.constructor = PigBrain
 PigBrain.prototype.super = Brain

 function PigBrain(){

 	var that = this

 	function initialize(){
 		Brain.apply(that, arguments)
 		that.add_behaviors(["cohesion", "alignment"]) //Mirar qué compotamientos se necesitan
 	}

 	if (arguments.length)
 		initialize() //Hace falta return??

 }
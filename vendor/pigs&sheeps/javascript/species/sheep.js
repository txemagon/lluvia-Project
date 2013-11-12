/**
 * @classDescription Creates a Sheep
 *
 * @return {Sheep}
 * @constructor
*/

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

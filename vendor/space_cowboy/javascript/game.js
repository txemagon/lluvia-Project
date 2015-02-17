Game.prototype = new Device
Game.prototype.constructor = Game
Game.prototype.super = Device

function Game(){
	 Device.call(this, "game")
	 this.skill_menu = new Skill("skill")
}
Player.prototype = new Boid
Player.prototype.constructor = Player

function Player(){
	Character.apply(this, arguments)
}

/* Como recogo los valores elegidos en el point dealer
Player.data = [ 
  { life: 10,
  	damage: 1,
  	resistance: 0,
  	speed: 1,
    img: "..images/ships/ship_enemy1.png"}
 */
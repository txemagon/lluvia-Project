Enemy.prototype = new Boid
Enemy.prototype.constructor = Enemy

function Enemy(){
	Character.apply(this, arguments)
}

Enemy.data = [ 
  { life: 10,
  	damage: 1,
  	resistance: 0,
  	speed: 1,
    img: "..images/ships/ship_enemy1.png"}]
/*
  { life: 15,
  	damage: 2,
  	resistance: 1,
  	speed: 1,
    img: "..images/ships/ship_enemy2.png"},

  { life: 20,
  	damage: 2,
  	resistance: 1,
  	speed: 2,
    img: "..images/ships/ship_enemy3.png"},

  { life: 25,
  	damage: 2,
  	resistance: 2,
  	speed: 2,
    img: "..images/ships/ship_enemy4.png"}

  { life: 30,
  	damage: 3,
  	resistance: 2,
  	speed: 2,
    img: "..images/ships/ship_enemy5.png"}

  { life: 25,
  	damage: 3,
  	resistance: 2,
  	speed: 3,
    img: "..images/ships/ship_enemy6.png"}
]
*/
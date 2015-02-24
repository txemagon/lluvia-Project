Enemy.prototype = new Boid
Enemy.prototype.constructor = Enemy

function Enemy(){
	Character.apply(this, arguments)
}

Enemy.data = [ 
  { life: 3,
    img: "images/"}
]
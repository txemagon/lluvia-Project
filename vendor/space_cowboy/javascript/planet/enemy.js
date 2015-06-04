Enemy.prototype = new Boid
Enemy.prototype.constructor = Enemy
Enemy.prototype.super = Boid

/**
 * @method  Enemy
 * @param {[type]} config      [description]
 */

function Enemy(config) {
    Boid.apply(this, arguments)
    var that = this

    canvas = document.getElementById("canvas_planet")
    ctx = canvas.getContext("2d")

    this.shape = new Image()
    this.shape.src = config.img

    this.x = 460
    this.y = 50
    this.width = 120
    this.height = 90
    this.firing = []
}

/*
 * Resistance *= 2
 * Life += Resistance
 */

Enemy.data = [
    /*Planeta vacio, posicion 0*/
    {
        life: 0,
        damage: 0,
        resistance: 0,
        speed: 0,
        img: "images/ships/ship5.png"
    },

    /*Planetas amarillos 5-10*/
    {
        life: 10,
        damage: 1,
        resistance: 0,
        speed: 1,
        img: "images/ships/ship0.png"
    },

    {
        life: 15,
        damage: 2,
        resistance: 1,
        speed: 1,
        img: "images/ships/ship1.png"
    },

    {
        life: 20,
        damage: 2,
        resistance: 1,
        speed: 2,
        img: "images/ships/ship2.png"
    },

    {
        life: 25,
        damage: 2,
        resistance: 2,
        speed: 2,
        img: "images/ships/ship3.png"
    },

    {
        life: 30,
        damage: 3,
        resistance: 2,
        speed: 2,
        img: "images/ships/boss0.png"
    },

    /*Planetas naranjas y rojos 10-15*/
    {
        life: 35,
        damage: 3,
        resistance: 2,
        speed: 3,
        img: "images/ships/ship4.png"
    },

    {
        life: 40,
        damage: 3,
        resistance: 3,
        speed: 3,
        img: "images/ships/ship5.png"
    },

    {
        life: 45,
        damage: 4,
        resistance: 3,
        speed: 3,
        img: "images/ships/ship6.png"
    },

    {
        life: 50,
        damage: 4,
        resistance: 3,
        speed: 4,
        img: "images/ships/ship7.png"
    },

    {
        life: 55,
        damage: 4,
        resistance: 4,
        speed: 4,
        img: "images/ships/boss1.png"
    },

    /*Planetas morados 15-19*/
    {
        life: 60,
        damage: 5,
        resistance: 4,
        speed: 4,
        img: "images/ships/ship8.png"
    },

    {
        life: 65,
        damage: 5,
        resistance: 4,
        speed: 5,
        img: "images/ships/ship9.png"
    },

    {
        life: 70,
        damage: 5,
        resistance: 5,
        speed: 5,
        img: "images/ships/ship10.png"
    },

    {
        life: 75,
        damage: 6,
        resistance: 5,
        speed: 5,
        img: "images/ships/boss2.png"
    },

    /*Planetas azul y verde 20-25*/
    {
        life: 80,
        damage: 6,
        resistance: 5,
        speed: 6,
        img: "images/ships/ship11.png"
    },

    {
        life: 85,
        damage: 6,
        resistance: 6,
        speed: 6,
        img: "images/ships/ship12.png"
    },

    {
        life: 90,
        damage: 7,
        resistance: 6,
        speed: 6,
        img: "images/ships/ship13.png"
    },

    {
        life: 95,
        damage: 7,
        resistance: 6,
        speed: 7,
        img: "images/ships/ship14.png"
    },

    {
        life: 100,
        damage: 7,
        resistance: 7,
        speed: 7,
        img: "images/ships/boss3.png"
    },

    /*Planeta final*/
    {
        life: 150,
        damage: 10,
        resistance: 6,
        speed: 4,
        img: "images/ships/boss4.png"
    }
]


Enemy.prototype.move = function(player) {

        alert(player.x)
    if (this.x < player.x) {
        this.x ++
    }
        
    else
        this.x --

    if (this.x > canvas.width - this.width) 
        this.x = canvas.width - this.width
    if (this.x < 0)
        this.x = 0

    //Creates firing
    if (player.life != 0){ //vida de player
        var intervalo = setInterval('this.firing.push(new Rectangle_Enemy (this.x, this.y, 5, 5))', 2000)
    }

    //Move firing
    for (var i=0, l=this.firing.length; i<l; i++) {
         this.firing[i].y += 5 //firing speed
         if (this.firing[i].y == 590){
            this.firing.splice(i--, 1)
            l-- 
            }
            
    }

}

Enemy.prototype.draw = function(ctx) {
    
    ctx.drawImage(this.shape, this.x, this.y, this.width, this.height)
    ctx.fillText("Enemy Life: " + this.life, 780, 20)
    ctx.fillText("Enemy Position: " + this.x, 780, 40)
    ctx.fillText("Enemy Damage: " + this.damage, 780, 60)
    ctx.fillText("lastPress: " + lastPress, 780, 80)
    
    //this.move(this.player.x)
    //this.shot()
    
    ctx.fillStyle="#40FF00"
    for (var i=0, l=firing.length; i<l; i++) {
        firing[i].fill(ctx);
        ctx.fillText("Disparo Y: " + firing[i].y, 790, 100)
    }  
}


/**
 * @method  Rectangle_Enemy
 * @constructor
 * Creates
 * @param {[type]} x         [description]
 * @param {[type]} y         [description]
 * @param {[type]} width     [description]
 * @param {[type]} height    [description]
 */
function Rectangle_Enemy(enemy_x,y,width,height) {
    this.x = (x == null)?0:x
    this.y = (y == null)?0:y
    this.width = (width == null)?0:width
    this.height = (height == null)?this.width:height
}

Rectangle_Enemy.prototype.fill = function() {
    ctx.fillRect(this.x, this.y, this.width, this.height)
}

Rectangle_Enemy.prototype.fill = function(ctx) {
    ctx.fillRect(this.x, this.y, this.width, this.height)
}


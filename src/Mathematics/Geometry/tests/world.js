World.initialize("worldCanvas")

Versor.prototype = new Vector
Versor.prototype.constructor = Versor
function Versor(){
   Vector.apply(this, arguments)
}

Versor.prototype.update = function(viewport, cxt){
   Vector.prototype.update.apply(this, arguments)
   cxt.lineWidth = 1
   cxt.strokeStyle = "#990000"
}

v1 = new Versor(20,0,0)
v1.draw()
v2 = new Versor(0,20,0)
v2.draw()
v3 = new Versor(0,0,20)
v3.draw()



ShadowedVector.prototype = new Vector
ShadowedVector.prototype.constructor = ShadowedVector
function ShadowedVector(){
   Vector.apply(this, arguments)
}

ShadowedVector.prototype.update = function(viewport, cxt){
   cxt.beginPath()
   cxt.lineWidth = 2
   cxt.strokeStyle = "#999999"
   cxt.moveTo.apply(cxt, viewport.screen_coord([0,0,0])); 
   cxt.lineTo.apply(cxt, viewport.screen_coord([this.Coord[0], this.Coord[1], 0]))
   cxt.stroke()
   Vector.prototype.update.apply(this, arguments)
   }
v4 = new ShadowedVector(5,15,5)
v4.draw()

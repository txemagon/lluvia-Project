/**
 * @classDescription Creates a World
 *
 * @param  {canvas}  A string or HTMLNode with a canvas element.
 * @return {World}
 * @constructor
 */

function World(config){
  this.origin = new ReferenceFrame() /* the origin has not to be 0,0,0 */
  this.elements = []
  this.current_unit = "m"
  this.unit = { mm: 25.4, cm: 2.54, dm: 0.254, m:0.0254, km: 0.0000254 }
  this.scale = config.scale || 1 / 100
  this.canvas = new Canvas(this, config.canvas || null)
}

World.initialize = function(canvas){ // World Factory
    var world = new World({canvas: canvas})
    Vector.prototype.world = world
    Vector.prototype.strokeStyle = "#333399"
    Vector.prototype.lineWidth =   3
  return world 
}

World.prototype.attach = function(gr_element){
   this.elements.push(gr_element)
   this.canvas.update(gr_element)
}

World.prototype.reduced_coord = function(coord){
  try{
    return coord  * this.scale / this.unit[this.current_unit]
  }catch(e){
      return coord
    }
}

Vector.prototype.draw = function(){
  this.world.attach(this)
}

Vector.prototype.update = function(viewport, cxt){
   // cxt.strokeStyle = this.strokeStyle || "#333399"
   // cxt.lineWidth = this.lineWidth || 3
   this.fillArrow(viewport, cxt)
   cxt.beginPath()
   cxt.moveTo.apply(cxt, viewport.screen_coord([0,0,0])); 
   cxt.lineTo.apply(cxt, viewport.screen_coord(this.Coord))
   if (this.label){
     var ft = viewport.screen_coord(this.Coord)
     ft[0] += 5
     ft[1] += 10
     ft.unshift(this.label)
     cxt.fillText.apply(cxt, ft )
   }
}

Vector.prototype.arrow = function(){
   var start = new Vector(this.scale(0.9 ))
   var side = []
   var rc = this.world.reduced_coord

   if (Math.abs(start.Coord[0]) + Math.abs(start.Coord[1]) < 0.01 )
     side = [
              new Vector([.1,0,0]).add(start).get_coord() ,
	      new Vector([0, .1, 0]).add(start).get_coord(),
              this.get_coord()
	      ]
   else
     side  = [ 
                 new Vector(new Vector(-start.Coord[1] , start.Coord[0], 0).unit().scale(1/10)).add(start).get_coord(), 
                 new Vector(new Vector(start.Coord[1], -start.Coord[0] , 0).unit().scale(1/10)).add(start).get_coord(),
		 this.get_coord()
    	     ] 
  side.push(side[0])
  return side
   
}

Vector.prototype.fillArrow = function(viewport, cxt){
   var points = this.arrow()
   
   cxt.beginPath()
   cxt.moveTo.apply(cxt, viewport.screen_coord( points.shift() )) ; 
   for (var i=0; i<points.length; i++)
     cxt.lineTo.apply(cxt, viewport.screen_coord(points[i]) ); 
   cxt.stroke()
   cxt.fill()
}

Versor.prototype = new Vector
Versor.prototype.constructor = Versor
function Versor(){
   Vector.apply(this, arguments)
   this.strokeStyle = "#990000" 
   this.lineWidth = 1
}

Versor.prototype.update = function(viewport, cxt){
   Vector.prototype.update.apply(this, arguments)
   cxt.fillStyle = cxt.strokeStyle = "#990000" 
   cxt.lineWidth   = 1 

}

ShadowedVector.prototype = new Vector
ShadowedVector.prototype.constructor = ShadowedVector
function ShadowedVector(){
   Vector.apply(this, arguments)
   }

ShadowedVector.prototype.update = function(viewport, cxt){
   var shadow = new Vector([this.Coord[0], this.Coord[1], 0]) 
   this.strokeStyle = "#999999"
   this.lineWidth = 2
   shadow.update(viewport, cxt)
   cxt.stroke()
   cxt.lineWidth = 3
   cxt.fillStyle = cxt.strokeStyle = "#333399"
   Vector.prototype.update.apply(this, arguments)
   }

ProjectedVector.prototype = new Vector
ProjectedVector.prototype.constructor = ProjectedVector
function ProjectedVector(){
   ShadowedVector.apply(this, arguments)
}

ProjectedVector.prototype.update = function(viewport, cxt){
   cxt.beginPath()
   cxt.lineWidth = 1
   cxt.strokeStyle = "#CCCCCC"
   cxt.moveTo.apply(cxt, viewport.screen_coord(this.Coord)); 
   cxt.lineTo.apply(cxt, viewport.screen_coord([this.Coord[0], this.Coord[1], 0]))
   cxt.stroke()
   cxt.lineWidth = 2
   cxt.fillStyle = cxt.strokeStyle = "#999999"

   ShadowedVector.prototype.update.apply(this, arguments)
   }

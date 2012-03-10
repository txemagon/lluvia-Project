/**
 * @classDescription Creates a World
 *
 * @param  {canvas}  A string or HTMLNode with a canvas element.
 * @return {World}
 * @constructor
 */

function World(canvas){
  this.origin = new ReferenceFrame() /* the origin has not to be 0,0,0 */
  this.elements = []
  this.current_unit = "mm"
  this.unit = { mm: 25.4, cm: 2.54, dm: 0.254, m:0.0254, km: 0.0000254 }
  this.canvas = new Canvas(this, canvas || null)
}

World.initialize = function(canvas){ // World Factory
    var world = new World(canvas)
    Vector.prototype.world = world
  return world 
}

World.prototype.attach = function(gr_element){
   this.elements.push(gr_element)
   this.canvas.update(gr_element)
}

Vector.prototype.draw = function(){
  this.world.attach(this)
}

Vector.prototype.update = function(viewport, cxt){
   cxt.beginPath()
   cxt.strokeStyle = "#333399"
   cxt.lineWidth = 3
   cxt.moveTo.apply(cxt, viewport.screen_coord([0,0,0])); 
   cxt.lineTo.apply(cxt, viewport.screen_coord(this.Coord))
}

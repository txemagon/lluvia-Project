/**
 * @classDescription Creates a World
 *
 * @param  {canvas}  A string or HTMLNode with a canvas element.
 * @return {World}
 * @constructor
 */

function World(canvas){
  this.origin = new ReferenceFrame() /* the origin has not to be 0,0,0 */
  this.canvas = new Canvas(canvas || null, this)
  this.elements = []
}

World.initialize = function(canvas){ // World Factory
    var world = new World()
    var cnvs = new Canvas(canvas, world)
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

Vector.prototype.update = function(cxt){
  // Despite you can use the context to directly draw in, please do not use it. 
  // Return the drawing instruction instead.
  // todo: use trust property to avoid this function call. In other words, do caching of this return
   return "moveTo(0,0,0); lineTo(" + this.Coord.join(", ") + ");"
}

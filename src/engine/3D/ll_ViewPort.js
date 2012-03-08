/**
 * @classDescription Creates a ViewPort for observing the world from different points of view
 *
 * @param  {}  
 * @return {ViewPort}
 * @constructor
 */

function ViewPort(reference_frame, view_distance, canvas){
    this.reference_frame = reference_frame
    this.zv = view_distance
    this.canvas = canvas
    this.canvas_pos = [0, 0]
    //todo: Use Canvas#get_pos(viewport) to fetch the current position of the viewport.
    this.cxt = this.canvas.cxt
    this.world = this.canvas.world
}

ViewPort.prototype.coords_of = function(vector){
    return this.reference_frame.coords_of(vector)
}

ViewPort.prototype.project = function(vector){
  var v = this.coords_of(vector).get_coord()
  var f= this.zv/(this.zv - v[2]) 
  return [v[0] * f, v[1] * f]
}

ViewPort.prototype.screen_coord = function(vector){
    var sc = this.project(vector)
    return [sc[0] + this.canvas_pos[0] + 100 , -sc[1] + this.canvas_pos[1] + 100]
}

ViewPort.prototype.repaint = function(){

}

ViewPort.prototype.update = function(gr_element){
   for (var i=0; i<this.world.elements.length; i++)
       this.draw(this.world.elements[i].update(this.cxt))
}

ViewPort.prototype.draw = function(instructions){
    instructions = instructions.split(";")
	this.cxt.moveTo(0, 0)
    var output = [""]	
    for (var i=0; i<instructions.length; i++)
	if (/\((.*)\)/.test(instructions[i])){
          var coords = this.screen_coord(instructions[i].match(/\((.*)\)/)[1].split(","))
	output.push(instructions[i].replace(/\((.*)\)/, "(" + coords + ")" ))
	}
    eval(output.join("; this.cxt."))
    this.cxt.stroke()
}

/*
World.prototype.draw_line = function(coord3D){
    var that = this
    function wp(coord){  // stands for world projection
      return that.view_scale * coord
    }
  var XS = this.view.main.width / 2 // todo: change the variable names to smthing more verbose.
  var YS = this.view.main.height / 2
  var factor = this.point_of_view.Coord[2] / (this.point_of_view.Coord[2] - coord3D[2] )
    var x =  wp(factor * coord3D[0]) + XS
    var y = wp(-factor * coord3D[1]) + YS
  var cxt = this.canvas.getContext("2d");
  cxt.moveTo(XS,YS);
    cxt.lineTo(x,y);
  cxt.stroke();
}

from the world constructor

this.dpi = parseInt(document.getElementById('ppitest').offsetWidth) // todo: Use vertical and horizontal dpi
  this.current_unit = "mm"
  this.unit = { mm: 25.4, cm: 2.54, dm: 0.254, m:0.0254, km: 0.0000254 }  //todo: provide a whole list of units in the units package.

  this.canvas = canvas || null
    this.view = { 
	main: { width: parseInt(this.canvas.width), height: parseInt(this.canvas.height) }
    }
  //todo: provide a scale for every view
  this.view_scale = this.dpi / this.unit[this.current_unit] 

*/

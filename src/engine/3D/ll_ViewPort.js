/**
 * @classDescription Creates a ViewPort for observing the world from different points of view
 *
 * @param  {}  
 * @return {ViewPort}
 * @constructor
 */

function ViewPort(reference_frame, view_distance, canvas, config){

   var that = this

   function initialize(){
    that.reference_frame = reference_frame
    that.zv = view_distance
    that.canvas = canvas
    that.canvas_pos = [0, 0] //todo: Use Canvas#get_pos(viewport) to fetch the current position of the viewport.
    that.XCENTER = Math.floor(that.canvas.get_width()  / 2)
    that.YCENTER = Math.floor(that.canvas.get_height() / 2)
    that.cxt = that.canvas.cxt
    that.world = that.canvas.world
    that.unit_factor = that.canvas.DPI[0] / that.world.unit[that.world.current_unit]

    if (config){
       if (config.x)
	  that.canvas_pos[0] = config.x
       if (config.y)
	  that.canvas_pos[1] = config.y
       if (config.width){
	  that.width = config.width
	  that.XCENTER = Math.floor(that.width  / 2)
       }
       if (config.height){
	  that.height = config.height
	  that.YCENTER = Math.floor(that.height  / 2)
       }
       if(config.title){
	  that.title = config.title
	  that.cxt.fillText(config.title, that.canvas_pos[0] + 10 , that.canvas_pos[1] + 20)
       }
    }
    if (  typeof(config.width)  != "undefined" && 
	  typeof(config.height) != "undefined" && 
	  typeof(config.x)      != "undefined" && 
	  typeof(config.y)      != "undefined" 
	  ){
      var cxt = that.cxt 
      cxt.beginPath()
      cxt.rect(config.x, config.y, config.width, config.height )
      cxt.strokeStyle = "#cccccc"
      cxt.stroke()
    }
   }

   if (arguments.length)
      initialize()
}

ViewPort.prototype.coords_of = function(vector){
    return this.reference_frame.coords_of(vector)
}

ViewPort.prototype.project = function(vector){
  var v = this.coords_of(vector).get_coord()
  var f = this.zv/(this.zv - v[2]) 
  return [v[0] * f, v[1] * f]
}

ViewPort.prototype.screen_coord = function(vector){
    var sc = this.project(vector)

    sc = [this.unit_factor * sc[0], this.unit_factor * sc[1]]  
    return [sc[0] + this.canvas_pos[0] + this.XCENTER , this.canvas_pos[1] + this.YCENTER - sc[1]]
}

ViewPort.prototype.repaint = function(){
   for (var i=0; i<this.world.elements.length; i++){
       this.world.elements[i].update(this, this.cxt)
       this.draw()
   }
}

ViewPort.prototype.update = function(gr_element){
       gr_element.update(this, this.cxt)
       this.draw()
}

ViewPort.prototype.draw = function(instructions){
  this.cxt.stroke() 
}


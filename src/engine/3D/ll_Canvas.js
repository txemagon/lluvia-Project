/**
 * @classDescription Creates a Canvas
 *
 * @param  {canvas}  A string or HTMLNode with a canvas element if no one is given, a default one is created.
 *                   If two numerica parameters are given, instead of canvas element this will be width and height
 * @return {Canvas}
 * @constructor
 */

function Canvas(world, canvas){
 /**
  * valid input: canvas:[HTMLNode | StringId] | (width: Number, height:Number)
  *  Numbers inside a string are valid numbers.
  */
   var that = this
   Canvas.number++
   var argument = []

   for (var i=0; i< arguments.length; i++)
     argument[i] = arguments[i]

   //todo: if ther is a Reference frame inside the argument list, then pull it out from the list and stash it as this.origin.
   //todo: provide a default origin.

   function createCanvas(){
      var canvas = document.createElement("canvas")
      var id = "$canvas$$" + Canvas.number
      var default_width = 400
      var default_height = 300
  
      if (argument.length == 2)
	 if ( !(isNaN(argument[0]) || isNaN(argument[1]) )){
	    default_width  = argument[0]
	    default_height = argument[1]
	 }
      canvas.setAttribute("id", id)
      canvas.setAttribute("width",  default_width)
      canvas.setAttribute("height", default_height)
      canvas.setAttribute("style", "border:1px solid #c3c3c3;")
      document.body.appendChild(canvas)
      return canvas
   }

   function getScreenScale(){
      var id = "$ppi$test" + Canvas.number
      var div = document.createElement("div")
      div.setAttribute("id", id)
      div.setAttribute("style", "width:1in; height: 1in; visibility: hidden; padding: 0px;")
      document.body.appendChild(div)
      that.dpi = that.dpiH = parseInt(document.getElementById(id).offsetWidth) 
      that.dpiV = parseInt(document.getElementById(id).offsetHeight) 
      that.DPI = [that.dpiV, that.dpiH]
      document.body.removeChild(div)
   }
  
   function initialize(){
     that.world = world
     getScreenScale()
     if (typeof(canvas) == "undefined" )
	that.canvasNode = createCanvas() // This can bring some problems in the future with canvas inheritance, because will be called twice 
	               // Once with the <Class>.prototype = new Canvas, and the second with the object instantiation itself.
     else
	 if (typeof(canvas) == "string")
	   that.canvasNode = document.getElementById(canvas)
	 else
	     that.canvasNode = canvas
     that.width  = that.canvasNode.width
     that.height = that.canvasNode.height
     that.cxt = that.canvasNode.getContext("2d")
     var x = new Vector(1, Math.PI * 3 / 4, 0, "cyl")
     var z = new Vector(1, 80 / 180 * Math.PI, Math.PI / 4, "sph" ) 
     var y = z.cross(x)
     that.viewport = [ new ViewPort(new ReferenceFrame(10,00,00, [ [0,1,0], [0,0,1], [1, 0, 0] ])  , 1000, that, {x:0, y:0, width: Math.floor(that.width / 2), height: Math.floor(that.height / 2 ), title: "Front" } ),
                       new ViewPort(new ReferenceFrame(0,-10,00, [ [1,0,0], [0,0,1], [0, -1, 0] ]) , 1000, that, {x: Math.floor(that.width / 2), y: 0  , width: Math.floor(that.width / 2), height: Math.floor(that.height / 2 ), title: "Left" } ), 
                       new ViewPort(new ReferenceFrame(00,00,10, [ [0,1,0], [1,0,0], [0, 0, 1] ])  , 1000, that, {x:0, y: Math.floor(that.height / 2), width: Math.floor(that.width / 2), height: Math.floor(that.height / 2 ), title: "Up" } ), 
                       new ViewPort(new ReferenceFrame(10,10,10, [ x, y, z])                       , 1000, that, {x:Math.floor(that.width / 2), y: Math.floor(that.height / 2), width: Math.floor(that.width / 2), height: Math.floor(that.height / 2 ), title: "Perspective" } ), 
                     ]
   }

   if (arguments.length)
      initialize();
}

Canvas.number = 0;

Canvas.prototype.get_dpi = function(){ return this.dpi }
Canvas.prototype.get_DPI = function(){ return this.DPI }


Canvas.prototype.repaint = function(){
    for (var i=0; i<this.viewport.length; i++)
	this.viewport[i].repaint()
}


Canvas.prototype.update = function(gr_element){
    for (var i=0; i<this.viewport.length; i++)
	this.viewport[i].update(gr_element)
}

Canvas.prototype.get_width  = function(){ return this.width  }
Canvas.prototype.get_height = function(){ return this.height }

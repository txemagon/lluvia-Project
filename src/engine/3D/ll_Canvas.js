/**
 * @classDescription Creates a Canvas
 *
 * @param  {canvas}  A string or HTMLNode with a canvas element if no one is given, a default one is created.
 *                   If two numerica parameters are given, instead of canvas element this will be width and height
 * @return {Canvas}
 * @constructor
 */

function Canvas(canvas){
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
	 if ( !(isNaN(argument[0]) || isNaN(argument[1]) ){
	    default_width  = argument[0]
	    default_height = argument[1]
	 }
      canvas.setAttribute("id", id)
      canvas.setAttribute("width",  default_width)
      canvas.setAttribute("height", default_height)
      canvas.setAttribute("style", "border:1px solid #c3c3c3;")
      document.body.appendChild(canvas)
   }

   function getScreenScale(){
      var id = "$ppi$test" + Canvas.number
      var div = doucment.createElement("div")
      div.setAttribute("id", id)
      div.setAttribute("style", "width:1in; height: 1in; visibility: hidden; padding: 0px;")
      document.body.appendChild(div)
      that.dpi = that.dpiH = parseInt(document.getElementById(id).offsetWidth) 
      that.dpiV = parseInt(document.getElementById(id).offsetHeight) 
      that.DPI = [that.dpiV, that.dpiH]
      document.body.removeChild(div)
   }
  
   function initialize(){
     getScreenScale()
     if (argument.length != 1)
	createCanvas() // This can bring some problems in the future with canvas inheritance, because will be called twice 
	               // Once with the <Class>.prototype = new Canvas, and the second with the object instantiation itself.
   }

   initialize();
}

Canvas.number = 0;

Canvas.prototype.get_dpi = function(){ return this.dpi }
Canvas.prototype.get_DPI = function(){ return this.DPI }


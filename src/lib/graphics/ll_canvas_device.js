CanvasDevice.prototype = new GraphicDevice
CanvasDevice.prototype.constructor = CanvasDevice

function CanvasDevice(screen, drawable_obj, incarnation) {
    //GraphicDevice.apply(this, arguments)
    GraphicDevice.call(this, screen, drawable_obj, incarnation)
    this.context = this.screen.getContext("2d")
    if (!this.context)
        throw "Unable to initialize context for 2d screen."

}


CanvasDevice.prototype.draw = function(){
	this.screen.width = this.screen.width
    //this.context.translate(0, this.screen.height)
    //this.context.scale(1, -1)
	for(var i = 0; i < this.drawable.length; i++)
		if("draw" in this.incarnation[this.incarnation.search_element(this.drawable[i])] && typeof(this.incarnation[this.incarnation.search_element(this.drawable[i])].draw) == "function")
		   this.incarnation[this.incarnation.search_element(this.drawable[i])].draw(this.drawable[i], this.context)
}

//CanvasDevice.draw = function(){
//    alert("a")
//}

CanvasDevice.prototype.add_drawable_obj = function(drawable_obj){
    this.drawable.push(drawable_obj)
}
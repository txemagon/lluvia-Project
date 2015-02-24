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
	for(var i = 0; i < this.drawable.length; i++)
		this.incarnation[this.incarnation.search_element(drawable[i])].draw(drawable[i])
}

CanvasDevice.prototype.add_drawable_obj = function(drawable_obj){
	
    this.drawable.push(drawable_obj)
}
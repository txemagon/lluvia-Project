/**
 * @class Incarnation
 * 
 *
 * @param  {Function} graphic_type=GraphicDevice If no Type given then GraphicDevice.get_best_device_for is used.
 * @param  {String}   arguments Is the type of drawable objects, that we want to draw.
 */
function Incarnation(graphic_type){
	this.graphic_type = graphic_type
	this.add_types(arguments)

	// if(graphic_type == "CanvasDevice"){
	//    var default_draw = eval(graphic_type)
	//    this.add_types("default")
	//    this["default"].draw = default_draw.draw
 //    }
}

Incarnation.end_object  = {Object:"", Number:"", String:"", Array:""}
Incarnation.prototype.search_element = function(obj){
	if(typeof(obj) == "string"){
		if(obj in this)
			return obj
		else
			return "default"
	}
	var constructor = obj.__proto__
	
    if(constructor.constructor.name in this)
		return constructor.constructor.name

	if( !(constructor.constructor.name in this) && !(constructor.constructor.name in Incarnation.end_object))
		  return this.search_element(constructor)
    else
    	return "default"
}

Incarnation.prototype.add_types = function(Types){
	for(var i = 1; i < Types.length; i++)
	   this[Types[i]] = new GraphicUnit()
}
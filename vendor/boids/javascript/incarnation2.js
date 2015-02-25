function Incarnation(graphic_type){
	this.graphic_type = graphic_type
	this.add_types(arguments)
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
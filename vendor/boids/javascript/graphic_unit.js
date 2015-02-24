function GraphicUnit(){
	this.mesh = {}
	this.add_types(arguments)
}

GraphicUnit.prototype.add_types = function(Types){
	for(var i = 0; i < Types.length; i++)
	   this.mesh[Types[i]]
}
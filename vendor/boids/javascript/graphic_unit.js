
/**
 * @class GraphicUnit
 * Contains all the parts of the mesh and how to draw this parts.
 * 
 */
function GraphicUnit(){
	this.mesh = {}
	this.add_parts(arguments)
}

GraphicUnit.prototype.add_parts = function(Types){
	for(var i = 0; i < Types.length; i++)
	   this.mesh[Types[i]]
}
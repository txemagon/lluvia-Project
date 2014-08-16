/**
*/
function Section(world, x, y, size){
	this.world = world
    this.x = x
    this.y = y
    this.size = size
    this.is_activate = false
}

/**
*/
Section.prototype.activate = function(){
    this.is_activate = true
}

/**
*/
Section.prototype.deactivate = function(){
    this.is_activate = false
}

/**
*/
Section.prototype.draw = function(){
	if(this.is_activate)
		cxt.fillStyle = "black"
    else
    	cxt.fillStyle = "white"

    cxt. fillRect(this.x, this.y, this.size, this.size) 
}
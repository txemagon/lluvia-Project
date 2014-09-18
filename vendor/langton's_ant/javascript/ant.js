Ant.prototype.constructor = Ant

function Ant(world, x, y, direction){
	this.world = world || {}
    this.pos_x = x || 0
    this.pos_y = y || 0
    this.actual_direction = direction || 0
    this.directions = ["north", "east", "south", "west"]
}


Ant.prototype.move = function(){
    switch(this.actual_direction){
    	case 0:
    	    this.pos_y--
    	    break
    	case 1:
    	    this.pos_x++
    	    break
    	case 2:
    	    this.pos_y++
    	    break
    	case 3:
    	    this.pos_x--
    	    break
    }
}

Ant.prototype.rotate = function(){
    if(!this.world.array_sections[this.pos_y][this.pos_x].is_activate){
        this.actual_direction++
        if(this.actual_direction == 4)
        	this.actual_direction = 0
    }
    else{
    	this.actual_direction--
    	if(this.actual_direction == -1)
    		this.actual_direction = 3
    }
}

Ant.prototype.check_limits = function(){
	var map_length = this.world.array_sections.length
    if(this.pos_y > map_length-2)
    	this.pos_y--
    if(this.pos_y < 1)
    	this.pos_y++
    if(this.pos_x > map_length-2)
    	this.pos_x--
    if(this.pos_x < 1)
    	this.pos_x++
}

Ant.prototype.change_state = function(){
    this.check_limits()

    if(this.world.array_sections[this.pos_y][this.pos_x].is_activate)
    	this.world.array_sections[this.pos_y][this.pos_x].is_activate = false
    else
    	this.world.array_sections[this.pos_y][this.pos_x].is_activate = true

    this.world.array_sections_changed.push(this.world.array_sections[this.pos_y][this.pos_x])
}
/**
*/
World.prototype = new Device
World.prototype.constructor = World
World.prototype.super = Device

function World(init_poblation){
    var that = this
    this.init_poblation = init_poblation || 1500
    this.height = screener.height
    this.width = screener.width
    this.size_section = 5
    this.array_sections = []
    this.last_array_sections = []

    Device.call(this, null, null)

    this.state.running.run.up = function(){
        that.create_board()
        that.create_init_poblation(that.init_poblation)
    }

    this.state.running.run.steady = function(date) {
        that.next_generation()
        that.draw()  
    }
}

/**
*/
World.prototype.create_board = function(){
	var x = 0
	var y = 0

	var array_section = new Array(this.height/this.size_section)
    for (i = 0; i < this.height/this.size_section; i++){
        array_section[i]=new Array(this.height/this.size_section)
    } 

    this.array_sections = array_section

    for(var i=0; i<this.height/this.size_section; i++){    	
        for(var a=0; a<this.width/this.size_section; a++){
            this.array_sections[i][a] = new Section(this, x, y, this.size_section) // Comprobar el orden de "a" e "i"
        	x += this.size_section
        }
        x = 0
        y += this.size_section
    }
}

/**
*/
World.prototype.draw = function(){
	cxt.clearRect(0, 0, this.height, this.width) 

    for(var i=0; i<this.array_sections.length; i++)
    	for(var a=0; a<this.width/this.size_section; a++)
            this.array_sections[i][a].draw(cxt)
}

/**
*/
World.prototype.create_init_poblation = function(init_poblation){
    var init_poblation = init_poblation || []

    for(var i=0; i<init_poblation; i++)
        this.array_sections[Math.floor(Math.random()*this.array_sections.length)][Math.floor(Math.random()*this.array_sections.length)].activate()
}

/**
*/
World.prototype.check_sections = function(i, a){
    var sections_total = 0

    try{
        if(i-1 != -1 && a-1 != -1)
            if(this.array_sections[i-1][a-1].is_activate)
                sections_total += 1
        if(i-1 != -1)    
            if(this.array_sections[i-1][a].is_activate)
                sections_total += 1
        if(i-1 != -1 && a+1 != this.array_sections.length)
            if(this.array_sections[i-1][a+1].is_activate)
                sections_total += 1
        if(a-1 != -1)
            if(this.array_sections[i][a-1].is_activate)
                sections_total += 1
        if(a+1 != this.array_sections.length)
            if(this.array_sections[i][a+1].is_activate)
                sections_total += 1
        if(i+1 != this.array_sections.length && a-1 != -1)
            if(this.array_sections[i+1][a-1].is_activate)
                sections_total += 1
        if(i+1 != this.array_sections.length)
            if(this.array_sections[i+1][a].is_activate)
                sections_total += 1
        if(i+1 != this.array_sections.length && a+1 != this.array_sections.length)
            if(this.array_sections[i+1][a+1].is_activate)
                sections_total += 1
    }catch(e){console.log(e)}

    return sections_total
}

/**
*/
World.prototype.next_generation = function(){
    var activates = []
    var deactivates = []

    for(var i=0; i<this.array_sections.length; i++)
        for(var a=0; a<this.width/this.size_section; a++)
            if(this.array_sections[i][a].is_activate)
                if(this.check_sections(i, a) == 3 || this.check_sections(i, a) == 2){}
                else
                    deactivates.push(this.array_sections[i][a])    
            else
                if(this.check_sections(i, a) == 3)       
                    activates.push(this.array_sections[i][a])

    for(var i=0; i<activates.length; i++)
        activates[i].activate()

    for(var i=0; i<deactivates.length; i++)
        deactivates[i].deactivate()

}
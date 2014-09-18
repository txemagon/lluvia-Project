/**
*/
World.prototype = new Device
World.prototype.constructor = World
World.prototype.super = Device

function World(init_poblation){
    var that = this
    this.init_poblation = init_poblation || 1
    this.height = screener.height
    this.width = screener.width
    this.size_section = 3
    this.array_ants = []
    this.array_sections = []
    this.last_array_sections = []
    this.array_sections_changed = []

    Device.call(this, null, null)
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
World.prototype.create_init_poblation = function(){
    var init_poblation = this.init_poblation

    for(var i=0; i<init_poblation; i++){
        var a = new Ant(this, Math.floor(Math.random()*100)+50, Math.floor(Math.random()*100)+50, Math.floor(Math.random()*4))
        this.array_ants.push(a)
    }
}

/**
*/
World.prototype.next_step= function(){
    for(var i = 0; i<this.array_ants.length; ++i){
        this.array_ants[i].rotate()
        this.array_ants[i].change_state()
        this.array_ants[i].move()
    }
}

World.prototype.clear_world = function(){
    cxt.fillStyle = "rgb(255, 255, 255)"
    cxt.fillRect(0, 0, this.height, this.width)
}

/**
*/
World.prototype.draw = function(){
    for(var i=0; i<this.array_sections_changed.length; i++){
        this.array_sections_changed[i].draw(cxt)
    }
    this.array_sections_changed.length = 0
}

World.prototype.show_options = function(){
    options.style.visibility = "visible"
}

World.prototype.attend_start = function(){
    var that = this
    this.show_options()
    this.create_board()
    this.create_init_poblation()
    this.clear_world()

    this.state.running.run.steady = function(date) {
        that.next_step()
        that.draw()  
    }

    this.switch("running")
}

World.prototype.attend_pause = function(){
    this.switch("suspended")
}

World.prototype.attend_next_step = function(){
    this.switch("running")
    this.next_step()
    this.draw()
    this.switch("suspended")
}

World.prototype.attend_restart = function(){
    this.array_ants.length = 0
    this.attend_start()
}

World.prototype.attend_resume = function(){
    this.switch("running")
}
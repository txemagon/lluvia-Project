Galactus.prototype = new Device
Galactus.prototype.contructor = Galactus

function Galactus(view, handler){
	var that = this
	this.view = view
	this.handler = handler

	this.self_events = [ "restart_clock", "restart_game" ]
	Device.apply(this, arguments)

	function initialize() {
		Device.call(that, view)
		var it = that

		that.newGate ("main_screen", Gate, {do_onclick: function(event, element) {
            var start_button = document.getElementById('main_screen')
	        start_button.style.display = 'none'
        } })

	    that.newGate ("play_button", Gate, {
		do_onclick: function(event, element) {
			it.attend_new_world(view)
		}
	})
	}

	if (arguments.length)
		initialize()
}

Galactus.prototype.attend_new_world = function(dev) {
	//Comprueba si hay un mundo creado. Si lo hay, lo destruye y crea uno nuevo. Si no, solo lo crea
	this.world   = new World(dev)
	this.handler.addPort("restart_game", this.world)
	countdown(this.world);


	this.world.new_boid( function(config) {
		config.colour = "pink"
	})

	var sheeps = []
	for (var i=0; i<10; i++)
	sheeps.push( this.world.new_boid( function(config) {
		config.colour = "white"
	}))

    this.world.start()
}

Galactus.prototype.destroy_world = function() {
	//Destroys a world if there is one created
}

Galactus.prototype.start_world = function(dev) {
	//Fires an event that calls the worldś start function
	alert("Galactus lives!")
	this.world   = new World(dev)
	//alert(dev.toSource())
	handler.addPort("restart_game", this.world)
	countdown(this.world);


	this.world.new_boid( function(config) {
		config.colour = "pink"
	})

	var sheeps = []
	for (var i=0; i<10; i++)
	sheeps.push( this.world.new_boid( function(config) {
		config.colour = "white"
	}))

    this.world.start()
}
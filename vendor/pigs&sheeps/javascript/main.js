var game    = null
var play    = null
var $logger = null

function start_game(device){

	var start_button = document.getElementById('main_screen')
	start_button.style.display = 'none';

	countdown(device);

	var pigs = []
	pigs.push( device.new_boid( function(config) {
		config.colour =  "pink"
	}))

	pigs.push( device.new_boid( function(config) {
		config.colour = "pink"
		config.geo_data.position = new Vector(10, 100)
	}))

	device.start()
}

function main(){
	$logger     = new $Logger()
	var world   = new World('screener')
	game        = new GameControl('screener')
	new MenuHandler("menu")

	play = new Gate("play_button",  null, {
		do_onclick: function(event, element) {
			start_game(world)
		}
	})

}


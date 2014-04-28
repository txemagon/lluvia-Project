var game    = null
var play    = null
var $logger = null

var levels_in=0
var menu_desplegable = document.getElementById('menu')

function start_game(handler){

	var start_button = document.getElementById('main_screen')
	start_button.style.display = 'none';

	var world   = new World('screener')
	handler.addPort("restart_game", world)

	countdown(world);


	world.new_boid( function(config) {
		config.colour = "pink"
	})


	var sheeps = []
	for (var i=0; i<10; i++)
	sheeps.push( world.new_boid( function(config) {
		config.colour = "white"
	}))

    world.start()
}

function main(){
	$logger     = new $Logger()
	//var world   = new World('screener')
	game        = new GameControl('screener')
	var menu_handler = new MenuHandler("menu")
	
	play = new Gate("play_button",  null, {
		do_onclick: function(event, element) {
			start_game(menu_handler)
		}
	})

}


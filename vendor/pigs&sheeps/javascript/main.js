var game    = null
var play    = null
var $logger = null

var levels_in=0
var menu_desplegable = document.getElementById('menu')


function main(){
	$logger     = new $Logger()
	//var world   = new World('screener')
	game        = new GameControl('screener')
	var menu_handler = new MenuHandler("menu")
	var option_handler = new OptionHandler("level_option_container")
	option_handler.addPort("keep_menu_out", menu_handler)
	
	var maker = new Galactus('screener')
	//maker.attend_new_world()
}


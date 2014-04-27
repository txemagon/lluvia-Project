var game    = null
var play    = null
var $logger = null

var levels_in=0
var menu_desplegable = document.getElementById('menu')

function start_game(device){

	var start_button = document.getElementById('main_screen')
	start_button.style.display = 'none';

	countdown(device);


	device.new_boid( function(config) {
		config.colour = "pink"
	})


	var cows = []
	for (var i=0; i<10; i++)
	cows.push( device.new_boid( function(config) {
		config.colour = "white"
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

<<<<<<< HEAD
   play = new Button("play_button",  { onclick: function(event, element){       
       start_game(world)
   } })

   instructions= new Button("instructions_option",{onclick: function(event, element){       
       alert("Move the little pig to place sheeps into the barnyard")
   } })

   restart= new Button("restart_option",{onclick: function(event, element){       
       start_game(world)
   } })

   level= new Button("level_option",{onclick: function(event, element){       
      var levels_container= document.getElementById('level_option_container')
      if(levels_in==0){
        levels_in+=1
        levels_container.style.display='inline'
        // menu_desplegable.style.height='210px'
      }
      else{
        levels_in-=1
        levels_container.style.display='none'
      }    
   } })
  
=======
>>>>>>> b75996f65d421e6ee1a6f91d7d1cddada6995d89
}


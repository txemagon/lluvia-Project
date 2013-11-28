var game    = null
var world   = null
var play    = null
var $logger = null


function start_game(){
	var start_button = document.getElementById('main_screen')
	start_button.style.display = 'none';

    try{
	var sheep = world.new_boid_as_sheep(function(boid, config){
		config.colour = "pink" 
		config.geo_data = {  
		   position: new Vector(350, 250),
		   velocity: new Vector(0, 0),
		   acceleration: new Vector(0, 0) 
		}
		return config 
	  })
     } catch(err) {
     	// Catch the dynamic call and raise it to method_missing()
     	throw err
     } finally{
     	// Keep on after method_missing
       world.start()
     }
}

function main(){ 
   $logger = new $Logger()
   world   = new World('screener')
   game    = new GameControl('screener')


   play = new Button("play_button",  { onclick: function(event, element){
      start_game()
   } })
  
}
 
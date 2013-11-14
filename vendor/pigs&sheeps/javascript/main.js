var canvas = null, ctx = null;
canvas = document.getElementById('screener');
ctx = canvas.getContext('2d');
var w = new World()
var play

function start_game(){
	var start_button = document.getElementById('main_screen')
	start_button.style.display = 'none';
	
	var shepperd = w.new_boid_as_sheep(function(boid, config){
		config.colour = "pink", 
		congig.geo_data = {  position: new Vector(350, 250),
		   velocity: new Vector(0, 0),
		   acceleration: new Vector(0, 0) 
		}
		return config 
	})

    w.start()
}

function main(){ 
   play = new Button("play_button",  function(event, element){
      start_game()
   })

}

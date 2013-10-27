var canvas = null, ctx = null;
canvas = document.getElementById('screener');
ctx = canvas.getContext('2d');
var w = new World()

function start_game(){
		
	var start_button = document.getElementById('main_screen');
	start_button.style.display = 'none';
	
	//alert("Hola Mundo")
	
	w.start()
	
	var shepperd = w.new_boid("pink", {position: new Vector(350, 250),
									   velocity: new Vector(0, 0),
									   acceleration: new Vector(0, 0) } )

}

function main(){ 


}

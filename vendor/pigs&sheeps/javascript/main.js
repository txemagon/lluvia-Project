var canvas = null, ctx = null;
canvas = document.getElementById('screener');
ctx = canvas.getContext('2d');
var w = new World()

function start_game(){
		
	var start_button = document.getElementById('main_screen');
	start_button.style.display = 'none';
	
	alert("Hola Mundo")
	
	w.start()
}

function main(){ 


}

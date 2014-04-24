var game    = null
var world   = null
var play    = null
var $logger = null

function start_game(){

	var start_button = document.getElementById('main_screen')
	start_button.style.display = 'none';

  // var canvas_color = document.getElementById('canvas')
  // canvas_color.style.backgroundColor = 'transparent';

    try{
        setInterval(dibujarCanvas, 100)
        countdown();
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
   new MenuHandler("menu")

   play = new Button("play_button",  { onclick: function(event, element){
      start_game()
   } })
  
}
 

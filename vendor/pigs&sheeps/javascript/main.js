var game    = null
var play    = null
var $logger = null

var levels_in=0
var menu_desplegable = document.getElementById('menu')

function start_game(device){

	var start_button = document.getElementById('main_screen')
	start_button.style.display = 'none';

  countdown(device);

  device.start()
}

function main(){ 
   $logger     = new $Logger()
   var world   = new World('screener')
   game        = new GameControl('screener')
   new MenuHandler("menu")

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
  
}
 

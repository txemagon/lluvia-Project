var tecla_pulsada = new Array();
var ultima_pulsacion=null;


function init(){
  game_loop();
}
alert("ok")
function game_loop(){
	setTimeout(game_loop,20);
	direccion();
}

	

function direccion(){                
    if(tecla_pulsada[38]) //Arriba
        b.geo_data.position = b.geo_data.position.add(0,-2);
    if(tecla_pulsada[39]) //Derecha
   			b.geo_data.position = b.geo_data.position.add(2,0);
  	if(tecla_pulsada[40]) //Abajo
   			b.geo_data.position = b.geo_data.position.add(0,2);
  	if(tecla_pulsada[37]) //Izquierda
   			b.geo_data.position = b.geo_data.position.add(-2,0);
}

// Evento pulsar tecla
document.addEventListener('keydown',function(evt){
 tecla_pulsada[evt.keyCode]=true;
},false);

// Evento soltar tecla
document.addEventListener('keyup',function(evt){
 tecla_pulsada[evt.keyCode]=false;
},false);
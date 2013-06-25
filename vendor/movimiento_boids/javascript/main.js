
var w = new World();
var b = w.new_boid("green", { position: new Vector(100,100), 
      						  velocity: new Vector(0,0), 
      						  acceleration: new Vector(0,0)});
var l = new Vector(20,20);
var tecla_pulsada = new Array();
var ultima_pulsacion=null;

function game_loop(){
	setTimeout(game_loop,20);
	direccion();
}

function sumar_vectores(){
	b.geo_data.position = new Vector(390, 390)
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

function main(){                          
  for(var i=0; i<10; i++)
    u = w.new_seeker(b)
    game_loop();
}



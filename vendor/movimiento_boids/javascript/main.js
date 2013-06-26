
var w = new World();
var b = w.new_boid("green", { position: new Vector(100,100), 
      						  velocity: new Vector(0,0), 
      						  acceleration: new Vector(0,0)});
var l = new Vector(20,20);
var tecla_pulsada = new Array();
var ultima_pulsacion=null;

var p = 1;
var r = 5;
var t = 1;
var x=10;
var y= 10;

function game_loop(){ //Elegir tipo de movimiento del Boid principal
	setTimeout(game_loop,20);
	//direccion();
  recta();
  //curva();
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


function recta(){
  f = new Func('2*{x}') 
  a = new Vector(f.value_in({x:p}), f.value_in({x:p}))

  b.geo_data.position = a
  p++;
}


function curva(){ // Mejorar!!
  x += r*Math.cos(t);
  y += r*Math.sin(t); 
  
  a = new Vector(x, y)
  b.geo_data.position = a
t+=0.01;
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



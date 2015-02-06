(function(){
	"use strict";
	window.addEventListener('load',init,false);

	var KEY_LEFT = 37;
	var KEY_RIGHT = 39;
	var KEY_ENTER = 13;
	var KEY_SPACE = 32;

	var canvas=null,ctx=null; 
	var lastPress=null;
	var pause;
	var pressing=[];
	//Salud 
	var health=100;

	//Creamos al juagdor
	var player = new Rectangle(400, 500, 125, 110, 100); //X, Y, Width, Height, Health
	var shots=[];

	//Creamos al enemigo
	var enemy = new Rectangle(400, 0, 100, 100, 60);

	function init() {
	    canvas=document.getElementById('canvas');
	    ctx=canvas.getContext('2d');
	    //Asignamos un tamaño al canvas
	    canvas.width = 1000;
	    canvas.height = 600;

	    run();
	    repaint();
	}

	function run() {
		setTimeout(run,50);
		act();
	}

	function repaint() {
		requestAnimationFrame(repaint);
		paint(ctx);
	}

	function act() {

		if (!pause) {

			//Movemos el cuadrado segun la tecla pulsada
			if (pressing[KEY_RIGHT])
				player.x += 10;
			if (pressing[KEY_LEFT])
				player.x -= 10;

			//Para mantenerlo dentro del canvas
			if (player.x > canvas.width - player.width)
				player.x = canvas.width - player.width;
			if (player.x < 0)
				player.x = 0;

			//Creamos los disparos
			if (lastPress == KEY_SPACE) {
				shots.push(new Rectangle(player.x+60, player.y, 7, 15));
				lastPress = null;
			}

			//Movemos los disparos
			for (var i=0, l=shots.length; i<l; i++) {
				shots[i].y-=10;
				if (shots[i].y < 0) {
					shots.splice(i--, 1);
					l--;
				}
			}
		}

		//Para pausar el juego
		if (lastPress == KEY_ENTER) {
			pause = !pause;
			lastPress = null;
		}
	}

	function paint(ctx) {
		//Pintamos de negro todo el canvas
		ctx.fillStyle = '#000';
		ctx.fillRect(0,0,canvas.width,canvas.height);

		//Pintamos al jugador
	    ctx.fillStyle='#414040';
	    player.fill(ctx);

	    //Pintamos al enemigo
	    ctx.fillStyle='#414040';
	    enemy.fill(ctx);

	 	//Pintamos en pantalla el num de la tecla que se pulsa
	 	ctx.fillStyle ='#fff';
	    ctx.fillText("Tecla pulsada: " + lastPress, 5, 60);
	  
	    //Pintamos los disparos
	    ctx.fillStyle="#0f0";
	    for (var i=0, l=shots.length; i<l; i++) {
	    	shots[i].fill(ctx);
	    }
	    ctx.fillStyle="#fff";
	    ctx.fillText("Disparos: " + shots.length, 5, 40);

	    //Pintamos la salud del jugador
	    ctx.fillStyle="#fff";
	    ctx.fillText("Salud: " + player.health,5, 20);

	    //Pintamos las salud del enemigo
	    ctx.fillStyle="#fff";
	    ctx.fillText("Salud del enemigo: " + enemy.health, 885, 20);

	    //Si esta pausado pintamos..
	    if (pause) {
	    	ctx.textAlign = "center";
	    	ctx.fillText("PAUSE", 450,250);
	    	ctx.textAlign = "left";
	    }
	}

	//Recoge cuando la tecla esta pulsada
	document.addEventListener("keydown", function(evt){
		lastPress = evt.keyCode;
		pressing[evt.keyCode] = true;
	}, false);

	document.addEventListener("keyup", function(evt){
		pressing[evt.keyCode] = false;
	}, false);

	//Clase del player (para dibujar el cuadrado)
	function Rectangle(x,y,width,height,health) {
		this.x = (x == null)?0:x;
		this.y = (y == null)?0:y;
		this.width = (width == null)?0:width;
		this.height = (height == null)?this.width:height;
		this.health = (health == null)?1:health;
	}

	Rectangle.prototype.intersects = function(rect) {
		if (rect != null) {
			return(this.x < rect.x + rect.width &&
				   this.y + this.width > rect.x &&
				   this.y < rect.y + rect.height &&
				   this.y + this.height > rect.y);
		}
	}

	Rectangle.prototype.fill = function() {
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}

	//Si el navegador es antiguo y no funciona la funcion requestAnimationFrame
	window.requestAnimationFrame = (function(){
		return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		function(callback) {window.setTimeout(callback,17);};
	})();

})();
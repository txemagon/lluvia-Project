// La idea consiste en crear un par de devices y que en el canvas 
// se viera la simulaccion de lo que pasa internamente, creo que 
// seria interesante a la hora de hacer los tutoriales.
//
// Ahora mismo en el codigo todo esta a capon para ver el efecto 
// y saber si interesa la idea. 

var c=null,ctx=null; 
var arrayPuntos = new Array();
var img = new Image()
img.src = "images/msg_blue.png"

function main(){
	c=document.getElementById("myCanvas");
	ctx=c.getContext("2d");
	setInterval(move_msg, 50)
}

function paint_line(){
	ctx.moveTo(110, 100);
	ctx.lineTo(200, 100);
	ctx.lineTo(200, 300);
	ctx.lineTo(290, 300);
	ctx.stroke();
}

function paint_rect(){
	ctx.strokeRect(10,10,100,100)
	ctx.font = '15px "Tahoma"';
	ctx.fillText("Device 1", 20, 30);
}


function paint_rect2(){
	ctx.strokeRect(c.width-110,c.height-110,100,100)
	ctx.font = '15px "Tahoma"';
	ctx.fillText("Device 2", c.width-100, c.height-90);
}

var x = 90
var y = 80
var ida = false
function send_msg(){
	ida = true
	x = 90
	y = 80
}

function move_msg(){
	ctx.clearRect(0,0,c.width,c.height);
	paint_rect()
	paint_rect2()
	paint_line(ctx)
	if(ida == true){
		ctx.drawImage(img,x,y,40,40);	
		if(x < 180 && y == 80)
			x+=10
		if(x == 180 && y >= 80)
			y+=10
		if(x >= 180 && y == 280)
			x+=10
		if(x == 270)
			ida = false
	}	
}
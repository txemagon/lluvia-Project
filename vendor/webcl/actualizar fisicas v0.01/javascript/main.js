    var speed_y = null
	var speed_x = null
	var aceleration_y = null
	var aceleration_x = null
	var pos_y   = null
	var pos_x   = null
	var $MAX = 20000
	var vectorLength = null

	//Timers
	var $FPS = 10
	var $dt = 1 / $FPS
	var frame_start = null

	var canvas = null
	var context = null
	//var loop = null
    var now = null
    var befores = null
	var $SECONDS = 600000
	var steps = 0

function main(){
	start()
	loop()
}

function start(){
	now = frame_start = new Date()
	//now = frame_start = (frame_start.getTime() / $SECONDS)

     canvas = document.getElementById("canvas");
     context = canvas.getContext("2d")
 
	 vectorLength = $MAX
     speed_y   = new Float32Array(vectorLength);
	 speed_x   = new Float32Array(vectorLength);
	 aceleration_y   = new Float32Array(vectorLength);
	 aceleration_x   = new Float32Array(vectorLength);
	 pos_y   = new Float32Array(vectorLength);
	 pos_x   = new Float32Array(vectorLength);

	for(var i=0; i<vectorLength; i++){
	    speed_x[i] = Math.floor(Math.random() * 10);
		speed_y[i] = Math.floor(Math.random() * 10);
		pos_x[i] = Math.floor(Math.random() * 500);
		pos_y[i] = Math.floor(Math.random() * 500);
		aceleration_x[i] = 0//Math.floor(Math.random() * 10)
		aceleration_y[i] = 0//Math.floor(Math.random() * 10)
	}

	init_gpu()
	//update()
}

var acumulator = 0
var loop_timer = null
function loop(){
	
	update(0.1)	
	paint()
	//setTimeout(loop, 1)
	loop_timer = requestAnimationFrame(loop)
}

function stop(){
	//clearTimeout(loop);
	window.cancelAnimationFrame(loop_timer)
}

var temp = 0
var img = new Image()
img.src = "images/pixel.png"
function paint(){
	//context.fillStyle = "#FFF";
	//temp ++
    //context.fillRect(0,0,500,500);
	canvas.width = canvas.width
	for(var i=0; i<vectorLength; i++){
	   //context.beginPath();
       //context.arc(pos_y[i],pos_x[i],1,0,2*Math.PI);
       context.drawImage(img,pos_x[i],pos_y[i])
    }
}
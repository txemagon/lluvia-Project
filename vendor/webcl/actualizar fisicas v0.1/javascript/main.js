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
	var loop_timer = null
    var now = null
    var before = null
	var $SECONDS = 600000
	var steps = 0

    var state = 1
function main(){
	start()
	loop()
}

function start(){
	now = Date.now()
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
		var x = Math.floor(Math.random() * 50)
		var y = Math.floor(Math.random() * 50)
	    speed_x[i] = x % 2 ? x : x*-1
		speed_y[i] = y % 2 ? y : y*-1
		pos_x[i] = 250//Math.floor(Math.random() * 500);
		pos_y[i] = 250//Math.floor(Math.random() * 500);
		aceleration_x[i] = 0//Math.floor(Math.random() * 10)
		aceleration_y[i] = 0//Math.floor(Math.random() * 10)
	}

	init_gpu()
	update(0.1)
	//update()
}

var acumulator = 0

function update_for(deltatime){
	for(var x = 0; x < vectorLength; x++){
		speed_y[x] += aceleration_y[x];
        speed_x[x] += aceleration_x[x];
        if(pos_y[x]+speed_y[x] > 500 || pos_y[x]+speed_y[x] < 0){
           speed_y[x] *= -1;
           aceleration_y[x] *= -1;
        }
  		pos_y[x]   += speed_y[x] * deltatime;

        if(pos_x[x]+speed_x[x] > 500 ||pos_x[x]+speed_x[x] < 0){
           speed_x[x] *= -1;
           aceleration_x[x] *= -1;
        }
  		pos_x[x]   += speed_x[x]  * deltatime;
  	}
}

function change(){
	state = state != 1 ? 1 : 0
}

function loop(){
	before = now
	now = Date.now()
	delta = now - before
	
    if(state == 1){
       run()
	   get()
    }
    else
	   update_for(delta/1000)
	//alert(Date.now() - now)

	steps++
	//if(steps > 10){
	   paint()
	  // steps = 0
    //}
	loop_timer = requestAnimationFrame(loop)
	//setTimeout(loop, 1)
}

function stop(){
	//clearTimeout(loop);
	window.cancelAnimationFrame(loop_timer)
}

var img = new Image()
img.src = "images/pixel.png"
function paint(){
	//context.fillStyle = "#FFF";
	//temp ++
    //context.fillRect(0,0,500,500);
    canvas.width = canvas.width
    //context.beginPath();
	for(var i=0; i<vectorLength; i++){
	   context.drawImage(img,pos_x[i],pos_y[i])
	   //context.fillRect(pos_x[i], pos_y[i], 1, 1);
       //context.arc(pos_y[i],pos_x[i],1,0,2*Math.PI);
    }
    //context.stroke();

}
   
//Variables globales donde se guardan los datos de las particulas
var speed_y = null
var speed_x = null
var aceleration_y = null
var aceleration_x = null
var pos_y   = null
var pos_x   = null
var is_alive = null
var update = null 

var $MAX = 10000 //Canidad maxima de particulas
var vector_length = null //Longitud del vector
var actual_particles = null

//Timers
var $FPS = 60 //Cantidad de fraps por segundo
var $dt = 1 / $FPS //Delta time

var arguments_kernel = null

var arguments_buffers = null


//Canvas configurations
var canvas = null
var context = null

var loop_timer = null //Timer para parar o reanudar la ejecucion

//Variables para calcular el tiempo que pasa
var now = null
var before = null
var delta = null

//Estado para ejecutar el programa con for o webcl
var state = 1
//var state_1 = ["webcl", "javascript"]
//var state_2 = ["normal", "time_speed"]

//Imagenes para pintar los pixeles
var img = []
img[0] = new Image()
img[0].src = "images/pixel.png"
img[1] = new Image()
img[1].src = "images/pixel2.png"
img[2] = new Image()
img[2].src = "images/pixel3.png"
img[3] = new Image()
img[3].src = "images/pixel4.png"

function main(){
	start()
	loop()
}

/*Inicializa las variables y el kernel*/
function start(){
	now = Date.now()

     setup_canvas()
 
	 vector_length   = $MAX
     speed_y         = new Float32Array(vector_length)
	 speed_x         = new Float32Array(vector_length)
	 aceleration_y   = new Float32Array(vector_length)
	 aceleration_x   = new Float32Array(vector_length)
	 pos_y           = new Float32Array(vector_length)
	 pos_x           = new Float32Array(vector_length)
	 is_alive        = []
	 delta = new Float32Array([0.1])

	 actual_particles = 0


    update = new Webcl("ckVectorAdd", vector_length, 0, 1, 6, [1], [Math.ceil (vector_length)])
    update.init_gpu()
    arguments_kernel = [update.read_write_buffers[0], update.read_write_buffers[1], update.read_write_buffers[2], update.read_write_buffers[3], update.read_write_buffers[4],
		update.read_write_buffers[5], new Float32Array([$dt]), new Uint32Array([vector_length])]

    arguments_buffers = [update.read_write_buffers[0], update.read_write_buffers[1], update.read_write_buffers[2], update.read_write_buffers[3], update.read_write_buffers[4],
		update.read_write_buffers[5]]
	
	for(var i=0; i<vector_length; i++){
		var x = 0//Math.floor(Math.random() * 50)+1
		var y = 0//Math.floor(Math.random() * 50)+1
	    speed_x[i] = 0//x % 2 ? x : x*-1
		speed_y[i] = 0//y % 2 ? y : y*-1
		pos_x[i] = 0//Math.floor(Math.random() * canvas.width)
		pos_y[i] = 0//Math.floor(Math.random() * canvas.height)

		x = Math.floor(Math.random() * 10)
		y = Math.floor(Math.random() * 10)
		aceleration_x[i] = 0 //x % 2 ? x : x*-1
		aceleration_y[i] = 0 //y % 2 ? y : y*-1
		is_alive[i] = false
		new_particle()
	}
	update.set_kernel_arguments(arguments_kernel)
	update.set_buffers(arguments_buffers, [pos_y, pos_x, speed_y, speed_x, aceleration_y, aceleration_x])
}

function new_particle(){
	if(actual_particles >= $MAX)
		return
	var x = Math.floor(Math.random() * 50)+1
	var y = Math.floor(Math.random() * 50)+1
	speed_x[actual_particles] = x % 2 ? x : x*-1
    speed_y[actual_particles] = y % 2 ? y : y*-1
	pos_x[actual_particles] = Math.floor(Math.random() * canvas.width)
	pos_y[actual_particles] = Math.floor(Math.random() * canvas.height)

	x = Math.floor(Math.random() * 10)
	y = Math.floor(Math.random() * 10)	
	aceleration_x[actual_particles] = 0 //x % 2 ? x : x*-1
	aceleration_y[actual_particles] = 0 //y % 2 ? y : y*-1
	is_alive[actual_particles] = true

	actual_particles ++

	//set()
}

function update_for(deltatime){
	for(var x = 0; x < vector_length; x++){
		speed_y[x] += aceleration_y[x];
        speed_x[x] += aceleration_x[x];
        if(pos_y[x]+speed_y[x] > canvas.width || pos_y[x]+speed_y[x] < 0){
           speed_y[x] *= -1;
           aceleration_y[x] *= -1;
        }
  		pos_y[x]   += speed_y[x] * deltatime;

        if(pos_x[x]+speed_x[x] > canvas.height ||pos_x[x]+speed_x[x] < 0){
           speed_x[x] *= -1;
           aceleration_x[x] *= -1;
        }
  		pos_x[x]   += speed_x[x]  * deltatime;
  	}
}

function change(){
	state = state != 1 ? 1 : 0
}


var step = 0
function loop(){
	before = now
	now = Date.now()
	delta[0] = now - before
	delta[0] /= 1000
	

	if(delta[0] > 0.2)
		delta[0] = $dt
    if(state == 1){
      for(;delta[0] >= $dt; delta[0] -= $dt){
          update.run()
       }
       update.get_buffers(arguments_buffers, [pos_y, pos_x, speed_y, speed_x, aceleration_y, aceleration_x]) 
	  
    }
    else
	   update_for(delta[0])
	
	//draw()
	paint()
	//alert(Date.now() - now)
	loop_timer = requestAnimationFrame(loop)
}

function restart(){
	now = Date.now()
	loop()
}

function stop(){
	window.cancelAnimationFrame(loop_timer)
}

function setup_canvas() {
  try {
    canvas = document.getElementById("canvas")
    context = canvas.getContext("2d")
    var our_canvas = document.createElement('canvas')
    our_canvas.width = canvas.width
    our_canvas.height = canvas.height
    context.drawImage (our_canvas, 0, 0)
  } catch(e) {
    document.getElementById("output").innerHTML += 
      "<h3>ERROR:</h3><pre style=\"color:red;\">" + e.message + "</pre>";
    throw e;
  }
}

function pre_paint(min, max){
	var canv = document.createElement('canvas')
	canv.width = canvas.width
	canv.height = canvas.height
	var context2 = canv.getContext('2d')
	for(var i=min; i<max; i++){
       if(is_alive[i]){
   	      //Usar enteros a la hora de pintar en lugar de flotantes
          context2.drawImage(img[0],Math.round(pos_x[i]),Math.round(pos_y[i]), 1, 1)
        }
    }
    return canv
}

function paint(){

     var canvases = []
     var n = 10000
    //Limpiar el canvas de forma más eficiente
    canvas.width = canvas.width
	//for(var x=0; x<vector_length/n; x++)
	  // canvases.push(pre_paint(x*n, (x*n)+n))

	//context.drawImage(img[0], 0,0,1,1)

	//var imgData = context.getImageData(0, 0, 1, 1);

	//for(var i=0; i<vector_length; i++)
	//	context.putImageData(imgData,Math.round(pos_x[i]),Math.round(pos_y[i]))
    //for(var i=0; i<canvases.length;i++)
      // context.drawImage(canvases[i], 0, 0)

    for(var i=0; i<vector_length; i++){
       if(is_alive[i]){
   	      //Usar enteros a la hora de pintar en lugar de flotantes
          context.drawImage(img[0],Math.round(pos_x[i]),Math.round(pos_y[i]), 1, 1)
        }
    }

}

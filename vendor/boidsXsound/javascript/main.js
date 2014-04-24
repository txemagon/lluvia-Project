alert("")
var escala = 1
logger = document.getElementById("logger")

var c = null, cxt = null;

function main(){ 
  var w = new World()

  var boid_list = new WorldInterface("boid_list_content")
  w.addPort("new_boid", boid_list)
    
  var boid_editor = new BoidEditor("boid_properties")
  boid_list.addPort("focus_boid", boid_editor)

  var face_boids = new FaceDevice("boid_properties")
  boid_list.addPort("face_boid", face_boids)

  c=document.getElementById("face");
  cxt=c.getContext("2d");

 // setInterval(pintarCara, 100)

  for(var i = 0; i<10; i++){
    var b = w.new_wander()
  }

  w.start()
}

function change_scale(operation){

	switch(operation){
		case '+':
		if(escala < 2)
			escala +=0.5
		break;
		case '-':
		if(escala > 0.5)
			escala -=0.5
		break;
	}
}
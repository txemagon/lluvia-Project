var escala = 1
logger = document.getElementById("logger")

var c = null, cxt = null;

function main(){ 
  var w = new World("screener")

  var boid_list = new WorldInterface("text_lcd")
  w.addPort("new_boid", boid_list)
  
  var boid_editor = new BoidEditor("boid_properties")
  boid_list.addPort("focus_boid", boid_editor)
  

  var face_boids = new FaceDevice("boid_properties")
  boid_list.addPort("face_boid_animation", face_boids)

  c=document.getElementById("face");
  cxt=c.getContext("2d");

 var speaker1 = w.new_speaker(300,300)
 var speaker2 = w.new_speaker()

for(var i=0;i<15;i++){
	var nanobot = w.new_nanobot()
	nanobot.brain.activate('wander')
 	nanobot.brain.get_behavior('wander').set_target()

}

/*
 var nano1 = w.new_nanobot()
 nano1.brain.activate('wander')
 nano1.brain.get_behavior('wander').set_target()


var nano2 = w.new_nanobot()
 nano2.brain.activate('seek')
 nano2.brain.get_behavior('seek').set_target(nano1)
*/
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
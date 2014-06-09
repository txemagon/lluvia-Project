LcdAutomata.prototype = new ThreadAutomata
LcdAutomata.prototype.constructor = new LcdAutomata

function LcdAutomata(processor, gate) {
	var that = this
	this.now = new Date()
	this.before = new Date()
	this.ghost_opacity = 0
	var state = this.state = new Enumeration("start", "refresh", "sleep")
	this.currentState = { previous: state.start,
						  current: state.start,
						  requested: state.start }

		this.solicitors = [
			/* start */	
			[
				function(){
					;
				},
				function(){
					this.currentState.requested = this.state.refresh	
					;
				},
				function(){
					;
				}
			],
			/* refresh */ 
			[
				function(){
					;
				},
				function (){
					this.refresh()
					;
				},
				function(){
					;
				}
			],
			/* sleep */
			[
				function(){
					;
				},
				function(){
					;
				},
				function(){
					;
				}
			]
		]

    function initialize(){
    	that.gate = gate
		try{
			if(that.state){
				ThreadAutomata.call(that, that.state, that.currentState, that.solicitors, processor)
			}
		}catch(e){
			alert("No event handlers were found.\nException: " + e.toSource())
		}
    }

    if (arguments.length)
        initialize()
}

LcdAutomata.prototype.refresh = function(){
	if(actual_boid instanceof Speaker){
  		text_lcd2.innerHTML =  "<div style='margin:0px 0 0 27px;'><big><big>Controls</big></big><br/></div>" + 
                         "0" + (actual_boid.monitor.actual_song+1) + ". " + actual_boid.monitor.tracklist[actual_boid.monitor.actual_song] + " <br/>" 
}
if(actual_boid instanceof Nanobot){
text_lcd2.innerHTML =  "<div style='margin:0px 0 0 10px;'><big><big>Information</big></big>" + "<br/></div>" +
                             //"Id: " + mssg.event.focus_boid.data.id + "<br/>" +
                             "Stress level: " + Math.round(actual_boid.level_emotion) + "<br/>" +
                             //"visible_boids: " + actual_boid.visible_object.length + "<br/>" +
                             //"vel: " + actual_boid.geo_data.velocity.module() + "<br/>" +
                             "Behaviour: " + actual_boid.brain.behavior + "<br/>" + 
                             "Pos (x,y): (" +  Math.round(actual_boid.geo_data.position.Coord[0]) + "," + Math.round(actual_boid.geo_data.position.Coord[1])+ ")" + "<br/>" + "<br/>" +
                             "<div style='margin:0px 0 0 27px;'><big><big>Controls</big></big><br/></div>"
}
}
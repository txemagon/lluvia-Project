/**
 * People leader.
 *
 * @author Txema
 * @version 1.00 Sept, 2009
 */
God.prototype = new Device
God.prototype.constructor = God

function God(view, state, currentState, parent){
    /* self reference for static methods */
    var that = this;
	var args = arguments
	var self_events = ["Har_Mageddon"]
	
    /* class reference for instance objects */
    this._class = that
	this.view = view || document.body
	this.parent = parent
    this.maxWidth = screen.width
    this.lastCycle = null
	this.human = []
    
    /* Inherit */
	function initialize(){
		Device.apply(that, args)
		that.h_s = 160
		that.w_s = that.parent.view.offsetWidth
		that.t_s = that.parent.y_calc() + that.parent.view.offsetHeight - that.h_s
		that.l_s = that.parent.x_calc()
		that.solicitors[that.state.running][that.stateChange.steady] = God.prototype.run
		that.view.style.clip = "rect(0px," + that.maxWidth + "px," + screen.height + "px, 0px)"
		that.view.style.overflow = "hidden"
		that.view.style.position = "absolute"
		//that.view.style.backgroundColor = "#0000FF"
		that.view.style.width    = that.w_s + "px"
		that.view.style.height   = that.h_s + "px" 
		that.view.style.top      = that.t_s + "px"
		that.view.style.left     = that.l_s + "px"
		that.view.style.zIndex   = 1000
		that.newMan( _random_prop(animations) )
	}
    
	
	if (arguments.length)
		initialize()
}

God.prototype.newMan = function(name){
    try {
        var AHuman = this.openDevice(Human)
        var person = new AHuman(name) // new AHuman("simon", "powerwalk", 32, "D")// 
        this.human.push(person)
		setTimeout(this.generations.bind(this), 10000 + Math.random() * 10000)
    } 
    catch (e) {
        if ($K_debug_level >= $KC_dl.DEVELOPER) 
            alert("No event handlers were found.\nException: " + e.toSource())
    }
}

God.prototype.generations = function(){
	if ( this.currentState.current == this.getStates().running)
		this.newMan(_random_prop(animations))
}

God.prototype.run = function(){
	if (!this.movieOrigin) {
		this.movieOrigin = arguments[0]
		this.lastCycle = this.movieOrigin
	}
    for (var i = 0; i < this.human.length; i++) 
        this.human[i].run(arguments[0])
    this.lastCycle = arguments[0]
	
}

God.prototype.kill = function(human){
	try {
	for (var i = 0; i < this.human.length; i++) 
		if (this.human[i] === human)
			this.human.splice(i, 1)
	} catch (e) {
		if ($K_debug_level >= $KC_dl.PROGRAMMER) 
			alert("God has some rebels that don't want to die.")	
	}
}

God.prototype.attend_Har_Mageddon = function(date, mssg){
	try {
		while(this.human.length){
			this.human[0].kill();
		}
		mssg.current++;
		if (mssg.creation.creator && mssg.creation.creator[mssg.name + "_back"])
			mssg.creation.creator[mssg.name + "_back"]("All dead")
		this.currentState.requested = this.getStates().killed
	} catch (e) {
		if ($K_debug_level >= $KC_dl.PROGRAMMER) 
			alert("Har Mageddon has failed.\nException: " + e.toSource())
	}
}


Human.prototype = new Gate
Human.prototype.constructor = Human

function Human(name, state, size, dir){
	var that = this
	var anim_speeds = {
			"power": 1605,
			"powerwalk": 1605,
			"run": 2875,
			"shuffle": 1105,
			"strut": 1705,
			"elder": 700,
			"walk": 1020
	}
	
	var msgs = [
		"Ouch !",
		"mmmh !",
		"?",
		"Hey !",
		"Aha",
		".:.",
		"O",
		"-=-",
		"jajaja"
	]
	
	this.getMessage = function(){
		return msgs[Math.floor(Math.random() * msgs.length )]
	}
	this.getSpeed = function(){
		var k = this.size / 50
		return anim_speeds[this.state] * k || 1605
	}
	
	function initialize(){
		that.name  = name
		that.state = state || _random_prop(animations[that.name])
		that.size  = size  || _random_prop(animations[that.name][that.state])
		var _d     = animations[that.name][that.state][that.size]
		that.dir   = dir   || _d[Math.floor(Math.random() * _d.length)]
		that.url   = "url('images/people/" + that.name + "/" + that.state + that.dir + that.size + "/" + that.state +that.dir + that.size +"_"
		that.fr = 1000 / ( 24 + Math.floor(Math.random()* 16) - 8)
		that.X = that.dir === "D"? 0: (that.device.maxWidth - that.size)
		that.vx = that.getSpeed() / that.fr
		if (that.dir === "I")
			that.vx = -that.vx
		that.frame = 1
		Gate.call(that, null, that.device.view)
		if (that.size == 32) {
			that.Y = 8 + Math.floor(Math.random() * 4) - 2
			that.panel.style.zIndex = 1
		}
		else {
			that.Y = 8 + Math.floor(Math.random() * 16) - 8
			that.panel.style.zIndex = 3
		}
    	that.setx(that.X)
		that.sety(that.Y)
		that.panel.style.backgroundImage = that.the_image() 
    	that.panel.style.width = that.size + "px"
		that.panel.style.height = (that.size * 2 - 10) +"px"
		that.panel.style.position = "absolute"
		
	}
	
    if (arguments.length) 
	    initialize()    
}

Human.prototype.kill = function(){
	this.device.kill(this)
	this.panel.parentNode.removeChild(this.panel)
}

Human.prototype.run = function(){
	this.frame = Math.ceil((arguments[0] - this.device.movieOrigin) / this.fr) % 31
	this.panel.style.backgroundImage = this.the_image()
	this.setx(this.X + this.vx * (arguments[0] - this.device.lastCycle) / 1000)
	if (this.bubble) {
		if (this.bubble > 0) 
			this.bubble = 4 - (arguments[0] - this.bubble_t)/1000
		if (this.bubble < 0) 
			this.bubble = 0
		this.panel.firstChild.style.opacity = this.bubble;
		this.panel.firstChild.style.filter = 'alpha(opacity=' + this.bubble/10 + ')';

	}
	if ( (this.X > this.device.maxWidth) || (this.X < -this.size))
		this.kill()
}

Human.prototype.the_image = function(){
	return this.url + this.c_frame() + ".png')"
}

Human.prototype.c_frame = function(){
	var d = 0
	var f = this.frame
	var p = []
	
	while (f>=1){
		f = f / 10
		d++
	}
	d = 4 - d
	
	while(d>0){
		p.push("")
		d--
	}
	p.push(this.frame)
	return p.join("0")
}

Human.prototype.color = function(){
	var st = []
	for (var i=0; i<6; i++)
		st.push(this.bubble * 9 / 100)
	return st.join("")
}




Human.prototype.setx = function(x){ this.X = x; this.panel.style.left = Math.ceil(x) + "px";}
Human.prototype.sety = function(y){	this.Y = y;	this.panel.style.top = Math.ceil(y) + "px";}
Human.prototype.x = function(){return this.X;}
Human.prototype.y = function(){return this.Y;}

function _random_prop(obj){
	var ak = obj.keys()
	return ak[Math.floor(Math.random() * ak.length)]
}

Human.prototype.do_onclick = function(){
	this.bubble = 100 
	this.bubble_t = new Date()
    this.panel.innerHTML = "<div style='position: relative; top: -12px; color: #" + this.color() + ";'>" + this.getMessage()+ "</div>"
}

Human.prototype.do_onmouseout = function(){
	if (animations[this.name][this.state][this.size].length == 2){
		this.vx = -this.vx
		if (this.dir === "D")
			this.dir = "I"
		else
			this.dir = "D"
		this.url   = "url('images/people/" + this.name + "/"+ this.state + this.dir + this.size + "/" + this.state + this.dir + this.size +"_"
	} else
		this.do_onclick()
}

ButtonGate.prototype = new Gate
ButtonGate.prototype.constructor = ButtonGate

function ButtonGate(el, parent){ 
	var that = this	
	var args = arguments
	
	function initialize(){
		that.el = el
		that[el] = {}
		Gate.call(that, el, parent.getAttribute('id'))
	}

	if (arguments.length)
		initialize()
}

ButtonGate.prototype.do_onclick = function(event, element){
	//this.device.fireEvent(this.device.newMessage("sync", "focus_boid", this.boid))
	alert("touch")
}
FaceBoid.prototype = new Gate
FaceBoid.prototype.constructor = FaceBoid

function FaceBoid(element){
	var that = this
	this.name = element

	function initialize(){
		try{
			if(element){
				that.element = element
				that[element] = {}
				Gate.call(that, element)
				that[element].face_automata = that.new_effect(new FaceAutomata(that.device, that))
			}
		} catch(e){
				if ($K_debug_level >= $KC_dl.DEVELOPER)
					alert("No event handlers were found.\nException: " + e.toSource())
		}
	}

	if(arguments.length)
		initialize()
}

FaceBoid.prototype.do_onmouseover = function (ev, el){
		this[this.element].face_automata.currentState.requested = this[this.element].face_automata.state.appearing
}

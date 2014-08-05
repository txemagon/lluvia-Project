TestGate.prototype = new Gate
TestGate.prototype.constructor = TestGate

function TestGate(el){
	var that = this
	function initialize(){
		that.el = el
		that[el] = {}
		Gate.call(that, el)
	}

	if (arguments.length)
		initialize()
}

TestGate.prototype.do_onclick = function(event, element){
	alert("click")
}

TestGate.prototype.do_onmouseout = function(event, element){
	alert("out")
}
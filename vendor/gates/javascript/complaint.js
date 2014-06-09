Complaint.prototype = new Gate
Complaint.prototype.constructor = Complaint

function Complaint(name, element) {

	this.name = name

    try {
	if (element)
	    Gate.call(this, element)	// Call to the super constructor (it does all the work).
    } catch (e) {
	if ($K_debug_level >= $KC_dl.DEVELOPER)
	    alert("No event handlers were found.\nException: " + e.toSource())
    }
}

Complaint.prototype.do_onclick   = function(event, element){
    alert("My name is " + this.name)
}

Complaint.prototype.do_onmouseover   = function(event, element){
    alert("mmmmmmm")
}

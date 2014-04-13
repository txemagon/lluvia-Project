Animation.prototype = new Gate
Animation.prototype.constructor = Animation

function Animation(source, element) {

this.source = source

    try {
if (element)
Gate.call(this, element)	// Call to the super constructor (it does all the work).
    } catch (e) {
if ($K_debug_level >= $KC_dl.DEVELOPER)
alert("No event handlers were found.\nException: " + e.toSource())
    }
}


Animation.prototype.do_onmouseover = function(event, element){
    alert(this.source)
}

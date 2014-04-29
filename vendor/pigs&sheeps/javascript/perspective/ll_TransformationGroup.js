/** @class Perspective.Frame
 * Changes origin
 */

Perspective.TransformationGroup.prototype = new Array
Perspective.TransformationGroup.prototype.constructor = new Perspective.TransformationGroup

Perspective.TransformationGroup = function() {
}

Perspective.TransformationGroup.push = function() {
	for (var i=0; i<arguments.length; i++)
	   if (!( arguments[i] instanceof Transform ) )
		   throw "Argument number " + i + " needs to be derived from Transfomation."

	return Array.prototype.push.apply(this, arguments)
}

//todo: Check only valid transformations are inserted.

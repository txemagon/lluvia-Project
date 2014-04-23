/**
 * Building Efects.
 *
 * @author Txema
 * @version 1.00 Sept, 2009
 */

Edificio.prototype = new Gate
Edificio.prototype.constructor = Edificio

function Edificio(element){
	
	var that = this
	var args = arguments
	
	function initialize(){
		Gate.apply(that, args)
	}
	
	if (arguments.length)
		initialize()
}

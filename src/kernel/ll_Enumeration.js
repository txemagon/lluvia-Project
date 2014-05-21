/**
 * @class Enumeration
 *
 * Creates several symbolic constants
 *
 *    ###Example:
 *    Suit = new Enumeration("spades", "hearts", "diamonds", "clovers")
 *    // => Object { spades=0, hearts=1, diamonds=2, clovers=3}
 *
 *    Suit.hearts == 1
 *    // => true
 *
 */
function Enumeration(){
	for (var i=0; i<arguments.length; i++)
		this[arguments[i]] = i	
}

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
	var en = {};
	for (var i=0; i<arguments.length; i++)
		en[arguments[i]] = i	
	return en;
}

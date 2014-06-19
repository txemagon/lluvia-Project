/**
 * @class Kernel.Facilities.Enumeration
 *
 * Creates several symbolic constants
 *
 *    ### Example:
 *
 *    Suit = new Enumeration("spades", "hearts", "diamonds", "clovers")
 *    // { spades: 0, hearts: 1, diamonds: 2, clovers: 3}
 *
 *    Suit.hearts == 1
 *    // => true
 *
 *     var a = new Enumeration("spades", ["hearts", [ "red", "black"]], "diamonds", "clovers")
 *     Object.keys(a.hearts)
 *     // => red,black
 *
 *     a.hearts
 *     // => 1
 *
 *     a.hearts.red
 *     // => 0
 *
 */
function Enumeration(){
    for (var i=0; i<arguments.length; i++)
        if (arguments[i] instanceof Array){
            this[arguments[i][0]] = new Number(i)
            var subcases = new (ApplyProxyConstructor(Enumeration, arguments[i][1]))
            for (var key in subcases)
                Object.defineProperty(this[arguments[i][0]], key, {value: subcases[key], enumerable: true})
        } else
            this[arguments[i]] = i

}

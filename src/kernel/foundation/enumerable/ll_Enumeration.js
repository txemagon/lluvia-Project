/**
 * @class Kernel.Foundation.Enumerable.Enumeration
 * Creates several symbolic constants
 *
 * ### Example:
 *
 *     Suit = new Enumeration("spades", "hearts", "diamonds", "clovers")
 *     // { spades: 0, hearts: 1, diamonds: 2, clovers: 3}
 *
 *     Suit.hearts == 1
 *     // => true
 *
 *     var a = new Enumeration("spades", "hearts", [ "red", "black"], "diamonds", "clovers")
 *     Object.keys(a.hearts)
 *     // => red,black
 *
 *     a.hearts
 *     // => 1
 *
 *     a.hearts.red
 *     // => 1
 *
 * Attributes, as a.hearts, are holding
 * {@link Kernel.Foundation.DataType.VersionNumber VersionNumber} objects.
 *
 * ### Inner Structure
 *
 *     {
 *       "spades": 0,
 *       "hearts": { 1,
 *       	           "red": 1,
 *       	           "black": 2
 *                  },
 *        "diamonds": 2,
 *        "clovers": 3
 *     }
 *
 * ### Sugar
 *
 *  Despite,
 *
 *     a.hearts.black == 2
 *     //=> true
 *
 * when stringifying,
 *
 *     a.hearts.black.toString()
 *     //=> "1.2"
 *
 * due to {@link Kernel.Foundation.DataType.VersionNumber VersionNumber} properties.
 */

/**
 * @method constructor
 * Create a list of constant given an
 * {@link Kernel.Foundation.Enumerable.InterleavedArray InterleavedArray}
 *
 * ### Example
 *
 *     var a = new Enumeration("spades", "hearts", [ "red", "black"], "diamonds", "clovers")
 *
 * @param {String...} constants List of constants to be used as an InterleavedArray.
 */
function Enumeration(constants) {
    Object.defineProperty(this, "ia", {
        value: new(ApplyProxyConstructor(InterleavedArray, arguments)),
        enumerable: false,
    })

    /* this.ia
       {
	      "0": "spades",
	      "1": "hearts",
	      "1.1": "red",
	      "1.2": "black",
	      "2": "diamonds",
	      "3": "clovers"
       }
     will be turned inside this into:
         {
       "spades": 0,
       "hearts": { 1,
       	           "red": 1,
       	           "black": 2
                  },
        "diamonds": 2,
        "clovers": 3
        }
        in the following lines.
     */

    var keys = this.ia.keys()
    for (var k = 0; k < keys.length; k++) {
        var ia_value = this.ia[keys[k]]
        var deep = this
        var key_chain = keys[k].split(".")

        for (var i = 0; i < key_chain.length - 1; i++) {
            var parent = this.ia[key_chain.slice(0, i + 1).join(".")]

            if (parent in deep)
                deep = deep[parent]
        }
        deep[ia_value] = new VersionNumber(keys[k])
        Object.defineProperty(deep[ia_value], "name", {
            value: ia_value
        })
    }
}
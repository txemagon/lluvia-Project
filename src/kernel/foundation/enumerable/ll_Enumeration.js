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
        enumerable: false
    })

    this.transpose()
}

/**
 * @method transpose
 * Takes an InterleavedArray and inverts it, due to InterleavedArray and Enumeration reciprocity.
 * Not enumerable, not configurable, not writable.
 *
 * Given the following InterleavedArray,
 *
 *        {
 *        "0": "spades",
 *        "1": "hearts",
 *        "1.1": "red",
 *        "1.2": "black",
 *        "2": "diamonds",
 *        "3": "clovers"
 *       }
 *
 * will be turned inside this into:
 *         {
 *       "spades": 0,
 *       "hearts": { 1,
 *                   "red": 1.1,
 *                   "black": 1.2
 *                  },
 *        "diamonds": 2,
 *        "clovers": 3
 *        }
 *
 *  through this method.
 *
 * @param  {Class} [Type=VersionNumber] Class for assigning values
 */
Enumeration.prototype.transpose = function(Type) {
    Type = Type || VersionNumber

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
        deep[ia_value] = new Type(keys[k])
        Object.defineProperty(deep[ia_value], "name", {
            value: ia_value
        })
    }
}

/**
 * @method  each
 * Iterates over key-value pairs inside the enumeration.
 *
 * ### Example
 *
 *   Let a be defined as
 *
 *     var a = new Enumeration("spades", "hearts", [ "red", "black"], "diamonds", "clovers")
 *
 *  with the following inner structure:
 *
 *        {
 *       "spades": 0,
 *       "hearts": { 1,
 *                   "red": 1,
 *                   "black": 2
 *                  },
 *        "diamonds": 2,
 *        "clovers": 3
 *        }
 *
 *   When called
 *
 *     a.each(function(key, value) {;})
 *
 * key-value pairs will be:
 *
 * | key      | value  |
 * |----------|-------:|
 * | spades   | 0      |
 * | hearts   | 1      |
 * | red      | 1.1    |
 * | black    | 1.2    |
 * | diamonds | 2      |
 * | clovers  | 3      |
 *
 */
Enumeration.prototype.each = function() {
    var that = this
    this.ia.keys().each(function(string_key) {
        // string_key is string 1.2.3 for instance
        // Get the VersionNumber 1.2.3 for the value.
        var key = string_key.split(".")
        var value = that
        for (var i = 0; i < key.length; value = value[that.ia[key.slice(0, i + 1).join('.')]], i++);
        Enumeration.prototype.each.yield(that.ia[string_key], value)
    })
}

Object.defineProperties(Enumeration.prototype, {
    transpose: {
        enumerable: false,
        configurable: false,
        writable: false
    },
    each: {
        enumerable: false,
        configurable: false,
        writable: false
    }
})

//todo: Needed include$U. Depends on making module Enumerable and mixing.
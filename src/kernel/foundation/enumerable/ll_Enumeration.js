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
    var args = arguments // Copy of arguments
    if (constants instanceof Enumeration)
        args = constants.ia // Copy constructor trick.
    Object.defineProperty(this, "ia", {
        value: new(ApplyProxyConstructor(InterleavedArray, args)),
        enumerable: false,
        writable: true
    })

    Enumeration.prototype.transpose.call(this)
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
    Type = Type || this.Type || VersionNumber

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
        deep[ia_value] = deep[ia_value] || new Type(keys[k])
        Object.defineProperty(deep[ia_value], "name", {
            value: ia_value,
            writable: true
        })
    }
}

Enumeration.prototype.full_name = function(key){
    var name = ""

    var indices = key.split('.')
    for (var i=0; i<indices.length; i++)
        name += this.ia[indices.slice(0, i+1).join('.')] + "."

    return name.substr(0, name.length-1)
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
 * | key          | value  |
 * |--------------|-------:|
 * | spades       | 0      |
 * | hearts       | 1      |
 * | hearts.red   | 1.1    |
 * | hearts.black | 1.2    |
 * | diamonds     | 2      |
 * | clovers      | 3      |
 *
 */
Enumeration.prototype.each = function() {
    var that = this
    this.ia.keys().each(function(string_key) {
        // string_key is string 1.2.3 for instance
        // Get the VersionNumber 1.2.3 for the value.
        var key = string_key.split(".")
        var value = that
        for (var i = 0; i < key.length;
            value = value[that.ia[key.slice(0, i + 1).join('.')]],
            i++);
        Enumeration.prototype.each.yield(that.full_name(string_key), value)
    })
}

/**
 * @method get
 * Returns a the value of a constant given the constant name.
 * When the value is passed it is returned previously checking
 * is actually present in the set.
 * null is returned when key isn't found.
 *
 *
 * ### Example
 *
 * Given:
 *
 *      var a = new Enumeration("spades", "hearts", [ "red", "black"], "diamonds", "clovers")
 *
 * will result in
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
 * executing
 *
 *      a.get("hearts.red")
 *      // => '1.1'
 *      a.get("1.1")
 *      // => '1.1'
 *      a.get('5.7')
 *      // => null
 *      a.get("bat.man")
 *      // => null
 *
 * ## Notice
 *
 *  Despite the return value appears as a string in the example above,
 *  actually is a VersionNumber (or derivated). This seems interesting
 *  since this kind of numbers can hold the ability to perform actions,
 *  as we can see in the {@link Engine.State State} class.
 *
 * @param  {String} label Constant name to look for.
 * @return {VersionNumber}       Value of the constant.
 */
Enumeration.prototype.get = function(label) {
    label = new String(label)
    if ( /\d+(?:\.\d+)*/.test(label) )
        if (this.ia.keys().include$U(label))
            return this.get(this.full_name(label))
        else
            return null

    var position = null
    this.each(function (key, value) {
        if (key == label)
            position = value
    })
    return position
}

/**
 * @method get$B
 * Same as #get but creating empty states when missing intermediate ones.
 * Take option -p in mkdir as an example
 *
 * Given state running
 *    running
 * when getting$B running.fast.by_bike
 *     running.fast
 * and
 *     running.fast.by_bike
 * will be created.
 *
 * @param  {[type]} label [description]
 * @return {[type]}       [description]
 */
Enumeration.prototype.get$B = function(label) {
    label = new String(label)
    if ( /\d+(?:\.\d+)*/.test(label) )
        if (this.ia.keys().include$U(label))
            return this.get(this.full_name(label))
        else{
            alert("label: " + label)
            return null
        }

    var position = null
    this.each(function (key, value) {
        if (key == label)
            position = value
    })
    return position
}

/**
 * @method add
 * Enlarges the enumeration set by adding new constants at a given position.
 *
 * ### Example
 *
 * Given:
 *
 *      var a = new Enumeration("spades", "hearts", [ "red", "black"], "diamonds", "clovers")
 *
 * will result in
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
 * and,
 *      a.add(["white", "yellow"], "hearts.red")
 * or,
 *      a.add(["white", "yellow"], "1.1")
 *
 * will end up in,
 *
 *     {
 *       "spades": 0,
 *       "hearts": { 1,
 *                   "red": { 1,
 *                            "white": 1,
 *                            "yellow": 2
 *                          },
 *                   "black": 2
 *                  },
 *        "diamonds": 2,
 *        "clovers": 3
 *        }
 *
 * @param {Array | String} constants List of new constant values.
 * @param {String} [place]    Name or value of the position to insert the constants.
 *                         in cannot be empty when the last high level position
 *                         , clovers in the example above, is undefined.
 */
Enumeration.prototype.add = function(constants, place){
    if (place)
        place = this.get(place)
    this.ia.infiltrate(constants, place)
    Enumeration.prototype.transpose.call(this)
}

/**
 * @method  add$B
 * Same as #add, but creating intermediate states when needed. See #get$B for
 * further reference.
 *
 * @param  {[type]} constants [description]
 * @param  {[type]} place     [description]
 * @return {[type]}           [description]
 */
Enumeration.prototype.add$B = function(constants, place){
    if (place)
        place = this.get$B(place)
    this.ia.infiltrate(constants, place)
    Enumeration.prototype.transpose.call(this)
    return place || this
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
    },
    full_name: {
        enumerable: false,
        configurable: false,
        writable: false
    },
    get: {
        enumerable: false,
        configurable: false,
        writable: false
    },
    add: {
        enumerable: false,
        configurable: false,
        writable: false
    }
})


//todo: Needed include$U. Depends on making module Enumerable and mixing.
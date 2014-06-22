/**
 * @class  Kernel.foundation.enumerable.InterleavedArray
 * Creates an array with subindexes as in [semantic version controlling](http://semver.org/).
 * It is the complementary class of Enumeration {@link Kernel.Foundation.Enumerable.Enumeration}
 *
 * ### Example
 *
 *     new Interleaved Array([2, 1, [2, [3, [5,7], 5]], 7, 10, [4, [5,7]], 5])
 *     //=> {
 *     //=>   0: 2
 *     //=>   1: 1
 *     //=>   2: 2
 *     //=>   2.1: 3
 *     //=>   2.2: 5,7
 *     //=>   2.3: 5
 *     //=>   3: 7
 *     //=>   4: 10
 *     //=>   5: 4
 *     //=>   5.1: 5
 *     //=>   5.2: 7
 *     //=>   6: 5
 *     //=> }
 *
 */


InterleavedArray.prototype = new Array
InterleavedArray.prototype.constructor = InterleavedArray

/**
 * @method constructor
 * Creates a new InterleavedArray
 *
 * ### Example
 *
 *     new InterleavedArray(2)
 *     //=> { 0: 2}
 *
 *     new InterleavedArray([2])
 *     //=> {0: undefined, 0.1: 2}
 *
 *     new InterleavedArray(2,3)
 *     //=> {0: 2, 1:3 }
 *
 *     new InterleavedArray([2,3], [5,7])
 *     //=> {0: undefined, 0.1: 2, 0.2: 3, 1:undefined, 1.1: 5, 1.2: 7}
 *
 *     new InterleavedArray(1, [2,3], [5,7])
 *     //=> {0: 1, 0.1: 2, 0.2: 3, 1:undefined, 1.1: 5, 1.2: 7}
 *
 *     new InterleavedArray([2,3])
 *     //=> {0: undefined, 0.1: 2, 0.2: 3}
 *
 *     new InterleavedArray([2,3], 3, [5,7])
 *     //=> {0: undefined, 0.1: 2, 0.2: 3, 1:3, 1.1: 5, 1.2: 7}
 *
 *     new InterleavedArray([2], 3)
 *     //=> { 0: undefined, 0.1: 2, 1: 3}
 *
 *     new InterleavedArray([[2], 3], 7)
 *     //=> { 0: undefined, 0.1: undefined, 0.1.1: 2, 0.2: 3, 1: 7}
 *
 *     new InterleavedArray(2, [3, 5])
 *     //=> {0: 2, 0.1: 3, 0.2: 5}
 *
 *     new InterleavedArray( [2, [3, 5]] )
 *     //=> {0: 2, 0.1: 3, 0.2: 5}
 *
 *     new InterleavedArray( [2, [3, 5]], 9 )
 *     //=> {0: 2, 0.1: 3, 0.2: 5, 1: 9}
 *
 *     new InterleavedArray( [2, [3, 5], 8], 9 )
 *     //=> {0: undefined, 0.1: 2, 0.1.1: 3, 0.1.2: 5, 0.2: 8, 1: 9}
 *
 *     new Interleaved Array( 2, 1, [2, [3, [5,7], 5]], 7, 10, [4, [5,7]], 5)
 *
 * @param {Object | Array} elements Variadic list or elements.
 */
function InterleavedArray(elements) {

    Object.defineProperty(this, 'subarray', {
        value: [],
        enumerable: false,
        writable: true
    })

    var last_was_number = 0
    for (var el = 0; el < arguments.length; el++) {
        if (!(arguments[el] instanceof Array)) {
            this.push(arguments[el])
            last_was_number = 1
        } else {
            this.subarray[this.length - last_was_number] = new(ApplyProxyConstructor(InterleavedArray, arguments[el]))
            for (var i = 0; i < this.subarray.length; i++)
                this[(this.length - last_was_number) + "." + (i + 1)] = this.subarray[i]
            last_was_number = 0
        }
    }
}


/**
 * @method infiltrate
 * @chainable
 * Sets an element or an array as a subelement.
 *
 * ### Example
 *
 *     var a = new InterleavedArray([4, [3, [2, 5]], 2, 1])
 *     a.infiltrate(1, [2, [3, [5, 7]]])
 *     //=> {
 *     //=>    0: 4,
 *     //=>    1: 3,
 *     //=>    1.1: 2,
 *     //=>    1.2: 5,
 *     //=>    1.3: 2,
 *     //=>    1.3.1: 3,
 *     //=>    1.3.1.1: 5,
 *     //=>    1.3.1.2: 7,
 *     //=>    2: 2,
 *     //=>    3: 1
 *     //=> }
 *
 *    a.infiltrate("1.2", [2, [3, [5, 7]]])
 *
 * @param  {Number} position Major number for all subelements.
 * @param  {Object | InterleavedArray} elements  Variadic elements to insert.
 * @return {InterleavedArray}          this
 */
InterleavedArray.prototype.infiltrate = function(position, element) {

    for (var i = 0; i < element.length; i++)
        if (!(element[i] instanceof Array))
            this[position + "." + (this.subarray.length + 1)] = element[i]
        else
            this.infiltrate(
                position + "." + (this.subarray.length + 1),
                new(ApplyProxyConstructor(InterleavedArray, element[i]))
            )
    return this
}

/**
 * @method to_a
 * Converts to array
 *
 * ### Example
 *
 *     var a = new InterleavedArray(2, [3, 5])
 *     //=> {0: 2, 0.1: 3, 0.2: 5}
 *     a.to_a()
 *     //=> [2, [3, 5]]
 *     a.to_a(0)
 *     //=> [3, 5]
 *
 * @param  {[type]} index [description]
 * @return {[type]}       [description]
 */
InterleavedArray.prototype.to_a = function(index) {

}

InterleavedArray.prototype.size = function() {
    var size = 0
    for (var i in this)
        size++
    return size
}

InterleavedArray.prototype.inspect = function() {
    var txt = "{\n"
    //for(var i in this)
    for (var i = 0; i < this.size(); i++)
        if (i.toString() in this) {
            txt += "\n\t" + i + ": " + this[i]
            for (var x = 1; eval(i + "." + x + " in this"); x++)
                txt += "\n\t" + i + "." + x + ": " + this[eval(i + "." + x)]
        }
    return txt + "\n}"
}

Object.defineProperties(InterleavedArray.prototype, {
    "inspect": {
        value: InterleavedArray.prototype["inspect"],
        enumerable: false
    },
    "constructor": {
        value: InterleavedArray.prototype["constructor"],
        enumerable: false
    }
})

var b = new InterleavedArray([2, 1, [2, [3, 5]], 7, 10, [4, [5, 7]], 5])
b.inspect()
/**
 * @class Kernel.Foundation.Architecture.ProxyConstructor
 * Proxy class to apply all the given arguments of a constructor to another
 *
 * From [mdn new operator][https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new] notice:
 *
 * The object returned by the constructor function becomes
 * the result of the whole new expression. If the constructor
 * function doesn't explicitly return an object, the object
 * created in step 1 is used instead. (Normally constructors don't
 * return a value, but they can choose to do so if they want to override the
 * normal object creation process.)
 *
 * ## Example
 *
 *    var b = new (ProxyConstructor(Enumeration, "spades", "hearts"))
 *    // => {spades:0, hearts:1}
 *
 */

/**
 * @method constructor
 * Use rest_of_arguments as comma separated list.
 *
 * @param {Function} Constructor Constructor to delegate new call.
 */
function ProxyConstructor(Constructor, rest_of_arguments) {
    var args = Array.prototype.slice.call(arguments, 1)
    return function() {
            var $$F$$ = function() {}
            $$F$$.prototype = Constructor.prototype
            var obj = new $$F$$
            var yield_back = Constructor.apply(obj, args)
            return Object(yield_back) == yield_back ? yield_back : obj
        }
}
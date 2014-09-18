/**
 * @class Kernel.Foundation.Architecture.ApplyProxyConstructor
 * Class Factory that proxies its call to Constructor.
 * see {@link Kernel.Foundation.Architecture.ProxyConstructor} for details.
 *
 * @constructor
 * Creates an ApplyProxyConstructor
 *
 * ### Example
 *
 *     var a = new (ApplyProxyConstructor(Enumeration, ["spades", "clovers"]))
 *
 * @param {Function} Constructor The constructor class
 * @param {Array} arguments_array Array of arguments.
 */
function ApplyProxyConstructor(Constructor, arguments_array) {
    /* Convert to true Array, just in case is an Array like. */
    arguments_array = Array.prototype.slice.call(arguments_array, 0)
    arguments_array.unshift(Constructor)
    return ProxyConstructor.apply(this, arguments_array)
}
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
    arguments_array.unshift(Constructor)
    return ProxyConstructor.apply(this, arguments)
}
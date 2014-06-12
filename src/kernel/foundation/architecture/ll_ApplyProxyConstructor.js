/**
 * @class Kernel.Facilities.Class.ApplyProxyConstructor
 * Class Factory that proxies its call to Constructor.
 * see {@link Kernel.Facilities.Class.ProxyConstructor} for details.
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
    var args = arguments_array
    return ProxyConstructor.apply(this, arguments)
}


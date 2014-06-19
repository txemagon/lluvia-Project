/**
 * @class Kernel.Foundation.Enumerable.AutoHash
 * @extends Kernel.Foundation.Enumerable.Hash
 * A Hash with a lazy execution initializer.
 *
 * ### Example
 *
 *     var a = new AutoHash(function(obj, key) { return [] })
 *     a.new_attr().push(2) // new_attr is undefined, so the initializer is executed.
 *     a.new_attr()         // new_attr is now a getter returning the new array
 *     a.new_attr().push(3) // The getter returns the existing array
 *     a.new_attr()
 *     // => [2,3]
 *
 * Getter and setters areused as an overloaded method call.
 *
 * ### Example
 *
 *     var a = new AutoHash(function(obj, key) { return [] })
 *     a.name("Me") // sets a.name = "Me"
 *     a.name()
 *     // => "Me"
 */

AutoHash.prototype = new Hash
AutoHash.prototype.constructor = AutoHash
/**
 * @method constructor
 *
 * @param {function(Object, String)} block Initializer function
 *                                   for non existing attributes. Object[String] will take
 *                                   the return value.
 */
function AutoHash(intial_data, block) {

    if (!block)
        if (initial_data && typeof(initial_data) === "function")
            block = initial_data
        else
            block = function() {};

    var that = this
    this.data = new HashData()

    if (initial_data && typeof(initial_data) !== "function")
        this.data.merge$B(initial_data)

    this.__noSuchMethod__ = function(id, args) {
        if (!(id in that.data))
            that.data[id] = (block)(that, id)
        if (typeof(that[id] !== "function"))
            that[id] = (function(value) {
                if (!value)
                    return this[id]
                this.value = value
            })()

        return that.data[id]
    }
}

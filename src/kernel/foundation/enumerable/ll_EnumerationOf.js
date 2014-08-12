/**
 * @class Kernel.Foundation.Enumerable.EnumerationOf
 * @extends Kernel.Foundation.Enumerable.Enumeration
 * An Enumeration made of a subclass of VersionNumber
 *
 * Imagine a normal enumeration:
 *
 *     var a = new Enumeration("spades", "hearts", [ "red", "black"], "diamonds", "clovers")
 *
 * leaving the following memory imprint:
 *
 *              {
 *       "spades": 0,
 *       "hearts": { 1,
 *                   "red": 1.1,
 *                   "black": 1.2
 *                  },
 *        "diamonds": 2,
 *        "clovers": 3
 *        }
 *
 * where all values are true VersionNumber instances.
 *
 * EnumerationOf provides us with a tool to work with VersionNumber subclasses.
 */
EnumerationOf.prototype = new Enumeration
Enumeration.prototype.constructor = EnumerationOf
EnumerationOf.prototype.super = Enumeration


/**
 * @method constructor
 *
 * ### Example
 *
 *  Let State inherit from VersionNumber
 *
 *     var e = new EnumerationOf(State, ["running", "walking", ["slow", "fast"]])
 *
 * will execute at a certain point:
 *
 *     obj.walking.slow = new State("1.1")
 *
 * @param {Class} type VersionNumber derivate to use for value construction.
 * @param {Object...} [rest] Arguments to be passed to Enumeration constructor.
 */
function EnumerationOf(type) {
    var args = Array.prototype.slice.call(arguments, 1)
    if (args[0] instanceof Enumeration)
        args[0] = [args[0]] // For copy constructor purposes.
    Enumeration.apply(this, args[0])
    this.transpose(type)
}
/**
 * @class kernel.foundation.enumerable.ArrayClass
 * Creates an Array-like object that can modify its length property
 *
 */
ArrayClass.prototype = Array
ArrayClass.prototype.constructor = ArrayClass

function ArrayClass() {
    //todo: Make length overridable but preserve Array#length
    this.length = 0
}
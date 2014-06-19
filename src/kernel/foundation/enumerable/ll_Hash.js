/**
 * @class Kernel.Foundation.Enumerable.Hash
 * Creates an associative array.
 */

/**
 * @method  constructor
 *
 * ### Example
 *
 *     var a = new Hash({name: "John"}, function(){} )
 *
 * @param {Object} initial_data Initial values for the Hash.
 */
function Hash(initial_data) {
    if (initial_data)
        this.merge$B(initial_data)

}

/**
 * @method values
 * Returns an array with the values of all the reachable keys of this object.
 *
 * @return {Array} Object values list.
 */
Hash.prototype.values = function() {
    var that = this
    return this.keys().collect(function(i) {
        return that[i]
    })
}
Hash.prototype.stop_enumerating("values")

/**
 * @method self_values
 * Returns a list with values set directly on this object keys.
 *
 * @return {Array} List of non inherited values.
 */
Hash.prototype.self_values = function() {
    var that = this
    return this.self_keys().collect(function(i) {
        return that[i]
    })
}
Hash.prototype.stop_enumerating("self_values")

/**
 * @method  own_values.
 * Alias of Hash#self_values.
 */
Hash.prototype.alias("own_values", "self_values")


/**
 * @method each
 * Calls the block with every key/value pair. Notice that those
 * key reached via the prototype chain are explicitly excluded.
 */
Hash.prototype.each = function() {
    for (var i in this)
        if (this.hasOwnProperty(i))
            Hash.prototype.each.yield(i, this[i])
}
Hash.prototype.stop_enumerating("each")

/**
 * @method collect
 * Collects into an Array all the values returned by a block.
 *
 * ### Example
 *     var a = new Hash({"ramon", "pepe"})
 *     a.collect(function(obj) {
 *       return 1
 *     })
 *     // => [1, 1]
 *
 */
Hash.prototype.collect = function() {
    var result = []
    for (var i in this)
        result.push(Hash.prototype.each.yield(i, this[i]))
    return result
}
Hash.prototype.stop_enumerating("collect")

/**
 * @method size
 * Returns the numbers of selk keys
 *
 * @return {Number}
 */
Hash.prototype.size = function() {
    return this.self_keys().count()
}
Hash.prototype.stop_enumerating("size")

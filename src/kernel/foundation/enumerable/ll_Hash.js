/**
 * @class Hash
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

Hash.prototype.values = function() {
    var that = this
    return this.keys().collect(function(i) {
        return that[i]
    })
}

Hash.prototype.self_values = function() {
    var that = this
    return this.self_keys().collect(function(i) {
        return that[i]
    })
}

Hash.prototype.alias("own_values", "self_values")


// Notice: Hash doesn't support inherited properties
Hash.prototype.each = function() {
    for (var i in this)
        if (this.hasOwnProperty(i))
            Hash.prototype.each.yield(i, this[i])
}

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

/**
 * @method size
 * Returns the numbers of selk keys
 *
 * @return {Number}
 */
Hash.prototype.size = function() {
    return this.self_keys().count()
}
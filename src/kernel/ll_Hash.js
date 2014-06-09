Hash.prototype = new BasicObject
Hash.prototype.constructor = Hash

function Hash(initial_data){
	if (initial_data)
		this.merge$B(initial_data)
}
Hash.bang_methods = ["merge", "soft_merge", "override"]

Hash.prototype.self_keys = function(re){
	var the_keys = []
	for (var i in this)
		if (!re || re.test(i))
			if (i !== "keys" && this.hasOwnProperty(i) )
				the_keys.push(i)
	return the_keys
}


Hash.prototype.alias("own_keys", "self_keys")

Hash.prototype.values = function(){
	var that = this
	return this.keys().collect( function(i){ return that[i] } )
}

Hash.prototype.self_values = function(){
	var that = this
	return this.self_keys().collect( function(i){ return that[i] } )
}

Hash.prototype.alias("own_values", "self_values")

Hash.prototype.merge = function(source){
	if (!source.respond_to$U("self_keys"))
		throw "Invalid source. Impossible to merge."
	var that = this
	source.self_keys().each(function(key){
		that[key] = source[key]
	})
	return this
}

Hash.prototype.soft_merge = function(source){
	if (!source.respond_to$U("self_keys"))
		throw "Invalid source. Impossible to merge."
	var that = this
	source.self_keys().each(function(key){
		that[key] = that[key] || source[key]
	})
	return this
}

Hash.prototype.override = function(source){
	if (!source.respond_to$U("self_keys"))
		throw "Invalid source. Impossible to merge."
	var that = this
	source.self_keys().each(function(key){
		if (that[key])
			that[key] = source[key]
	})
	return this
}

// Notice: Hash doesn't support inherited properties
Hash.prototype.each = function() {
	for (var i in this)
		if ( this.hasOwnProperty(i) )
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
			result.push( Hash.prototype.each.yield(i, this[i]) )
	return result
}

/**
 * @method size
 * Returns the numbers of selk keys
 *
 * @return {Number}
 */
Hash.prototype.size = function(){
   return this.self_keys().count()
}

Hash.reflect(Hash.bang_methods)

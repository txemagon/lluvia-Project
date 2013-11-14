Hash.prototype = new BasicObject
Hash.prototype.constructor = Hash

function Hash(){
	
}

Hash.bang_methods = ["merge", "soft_merge"]

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

Hash.reflect(Hash.bang_methods)
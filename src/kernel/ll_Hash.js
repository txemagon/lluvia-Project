Hash.prototype = new BasicObject
Hash.prototype.constructor = Hash

function Hash(){
	
}

Hash.prototype.self_keys = function(re){
	var the_keys = []
	for (var i in this)
		if (!re || re.test(i))
			if (i !== "keys" && this.hasOwnProperty(i) )
				the_keys.push(i)
	return the_keys
}


Hash.prototype.own_keys = function(re){
  return this.self_keys(re)
}

Hash.prototype.values = function(){
	var that = this
	return this.keys().collect( function(i){ return that[i] } )
}

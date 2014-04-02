/*
 * When module will be defined, module enumerable shall replace method each.
 */

Array.prototype.each = function(){
	for (var i = 0; i < this.length; i++) 
		Array.prototype.each.yield(this[i])	
}

Array.prototype.each_reverse = function(){
	var l = this.length - 1
	for (var i = l; i >= 0; i--) 
		Array.prototype.each.yield(this[i])	
}

Array.prototype.indexOf = function(searchElement, fromIndex){
	var i
	for (i = fromIndex || 0; i <this.length && this[i] !== searchElement; i++);
	i = i>=this.length? null: i
	return i
}

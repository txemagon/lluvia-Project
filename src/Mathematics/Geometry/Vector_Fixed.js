/**
 * @classDescription Creates a fixed vector.
 * 
 * @param  {foot} 
 * @param  {free_vector} 	
 * @return {Vector} 	
 * @constructor 
 */

FixedVector.prototype = new Vector
FixedVector.prototype.constructor = FixedVector
FixedVector.super = Vector

	
function FixedVector(foot, free_vector){
	this.foot = foot || new Vector(0, 0)
	this.free_vector = free_vector || new Vector(0, 0)

	this.fixed_vector = this.foot.add(this.free_vector)

	Vector.call(this, this.foot)
	Vector.call(this, this.free_vector)

    Object.defineProperty(this, "_head", {
    	value: this.fixed_vector,
	    enumerable: false
    })

    // Object.defineProperty(this, "head", {
    // 	get: function(){ return this._head }
    // })
}	

/**
 * 
 * @return {[type]} [description]
 */

FixedVector.prototype.get_free_vector = function() {
	return this.free_vector
}

    // Object.defineProperty(this, "path", {
    //     get: function(){ return this._path },
    //     set: function(path){
    //         this._path = path 
    //         if (this._path[this._path.length - 1] != "/")
    //             this._path += "/"
    //         this._path = this._path.replace(/\/+/g, "/")
    //     }
    // })

    // Object.defineProperty(this, "filepath", {
    //      value: filepath,
    //      enumerable: false
    // })
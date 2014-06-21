InterleavedArray.prototype = new Array
InterleavedArray.prototype.constructor = InterleavedArray

function InterleavedArray(array){
    
     for(var i=0; i<array.length; i++)
        if (array[i] instanceof Array) {
    
           this.subpush( i, array[i][0] )
           
           if(array[i][1] instanceof Array)
               for(var h=0; h<array[i][1].length; h++){
                   /*this[i + "." + ( h + 1 ) ] = array[i][1][h]*/
                   var index = i + "." + (h + 1)
                   this.subpush(index, array[i][1][h])
                   
               }
     
        } else 
            this.subpush( i, array[i] )
}
InterleavedArray.prototype.size = function() {
    var size = 0
    for (var i in this)
        size ++
    return size
}

InterleavedArray.prototype.inspect = function() {
    var txt = "{\n"
    //for(var i in this)
    for(var i = 0; i<this.size(); i++)
        if(i.toString() in this){
          txt += "\n\t" + i + ": " + this[i]
          for (var x = 1; eval(i + "." + x +  " in this"); x++)
            txt += "\n\t" + i + "." + x + ": " + this[eval(i + "." + x)]
            }
    return txt + "\n}"
}

/**
Como en array
ia.subpush("5", 3, 7)
ia.subpush([3,7])
*/

InterleavedArray.prototype.subpush = function(index){
    if(typeof(index) === "number")
	index = index.toString()
    for(var i=1; i<arguments.length; i++)
	if(index in this){
	    var free = false
		for(var n=1; free != true; n++)
		    if(!(index + "."+ n in this)){
			free = true
			    this[index + "." + n] = arguments[i]
		    }
	}
	else
	    this[index] = arguments[i]
}

Object.defineProperties(InterleavedArray.prototype, { 
                        "inspect": { value: InterleavedArray.prototype["inspect"], enumerable: false},
                        "constructor": { value: InterleavedArray.prototype["constructor"], enumerable: false}})

var b = new InterleavedArray([2, 1, [2, [3, 5]], 7, 10, [4, [5,7]], 5])
b.inspect()

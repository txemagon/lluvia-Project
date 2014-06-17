InterleavedArray.prototype = new Array
InterleavedArray.prototype.constructor = InterleavedArray

function InterleavedArray(array){
    
     for(var i=0; i<array.length; i++)
        if (array[i] instanceof Array) {
    
           this.push( array[i][0] )
           if(array[i][1] instanceof Array)
               for(var h=0; h<array[i][1].length; h++)
                   this[i + "." + ( h + 1 ) ] = array[i][1][h]
                   
        } else 
            this.push( array[i] )
            
}

InterleavedArray.prototype.inspect = function() {
    var txt = "{\n"
    for(var i in this)
        txt += "\n\t" + i + ": " + this[i]
           
    return txt + "\n}"
}

/**
Como en array
ia.subpush(position, element1, element2)
ia.subpush("5", 3, 7)
ia.subpush([3,7])
*/
InterleavedArray.prototype.subpush = function(index, elements) {
    
    /*var number_of_elements = elements.length
    while(this[index] == "number" || this[index] == "array"){
       index++
       if(this[index] != "number" || this[index] != "array")  
          this[index].push = elements
    }
      */  
       
}

Object.defineProperties(InterleavedArray.prototype, { 
                        "inspect": { value: InterleavedArray.prototype["inspect"], enumerable: false},
                        "constructor": { value: InterleavedArray.prototype["constructor"], enumerable: false}})

var b = new InterleavedArray([2, 1, [2, [3, 5]], 7, 10, [4, [5,7]], 5])
b.inspect()

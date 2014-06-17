InterleavedArray.prototype = new Array
InterleavedArray.prototype.constructor = InterleavedArray

function InterleavedArray(array){
    this.array = array
}

InterleavedArray.prototype.alerts = function() {
    for(var i in this.array)
       if(typeof(this.array[i]) === "object"){
           var aux = new InterleavedArray(this.array[i])
           aux.alerts()
       }
       else
           alert(this.array[i])    
}

var b = new InterleavedArray([1, [2, [3, 5]], 7])
b.alerts()

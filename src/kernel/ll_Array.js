/**
 * @class Array
 * When module will be defined, module enumerable shall replace method each.
 */
/**
 * @method  each 
 * Executes a function parsed as parameter by each item of the array parsing as parameter the array item
 * @param  {function}  Need to parse a function that recieves the items of the array one by one
 * ###Example
 *     var names = ["Peter","John","David"]
 *     names.each(function (arrayItem){ alert(arrayItem)})
 * These code show an alert for each array item, with the content of array item 
 */
Array.prototype.each = function(){
  for (var i = 0; i < this.length; i++) 
    Array.prototype.each.yield(this[i]) 
}
/**
 * @method  each_index  
 * Executes a function parsed as parameter by each item of the array parsing as parameter the array index
 * @param  {function}  Need to parse a function that recieves the items of the array one by one
 * ###Example
 *     var names = ["Peter","John","David"]
 *     names.each(function (arrayIndex){ alert(arrayIndex)})
 * These code show an alert for each array item, with the array index number
 */
Array.prototype.each_index = function(){
  for (var i = 0; i < this.length; i++) 
    Array.prototype.each_index.yield(i) 
}
/**
 * @method  each_with_index 
 * Executes a function parsed as parameter by each item of the array parsing as parameter the array index and the array block of the index
 * @param  {function}  Need to parse a function that recieves the items of the array one by one
 * ###Example
 *     var names = ["Peter","John","David"]
 *     names.each(function (arrayItem, arrayIndex){ alert(arrayItem + " " + arrayIndex)})
 * These code show an alert for each array item, with the array index number and the content of these index
 */
Array.prototype.each_with_index = function(){
  for (var i = 0; i < this.length; i++) 
    Array.prototype.each_with_index.yield(this[i], i) 
}
/**
 * @return  {Integer} Sum of all array index
 * @method  count  
 * The method count all array elements 
 * ###Example
 *     var names = ["Peter","John","David"]
 *     var namesCount = names.count()
 */
Array.prototype.count = function(obj){
  if (typeof(obj) === "undefined" )
    return this.length

  var count = 0
  for (var i=0; i<this.length; i++) 
     if ( (typeof(obj) === "function" ? Array.prototype.count.yield(this[i]) : this[i] == obj) )
       count++

  return count
}



Array.prototype.each_reverse = function(){// Problemas en el test. Muestra failed pero valor esperado == valor recibido.
	var l = this.length - 1
	for (var i = l; i >= 0; i--) 
		Array.prototype.each.yield(this[i])	
}

Array.prototype.collect = function(){
        var collectable = []
	for (var i = 0; i < this.length; i++) 
		collectable.push(Array.prototype.collect.yield(this[i]))
        return collectable
}

Array.prototype.select_if = function(){
       var collectable = []
	for (var i = 0; i < this.length; i++) 
           if ( Array.prototype.select_if.yield(this[i]) ) 
		collectable.push(this[i])
        return collectable
}


Array.prototype.indexOf = function(searchElement, fromIndex){
	var i
	for (i = fromIndex || 0; i <this.length && this[i] !== searchElement; i++);
	i = i>=this.length? null: i
	return i
}

Array.prototype.clone = function(){
   var ary = []
   for (var i=0; i<this.length; i++)
      ary[i] = this[i]
   return ary
}

Array.prototype.clone$B = function(model){
   this.clear()
   for(var i=0; i<model.length; i++)
      this[i] = model[i]
}

Array.prototype.clear = function(){
 while( this.length > 0)
       this.pop()
}
 
Array.prototype.equals$U = function(other){
	var same = true
	 if(this.length != other.length)
	  return  false
             for (var i=0; i<this.length; i++)
                if (this[i] != other[i])
                  same = false
              return same
}

Array.prototype.uniq = function(){
  var uniq = []
  var comparable = []
  var block = arguments.length && typeof(arguments[0]) == "function"
  var element = null

  for (var i=0; i<this.length; i++){
      element = block ? arguments[0](this[i]) : this[i]
     if (!includes(element, comparable))
        uniq.push(this[i])
	comparable.push(element)
  }
  return uniq
}

Array.prototype.uniq$B = function(){
   var uniq = this.uniq()
    if (uniq.equals$U(this))
       return null
    this.clear()
    for(var i=0; i<uniq.length; i++)
       this[i] = uniq[i]
    return this
 }

Array.prototype.first = function(){
   if (this.length == 0)
      return null
   if (arguments.length == 0)
      return this[0]
   var ary = []
   for (var i=0; i < arguments[0] && i < this.length ; i++)
      ary[i] = this[i]
   return ary
}

Array.prototype.last = function(){
   if (this.length == 0)
      return null
   if (arguments.length == 0)
      return this[this.length -1]
   var ary = []

   for (var i= 0; i < Math.min(arguments[0], this.length); i++)
      ary[i] = this[ this.length - Math.min(arguments[0], this.length) +i ]
   return ary
}

Array.prototype.erase$B = function(){ // El assert muestra un test fallido sin motivo alguno (valor esperado == valor recibido). Falla una vez se pone la condición de parámetro inexistente en el array.
  if(arguments.length > 1)
     return null
     //throw ("Wrong number of parameters")
  var find = false
  for(var i = this.length-1; i>0; i--)
    if(this[i] == arguments[0]){
      this.splice(i,1)
      find = true;
    }
  return find? this: null
}  

Array.prototype.erase_at$B = function(){//El assert muestra un test fallido sin motivo alguno (valor esperado == valor recibido).
  if(arguments.length > 1)
    return null
    //throw ("Wrong number of parameters")
  if(arguments[0] > this.length)
    return null
  this.splice(arguments[0],1)
  return this
}

/**
 * 
 * @memberOf 	{Array}
 * @method 	erase_if    
 * @param       (function (object, object){ |condition| )
 *
 * Coded by: David
 *
 * Comments: Deletes every element of self for which block evaluates to true.
 */
Array.prototype.erase_if = function(){
    /**
     *	VALID INPUT!
     *
     *  PARAMETER TYPES
     *  (function (object, object){ |condition| } )
     *
     *  DIMENSIONS
     *  Only one function
     *
     */

     if(arguments.length > 1)
       //throw("Wrong number of arguments")
       return null
     
     var ary = []
     for(var i = 0; i < this.length; i++)
       if ( !Array.prototype.erase_if.yield(this[i]) )
         ary.push(this[i])
     return ary.compact()
}


Array.prototype.replace = function(){
  if(arguments.length == 0)
    return null
  if(arguments.length > 1)
    return null
    //throw("wrong number of arguments")
  if (!(arguments[0] instanceof Array))
     return null
    //throw("Invalid parameter type: Array expected.")  
  this.clear()
  for(var i = 0; i < arguments[0].length; i++)
     this[i] = arguments[0][i]
  return this
}

Array.prototype.delete$B = function(obj){
  var position = this.indexOf(obj)
  if ( position == -1)
    return Array.prototype.delete$B.yield()
  
  return this.splice(position, 1)[0]
}

Array.prototype.include$U = function(){
  if(arguments.length != 1)
    //throw "wrong number of arguments (it needs one arguments)"
    return null
  var find = false
  for(var i = 0; i < this.length; i++)
    if( arguments[0] == this[i])
      find = true
  return find
}

Array.prototype.assoc = function(){
  if(arguments.length > 1)
    //throw "wrong number of arguments"
    return null
  for(var i = 0; i < this.length;i++)
    if(arguments[0] == this[i][0])
      return this[i]
  return null
}

Array.prototype.at = function(){
   if(arguments.length > 1)
     //throw "wrong number of arguments"
   if(arguments[0] > this.length)
     return null
   if(isNaN(arguments[0]))
     //throw "wrong type paremeter"Converts any arguments to arrays, then merges elements of self with corresponding elements from each argument. 
     return null    
   if(arguments[0] < 0 && (this.length + arguments[0]) < 0)       
       return null
   return arguments[0]>=0? this[arguments[0]] : this[this.length+(arguments[0])]
}

Array.prototype.compact = function(){
  var ary = []
  for(var i = 0; i < this.length; i++)
    if(this[i] != null)
      ary.push(this[i])
  return ary      
}


Array.prototype.merge = function(ary2){
  var ary = []
  for(var i = 0; i < this.length; i++)
      ary.push(this[i])
  for(var i = 0; i < ary2.length; i++)
      ary.push(ary2[i])
  return ary      
}

Array.prototype.drop = function(){
  if(arguments.length > 1 || arguments.length < 1)
    //throw "Wrong number of arguments"
    return null
  if(isNaN(arguments[0]))
    //throw "Invalid type argument"
    return null
  var ary = []
  if(arguments[0] > this.length-1)
     return ary
  ary = this.clone()     
  for(var i = 0; i < arguments[0]; i++)
     ary.splice(0,1)
  return ary
}

Array.prototype.drop_while = function(){
    /**
     *	VALID INPUT!
     *
     *  PARAMETER TYPES
     *  (function (object, object){ |condition| } )
     *
     *  DIMENSIONS
     *  Only one function
     *
     */

  if(arguments.length > 1)
    //throw("Wrong number of parameters")
    return null  

  /*for(var i = 0; i < this.length; i++)
    if(this[i] instanceof Array)
      //throw("Invalid this. This contains sub-arrays")
      return null*/

  var ary = []
  for(var i = 0; i < this.length; i++)
    ary.push(Array.prototype.drop_while.yield(i,this[i])) 
  
  return ary.compact()
}
/**
 * 
 * @memberOf 	{Array}
 * @method 	drop_while       
 * @param       (function (object, object){ |condition| ).
 *
 * Coded by: David
 *
 * Comments: Drops elements up to, but not including, the first element for which the block returns nil or false and returns an array containing the remaining elements. 
 */

Array.prototype.flatten = function(level){
  if(level == 0)
    return this
  level = level || 1000
  return unpack(this, [], level)
}

Array.prototype.index = function(){
  for(var i = 0; i < this.length; i++)
    if(this[i] == arguments[0])
      return i
  return null
}

Array.prototype.product = function(){
  var ary = []
  
  if(!(arguments[0])){
    for(var i = 0; i < this.length; i++)
      ary[i] = [this[i]]    
    return ary
  }
  
  if(arguments[0].length < 1)
    return ary

  if(arguments.length >= 1){     
    if(arguments.length == 1)   
      return aproduct(this,arguments[0])///////////////TO DO
  }    
}

Array.prototype.rassoc = function(){
  if(arguments.length > 1 || arguments.length < 1)
    //throw ("wrong number of arguments")
    return null
  var existsArray = false
  for(var i = 0; i < this.length; i++)
    if(this[i] instanceof Array)
      if(this[i].length == 2)
        existingArray = true

  if(existingArray){    
    for(var i = 0; i < this.length; i++)
      if(this[i] instanceof Array)
        if(this[i][1] == arguments[0])
          return this[i]
  }
  return null
}

Array.prototype.rindex = function(){
  if(arguments.length != 1)
    //throw ("Wrong number of arguments")
    return null
  
  for(var i = this.length-1; i >= 0; i--)
    if(this[i] == arguments[0])
      return i
  return null
}

Array.prototype.rotate = function(obj){
  if (typeof(obj) === "undefined"){
    var ary = this.clone()
    ary.push(ary.shift())
    return ary
  }
  if(arguments.length > 1)
    //throw ("Wrong number of arguments")
    return null  
  var ary = this.clone()  
  if(arguments){ 
    if(isNaN(arguments[0]))
      //throw ("Wrong type argument")
      return null 
      
    if(arguments[0] < 0){
      if(Math.abs(arguments[0]) > this.length-1)
        //throw("Invalid index")
        return null
      return _rotate(Math.abs(arguments[0]), this, ary)    
    }
    if(arguments[0] > this.length-1)
      //throw("Invalid index")
      return null
    for(var i = 0; i < ary.length; i++){
      ary[i] = this[arguments[0]]      
      arguments[0]++
      if(arguments[0] == this.length)
         arguments[0] = 0
    }
    return ary
  }  
  return _rotate(this.length-1, this, ary)
}

Array.prototype.take = function(){
  if(!(arguments[0]) || arguments.length > 1)
    //throw ("Wrong number of parameters")
    return null
    
  if(isNaN(arguments[0]))
    //throw ("Wrong type of parameters")          
    return null
    
  var ary = []
  if(arguments[0] > this.length)
    arguments[0] = this.length
  for(var i = 0; i < arguments[0]; i++)
    ary[i] = this[i]
  return ary
}

Array.prototype.take_while = function(){
  var ary = []
  for(var i = 0; i < this.length; i++)
    ary.push( Array.prototype.take_while.yield(this[i]))  
  return ary.compact()
}



/**
 * This function shuffles an array
 *
 * @memberOf     {Array}
 * @return      (Array)
 * 
 * Coded by: Guille
 *
 * Comments: This method convert any arguments to arrays, then merges elements of self with corresponding elements from each argument. 
 */
Array.prototype.shuffle = function()
{
    if(arguments.length > 0)
      //throw("Wrong number of arguments")
      return null

    randomizedArray = [];
    usedNumbers = [];
   
    while(randomizedArray.length < this.length)
    {
        finded = false;
        var number = Math.round(getRandomArbitary(0,this.length));
        for (var i=0; i < usedNumbers.length; i++)         
            if (number == usedNumbers[i])            
                finded = true;                    
        if(!finded && number < this.length)
        {
            usedNumbers.push(number);
            randomizedArray.push(this[number]);
        }
    }
  
    return randomizedArray;
}


Array.prototype.collect = function(){
   var ary = []
  for (var i=0; i<this.length; i++)
     ary.push( Array.prototype.collect.yield(this[i]) )
  return ary
}



/**
 * 
 * @memberOf 	{Array}
 * @method 		transpose        
 * @param       (Array of Arrays).
 *
 * Coded by: David
 *
 * Comments:   Assumes that self is an array of arrays and transposes the rows and columns. 
 */
Array.prototype.transpose = function(){
    /**
     *	VALID INPUT!
     *
     *  PARAMETER TYPES
     *  (Array of Arrays)
     *
     *  DIMENSIONS
     *  Paremeters dimensions must have the same dimensions.
     *
     */
     
  for(var i = 0; i < this.length; i++)
  if(!(this[i] instanceof Array))
    //throw("Wrong type of parameters into Array" + typeof(arguments[i]))
    return null
          
  for(var i = 0; i < this.length; i++)
    if((this[0].length) != (this[i].length))      
      //throw("Element size differs")
      return null

   var ary = [] 
 

   //Square matrices
   if((this.length) == (this[0].length)){    
     ary = this.clone()
     for(var i = 0; i < this.length;i++){
       ary[i] = []
       for(var j = 0;j < this[i].length; j++)
           ary[i][j] = this[j][i]
     }
      
   return ary  
   }
   
   //Non-square matrices

   for(var i = 0; i < this[0].length;i++)
     ary.push(_transpose(i,this))

   return ary
}



Array.prototype.zip = function(){
   var ary = []
   for(var i=0;i<this.length;i++){
      ary[i] = []
      ary[i][0]=this[i]
      for (var j=0; j<arguments.length; j++)
         if(arguments[j][i] == (void 0))
	    ary[i][j+1]=null
	 else
	    ary[i][j+1]=arguments[j][i]
   }
   return ary;
}



/**
 * 
 * @memberOf 	{Array}
 * @method 	empty$U       
 * @param       (no param)
 *
 * Coded by: David
 *
 * Comments: Returns true if self contains no elements.  
 */
Array.prototype.empty$U = function(){
  if(arguments.length > 0)
    //throw("Wrong number of parameters")
    return null
  return this.length==0? true: false
}



/**
 * 
 * @memberOf 	{Array}
 * @method 	eql$U       
 * @param       (Any).
 *
 * Coded by: txemagon, imasen
 *
 * Comments: Returns true if self and other are the same object, or are both arrays with the same content
 */
Array.prototype.eql$U = function(model){
    /**
     *	VALID INPUT!
     *
     *  PARAMETER TYPES
     *  (All types)
     *
     *  DIMENSIONS
     *  One object
     *
     */    
  if(arguments.length > 1)
    //throw("Wrong number of arguments")
    return null

  if(!(arguments[0] instanceof Array))
    return false

  if(this.length != arguments[0].length)
    return false
  var that = this  
  return model.inject_with_index( true, 
                                  function (el, index, acum){ 
                                        if (typeof(el) === "number")
                                          return acum && el == that[index] //Number.eql$U(el, that[index])
                                        return acum && ((el != null)? el.eql$U(that[index]) : true)
                                  });

}



Array.prototype.inject = function(init_value){
  for (var i=0; i<this.length; i++)
    init_value = Array.prototype.inject.yield(this[i], init_value)
  return init_value
}



Array.prototype.inject_with_index = function(init_value){
  for (var i=0; i<this.length; i++)
    init_value = Array.prototype.inject_with_index.yield(this[i], i, init_value)
  return init_value
}



/**
 * 
 * @memberOf 	{Array}
 * @method 	reverse       
 * @param       (Any).
 *
 * Coded by: David
 *
 * Comments: Returns a new array containing self‘s elements in reverse order. 
 */
Array.prototype.reverse = function(){
  var ary = []
  pos = 0
  for(var i = this.length-1; i >= 0; i--){
    ary[pos] = this[i]
    pos++
  }
  return ary
}



/**
 * 
 * @memberOf 	{Array}
 * @method 	values_at       
 * @param       (Integer/Index).
 *
 * Coded by: David
 *
 * Comments: Returns an array containing the elements in self corresponding to the given selector(s). The selectors may be either integer indices or ranges.
 */
Array.prototype.values_at = function(){
    /**
     *	VALID INPUT!
     *
     *  PARAMETER TYPES
     *  (Integer indices or ranges)
     *
     *  DIMENSIONS
     *  Any
     *
     */ 
  
  for(var i = 0; i < arguments.length; i ++)
    if(isNaN(arguments[i]))
      //throw ("Invalid type of paramenter")    
      return null
  
  var ary = [] 
  for(var i = 0; i < arguments.length; i++){
    //Converts real numbers (if exists) into integer.    
    arguments[i] = Math.round(arguments[i])
    
    if((arguments[i]) >= (this.length))      
      ary.push(null)
    
    else if(arguments[i] < 0){      
      if((arguments[i]+(arguments[i]*-2)) >= this.length)
        ary.push(null)
      else
        ary.push(this[this.length+(arguments[i])])
    }

    else   
      ary.push(this[arguments[i]])              
  }
  return ary  
}



/**
 * 
 * @memberOf 	{Array}
 * @method 	to_a      
 * @param       (any).
 *
 * Coded by: David
 *
 * Comments: Returns self. If called on a subclass of Array, converts the receiver to an Array object. 
 */
Array.prototype.to_a = function(){
  return this
}

/**
 * 
 * @memberOf 	{Array}
 * @method 	    Cycle      
 * @param       (function {}).
 *
 * Coded by: David
 *
 * Comments: Calls block for each element repeatedly n times or forever if none or nil is given. If a non-positive number is given or the array is empty, does nothing. Returns nil if the loop has finished without getting interrupted.
 */
Array.prototype.cycle = function(){

}

/**
 * 
 * @memberOf    {Array}
 * @method 	    strip_all     
 * @param       (function {}).
 *
 * Coded by: imasen
 *
 * Comments: strips each of the string elements of an array
 */
Array.prototype.strip_all = function(){
  return this.collect(function(el){
         return el.respond_to("strip") ? el.strip() : el
      })
}


//Internal simple functions
function includes(el, array){
  for (var i=0; i<array.length; i++)
    if (array[i] == el)
      return true
  return false
}

function unpack(model, array, level){    
  var l = level;

  for (var i=0; i<model.length; i++){
     if ( (model[i] instanceof Array) && (l > 0)){       
       unpack(model[i], array, l-1)       
     }
     else{       
       array.push(model[i])       
     }
  }
  return array
}

function aproduct(array1, array2){
    var nary = []
    var arrays = array1.length * array2.length
    for(var i = 0; i < arrays; i++){
      nary[i] = []
    }
    var pos = 0
    for(var i = 0; i < array1.length; i++)
      for(var j = 0; j < array2.length; j++){
        nary[pos][0] = array1[i]
        nary[pos][1] = array2[j]      
        pos++
      }
    return nary  
}

function _rotate(number, array1, array2){
    var pos = 1 
    array2[number] = array1[0]
    var arg = number
    if(arg == array1.length-1)
      arg = 0
    else
      arg++
    for(var i = arg; i != number;i++){    
      array2[i] = array1[pos]            
      if(i == (array1.length-1))
        i = -1;
      pos++
    }
    return array2
}

function getRandomArbitary (min, max) {
  return Math.random() * (max - min) + min;
}

function _transpose(pos, nary){
  //This function returns a transpose array. (Used by Array#transpose method when it receives non-square matrices).
  var array = []
  for(var i = 0; i < nary.length; i++)
    array[i] = nary[i][pos]          
    return array
}


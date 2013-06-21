/**
 * @class Array
 *
 */


 Array.bang_methods = [ 
                      "collect",
                      "map",
                      "clone",
                      "compact",
                      "sort_by"
                    ]

/**
 * @method reflect
 * @static
 *
 * Creates a bang method version of the referred one.
 *
 * @param  {(String | String[])...} original_method Name of the original method.
 *
 * If original method is an Array of Strings then performs reflection
 * over every mentioned method.
 *
 * ###Example
 *      // Create Array#map$B based on Array#map
 *      Array.reflect("map")
 *
 *      // Create Array#map$B and Array#collect$B
 *      Array.reflect("map", "collect")
 *
 *      // Create Array#map$B and Array#collect$B
 *      var method_list = ["map", "collect"]
 *      Array.reflect(method_list)
 */
Array.reflect = function(){
  var result
    var return_value = {}

  function duplicate(original_method){
    Array.prototype[original_method + "$B"] = function(){
      var substitute = Array.prototype[original_method].apply(this, arguments)

	this.clear()
	for (var i=0; i<substitute.length; i++)
	  this[i] = substitute[i]

	    return this
    }
    return [ original_method + "$B", Array.prototype[original_method + "$B"] ]
  }

  for(var i=0; i<arguments.length; i++)
    if (arguments[i] instanceof Array)
      for(var j=0; j<arguments[i].length; j++){
	result = duplicate(arguments[i][j])
	  return_value[result[0]] = result[1]
      }
    else {
      result = duplicate(arguments[i])
	return_value[result[0]] = result[1]
    }
  return return_value
}

/**
 * @method  each
 *
 * Calls the block once for each element of the Array.
 *
 * @param  {function(Object)}  block Argument processor called once for every Array item
 *
 * @return {Array} Returns self
 *
 * ###Example
 *     var names = ["Peter", "John", "David"]
 *     names.each(function (arrayItem){ alert(arrayItem) })
 *     //=> ["Peter", "John", "David"]
 *
 * This method shows an alert for item.
 */
Array.prototype.each = function(){
  for (var i = 0; i < this.length; i++)
    Array.prototype.each.yield(this[i])
}
/**
 * @method  each_index
 *
 * Calls the block once for each item with the element and its index.
 *
 * @param  {function(number)}  block Called once with every index.
 *
 * @return {Array} this
 *
 * ###Example
 *     var names = ["Peter", "Johnnie", "Walker"]
 *     names.each(function (arrayIndex){ alert(arrayIndex)})
 *     //=> ["Peter", "Johnnie", "Walker"]
 *
 * This code throws an alert for each array item showing the array index number
 */
Array.prototype.each_index = function(){
  for (var i = 0; i < this.length; i++)
    Array.prototype.each_index.yield(i)
}

/**
 * @method  each_with_index
 *
 * Calls the block with the element and its index.
 *
 * @param  {function(Object, number)}  block \(element, index\) Called once with every element and index.
 *
 * @return {Array} this
 *
 * ###Example
 *     var list  = ""
 *     var names = ["Peter", "John", "David"]
 *     names.each_with_index(
 *       function(arrayItem, arrayIndex){
 *                     list += "\t" + arrayIndex + ".- " + arrayItem + "\n"
 *       })
 *     list
 *     //=> "  0.- Peter
 *     //=>    1.- John
 *     //=>    2.- David "
 *
 * This code throws an alert for each array item showing the array index number and the content of the index.
 */
Array.prototype.each_with_index = function(){
  for (var i = 0; i < this.length; i++)
    Array.prototype.each_with_index.yield(this[i], i)
}

/**
 * @method  count
 *
 * Counts all the elements of the array matching a particular criteria, if given.
 *
 * @param {Object}   [to_find] Count occurences of *to_find*
 * @param {function(Object)} [block] Counting criteria
 *
 * @return  {Number} Number of  matches.
 *
 * ###Example
 *     var names = ["Peter", "John", "David"]
 *     names.count()
 *     //=> 3
 *
 *     var names = ["Peter", "John", "Peter", "David"]
 *     names.count("Peter")
 *     //=> 2
 *
 *     var names = ["Peter", "John", "David"]
 *     names.count(function(element){
 *                    return element.length == 5
 *                 })
 *     //=> 2
 */
Array.prototype.count = function(obj){
  if (typeof(obj) === "undefined" )
    return this.length

      var count = 0
      for (var i=0; i<this.length; i++)
	if (
	    ( typeof(obj) === "function" ?
	      Array.prototype.count.yield(this[i]) :
	      this[i] == obj
	    )
	   )
	  count++

	    return count
}

/**
 * @method reverse_each
 *
 * Traverse every element of the array through the block in reverse order.
 *
 * @param  {function(object)}  block Called once with every element
 *
 * @return {Array} this
 *
 * ###Example
 *     var sentence   = ""
 *     var to_my_boss = ["job", "this", "like", "don\'t", "I"]
 *     to_my_boss.reverse_each(function(element){
 *                                sentence += (element + " ").toUpperCase()
 *                             })
 *     sentence
 *     //=> "I DON'T LIKE THIS JOB "
 */

Array.prototype.reverse_each = function(){
  var l = this.length - 1
    for (var i=l; i>=0; i--)
      Array.prototype.reverse_each.yield(this[i])
}

/**
 * @method  collect
 *
 * Maps array elements using a block for the transfomation.
 *
 * @param  {function(Object)} block Transforming function
 *
 * @return  {Array} Returns the trasformed image of self
 *
 * ###Example
 *     var number     = [250, 500, 1143]
 *     var discount   = 0.25
 *     var discounted = number.collect(function(obj){
 *                                  return obj * (1 - discount)
 *                               })
 *     //=>  [187.5, 375, 857.25]
 */
Array.prototype.collect = function(){
  var collectable = []

    for (var i = 0; i < this.length; i++)
      collectable.push(Array.prototype.collect.yield(this[i]))

	return collectable
}

/**
 * @method  collect$B
 * @chainable
 *
 * Bang methods ...$B operates in `this` object.
 * (see Array#collect)
 */

/**
 * @method  map
 *
 * Alias of {@link Array#collect Array#collect}
 *
 */
Array.prototype.alias("map", "collect")

/**
 * @method  map$B
 * @chainable
 *
 * Bang methods ...$B operates in `this` object.
 * (see Array#collect)
 */

/**
 * @method  select_if
 *
 * Collects the element or elements that pass a given condition.
 * 
 * @param  {function} This function must return a boolean. If it returns true, the array item will be included in the final array. 
 * If not, it will be deleted.
 * @return  {Array} Returns all items that have passed the condition. If an item can't pass the condition, it is deleted.
 * 
 * ###Example
 *     //SUSTITUIR POR EJEMPLO MAS ELABORADO CON METODOS DE STRING
 *     discount = number.collect(function(obj){ return obj-(obj*0.25)})
 *     //=> [187.5,375,857.25]
 */
Array.prototype.select_if = function(){
  var collectable = []
    for (var i = 0; i < this.length; i++)
      if ( Array.prototype.select_if.yield(this[i]) )
	collectable.push(this[i])
	  return collectable
}

/**
 * @method  indexOf
 *
 * Searches for an object in every position of the array, starting at position parsed as parameter.
 *
 * The method searches for an object in every position of the array, 
 * starting at position passed as parameter.
 * 
 * @param  {Object} The object that will be searched
 * @param  {Number} Position to start searching
 * ###Example
 *     var numbers = [34,56,78,98]
 *     numbers.indexOf(56, 0)
 *     //=> 1
 */
Array.prototype.indexOf = function(searchElement, fromIndex){
  var i
    for (i = fromIndex || 0; i <this.length && this[i] !== searchElement; i++);
  i = i>=this.length? null: i
    return i
}

/**
 * @method  indexOf
 *
 * Clones an array.
 *
 * @return  {Array} Cloned array
 *
 * ###Example
 *     var numbers = [34,56,78,98]
 *     numbers2 = numbers.clone
 *     //numbers2 = [34,56,78,98]
 */
Array.prototype.clone = function(){
  var ary = []
    for (var i=0; i<this.length; i++)
      ary[i] = this[i]
	return ary
}

/**
 * @method  clone$B
 * @chainable
 *
 * Bang methods ...$B operates in `this` object.
 * (see Array#clone)
 */

/**
 * @method  clear
 * Clears an Array from the elements that it contains.
 *
 * @return  {Array} Empty array
 * ###Example
 *     var numbers = [34,56,78,98]
 *     numbers.clear()
 *     //=> numbers = []
 */
Array.prototype.clear = function(){
  while( this.length > 0)
    this.pop()
}

/**
 * @method  equals$U
 *
 * Compares two arrays.
 *
 * @return  {Boolean} If the arrays matches the condition, it returns true. If not, it returns false
 * @param  {Array} Array to compare
 * ###Example
 *     var numbers = [34,56,78,98]
 *     numbers.indexOf(56, 0)
 *     //=> 1
 */
Array.prototype.equals$U = function(other){
  var same = true
    if(this.length != other.length)
      return  false
	for (var i=0; i<this.length; i++)
	  if (this[i] != other[i])
	    same = false
	      return same
}

/**
 * @method  uniq
 *
 * Searches repeated items in an array and deletes them.
 *
 * @param  {function(object)}  Block indicates the position of the element to compare
 *
 * @return  {Array} Returns an array without repeated items
 * 
 * ###Example
 *     a = [2, 1, 2, 1, 2, 2, 3, 1, 1]
 *     a.uniq()
 *     // => [2, 1, 3]
 *
 *     a = [[2, 1], [2, 1, 2], [2, 3], [1, 1]]
 *     a.uniq(function(element){ 
 *              return element[0]
 *            })
 *     // => [[2, 1], [1, 1]]
 */
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

/**
 * @method  uniq$B
 * @chainable
 *
 * Bang methods ...$B operates in `this` object.
 *
 * Operates as Array#uniq except when no repetitions are found (returns null).
 * (see Array#uniq)
 */
Array.prototype.uniq$B = function(){
  var uniq = this.uniq()

  if (uniq.equals$U(this))
      return null

	this.clear()

	for(var i=0; i<uniq.length; i++)
	  this[i] = uniq[i]

  return this
}

/**
 * @method  first
 *
 * Returns the first element or elements of the array -it will depend on the number of elements meeting the parameters.
 *
 * @return  {Array} Returns the first element or elements of the array
 * @param  {Number} Position to end including the elements in the returned array
 * ###Example
 *     var numbers = [1,2,3,4,5,6,7,8,9]
 *     filterNumbers = numbers.first(3)
 *     //=> [1,2,3]
 */
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

/**
 * @method  last
 *
 * Returns the element or elements of an array starting from the end. It will depend on the number of elements meeting the parameters.
 *
 * @return  {Array} Returns the last element or elements of the array
 * @param  {Number} Position to start including the elements in the returned array
 * ###Example
 *     var numbers = [1,2,3,4,5,6,7,8,9]
 *     filterNumbers = numbers.last(6)
 *     //=> [4,5,6,7,8,9]
 * 
 *     var numbers = [1,2,3,4,5,6,7,8,9]
 *     filterNumbers = numbers.last(2)
 *     //=> [8,9]
 * 
 *     var numbers = []
 *     filterNumbers = numbers.last(2)
 *     //=> null
 */
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

/**
 * @method  erase$B
 * 
 * Deletes the element especify by an index.
 * 
 * @param  {Number} Index 
 * 
 * @returns {Object} This
 * 
 * ###Example
 *     var numbers = [1,2,3,4,5,6,7,8,9]
 *     numbers.delete(3)
 *     //=> [1,2,3,5,6,7,8,9]
 */
Array.prototype.erase$B = function(){ // El assert muestra un test fallido sin motivo alguno (valor esperado == valor recibido). Falla una vez se pone la condición de parámetro inexistente en el array.
  //todo: error on erase$B
  if(arguments.length > 1)
    return null
      //throw ("Wrong number of parameters")
      var find = false
      for(var i = this.length-1; i>=0; i--)
	if(this[i] == arguments[0]){
	  this.splice(i,1)
	    find = true;
	}
  return find? this: null
}

/**
 * @method  erase_at$B
 * 
 * Deletes the element on an specific position.
 * 
 * @param  {Number} Position of the array item to be deleted
 *
 * @return {Array} this
 * 
 * ###Example
 *     var numbers = [1,2,3,4,5,6,7,8,9]
 *     numbers.erase_at$B(3)          //=> [1,2,3,5,6,7,8,9]
 *     numbers.erase_at$B(-1)         //=> [1,2,3,4,5,6,7,8]
 *     numbers.erase_at$B()           //=> [2,3,4,5,6,7,8,9]
 *     numbers.erase_at$B()           //=> [1,2,3,4,5,6,7,8]
 * 
 */
Array.prototype.erase_at$B = function(){//El assert muestra un test fallido sin motivo alguno (valor esperado == valor recibido).
  if( !is_a_number(arguments[0]) )
    return null 
    if(arguments.length > 1)
      return null
        //throw ("Wrong number of parameters")
        if(arguments[0] > this.length)
  	  return null
  	    this.splice(arguments[0],1)
  return this
}

/**
 * @method  erase_if
 *
 * Deletes all the array elements that meet the condition specified by the block..
 *
 * @param  {function(object):boolean} Block that must contain a condition by which the element will be erased or not. 
 * @returns {array} Returns those elements that satisfy the condition.
 * 
 * ###Example
 *     var numbers = [1,2,3,4,5,6,7,8,9]
 *     numbers.erase_if(function(obj){ return obj > 2 })
 *     //=> [1,2]
 */
Array.prototype.erase_if = function(){

  if(arguments.length > 1)
    //throw("Wrong number of arguments")
    return null

  var ary = []
  for(var i = 0; i < this.length; i++)
	
  if ( !Array.prototype.erase_if.yield(this[i]) )
	  ary.push(this[i])
	    return ary.compact()
}

/**
 * @method  erase_if$B
 *
 * Deletes all the array elements that meet the condition specified by the block..
 * Deletion is made in block call. Not at the end 
 *
 * @param  {function(object):boolean} Block that must contain a condition by which the element will be erased or not. 
 * @returns {array} this
 * 
 * ###Example
 *     var numbers = [1,2,3,4,5,6,7,8,9]
 *     numbers.erase_if$B(function(obj){ return obj > 2 })
 *     //=> [1,2]
 */
Array.prototype.erase_if$B = function(){

  if(arguments.length > 1)
    //throw("Wrong number of arguments")
    return null

  for(var i = 0; i < this.length; i++)  
    if ( !Array.prototype.erase_if.yield(this[i]) )
      this.splice(i, 1)

  return this
}

/**
 * @method  replace
 *
 * Replaces the array content with the array passed as parameter.
 *
 * @param  {Array} Array that will replace the original array. If this array is empty, the returned array will be null.
 *
 * ###Example
 *     var numbers = [1,2,3,4,5,6,7,8,9]
 *     newNumbers = numbers.replace(["a","b","c"])
 *     // => ["a","b","c"]
 *
 *     var numbers = [1,2,3,4,5,6,7,8,9]
 *     newNumbers = numbers.replace()
 *     // => null
 *
 *     var numbers = [1,2,3,4,5,6,7,8,9]
 *     var substitute = ["a","b","c"]
 *     newNumbers = numbers.replace(substitute)
 *     // => ["a","b","c"]
 */
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

/**
 * @method delete$B
 * 
 * Eliminates an object from the array that meets the parameter passed as position. 
 * 
 * @param {Object} Object that is passed to the method as parameter.
 * @return {Array} A copy of the array without the deleted elements.
 * 
 * ###Example
 *     var numbers = [1, 2, 3, 4, 5]
 *     numbers.delete$B(3)
 *     //=> numbers = [1, 2, 4, 5]
 * 
 * ###Example 2
 *     var numbers = [1, 2, 3, 4, 5]
 *     numbers.delete$B(8, function(){return "Item not found"})
 * 
 */
Array.prototype.delete$B = function(obj){
  var position = this.indexOf(obj)
    if ( !position )
      if (Array.prototype.delete$B.block_given$U())
        return Array.prototype.delete$B.yield() 
      else
        return null

  while ( (position = this.indexOf(obj)) )
      this.splice(position, 1)
  
  return obj
}

/**
 * @method include$U
 * 
 * Searches every item of the array for the object passed as parameter.
 * 
 * @param  {Object} Object that the method will search for.
 * @return {Boolean} Returns the result of the search. If item is included, returns true. If not, false.
 *
 * ###Example
 *     var numbers = [1,2,3,4,5,6,7,8,9]
 *     newNumbers = numbers.include$U(3)
 *     // => true
 *
 *     var names = ["carlos","jordan","david","susan"]
 *     newName = names.include$U('susan')
 *     // => true
 */
Array.prototype.include$U = function(){
  if(arguments.length != 1)
    //throw "wrong number of arguments (it needs one argument)"
    return null
      var find = false
      for(var i = 0; i < this.length; i++)
	if( arguments[0] == this[i])
	  find = true
	    return find
}

/**
 * @method  assoc
 * 
 * Searchess on an array the passed parameter and returns the array that contains it.
 * 
 * @param  {Object} object searched parameter.
 * @return {Array} Array 
 * 
 * ###Example
 *     var coupleOne = ["David", "Homer"]
 *     var coupleTwo = ["John", "Steve"]
 *     var index = [coupleOne, coupleTwo]
 *     var winnerCouple = index.assoc("John")     //=> ["John","Steve"]
 *     var winnerCouple = index.assoc(["John"])   //=> ["John","Steve"]
 *     var winnerCouple = index.assoc("Homer")    //=> nil
 */
Array.prototype.assoc = function(){
  if(arguments.length > 1)
    //throw "wrong number of arguments"
    return null
      for(var i=0; i<this.length; i++)
	if(arguments[0] == this[i][0])
	  return this[i]
	    return null
}

/**
 * @method  at
 * 
 * Returns the element corresponding to the index passed as parameter.
 * 
 * @param  {number} Array index position.
 * @return {Object} The selected element by an index passed as parameter.
 * 
 * ###Example
 *     var numbers = [1,2,3,4,5,6,7,8,9]
 *     newNumbers = numbers.at(3)
 *     //=> numbers = 4
 */
Array.prototype.at = function(){
  if(arguments.length > 1)
    //throw "wrong number of arguments"
    if(arguments[0] > this.length)
      return null
	if(isNaN(arguments[0]))
	  //throw "wrong type paremeter" Converts any argument to array, then merges elements of itself with corresponding elements from each argument.
	  return null
	    if(arguments[0] < 0 && (this.length + arguments[0]) < 0)
	      return null
		return arguments[0]>=0? this[arguments[0]] : this[this.length+(arguments[0])]
}

/**
 * @method  compact
 * 
 * Deletes the null elements of an array.
 * 
 * @returns {Array} Returns the array clean and null elements.
 * 
 * ###Example
 *     var numbers = [1,null,2,null,3,null,4,5,6,7,8,9]
 *     newNumbers = numbers.compact()
 *     // => [1,2,3,4,5,6,7,8,9]
 *
 *     var numbers = [null,null,null]
 *     newNumbers = numbers.compact()
 *     // => []
 */
Array.prototype.compact = function(){
  var ary = []
    for(var i = 0; i < this.length; i++)
      if(this[i] != null)
	ary.push(this[i])
	  return ary
}

/** 
 * @method  compact$B
 * @chainable
 * 
 * Bang methods ...$B operates in `this` object.
 * (see Array#compact)
 */

/**
 * @method merge
 * 
 */ 
Array.prototype.merge = function(ary2){
  var ary = []// PROBLEMAS CON EL TEST, LA VARIABLE ARY CONTIENE DATOS PERO EN EL TEST SE MUESTRA COMO UNDEFINED
    for(var i = 0; i < this.length; i++)
      ary.push(this[i])
	for(var i = 0; i < ary2.length; i++)
	  ary.push(ary2[i])
	    return ary
}

/**
 * @method  drop
 * 
 * Deletes elements from position 0 of the array to the possition passed as parameter.
 * 
 * @param {Number} Position to stop deleting data of the array.
 * @return {Array} Returns the array elements that haven't been deleted.
 * 
 * ###Example
 *     var numbers = [1,2,3,4,5,6,7,8,9]
 *     newNumbers = numbers.drop(3)
 *     //=> [5,6,7,8,9]
 *
 *     var numbers = [1,2,3,4,5,6,7,8,9]
 *     newNumbers = numbers.drop(-3)
 *     //=> [1,2,3,4,5,6,7,8,9]
 */
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

/**
 * @method  drop_while
 * 
 * Executes a block passed as parameter that returns either an 
 * object or null. If it returns null, this position will be deleted.
 * 
 * @param {function(Object):(boolean | Object)} Block receiving the element.
 * @returns {Array} Returns an array of elements that have not been deleted.
 * 
 * ###Example
 *     var numbers = [1,2,3,4,5,6,7,8,9]
 *     newNumbers = numbers.drop_while(function(obj, that){ return obj > 5? that: null})
 *     //=> [7,8,9]
 *
 *     var numbers = [1,2,3,4,5,6,7,8,9]
 *     newNumbers = numbers.drop_while(function(obj, that){ return obj > 7? that: null})
 *     //=> [9]
 */
Array.prototype.drop_while = function(){
  if(arguments.length > 1)
    //throw("Wrong number of parameters")
    return null

  var ary = []
  var eliminating = true
  for(var i = 0; i < this.length; i++){
      if (eliminating && !Array.prototype.drop_while.yield(this[i]))
        eliminating = false
      if (!eliminating)
        ary.push( this[i])
  }
	  return ary.compact()
}

/**
 * @method  flatten
 * 
 * Transforms an array that contains other arrays inside in a single array with the data of all the arrays
 * 
 * @param {Numeber} The level to stop flatting objects
 * @return {Array} Returns an array with the elements
 * 
 * ###Example
 *     var numbers = [[1,2],[3,4],[5,6]]
 *     numbers.flatten()
 *     //=> [1,2,3,4,5,6]
 *
 *     var numbers = [[1,2,[3,4,5,6]]]
 *     numbers.flatten(1)
 *     //=> [1,2,[3,4,5,6]]
 *
 *     var numbers = [1,2,3,4,5,6]
 *     numbers.flatten(3)
 *     //=> [1,2,3,4,[5,6]]
 */
Array.prototype.flatten = function(level){
  if(level == 0)
    return this
      level = level || 1000
      return unpack(this, [], level)
}

/**
 * @method  index
 * 
 * Finds the first position of a given object or the position of the first matching
 * a given criteria.
 * 
 * @param {Object | function(Object): boolean} Object that the method will search for, or matching criteria.
 * 
 * @return {number} Position of the element we are looking for. null if not found.
 * 
 * ###Example
 *     var numbers = [1,2,3,4,5,6,7,8,9]
 *     numbers.index(3)
 *     //=> 2
 */
Array.prototype.index = function(){
  for(var i = 0; i < this.length; i++)
    if ( typeof(arguments[0]) === "function" ?
          Array.prototype.index.yield( this[i]) :
          this[i] == arguments[0] )
      return i
	return null
}

/**
 * ¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿???????????????????????????????
 */
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

/**
 * ¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿????????????????????????
 */
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

/**
 * @method  rindex
 * 
 * Searches an array to find the element passed as parameter and returns the position of this element, 
 * starting the search from the final position of the array.
 * 
 * @param {Object} Object that the method will search for.
 * @return {number} Position of the element searched for. If not find, it will be null.
 * ###Example
 *     var numbers = [1,2,3,4,5,4,3,2,1]
 *     newNumbers = numbers.rindex(3)
 *     //=> 6
 */
Array.prototype.rindex = function(){
  if(arguments.length != 1)
    //throw ("Wrong number of arguments")
    return null

      for(var i = this.length-1; i >= 0; i--)
	if(this[i] == arguments[0])
	  return i
	    return null
}

/**
 * @method  rotate
 * 
 * Rotates the array elements stablishing as amount of rotation an index passed as parameter.
 * 
 * @param {Number} Stablishes the amount of the array rotation.
 * @return {Array} Items ordered.
 * 
 * ###Example
 *     var characters = ["a","b","c","d"]
 *     characters.rotate(2)
 *     //=> ["c","d","a","b"]
 *
 *     var characters = []
 *     characters.rotate(2)
 *     //=> null
 *
 *     var characters = ["a","b","c","d"]
 *     characters.rotate(3)
 *     //=> ["d","a","b","c"]
 */
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

/**
 * @method  take
 * 
 * Takes the elements of an array from the first position to the position passed as parameter.
 * 
 * @param {number} Position of the last element to take.
 * 
 * ###Example
 *     var numbers = [1,2,3,4,5,4,3,2,1]
 *     newNumbers = numbers.take(3)
 *     //=> [1,2,3,4]
 */
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

/**
 * @method take_while
 *
 * Takes the first elements of an array while the condition is met.
 *  
 * @param  {function(Object):boolean} block 
 * @return {Array}       First elements of an Array
 *
 * ###Example
 *      [1, 2, 2, 3, 2, 4].take_while( function(el){
 *             return el < 3
 *           })
 *      //=> [1, 2, 2]
 */
Array.prototype.take_while = function(){
  var ary    = []
  var taking = true

  for (var i=0; taking && i<this.length; i++)
    if ( Array.prototype.take_while.yield(this[i]) )
      ary.push(this[i])
    else
      taking = false    
    return ary
}

/**
 * @method  shuffle
 * 
 * Shuffles the array items randomly.
 * 
 * @return {Array} Shuffled array.
 *
 * ###Example
 *     var numbers = [1,2,3,4]
 *     numbers.shuffle()
 *     // => The same elements of the array in another order.
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

/**
 * ??????????????
 */
Array.prototype.collect = function(){
  var ary = []
    for (var i=0; i<this.length; i++)
      ary.push( Array.prototype.collect.yield(this[i]) )
	return ary
}

/**
 * @method   transpose 
 * 
 * Assumes that self is an array of arrays and transposes the rows to columns.
 * 
 * @param   {Array} Array with elements to transpose.
 * @return  {String} Returns a string with the union of the columns of different matrices.
 * 
 * ###Example
 *     var numbers = [[1,2],[3,4],[5,6]]
 *     numbers.transpose()
 *     //=> [[1,3,5],[2,4,6]]
 * 
 *     var numbers = [[1,2,3],[1,2,3],[1,2,3]]
 *     numbers.transpose()
 *     //=> [[1,1,1],[2,2,2],[3,3,3]]
 *
 *     var words = [['hola','pedro','cristobal'],['adios','juan','colon']]
 *     words.transpose()
 *     //=> [[hola, adios], [pedro, juan], [cristobal, colon]]
 */
Array.prototype.transpose = function(){
  /**
   * VALID INPUT!
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

/**
 * @method  zip
 * 
 * Takes the elements of two or more arrays passed as parameter and copies their content in a single array.
 * 
 * @param {Array} Arrays to be joined.
 * @return {Array} Array with all elements from the other arrays.
 * 
 * ###Example
 *     var a = [1,2]
 *     var b = [3,4]
 *     a.zip(b)
 *     //=> [1,2,3,4]
 */
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
 * @method  empty$U
 * 
 * Checks if the array is empty.
 * 
 * @return {Boolean} if empty, returns true. If not, false
 * ###Example
 *     var a = []
 *     a.empty$U()
 *     //=> true
 */
Array.prototype.empty$U = function(){
  if(arguments.length > 0)
    //throw("Wrong number of parameters")
    return null
      return this.length==0? true: false
}

/**
 * @method  eql$U
 * 
 * Checks if the arrays are equals.
 * 
 * @return {boolean} if it is equals, returns true. If not, false.
 * 
 * ###Example
 *     var a = [1,2]
 *     var b = [1,2]
 *     a.eql$U(b)
 *     // => true
 */
Array.prototype.eql$U = function(model){
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

/**
 *    ¿??????????
 */
Array.prototype.inject = function(init_value){
  for (var i=0; i<this.length; i++)
    init_value = Array.prototype.inject.yield(this[i], init_value)
      return init_value
}

/**
 * 
 */ 
Array.prototype.inject_with_index = function(init_value){
  for (var i=0; i<this.length; i++)
    init_value = Array.prototype.inject_with_index.yield(this[i], i, init_value)
      return init_value
}

/**
 * @method  reverse
 * 
 * Reverses all array elements.
 * 
 * @return {Array} New array with elements reversed.
 * 
 * ###Example
 *     var a = [1,2,3,4]
 *     a.reverse()
 *     //=> [4,3,2,1]
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
 * @method  values_at
 * 
 * Returns the values of an index passed as parameter.
 * 
 * @param {number} Index Index to be selected
 * @return {Array} New array with values of index selected.
 * 
 * ###Example
 *     var a = [1,2,3,4]
 *     a.values_at(1,2)
 *     //=> [1,2]
 */
Array.prototype.values_at = function(){
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
 * @method      to_a
 * 
 * Returns self. If called on a subclass of Array, converts the receiver to an Array object.
 * 
 * @return      {Array} this
 * 
 * ###Example
 *      [1, 2, 3, 4, 5].to_a()
 *      //=> [1, 2, 3, 4, 5]
 */
Array.prototype.to_a = function(){
  return this
}

/**
 * @method       Cycle
 * 
 * Calls block for each element repeatedly n times or forever if none or nil is given. 
 * If a non-positive number is given or the array is empty, does nothing. 
 * Returns nil if the loop has finished without getting interrupted.
 *  
 * @param        {function {}}
 *
 * ###Example
 * 
 */
Array.prototype.cycle = function(){
  
   return this 
}

/**
 * @method strip_all
 * 
 * Searches for strings in an array. Strips each of the string elements of an array.
 *
 * @return  {Array} A new array with stripped elements.
 *
 * ###Example
 *     var a = [1,2,3,"  4"]
 *     a.strip_all()
 *     //=> [1,2,3,"4"]
 */
Array.prototype.strip_all = function(){
  return this.collect(function(el){
    return el.respond_to("strip") ? el.strip() : el
  })
}

/**
 * @method combination
 *
 * Generates all the possible combinations grouped by *number*.
 *  
 * @param  {number} number Grouping amount
 * @return {Array}         All the combinations.
 *
 * ###Example
 *      a = [1, 2, 3, 4]
 *      a.combination(1)  //=> [[1], [2], [3], [4]]
 *      a.combination(2)  //=> [[1,2], [1,3], [1,4], [2, 3], [2, 4], [3, 4]]
 *      a.combination(3)  //=> [[1, 2, 3], [1, 2, 4], [1, 3, 4], [2, 3, 4]]
 *      a.combination(4)  //=> [[1, 2, 3, 4]]
 *      a.combination(0)  //=> [[]]
 *      a.combination(5)  //=> []
 *
 * ###Diagram
 *
 * For pairs of 3
 * 
 *      1    2 
 *     / \   |
 *    2   3  3
 *   / \  |  |
 *  3   4 4  4
 *
 * 
 *  [1]
 *  [[1,2], [1,3]]
 */
Array.prototype.combination = function(number){
  if (! is_a_number(number) )
    throw "Array#combination. Parameter must be a number."
  if (number == 0)
    return [[]]
  if (number > this.length)
    return []
  if (number == this.length)
    return [this.clone()]
  if (number == 1)
    return this.collect(function(el){ return [el] })

  var combinations = []
  for (var i=0; i<this.length-number + 1; i++){
    var r = [this[i]]
    r = this.__secure_combination(number-1, r, i + 1)
    for (var j=0; j<r.length; j++)
      combinations.push(r[j])
  }

  return combinations

}

Array.prototype.__secure_combination = function(number, base, initial){
  
  if (number <= 0)
    return base
  var result = []
  for (var i=initial; i<this.length-number + 1; i++){
    var r = base.clone()
    r.push(this[i])
    r = this.__secure_combination( number-1, r.clone(), i+1 ) 
    if (number > 1)
      for (var j=0; j<r.length; j++)
        result.push(r[j])
    else
      result.push(r)
  
  }
  
  return result.clone()
}

/**
 * @method sort_by
 * 
 * Returns a sorted array using the mapped value returned by the block.
 * When no block is given then acts a Array#sort alias.
 *
 * @param {(function(Object):Object)=} Block Maps to provide a comparison item.
 * 
 * @return {Array} Sorted Array
 * 
 * ###Example
 *      var cities = ['Madrid', 'barcelona', 'Valencia', 'alicante']
 *      cities.sort_by()
 *      //=> [Madrid,Valencia,alicante,barcelona]
 *
 *      cities.sort_by( function(el){ 
 *                        return el.toLowerCase() 
 *                       })
 *      //=> ['alicante', 'barcelona', 'Madrid', 'Valencia']      
 *
 *      cities.sort_by( function(el){ 
 *                        return el.length 
 *                       })
 *      //=> ['Madrid', 'Valencia', 'Barcelona']
 *
 */
Array.prototype.sort_by = function(){
  var indexed = []
  if (Array.prototype.sort_by.block_given$U()) {
     var ordered = []
	
     for (var i=0; i<this.length; i++)
	     indexed.push( [ Array.prototype.sort_by.yield(this[i]), this[i] ] )
	   if (is_a_number$U( indexed[0][0]) )
       indexed.sort( function(a,b){ return a[0] - b[0] } )
     else
       indexed.sort()
	   
     for (var i=0; i<this.length; i++)
	      ordered.push( indexed[i][1] )
		
    return ordered
    } else
      return this.sort()

}

/**
 * @method  sort_by$B
 * @chainable
 *
 * Bang methods ...$B operates in `this` object.
 * (see Array#sort_by)
 */

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

Array.reflect(Array.bang_methods)


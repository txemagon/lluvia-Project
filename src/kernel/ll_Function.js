
Function.prototype.bind = function(object){
	var f = this
	return function(){ f.apply(object, arguments) }
}

Function.prototype.bind_params = function(){
	var args = arguments
	var f = this
	return function(){ f.apply(f, args) }
}

Function.prototype.yield = function(){
     for (var i=this.arguments.length-1; i>=0; i--)               
        if (typeof(this.arguments[i]) === "function")         
            return this.arguments[i].apply(this, arguments)   
}

Function.prototype.block_given$U = function(){
     var given = false
     for (var i=this.arguments.length-1; i>=0; i--)               
        if (typeof(this.arguments[i]) === "function")         
           given = true
     return given
}

/** Takes a function and prepare it to clone with the Function constructor.
*/
Function.prototype.deconstruct = function(){
  return { name: this.name, 
           params: this.toSource().match(/function[^\(]*\(([^)]*)\)/)[1].split(","),
           body: this.toSource().match(/{(.*)}/)[1]
           }
}

Function.deconstruct = function(src){
  return { name: src.match(/function\s+([^\(]+)/)[1], 
           params: src.match(/function[^\(]*\(([^)]*)\)/)[1].split(","),
           body: src.match(/{(.*)}/)[1]
           }
}

/*
 * yield example
 * 
 * The last function parameter (if any) is a lambda.
 */
/*
function pepe(a, b, c){
     
     return a + b + c + pepe.yield(3) 
}  

alert( pepe(1, 2, 3, function(e){ return e + 2 }) )
*/


/* 


PREFACE:

Father.prototype.constructor = Father;
  function Father(){this.a = 0;}
  
  Child1.prototype = new Father
  Child1.prototype.super = Father;
  Child1.prototype.constructor = Child1;
  function Child1(){ 
    Child1.prototype.super.apply(this, arguments)
    this.b = 1;
    }
  Child1.prototype.greet = function(){
   alert(this.d);
   }
  
  Child2.prototype = new Child1
  Child2.prototype.super = Child1
  Child2.prototype.constructor = Child2;
  function Child2(){
    Child2.prototype.super.apply(this, arguments)
    this.c = 2;
    }  
  
  Child3.prototype = new Child2 // Soft Link to prototype
  Child3.prototype.super = Child2 // Below definitios obscures the nature of prototype, unless you use unofficial __proto__
  Child3.prototype.constructor = Child3;
  function Child3(){ 
    this.super.apply(this, arguments) // Real Inheritance
    this.d = 3;
  } 
  
   kola = new Child3();
Child1.prototype.wave = function(){ // The only way to reopen a class is appending to prototype.
  alert("bye");                     // Further reopening of the super class has to be done thru metod missing, which is not javascript
  }   
kola.greet();
alert(kola.b);     
kola.wave();
   
   Once we've settle down the necesity of super we can do things like:
   
   c.include(Father)


CONTENT:
It's not posible to include a Module using an anonimous class. If '->' means .prototype

4->3->2->1
and
c->b->a

When we c.include(4), we get:
c->4->3->2->1->b->a


CONCLUSION: 
And, 
Oh! Loneliness fields,
Oh! Gloomy hills

Now 1 is deriving from b.
It's possible to make copies of 4,3,2 and 1, but not to reopen them again



Include on Class or Module inside a Class (We've to take into account both prototype chains)
if (typeof Function.include !== 'function') {
    Function.prototype.include = function (superclass) {
        function $F() {}
        $F.prototype = new superclass
        $F.prototype.super = superclass
        $F.prototype.constructor = $F
        var currentSuper =  null
        if (this.prototype && this.prototype.super && this.prototype.super.constructor)
          currentSuper = this.prototype.super

        var chain_end = $F.prototype.super
        while(chain_end.prototype.super)
          chain_end = chain_end.prototype.super
        alert(chain_end.prototype.constructor.name + " -> " + currentSuper.prototype.constructor.name)
        if (chain_end && currentSuper ){
          chain_end.prototype = new currentSuper.prototype.constructor
          chain_end.prototype.super = currentSuper.prototype.constructor
        }
        this.prototype = new $F
        this.prototype.super = $F
        
    };
}


CONCLUSION:

Option 1:
--------- 
There are two posible strategies. Extending (widering) prototype with a copy of the super class.

 c->b->a
    +
(4+3+2+1) methods and inner variables
 
 
 Option 2:
 ---------
 
 Create a delegator and use it as an inner class. 
 
 If we use method missing to search the other branch
 
 c->4->3->2->1 X b->a  X means broken pipe.
 
 And we add method_missing extra search over b and a. This way we can follow the original chain
 without extra inheritance. However we are exposed to method_missing overriding in child classes.
 So, the best solution seems to me to be creating a Delegator (D) to 4 class
 
 c->D->b->a
    |
    +---> 4->3->2->1
*/

/* CREATING CLASS VARIABLES

3  When we make:
  
  Class.prototype.xxx
  
  Then the xxx is directly available for the instance, but not for the class itself. Thus, we can make:
  
  Class.xxx 
  or
  function Class(){ // Only added thru new
    this.xxx
  }
  
  Once the use of super is admitted, we can reopen the class and add class methods while running.

  But if, 
  c = new Class();
  d = new Class();
  c.xxx = 3 doesn't change d.xxx
  
  When xxx is an object, xxx is holding a pointer to the object. 
  
  Let xxx be class
  Class._class = {}
  
  Now,
  c.class.xxx changes d.class.xxx, as long as class is the same object in both cases.
*/

/* new operator runs twice when operand is a function: one without arguments and one with.
   Please extend only in the initialize method.
*/ 

Function.prototype.extend = function(superclass, args){
  var that = this
  
  var s = new superclass()
  s.keys().each( function(k) { 
       if (typeof(that.prototype[k]) == "undefined")
         that.prototype[k] = s[k]; 
     } )

  superclass.keys().each( function(k) { 
       that.prototype[k] = superclass[k]; 
     } )

  if ( this.Class && this.Class.before_extended && ( typeof(this.Class.before_extended) == "function" ) )
    this.super.Class.before_extended.apply(this, args)
  
  if ( this.Class && this.Class.after_extended && ( typeof(this.Class.after_extended) == "function" ) )
    this.super.Class.after_extended(this)
		
}
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
Function.prototype.reflect = function(){
  var result
  var return_value = {}
  var calling_class = eval(this.name)

  function duplicate(original_method){
    calling_class.prototype[original_method + "$B"] = function(){
      var substitute = calling_class.prototype[original_method].apply(this, arguments)

  //this.clear()
  for (var i=0; i<substitute.length; i++)
    this[i] = substitute[i]

      return this
    }
    return [ original_method + "$B", calling_class.prototype[original_method + "$B"] ]
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
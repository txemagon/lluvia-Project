/**
 * @classDescription Creates a Expression.
 *
 * @param  {params}  List of parameters
 * @return {Expression}
 * @constructor
 */
Expression.prototype = new String("")
Expression.prototype.constructor = Expression

function Expression(formula){
  this.formula = formula || ""
}

Expression.prototype.toString = function () {
  return this.formula
}

Expression.prototype.toSource = function () {
  return this.to_s
}

Expression.prototype.valueOf = function () {
  return this.to_s
}

Expression.math = {
  constants: [ "E", "LN2", "LN10", "LOG2E", "LOG10E", "PI", "SQRT1_2", "SQRT2" ],
  functions: [ "abs", "acos", "asin", "atan", "atan2", "ceil", "cos", "exp", 
               "floor", "log", "max", "min", "pow", "random", "round", "sin", 
	       "sqrt", "tan" ]
}

Expression.parse = function(string){
  return string.split(/,/) // This doesn't work with commas inside strings, but tdd is driving us.  
}

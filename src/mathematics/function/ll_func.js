/**
 * @classDescription Creates a mathematical function.
 *
 * @param  {formula}
 * @param  {params}  List of parameters
 * @return {Func}
 * @constructor
 */

Func.prototype.constructor = Func

function Func(formula, param){
   if (arguments[0] instanceof Func)
     return new Func(arguments[0].formula, arguments[0].param)
   
   if (typeof(formula) != "string")
     return null;
   //todo: Change function formula to generate a syntactic tree
   this.formula = formula.replace( /\s+/g, "")
   this.param = this.sanitize_params(param)
}

Func.prototype.equals = function(model){
  if (!(model instanceof Func))
    model = new Func(model)
  return this.formula.replace(/\s+/g, "") == model.formula.replace(/\s+/g, "")
}

Func.prototype.value_of = function(){
  return this.formula
}

Func.prototype.value_in = function(param){
  var param = this.sanitize_params(param)
  var formula = this.formula
 
  for(var i in param){
     var rp = param[i]
     if (typeof(param[i]) === "function")
       rp = param[i]()

     if (param[i] instanceof Func)
       rp = param[i].value_in()

     formula = formula.replace( new RegExp("{" + i + "}", "g"), rp )
  }

  try{
   return eval(formula)
  } catch(err){
   return formula
  }
}

Func.prototype.set_param = function(param){
  this.param = this.sanitize_params(param)
  return this
}

Func.prototype._in = function(param){
  var that = this
  param = this.sanitize_params(param)
  return function(){
    return that.value_in(param)
  }
}

Func.prototype.sanitize_params = function(param){
    param = param || this.param || {}
    try{ param = param.plain() } catch(err){;}
    return param
}

Func.prototype.add = function(){
  var func = this
  for (var i=0; i<arguments.length; i++)
      func = new Func(func.formula + " + " + new Func(arguments[i]).formula)
  return func
}

Func.prototype.add$B = function(){
   this.formula = this.add.apply(this, arguments).formula
   return this
}

Func.prototype.sub = function(){
  var func = this
  for (var i=0; i<arguments.length; i++)
      func = new Func(func.formula + " - (" + new Func(arguments[i]).formula + ")")
  return func
}

Func.prototype.sub$B = function(){
   this.formula = this.sub.apply(this, arguments).formula
   return this
}


Func.prototype.mul = function(){
 var func = new Func( "(" + this.formula + ")" )
  for (var i=0; i<arguments.length; i++)
      func = new Func(func.formula + " * (" + new Func(arguments[i]).formula + ")")
  return func
}

Func.prototype.mul$B = function(){
   this.formula = this.mul.apply(this, arguments).formula
   return this
}

Func.prototype.div = function(){
 var func = new Func( "(" + this.formula + ")" )
  for (var i=0; i<arguments.length; i++)
      func = new Func(func.formula + " / (" + new Func(arguments[i]).formula + ")")
  return func
}

Func.prototype.div$B = function(){
   this.formula = this.div.apply(this, arguments).formula
   return this
}

Func.prototype.method_missing = function (method, obj, params){ 

    if (params && params[0] == "")
      params.shift()
    if ( Math[method] === "undefinded" || !( Math[method] instanceof Function ))
      throw "TypeError: " + obj + "." + method + "is not a function."
    if (params && (params instanceof Array) )
      for(var i=0; i<params.length; i++)
        params[i] = (eval(params[i]) instanceof Object)? eval(params[i]).value_of() : eval(params[i])
      
    params.unshift(this.formula.toString())
    while (params[params.length-1] == null)
       params.pop()
    return new Func(method + "(" + params.join(',') + ")")
}

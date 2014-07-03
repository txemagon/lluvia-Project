/**
 * @classDescription Creates an angular magnitude.
 *
 * @param  {}
 * @return {Angle}
 * @constructor
 */
Angle.prototype.constructor = Angle
Angle.mode = "rad"  // This is a representational feature. Internally always rad.
Angle.valid_modes = ["rad", "deg"]

var PI = Math.PI

function Angle(){
  var that = this
  this._value
  
  function parseInput(args){
    if (typeof(args[0] === "number"))
      that._value = args[0]
    if (typeof(args[0]) === "string"){
       var formula = args[0].replace(/\s+/g, "")
       formula = formula.replace(/pi/gi, "PI").replace(/PI/g, Math.PI)

       var k = formula.indexOf("º") == -1 ? 1 : Math.PI / 180
       that._value = k * eval(formula.match( /[^º]*/ ).toString())
    }
  }
  
  if (arguments.length > 0)
    parseInput(arguments)
}

Angle.prototype.valueOf = function(){
  return this._value
}

Angle.prototype.canonical = function(){
  var canon = this.value()
  var sign = canon  > 0 ? 1 : -1 
  while (canon > 2 * Math.PI || canon < 0)
    canon -= (sign) * 2 * Math.PI
  return canon
}

Angle.prototype.rounds = function(){
  var canon = this.value()
  var rounds = 0
  var sign = canon  > 0 ? 1 : -1 
  while (canon > 2 * Math.PI || canon < 0){
    canon -= (sign) * 2 * Math.PI
    rounds += sign
  }
  return rounds
}

Angle.prototype.equals = function(angle){
  var max = angle.value_of() > this.value_of() ? angle.value_of(): this.value_of();
  var min = angle.value_of() + this.value_of() - max
  while (max > min)
    max -= 2 * Math.PI
  return max == min
}


Angle.prototype.to_str = function(mode){ 
  mode = mode || Angle.mode
  mode = mode.toLowerCase()
  
  if (Angle.mode == "deg")
    return Angle.to_deg(this)
    
  return this.value()
}

/* Class Methods */

Angle.to_deg = function (angle){
  if (! (angle instanceof Angle) )
    angle = new Angle(angle)
  return angle.value() * 180 / Math.PI
}

/**
* classDescription Creates a Complex number a +ib
*
* @param {Vector || Array[number,number]}
* @return {Complex}
* @constrcutor
*/ 
Complex.prototype.constructor = Complex    
Complex.prefix_sep = false  // Set whether the imaginary unit must precede the imaginary term
Complex.sep = "i"          // Some people prefer letter j (electricity, etc.)
Complex.valid_binomial_sep = ["i", "j"]
Complex.valid_polar_sep    = [";", ":", "\\|", "\\("]
Complex.output_mode = "binomial"
Complex.valid_output_modes = ["binomial", "polar", "exponential"]

//Class Constructor
function Complex () {
    /**
     *	VALID INPUT!
     *
     *   PARAMETER TYPES
     * ([Number])*
     */

  var that = this
  this._real = 0
  this._img  = 0
  this._k_pi = 0

  function parse_input(args){
    if (args[0] instanceof Complex){
     that._real = args[0].real()
     that._img  = args[0].img()
    }

    if (args[0] instanceof Array){
      that._real = args[0][0] || 0
      that._img  = args[0][1] || 0
    }

    if (args.length == 2 && 
	typeof(args[0]) == "number" ||
	typeof(args[1]) == "number" )
	if (typeof(args[2]) == "string" && args[2][0].toLowerCase() == "p")
	  args[0] = "" + args[0] + ";" + args[1]
      else{
        that._real = args[0] || 0
        that._img  = args[1] || 0
      }

    if ( typeof(args[0]) == "string"){
      var text = args[0].replace(/,/g, ".")
      if (Complex.is_valid_binomial(args[0])){
	   that._real = eval( Complex.get_members("real", text).join(" ") ) || 0
	   that._img  = eval( Complex.get_members("img" , text).join(" ") ) || 0
      }
      if (Complex.is_valid_polar(args[0])){
         var mod = eval( Complex.get_members("mod", text).join(" ") ) || 0
         var ang = new Angle( Complex.get_members("arg", text) )
         var arg = ang.value() || 0

	   that._real = mod * Math.cos( arg )
	   that._img  = mod * Math.sin( arg )
	   that._k_pi = ang.rounds()
      }
    }
  }

  if (arguments.length != 0)
    parse_input(arguments)
}

Complex.prototype.real = function(){
  return this._real
}

Complex.prototype.re = function(){
  return this.real()
}

Complex.prototype.img = function(){
  return this._img
}

Complex.prototype.im = function(){ // This is a conveninent alias
  return this.img()
}

Complex.prototype.imag = function(){ // This is a conveninent alias
  return this.img()
}

Complex.prototype.imaginary = function(){ // This is a conveninent alias
  return this.img()
}

Complex.prototype.valueOf = function(){
  return [this.real(), this.img()]
}

Complex.prototype.to_str = function(mode){
  mode = mode || Complex.output_mode.toLowerCase()
  mode = mode.toLowerCase()
  if ( mode[0] == "p" )  // Polar output
    return "polar"
  return this.real() + _dress_img(this.img())  // Binomial is the default
}

Complex.prototype.toString = function(){
  return this.to_str()
}

Complex.prototype.equals = function(re, im){
  var model 

  if ( typeof(re) == "number" || typeof(im) == "number")
       model = new Complex(re, im)
  else 
         model = new Complex(re)

  return _$same_number(model.real(),this.real()) && _$same_number(model.img(), this.img())
}

Complex.prototype.identical = function(re, im){
  var model 

  if ( typeof(re) == "number" || typeof(im) == "number")
       model = new Complex(re, im)
  else 
         model = new Complex(re)

  return _$same_number(model.real(),this.real()) && 
         _$same_number(model.img(), this.img() ) &&
         _$same_number(model._k_pi, this._k_pi)  
}

Complex.prototype.is_real$U = function(){
  return this.img() == 0
}

Complex.prototype.is_img$U = function(){
  return this.real() == 0
}

Complex.prototype.is_im$U = function(){
  return this.is_img$u()
}

Complex.prototype.is_imag$U = function(){
  return this.is_img$u()
}

Complex.prototype.is_imaginary$U = function(){
  return this.is_img$u()
}

Complex.prototype.module = function(){
  var r = this.real();
  var i = this.img();
  return Math.sqrt( r * r + i * i )
}

Complex.prototype.arg = function(){
  // We may need a class for the arguments. is fi == fi + 2PI?
}

Complex.prototype.argument = function(){ // This is a convenient alias
  return this.arg()
}

/* Private functions */

Complex.get_members = function(real, text){
  real = real.toLowerCase()
  
  if (real[0] == "r" || real[0] == "i"){ // In case is a binomial expression
  
    real = real.indexOf("r") == 0
    var terms = _split_terms(text)
    var result = []
    terms.each(function(el){
       if (real && !el.include_some_of$U(Complex.valid_binomial_sep))
         result.push(el)
       if (!real && el.include_some_of$U(Complex.valid_binomial_sep))
         result.push(el.replace(new RegExp("[" + Complex.valid_binomial_sep +"]", "g"), ""))
       })
    return result
  
  }else{
    var module = real[0] == "m"
    text = text.replace(/\s+/g, "")
    if (module)
      return text.match( /^[\d\.,]+/ )
    else{
      return text.match( new RegExp( "[" + Complex.valid_polar_sep.join("") + "](.*)$") )[1] || 0
      }
  }
    
}

Complex.is_valid_binomial = function (text){
  text = text.replace(/\s/g, "")
  return text.search(new RegExp( "[^"+ Complex.valid_binomial_sep.join("") + "\\d\\.,\\+-]" )) == -1 &&
         _complex_not_at_the_same_time( text, ["\\.", ","]) && 
         _complex_not_at_the_same_time(text, Complex.valid_binomial_sep)
}

Complex.is_valid_polar = function (text){
  text = text.replace(/\s/g, "").replace(/;;/g, ";")
  return text.search( new RegExp("^[\\d\.,]+[" + Complex.valid_polar_sep + "].*º?$", "g") ) != -1 &&
         _complex_not_at_the_same_time( text, ["\\.", ","]) && 
         !Complex.is_valid_binomial(text)
 }
  
function _append_complex_sep( term ){
  if (Complex.prefix_sep)
    return Complex.sep + term
  return term + Complex.sep
}

function _dress_img(term){
  var sign = term < 0 ? " - " : " + "
  return sign + _append_complex_sep(Math.abs(term))
}

function _split_terms(text){
  var terms = []
  text.split("+").each(function(el){ 
    el.split("-").each_with_index( function (subel, index){
      if (subel.length != 0)
        subel = (index == 0? "+" : "-" ) + subel 
      if ( (subel.search(/\d/) == -1) &&
	   subel.include_some_of$U(Complex.valid_binomial_sep) )
        subel += "1"
      terms.push(subel)
    })
  })
 
  return terms
}

function _complex_not_at_the_same_time(text, incompatibilities){
  var counters = {}
  for (var i=0; i<incompatibilities.length; i++)
    counters[incompatibilities[i]] = 0;
    
  incompatibilities.each(function(el){
        if (text.search(el) != -1)
        counters[el] = 1
      })
  var sum = 0
  for (var i=0; i<incompatibilities.length; i++)
    sum += counters[incompatibilities[i]];
  
  return sum < 2
}

function _$same_number(op1, op2){
  return Math.abs(op1 - op2) < Object._$NUM_ERR
}

// //Instance Adition (Insertion)
// Complex.prototype.add$B = function() {
//   if (arguments.length > 1) throw('Unexpected number of arguments')
//   else if(arguments[0] instanceof Complex) {
//     this.real += arguments[0].real
//     this.img += arguments[0].img
//     this.mod = mod(this.real,this.img)
//     this.arg = arg(this.real,this.img,0)
//     return this
//    }
//   else {
//     if (typeof arguments[0][0] != "number" || typeof arguments[0][1] != "number")
//       throw('Unexpected type of argument')
//     else {	
//     this.real += arguments[0][0]
//     this.img += arguments[0][1]
//     this.mod = mod(this.real,this.img)
//     this.arg = arg(this.real,this.img,0)
//     return this
//     }
//   }
// }
// //Instance Substraction (Insertion)
// Complex.prototype.subs$B = function(){
//   if (arguments[0] instanceof Complex) {
//     cs = new Complex([0,0])
//     cs.real = -arguments[0].real
//     cs.img = -arguments[0].img    
//   }
//   else {
//     var cs = [0,0]
//     cs[0]=-arguments[0][0]
//     cs[1]=-arguments[0][1]
//   }
//   this.add$B(cs)
//   return this
// }
// //Instance Multiplication
// Complex.prototype.mult$B = function(){
//  if(arguments.length > 1) throw('Two many parameters for mult()')
//  else if(arguments[0].length > 2) throw('Two many parameters for mult()')
//  else { 
//     csol = new Complex([0,0])
//     if(arguments[0] instanceof Complex) {
//       csol.real = this.real*arguments[0].real - this.img*arguments[0].img
//       csol.img = this.real*arguments[0].img + this.img*arguments[0].real
//       csol.mod = mod(csol.real,csol.img)
//       csol.arg = arg(csol.real,csol.img,0)
//       return csol
//     }
//     else if(typeof arguments[0][0] == "number" && typeof arguments[0][1] == "number"){
//       csol.real = this.real*arguments[0][0] - this.img*arguments[0][1]
//       csol.img = this.real*arguments[0][1] + this.img*arguments[0][0]
//       csol.mod = mod(csol.real,csol.img)
//       csol.arg = arg(csol.real,csol.img,0)
//       return csol
//     }
//     else if(arguments.length == 1 && typeof arguments[0] == "number"){
//       csol.real = arguments[0]*this.real
//       csol.img = arguments[0]*this.img
//       csol.mod = mod(csol.real,csol.img)
//       csol.arg = arg(csol.real,csol.img,0)
//       return csol
//     }
//     else throw('Unexpected type of parameters for mult()')
//   }
// } 

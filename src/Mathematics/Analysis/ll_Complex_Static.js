
// Complex.prototype.constructor = Complex;
// /*Data input validation: All the methods in this Class only accept
//                 - Complex Class Objets
//                 - Two Dimensional Coordinates (Img,Real)
//                 - Arrays [ Complex | Two Dimensional Coordinates (Img, Real)] 
//    Now we declare the validation method who ensures the data really match with the above conditions.
// */
// //The module method [Attribute of Class Complex]
// function mod (a,b) {return Math.sqrt(Math.pow(a,2) + Math.pow(b,2))}
// /*The Principal Value method [Attribute of Class Complex]
// Usage: arg (Real, Img, Interval(Optional)) where options are:
//                  1 .- Tangent half-angle formula [Arg: C-{0} --> (-Pi,Pi]]
//             default.- [Arg: C - {0} --> [0, 2Pi)
// */
// function arg (a,b,det) {
//   if (det == 1) { 
//     if ( a>0 || b!=0) {return 2*Math.atan(b/(Math.sqrt(Math.pow(a,2) + Math.pow(b,2)) + a))  }
//   else if ( a<0 && b==0) {return Math.PI}
//   else {return 'undefined'}    
//   }
//   else{ 
//     var c = 0;
//     if (a>0)                c = Math.atan(b/a)
//     else if (b>0)           c = (Math.PI)/2 - Math.atan(a/b)
//     else if (b<0)           c = -(Math.PI)/2 - Math.atan(a/b)
//     else if (a<0 && b>=0)   c = Math.PI + Math.atan(b/a)
//     else                    c = -Math.PI + Math.atan(b/a)
//     if (c < 0)       return c + 2*(Math.PI)
//     else             return c
//   }
// }
// //The congujation method
// function cong() {
//   if(arguments.length > 1) throw('Two many parameters for cong()')
//   else if(arguments[0].length > 2) throw('Two many parameters for cong()')
//   else { 
//     csol = new Complex([0,0]) 
//     if(arguments[0] instanceof Complex) {
//     csol.real = arguments[0].real
//     csol.img = -arguments[0].img
//     csol.mod = mod(csol.real,csol.img)
//     csol.arg = arg(csol.real,csol.img,0)
//     return csol
//     }
//     else if(typeof arguments[0][0] == "number" && typeof arguments[0][1] == "number"){
//     csol.real = arguments[0][0]
//     csol.img = -arguments[0][1]
//     csol.mod = mod(csol.real,csol.img)
//     csol.arg = arg(csol.real,csol.img,0)
//     return csol
//     }
//     else throw('Unexpected type of parameters for cong()')
//   }
// }         
// //Adition 
// Complex.add = function() {
//   csol = new Complex([0,0]) 
//   for(i=0; arguments.length > i; i++){csol.add$B(arguments[i])}
//   return csol
// }
// //Substraction
// Complex.subs = function() {
//   csol = new Complex([0,0])
//   for(i=0; arguments.length > i; i++){csol.subs$B(arguments[i])}
//   return csol
// }  
// //Multiplication
// Complex.mult = function() {
//   csol = new Complex([1,0])
//   for(i=0; arguments.length > i; i++){csol.mult$B(arguments[i])}
//   return csol
// }  
//   

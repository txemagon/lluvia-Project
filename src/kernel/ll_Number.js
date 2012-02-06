
Number.ERROR = 0.00001

Number.eql$U = function(model, value){
   if (typeof(model) === "number")
     return (model > (value - Number.ERROR)) && (model < (value + Number.ERROR))
   return this == model
}


Number.ERROR = 0.00001

Number.eql$U = function(model, value){
   if (typeof(model) === "number")
     return (model > (value - Number.ERROR)) && (model < (value + Number.ERROR))
   return this == model
}

isNumber = is_number = is_a_number = isANumber = isNumber$U = is_number$U = is_a_number$U = isANumber$U = function(op){ return !isNaN(op) }

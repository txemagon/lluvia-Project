/**
* @Class Path
*
* Line composed by a set of lines.
*
* @constructor Path
*
* @param {Array} lines Array of lines that form the path
* @property {Array} summary Internal variable for mapping lambdas.
* @property {Number} total_length Total length of the line.
*
*/

Path.prototype = new Array
extend(Path, Line)
Path.prototype.constructor = Path

function Path(lines){
	this.summary = []
	this.total_length = 0
}
/**
 * @method lambda_to_line
 * Given a lambda for the path returns de number of line and the lambda of that line
 */
Path.prototype.lambda_to_line = function(path_lambda){

   if (path_lambda < 0 || path_lambda > 1)
      throw "Invalid lambda: " + path_lambda + ". Must be in [0,1]."

   var locator = {
      line: 0,
      lambda: 0
   }

   for (var i=0; i<this.length; i++)
   if (this.summary[i].range.lambda1 < path_lambda)
      locator.line = i

   locator.lambda = ( path_lambda - this.summary[locator[line]].range.lambda0 ) / (this.summary[locator[line]].range.lambda1 - this.summary[locator[line]].range.lambda0)

   return locator
}

/**
 * @method at
 * @static
 *
 *  Calculates the point of the path defined by lamba
 *
 * @param  {Number} lambda Parameter to calculate the point.
 *
 * @return {Object} Point of the curve as a Vector.
 */
Path.prototype.at = function(lambda){
   lambda = lambda || 1
   var local = lambda_to_line(lambda)

   return this[local.line].at(local.lambda)
}

/**
 * @method update_summary
 *
 * Paths a are composed by one or more lines. Thus it maps global
 * lambdas into line local ones. summary is an internal property to
 * perform this task fluently.
 *
 * Every time a Line is added or removed this property ought to be updated.
 */
Path.prototype.update_summary = function() {
   this.total_length = 0

   /* Calculate segments lengths */
   for (var i=0; i<this.length; i++){
      var new_length = this[i].get_arc_length()
      this.summary[i] = { arc_length: new_length }
      this.total_length += new_length
   }

   /* Map lambdas*/
   var acumulated_length = 0
   for (var i=0; i<this.length; i++){
      acumulated_length += this.summary[i].arc_length
      this.summary[i].range = {
         lambda0: i ? this.summary[i-1].range.lambda1 : 0,
         lambda1: acumulated_length / this.total_length
      }
   }
}

Path.overrided_functions = {
   Line: ["push", "pop", "shift", "2splice", "unshift"],
   Path: ["concat"]
}

/**
 * @method lovely_extend_Array
 * Overrides Array methods restricting its arguments to Lines or Paths.
 */
Path.lovely_extend_Array = function() {

   Path.overrided_functions.self_keys().each(function(type) {
       var functions = Path.overrided_functions[type]

       for (var i=0; i<functions.length; i++){
          var fn_name  /* function name without numeric part */
          /* Initial parameter to apply restricions on */
           var init_param = parseInt(functions[i])
           if (isNaN(init_param)){
              init_param = 0
              fn_name = functions[i]
           } else
              fn_name = functions[i].replace(/\d+/, "")

           /* Overrided function delegator definition */
           Path.prototype[functions[i]] = function(){
              var return_value
              for (var i=init_param; i<arguments.length; i++)
                 if (!(arguments[i] instanceof eval(type)))
                    throw "Path#" + functions[i] + " Error: Only type " + type + " allowed as argument.\n\n" + arguments[i].toSource()

               return_value = Array.prototype[functions[i]].apply(this, arguments[i])
               this.update_summary()

               return return_value
           }
       }
   })
}

Path.lovely_extend_Array()

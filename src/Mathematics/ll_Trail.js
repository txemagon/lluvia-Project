/**
 * @classDescription Factory to extend objects and keep history of them.
 *
 * @param  {obj}  
 * @return {Object} Returns the same object, but extended.
 * @constructor
 */
 
 Trail.prototype.constructor = Trail
 
 function Trail(obj){
   obj.trail = []
   if (obj instanceof Func)
     ;//obj.extend(Trail)
 }

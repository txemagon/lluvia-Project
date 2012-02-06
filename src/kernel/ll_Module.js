Module.prototype.constructor = Module
function Module(){
  var self = this instanceof Function ? this : eval(this.constructor.name)
  var that = this
  
  if (this instanceof Function)
    try{self.initialize()}catch(err){;}
  else{
    try {this.initialize.apply(this, arguments)}catch(err){;}
  }
}

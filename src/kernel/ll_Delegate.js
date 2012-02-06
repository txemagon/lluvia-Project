function Delegate(class_name){
  this.delegate_class = eval(class_name)
}

Delegate.prototype.method_missing = function(method, params){
  return this.delegate_class[method].call(this, params)
}

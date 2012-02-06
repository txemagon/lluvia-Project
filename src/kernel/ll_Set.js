Set.prototype = new Array
Set.prototype.constructor = Set
Set.prototype.super = Array

function Set(){
  Array.apply(this, arguments)
}

Set.prototype.inner_data = function(){
  var inner = []
  for (var i=0; i<this.length; i++)
    inner.push(this[i])
  return inner
}

Set.prototype.push = function(obj){
    if (!this.inner_data().include$U(obj)){
      this[this.length] = obj
      this.length++
    }
}

Set.prototype.clear$B = function(){
  this.splice(0, this.length)
}

Set.prototype.toSource = function(){
    return this.inner_data().toSource()
}

Set.prototype.toString = function(){
    return this.inner_data().toString()
}


function Bezier(){
    this.handlers = []
    if(arguments.length > 2)
	for(var i=0; i<(arguments.length-1); i++)
	    this.handlers.push(new Bezier(arguments[i], arguments[i+1]))
    else
	for(var i=0; i<arguments.length; i++)
	    this.handlers.push(arguments[i])
    this.trail = []
}

Bezier.prototype.find = function (l){
  var aux =null
  var p = this.handlers.concat()
  for(; (p.length > 2 || (p[0].constructor.name == "Bezier" || p[1].constructor.name == "Bezier") ) ;){
      if(p[0].constructor.name == "Bezier")
	  p.push(p[0].find(l))
	  
      else
	  if(p[1].constructor.name != "Bezier")
	      p.push(new Bezier(p[0], p[1]))
      p.splice(0, 1)
  }
  aux = p[0].segment(p[1], l)
  return new Point(aux.x, aux.y)
}


Bezier.prototype.raster = function(step){
	if(step <= 0)
		throw "raster step is negative or cero"
    if(this.trail.length > 0)
	this.trail.splice(0, this.trail.length)
    for(var j=0; j<this.handlers.length; j++)
	if(this.handlers[j].constructor.name == "Bezier")
	    this.handlers[j].raster(step)
    for(var i=0; i<1; i+=step)
        this.trail.push(this.find(i))
}

Bezier.prototype.get = function(x){
	if(x < 0 || x > this.trail.length-1)
		throw "get is negative or too big"
	var aux = parseInt(x)
	if(x-parseInt(x) > 0){
	   aux = new Bezier(this.trail[aux], this.trail[aux+1])
	   aux = aux.find(x-parseInt(x))
	}
	else
		aux = this.trail[aux]
	return aux
}

Bezier.prototype.arc = function(s){
	if(s < 0 || s > 1)
		throw "arc is negative or too big 0-1"
	return this.get(s*(this.trail.length-1))

}
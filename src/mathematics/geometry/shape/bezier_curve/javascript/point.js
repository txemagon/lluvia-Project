function Point(x, y){
  this.x = x || 0
  this.y = y || 0
}

Point.prototype.segment = function(Point, t){
  var p = {x:0, y:0}
  var r = (t*this.distance(Point)) / ((1-t)*this.distance(Point))
  p.x = (this.x + (r*Point.x))/(1 + r)
  p.y = (this.y + (r*Point.y))/(1 + r)
  return p
}

Point.prototype.add_x = function (x){
    this.x = x
}

Point.prototype.add_y = function (y){
    this.y = y
}

Point.prototype.distance = function(Point){
  return Math.sqrt((Math.pow(( Point.x - this.x),2) + Math.pow((Point.y - this.y),2)))
}

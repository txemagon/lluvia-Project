Circle.prototype = new Line
Circle.prototype.constructor = Circle
Circle.super = Line

function Circle(center, radius) {

    this.center = center
    this.radius = radius
}

Circle.prototype.at = function(lambda) {
    return this.center.add(this.radius_at(lambda))
}

Circle.prototype.get_normal = function() {
    return this.radius_at.unit()
}

Circle.prototype.radius_at = function(lambda) {
    return this.radius.rotate(lambda * 2 * Math.PI)
}

Circle.prototype.get_inicial_point = function() {
    return this.center
}

Circle.prototype.get_intersection = function(Line) {

}
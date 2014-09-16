// Circle.prototype = new Line
// Circle.prototype.constructor = Circle
// Circle.super = Line


function Circle(center, radius) {

    this.center = center
    this.radius = radius
}
Circle.prototype.at = function(lambda) {
    var a = new Vector(this.center)
    return a.add(this.radius_at(lambda))
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
Circle.prototype.get_intersection = function(stg_line, angle) {
    var rl = new Vector(stg_line.director.get_coord(0), stg_line.director.get_coord(0), 0)
    var rc = new Vector(this.center[0], this.center[1], 0)
    var c = new Vector(stg_line.initial_point.get_coord(0), stg_line.initial_point.get_coord(1), 0)
    var pc = new Vector(c.subs(rc))
    var angle = Math.asin((rl.cross(pc)).module() / rl.dot(rc))
    alert((rl.cross(pc)).module() / rl.dot(rc))
    var radius_vector = new Vector(this.radius)
    var a = radius_vector.module() * Math.cos(angle)
    var b = radius_vector.module() * Math.sin(angle)
    return [a, b]
}

Circle.prototype.get_tangent = function(lambda) {
    var point = this.at(lambda)
    var a = new Vector(this.center)
        //pendiente
    var m = a.get_coord(1) - point.get_coord(1) / point.get_coord(0) - a.get_coord(0)
        //angle
    var angle = Math.atan(m)
    return angle
}
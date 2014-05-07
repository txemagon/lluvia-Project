WanderBehavior.prototype.draw = function (ctx) {
    var p = this.me.geo_data.position
    var v = this.me.geo_data.velocity
    var a = this.me.geo_data.acceleration

    ctx.strokeStyle = "silver"
    var xc = p.get_coord(0) + v.unit().get_coord(0) * this.D
    var yc = p.get_coord(1) + v.unit().get_coord(1) * this.D
    var xp = xc + this.R * Math.cos(this.theta)
    var yp = yc + this.R * Math.sin(this.theta)

    ctx.beginPath();
    ctx.arc( xc, yc, this.R, 0, Math.PI*2, true);

    /* Target  */
    ctx.moveTo( xp, yp )
    ctx.arc( xp, yp, 4, 0, Math.PI*2, true)

    ctx.closePath();
    ctx.stroke()

}

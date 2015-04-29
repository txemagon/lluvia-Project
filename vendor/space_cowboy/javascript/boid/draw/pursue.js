PursueBehavior.prototype.draw = function (ctx) {
    var my_p = this.me.position()
    var t_p  = [this.cached_target.Coord[0] + my_p[0],  this.cached_target.Coord[1] + my_p[1]]

    ctx.strokeStyle = "silver"
    ctx.beginPath()
    ctx.moveTo(my_p[0], my_p[1])
    ctx.lineTo(t_p[0], t_p[1])
    ctx.closePath()
    ctx.stroke()


    ctx.beginPath()
    ctx.arc(t_p[0], t_p[1], 10, 0, 2 * Math.PI, true)
    ctx.closePath()
    ctx.stroke()
}

FleeBehavior.prototype.draw = function (ctx) {
    var my_p = this.me.position()
    var t_p  = this.target.position()
    ctx.strokeStyle = "silver"
    ctx.beginPath()
    ctx.moveTo(my_p[0], my_p[1])
    ctx.lineTo(t_p[0], t_p[1])
    ctx.closePath()
    ctx.stroke()
}

SeekBehavior.prototype.draw = function (ctx) {

    var my_p = this.me.position()
    var t_p  = this.target.position()

    if (this.is_premodified_by$U('foresee')){
        t_p  = [this.cached_target.Coord[0] + my_p[0],  this.cached_target.Coord[1] + my_p[1]]
        ctx.beginPath()
        ctx.arc(t_p[0], t_p[1], 10, 0, 2 * Math.PI, true)
        ctx.closePath()
        ctx.stroke()
    }

    ctx.strokeStyle = "silver"
    ctx.beginPath()
    ctx.moveTo(my_p[0], my_p[1])
    ctx.lineTo(t_p[0], t_p[1])
    ctx.closePath()
    ctx.stroke()


    if (this.is_postmodified_by$U("arrival") &&
        this.arrival_distance < this.approach_distance ){
        ctx.strokeStyle = "teal"
    ctx.beginPath()
    ctx.arc(t_p[0], t_p[1], this.approach_distance, 0, Math.PI * 2, true )
    ctx.closePath()
    ctx.stroke()

    ctx.strokeStyle = "silver"
    ctx.beginPath()
    ctx.arc(t_p[0], t_p[1], this.arrival_distance, 0, Math.PI * 2, true )
    ctx.closePath()
    ctx.stroke()

    }
}

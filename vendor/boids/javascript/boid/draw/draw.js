
/**
 * @method draw
 *
 * Draws a boid into the world defined by the context
 *
 * @param {}   ctx Context in which to paint the Boid
 *
 */
Boid.prototype.draw = function(ctx){

    var p = this.geo_data.position;
    var v = this.geo_data.velocity;
    var a = this.geo_data.acceleration;

    ctx.fillStyle = this.colour
    ctx.strokeStyle = "black"
    ctx.beginPath();
    ctx.arc(p.get_coord(0), p.get_coord(1), 10, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(p.get_coord(0), p.get_coord(1), 12, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.stroke()

    /* Speed */
    ctx.strokeStyle = "black"
    ctx.beginPath();
    ctx.moveTo(p.get_coord(0), p.get_coord(1))
    ctx.lineTo(p.get_coord(0) + v.get_coord(0), p.get_coord(1) + v.get_coord(1))
    ctx.closePath();
    ctx.stroke()

    /* Acceleration */
    ctx.strokeStyle = "red"
    ctx.beginPath();
    ctx.moveTo(p.get_coord(0), p.get_coord(1))
    ctx.lineTo(p.get_coord(0) + a.get_coord(0), p.get_coord(1) + a.get_coord(1))
    ctx.closePath();
    ctx.stroke()

    if (this.focused){
        ctx.strokeStyle = "red"
        ctx.beginPath();
        ctx.arc(p.get_coord(0), p.get_coord(1), 18, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.stroke()

        this.brain.paint(ctx)
    }

}

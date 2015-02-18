
/**
 * @method draw
 *
 * Draws a boid into the world defined by the context
 *
 * @param {}   ctx Context in which to paint the Boid
 *
 */

Boid.prototype.draw = function(ctx, scene, cameras){
    if(ctx.constructor == THREE.WebGLRenderer)
        this.draw_webgl(scene, cameras)
    else
        this.draw_canvas(ctx)
}

Boid.prototype.draw_webgl = function(scene, cameras) {
    if(this.three_d_objects.length < 1){
        var sphere = new THREE.Mesh(
                new THREE.SphereGeometry(10 /*radius*/ , 16 /*segments*/ , 16 /*rings*/ ),
                new THREE.MeshLambertMaterial({
                    color: 0xFF0000
                })
            )
        sphere.position.set(this.geo_data.position.get_coord(0), this.geo_data.position.get_coord(1), -7)
        scene.add(sphere);
        this.three_d_objects.push(scene.children[(scene.children.length-1)])
    }
    else
        this.three_d_objects[0].position.set(this.geo_data.position.get_coord(0), this.geo_data.position.get_coord(1), -7)

};

Boid.prototype.draw_canvas = function(ctx){

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

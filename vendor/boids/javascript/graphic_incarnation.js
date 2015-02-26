var cartoon = new Incarnation("WebGl", "Boid", "Object", "Wall")

cartoon.Boid.mesh.body = function(boid){
    var sphere = new THREE.Mesh(
       new THREE.SphereGeometry(10 /*radius*/ , 16 /*segments*/ , 16 /*rings*/ ),
       new THREE.MeshLambertMaterial({
          color: boid.colour//incarnation.list[incarnation.search_list_element(boid.colour)]()
       })
    )
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    sphere.position.set(boid.geo_data.position.get_coord(0), boid.geo_data.position.get_coord(1), -7)
    sphere.update = function(boid){
        this.position.set(boid.geo_data.position.get_coord(0), boid.geo_data.position.get_coord(1), -7)
    }
    return sphere
}

cartoon.Boid.mesh.speed = function(){
	var cylinder = new THREE.Mesh(new THREE.CylinderGeometry(5, 5, 10, 10, 10, false), new THREE.MeshLambertMaterial());
    cylinder.castShadow = false;
    cylinder.receiveShadow = false;
    cylinder.overdraw = true;
    cylinder.rotation.z = 90* Math.PI / 180;
    cylinder.update = function(boid){
       this.position.set(boid.geo_data.position.get_coord(0)+10, boid.geo_data.position.get_coord(1), -7)
       this.rotation.x = boid.heading().Coord[0]
       this.rotation.y = boid.heading().Coord[1]
    }
    return cylinder
}

cartoon.Wall.mesh.structure = function(wall){
     var cuboMateriales = [
         new THREE.MeshLambertMaterial({color: wall.colour}),
         new THREE.MeshLambertMaterial({color: wall.colour}),
         new THREE.MeshLambertMaterial({color: wall.colour}),
         new THREE.MeshLambertMaterial({color: wall.colour}),
         new THREE.MeshLambertMaterial({color: wall.colour}),
         new THREE.MeshLambertMaterial({color: wall.colour})
     ];
     var cuboMaterial = new THREE.MeshFaceMaterial(cuboMateriales);

    var cuboGeometria = new THREE.CubeGeometry(wall.width, wall.height, 10);

    
    var cubo = new THREE.Mesh(cuboGeometria, cuboMaterial);
    cubo.position.set(wall.geo_data.position.get_coord(0)+wall.width/2, 150, -30);
    cubo.castShadow = false;
    cubo.receiveShadow = true;
    return cubo;
}

var cartoon_canvas = new Incarnation("CanvasDevice", "Boid", "Object")

cartoon_canvas.Boid.draw = function(boid, context){
    var p = boid.geo_data.position;
    var v = boid.geo_data.velocity;
    var a = boid.geo_data.acceleration;

    context.fillStyle = boid.colour
    context.strokeStyle = "black"
    context.beginPath();
    context.arc(p.get_coord(0), p.get_coord(1), 10, 0, Math.PI*2, true);
    context.closePath();
    context.fill();

    context.beginPath();
    context.arc(p.get_coord(0), p.get_coord(1), 12, 0, Math.PI*2, true);
    context.closePath();
    context.stroke()

    /* Speed */
    context.strokeStyle = "black"
    context.beginPath();
    context.moveTo(p.get_coord(0), p.get_coord(1))
    context.lineTo(p.get_coord(0) + v.get_coord(0), p.get_coord(1) + v.get_coord(1))
    context.closePath();
    context.stroke()

    /* Acceleration */
    context.strokeStyle = "red"
    context.beginPath();
    context.moveTo(p.get_coord(0), p.get_coord(1))
    context.lineTo(p.get_coord(0) + a.get_coord(0), p.get_coord(1) + a.get_coord(1))
    context.closePath();
    context.stroke()

    //if (this.focused){
      //  ctx.strokeStyle = "red"
       // ctx.beginPath();
       // ctx.arc(p.get_coord(0), p.get_coord(1), 18, 0, Math.PI*2, true);
       // ctx.closePath();
       // ctx.stroke()
   // }
}

var cartoon2_canvas = new Incarnation("CanvasDevice", "Boid", "Object")

cartoon2_canvas.Boid.draw = function(boid, context){
    var p = boid.geo_data.position;
    var v = boid.geo_data.velocity;
    var a = boid.geo_data.acceleration;


    context.beginPath()
    context.lineWidth="6"
    context.strokeStyle=boid.colour
    context.rect(p.get_coord(0), p.get_coord(1), 20, 20)
    context.stroke()

    /* Speed */
    context.strokeStyle = "black"
    context.beginPath();
    context.moveTo(p.get_coord(0), p.get_coord(1))
    context.lineTo(p.get_coord(0) + v.get_coord(0), p.get_coord(1) + v.get_coord(1))
    context.closePath();
    context.stroke()

    /* Acceleration */
    context.strokeStyle = "red"
    context.beginPath();
    context.moveTo(p.get_coord(0), p.get_coord(1))
    context.lineTo(p.get_coord(0) + a.get_coord(0), p.get_coord(1) + a.get_coord(1))
    context.closePath();
    context.stroke()

    //if (this.focused){
      //  ctx.strokeStyle = "red"
       // ctx.beginPath();
       // ctx.arc(p.get_coord(0), p.get_coord(1), 18, 0, Math.PI*2, true);
       // ctx.closePath();
       // ctx.stroke()
   // }
}
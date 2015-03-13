var cartoon = new Incarnation("WebGl", "Boid", "Immobile", "Mobile", "Object", "Wall")

cartoon.Boid.mesh.body = function(boid){
    var geometry = new THREE.Mesh(
       new THREE.SphereGeometry(10 /*radius*/ , 32 /*segments*/ , 32 /*rings*/ ),
       new THREE.MeshLambertMaterial({
          color: boid.colour//incarnation.list[incarnation.search_list_element(boid.colour)]()
       })
    )
    geometry.castShadow = true;
    geometry.receiveShadow = false;
    geometry.position.set(boid.geo_data.position.get_coord(0), boid.geo_data.position.get_coord(1), -7)
    geometry.update = function(boid){
        this.position.set(boid.geo_data.position.get_coord(0), boid.geo_data.position.get_coord(1), -7)
    }
    return geometry
}

cartoon.Boid.mesh.speed = function(){
	var geometry = new THREE.Mesh(new THREE.CylinderGeometry(5, 5, 10, 10, 10, false), new THREE.MeshLambertMaterial());
    geometry.castShadow = false;
    geometry.receiveShadow = false;
    geometry.overdraw = true;
    geometry.rotation.z = 90* Math.PI / 180;
    geometry.update = function(boid){
       this.position.set(boid.geo_data.position.get_coord(0)+10, boid.geo_data.position.get_coord(1), -7)
       this.rotation.x = boid.heading().Coord[0]
       this.rotation.y = boid.heading().Coord[1]
    }
    return geometry
}

cartoon.Mobile.mesh.body = function(boid){
    var geometry = new THREE.Mesh(
       new THREE.SphereGeometry(10 /*radius*/ , 32 /*segments*/ , 32 /*rings*/ ),
       new THREE.MeshLambertMaterial({
          color: boid.colour//incarnation.list[incarnation.search_list_element(boid.colour)]()
       })
    )
    geometry.castShadow = true;
    geometry.receiveShadow = false;
    geometry.position.set(boid.geo_data.position.get_coord(0), boid.geo_data.position.get_coord(1), -7)
    geometry.update = function(boid){
        this.position.set(boid.geo_data.position.get_coord(0), boid.geo_data.position.get_coord(1), -7)
    }
    return geometry
}

cartoon.Immobile.mesh.structure = function(wall){
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

var cartoon_canvas = new Incarnation("CanvasDevice", "Mobile", "Immobile", "Object")

cartoon_canvas.Mobile.draw = function(boid, context){
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

    context.font = "10px Georgia"
    context.fillStyle = 'black'
    context.fillText(boid.being_id + "", p.get_coord(0), p.get_coord(1))

    //if (this.focused){
      //  ctx.strokeStyle = "red"
       // ctx.beginPath();
       // ctx.arc(p.get_coord(0), p.get_coord(1), 18, 0, Math.PI*2, true);
       // ctx.closePath();
       // ctx.stroke()
   // }
}

cartoon_canvas.Immobile.draw = function(immobile, ctx){
    ctx.fillStyle = immobile.colour
    ctx.rect(immobile.geo_data.position.get_coord(0), immobile.geo_data.position.get_coord(1), immobile.width, immobile.height)
    ctx.fill()
}

var cartoon2_canvas = new Incarnation("CanvasDevice", "Mobile", "Immobile", "Object")
var img = null
img = new Image()
img.src = "images/pixel.png"
cartoon2_canvas.Mobile.draw = function(boid, context){
    var p = boid.geo_data.position;
    var v = boid.geo_data.velocity;
    var a = boid.geo_data.acceleration;
    var width = 15
    var height = 15

    //context.drawImage(img, p.get_coord(0), p.get_coord(1), 5, 5)
    context.beginPath();
    context.rect(p.get_coord(0), p.get_coord(1), width, height)
    context.fillStyle = boid.colour;
    context.fill();
    

    /* Speed */
    context.strokeStyle = "black"
    context.beginPath()
    context.moveTo(p.get_coord(0)+width/2, p.get_coord(1)+height/2)
    context.lineTo(p.get_coord(0) + v.get_coord(0), p.get_coord(1) + v.get_coord(1))
    context.closePath()
    context.stroke()

    /* Acceleration */
    context.strokeStyle = "red"
    context.beginPath()
    context.moveTo(p.get_coord(0)+width/2, p.get_coord(1)+height/2)
    context.lineTo(p.get_coord(0) + a.get_coord(0), p.get_coord(1) + a.get_coord(1))
    context.closePath()
    context.stroke()

    //if (this.focused){
      //  ctx.strokeStyle = "red"
       // ctx.beginPath();
       // ctx.arc(p.get_coord(0), p.get_coord(1), 18, 0, Math.PI*2, true);
       // ctx.closePath();
       // ctx.stroke()
   // }
}

cartoon2_canvas.Immobile.draw = function(immobile, context){
    context.beginPath();
    context.rect(immobile.geo_data.position.get_coord(0), immobile.geo_data.position.get_coord(1), immobile.width, immobile.height)
    context.fillStyle = immobile.colour
    context.fill();
    //context.lineWidth = 7;
    //context.strokeStyle = 'black';
    //context.stroke();
}

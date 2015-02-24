var cartoon = new Incarnation("WebGl", "Boid", "Object")

cartoon.Boid.mesh.body = function(boid){
    var sphere = new THREE.Mesh(
       new THREE.SphereGeometry(10 /*radius*/ , 16 /*segments*/ , 16 /*rings*/ ),
       new THREE.MeshLambertMaterial({
          color: boid.colour//incarnation.list[incarnation.search_list_element(boid.colour)]()
       })
    )
    sphere.position.set(boid.geo_data.position.get_coord(0), boid.geo_data.position.get_coord(1), -7)
    sphere.update = function(boid){
        this.position.set(boid.geo_data.position.get_coord(0), boid.geo_data.position.get_coord(1), -7)
    }
    return sphere
}

cartoon.Boid.mesh.speed = function(){
	var cylinder = new THREE.Mesh(new THREE.CylinderGeometry(5, 5, 10, 10, 10, false), new THREE.MeshNormalMaterial());
    cylinder.overdraw = true;
    cylinder.rotation.z = 90* Math.PI / 180;
    cylinder.update = function(boid){
       this.position.set(boid.geo_data.position.get_coord(0)+10, boid.geo_data.position.get_coord(1), -7)
       this.rotation.x = boid.heading().Coord[0]
       this.rotation.y = boid.heading().Coord[1]
    }
    return cylinder
}

var cartoon_canvas = new Incarnation("CanvasDevice", "Boid", "Object")
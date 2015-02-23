WebGl.prototype = new GraphicDevice
WebGl.prototype.constructor = WebGl

function WebGl(screen, drawable_obj, incarnation, camera) {
    var that = this

    function initialize() {
        GraphicDevice.call(that, screen)

        that.context = new THREE.WebGLRenderer({
            canvas: that.screen
        })
        that.context.setClearColor(0xFFFFFF, 1)
        that.scene = new THREE.Scene()
        that.cameras = []

        that.drawable = []
        that.merge_drawable_obj(drawable_obj)

        that.incarnation
        that.incarnation = incarnation || new Incarnation(function(scene, boid, drawable){
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
            scene.add(sphere)
            WebGl.merge_3d_object(boid, drawable, sphere)

            var cylinder = new THREE.Mesh(new THREE.CylinderGeometry(5, 5, 10, 10, 10, false), new THREE.MeshNormalMaterial());
            cylinder.overdraw = true;
            cylinder.rotation.z = 90* Math.PI / 180;
            cylinder.update = function(boid){
               this.position.set(boid.geo_data.position.get_coord(0)+10, boid.geo_data.position.get_coord(1), -7)
               this.rotation.x = boid.heading().Coord[0]
               this.rotation.y = boid.heading().Coord[1]
            }
            scene.add(cylinder);
            WebGl.merge_3d_object(boid, drawable, cylinder)
            
        })

        //that.create_3d_object()

        var aspect = that.screen.width / that.screen.height
        var view_angle = 45
        var near = 0.1
        var far = 10000
        that.cameras.push(that.camera = new THREE.PerspectiveCamera(
            view_angle,
            aspect,
            near,
            far))
        that.scene.add(camera)
        that.camera.position.z = 500
        that.camera.rotation.z = 180 * Math.PI / 180
        
        that.controls = new THREE.OrbitControls( that.cameras[0] );
        that.controls.addEventListener( 'change', that.render );
        that.cameras[0].lookAt({x:500, y:200, z:0});
        that.context.setSize(that.screen.width, that.screen.height)


        var sphere = new THREE.Mesh(
            new THREE.SphereGeometry(10 /*radius*/ , 16 /*segments*/ , 16 /*rings*/ ),
            new THREE.MeshLambertMaterial({
                color: 0xFFFF00
            })
        )

        that.scene.add(sphere);

        // lights
        var ambientLight = new THREE.AmbientLight(0x444444);
        that.scene.add(ambientLight);

        var directionalLight = new THREE.DirectionalLight(0xFFFFFF);
        directionalLight.position.set(0, 0, 1).normalize()
        that.scene.add(directionalLight);

        that.context.render(that.scene, that.camera);

    }

    if (arguments.length) 
        initialize()
}


WebGl.prototype.add_drawable_obj = function(drawable_obj){
    this.drawable.push({obj: drawable_obj, three_obj:[]})
    this.create_3d_object(this.drawable[this.drawable.length-1].obj)
}


WebGl.prototype.render = function(n){
    this.update()
    this.context.render(this.scene, this.camera);
}


WebGl.prototype.create_3d_object = function(drawable_obj){
    this.incarnation.list[this.incarnation.search_list_element(drawable_obj)](this.scene, drawable_obj, this.drawable)
}


WebGl.prototype.update = function(){
    for(var i = 0; i < this.drawable.length; i++)
        for(var j = 0; j < this.drawable[i].three_obj.length; j++)
           this.drawable[i].three_obj[j].update(this.drawable[i].obj)
}


WebGl.prototype.merge_drawable_obj = function(drawable){
    var drawable_obj = drawable || []
    //for(var i = 0; i<drawable_obj.length; i++){
      //this.drawable[i] = {obj: drawable_obj[i], three_obj:""}
      //this.create_3d_object(this.drawable[i].obj)
      //this.add_drawable_obj(drawable_obj[i])
    //}
}


WebGl.merge_3d_object = function(obj, drawable, three_obj){
  for(var i in drawable)
     if(obj == drawable[i].obj){
        drawable[i].three_obj.push(three_obj)
        break;
    }
}


WebGl.available$U = function() {
    
    var webgl = false
    var canvas = document.createElement('canvas')
    try {
        webgl = !!window.WebGLRenderingContext &&
            !!canvas.getContext('webgl')
    } catch (e) {
        try {
            webgl = !!window.WebGLRenderingContext &&
                !!canvas.getContext('experimental-webgl')
        } catch (e) {
            webgl = false
        }
    }
    return webgl
}
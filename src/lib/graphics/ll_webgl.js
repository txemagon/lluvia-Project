WebGl.prototype = new GraphicDevice
WebGl.prototype.constructor = WebGl

function WebGl(screen, drawable_obj, incarnation, camera) {
    var that = this

    function initialize() {
        GraphicDevice.call(that, screen)

        that.context = new THREE.WebGLRenderer({
            canvas: that.screen
        })
        that.context.setClearColor(0x000000, 1)
        that.scene = new THREE.Scene()
        that.cameras = []

        that.drawable = []
        //that.merge_drawable_obj(drawable_obj)
        // that.incarnation = incarnation || new Incarnation(function(scene, boid){
        //     var sphere = new THREE.Mesh(
        //        new THREE.SphereGeometry(10 /*radius*/ , 16 /*segments*/ , 16 /*rings*/ ),
        //        new THREE.MeshLambertMaterial({
        //           color: 0xFFFF00
        //        })
        //     )
        //     sphere.position.set(boid.geo_data.position.get_coord(0), boid.geo_data.position.get_coord(1), -7)
        //     scene.add(sphere)
        //     WebGl.merge_3d_object(obj, that.drawable, sphere)
            
        // })

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

WebGl.prototype.render = function(n){
    this.context.render(this.scene, this.camera);
}

WebGl.prototype.merge_drawable_obj = function(drawable_obj){
    for(var i = 0; i<drawable_obj.length; i++)
      this.drawable[i] = {obj: drawable_obj, three_obj:""}
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

WebGl.merge_3d_object = function(obj, drawable, three_obj){
  for(var i in drawable)
     if(obj == drawable[i].obj){
        drawable[i].three_obj = three_obj
        break;
    }
}
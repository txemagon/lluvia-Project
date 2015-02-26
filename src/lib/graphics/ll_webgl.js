WebGl.prototype = new GraphicDevice
WebGl.prototype.constructor = WebGl

function WebGl(screen, drawable_obj, incarnation, camera) {
    var that = this

    function initialize() {
        GraphicDevice.call(that, screen, drawable_obj, incarnation)

        that.context = new THREE.WebGLRenderer({
            canvas: that.screen,
            antialias:true
        })
        that.context.setClearColor(0xFFFFFF, 1)
        that.context.shadowMapEnabled = true;
        that.context.shadowMapType = THREE.PCFSoftShadowMap

        that.scene = new THREE.Scene()

        that.cameras = []

        //that.drawable = []
        that.merge_drawable_obj(drawable_obj)

        var aspect = that.screen.width / that.screen.height
        var view_angle = 45
        var near = 0.1
        var far = 1000000
        that.cameras.push(that.camera = new THREE.PerspectiveCamera(
            view_angle,
            aspect,
            near,
            far))
        that.scene.add(camera)
        that.camera.position.z = 500
        //that.camera.rotation.z = 180 * Math.PI / 180
        
        that.controls = new THREE.OrbitControls( that.cameras[0] );
        that.controls.addEventListener( 'change', that.render );
        that.cameras[0].lookAt({x:500, y:200, z:0});
        that.context.setSize(that.screen.width, that.screen.height)


        var sphere = new THREE.Mesh(
            new THREE.SphereGeometry(5 /*radius*/ , 60 /*segments*/ , 24 /*rings*/ ),
            new THREE.MeshLambertMaterial({
                color: 0xFFFF00
            })
        )
        sphere.castShadow = true

        that.scene.add(sphere);

        // lights
        var ambientLight = new THREE.AmbientLight(0x000000);
        that.scene.add(ambientLight);

        var directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1);
        //var directionalLight = new THREE.SpotLight(0xFFFFFF, 1)
        //directionalLight.position.set(0, 0, 500).normalize()
        directionalLight.position.set(-500,0,500)
        directionalLight.castShadow = true
        //directionalLight.onlyShadow = true
        //directionalLight.shadowCameraVisible = true
        directionalLight.shadowDarkness = 10;   
        directionalLight.shadowCameraRight    =  1000;
        directionalLight.shadowCameraLeft     = -1000;
        directionalLight.shadowCameraTop      = 1000; 
        directionalLight.shadowCameraBottom   = -1000;
        directionalLight.intensity = 2
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
    var obj = null
    for (var i in this.incarnation[this.incarnation.search_element(drawable_obj)].mesh){
        obj = this.incarnation[this.incarnation.search_element(drawable_obj)].mesh[i](drawable_obj)
        this.scene.add(obj)
        WebGl.merge_3d_object(drawable_obj, this.drawable, obj)
    }
}


WebGl.prototype.update = function(){
    for(var i = 0; i < this.drawable.length; i++)
        for(var j = 0; j < this.drawable[i].three_obj.length; j++)
        if("update" in this.drawable[i].three_obj[j] && typeof(this.drawable[i].three_obj[j].update) == "function")
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
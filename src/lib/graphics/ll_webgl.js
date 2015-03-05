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
        that.selected_camera = 0

        //that.drawable = []
        that.merge_drawable_obj(drawable_obj)

        var aspect = that.screen.width / that.screen.height
        var view_angle = 45
        var near = 0.1
        var far = 1000000
        that.add_camera(aspect, view_angle, near, far, 0, 0, 500)
        
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


/**
 * @method merge_drawable_obj
 * Merge the objects of the world, that we can draw.
 * 
 * @param  {Array}  drawable Drawable objects.
 */
WebGl.prototype.merge_drawable_obj = function(drawable){
    this.drawable = []
    var drawable_obj = drawable.slice() || []
    for(var i = 0; i<drawable_obj.length; i++)
      this.add_drawable_obj(drawable_obj[i])
}


/**
 * @method add_drawable_obj
 * Create new object, with two atributes, first is a pointer to a drawable object in the world,
 * second is an array of pointers to 3d drawable objects in the scene.
 * And push this object to the drawable array.
 * 
 * @param {Object} drawable_obj The new drawabla object.
 */
WebGl.prototype.add_drawable_obj = function(drawable_obj){
    this.drawable.push({obj: drawable_obj, three_obj:[]})
    this.create_3d_object(this.drawable[this.drawable.length-1].obj)
}


/**
 * @method create3d_object
 * Add to three_obj array the 3d objects that is form, using the incarnation.
 * Add the drawable objets to the scene.
 * 
 * @param  {Object} drawable_obj Drawable object
 */
WebGl.prototype.create_3d_object = function(drawable_obj){
    var obj = null
    for (var i in this.incarnation[this.incarnation.search_element(drawable_obj)].mesh){
        obj = this.incarnation[this.incarnation.search_element(drawable_obj)].mesh[i](drawable_obj)
        this.scene.add(obj)
        this.add_3d_object(drawable_obj, obj)
    }
}


/**
 * @method add_3d_object
 * Add the drawable object in the scene with drawable.three_obj array. Now our array contains a pointer to the scene object.
 * 
 * @param  {Object} obj       Drawable object
 * @param  {Object} three_obj Object 3d in the scene
 */
WebGl.prototype.add_3d_object = function(obj, three_obj){
  for(var i in this.drawable)
     if(obj == this.drawable[i].obj){
        this.drawable[i].three_obj.push(three_obj)
        break;
    }
}


/**
 * @method render
 * Render the scene, and update the 3d objects position.
 * 
 */
WebGl.prototype.render = function(){
    this.update()
    this.context.render(this.scene, this.cameras[this.selected_camera])
}


/**
 * @method update
 * Update the 3d objects.
 * 
 */
WebGl.prototype.update = function(){
    for(var i = 0; i < this.drawable.length; i++)
        for(var j = 0; j < this.drawable[i].three_obj.length; j++)
            if("update" in this.drawable[i].three_obj[j] && typeof(this.drawable[i].three_obj[j].update) == "function")
               this.drawable[i].three_obj[j].update(this.drawable[i].obj)
}


WebGl.prototype.change_camera = function(){
    if(this.selected_camera+1 >= this.cameras.length)
       this.selected_camera = 0
    else
       this.selected_camera ++
}


WebGl.prototype.add_camera = function(aspect, angle, near, far, x, y ,z){
    var camera = null
    var aspect = aspect
    var view_angle = angle
    var near = near
    var far = far
    this.cameras.push( camera = new THREE.PerspectiveCamera(
        view_angle,
        aspect,
        near,
        far))
    this.scene.add(camera)
    camera.position.z = z
    camera.position.x = x
    camera.position.y = y
}

/**
 * @method
 * Check WebGl is available.
 * 
 * @return {Bool}  
 */
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
/**
 * Boid's world
 *
 * @author Txema
 * @version 1.00 Aug, 2011
 */


/**
 * @class World
 *
 * Creates a World for handling boids.
 *
 * @constructor World
 * @param  {screen} World screen
 * @return {World}
 */

//Steps to build a new world from class device
World.prototype = new Device
World.prototype.constructor = World
World.prototype.super = Device

function World(screen, width, height) {

    /*function World sets the default parameter for the world unless given*/

    var that = this
    this.self_events = ["focus_boid", "new_boid"]

    this.screen = []
    this.width = width || 100 //meters
    this.height = height || 100
    this.start_time = null
    this.acceleration_max = 30
    this.velocity_max = 200
    this.boids = 0
    this.draw_bound = World.prototype.draw.bind(this)

    if (arguments.length)
        this.new_screen(screen)
    

    Device.call(that, null, null)
}

/**
 * @method new_screen
 * Adds a new GraphicDevice to the list of screens.
 *
 * ### Example
 *
 *     w.new_screen('screener2', CanvasDevice)
 *
 * where screener2 is the id of an HTML canvas element. See (@link lib.GraphicDevice GraphicDevice) for further information.
 * 
 * @param  {String | HtmlElement} [id]
 * @param  {Function} [Type=GraphicDevice] If no Type given then GraphicDevice.get_best_device_for is used.
 * @param  {Array} [incarnation] Contains two incarnations, one for create 3D objects, other to update the 3D objects.
 */
World.prototype.new_screen = function(id, Type, incarnation){
    var gd
    var boids = this.get_boids()
    if (Type == CanvasDevice || Type == WebGl)
        gd = new Type(id, boids, incarnation)
    else
        gd = GraphicDevice.get_best_device_for(id, boids, cartoon)
    this.screen.push(gd)
}


/**
 * @method new_canvas_screen
 * Adds a new CanvasDevice to the list of screens.
 * 
 * @param  {String | HtmlElement} [id]
 */
World.prototype.new_canvas_screen = function(id, incarnation){
    this.new_screen(id, CanvasDevice, incarnation)
}


/**
 * @method new_webgl_screen
 * Adds a new WebGlDevice to the list of screens.
 * 
 * @param  {String | HtmlElement} [id]
 */
World.prototype.new_webgl_screen = function(id, incarnation){
    this.new_screen(id, WebGl, incarnation)
}

/**
 * @method set_dashboard
 *
 * Sets a new World interface into the dashboard.
 *
 * @param  {(String | String[])...} name Name of the view to create a WorldInterface.
 *
 *
 * ###Example
 *      // Set dashboard for a world
 *      green_world = new World();
 *      green_world.set_dashboard('');
 *
 */
World.prototype.set_dashboard = function(name) {
    this.dashboard = new WorldInterface(name, this)
}

/**
 * @method width
 *
 * Sets the width of the world
 *
 * @param  {}
 *
 *
 * ###Example
 *      // Set the width
 *
 *
 *
 */
World.prototype.width = function() {
    if (arguments.length == 0)
        return this.width
    this.width = arguments[0]
}

/**
 * @method height
 *
 * Sets the height of the world
 *
 * @param  {}
 *
 *
 * ###Example
 *      // Set the height
 *
 *
 *
 */
World.prototype.height = function() {
    if (arguments.length == 0)
        return this.height
    this.height = arguments[0]
}


/**
 * @method has_born
 *
 * Brings a new Boid into the world.
 *
 * See Device#newMessage
 *
 * @fires new_boid
 *
 * @param  {}
 *
 *
 * ###Example
 *      // Bring Boid
 *
 *
 *
 */
World.prototype.has_born = function() {
    for (var i = 0; i < arguments.length; i++) {
        arguments[i].my_world = this
        this.register(arguments[i])
        //logger.innerHTML += this.newMessage("sync", "new_boid", arguments[i]).event.toSource() + "<br/>"
        this.fire_event(this.new_message("sync", "new_boid", arguments[i]))
    }
}

/**
 * @method get_boids
 *
 * Creates an array with all the Boids
 *
 * @param  {}
 *
 *
 * ###Example
 *      // Create array of Boids
 *
 *
 *
 */
World.prototype.get_boids = function() {
    return this.get(Boid)
}

/**
 * @method each_boid
 *
 * Sets a new World interface into the dashboard.
 *
 * @param  {(String | String[])...} name Name of the view to create a WorldInterface.
 *
 *
 * ###Example
 *      //
 *
 *
 *
 */
World.prototype.each_boid = function() {
    var that = this

    this.get_boids().each(function(el) {
        World.prototype.each_boid.yield(el)
    })
}

/**
 * @method start
 *
 * Starts the new World
 *
 * @param  {}
 *
 *
 * ###Example
 *      //
 *
 *
 *
 */
World.prototype.start = function() {
    var that = this
    this.start_time = new Date()
    this.get_boids().each(function(el) {
        el.start(that.start_time)
    })

    //this.screen[0].merge_drawable_obj(this.get_boids())
    //this.screen[0].create_3d_object()

    this.draw()
}

/**
 * @method draw
 *
 * Draw the canvas into the page
 *
 * @param  {}
 *
 *
 * ###Example
 *      //
 *
 *
 *
 */
World.prototype.draw = function() {
    var that = this
    for(var i = 0; i < this.screen.length; i++){
        var ctx = this.screen[i].context

        if(ctx.constructor != THREE.WebGLRenderer){
           ctx.clearRect(0, 0, 1000, 400)
           this.get_boids().each(function(el) {
            el.draw(ctx)
           })
        }
       else{
           // this.get_boids().each(function(el) {
             //  el.draw(ctx, that.screen[i].scene)
            //})
            this.screen[i].render()
       }
    }
    
    requestAnimationFrame(this.draw_bound)
}

/**
 * @method step
 *
 *
 *
 * @param  {DateTime} current_time Time ...
 *
 *
 * ###Example
 *      //
 *
 *
 *
 */
World.prototype.step = function(current_time) {
    var that = this
    current_time = current_time || this.now || new Date()
    this.each_boid(function(boid) {
        boid.update_physics(current_time)
    })
}

/**
 * @method is_one_second_from_begining
 *
 * Sets the start time of the world one second after the function is called
 *
 * @param  {}
 *
 *
 * ###Example
 *      //
 *
 *
 *
 */
World.prototype.is_one_second_from_begining = function() {
    this.start()
    var current_time = new Date(this.start_time.toString())
    current_time.setSeconds(this.start_time.getSeconds() + 1)
    current_time.setMilliseconds(this.start_time.getMilliseconds())

    this.step(current_time)
}

/**
 * @method show_boids
 *
 * Gets the Boids that currently exist in the world
 *
 * @param  {}
 *
 *
 * ###Example
 *      //
 *
 *
 *
 */
World.prototype.show_boids = function() {

    var logger = document.getElementById("logger")
    logger.innerHTML = ""
    var boids = 0
    this.each_boid(function(boid) {
        boids++
        logger.innerHTML += "<h3>Boid " + boids + "</h3>"
        logger.innerHTML += "Pos: " + boid.position() + "<br/>"
        logger.innerHTML += "Vel: " + boid.velocity() + "<br/>"
        logger.innerHTML += "Acc: " + boid.acceleration() + "<br/>"
        logger.innerHTML += "<br/>"
    })
}

/**
 * @method running_steady
 *
 *
 *
 * @param  {DateTime} processors_time Time of the processor
 *
 *
 * ###Example
 *      //
 *
 *
 *
 */
//World.prototype.running_steady = function(processors_time) {
//this.show_boids()
//var that = this
//this.now = processors_time || new Date()
/* Boid#run is called from the child runner */
//this.eventDispatcher.shift()
//this.draw()
//}

/**
 * @method visible_for
 *
 * Creates an array with the Boids that the referred Boid can see
 *
 * @param  {Vector} position Position of the Boid
 * @param  {Vector} vision Vision of the Boid taken as center
 *
 *
 * ###Example
 *      //
 *
 * todo: Add a type of boid to see. I want to see sheeps
 *
 */
World.prototype.visible_for = function(position, heading, vision) {
    var that = this
    vision = vision.radius * vision.radius
    var visible = []
    this.each_boid(function(boid) {
        var x1 = position.get_coord(0)
        var y1 = position.get_coord(1)
        var dx = boid.geo_data.position.get_coord(0) - x1
        var dy = boid.geo_data.position.get_coord(1) - y1
        if (dx * dx + dy * dy < vision)
            visible.push(boid)
    })
    return visible
}

/**
 * @method new_boid
 *
 * Creates a new boid
 *
 * @param  {String} color Color of the Boid
 * @param  {Vector} geo_data Position, velocity and acceleration of the Boid
 *
 *
 * ###Example
 *      //
 *
 *
 *
 */
World.prototype.new_boid = function(config, block) {

    var b = typeof(block) === "undefined" ? new Boid(config) : new Boid(config, block)

    this.boids++
    b.id = this.boids
    this.has_born(b)
    for(var i = 0; i<this.screen.length; i++)
       this.screen[i].add_drawable_obj(b)
    return b
}

/**
 * @method start_and_run
 *
 * Starts the Boid and makes it run
 *
 * @param  {}
 *
 *
 * ###Example
 *      //
 *
 *
 *
 */
World.prototype.start_and_run = function() {
    this.start()
    this.run()
}

/**
 * @method attend_focus_boid
 *
 *
 *
 * @param  {DateTime} date Time of the message
 * @param  {String} mssg Message
 *
 *
 * ###Example
 *      //
 *
 *
 *
 */
World.prototype.attend_focus_boid = function(date, mssg) {
    mssg.current++;
}

/**
 * @method new_boid_of
 * Creates a new boid with a particular behaviour: seek, flee, etc.
 *
 * @param {Function} class_name Name of the derived class of boid.
 * @param {Object} config Configuration object to provide to the boid constructor.
 *
 */
World.prototype.new_boid_of = function(class_name, config) {
    var b = new class_name(config)
    if (this[class_name])
        this[class_name]++
        else
            this[class_name] = 1
    this.boids.total++
    this.has_born(b)
    for(var i = 0; i<this.screen.length; i++)
       this.screen[i].add_drawable_obj(b)
    return b
}

/**
 * @method method_missing
 * Provides dynamic method new_bois_as_<ClassName>
 */
World.prototype.method_missing = function(method, obj, params) {

    if (/new_boid_as_/.test(method)) {
        var subtype = method.match(/new_boid_as_(\w*)/)[1].capitalize()
        return this.new_boid_of(eval("" + subtype), params[0])
            //todo: This is dependant of bad ll_Exception params analysis
    }
    return this.super.method_missing.apply(this, arguments)
}
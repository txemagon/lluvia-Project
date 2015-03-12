Mobile.prototype = new Being
Mobile.prototype.constructor = Mobile

function Mobile(config_object, block){

    var that = this
    var args = arguments

    if (typeof(block) === "undefined")
        if (typeof(config_object) === "function" ){
            block = config_object
            config_object = new Hash()
        }


        function initialize(){
            Being.call(that)	
            var config = new Hash()

            that.last_heading = new Vector(0, 1)
            //that.my_world = null
            that.last_time = that.current_time = null
            /* Overridable configuration */

            var default_config = {
                geo_data: {
                    velocity: new Vector(Math.floor(Math.random()*40), Math.floor(Math.random()*40)),
                    acceleration: new Vector(0,0)
                },

                vel_max: 50,
                vision: {radius: 100, angle: 130 * Math.PI / 180},

                force_limits: {
                    thrust: 20,
                    steering: 50,
                    braking: 70
                }
            }


            default_config.geo_data.soft_merge(that.geo_data)
            that.merge$B(default_config)

            if(config_object){
               config_object.soft_merge$B(default_config)
               if ( typeof(block) === "function")
                   config = block(config_object) || new Hash()
               that.merge(config.soft_merge$B(config_object))
            }

        }

       // if (arguments.length)
            initialize()
}

/**
 * @method  position
 *
 * Gets or set the position of the void
 *
 * @return {"undefined" | Number[]}
 */
Mobile.prototype.position = function(){
    if (arguments.length == 0)
        return this.geo_data.position.get_coord()
    this.geo_data.position = arguments[0]
}

/**
 * @method  velocity
 *
 * Gets or set the velocity of the void
 *
 * @return {"undefined" | Number[]}
 */
Mobile.prototype.velocity = function(){
    if (arguments.length == 0)
        return this.geo_data.velocity.get_coord()
    this.geo_data.velocity = arguments[0]
}

/**
 * @method  accelertation
 *
 * Gets or set the accelertation of the void
 *
 * @return {"undefined" | Number[]}
 */
Mobile.prototype.acceleration = function(){
    if (arguments.length == 0)
        return this.geo_data.acceleration.get_coord()
    this.geo_data.acceleration = arguments[0]
}

/**
 * @method  start
 *
 * Stamps the initial processing time.
 *
 * @param  {Date} date
 */
Mobile.prototype.start = function(date){
    this.start_zone()
    this.last_time = this.current_time = date
}

/**
 * @method delta_t
 *
 * Ellapsed time since *last_time* was updated.
 *
 * @return {Number} Number of seconds ellapsed.
 */
Mobile.prototype.delta_t = function(){
    return (this.current_time.getTime() - this.last_time.getTime()) / 1000;
}

/**
 * @method update_physics
 *
 * Calculates new position, velocity and acceleration depending on the ellapsed time.
 *
 * @param  {Date} current_time Time for estimating coords.
 */
Mobile.prototype.update_physics = function(current_time){
    this.last_time = this.current_time
    this.current_time = current_time
    //this.geo_data.acceleration = this.requested_acceleration()
    this.geo_data.velocity = (integrate(this.geo_data.velocity, this.geo_data.acceleration, this.delta_t() )).subs(this.geo_data.velocity.scale(0.1))
    this.geo_data.position = integrate(this.geo_data.position, this.geo_data.velocity, this.delta_t() )
}

/**
 * @method run
 *
 * Updates the time in the boid's variables
 *
 * @param {Date}   current_time Current time of the boid
 *
 */
Mobile.prototype.run = function(current_time){
    if (!(current_time instanceof Date))
        return
    current_time = current_time || new Date()
    this.update_physics(current_time)
    this.update_zone()
}


/**
 * @method heading
 *
 * Gets the normal vector aligned with the heading.
 *
 * @return {Vector}
 */
Mobile.prototype.heading = function(){
    var _heading
    try{
        _heading = this.geo_data.velocity.unit()
        this.last_heading = _heading || this.last_heading
    } catch(err){
        _heading = this.last_heading
    }
    return _heading
}

/**
 * @method locale
 *
 * The local coordinate system expressed in the global cs.
 *
 * @return {Vector}
 */
Mobile.prototype.locale = function(){  // The local coordinate system expressed in the global cs.
    var u = this.heading()
    var x = u.get_coord(0)
    var y = u.get_coord(1)
    if (!x || !y || isNaN(x) || isNaN(y))
        u = new Vector(1,0)
    var v = new Vector(-u.Coord[1], u.Coord[0])
    return [u,v]
}

/**
 * @method globale
 *
 * Expresses global cs (coordinate system) into lcs
 *
 * @return {Vector}
 */
Mobile.prototype.globale = function(){
    var aux = this.heading()
    var x = aux.get_coord(0)
    var y = aux.get_coord(1)
    if (!x || !y || isNaN(x) || isNaN(y))
        aux = new Vector(1,0)
    var u = new Vector(aux.Coord[0], -aux.Coord[1])
    var v = new Vector(-u.Coord[1], u.Coord[0])
    return [u,v]
}


/**
 * @method globalize
 *
 * Changes local coordinates into world (global) coordinates
 *
 * @return {Vector}
 */
Mobile.prototype.globalize = function(){
    var v = new Vector(1,1,1)
    Vector.apply(v, arguments) // Create a Vector with whatever arguments that have been passed.
    var l = this.globale()
    return new Vector( l[0].dot(v), l[1].dot(v) )
}

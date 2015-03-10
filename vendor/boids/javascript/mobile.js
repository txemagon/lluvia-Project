Mobile.prototype = new Being
Mobile.prototype.constructor = Mobile

function Mobile(config_object, block){

    var that = this
    var args = arguments

    //Being.call(this, config_object, block)
    //if (typeof(block) === "undefined")
      //  if (typeof(config_object) === "function" ){
        //    block = config_object
          //  config_object = new Hash()
       // }


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
            //config_object.soft_merge$B(default_config)
            //if ( typeof(block) === "function")
              //  config = block(config_object) || new Hash()
            //that.merge(config.soft_merge$B(config_object))
        }

       // if (arguments.length)
            initialize()
}

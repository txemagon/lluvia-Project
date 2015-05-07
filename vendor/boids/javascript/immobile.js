 /**
 * @class Immobile
 *
 * Creates a Immobile
 *
 * @constructor Immobile
 *
 * @return {Immobile}
 */

Immobile.prototype = new Being
Immobile.prototype.constructor = Immobile

function Immobile(config_object, block){
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

        that.last_time = that.current_time = null
        /* Overridable configuration */

        var default_config = {
            geo_data: {
            }
        }


        default_config.geo_data.soft_merge(that.geo_data)
        config_object.soft_merge$B(default_config)
        if ( typeof(block) === "function")
            config = block(config_object) || new Hash()
        that.merge(config.soft_merge$B(config_object))
    }

    if (arguments.length)
        initialize()
}

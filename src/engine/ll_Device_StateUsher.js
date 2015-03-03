/**
 *  @class Enginge.Device.StateUsher
 *
 * Device internal class providing functionality to augmentate Devices' states.
 */
Device.StateUsher = function(I) {
    this.i = I
    this.state = I.state
}

/**
 * @method add
 * Adds a new substate along with its driver function or adds a regime to a substate.
 * 
 * @param {String} driver_name "running_choosing_level_up" ie.
 * @param {String} hook_name   "running"
 * @param {State}  state       "running" state object.
 */
Device.StateUsher.prototype.add = function(driver_name, hook_name, state) {
    var host = state
    var substates = driver_name.split("_")
    for (var i=0; i<hook_name.split("_").length; i++)
        substates.shift()

    var regime = false
    while (substates.length){
        var new_level = substates.shift() 

        for (var r in State.REGIME)
            if ( r == new_level )
                regime = new_level
        if (!regime){
            if (!host[new_level]) 
                this.state.add(new_level, host.toString())
            
            host = host[new_level]
        }
    }

    host = host.run
    if (regime)
        host[regime] = this.i[driver_name]
    else
        host = this.i[driver_name]
}
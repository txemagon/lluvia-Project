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
    for (var i=0; i<hook_name.split("_").length)
        substates.shift()
    while (substates.length){
        var new_level = host.substate.shift() 
        if (host[new_level])
            host = host[new_level]
        else
            host = host[new_level] = new State() // todo: change
        
    }    

}
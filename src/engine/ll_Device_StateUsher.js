/**
 *  @class Enginge.Device.StateUsher
 *
 * Device internal class providing functionality to augmentate Devices' states.
 */
Device.StateUsher = function(I) {
    this.i = I
    this.state = I.state
}

Device.StateUsher.prototype.add = function(driver_name, key, value) {
    // running_steady | running_fast | running_fast_steady
    var substate = driver_name.split("_").slice(1)
        // [steady] | [fast] | [fast, steady]
    var regime = null
        // [] | [fast] | [fast]
    if (/_up$|_steady$|_down$/.test(driver_name))
        regime = substate.pop() 
    
    var name_to_add = substate.pop()
    var host = key
    if (substate.length)
        host += "." + substate.join(".")

    this.state.add$B(name_to_add, host)
    var level = this.state.get(host)
    if (regime) {
        if (name_to_add && name_to_add != "") {
            if (!level[name_to_add])
                level[name_to_add] = new State(name_to_add)

        }
        if (!level[name_to_add].run){
            level[name_to_add].run = (function() {;
            })
        };
        level[name_to_add].run[regime] = this.i[driver_name]
    } else {
        if (!level[name_to_add]) {
            level[name_to_add] = new State(name_to_add)
            level[name_to_add].owner = this.i
        }

        level[name_to_add].run = this.i[driver_name]
    }

}
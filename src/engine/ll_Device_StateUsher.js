/**
 *  @class Enginge.Device.StateUsher
 *
 * Device internal class providing functionality to augmentate Devices' states.
 */
Device.StateUsher = function (I){
   this.i = I
   this.state = I.state
}

Device.StateUsher.prototype.add = function(driver_name, key, value){
	var substate = driver_name.split("_").slice(1)
	var regime = null
	if (/up|steady|down$/.test(driver_name))
		regime = substate.pop()
	var name = ""
	if (substate.length)
		name += substate[0]
	else{
		name = key
		key = null
	}
	if (regime)
		name += "." + regime
alert(this.state.inspect())
try{
	alert("key: " + key + "\nname: " + name )
    this.state.add$B(name, key)
	this.state[key][name].run = this.i[driver_name]
	} catch(err){

		alert("err: " + err +
			  "\nname: " + name +
			  "\nkey: " + key +
			  "\n\n\nState:\n" + this.state.inspect())
	}

	alert(this.state.inspect())
}
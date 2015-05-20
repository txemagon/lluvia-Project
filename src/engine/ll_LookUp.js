/**
 * @class Engine.LookUp
 *
 * Provides to {@link Engine.Device Devices} a mechanism for exporting levers
 * to actuate on the Device.
 *
 * ### Example
 *
 *     var t = new TreePanel()
 *
 *     var d = new Device()
 *
 *     // Consider d.look_up(t) usable too.
 *     d.look_up(TreePanel).each( function (element) {
 *          t.append_node(element.name, element.component)
 *     })
 *
 * Where element would be a {@link Engine.LookUp.Card LookUp Card}
 *     
 */
LookUp.prototype.constructor = LookUp

function LookUp(){
    this.levers = []
    this.ports = []
    this.applications = []
    this.eventDispatcher = null
    this.global = []
}

LookUp.prototype.add = function(obj){
    if (obj.isPrototypeOf(EventDispatcher)) 
        this.eventDispatcher = obj
	else this.global.push(obj)
}

// Returns all the object/proxies with a given interface
LookUp.prototype.get = function(interfc){
	var objects = []
	for (var i=0; i<this.global.length; i++)
		if (interfc.isPrototypeOf(this.global[i]))
			if (this.global[i].lookupGet)
				objects.push(this.global[i].lookupGet())
			else
				objects.push(this.global[i])
}

// Return and eliminate an object
LookUp.prototype.off = function(object){
	for (var i=0; i<this.global.length; i++)
		if (this.global[i] == object)
			this.global.splice(i,1);
}

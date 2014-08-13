Processor.prototype.constructor = Processor;
function Processor() {
    this.now = new Date();
    this.events = new Event();
    this.threads = new Array();
}
Processor.prototype.register = function(cObject, solicitorF) {
    var obj = null
    var fun = null
    if (cObject) {
        obj = cObject
        if (solicitorF)
            fun = solicitorF
        else if (cObject.run)
            fun = cObject.run
        if (!fun)
            throw "The current processor can´t get a valid solicitor"
    }
    this.threads.push({
        object: cObject,
        solicitor: (solicitorF ? solicitorF : cObject.run)
    });
}
Processor.prototype.kill = function(rObject, solicitorF) {
    for (var i in this.threads)
        if (this.threads[i] == {
            object: rObject,
            solicitor: solicitorF
        })
            this.threads.slice(i, i + 1);
}
Processor.prototype.step = function(date) {
    this.now = date || new Date();
    try {
        for (var i = 0; i < this.threads.length; i++)
            this.threads[i].solicitor.call(this.threads[i].object, this.now);
    } catch (e) {
    }
}
Processor.prototype.run = function(date) {
    this.now = new Date();
    try {
        this.step(this.now)
    } catch (e) {
    }
    setTimeout(this.run.bind(this), 20);
}
Processor.prototype.start = function() {
    this.run()
    return this;
}
Processor.prototype.newThread = function() {
    var t = new Thread(null, this)
    t.run = Processor.prototype.newThread.block_given$U() || function() {;
    }
    return t;
}
Processor.prototype.get = Processor.prototype.get = function(object) {
    var collect = []
    var len = this.threads.length
    for (var i = 0; i < len; i++) {
        var candidate = this.threads[i].object
        if (candidate && !collect.include$U(candidate) &&
            (candidate == object || candidate instanceof object)
        )
            collect.push(candidate)
    }
    return collect
}
$Processor = new Processor().start()
Thread.prototype.constructor = Thread;
function Thread(solicitor, processor){
	this.before = new Date()
	this.now = processor? processor.now: new Date();
	if (!solicitor)
		solicitor = this.run;
	if (processor && processor instanceof Processor)
		processor.register(this, solicitor);
}
Thread.prototype.run = function(processors_time){
	this.now = processors_time
	throw "The solicitor function remains still undefined."
}
State.prototype = new VersionNumber
State.prototype.constructor = State
function State(label) {
    VersionNumber.apply(this, arguments)
    var that = this
    this.before_hooks = []
    this.after_hooks = []
    Object.defineProperties(this, {
        before_hooks: {
            value: this.before_hooks,
            enumerable: false
        },
        after_hooks: {
            value: this.after_hooks,
            enumerable: false
        }
    })
    Object.defineProperty(this, "regime", {
        value: State.REGIME.up,
        writable: true,
        configurable: true
    })
    this.run = function() {}
    this[this] = function() {
        return State.prototype._run.apply(that, arguments)
    }
}
State.prototype._run = function() {
    var response = []
    var args = Array.prototype.slice.call(arguments, 0)
    args.push(this)
    for (var i = this.before_hooks.length - 1; i >= 0; i--)
        this.before_hooks[i].apply(this, args)
    response[0] = this.run.apply(this, arguments)
    if (this.run[this.regime.name])
        response[1] = this.run[this.regime.name].apply(this, arguments)
    args.push(response)
    if (this.after_hooks.length)
        for (var i = this.after_hooks.length - 1; i >= 0; i--)
            this.after_hooks[i].apply(this, args)
    return response
}
Object.defineProperty(State.prototype, "_run", {
    value: State.prototype._run,
    enumerable: false,
    writable: false,
    configurable: false
})
State.REGIME = new Enumeration("up", "steady", "down")
State.NONE = new State("-1")
Automata.prototype.constructor = Automata;
function Automata(states, solicitor) {
    var that = this
    function initialize() {
        function find_initial_state(state_level, initial_state) {
            initial_state = initial_state || ""
            for (var i = 0; i < state_level.length; i++) {
                if (state_level[i] instanceof Array) {
                    initial_state += "." + state_level[i - 1]
                    return find_initial_state(state_level[i], initial_state)
                }
                if (Object.prototype.toString.call(state_level[i]) === "[object String]") {
                    if (/^\*/.test(state_level[i])) {
                        state_level[i] = state_level[i].substring(1)
                        return initial_state + "." + state_level[i]
                    }
                }
            }
        }
        var i_state = (find_initial_state(states) || "").substring(1).split(".")
        if (states instanceof Array)
            states = new(ProxyConstructor(EnumerationOf, State, states))
        that.state = states ? states : new Enumeration()
        that.state.each(function(k, v) {
            v.owner = that
        })
        that.state.none = new State(State.NONE)
        var initial_state
        for (initial_state = that.state; i_state.length; initial_state = initial_state[i_state.shift()]);
        that.current = new StateGear(that, initial_state)
        that.current.zip(solicitor)
    }
    if (arguments.length)
        initialize()
}
Automata.prototype.switch = function(state) {
    if (Object.prototype.toString.call(state) == "[object String]") {
        state = state.split(".")
        var s
        for (s = this.state; state.length; s = s[state.shift()]);
        state = s
    }
    this.current.requested = state
}
Automata.prototype.run = function() {
    return this.current.drive_state.apply(this.current, arguments)
}
function StateGear(automata, initial_state) {
    this.automata = automata
    this.previous = State.NONE
    this.current = State.NONE
    this.requested = initial_state || State.NONE
}
StateGear.prototype.valueOf = function() {
    return this.current
}
StateGear.prototype.toString = function() {
    return this.current.toString()
}
StateGear.prototype.drive_state = function() {
    var s = this.current
    if (this.requested != this.automata.state.none) {
        s.regime = State.REGIME.down
        s[s].apply(s, arguments)
        this.previous = this.current;
        this.current = this.requested;
        this.requested = this.automata.state.none;
        var s = this.current
        s.regime = State.REGIME.up
        s[s].apply(s, arguments)
        s.regime = State.REGIME.steady
    }
    return s[s].apply(s, arguments)
}
StateGear.prototype.zip = function(solicitors, base_state) {
    base_state = base_state || this.automata.state
    function add_state(name, driver) {
        var base = base_state
        name = name.split(".")
        if (name.length == 1)
            base[i].run = driver
        else {
            while (name.length > 1) {
                var current
                try {
                    base = base[current = name.shift()]
                } catch (e) {
                    throw "State " + current + " is not defined."
                }
            }
            var regime = name.shift()
            var included = false
            State.REGIME.each(function(k, v) {
                if (k == regime)
                    included = true
            })
            if (!included)
                throw "Invalid regime " + regime + "."
            base.run[regime] = driver
        }
    }
    for (var i in solicitors) {
        if (solicitors[i] instanceof Function)
            add_state(i, solicitors[i])
        else if (solicitors[i] instanceof Array) {
            add_state(i, solicitors[i].shift())
            this.zip(solicitors[i][0], base_state[i])
        }
    }
}
ThreadAutomata.prototype = new Thread
ThreadAutomata.extend(Automata)
ThreadAutomata.prototype.constructor = ThreadAutomata
ThreadAutomata.prototype.super = Automata
function ThreadAutomata(state, solicitor, processor) {
    if (arguments.length) {
        Automata.call(this, state, solicitor);
        Thread.call(this, ThreadAutomata.prototype.run, processor);
    }
}
ThreadAutomata.prototype.run = function(processors_time) {
    if (this.now)
        this.before = this.now
    this.now = processors_time
    Automata.prototype.run.call(this, this.now, this.before);
}
Device.prototype = new Processor
Device.extend(ThreadAutomata) 
Device.prototype.constructor = Device
Device.STATE = new EnumerationOf(State, ["suspended", "running", "suspending", "killing", "killed"])
function Device(view, state, parent) {
    var that = this
    this._class = that
    function initialize() { 
        state = state || new EnumerationOf(State, Device.STATE)
        that.solicitors = {
            running: function() {
                this.owner.gate_runner(that.now)
                this.owner.child_runner(that.now);
            },
            suspending: function() {
                this.owner.child_runner(that.now);
            },
            killing: function() {
                this.owner.gate_runner(that.now)
            }
        }
        if (view)
            that.view = (typeof(view) === "string" ? document.getElementById(view) : view)
        that.event_dispatcher = new EventDispatcher();
        that.gates = []
        that.open_device = _$innerObject(that, "device")
        that.event_dispatcher.device = that
        that.register(that.event_dispatcher, that.event_dispatcher.shift)
        if (that.self_events)
            that.event_dispatcher.joinPorts(that.self_events)
        ThreadAutomata.call(that, state, that.solicitors, parent || $Processor);
        that.switch("running")
    }
    if (arguments.length) 
        initialize();
}
Device.prototype.gate_runner = function() {
    for (var i = 0; i < this.gates.length; i++)
        this.gates[i].run(this.now, this.before)
}
Device.prototype.child_runner = function() {
    if (this.current_state != this.state.killed) {
        this.now = arguments[0]
        for (var i in this.threads)
            try {
                this.threads[i].solicitor.call(this.threads[i].object, this.now);
            } catch (e) {
            }
    }
}
Device.prototype.new_gate = function(el, ClassCons, config) {
    try {
        var Cons = this.open_device(ClassCons)
        var view = this.view || null
        var ob = new Cons(el, view, config)
        ob.device = this
        this.gates.push(ob)
        return ob
    } catch (e) {
        if ($K_debug_level >= $KC_dl.DEVELOPER)
            alert("No event handlers were found.\nException: " + e.toSource())
    }
}
Device.prototype.attend = function(date, mssg) {
    this["attend_" + mssg.name](date, mssg) 
}
Device.prototype._y = function(htmlElement, stopAt) {
    stopAt = stopAt || null
    if (typeof(stopAt) === "string")
        stopAt = document.getElementById(stopAt)
    if (stopAt !== htmlElement && htmlElement.offsetParent)
        return htmlElement.offsetTop + Device.prototype._y(htmlElement.offsetParent, stopAt)
    return 0
}
Device.prototype._x = function(htmlElement, stopAt) {
    stopAt = stopAt || null
    if (typeof(stopAt) === "string")
        stopAt = document.getElementById(stopAt)
    if (stopAt && htmlElement && stopAt === htmlElement)
        return 0
    if (htmlElement.offsetParent)
        return htmlElement.offsetLeft + Device.prototype._x(htmlElement.offsetParent, stopAt)
    return 0
}
Device.prototype.y_calc = function() {
    if (this.view) {
        this.y = this._y(this.view)
        return this.y
    }
    return null
}
Device.prototype.x_calc = function() {
    if (this.view) {
        this.x = this._x(this.view)
        return this.x
    }
    return null
}
Device.prototype.fire_event = function(mssg) {
    for (var i = 0; i < this.event_dispatcher.ports[mssg.name].length; i++)
        this.event_dispatcher.ports[mssg.name][i].event_dispatcher.enqueue(mssg.clone())
}
Device.prototype.add_port = function(mssg_name, device) {
    this.event_dispatcher.add_port(mssg_name, device)
}
Device.prototype.new_message = function(type, name, data) {
    if (type && name)
        return systemEv(type, {
            name: name,
            data: data || "no extra data available"
        }, this)
}
Device.prototype.send_message = function(type, name, data, receiptant) {
    receiptant.event_dispatcher.enqueue(this.new_message(type, name, data))
}
Device.prototype.method_missing = function(method, obj, params) {
    if (this.respond_to$U(method.underscore()))
        return method.underscore.apply(this, params)
    obj = obj || ""
    params = params || []
    throw (new MethodMissingError(method + " missing in " + obj + "::" + this.constructor.name + ". Params: " + params.join(', ')))
}
EventDispatcher.prototype = new ThreadAutomata
EventDispatcher.prototype.constructor = EventDispatcher
function EventDispatcher() {
    var that = this; 
    this.ids = 0
    this.ports = {
    }
    this.inqueue = []
    this.clss = that 
    this.getId = function() {
        return ++that.ids;
    }
}
EventDispatcher.prototype.enqueue = function(mssg) {
    var ev = this
    mssg.received = {
        id: ev.getId(),
        time: new Date()
    };
    this.inqueue.push(mssg)
    return mssg.received.id
}
EventDispatcher.prototype.add_port = function(event, device) {
    if (this.ports[event])
        this.ports[event].push(device)
}
EventDispatcher.prototype.joinPorts = function(listArray) {
    for (var i = 0; i < listArray.length; i++)
        this.ports[listArray[i]] = []
}
EventDispatcher.prototype.delPort = function(event, device) {
    if (this.clss.ports[event])
        for (var i = 0; i < this.clss.ports.length; i++)
            if (this.clss.ports[i] === device)
                this.clss.ports[i].splice(i, 1)
}
EventDispatcher.prototype.fireEvent = function(event) {
    if (this.clss.ports[event.name])
        for (var i = 0; i < this.clss.ports[event.name].length; i++)
            this.clss.ports[event.name][i](event);
}
EventDispatcher.prototype.shift = function() { 
    for (var i = 0; i < this.inqueue.length; i++)
        try {
            var mssg = this.inqueue[i]
            if (mssg.status[mssg.current] === "closed")
                this.inqueue.splice(i, 1)
            if (this.inqueue[i]) {
                mssg = this.inqueue[i]
                if (mssg.status[mssg.current] === "sent") {
                    this.device.attend(arguments[0], mssg)
                    mssg.current++
                }
            }
        } catch (e) {
            if ($K_debug_level >= $KC_dl.PROGRAMMER)
                alert("No event handler for message. \nException: " + e.toSource())
        }
    return true;
}
EventDispatcher.prototype.run = function() {
    return shift.apply(this, arguments)
}
function _stitchWorlds(gate, solicitor) {
    return function(e) {
        e = e || window.event
        try {
            return gate[solicitor](e, this)
        } catch (err) {
            Exception.parse(err)
        }
    }
}
function Gate(element, parent, config) {
    var that = this
    var args = arguments
    function initialize() {
        if (element) {
            if (typeof(element) === "string")
                if (document.getElementById(element))
                    element = document.getElementById(element)
                else {
                    var element_name = element
                    element = document.createElement("div")
                    element.setAttribute('id', element_name)
                    if (parent) {
                        if (typeof(parent) === "string")
                            parent = document.getElementById(parent)
                        if (parent) parent.appendChild(element)
                    }
                }
            that.panel = element
        }
        if (!element) {
            that.panel = document.createElement("div")
            if (parent)
                parent.appendChild(that.panel)
            else
                document.body.appendChild(that.panel)
        }
        if (config)
            that.merge$B(config)
        that.keys(/do_.*/).each(function(handler) {
            handler.match(/do_(.*)/)
            that.panel[RegExp.$1] = _stitchWorlds(that, handler)
        })
        that.threads = []
    }
    if (arguments.length)
        initialize()
}
Gate.prototype.listen = function(event, handler) {
    this.panel[event] = _stitchWorlds(this, handler)
}
Gate.prototype.getCanvas = function() {
    return this.panel.lastChild;
} 
Gate.prototype.applySkin = function(skin) {
    var div = document.createElement("div")
    div.setAttribute("class", skin)
    this.panel.appendChild(div)
}
Gate.prototype.run = function(now, before) {
    for (var i = 0; i < this.threads.length; i++)
        this.threads[i].run(now, before)
}
Gate.prototype.new_effect = function(eff) {
    this.threads.push(eff)
    return eff
}
Lookup.prototype.constructor = Lookup
function Lookup(){
    this.levers = []
    this.ports = []
    this.applications = []
    this.eventDispatcher = null
    this.global = []
    this.view = null
}
Lookup.prototype.add = function(obj){
    if (obj.isPrototypeOf(EventDispatcher)) 
        this.eventDispatcher = obj
	else this.global.push(obj)
}
Lookup.prototype.get = function(interfc){
	var objects = []
	for (var i=0; i<this.global.length; i++)
		if (interfc.isPrototypeOf(this.global[i]))
			if (this.global[i].lookupGet)
				objects.push(this.global[i].lookupGet())
			else
				objects.push(this.global[i])
}
Lookup.prototype.off = function(object){
	for (var i=0; i<this.global.length; i++)
		if (this.global[i] == object)
			this.global.splice(i,1);
}
var systemEv = (function(){
    return (function $_sev(type, event, behalf){
	var args = arguments
	function setup(){
	    var sEvs = {
		"sync": {	type    : "synchronous",					
		    name	: null,
		    creation: {creator: null, time: null},		
		    current : 0,								
		    status  : ["sent", "attended", "closed"],	
		    event   : {}
		}
	    }
	    newOb = sEvs[type]
	    newOb.name             = event.name
	    newOb.event[event.name]= event
	    newOb.creation.creator = (typeof (behalf) === "object")? behalf : null
	    newOb.creation.time    = new Date()
	    return newOb
	}
	var ob_msg = setup(  )
	$_sev.yield(ob_msg)
	return  ob_msg; })
})()
MoveLeftEffect.prototype = new ThreadAutomata
MoveLeftEffect.prototype.constructor = MoveLeftEffect
MoveLeftEffect.prototype.super = ThreadAutomata
function MoveLeftEffect(view, final_coord, initial_coord, velocity) {
    var that = this
    if (Object.prototype.toString.call(view) == "[object String]")
        view = document.getElementById(view)
    this.view = view
    this.final_coord = final_coord
    this.coord = this.initial_coord = initial_coord
    this.velocity = velocity || [70, 0]
    var solicitors = {
        "running": function(now, before) {
            for (var i = that.coord.length - 1; i >= 0; i--)
                that.coord[i] += that.velocity[i] * (now - before) / 1000
            that.view.style.width = "" + that.coord[0] + "px"
            if (that.coord[0] >= that.final_coord[0])
                that.switch("stopped")
        }
    }
    ThreadAutomata.call(this, ["stopped", "*running"], solicitors)
}
MoveDownEffect.prototype = new ThreadAutomata
MoveDownEffect.prototype.constructor = MoveDownEffect
MoveDownEffect.prototype.super = ThreadAutomata
function MoveDownEffect(view, final_coord, initial_coord, velocity) {
    var that = this
    if (Object.prototype.toString.call(view) == "[object String]")
        view = document.getElementById(view)
    this.view = view
    this.final_coord = final_coord
    this.coord = this.initial_coord = initial_coord
    this.velocity = velocity || [0, 20]
    var solicitors = {
        "running": function(now, before) {
            for (var i = that.coord.length - 1; i >= 0; i--)
                that.coord[i] += that.velocity[i] * (now - before) / 1000
            that.view.style.height = "" + that.coord[1] + "px"
            if (that.coord[1] >= that.final_coord[1])
                that.switch("stopped")
        }
    }
    ThreadAutomata.call(this, ["stopped", "*running"], solicitors)
}
RectangleEffect.prototype = new ThreadAutomata
RectangleEffect.prototype.constructor = RectangleEffect
RectangleEffect.prototype.super = ThreadAutomata
function RectangleEffect(view, final_coord, initial_coord, velocity) {
    var that = this
    if (Object.prototype.toString.call(view) == "[object String]")
        view = document.getElementById(view)
    this.view = view
    this.final_coord = final_coord
    this.coord = this.initial_coord = initial_coord
    this.velocity = velocity || [51, 3]
    var solicitors = {
        "running": function(now, before) {
            for (var i = that.coord.length - 1; i >= 0; i--)
                that.coord[i] += that.velocity[i] * (now - before) / 1000
            that.view.style.width = "" + that.coord[0] + "px"
            that.view.style.height = "" + that.coord[1] + "px"
            if (that.coord[0] >= that.final_coord[0])
                that.switch("stopped")
        }
    }
    ThreadAutomata.call(this, ["stopped", "*running"], solicitors)
}
alert(111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111)
function TableSymbols(elements) {
    this.elements = elements || []
}
TableSymbols.prototype.insert = function(element) {
    this.elements.push(element)
}
TableSymbols.prototype.search = function(element) {
    var element = element || {}
    for (var i = 0; i < this.elements.length; i++)
        if (this.elements.name == element.name)
            return true
    return false
}
function Builder() {
    this.lluvia_nodes = []
    this.prefix = ""
    this.space_name = null
    this.table_symbols = new TableSymbols()
    if (arguments.length)
        for (var i = 0; i < arguments.length; i++) {
            if (typeof arguments[i] == "string")
                this.prefix = arguments[i]
            else if (typeof arguments[i] == "object")
                this.space_name = arguments[i]
        }
}
Builder.prototype.get_lluvia_nodes = function(actual_node) {
    var actual_node = actual_node || {}
    for (var i = 0; i < actual_node.childNodes.length; i++) {
        if (actual_node.childNodes[i].childNodes.length)
            this.get_lluvia_nodes(actual_node.childNodes[i])
        if (actual_node.childNodes[i].className != undefined && Builder.is_lluvia_element$U(actual_node.childNodes[i].className))
            this.lluvia_nodes.push(actual_node.childNodes[i])
        else if (actual_node.childNodes[i].nodeType == Node.COMMENT_NODE && Builder.is_lluvia_comment$U(actual_node.childNodes[i].nodeValue))
            this.lluvia_nodes.push(actual_node.childNodes[i])
    }
}
Builder.is_lluvia_element$U = function(element, separator) {
    var separator = separator || "-"
    var previous_word = element.split(separator)
    if (previous_word[0] == "lluvia" || previous_word[0] == "ll")
        return true
    return false
}
Builder.is_lluvia_comment$U = function(comment, token) {
    var comment = comment || ""
    var token = token || "#!ll"
    var not_found = -1
    if (comment.search(token) != not_found)
        return true
    return false
}
Builder.prototype.analize_node = function(node, prefix) {
    var node = node || {}
    var descompose_node = node.className.split(" ")
    var class_css = descompose_node[1]
    var type = descompose_node[0].split("-")
    var result = {
        id: node.id,
        name: prefix + node.id,
        type: type[1],
        class_css: class_css,
        params: node.dataset.params,
        data_set: node.dataset
    }
    return result
}
Builder.prototype.clasify_element = function(element) {
    var element = element || {}
    if (element.type != "undefined")
        return "object"
}
Builder.prototype.create_element = function(node, type) {
    switch (type) {
        case "object":
            if (this.space_name == null)
                eval.call(null, "var " + node.name + " = new " + node.type + "(" + node.params + ")")
            else
                this.space_name[node.name] = eval("new " + node.type + "(" + node.params + ")")
            node.id.className = node.class_css
            break
    }
}
Builder.prototype.create_methods_element = function(element) {
    var dataset = element.data_set || {}
    var element_class = element.type || ""
    var new_methods = []
    function search_new_methods() {
        for (var i in dataset) {
            if (i.search("method") == 0) {
                var method = {
                    name: i.replace("method$", ""),
                    block: dataset[i]
                }
                new_methods.push(method)
            }
        }
    }
    search_new_methods()
    for (var i = 0; i < new_methods.length; i++) {
        eval(element.name + "." + new_methods[i].name + "=" + new_methods[i].block)
    }
}
Builder.prototype.run_methods = function(element) {
    var dataset = element.data_set || {}
    var methods = []
    function search_methods() {
        for (var i in dataset)
            if (i.search("run") == 0) {
                var method = {
                    name: i.replace("run$", ""),
                    params: dataset[i]
                }
                methods.push(method)
            }
    }
    search_methods()
    for (var i = 0; i < methods.length; i++)
        eval(element.name + "." + methods[i].name + "(" + methods[i].params + ")")
}
Builder.prototype.search_prefix = function(node_body) {
    var prefix = ""
    if (node_body.dataset.lluviaPrefix)
        prefix = node_body.dataset.lluviaPrefix
    return prefix
}
Builder.prototype.build = function() {
    this.get_lluvia_nodes(document)
    if (this.prefix == "")
        this.prefix = this.search_prefix(document.body)
    for (var i = 0; i < this.lluvia_nodes.length; i++) {
        var analize_result = this.analize_node(this.lluvia_nodes[i], this.prefix)
        var clasify_result = this.clasify_element(analize_result)
        this.create_element(analize_result, clasify_result)
        this.create_methods_element(analize_result)
        this.run_methods(analize_result)
    }
}
function bring_lluvia() {
    function init_program() {
        if (typeof required_packages == 'function')
            required_packages()
        PackageManager.download(main)
    }
    function load_dependencies() {
        if (typeof $K_app_dependencies != 'undefined') {
            var app_path = location.pathname.replace(/\/[^\/]*\.html?/, '')
            var app_rel_path = '/javascript/'
            var app_package = new PackageManager(app_path + app_rel_path)
            app_package.create_catalog($K_app_dependencies)
            for (var i = 0; i < $K_app_dependencies.files.length; i++) {
                if (i != $K_app_dependencies.files.length - 1)
                    PackageManager.include_script(app_path + app_rel_path + $K_app_dependencies.path + $K_app_dependencies.files[i].name)
                else {
                    PackageManager.include_script(app_path + app_rel_path + $K_app_dependencies.path + $K_app_dependencies.files[i].name, init_program)
                }
            }
        } else {
            init_program()
        }
    }
    function load_packages() {
        var p = new PackageManager('/home/jose/work/lluvia-Project/util/compress-core/../..')
        p.create_catalog($K_script_response, load_dependencies)
    }
    PackageManager.include_script('../../dist/catalog.js', load_packages)
}
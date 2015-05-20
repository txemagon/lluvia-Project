Window.prototype = new Device
Window.prototype.constructor = Window

function Window(view, title) {
    var that = this

    function initialize() {
        that.self_events = ["inspect"]
        Device.call(that, view)
        that.title = title
        
        that.view.innerHTML = "<h3>" + title + "</h3>" + that.view.innerHTML
        that.content = document.createElement("div")
        that.view.appendChild(that.content)
        that.plug(that)

    }

    if (arguments.length)
        initialize()

}


Window.prototype.plug = function(social_object) {
    var that = this
    //todo: develop lookup's
    /* 
    social_object.look_up(this).each( function(element) {
        this.global_space.push( 
          { 
            name: element.name, 
            obj: element.component
          })
    })
    */
   var gate = this.new_gate(null, Gate, 
    { doonclick: function(event, element){
        this.device.fire_event( 
            this.device.new_message("sync", "inspect", social_object) 
        )
    }})

   gate.panel.innerHTML = social_object.constructor.name.humanize()
}

Window.prototype.attend_create_object = function(event) {
    alert(event.data.toSource())
}
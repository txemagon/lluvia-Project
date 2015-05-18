Window.prototype = new Device
Window.prototype.constructor = Window

function Window(view, title) {
    var that = this

    function initialize() {
        Device.call(that, view)
        that.global_space = []
        that.title = title
        
        that.view.innerHTML = "<h3>" + title + "</h3>" + that.view.innerHTML
        that.content = document.createElement("div")
        that.view.appendChild(that.content)
        that.global_space.push({name: title, obj: that})

        that.state.running.run.steady = function(date) {
        }

        that.state.running.run.up = function(date) {
            this.render()
        }
    }

    if (arguments.length)
        initialize()

}

Window.prototype.render = function() {
    var that = this
    var text = "<ul>\n"
    text += this.global_space.collect(function(element) {
        return "<li>" + element.name + "::" + element.obj.constructor.name + "</li>"
    }).join("\n")
    text += "</ul>\n"
    this.content.innerHTML = text
}

Window.prototype.attend_create_object = function(event) {
    alert(event.data.toSource())
}
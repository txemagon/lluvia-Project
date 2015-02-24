CanvasDevice.prototype = new GraphicDevice
CanvasDevice.prototype.constructor = CanvasDevice

function CanvasDevice(screen, incarnation) {
    GraphicDevice.apply(this, arguments)
    this.context = this.screen.getContext("2d")
    if (!this.context)
        throw "Unable to initialize context for 2d screen."
}
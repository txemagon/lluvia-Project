function GraphicDevice(screen) {
    /* We have a HTMLElement, a string holding the id, or the page has a canvas */

    if (typeof(screen) === "string")
        screen = document.getElementById(screen)
    if (!screen)
        screen = document.querySelector('canvas')
    if (!(screen instanceof HTMLElement))
        return

    this.screen = screen
    this.context = null
    GraphicDevice.screen = GraphicDevice.screen || []
    GraphicDevice.screen.push(this)
}

GraphicDevice.get_best_device_for = function(screen, drawable_obj) {
    if (WebGl.available$U())
        return new WebGl(screen, drawable_obj)
    return new CanvasDevice(screen)
}
function GraphicDevice(screen, drawable_obj, incarnation) {
    /* We have a HTMLElement, a string holding the id, or the page has a canvas */
    if (typeof(screen) === "string")
        screen = document.getElementById(screen)
    if (!screen)
        screen = document.querySelector('canvas')
    if (!(screen instanceof HTMLElement))
        return
    

    if(incarnation)
       if(this.constructor.name != incarnation.graphic_type)
          throw "Invalid screen type"
       else
          this.incarnation = incarnation
    else
        this.incarnation = null

    this.drawable = drawable_obj

    this.screen = screen
    this.context = null
    GraphicDevice.screen = GraphicDevice.screen || []
    GraphicDevice.screen.push(this)
}

GraphicDevice.get_best_device_for = function(screen, drawable_obj, incarnation) {
    if (WebGl.available$U())
        return new WebGl(screen, drawable_obj, incarnation)
    return new CanvasDevice(screen, drawable_obj, incarnation)
}

/**
 * @method add_drawable_obj
 * Virtual method
 * 
 * @param {Object} drawable_obj The new drawabla object.
 */
 GraphicDevice.prototype.add_drawable_obj = function(drawable_obj){
    return
}
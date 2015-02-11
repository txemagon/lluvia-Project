Brain.prototype.paint = function (ctx) {
    var that = this

    this.active_behaviors.self_keys().each(function (key){
        that.active_behaviors[key].each(function (b) {

            if ( b && b.behavior && b.behavior.draw)
                b.behavior.draw(ctx)

        })
    })
}

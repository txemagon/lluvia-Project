BackgroundMoveEffect.prototype = new ThreadAutomata
BackgroundMoveEffect.prototype.constructor = BackgroundMoveEffect
BackgroundMoveEffect.prototype.super = ThreadAutomata

/**
 * [BackgroundMoveEffect description]
 * Coordinate: [3, 56]
 * @param {[type]} view          [description]
 * @param {[type]} final_coord   [description]
 * @param {[type]} initial_coord [description]
 * @param {[type]} velocity   [description]
 */
function BackgroundMoveEffect(view, config) {

    var that = this
    if (Object.prototype.toString.call(view) == "[object String]")
        view = document.getElementById(view)
    this.view = view
    this.final_coord = config.final_coord
    this.coord = this.initial_coord = config.initial_coord || [0, 0]
    this.velocity = config.velocity || [70, 0]

    var solicitors = {
        "running": function(now, before) {
            for (var i = that.coord.length - 1; i >= 0; i--)
                that.coord[i] += that.velocity[i] * (now - before) / 1000
            that.view.style.backgroundPosition = "" + that.coord[0] + "%" + that.coord[1] + "%"

            if (that.final_coord && that.coord[0] >= that.final_coord[0])
                that.switch("stopped")
                //that.switch("running.backwards")
        }
    }

    ThreadAutomata.call(this, ["stopped", "*running"], solicitors)
}
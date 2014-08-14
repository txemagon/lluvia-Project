MoveDownEffect.prototype = new ThreadAutomata
MoveDownEffect.prototype.constructor = MoveDownEffect
MoveDownEffect.prototype.super = ThreadAutomata

/**
 * [MoveDownEffect description]
 * Coordinate: [3, 56]
 * @param {[type]} view          [description]
 * @param {[type]} final_coord   [description]
 * @param {[type]} initial_coord [description]
 * @param {[type]} velocity   [description]
 */
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
                //that.view.innerHTML = that.coord[0]
        }
    }

    ThreadAutomata.call(this, ["stopped", "*running"], solicitors)
}
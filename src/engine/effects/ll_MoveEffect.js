MoveEffect.prototype = new ThreadAutomata
MoveEffect.prototype.constructor = MoveEffect
MoveEffect.prototype.super = ThreadAutomata

/**
 * [MoveEffect description]
 * Coordinate: [3, 56]
 * @param {[type]} view          [description]
 * @param {[type]} final_coord   [description]
 * @param {[type]} initial_coord [description]
 */
function MoveEffect(view, final_coord, initial_coord) {

    var that = this
    if (Object.prototype.toString.call(view) == "[object String]")
        view = document.getElementById(view)
    this.view = view
    this.final_coord = final_coord
    this.coord = this.initial_coord = initial_coord
    this.velocity = [20, 15]

    var solicitors = {
        "running": function(now, before) {
            for (var i = that.coord.length - 1; i >= 0; i--)
                that.coord[i] += that.velocity[i] * (now - before) / 1000
            that.view.innerHTML = that.coord
        }
    }

    ThreadAutomata.call(this, ["stopped", "*running"], solicitors)
}
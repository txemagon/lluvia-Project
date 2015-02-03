SpringEffect.prototype = new ThreadAutomata
SpringEffect.prototype.constructor = SpringEffect
SpringEffect.prototype.super = ThreadAutomata

/**
 * [SpringEffect description]
 * Coordinate: [3, 56]
 * @param {[type]} view          [description]
 * @param {[type]} final_coord   [description]
 * @param {[type]} initial_coord [description]
 * @param {[type]} velocity   [description]
 */
function SpringEffect(view, final_coord, initial_coord, velocity) {

    var that = this
    if (Object.prototype.toString.call(view) == "[object String]")
        view = document.getElementById(view)
    this.view = view
    this.final_coord = final_coord
    this.coord = this.initial_coord = initial_coord
    this.velocity = velocity || [70, 0]

    var solicitors = {
        running: [

            function() {;
            }, {
                forward: function(now, before) {
                    for (var i = that.coord.length - 1; i >= 0; i--)
                        that.coord[i] += that.velocity[i] * (now - before) / 1000
                    that.view.style.backgroundPosition = "" + that.coord[0] + "%" + that.coord[1] + "%"

                    if (that.coord[0] >= that.final_coord[0])
                        that.switch("stopped")
                        //that.switch("running.backwards")
                }
            }, {
                backwards: function(now, before) {
                    for (var i = that.coord.length - 1; i >= 0; i--)
                        that.coord[i] += that.velocity[i] * (now - before) / 1000
                    that.view.style.marginLeft = "-" + that.coord[0] + "px"

                    if (that.coord[0] <= that.initial_coord[0])
                        that.switch("running.forward")
                }
            }
        ]
    }

    ThreadAutomata.call(this, ["stopped", "running", ["*forward", "backwards"]], solicitors)
}
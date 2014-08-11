EffectHandler.prototype = new Device
EffectHandler.prototype.contructor = EffectHandler

function EffectHandler(view) {
    var that = this
    this.view = view

    function initialize() {
        Device.call(that, view)

        that.move_eff = that.new_gate("line", Gate, {
            do_onclick: function(event, element) {
                this.move_eff[view].move_effect = this.move_eff.new_effect(new MoveEffect(this.move_eff.device, this.move_eff))
            }
        })
    }

    if (arguments.length)
        initialize()
}
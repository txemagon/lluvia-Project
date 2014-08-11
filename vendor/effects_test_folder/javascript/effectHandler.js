EffectHandler.prototype = new Device
EffectHandler.prototype.contructor = EffectHandler

function EffectHandler(view) {
    var that = this
    this.view = view

    function initialize() {
        Device.call(that, view)

        that.move_eff = that.new_gate("line", Gate, {
            do_onclick: function(event, element) {
                this[element].m_effect = this.new_effect(new MoveEffect(this.device, this))
                this[element].m_effect.current.requested = this[element].m_effect.state.transition
            }
        })
    }

    if (arguments.length)
        initialize()
}
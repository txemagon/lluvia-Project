CountDown.prototype = new Device
CountDown.prototype.constructor = CountDown

function CountDown(view, initial_time) {
    var that = this // Equals to this.owner
    this.initial_time = initial_time //millis
    this.time_passed = 0 //millis

    if (arguments.length)
        Device.call(this, view)

    this.state.running.run.steady = function(date) {
        that.time_passed += (date - that.last_time)
        that.last_time = date
        that.view.innerHTML = /\d{2}:\d{2}:\d{2}/.exec((new Date(that.remain())).toUTCString())
    }

    this.state.running.run.up = function(date) {
        that.last_time = date
    }

}

CountDown.prototype.start = function() {
    this.switch("running")
}

CountDown.prototype.pause = function() {
    this.switch("paused")
}

CountDown.prototype.remain = function() {
    return this.initial_time - this.time_passed
}
CountDown.prototype = new Device
CountDown.prototype.constructor = CountDown

function CountDown(initial_time) {
    this.initial_time = initial_time
    this.time_passed
<<<<<<< HEAD
    /*
=======

>>>>>>> da6990b75332a7c1b10a600ed3b37e28a89979ec
    if (arguments.length)
        Device.call(this, arguments)

    this.state.running.run.steady = function(date) {
        this.owner.time_passed += date - this.last_time
        this.last_time = date
    }

    this.state.running.run.up = function(date) {
        this.last_time = date
    }

}

<<<<<<< HEAD
/*
=======

>>>>>>> da6990b75332a7c1b10a600ed3b37e28a89979ec
CountDown.prototype.start = function() {
    this.switch("running")
}

CountDown.prototype.pause = function() {
    this.switch("paused")
}

CountDown.prototype.remain = function() {
    return this.initial_time - this.time_passed
};

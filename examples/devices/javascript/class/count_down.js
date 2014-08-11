//CountDown.prototype = new Device
CountDown.prototype.constructor = CountDown

function CountDown(initial_time){
    this.initial_time = initial_time
    this.time_passed
    alert("Objeto creado")
/*
    if (arguments.length)
<<<<<<< HEAD
        Device.call(this, null)

=======
        Device.apply(this, arguments)
>>>>>>> 90435685da58e9f45de04cd4ffd8c946c539a6c0
    this.state.running.run.steady = function(date) {
        this.owner.time_passed += date - this.last_time
        this.last_time = date
    }

    this.state.running.run.up = function(date) {
    this.last_time = date
    }
*/
}
/*
CountDown.prototype.start = function() {
    this.switch("running")
}

CountDown.prototype.pause = function() {
    this.switch("paused")
}

CountDown.prototype.remain = function() {
    return this.initial_time - this.time_passed
};
*/

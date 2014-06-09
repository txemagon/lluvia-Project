Clock.prototype = new Device
Clock.prototype.constructor = Clock


function Clock(countdown_seconds) {
	this.state
	this.start_time = time.now	
	this.total_time = countdown_seconds
	this.remaining_time = start_time + remaining_time
	this.before = start_time
}

Clock.prototype.reset = function() {}

Clock.prototype.get_count = function() {}

Clock.prototype.run = function(now) {}

Clock.prototype.pause = function() {}

Clock.prototype.resume = function() {}

Clock.prototype.get_string = function() {}
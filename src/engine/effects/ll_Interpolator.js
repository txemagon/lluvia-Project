Interpolator.prototype = new Thread
Interpolator.prototype.constructor = Interpolator

function Interpolator(initial_point, final_point, variation) {
    this.current_point = this.initial_point = initial_point
    this.final_point = final_point
    this.variation = variation
    //a = "0123456789abcdef"
    //a[i % a.length]
}


Interpolator.prototype.run = function() {
    if (this.variation instanceof Object && "add" in this.variation)
        this.current_point.add$B(this.variation)
    else
        this.current_point += this.variation

}
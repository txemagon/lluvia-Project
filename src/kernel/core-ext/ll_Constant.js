function Constant(position) {
    this.position = position
}
Constant.prototype.valueOf = function () {
    return this.name
}
Constant.prototype.toString = function () {
    return this.position
}

Constant.enumerate = function (name, value, array) {
    try{
        if(!(eval(name).constructor.name == "Constant")){
            eval(name + " = new Constant(array.length)")
            array.push(value)
        }
        else
           return
    }
    catch(err){
            eval(name + " = new Constant(array.length)")
            array.push(value)
    }
}

var b = []
var a = []
Constant.enumerate("p", 35, b)
b[0]
p.position

a[0] = 5
a[1] = 6
Constant.enumerate("p", 35, a)
p.position

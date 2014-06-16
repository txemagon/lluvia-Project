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
            position = array.length
            array[eval(name + " = new Constant(position)")] = value
        }
        else
           return
    }
    catch(err){
            position = array.length
            array[eval(name + " = new Constant(position)")] = value
    }
}

var b = []
var a = []
Constant.juntar("p", 35, b)
b[p]
b[0]
p.position

a[0] = 5
a[1] = 6
Constant.juntar("p", 35, a)
p.position

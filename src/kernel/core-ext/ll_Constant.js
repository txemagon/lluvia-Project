function Constant(position) {
    this.position = position
}
Constant.prototype.valueOf = function () {
    return this.name
}
Constant.prototype.toString = function () {
    return this.position
}
var b = [
]
Constant.juntar = function (value, pos, valor) {
    eval("value = new Constant(pos)")
    b[value] = valor
}
Constant.juntar(casa, 0, 35)
b[casa]
Constant.juntar(c,1,65)
b[c]


function TableSymbols(elements) {
    this.elements = elements || []
}

TableSymbols.prototype.insert = function(element) {
    this.elements.push(element)
}

TableSymbols.prototype.search = function(element) {
    var element = element || {}

    for (var i = 0; i < this.elements.length; i++)
    //alert(this.elements[i].name + ";;;" + element.name)
        if (this.elements.name == element.name)
            return true
    return false
}
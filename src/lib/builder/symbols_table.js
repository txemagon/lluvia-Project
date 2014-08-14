function SymbolsTable(elements) {
    this.elements = elements || []
}

SymbolsTable.prototype.insert = function(name, value) {
    var element = {
        name: name,
        value: value
    }
    this.elements.push(element)
}

SymbolsTable.prototype.update_value = function(position, new_value) {
    this.elements[position].value = new_value
}

SymbolsTable.prototype.position = function(element) {
    var position = null
    var name = element.name || ""

    for (var i = 0; i < this.elements.length; i++) {
        if (name == this.elements[i])
            position = i
    }

    return position
}

SymbolsTable.prototype.is_in$U = function(element) {
    var element = element || {}

    for (var i = 0; i < this.elements.length; i++)
        if (this.elements.name == element.name)
            return true
    return false
}
/*
SymbolsTable.prototype.test = function(element) {
    var element = element || {}

    if (!this.search(element.name)) {
        this.insert(element)
    } else {}

    return no_idea
}
*/
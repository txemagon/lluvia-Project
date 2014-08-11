/**
 *
 */
function Builder(prefix, space_name) {
    this.lluvia_nodes = []
    this.prefix = prefix || ""
    this.space_name = space_name
    this.table_symbols = new TableSymbols()
}

Builder.prototype.get_lluvia_nodes = function(actual_node) {
    var actual_node = actual_node || {}

    for (var i = 0; i < actual_node.childNodes.length; i++) {
        if (actual_node.childNodes[i].childNodes.length)
            this.get_lluvia_nodes(actual_node.childNodes[i])
        if (actual_node.childNodes[i].className != undefined && Builder.is_lluvia_element$U(actual_node.childNodes[i].className))
            this.lluvia_nodes.push(actual_node.childNodes[i])
        else if (actual_node.childNodes[i].nodeType == Node.COMMENT_NODE && Builder.is_lluvia_comment$U(actual_node.childNodes[i].nodeValue))
            this.lluvia_nodes.push(actual_node.childNodes[i])
    }
}

Builder.is_lluvia_element$U = function(element, separator) {
    var separator = separator || "-"
    var previous_word = element.split(separator)

    if (previous_word[0] == "lluvia" || previous_word[0] == "ll")
        return true
    return false
}

Builder.is_lluvia_comment$U = function(comment, token) {
    var comment = comment || ""
    var token = token || "#!ll"
    var not_found = -1

    if (comment.search(token) != not_found)
        return true
    return false
}

Builder.prototype.analize_node = function(node, prefix) {
    var node = node || {}
    var type = node.className.split("-")
    var result = {
        name: prefix + node.id,
        type: type[1],
        params: node.dataset.params,
        data_set: node.dataset
    }

    return result
}

Builder.prototype.clasify_element = function(element) {
    var element = element || {}

    if (element.type != "undefined")
        return "object"
}

Builder.prototype.create_element = function(node, type) {
    var nodes = node || {}
    var prefix = prefix || ""

    switch (type) {
        case "object":
            if (typeof this.space_name == "undefined") {
                eval.call(null, "var " + node.name + " = new " + node.type + "(" + node.params + ")")
            } else {
                this.space_name[node.name] = eval("new " + node.type + "(" + node.params + ")")
            }
            break
    }
}

Builder.prototype.create_methods_element = function() {
    var dataset = element.data_set || {}
    var new_methods = []

    function search_new_methods() {
        for (var i in dataset)
            if (i.search("method$") == 0) {
                var method = {
                    name: i.replace("method$", ""),
                    block: dataset[i]
                }
                methods.push(method)
            }
    }

    search_new_methods()
    for (var i = 0; i < new_methods.length; i++)
        eval(element.name + "." + methods[i].name + "(" + methods[i].params + ")")
}

Builder.prototype.run_methods = function(element) {
    var dataset = element.data_set || {}
    var methods = []

    function search_methods() {
        for (var i in dataset)
            if (i.search("run$") == 0) {
                var method = {
                    name: i.replace("run$", ""),
                    params: dataset[i]
                }
                methods.push(method)
            }
    }

    search_methods()
    for (var i = 0; i < methods.length; i++)
        eval(element.name + "." + methods[i].name + "(" + methods[i].params + ")")
}

Builder.prototype.search_prefix = function(node_body) {
    var prefix = ""

    if (node_body.dataset.lluviaPrefix)
        prefix = node_body.dataset.lluviaPrefix
    return prefix
}

Builder.prototype.build = function() {
    this.get_lluvia_nodes(document)

    if (this.prefix == "")
        this.prefix = this.search_prefix(document.body)

    for (var i = 0; i < this.lluvia_nodes.length; i++) {
        var analize_result = this.analize_node(this.lluvia_nodes[i], this.prefix)
        var clasify_result = this.clasify_element(analize_result)
        this.create_element(analize_result, clasify_result)
        //this.create_methods_element(analize_result)
        this.run_methods(analize_result)
    }
}
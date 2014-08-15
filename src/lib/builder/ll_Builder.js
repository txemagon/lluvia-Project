/**
 *
 */
function Builder() {
    this.lluvia_nodes = []
    this.prefix = ""
    this.space_name = null
    this.symbols_table = new SymbolsTable()

    if (arguments.length)
        for (var i = 0; i < arguments.length; i++) {
            if (typeof arguments[i] == "string")
                this.prefix = arguments[i]
            else if (typeof arguments[i] == "object")
                this.space_name = arguments[i]
        }
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

Builder.prototype.analize = function() {

}

/*
 * Debe leer y diferenciar todo lo que el texto contenga para que luego el analizador
 * lo interprete correctamente.
 *
 * Que cojones tiene que diferenciar:
 *    - Todas las palabras separadas por espacio o comas.
 *    - Si va entre comillas es un string.
 *    - Si es un valor numerico es un number
 *    - Tipos de datos simples y como diferenciarlos:
 *        + String: cada vez que se abra una comilla simple o doble y hasta que se vuelva a cerrar ese mismo tipo de comilla. Se debera tener cuidado con los caracteres especiales.
          + Boolean: comparando si la palabra que acaba de leer es true o false. En realiddad diferenciar todas las palabras reservadas.
          + Number: si es un numero se analiza hasta que acabe la serie sin espacios en blanco.
 *    - Tipos de datos compuestos(por referencia): objeto, matriz.
 *    - Tipos de datos especiales: null, undefined.

 */
Builder.prototype.scanner = function(text) {

}

Builder.prototype.analize_node = function(node, prefix) {
    var node = node || {}
    var descompose_node = node.className.split(" ")
    var class_css = descompose_node[1]
    var type = descompose_node[0].split("-")

    var result = {
        id: node.id,
        name: prefix + node.id,
        type: type[1],
        class_css: class_css,
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
    switch (type) {
        case "object":
            if (this.space_name == null)
                eval.call(null, "var " + node.name + " = new " + node.type + "(" + node.params + ")")
            else
                this.space_name[node.name] = eval("new " + node.type + "(" + node.params + ")")
            node.id.className = node.class_css
            break
    }
}

Builder.prototype.create_methods_element = function(element) {
    var dataset = element.data_set || {}
    var element_class = element.type || ""
    var new_methods = []

    function search_new_methods() {
        for (var i in dataset) {
            if (i.search("method") == 0) {
                var method = {
                    name: i.replace("method$", ""),
                    block: dataset[i]
                }
                new_methods.push(method)
            }
        }
    }

    search_new_methods()
    for (var i = 0; i < new_methods.length; i++) {
        eval(element.name + "." + new_methods[i].name + "=" + new_methods[i].block)
    }
}

Builder.prototype.run_methods = function(element) {
    var dataset = element.data_set || {}
    var methods = []

    function search_methods() {
        for (var i in dataset)
            if (i.search("run") == 0) {
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

// TODO: hacer build del Builder con una tabla de simbolos. Good luck!!
Builder.prototype.build = function() {
    var round = 2
    var element_creates = []
    this.get_lluvia_nodes(document)

    if (this.prefix == "")
        this.prefix = this.search_prefix(document.body)

    function is_in$U(name) {
        var result = false
        for (var i = 0; i < element_creates.length; i++)
            if (element_creates[i] == name)
                result = true
        return result
    }

    for (var a = 0; a < round; a++) {
        for (var i = 0; i < this.lluvia_nodes.length; i++) {
            var analize_result = this.analize_node(this.lluvia_nodes[i], this.prefix)
            var clasify_result = this.clasify_element(analize_result)
            if (!is_in$U(analize_result.name)) {
                try {
                    this.create_element(analize_result, clasify_result)
                    this.create_methods_element(analize_result)
                    this.run_methods(analize_result)
                    element_creates.push(analize_result.name)
                } catch (e) {
                    console.log(e)
                }
            }
        }
    }
    /*
    // First lap
    var num_variables = []
    for (var i = 0; i < this.lluvia_nodes.length; i++) {
        var analize_result = this.analize_node(this.lluvia_nodes[i], this.prefix)
        var clasify_result = this.clasify_element(analize_result)
        if (!this.symbols_table.is_in$U(this.lluvia_nodes[i]))
            this.symbols_table.insert(analize_result.name, analize_result)
            //this.create_element(analize_result, clasify_result)
            //this.create_methods_element(analize_result)
            //this.run_methods(analize_result)
        if (clasify_result == "object")
            num_variables.push(analize_result.name)
    }
    alert(num_variables.toSource())

    // Second lap
    for (var i = 0; i < this.lluvia_nodes.length; i++) {

    }
    /*
    for (var i = 0; i < this.lluvia_nodes.length; i++) {
        var analize_result = this.analize_node(this.lluvia_nodes[i], this.prefix)
        var clasify_result = this.clasify_element(analize_result)
    }


*/
}

/*
    Build con symbols_table:

    Primero y ante todo buscar las variables del loader. Teniendo en cuenta que todo
    son objetos(o casi todo) no deberia ser muy dificil.

    Dos pasadas:
        - La primera para almacenar todas las variables y si tienen valor.
        - La segunda para actualizar todos los valores que sean necesarios.
*/
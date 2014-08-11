/**
  *
  */
function Builder(){
    this.lluvia_nodes = []
    this.table_symbols = new TableSymbols()
}

Builder.prototype.get_lluvia_nodes = function(actual_node){
    var actual_node = actual_node || {}

    for(var i = 0; i<actual_node.childNodes.length; i++){
    	if(actual_node.childNodes[i].childNodes.length)
    		this.get_lluvia_nodes(actual_node.childNodes[i])
            if(actual_node.childNodes[i].className != undefined && Builder.is_lluvia_element$U(actual_node.childNodes[i].className))
        	    this.lluvia_nodes.push(actual_node.childNodes[i])
            else if (actual_node.childNodes[i].nodeType == Node.COMMENT_NODE && Builder.is_lluvia_comment$U(actual_node.childNodes[i].nodeValue))
                this.lluvia_nodes.push(actual_node.childNodes[i])
    }
}

Builder.is_lluvia_element$U = function(element, separator) {
	var separator = separator || "-"
	var previous_word = element.split(separator)

    if(previous_word[0] == "lluvia" || previous_word[0] == "ll")
    	return true
    return false
}

Builder.is_lluvia_comment$U = function(comment, token){
    var comment = comment || ""
    var token = token || "#!ll"
    var not_found = -1

    if(comment.search(token) != not_found)
        return true
    return false
}

Builder.prototype.analize_node = function(node){
    var node = node || {}
    var type = node.className.split("-")
    var result = {name: node.id, type: type[1], params: node.dataset.params}

    return result
}

Builder.prototype.clasify_element = function(element){
    var element = element || {}

    if(element.type != "undefined")
        return "object"
}

Builder.prototype.create_element = function(node, type, prefix) {
    var nodes = node || {}
    var prefix = prefix || ""

    switch(type){
        case "object":
            eval.call(null, "var " + prefix + node.name + " = new " + node.type + "(" + node.params + ")")
            break
    }
}

Builder.prototype.build = function(){
    for(var i=0; i<this.lluvia_nodes.length;i ++){
        var analize_result = this.analize_node(this.lluvia_nodes[i])
        var clasify_result = this.clasify_element(analize_result)
        this.create_element(analize_result, clasify_result)
    }
}
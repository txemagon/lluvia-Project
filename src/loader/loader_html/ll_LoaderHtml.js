function LoaderHtml(){
	this.all_lluvia_elements = []
    this.ll = []
}

LoaderHtml.prototype.get_nodes = function(){
    for(var i=0; i<document.body.children.length; i++){
        var actual_node = document.body.children[i]
        if(LoaderHtml.is_lluvia_element$U(actual_node.className)){
            var node_class = actual_node.className.split(":")
            this.all_lluvia_elements.push({name: actual_node.id, class: node_class[1], data: actual_node.dataset})       
        }
    }
}

LoaderHtml.split_elements = function(elements_lluvia, separator){
    var separator = separator || ","
    var elements = elements_lluvia.split(separator) || []
    for(var i = 0 ; i<elements.length; i++){
        elements[i] = "'" + elements[i] + "'"
    }

    return elements
}

LoaderHtml.is_lluvia_element$U = function(element) {
	var previous_word = element.split(":")

    if(previous_word[0] == "lluvia" || previous_word[0] == "ll")
    	return true
    return false
}

LoaderHtml.prototype.create_objects = function(){
    for(var i = 0; i<this.all_lluvia_elements.length; i++){
        var actual_obj = this.all_lluvia_elements[i]
        var class_type = actual_obj.class.toLowerCase()
        var variable = actual_obj.name 
        var obj_class = actual_obj.data.type

        if( class_type == "device"){
            var self_events = LoaderHtml.split_elements(actual_obj.data.self_events)
            eval.call(null, "var " + variable + " = new " + obj_class + "('" + actual_obj.name + "', [" + self_events + "])")
            this.ll.push("var " + variable + " = new " + obj_class + "('" + actual_obj.name + "', [" + self_events + "])")
        }
        else if(class_type == "gate"){
            eval.call(null, "var " + variable + " = new " + obj_class + "('" + actual_obj.name + "')")    
        }
    }
}
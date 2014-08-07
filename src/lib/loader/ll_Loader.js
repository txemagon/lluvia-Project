
function Loader(){
	
}

Loader.lluvia_nodes = []

Loader.get_lluvia_nodes = function(actual_node){
    for(var i = 0; i<actual_node.children.length; i++){
    	if(actual_node.children[i].children.length)
    		Loader.get_lluvia_nodes(actual_node.children[i])
        if(Loader.is_lluvia_element$U(actual_node.children[i].className)){
    	//alert(actual_node.children[i].className)
        	Loader.lluvia_nodes.push(actual_node.children[i])
        }
    }
}

Loader.get_lluvia_comments = function(actual_node){
    for(var i = 0; i<actual_node.children.length; i++){
    	if(actual_node.children[i].children.length)
    		Loader.get_lluvia_comments(actual_node.children[i])
        if(actual_node.children[i].nodeType == 1)
        	alert(actual_node.children[i].nodeType)
    }
}

Loader.is_lluvia_element$U = function(element, separator) {
	var separator = separator || "-"
	var previous_word = element.split(separator)

    if(previous_word[0] == "lluvia" || previous_word[0] == "ll")
    	return true
    return false
}

Loader.prototype.gather_nodes = function(){}

Loader.prototype.analize_nodes = function(){}

function main(){
	var l = new Loader()
	Loader.get_lluvia_comments(document)
	Loader.get_lluvia_nodes(document)
}
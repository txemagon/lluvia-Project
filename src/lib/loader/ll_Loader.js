
function Loader(){
	
}

Loader.lluvia_nodes = []

Loader.get_lluvia_nodes = function(actual_node){
    var actual_node = actual_node || {}

    for(var i = 0; i<actual_node.childNodes.length; i++){
    	if(actual_node.childNodes[i].childNodes.length)
    		Loader.get_lluvia_nodes(actual_node.childNodes[i])
            if(actual_node.childNodes[i].className != undefined && Loader.is_lluvia_element$U(actual_node.childNodes[i].className))
        	    Loader.lluvia_nodes.push(actual_node.childNodes[i])
            else if (actual_node.childNodes[i].nodeType == Node.COMMENT_NODE)
                Loader.lluvia_nodes.push(actual_node.childNodes[i])
    }
}

Loader.is_lluvia_element$U = function(element, separator) {
	var separator = separator || "-"
	var previous_word = element.split(separator)

    if(previous_word[0] == "lluvia" || previous_word[0] == "ll")
    	return true
    return false
}

Loader.is_lluvia_comment$U = function() {}

Loader.prototype.gather_nodes = function(){}

Loader.prototype.analize_nodes = function(){}

function main(){
	var l = new Loader()
	Loader.get_lluvia_nodes(document)
    alert(Loader.lluvia_nodes.length)
}
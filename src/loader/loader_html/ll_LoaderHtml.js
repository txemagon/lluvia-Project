function LoaderHtml(){
	this.all_nodes = []

}

LoaderHtml.prototype.get_nodes = function(){
    for(var i=0; i<document.body.children.length; i++){
    	var actual_node = document.body.children[i].id
        if(is_lluvia_element$U(actual_node))
        	this.all_nodes.push(actual_node)
    }

    //var gate = document.body.children[0].id
    //eval.call(null, new_device(gate))

var element = document.getElementById(this.all_nodes[0]).dataset

for(var i in element)
    alert(element[i])
}

function is_lluvia_element$U(element){
	var previous_word = element.split(":")

    if(previous_word[0] == "lluvia" || previous_word[0] == "ll")
    	return true
    return false
}

LoaderHtml.prototype.create_tree_nodes = function(){

}

LoaderHtml.prototype.create_types = function(){
    
}


function new_device(view){

	var d = "" + "\n" +  
	view + "Device.prototype = new Device"+ "\n" +  
    view + "Device.prototype.constructor = " + view + "Device"+ "\n" +  

    "function "+ view + "Device ("+view+") {"+ "\n" +  
        "var that = this"+ "\n" +  
        "var args = arguments"+ "\n" +  

        
        "this.self_events = []"+ "\n" +  
 
    "}"

    return d
}

/*

var loader = new LoaderHtml()
        loader.get_nodes()
        loader.create_tree_nodes()
        loader.create_types()

*/
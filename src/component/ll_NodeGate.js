NodeGate.prototype = new Gate
NodeGate.prototype.constructor = NodeGate
NodeGate.prototype.super = Gate

function NodeGate(view, parent, upstream, visitor){
   var that = this
   var args = arguments

   function initialize(){
     that.super.apply(that, args)
     that.spawn()
   }

   if (arguments.length)
      initialize()
}

NodeGate.createDOMNode = function(content, HTMLElementType, HTMLAttributes, parent){

   var element = document.createElement(HTMLElementType)

   if (typeof(content) === "string")
      content = document.createTextNode(content)

   if (content)
      element.appendChild(content)

   if (HTMLAttributes)
     if(HTMLAttributes instanceof Array)
        HTMLAttributes.each( function(key_value){ element.setAttribute(key_value[0], key_value[1]) } )
     else if (typeof(HTMLAttributes) === "object")
        HTMLAttributes.self_keys().each( function(key){ element.setAttribute(key, HTMLAttributes[key]) } )

   
   if (parent)
      parent.appendChild(element)

   return element
}

NodeGate.prototype.spawn = function(){
   var data = this.source
   if ( !data.is_root$U() ){
     var top_frame = NodeGate.createDOMNode( "", "div", {class: "TopFrame"}, this.panel)  
     NodeGate.createDOMNode( "espa", 
	                     "div", 
			     {class: "FramePart Left" + 
			             (data.is_first$U() ? "" : " Upper" )}, 
			     top_frame)  
     NodeGate.createDOMNode( "espa", 
	                     "div", 
			     {class: "FramePart Right" +
			     (data.is_last$U() ? "" : " Upper" )}, 
			     top_frame)
   }
   var content_frame = NodeGate.createDOMNode(data.object, "div", [["class", "Frame"]], this.panel)
   if ( !data.is_leaf$U() ){
     var bottom_frame = NodeGate.createDOMNode( "", "div", {class: "BottomFrame"}, this.panel) 
     NodeGate.createDOMNode( "espa", "div", {class: "FramePart Left Lower"}, bottom_frame)  
     NodeGate.createDOMNode( "espa", "div", {class: "FramePart Right Lower"}, bottom_frame)
   }
   
   var children = NodeGate.createDOMNode("", "div", {class: "ChildrenNodes"}, this.panel)
   this.panel.className = "NodeContainer"

   if (data.children && data.children.length)
	for(var i=0; i<data.children.length; i++)
	   var ng = this.device.newGate(NodeGate, "node_" + NodeManager.fetch_id(), children, data.children[i] )

}

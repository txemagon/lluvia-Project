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

   if (HTMLAttributes && HTMLAttributes instanceof Array)
     HTMLAttributes.each( function(key_value){ element.setAttribute(key_value[0], key_value[1]) } )
   
   if (parent)
      parent.appendChild(element)

   return element
}

NodeGate.prototype.spawn = function(){
   var data = this.source
   var content_frame = NodeGate.createDOMNode(data.object, "div", [["class", "Frame"]])
   var container = NodeGate.createDOMNode(content_frame, "div", [["class", "NodeContainer"]])
   this.panel.appendChild(container)

   if (data.children && data.children.length)
	for(var i=0; i<data.children.length; i++)
	   this.device.newGate(NodeGate, "node_" + NodeManager.fetch_id(), container, data.children[i] )

}

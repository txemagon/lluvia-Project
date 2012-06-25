NodeManager.prototype = new Device
NodeManager.prototype.constructor = NodeManager
NodeManager.prototype.super = Device

function NodeManager(view, initial_data){
   var that = this
   var args = arguments

   function initialize(){
     that.super.apply(that, args)
     that.data = new ChartNode(initial_data)
     that.newGate(NodeGate, "node_" + NodeManager.fetch_id(), that.view, that.data)
   }

   if (arguments.length)
      initialize()
}

NodeManager.ids = 0
NodeManager.fetch_id = function(){ return NodeManager.ids++ }

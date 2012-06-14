function ChartNode(object){

  this.object = object
  this.children = []
}

ChartNode.to = function(object){
   if (object instanceof ChartNode)
    return object
   return new ChartNode(object)
}

ChartNode.is_parent$U = function(node){  return node instanceof Array }
 
ChartNode.prototype.insert_children = function (child){
    this.children.push(child = ChartNode.to(child))  
    return child
}

ChartNode.prototype.first = function (){
    return this.children[0]
}

ChartNode.prototype.last = function (){
    return this.children[this.children.length - 1]
}


ChartNode.prototype.append = function(child){

    var new_node

    /* Inserting a whole branch */
    if (child instanceof Array)
        for (var i=0; i<child.length; i++)
            if (ChartNode.is_parent$U(child[i])){
                new_node = this.insert_children(child[i][0])
                if (typeof(child[i][1]) !== "undefined" )
                   new_node.append(child[i][1])
            }else
                this.insert_children(child[i])

    /* Inserting a leaf node */
   else 
       this.insert_children(child)
  
}


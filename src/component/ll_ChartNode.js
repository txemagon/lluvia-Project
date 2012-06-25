function ChartNode(object){
   
   var more_children = false
   if (object instanceof Array){
     more_children = object[1] 
     object = object[0]
   }
   this.object = object
   this.children = []
   if (more_children)
     this.append(more_children)
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

ChartNode.prototype.first = function (child){
    if(!child)    
        return this.children[0]

    new_first = this.detach(child)
    this.children.unshift(child)
 }

ChartNode.prototype.last = function (){
    return this.children[this.children.length - 1]
}

ChartNode.prototype.find = function(child){
    var pos = this.children.indexOf(child)
    return this.children[pos]
}

ChartNode.prototype.has$U = function (child, recursive){  
      
    return (this.children.indexOf(child) != null) || 
          (recursive == true && this.children.inject(false, function(memo, elem){
             return memo || ( (elem instanceof ChartNode) && elem.has$U(child))
          }))
}
ChartNode.prototype.detach = function(child){
   var pos = this.children.indexOf(child)
   this.children.splice(pos, 1)
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


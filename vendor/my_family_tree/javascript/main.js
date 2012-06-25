logger = document.getElementById("logger")

var family_tree

function main(){ 
  family_tree = new NodeManager("frame", ["José María", [
	                                         ["José Antonio", ["Yolanda", "Sonia"]], 
						 ["Jesús", ["Txema"]], 
						 ["Francisco", ["Chus", "Marijose", "Pertur", "Rafa"]]
						 ]]) 
}

function required_packages(){
	PackageManager.drop("builder")
}

function main(){
    var l = new Builder()
	Builder.get_lluvia_nodes(document)
	alert(Builder.lluvia_nodes.length)		
}
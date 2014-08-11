function require_package() {
    PackageManager.drop("builder")
}

function main() {
    var b = new Builder()
    b.get_lluvia_nodes(document)
    b.build()
}
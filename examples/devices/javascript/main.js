function require_package() {
    PackageManager.drop("builder")
}

function main() {
    var ll = {}
    var b = new Builder("ll_")
    b.build()

    $Processor.register(ll_hands)
}
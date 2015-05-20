
function require_package() {
    PackageManager.drop("builder")
}

function main() {
    var ll = {}
    var b = new Builder("ll_")
    b.build()

    ll_object_window.plug( new TangledDevice(null) )
    
    //$Processor.register(ll_object_window) 
}
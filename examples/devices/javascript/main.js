function require_package() {
    PackageManager.drop("builder")
}

function main() {

    // var ll = {}
    // var b = new Builder(ll)
    // b.build()
    var a = [
        new CountDown("count_down1", 120000),
        new CountDown("count_down2", 60000),
    ]
}
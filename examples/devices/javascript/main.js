function require_package() {
    PackageManager.drop("builder")
}

function main() {

    var count_down = new CountDown(120)
    count_down.run()
    alert(count_down.current)
}
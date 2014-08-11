function require_package(){
    PackageManager.drop("builder")
}

function main() {
<<<<<<< HEAD
    var count_down = new CountDown(120)
=======
    var b = new Builder()
    b.get_lluvia_nodes(document)
    b.build()

    alert(count_down.initial_time)
>>>>>>> 90435685da58e9f45de04cd4ffd8c946c539a6c0
}
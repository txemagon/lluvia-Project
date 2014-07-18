function test() {
    // Write your tests here.
    PackageManager.drop("shape", function() {
        var l = new Line()
        alert(l.toSource())
    })

}
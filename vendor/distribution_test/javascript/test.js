function test() {
    // Write your tests here.
    //    PackageManager.drop("shape", function() {
    //        var l = new Line()
    //        alert(l.toSource())
    //    })

    // 1º Carga de un paquete desde required_packages()
    //var a = new Angle(0.75)
    //alert(a.toSource())

    // 2º Carga de un paquete drop()
    /*
    PackageManager.drop("mathematics", function() {
        var a = new Angle(0.63)
        alert(a.toSource())
    })
    // Con dos necesita un tiempo entre ellos
    PackageManager.drop("shape", function() {
        var l = new Line()
        alert(l.toSource())
    })
    */
    // 3º Carga de un paquete con download() y drop()
    /*
    PackageManager.drop("mathematics")
    PackageManager.drop("shape")

    PackageManager.download(function() {
        var a = new Angle(0.33)
        var l = new Line()

        alert(a.toSource() + " ; " + l.toSource())
    })
    */
}
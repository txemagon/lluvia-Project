function test() {
    // Write your tests here.

    // 1º Carga de un paquete desde required_packages()
    /*
    var a = new Angle(0.75)
    var b = new Line()

         */
    // 2º Carga de un paquete drop()
    /*
     */
    PackageManager.drop("mathematics", function() {
        var a = new Angle(0.63)
            //alert(a.toSource())
        console.log(a)
    })
    // Con dos necesita un tiempo entre ellos
    PackageManager.drop("shape", function() {
        var l = new Line()
            //alert(l.toSource())
        console.log(l)
    })
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
function test() {
    // Write your tests here.

    var a = new VersionNumber("1.5.4")
    a.branch("", "1.5.4", function action() {
        alert("Hello")
    })
    a[a]()
}
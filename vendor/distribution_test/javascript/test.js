function test() {
    // Write your tests here.

    var a = new FixedVector([2, 3], [4, 6])
    var b = new FixedVector(a)
    alert(b.foot.Coord.toSource())
}
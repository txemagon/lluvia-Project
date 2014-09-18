function required_packages() {

}

function main() {
    var loader = new LoaderHtml()
    loader.get_nodes()
    loader.create_objects()

    alert(test1.toSource())
    alert(test3.toSource())
    //ll_test1.addPort("event1", ll_test2)
    //ll_test1.fireEvent(ll_test1.newMessage("sync", "event1", this))
}
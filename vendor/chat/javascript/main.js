function required_packages() {
    //PackageManager.drop("mathematics")
}

function main() {

    var user = prompt("Who are you?")
    var chat_device = new ChatDevice("chat")
    chat_device.new_user(user)
}
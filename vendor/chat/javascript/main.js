function required_packages() {
	
}

function main() {
	alert(2)
    var user = prompt("Who are you?")
    var chat_device = new ChatDevice("chat")
    chat_device.new_user(user)
}
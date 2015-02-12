function register() {
	window.location.href="register.html"
}

function check() {
	var username = document.getElementById("username")
	var password = document.getElementById("password")

	if (username.length > 20) {
		alert("El nombre de usuario no puede ser tan largo.")
		return false
	}

	if (password.length < 6) {
		alert("La contraseña debe tener al menos 6 caracteres.")
		return false
	}

	return true
}
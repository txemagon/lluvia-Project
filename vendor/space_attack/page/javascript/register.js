function validation() {
	var username = document.getElementById("username")
	var email = document.getElementById("email")
	var password = document.getElementById("password")

	//Se valida el nombre de usuario
	if (username.length > 20) {
		alert("El nombre de usuario no puede ser tan largo.")
		return false
	}

	if (username == null || username == 0 || /^\s+$/.test(username) ) {
		alert("El nombre de usuario no puede ser un espacio en blanco.")
		return false
	}

	//Se valida la dirección de email
	if (!(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)/.test(email)) ) {
		alert("Introduzca una dirección de correo electrónico correcta.")
		return false;
	}

	//Se valida la contraseña
	if (password.length < 6 || password == null || /^\s+$/.test(password) ) {
		alert("La contraseña debe tener al menos 6 carácteres.")
		return false
	}
}
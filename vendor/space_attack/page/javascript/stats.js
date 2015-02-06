function play(){
    window.location.href="planets.html";
}

var skill_points = 5
var damage_points = 0
var resistance_points = 0
var speed_points = 0

/*Funciones aumentar */

function update_damage() {	

	if (damage_points == 4 && skill_points != 0) {
		document.getElementById("imagen_daño").src = "images/bar/five_bar.png";
		skill_points -= 1
		damage_points += 1
	}

	if (damage_points == 3 && skill_points != 0) {
		document.getElementById("imagen_daño").src = "images/bar/four_bar.png";
		skill_points -= 1
		damage_points += 1
	}

	if (damage_points == 2 && skill_points != 0){
		document.getElementById("imagen_daño").src= "images/bar/three_bar.png"
		skill_points -= 1
		damage_points += 1
	}

	if (damage_points == 1 && skill_points != 0){
		document.getElementById("imagen_daño").src= "images/bar/two_bar.png"
		skill_points -= 1
		damage_points += 1
	}	

	if (damage_points == 0 && skill_points != 0){
		document.getElementById('imagen_daño').src= "images/bar/one_bar.png"
		skill_points -= 1
		damage_points += 1
	}

	if (skill_points == 5) {
		document.getElementById("points").innerHTML = "5"
	}else { 
		if (skill_points == 4) {
			document.getElementById("points").innerHTML = "4"
		}else {
			if (skill_points == 3) {
				document.getElementById("points").innerHTML = "3"
			}else {
				if (skill_points == 2) {
					document.getElementById("points").innerHTML = "2"
				}else {
					if (skill_points == 1) {
						document.getElementById("points").innerHTML = "1"
					}else {
						if (skill_points == 0) {
							document.getElementById("points").innerHTML = "0"
						}
					}
				}
			}
		}
	}

}

function update_resistance() {	

	if (resistance_points == 4 && skill_points != 0) {
		document.getElementById("imagen_resistencia").src = "images/bar/five_bar.png";
		skill_points -= 1
		resistance_points += 1
	}

	if (resistance_points == 3 && skill_points != 0) {
		document.getElementById("imagen_resistencia").src = "images/bar/four_bar.png";
		skill_points -= 1
		resistance_points += 1
	}

	if (resistance_points == 2 && skill_points != 0){
		document.getElementById("imagen_resistencia").src= "images/bar/three_bar.png"
		skill_points -= 1
		resistance_points += 1
	}

	if (resistance_points == 1 && skill_points != 0){
		document.getElementById("imagen_resistencia").src= "images/bar/two_bar.png"
		skill_points -= 1
		resistance_points += 1
	}

	if (resistance_points == 0 && skill_points != 0){
		document.getElementById('imagen_resistencia').src= "images/bar/one_bar.png"
		skill_points -= 1
		resistance_points += 1
	}

	if (skill_points == 5) {
		document.getElementById("points").innerHTML = "5"
	}else { 
		if (skill_points == 4) {
			document.getElementById("points").innerHTML = "4"
		}else {
			if (skill_points == 3) {
				document.getElementById("points").innerHTML = "3"
			}else {
				if (skill_points == 2) {
					document.getElementById("points").innerHTML = "2"
				}else {
					if (skill_points == 1) {
						document.getElementById("points").innerHTML = "1"
					}else {
						if (skill_points == 0) {
							document.getElementById("points").innerHTML = "0"
						}
					}
				}
			}
		}
	}

}


function update_speed() {	

	if (speed_points == 4 && skill_points != 0) {
		document.getElementById("imagen_velocidad").src = "images/bar/five_bar.png";
		skill_points -= 1
		speed_points += 1
	}

	if (speed_points == 3 && skill_points != 0) {
		document.getElementById("imagen_velocidad").src = "images/bar/four_bar.png";
		skill_points -= 1
		speed_points += 1
	}

	if (speed_points == 2 && skill_points != 0){
		document.getElementById("imagen_velocidad").src= "images/bar/three_bar.png"
		skill_points -= 1
		speed_points += 1
	}

	if (speed_points == 1 && skill_points != 0){
		document.getElementById("imagen_velocidad").src= "images/bar/two_bar.png"
		skill_points -= 1
		speed_points += 1
	}

	if (speed_points == 0 && skill_points != 0){
		document.getElementById('imagen_velocidad').src= "images/bar/one_bar.png"
		skill_points -= 1
		speed_points += 1
	}

	if (skill_points == 5) {
		document.getElementById("points").innerHTML = "5"
	}else { 
		if (skill_points == 4) {
			document.getElementById("points").innerHTML = "4"
		}else {
			if (skill_points == 3) {
				document.getElementById("points").innerHTML = "3"
			}else {
				if (skill_points == 2) {
					document.getElementById("points").innerHTML = "2"
				}else {
					if (skill_points == 1) {
						document.getElementById("points").innerHTML = "1"
					}else {
						if (skill_points == 0) {
							document.getElementById("points").innerHTML = "0"
						}
					}
				}
			}
		}
	}

}

/*Funciones de disminuir*/

function downgrade_damage() {

	if(damage_points == 1){
		document.getElementById('imagen_daño').src = "images/bar/empty_bar.png"
		skill_points += 1
		damage_points -= 1
	}	

	if(damage_points == 2){
		document.getElementById('imagen_daño').src = "images/bar/one_bar.png"
		skill_points += 1
		damage_points -= 1
	}

	if(damage_points == 3){
		document.getElementById('imagen_daño').src = "images/bar/two_bar.png"
		skill_points += 1
		damage_points -= 1
	}


	if(damage_points == 4){
		document.getElementById('imagen_daño').src = "images/bar/three_bar.png"
		skill_points += 1
		damage_points -= 1
	}

	if(damage_points == 5){
		document.getElementById('imagen_daño').src = "images/bar/four_bar.png"
		skill_points += 1
		damage_points -= 1 
	}

	if (skill_points == 5) {
		document.getElementById("points").innerHTML = "5"
	}else { 
		if (skill_points == 4) {
			document.getElementById("points").innerHTML = "4"
		}else {
			if (skill_points == 3) {
				document.getElementById("points").innerHTML = "3"
			}else {
				if (skill_points == 2) {
					document.getElementById("points").innerHTML = "2"
				}else {
					if (skill_points == 1) {
						document.getElementById("points").innerHTML = "1"
					}else {
						if (skill_points == 0) {
							document.getElementById("points").innerHTML = "0"
						}
					}
				}
			}
		}
	}

}

function downgrade_resistance() {

	if(resistance_points == 1 && skill_points < 5){
		document.getElementById('imagen_resistencia').src = "images/bar/empty_bar.png"
		skill_points += 1
		resistance_points -= 1
	}	

	if(resistance_points == 2 && skill_points < 5){
		document.getElementById('imagen_resistencia').src = "images/bar/one_bar.png"
		skill_points += 1
		resistance_points -= 1
	}

	if(resistance_points == 3 && skill_points < 5){
		document.getElementById('imagen_resistencia').src = "images/bar/two_bar.png"
		skill_points += 1
		resistance_points -= 1
	}

	if(resistance_points == 4 && skill_points < 5){
		document.getElementById('imagen_resistencia').src = "images/bar/three_bar.png"
		skill_points += 1
		resistance_points -= 1
	}	
	
	if(resistance_points == 5 && skill_points < 5){
		document.getElementById('imagen_resistencia').src = "images/bar/four_bar.png"
		skill_points += 1
		resistance_points -= 1 
	}

	if (skill_points == 5) {
		document.getElementById("points").innerHTML = "5"
	}else { 
		if (skill_points == 4) {
			document.getElementById("points").innerHTML = "4"
		}else {
			if (skill_points == 3) {
				document.getElementById("points").innerHTML = "3"
			}else {
				if (skill_points == 2) {
					document.getElementById("points").innerHTML = "2"
				}else {
					if (skill_points == 1) {
						document.getElementById("points").innerHTML = "1"
					}else {
						if (skill_points == 0) {
							document.getElementById("points").innerHTML = "0"
						}
					}
				}
			}
		}
	}

}

function downgrade_speed() {

	if(speed_points == 1 && skill_points < 5){
		document.getElementById('imagen_velocidad').src = "images/bar/empty_bar.png"
		skill_points += 1
		speed_points -= 1
	}	

	if(speed_points == 2 && skill_points < 5){
		document.getElementById('imagen_velocidad').src = "images/bar/one_bar.png"
		skill_points += 1
		speed_points -= 1
	}

	if(speed_points == 3 && skill_points < 5){
		document.getElementById('imagen_velocidad').src = "images/bar/two_bar.png"
		skill_points += 1
		speed_points -= 1
	}

	if(speed_points == 4 && skill_points < 5){
		document.getElementById('imagen_velocidad').src = "images/bar/three_bar.png"
		skill_points += 1
		speed_points -= 1
	}

	if(speed_points == 5 && skill_points < 5){
		document.getElementById('imagen_velocidad').src = "images/bar/four_bar.png"
		skill_points += 1
		speed_points -= 1 
	}	

	if (skill_points == 5) {
		document.getElementById("points").innerHTML = "5"
	}else { 
		if (skill_points == 4) {
			document.getElementById("points").innerHTML = "4"
		}else {
			if (skill_points == 3) {
				document.getElementById("points").innerHTML = "3"
			}else {
				if (skill_points == 2) {
					document.getElementById("points").innerHTML = "2"
				}else {
					if (skill_points == 1) {
						document.getElementById("points").innerHTML = "1"
					}else {
						if (skill_points == 0) {
							document.getElementById("points").innerHTML = "0"
						}
					}
				}
			}
		}
	}

}


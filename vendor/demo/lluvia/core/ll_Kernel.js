$KC_dl = {
    USER: 0,
    PROGRAMMER: 25,
    TESTING: 50,
    DEVELOPER: 100,
	INNERWORKING: 200
}

try {
	$K_debug_level
} 
catch (e) {
	$K_debug_level = $KC_dl.USER
}	


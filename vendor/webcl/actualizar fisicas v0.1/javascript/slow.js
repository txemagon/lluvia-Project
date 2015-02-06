var MAX = 32
function slow(){
    var start = new Date().getTime()
	
	var UIvector1 = []    
	var UIvector2 = []
	var output    = []
	for ( var i=0; i<MAX;  i++) {
	    UIvector1[i] = Math.floor(Math.random() * 100); //Random number 0..99
	    UIvector2[i] = Math.floor(Math.random() * 100); //Random number 0..99
	}

	for(var i = 0; i < MAX; i++)
		output[i] = UIvector1[i] + UIvector2[i]

	var end = new Date().getTime();
    var time = end - start;

    var show = document.getElementById("slow_output")
    for(var i = 0; i < MAX; i++)
	   show.innerHTML += i + ": " + output[i] + " "
	show.innerHTML += " execution time: " + time + "ms"
}
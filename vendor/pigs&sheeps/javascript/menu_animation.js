function change_image(){
    document.getElementById('menu_img').src="images/sheep2.png"
}

function first_image(){
    document.getElementById('menu_img').src="images/sheep1.png"
}

function countdown(device){
    sec =0;
    min =2;
    seconds = document.getElementById("seconds");
    minutes = document.getElementById("minutes");

    var timer = setInterval(
	function(){
	if (minutes.innerHTML=="0" && seconds.innerHTML=="01"){
	    clearInterval(timer);
	    seconds.innerHTML="00"
	    device.gameover_pig();
	}
	else{
	    if(min >=0 && sec<=59){
		if(sec==0){
		    sec=59;
		    min--;
		    minutes.innerHTML = min;

		}
		if(min==0 && sec<=9){
		    seconds.style.color="red";
		    minutes.style.color="red";
		    seconds.innerHTML =  "0" + sec;

		}
		else{
		    if(sec>=10)
			seconds.innerHTML =  sec;
		    else
			seconds.innerHTML = "0" + sec;
		}
		sec--;
	    }
	}
    }
	,1500);


}

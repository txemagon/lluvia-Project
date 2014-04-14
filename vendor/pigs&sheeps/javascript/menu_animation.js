function change_image(){
	document.getElementById('menu_img').src="images/sheep2.png"
      }
      
function first_image(){
    document.getElementById('menu_img').src="images/sheep1.png"
    }

function countdown(){
	sec =0;
	min =2;
	seconds = document.getElementById("seconds");
	minutes = document.getElementById("minutes");
	 
	timer = setInterval(
	    function(){
	    if(min >=0 && sec<=59){
	     	if(sec==0){
	            sec=60;
	            min--;
	            minutes.innerHTML = min;

	        }
	        if(min==0 && sec<10){
	        	seconds.style.color="red";
	        	minutes.style.color="red";
	        	seconds.innerHTML =  "0" + sec;
	        	sec--;
	        }
	        else{	 
	        	seconds.innerHTML =  sec;
	        	sec--;	
	    	}
	     }
	    }
	    ,1500);
}
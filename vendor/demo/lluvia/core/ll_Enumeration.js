function Enumeration(){
	var en = {};
	for (var i=0; i<arguments.length; i++)
		en[arguments[i]] = i	
	return en;
}

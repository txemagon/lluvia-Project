function navigator_version() { return navigator.appVersion }

function is_firefox(ffversion){
	ffversion = ffversion || ""
	return navigator.userAgent.toLowerCase().indexOf('firefox/'+ffversion) > -1;
}
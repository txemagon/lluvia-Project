/**
 * @class $Logger
 * Logger class. Creates a logger object attached to an HTML element
 *
 * 
 * @param  {string | HTMLElement} html_element HTMLElemnt or id of the output panel.
 * @param  {string} [severity="TESTING"] (see $Logger#log)
 * @return {Object}              The logger object
 */
function $Logger(html_element, severity){
	this.panel    = get_HTML_element(html_element || "ll_logger")
	this.severity = severity || "TESTING"
	this.logs     = []
}

/**
 * Writes a message into the log.
 * 
 * @param  {string} message  
 * @param  {string} severity One of: USER, PROGRAMMER, TESTING, INNERWORKING (see $KC_dl keys in ll_Kernel) 
 * @return {[type]}          [description]
 */
$Logger.prototype.log = function(message, severity){
	severity = severity || this.severity

	if ($K_debug_level >= $KC_dl[severity]){
		this.panel.innerHTML = "[" + new Date().toLocaleTimeString() + "]:" + severity + ": " + 
		                       message + "<br/>\n" + this.panel.innerHTML
		this.logs.push(message)
	}
}

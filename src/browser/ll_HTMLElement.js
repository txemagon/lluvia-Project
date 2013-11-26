/**
 * Fetch or create an HTML Element
 * 
 * @param {string|HTMLElement} html_element  id string or HTMLElement 
 * @param {boolean} [create=false]      when true, the a new HTML element will be created if not found.
 */
function get_HTML_element(html_element, create){
	
	if (typeof(html_element) === "string"){
		var element = document.getElementById(html_element)
		if (!element){
			element = document.createElement("div")
			element.setAttribute("id", html_element)
			document.body.appendChild(element)
			html_element = element
		}
	}

    return html_element
}
/**
 * Utilities for Ajax.
 * 
 * @author Txema
 * @version 1.00, June 2007
 * @Translate by Sergio Jiminez de Paz
 */

/**
 *  Cretes a new object xmlHttp appropiater for the web browser.
 *  
 *  @return {XMLHttpRequest} xmlHttp Object XML asynchronous.
 */
function newXMLHttp(){  
  
  var xmlHttp=null;
  
  try{    // Firefox, Opera 8.0+, Safari
    xmlHttp = new XMLHttpRequest();
	XMLHttpRequest.overrideMimeType("text/xml");
  }catch (e){    // Internet Explorer
    try {
      xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
    }catch (e){
      xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
  }
  return xmlHttp;
}

/**
 *  Make demands XML asynchronous, keeping the scope. This is the most
 *  general scope.
 *  
 * @param {String}   method Method of the request: GET, POST.
 * @param {String}   url address of the requested resource.
 * @param {Object}   data Parameters passed to the server.
 * @param {Object}   object Component you want to get the document XML.
 * @param {function} callback Funtion that to manage the response.
 * @param {String}   response desired Response : {"TEXT","XML"}
 */
function getAjaxDocument(method, url, data, object, callback, response){

	var XMLHttpRequestObject = false;

	XMLHttpRequest = newXMLHttp();
		
	if(XMLHttpRequestObject) {
		XMLHttpRequestObject.open(method, url);
		
		if (method.toUpperCase == "GET"){
			url = convertAURL(url, data);
			data = null;
		}
			
		if (method.toUpperCase == "POST")
			XMLHttpRequestObject.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			
		XMLHttpRequestObject.onreadystatechange = function(){
			if (XMLHttpRequestObject.readyState == 4 && XMLHttpRequestObject.status == 200) {
				var typeResponse = null;
				if (response.toUpperCase() == "XML")
					typeResponse = XMLHttpRequestObject.responseXML;
				else 
					typeResponse =  XMLHttpRequestObject.responseText;
				if (object == null)
					callback(typeResponse);
				else
					callback.call(object, typeResponse);
				delete XMLHttpRequestObject;
				XMLHttpRequestObject = null;
			}
		}
		XMLHttpRequestObject.send(data);
	}
}

/**
 * Verifies the existence of the resources on the server. 
 * @param {Object} url Recourse required.
 */
function isAjaxDocument(url){

	var XMLHttpRequestObject = false;
	var found = false;
	

	XMLHttpRequest = nuevoXMLHttp();
		
	if(XMLHttpRequestObject) {
		XMLHttpRequestObject.open("HEAD", url, false);
		XMLHttpRequestObject.send(null);
		if (XMLHttpRequestObject.readyState == 4 && XMLHttpRequestObject.status != 404)
				found = true;
		delete XMLHttpRequestObject;
		XMLHttpRequestObject = null;
			
		return found;
	}
}

function getHeader(resource){
	var valueHeather = null;
	
	if(XMLHttpRequestObject) {
		
		XMLHttpRequestObject.open("HEAD", resource, false);
		
		XMLHttpRequestObject.send(null);
		valueHeather = XMLHttpRequestObject.getAllResponseHeaders();
		delete XMLHttpRequestObject;
		XMLHttpRequestObject = null;
		 
		return valueHeather;
	}
}

/**
 * achieves a certain property of a server resource. For example, the last time it was modified.
 * @param  {String} property Property the information you want.
 * @param  {String} resource Resource the information you want.
 * @return {String} property search. 
 */
function getHeaderProperty(property, resource){
	var valueProperty = null;
	
	if(XMLHttpRequestObject) {
		XMLHttpRequestObject.open("HEAD", resource, false);
		XMLHttpRequestObject.send(null);
		valorPropiedad = XMLHttpRequestObject.getResponseHeader(propiedad);
		delete XMLHttpRequestObject;
		XMLHttpRequestObject = null;
		 
		return valueProperty;
	}
}
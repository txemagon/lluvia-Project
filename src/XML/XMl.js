/**
 * Servicios para objetos y XML
 * 
 * @author Txema
 * @version 1.00, Junio de 2007
 */

/**
 * Convertir los parámetros al metodo GET
 * 
 * @param {Object} url Dirección del servlet.
 * @param {Object} data Parámetros de la petición.
 */


/**
 * Para quitar los elementos vacíos del Mozilla.
 * 
 * @param {Object} xml Objeto del que se van a eliminar los Textnode vacíos.
 */
function quitarBlancos(xml){
	var loopIndex;

	for (loopIndex = 0; loopIndex < xml.childNodes.length;loopIndex++) {
		var currentNode = xml.childNodes[loopIndex];
		
		if (currentNode.nodeType == 1) 
			quitarBlancos(currentNode);
		
		if (((/^\s+$/.test(currentNode.nodeValue))) && (currentNode.nodeType == 3)) 
			xml.removeChild(xml.childNodes[loopIndex--]);		
	}
}
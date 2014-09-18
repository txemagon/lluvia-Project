/*
 *
 */
function Scanner() {

}

/*
 * Devuelve una array de palabras separadas por los separadores que se le pasen
 */
Scanner.prototype.split = function(text) {
    var text = text || ""
    var words = []
    var first_white = /^ /
    var last_white = / $/
    var several_white = /[ ]+/g
    var comas = ","

    text = text.replace(several_white, " ")
    text = text.replace(first_white, "")
    text = text.replace(last_white, "")
    text = text.replace(comas, " ")
    alert(text)
    words = text.split(" ")
    
    return words
}
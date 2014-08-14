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
    var separators = separators || [" ", ","]
    var words = []
    var actual_word = ""

    for (var i = 0; i < text.length; i++) {
        if (text[i] != " ") {
            actual_word += text[i]
        }
        if (text[i] == " " && actual_word.length > 0) {
            words.push(actual_word)
            actual_word = ""
        }
    }
    return words
}
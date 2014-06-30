/**
 * @class Sanitize
 * Description.
 */

/**
 * @method constructor
 * Description.
 *  
 * @param {String} text 
 */
function Sanitize(text){
	this.text = text
}

/**
 * @method multilines
 * @chainable
 * Description.
 *
 * ### Example
 *
 *     text.multilines()
 *     
 * @return {Sanitize} this 
 */
Sanitize.prototype.multilines = function(){
    this.text = this.text.replace(/\/\*([\s\S]*?)\*\//g, "")

    return this
}

/**
 * @method singles
 * @chainable
 * Description.
 *
 * ### Example
 *
 *     text.singles()
 *     
 * @return {Sanitize} this 
 */
Sanitize.prototype.singles = function(){
    this.text = this.text.replace(/\/\/.*/gm, "")

    return this
}

/**
 * @method empty
 * @chainable
 * Description.
 *
 * ### Example
 *
 *     text.empty()
 *     
 * @return {Sanitize} this 
 */
Sanitize.prototype.empty = function(){
    this.text = this.text.replace(/^\s*[\n\r]/gm, "")

    return this
}

module.exports = Sanitize
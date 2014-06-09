/**
 * @class       String
 * Define method for string
 */



/**
 * @member String
 * @method  capitalize
 * Returns a copy of string with the first character converted to uppercase and the
 * remainder to lowercase.
 *
 * @return {String} String. The string with his first letter in uppercase.
 *
 * ###Comments:    Case conversion is effective only in ASCII region.
 *
 * ###Example
 *
 *      var text = "hello"   // giving a value to text
 *      text.capitalize()    //=> "Hello"
 */

String.prototype.capitalize = function(){
  word = this.toLowerCase()
  return word.replace(word[0], word[0].toUpperCase())
}

/**
 * @member   String
 * @method   humanize
 *
 * Changes the underscore or camelCase string and returns a string which has each word separated with one space
 *
 * @return   {String} String
 *
 * ###Example
 *
 *      "TheRollingStones".humanize()      //=>"the rolling stones"
 *
 *      "the_rolling_stones".humanize()    //=>"the rolling stones"
 *
 *      "theRolling_stones".humanize()    //=>"the rolling stones"
 *
 */



String.prototype.humanize = function(){
  var word = this.strip()
  var first = word[0]
  word = word.substring(1).replace(/_+/g, " ").replace(/([A-Z])/g, " $1" ).replace(/\s+/g, " ")
  to_lower = word.downcase()
  return first + (to_lower? to_lower: word)
}


/**
 * @member   String
 * @method   underscore
 *
 * returns a underscored string
 *
 * ###Example:
 *
 *      "TheRollingStone".underscore()   //=> "The rolling stones"
 *
 *
 * @return {String} string
 *
 */



String.prototype.underscore = function(){

  return this.humanize().replace(/\s+_*/g, "_")
}

/**
 * @member  String
 * @method  camel_case
 *
 * Returns the same string in camel case form.
 *
 *
 * ###Example
 *
 *     "the_rollings stones".camel_case() //=> "theRollingStones"
 * @return  {String} String
 *
 * ###Comments:
 * "seek_case"
 *
 **/

String.prototype.camel_case = function(){
  var sentence = ""
  var first = this.strip()[0]
  this.strip().split(/[\s_]+/g ).each(function(word){
    sentence += word[0].toUpperCase()
    sentence += word.substring(1)
})

  return first + sentence.substring(1)
}

/**
 * @member String
 * @method class_name
 *
 * Takes the String passed and returns a camelCase class name.
 *
 * @return      {String} Returns camelCase name of class
 *
 */
String.prototype.class_name = function(){
  var sentence = ""
  var first = this.strip()[0]
  this.strip().split(/[\s_]+/g ).each(function(word){
    sentence += word[0].toUpperCase()
    sentence += word.substring(1)
})

  return first.toUpperCase() + sentence.substring(1)
}

/**
 * @member   String
 * @method   index
 * Returns the index of the first occurrence of the given substring or pattern
 * 'regexp' in str. Returns null if not found. If the second parameter is
 * present, it specifies the position in the string to begin the search.
 *
 *
 * @param       {string} string/regex
 * @return      {Number} Index Index of char
 *
 * ###Example
 *      "hello".index("e")  //=> 1
 */


String.prototype.index = function(){
  if (arguments.length == 0 || arguments.length > 2)
    //throw ("wrong number of arguments")
    return null
  var pos
  var str = arguments[0].toString()
  if (arguments.length > 1){
     pos = this.normalize_index(arguments[1])
     if(pos == null)
       return pos
     var find = this.substr(pos, this.length - pos)
  }
  if (str[0] == '/' && str[str.length-1] == '/' && str[1] == '[' && str[str.length-2] == ']'){
    var min = this.length
    var entradoAlMenosUnaVez = false
    for(var i=2;i<str.length - 2; i++)
      if (min >= find.search(str[i]) && find.search(str[i]) >= 0){
         min = find.search(str[i])+pos
         entradoAlMenosUnaVez = true
         }
    return min >= 0 && entradoAlMenosUnaVez? min : null
  }
  return this.indexOf(arguments[0]) < 0? null : this.indexOf(arguments[0])
// todo: Falta que funcione al pasar por parametros
// ? y una letra, ya que da error de sintaxis
}

/**
 * @member   String
 * @method   normalize_index
 *
 * Converts an negative index passed to positive valid index
 *
 * @param       {Number} number
 * @return      {Number} number equivalent positive index
 *
 * ###Comments:
 * In case of abs() of number more than this.length, returns null, else returns index
 *
 */
String.prototype.normalize_index = function(){
  if (typeof(arguments[0]) === "number")
     if (arguments[0] < 0? Math.abs(arguments[0]) <= this.length : Math.abs(arguments[0]) <= this.length - 1)
      return arguments[0] < 0? arguments[0] + this.length : arguments[0]
  return null
}

/**
 * @method      insert
 *
 * Inserts other string before the character at the given index, modifying str.
 * Negative indexes count from the end of the string, and insert after the
 * given character. The intent is to insert a String so that it starts at the given index.
 *
 * @param       {number} index
 * @param       {string} string
 * @return      {String} A string that insert
 *
 * ###Comments:
 * giving the position and a new string the function will insert the new string next to the given position.
 *
 * ###Example
 *      "hello".insert(2, "haha")
 *      //=> hehahallo
 */
String.prototype.insert = function(){
  if (arguments.length == 0 || arguments.length > 2)
    //throw ("wrong number of arguments")
    return null
  if (arguments[0] == this.length)
    return this + arguments[1]
  else if (arguments[0] == -(this.length + 1))
    return arguments[1] + this
  var pos = arguments[0] >= 0? this.normalize_index(arguments[0]) : this.normalize_index(arguments[0]) + 1
  if (this.normalize_index(arguments[0]) == null)
    return null
    //throw("index out of string")
  var str = ""
  for(var i=0;i<=this.length;i++)
     if(i == pos){
       str = str + arguments[1]
       var add = true
     }
     else if(!i==0 && add)
       str = str + this[i - 1]
          else
            str = str + this[i]
  return str
}

/**
 * @method   ljust
 *
 * Fills the string until completes the number or character passed as parameter
 * If integer is greater than the length of string, returns a new String of length of
 * passed parameter with string left justified and padded with padstr; otherwise, returns string.
 *
 *
 * @param       {Number} number
 * @param       {string} string
 * @return      {String} string
 *
 * ###Comments: Adjust the position of the parameter extending it to the max position
 *
 * ###Example
 *      "hello".ljust(10,"p")
 *      //=> helloppppp
 */
String.prototype.ljust = function(){
  var str = this
  var j = 0
  for(var i = 0; i < (arguments[0] - this.length); i++)
    if (arguments.length > 1 && arguments[1].length > 1)
      str = str + arguments[1][i % arguments[1].length]
    else if (arguments.length > 1)
        str = str + arguments[1]
        else
         str = str + " "
  return str
}

/**
 * @method      lstrip
 *
 * Returns a copy of string with leading whitespace removed. See also 'String#rstrip'
 * and 'String#strip'.
 *
 * @param       {string} string
 * @return      {String} string
 *
 * ###Example
 *
 */
String.prototype.lstrip = function(){
  return this.replace(/^\s+/g,"")
}

/**
 * @method   swapcase
 *
 * Returns a copy of string with uppercase alphabetic characters converted to lowercase
 * and lowercase characters converted to uppercase.
 *
 * @param       {string} string
 * @return      {String} string
 *
 * ###Comments: Case conversion is effective only in ASCII region.
 *
 * ###Example
 *      "Hello".swapcase()
 *      //=> hELLO
 *
 */
String.prototype.swapcase= function(){
  var str = []
  for(var i = 0; i < this.length;i++){
    if ((this[i].charCodeAt(0) > 64) && (this[i].charCodeAt(0) < 97)){
      str[i] = this[i].toLowerCase()
    }
    else{
      str[i] = this[i].toUpperCase()
    }
  }
  var word = str.join("")
  return word
}

/**
 * @method   empty$
 *
 * Returns true if self contains no elements
 *
 * @param      {String}string
 * @return     {Boolean} Boolean Returns true if empty and false if not
 *
 * ###Comments:     asks if the variable contains values
 *
 * ###Example:
 *      "hello".empty$U()   //=> false
 *      "".empty$U()        //=> true
 *
 */
String.prototype.empty$U = function(){
   if(arguments.length > 0)
      //throw ("wrong number of arguments. This function not needs arguments")
      return null
   return this.length>0? false : true
}

/**
 * @method   downcase
 *
 * Returns a copy of string with all uppercase letters replaced with their lowercase counterparts.
 * The operation is locale insensitive —only characters "A" to "Z" are affected.
 * Note: case replacement is effective only in ASCII region
 * Ths method use a "toLowerCase()" function
 *
 * @param      {Arguments} This
 * @return     {string} String. Returns this modified with character Ascii of this downcase
 *
 * ###Comments: Turns everything to downcase.
 *
 * ###Example
 *
 *     "hEllO".downcase() //=> "hello"
 *     "hello".downcase() //=>  null
 *
 */
String.prototype.downcase = function(){
   return this.toLowerCase() == this? null : this.toLowerCase()
}

/**
 * @method     casecmp
 *
 * Compares two strings and returns 0 if the two strings are equals.
 * If the first string (argument) is different returns 1.
 * If the second string (this) is different returns -1.
 *
 *
 * @param     {String} String
 * @return    {Number} Returns -1 (less than), 0 (equals), 1 (greater than)
 *
 * ###Comments: Case-insensitive version of ruby String.
 *
 * ###Example
 *
 *     "abcdef".casecmp("abcde")     //=> 1
 *     "aBcDeF".casecmp("abcdef")    //=> 0
 *     "abcdef".casecmp("abcdefg")   //=> -1
 *     "abcdef".casecmp("ABCDEF")    //=> 0
 */
String.prototype.casecmp = function(){

  if (arguments.length < 1)
   throw("ArgumentError: Wrong number of arguments")
  var str1 = this.toLowerCase()
  var str2 = arguments[0].toLowerCase()
  return ( ( str1 == str2 ) ? 0 : ( ( str1 > str2 ) ? 1 : -1 ) );

}

/**
 * @method   ord
 *
 * Returns the integer ordinal of a one-character string.
 *
 * @param       {String}  One letter only from ASCII code.
 * @return      {String}
 *
 * ###Comments:   This function works using a javascript function(.charCodeAt).
 *
 * ###Example
 *     "A".ord()     //=> 65
 *     "B".ord()     //=> 66
 *     "a".ord()     //=> 97
 *     "b".ord()     //=> 98
 */
String.prototype.ord = function(){
   return this.charCodeAt(0)
}

/**
 * @method       oct
 * This function make an octal value from a number.
 *
 * @param        {String}     Number between -7 and 7 and discard the rest.
 * @return       {String}     Return an octal value .
 *
 * ###Comments: This function works using a javascript function(parseInt). Returns
 * a copy of str with uppercase alphabetic characters converted to lowercase and
 * lowercase characters converted to uppercase. Note: case conversion is effective
 * only in ASCII region.
 *
 *
 *
 */
String.prototype.oct = function(){
  oct = this.match( /^[(-7)-7]+/)
  oct= oct || ["0"]
  return parseInt(oct[0], 8)
}

/**
 * @method       reverse
 *
 * Returns a reversed version of an introduced string
 *
 * @param        {String}
 * @return       {String}     Return the reverse from a string.
 *
 * ###Comments: This function use a ".reverse" from array class.
 *
 * ###Example:
 * "pacoelmejor".reverse()
 *
 * //=> "rojemleocap"
 */
String.prototype.reverse = function(){
   return this.split("").reverse().join("")
}

/**
 * @method       include$U
 *
 * Returns true if str contains the given string or character.
 *
 * @param        {String}
 * @return       {True o false}
 *
 * ###Comments:   Responds if the atribute given is contained in the variable
 *
 * ###Example
 *     "Happy".include$U("a")     //=> true
 *     "Happy".include$U("app")   //=> true
 *     "Happy".include$U("e")     //=> false
 *
 **/
String.prototype.include$U = function(){
   return (this.lastIndexOf(arguments[0]) > -1)? true : false
}

/**
 * @method       include_some_of
 *
 * Returns true if str contains the any of the given string or character.
 *
 * @param        {String}
 * @return       {True o false}
 *
 * ###Comments:   Responds if the atribute given is contained in the variable
 *
 * ###Example1:
 * "pacoelmejor".include_some_of$U("oe", "g")
 * //=> true
 *
 * ###Example2:
 * "pacoelmejor".include_some_of$U("h", "oe")
 * //=> true
 *
 * ###Example2:
 * "pacoelmejor".include_some_of$U("h", "g")
 * //=> false
 *
 **/
// Can receive comma-separated strings or an array
String.prototype.include_some_of$U = function(
  ){
   var included = false
   for (var i=0; i<arguments.length; i++){
     if (typeof(arguments[i]) == "string")
        included = included || this.include$U(arguments[i])
     if (arguments[i] instanceof Array)
        included = included || String.prototype.include_some_of$U.apply(this, arguments[i])
   }
   return included
}

/**
 * @method       rindex
 *
 * Returns the index of the string passed as parameter
 *
 * @param        {String}
 * @return       {Integer}     Returns index.
 *
 * ###Comments:
 *
 * ###Example1:
 *
 * "pacoelmejor".rindex("e")
 * //=> 7
 *
 * ###Example2:
 *
 * "pacoelmejor".rindex("el")
 * //=> 4
 */
String.prototype.rindex = function(){
   if (arguments.length == 0)
      return null
   return (this.lastIndexOf(arguments[0]) > 0)? this.lastIndexOf(arguments[0]) : false
}

/**
 * @method       center
 * Returns a center word in the string
 *
 * @param        {String}
 * @return       {String}     Return the a string with a word center.
 *
 * ###Comments: If integer is greater than the length of str,
 * returns a new String of length integer with str centered and padded with padstr; otherwise, returns str.
 *
 * ###Example
 *
 *    "hello".center(4)            //=> "hello"
 *    "hello".center(20)           //=> "       hello        "
 *    "hello".center(20, '123')    //=> "1231231hello12312312"
 */
String.prototype.center = function(){
 if (arguments.length == 0 || arguments.length > 2)
     throw("wrong number arguments")
  if (this.length >= arguments[0])
     return this
  var str = ""
  var i = 0
  var j = 0
  while(i<=(arguments[0] - this.length)){
      if (i == (arguments[0]-this.length) / 2){
         j = 0
         str += this
         }
      else if (arguments.length > 1){
         str += arguments[1].length == 1? arguments[1] : arguments[1][j]
         j = (j+1)%arguments[1].length
         }
           else
              str += " "
      i++
  }
  return str
}

/**
 * @method       chomp
 *
 * Returns a string without \n or \r or \r\n of the end.
 *
 * @param        {String} This
 * @return       {String}
 *
 * ###Comments: Returns a new String with the given record separator removed from the end of str (if present).
 * If $/ has not been changed from the default Ruby record separator,
 * then chomp also removes carriage return characters (that is it will remove \n, \r, and \r\n).
 *
 * ###Example
 *
 *     "hello".chomp()            //=> "hello"
 *     "hello\n".chomp()          //=> "hello"
 *     "hello\r\n".chomp()        //=> "hello"
 *     "hello\n\r".chomp()        //=> "hello\n"
 *     "hello\r".chomp()          //=> "hello"
 *     "hello \n there".chomp()   //=> "hello \n there"
 *     "hello".chomp("llo")       //=> "he"
 *
 */
String.prototype.chomp = function(){
    if (arguments.length == 1)
       return this.replace(arguments[0], "")
    if (this.search(/\r\n/i) == this.length - 2)
       return this.replace("\r\n", "")
    if (this.search(/\r/i) == this.length - 1)
       return this.replace("\r", "")
    if (this.search(/\n/i) == this.length - 1)
       return this.replace("\n", "")
    return this
}

/**
 * @method       chop
 *
 * Returns a string without \n or \r or \r\n or char of the end the String.
 *
 * @param        {String}
 * @return       {String}
 *
 * Comments: Returns a new String with the last character removed. If the string ends with \r\n, both characters are removed.
 * Applying chop to an empty string returns an empty string.
 * String#chomp is often a safer alternative, as it leaves the string unchanged if it doesn‘t end in a record separator.
 *
 * ###Example
 *    "string\r\n".chop()   //=> "string"
 *    "string\n\r".chop()   //=> "string\n"
 *    "string\n".chop()     //=> "string"
 *    "string".chop()       //=> "strin"
 *    "x".chop.chop()       //=> ""
 *
 **/
String.prototype.chop = function(){
  if (arguments.length > 0)
//     throw("wrong number of arguments")
    return null
  var str = this.chomp()
  if (str.length == this.length)
    return str.slice(0,this.length-1)
  return str
}

/**
 * @method       hex
 *
 * Returns a number hexadecimal convert to decimal.
 *
 * @param        {Number}
 * @return       {Number}
 *
 * Comments: Treats leading characters from str as a string of hexadecimal digits (with an optional sign and an optional 0x)
 * and returns the corresponding number. Zero is returned on error.
 *
 * ###Example
 *    "0x0a".hex()     //=> 10
 *    "-1234".hex()    //=> -4660
 *    "0".hex()        //=> 0
 *    "wombat".hex()   //=> 0
 *
 **/
String.prototype.hex = function(){
   if (this.search("0x") == 0)
     return parseInt(this)
   return isNaN(parseInt(this,16))? 0 : parseInt(this,16)
}

/**
 * @method       chr
 *
 * Returns first char of the string.
 *
 * @param        {Char}
 * @return       {Char}
 *
 * Comments: Returns a one-character string at the beginning of the string.
 *
 * #Example
 *      a = "abcde"
 *      a.chr()
 *      //=> "a"
 *
 **/
String.prototype.chr = function(){
// No se puede coger el numero que se
// mete en this y sacar un string con la conversion en hexadecimal
// Problema: this no puede ser un valor decimal en esta clase, ya que
// solo deja meter strings
  if (this.length > 1)
     return this[0]
  return this
}
/**
 * @method       rjust
 *
 * If integer is greater than the length of str, returns a new String of length integer
 * with str right justified and padded with padstr; otherwise, returns str.
 *
 * @param        {String} Str
 * @return       {String} Str
 *
 * Comments:
 *
 *    "hello".rjust(4)            //=> "hello"
 *    "hello".rjust(20)           //=> "               hello"
 *    "hello".rjust(20, '1234')   //=> "123412341234123hello"
 *
 **/
String.prototype.rjust = function(){
alert("okk");
  if (this.length >= arguments[0])
     return this
  var str = ""
  var i = 0
  while(i<(arguments[0] - this.length)){
       if (arguments.length > 1){
         str += arguments[1].length == 1? arguments[1] : arguments[1][i%arguments[1].length]
         }
       else
         str += " "
      i++
  }
  return str+this
}

/**
 * @method       succ
 *
 * Returns the successor to str. The successor is calculated by incrementing characters starting from the rightmost alphanumeric
 * or the rightmost character if there are no alphanumerics in the string. Incrementing a digit always results in another digit,
 * and incrementing a letter results in another letter of the same case. Incrementing nonalphanumerics uses the underlying character
 * set's collating sequence.
 *
 * @param        {String} Str
 * @return       {String} Str
 *
 * Comments: If the increment generates a ``carry,’’ the character to the left of it is incremented.
 * This process repeats until there is no carry, adding an additional character if necessary.
 *
 *  "abcd".succ()        //=> "abce"
 *  "THX1138".succ()     //=> "THX1139"
 *  "<<koala>>".succ()   //=> "<<koalb>>"
 *  "1999zzz".succ()     //=> "2000aaa"
 *  "ZZZ9999".succ()     //=> "AAAA0000"
 *  "***".succ()         //=> "**+"
 *
 **/
String.prototype.succ = function(){
  var str = ""
  var i
  var vuelta = true
  for(i=this.length-1;i>=0 && vuelta;i--){
    if (this[i] == '>' || this[i] == '<')
       str = this[i] + str
    else if(this[i]=='z' || this[i]=='Z')
            str = (this[i]=='z'? 'a':'A') + str
         else if(this[i] == '9')
                 str = '0' + str
              else
                 str = String.fromCharCode(this[i].charCodeAt()+1) + str
  vuelta =this[i] == 'z' || this[i] == 'Z' || this[i]=='9' || this[i]=='<' || this[i]=='>'
}
  if (this[0] == '<' && i < 0 && (this[2] == 'z' || this[2] == 'Z'))
     return "<<" + str[2] + str.substr(2,str.length-2)
  else if (this[0] == '<' && i < 0 && this[2] == '9')
     return "<<" + str[2].succ() + str.substr(2,str.length-2)
  return i < 0 && (this[0]=='z' || this[0]=='Z')? str[0] + str : i < 0 && this[0] == '9'? str[0].succ() + str : this.substr(0,i+1)+str
}

/**
 * @method       next
 *
 *  Alias of the function succ.
 *
 * @param        {String} Str
 * @return       {String} Str
 *
 **/
String.prototype.next = function(){
   return this.succ.apply(this,arguments)
}

/**
 * @ method   to_i
 *
 * Returns the result of interpreting leading characters in str as an integer base base (between 2 and 36).
 * Extraneous characters past the end of a valid number are ignored.
 * If there is not a valid number at the start of str, 0 is returned.
 * This method never raises an exception when base is valid.
 *
 * @ param    {int} -> is a base (2 - 36), or 0 who is the same that 10
 * @ return   {Integret} Return a int if the string and paremeters are correct. Return 0 if string or parameter are incorrect
 *
 * ###Example
 *
 * "12345".to_i()             //=> 12345
 * "99 red balloons".to_i()   //=> 99
 * "0a".to_i()                //=> 0
 * "0a".to_i(16)              //=> 10
 * "hello".to_i()             //=> 0
 * "1100101".to_i(2)          //=> 101
 * "1100101".to_i(8)          //=> 294977
 * "1100101".to_i(10)         //=> 1100101
 * "1100101".to_i(16)         //=> 17826049
 *
 **/
String.prototype.to_i = function() {
var base = 10 //Base por defecto
var result = 0 //Resultado por defecto

      //Exception
if(arguments.length > 1)
   //throw ("wrong number of arguments. to_i( [base: 2 ... 36]) ")
   return null

if(arguments.length != 0)
    if(isNaN(arguments[0]) || (arguments[0] < 2) || (arguments[0] > 36))
       //throw ("Invalid argument for base (2 - 36)")
       return null
    else base = arguments[0]

return isNaN( parseInt(this,base) )? 0 : parseInt(this,base)
}

/**
 * Returns the result of interpreting leading characters in str as a floating point number
 *
 * @member String  String.prototype.prueba = function(){
 * return this.replace(arguments[0], arguments[1])
 * }
 * var i="hello"
 * i.prueba(/[aeio]/,"+")
*/

/**
 * @method   to_f
 *
 * Returns the result of interpreting leading characters in str as a floating point number
 *
 * @param    {void}     //No parameters
 * @return   {Float}    //Returns float numbers if string is a number. Returns 0.0 if a string is not a number
 *
 * ###Example
 *      "123.45e1".to_f()        //=> 1234.5
 *      "45.67 degrees".to_f()   //=> 45.67
 *      "thx1138".to_f()         //=> 0.0
 *
 **/
String.prototype.to_f = function() {
  //Exception
  if(arguments.length > 0)
    //throw ("This function doesn't need arguments")
    return null

  return isNaN(parseFloat(this))? 0.0 : parseFloat(this) ;
}

/**
 * @method   strip
 *
 * Returns a copy of str with leading and trailing whitespace removed.
 *
 * @param    {void}
 * @return  {String} // Return a copy of str with leading and trailing whitespace removed
 *
 * ###Example
 *      "    hello    ".strip()    //=> "hello"
 *      "\t goodbye\r\n".strip()   //=> "goodbye"
 *
 **/
String.prototype.strip = function() {
  return this.lstrip().rstrip()
}

/**
 * @method   setbyte
 *
 * Modifies the position of the string given as first parameter and changes it for the ASCII code passed as second parameter
 *
 * @param    {Integer, Integer}
 * @return  {String} Returns modified string
 *
 * ###Example
 *    "pepe".setbyte(0, 65)
 *    // => "Aepe"
 *
 */
String.prototype.setbyte = function(){
     var that = this.split("")
     if(arguments[0] < that.length)
       that[arguments[0]] = String.fromCharCode(arguments[1])
     else
	//throw("Wrong index")
       return null
     str = ""
     for(var i = 0; i < that.length; i++)
      str += that[i]
 return str
}

/**
 * @method       partition
 *
 * Searches sep or pattern (regexp) in the string and returns the part before it, the match, and the part after it.
 * If it is not found, returns two empty strings and str.
 *
 * @return       {Array} ary
 *
 * ###Example
 *
 *      "hello".partition("l")         //=> ["he", "l", "lo"]
 *      "hello".partition("x")         //=> ["hello", "", ""]
 *      "hello".partition(/.l/)        //=> ["h", "el", "lo"]
 *
 **/
String.prototype.partition = function(){
     var ary = [3]
     var str = arguments[0].toString()
     var pos = this.search(arguments[0])
     if (pos < 0)
         ary = [this.substr(0,this.length), "", ""]
     else if (str[0] == '/' && str[str.length-1] == '/')
              ary = [this.substr(0, pos), this.substr(pos,str.length-2),this.substr(pos+str.length - 2,this.length-pos)]
          else
              ary = [this.substr(0, pos), this.substr(pos,str.length),this.substr(pos+str.length,this.length-pos)]
     return ary
}

/**
 * @method   rstrip
 *
 * Returns a copy of str with trailing whitespace removed.
 *
 * @param   {void}
 * @return  {String} Return a copy of str with trailing whitespace removed
 *
 * ###Example
 *     "Madrid     ".rstrip()                 //=> "Madrid"
 *     "     Madrid     ".rstrip()            //=> "     Madrid"
 *     "     Madrid Barcelona    ".rstrip()   //=> "     Madrid Barcelona"
 **/
String.prototype.rstrip = function(){
  return this.replace(/\s+$/g,'')
}

/**
 * @method   upto
 * Iterates through successive values, starting at str and ending at other_str inclusive, passing each value in turn to the block.
 * The String#succ method is used to generate each value.
 *
 * @param    {String, function}  If optional second argument exclusive is omitted or is false, the last value will be included;
 *   otherwise it will be excluded. If no block is given, an enumerator is returned instead.
 * @return    {String} return string with succ of this to arguments[0], according to parameter function
 *
 * ###Example
 *
 *         "a8".upto("b6", function(obj){return obj + ' '})
 *
 *          //=> a8 a9 b0 b1 b2 b3 b4 b5 b6
 *
 *
 */
String.prototype.upto = function(){
   var num = this
   var str = ""
   while( num != arguments[0] && num.length <= arguments[0].length && num < arguments[0] ){
     str += String.prototype.upto.yield(num)
     num = num.succ()
   }
   if( num.length > arguments[0].length )
     return str
   return str + String.prototype.upto.yield(num)
}

/**
 * @method   each_char
 *
 * Passes each character in str to the given block, or returns an enumerator if no block is given.
 *
 * @param    {function}
 * @return   {String} return a string according to function
 *
 * ###Example
 *
 *      "hello".each_char(function(obj){return obj + ' '})
 *      //=> "h e l l o "
 *
 *      "hello".each_char(function(obj){return obj + '/'})
 *      //=> "h/e/l/l/o/"
 **/
String.prototype.each_char = function(){
   var str = ""
   for (var i = 0; i<this.length;i++)
      str += String.prototype.each_char.yield(this[i])
   return str
}
/**
 * @method       chars
 *
 * Alias of the function each_char.
 *
 * @return      {String} str
 *
 **/
String.prototype.chars = function(){
   return this.each_char.apply(this, arguments)
}

/**
 * @method   sum
 *
 * Sum of the ASCII codes of all characters in the string.
 *
 * @param    {void}     //No parameters
 * @return   {Integer} return the sum
 *
 * ###Example
 *
 *     "A".sum()     //=> 65
 *     "AA".sum()    //=> 130
 *     "C3P0".sum()  //=> 246
 *
 **/
String.prototype.sum = function(){
  var suma = 0
  for (var i = 0; i<this.length;i++)
     suma += this.charCodeAt(i)
  return suma
}

/**
 * @method   squeeze
 *
 * Returns a string where runs of the same character that occur in this set are replaced by a single character.
 *
 * @param    {String} Remove only the repeated characters in the string contents.
 * Returns a copy of str with uppercase alphabetic characters converted to lowercase and lowercase characters converted to uppercase.
 * Note: case conversion is effective only in ASCII region.
 *
 * @return  {String} Returns a copy  where runs of the same character that occur in this set are replaced by a single character.
 *
 *
 **/
//Falta que coja el argumento ("x-y")
/*
String.prototype.squeeze = function(){
   var strng = this
      if (arguments.length == 0){
	    for(var i=0; i<strng.length - 1; i++)
	      while (strng[i] == strng[i+1])
	        strng = (strng.slice(0, i+1)).concat(strng.slice(i+2))
		  return strng
      }

      if(arguments.length > 0){
        for(j = 0; j < arguments.length; j++){
          var dwords = ""
          for(var k = 0; k < arguments[j].length; k++)
            if(arguments[j][k] == "-")
              if(arguments[j][k-1] <



	  for (var arg = 0; arg<arguments[j].length ; arg++)
	    for(var i=0; i<strng.length - 1; i++)
	      while (strng[i] == strng[i+1] && strng[i] == arguments[j][arg])
	        strng = (strng.slice(0, i+1)).concat(strng.slice(i+2))
        }
      }

   return strng
}
*/

/**
 * @method    String#intersection
 *
 * Returns a string containing common letters in the parameter strings
 *
 * @param     {String} character_list List of characters to be deleted
 * @return    {String}
 *
 * Comments:   When more thas one params are given, tt match the first  parameter given, then  these letters are changed
 * by the given characterhey're firstly intersected. Otherways the first param is returned.
 *
 * ###Example
 *     "Peter".intersection("P")   //=> "P"
 *     "Peter".intersection("e")   //=> "ee"
 *     "Peter".intersection("Pe")  //=> "Pee"
 *
 **/
String.prototype.intersection = function(){
      var str = this
      for (var i=0; i<arguments.length; i++){
	 var regex = "[" + arguments[i] + "]"
	 str = str.match( new RegExp(regex , "g" )).join("")
      }
      return str
}

/**
 * @method	sub
 *
 * Returns a copy of string with the first occurrence of pattern substituted for the second argument.
 *
 * @param 	{RegEx,string}
 * @return      {String}
 * Comments:    Find the letters that match the first parameter given, y these are changed by the given parameter.
 *
 * ###Example
 *     "Peter".sub("t","e");         //=> "Peeer"
 *     "Peter".sub("r","eeeeeee");   //=> "Peteeeeeeee"
 *
 **/
String.prototype.sub= function(){
   return this.replace(arguments[0], arguments[1])
}

/**
 * @method  bytes
 *
 * Passes each byte in str to the given block, or returns an enumerator if no block is given.
 *
 * @param   {String}
 * @return  {number} Return an enumerator black or //nose continuar en ingles
 *
 **/
String.prototype.bytes = function(){
  for(var i = 0; i < this.length; i++)
    return this.charCodeAt(i)
}

/**
 * @method  ascii_only$U
 *
 * Returns true for a string which has only ASCII characters.
 *
 * @param   {this}
 * @return  {this}true or false
 *
 * ###Example
 *     "Soccer".ascii_only$U()   //=> true
 *     " ".ascii_only$U()        //=> false
 **/
String.prototype.ascii_only$U = function(){
     return isNaN(this)
}

/**
 * @method   each_line
 *
 * Splits str using the supplied parameter as the record separator.
 * Passing each substring in turn to the supplied block.
 * If a zero-length record separator is supplied, the string is split
 * into paragraphs delimited by multiple successive newlines.
 *
 * @param    {[ string | number ],function { } }
 * @return   {this} str split by separator
 *
 * ###Example
 *
 * "Hello\nworld".each_line(function(obj){return "" + obj + ""})            //=> "Hello\n","world"
 * "Hello\n world".each_line("l",function(obj){return "" + obj + ""}))      //=> "Hel", "l", "o \\n worl", "d"
 * "Hello \n\n\n world".each_line("",function(obj){return "" + obj + ""}))  //=> "Hello \\n\\n\\n"," world"
 **/
String.prototype.each_line = function(){
var ary = this
var arycpy = []  //ary with string result
var posEnd = 0		//position to split the origin string
var ind = 0			//index for ary
var regExp = /\n/g
var argZero = false	//Indicates if the arguments zero is a ""

if(arguments.length == 0 || arguments.length > 2)
   return null

if( typeof(arguments[0]) !== "function" ){
   if(arguments[0] != "")
      regExp = RegExp(arguments[0])
   else {
      regExp = /\n{2,}/g
      argZero = true
	}
}
posEnd = ary.search(regExp) + 1
while( (posEnd < ary.length) && (posEnd >0) ){
   if(argZero){
      var trash = ary.substring(posEnd)
      posEnd += trash.search(/./g)
   }
   arycpy[ind] = ary.substring(0, posEnd)
   ary = ary.substring(posEnd)
   arycpy[ind] = ary.each_line.yield(arycpy[ind])
   ind++
   posEnd = ary.search(regExp) + 1
}
ary = ary.substring(posEnd)
ary.each_line.yield(ary)
return this
}

/**
 * @method   each_codepoint
 *
 * Passes the Integer ordinal of each character in str, also known as a codepoint when applied to Unicode strings to the given block.
 * If no block is given, an enumerator is returned instead.
 *
 * @param    {function}
 * @return   {string}    Returns a string according function.
 *
 * ###Example
 *
 *      "hello\u0639".each_codepoint(function(obj){return obj + ' '})
 *
 *      //=> "104 101 108 108 111 1593 "
 *
 **/
String.prototype.each_codepoint = function(){
  var str = ""
  for (var i=0;i<this.length;i++)
      str += String.prototype.each_codepoint.yield(this[i].charCodeAt(0))
  return str
}

/**
 * @method      codepoint
 *
 * Alias of the function each_codepoint.
 *
 * @param       {string} String
 * @return      {String} str of digits ASCII
 *
 **/
String.prototype.codepoint = function(){
  return this.each_codepoint.apply(this,arguments)
}

/**
 * @method     rpartition
 *
 * Searches sep or pattern (regexp) in the string from the end of the string, and returns the part before it, the match, and the part after it. If it is not found, returns two empty strings and str.
 *
 * @param      {string} String
 * @return     {Array} ary
 *
 * ###Example
 *
 *      "hello".rpartition("l")         //=> ["hel", "l", "o"]
 *      "hello".rpartition("x")         //=> ["", "", "hello"]
 *      "hello".rpartition(/.l/)        //=> ["he", "ll", "o"]
 *
 **/
String.prototype.rpartition = function(){
     var ary = [3]
     var str = arguments[0].toString()
     if (this.search(arguments[0]) == -1){
        ary = ["","",this.substr(0,this.length)]
        return ary
}
     else{
     auxstr = str.substr(2,str.length-3)
     var pos = str[0] == '/' && str[str.length-1] == '/'? this.lastIndexOf(auxstr):this.lastIndexOf(str)
     if (str[0] == '/' && str[str.length-1] == '/')
              ary = [this.substr(0, pos-1), this.substr(pos-1,auxstr.length+1),this.substr(pos+auxstr.length ,this.length-pos)]
          else
              ary = [this.substr(0, pos), this.substr(pos,str.length),this.substr(pos+str.length,this.length-pos)]
     }
     return ary
}

/**
 * @method scan
 *
 * Searches for a match between a regular expression and a string, and returns the matches.
 * Returns a copy of str with uppercase alphabetic characters converted to lowercase and lowercase characters converted to uppercase.
 * Note: case conversion is effective only in ASCII region.
 *
 * @param  {string} String
 * @return {string} String Returns an array of matches, or null if no match is found.
 *
 **/
String.prototype.scan = function(){
   var ary = this.match(arguments[0])
   if (ary.length > 1 && arguments.length <2)
      ary.shift()
   if ( arguments.length > 1 && typeof(arguments[1]) === "function" ){
     ary = this

     while( ary.length > 0 && ary.search(arguments[0]) != -1){
       var finds = []
       var find = ary.match(arguments[0])
       ary = ary.replace(arguments[0], "")
       for (var i=1; i<9; i++)
         if (RegExp["$" + i] != "")
           finds.push(RegExp["$" + i])
       if (finds.length == 0)
         finds = find
       arguments[1].apply(arguments[1], finds)
     }
     return this
   }
   return ary
}

/**
 * @method      erase
 *
 *  Returns a new string with erased letters.
 *
 * @param       {string} String
 * @return      {String}
 *
 * ###Comments:    Erases the arguments matched in a string.
 *
 * ###Example
 *     "Hello".erase("H")    //=> "ello"
 *     "Hello".erase("Ho")   //=> "ell"
 *
 **/
String.prototype.erase = function(){
   var erase = this
   for(var i = 0; i < arguments.length; i++)
      erase = this.intersection(erase, arguments[i])
   var regex = "[^" + erase + "]"
   erase = this.match(new RegExp(regex, "g")).join("")
   return erase
}

/**
 * @method      end_With$U
 *
 * Returns true or false by comparing  object and the argument from the end.
 *
 * @param       {string} String
 * @return      {boolean}
 *
 * ###Comments:    Compares the object with argument.
 *
 * ###Example
 *     "Hello".end_With$U("Hello")    //=> true
 *     "Hello".end_With$U("Hel")      //=> false
 *
 **/

String.prototype.end_With$U = function(str){
    return (this.match(str+"$")==str)}

/**
 * @method      eql$U
 *
 * Returns true or false by comparing  object and the argument.
 *
 * @param       {string}
 * @return      {boolean}
 *
 * ###Comments:    Compares the object with argument.
 *
 * ###Example
 *     "Car".eql$U("Car")     //=> true
 *     "Car".eql$U("Plane")   //=> false
 *
 **/

String.prototype.eql$U = function() {
    return this == arguments[0]}

/**
 * @method      getbyte
 *
 * Returns the indexth byte as an integer.
 *
 * @param       {string}
 * @return      {number}  a interger.
 *
 * ###Comments:    Using charCodeAt from a javaScript function.
 *
 * ###Example
 *     "A".getbyte()    //=> 65
 *
 **/
String.prototype.getbyte = function(){
    return this.charCodeAt(arguments[0])
}

/**
 *
 */
String.prototype.to_str = function(){
    return this.toString()
}

/**
 * @method     to_r
 *
 * Returns a rational which denotes the string form. The parser ignores leading whitespaces and trailing garbage.
 * Any digit sequences can be separated by an underscore. Returns zero for null or garbage string.
 *
 * @param      {string}
 * @return     {string}  Return a rational
 *			             If the arguments is invalid return "0/1"
 *                       Returns a copy of str with uppercase alphabetic characters
 *                       converted to lowercase and lowercase characters converted to uppercase.
 *
 * ###Example
 *
 * '  2  '.to_r()       //=> (2/1)
 * '300/2'.to_r()       //=> (150/1)
 * '-9.2'.to_r()        //=> (-46/5)
 * '-9.2e2'.to_r()      //=> (-920/1)
 * '1_234_567'.to_r()   //=> (1234567/1)
 * '21 june 09'.to_r()  //=> (21/1)
 * '21/06/09'.to_r()    //=> (7/2)
 * 'bwv 1079'.to_r()    //=> (0/1)
 **/
String.prototype.to_r = function(){
var str1 	//String auxiliar
var str2 	//String auxiliar
var op1 = "0/1" //operando one rational number
var op2 = 1	//operando two rational number
var pos
var mcd
var dec

str1 = this.strip() //Returns a copy of str with leading and trailing whitespace removed
if( str1.search(/^[\d\+.-]/g) == -1 ) //Comprueba si el primer caracter es una letra o un caracter no valido)
   return op1
str2 = str1 = str1.replace(/[_]/g,"")  //Replace underscore
pos = str1.search(/\//g) //Find the "/" character
if( pos > 0) {
   str1 = str1.substring(0,pos)
   str2 = str2.substring(pos+1)
}
else
   str2 = null

if( isNaN( (op1 = parseFloat(str1)) ) )//Checks the string is a number
   return op1
   //Comprueba si la primera cadena tiene caracteres no validos y la segunda cadena se puede pasar a numero
if( isNaN(str1) || isNaN( op2 = parseInt(str2) ) )
   op2 = 1

   //Dejo el primer numero sin decimales pasando los decimales que tuviese a la izquierdaReturns a copy of str with uppercase alphabetic characters converted to lowercase and lowercase characters converted to uppercase. Note: case conversion is effective only in ASCII region.
dec = decimal(op1)
op1 = op1 * Math.pow(10,dec)
if( op2 == 1)//Si solo tenemos el operando 1
   op2 = Math.pow(10,dec)
else
   op2 = op2 * Math.pow(10,dec)
//Calculo el maximo comun divisor de los 2 operandos
mcd = intMcd(op1,op2)
if (mcd == null)
   mcd = 1
return op1/mcd + "/" + op2/mcd
}


/***************************************************************/
/* La parte de arriba es para los metodos (prototype) **********
/* La parte de abajo esta reservada para añadir funciones ******/


/**
 * @member *****
 *
 * @methof  decimal
 *
 * Esta funcion devuelve la cantidad de decimales que tiene un numero
 *
 * @param  {number | string }
 * @return {integer}  Number of decimal. If the arguments is invalid return 0
 *
 **/

function decimal() {
if(isNaN(arguments[0]))
   return -1

var num = new Number(arguments[0])
if( num < Number.MIN_VALUE || num > Number.MAX_VALUE)
   return 0

var ary = num.toString(10)
var trash = ary
var decUno = 0
var decDos = 0
if ( ary.search("e") > 0)    {
   decUno = ary.substring(ary.search("e")+1)
   trash = ary.substring(0, ary.search("e"))
}
if ( ary.search("[.]") > 0){
   decDos = trash.substring(trash.search("[.]")+1)
   decDos = decDos.length
}
return parseInt(decUno)>=decDos? 0 : (decUno - decDos) * -1
}

/** Esta funcion nos devuelve el Maximo Comun Divisor de 2 numeros
 *
 * @member ******
 *
 * @method   intMdc
 *
 * @param    {interger, integer}
 * @return   {integer} Return the maximo comun divisor of 2 integers
 *                      If the arguments are invalids, return  null
 *
 **/

function intMcd() {

if(arguments.length != 2 || isNaN(arguments[0]) || isNaN(arguments[1]) )
   return null

var op1 = parseInt(arguments[0])
var op2 = parseInt(arguments[1])

if(arguments[0] == 0 || arguments[1] == 0)
   return null
if (arguments[0] < 0)
   op1 *= -1
if (arguments[1] < 0)
   op2 *= -1

while ( op1 != op2 || op1 < 0 || op2< 0 ){
   if(op1 > op2)
      op1 = op1-op2
   else
      op2 = op2-op1
}
if( op1 == op2)
   return op1
return null
}


/**
 * @member      String
 * @method      bytesize
 *
 * Returns the length of string in bytes.
 *
 * @param       {Arguments} This
 * @return      {number} the length of string in bytes.
 *
 * ###Example
 *     'abcde'.bytesize()   //=> 5
 *
 **/

String.prototype.bytesize = function(){
    return this.length
}

/**
 * @method is_string$U
 * @static
 *
 * @param  {string | String} name
 * @return {boolean}      true if name is any kind of string
 */
String.is_string$U = function(name){
  return typeof(name) === "string" || name instanceof String
}



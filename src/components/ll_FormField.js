GenericField.prototype.constructor = GenericField
function GenericField(config, content){
  var that = this
  this.html_attr = []
  this.config = config
  this.content = content || ""
  
  function initialize(){
    if (config && config.html_attr)
     config.html_attr.self_keys().each( function(key){
     that.html_attr.push(key + "='" + config.html_attr[key] + "'")
    })
  }
  
  if (arguments.length)
    initialize()
    
}

GenericField.prototype.to_html = function(tag_sign){
  tag_sign = tag_sign || this.tag_sign // It's tag_sign instead of tag_name because sometimes you need a name and an attribute.  
  if ( this.content.empty$U() )
    return "<" +tag_sign + " " + this.attributes() + "/>\n"
  return "<" + tag_sign + " " + this.attributes() + ">\n  " + this.content + "\n</" + tag_sign + ">\n"
}


GenericField.prototype.is$U = function(id){
  return !!this.html_attr.inject(false, function(attr, found){
    return found || attr.match(new RegExp("id\s*=\s*." + id ) )
  })
}	

GenericField.prototype.attributes = function(){
  return this.html_attr.join(" ")
}

GenericField.prototype.get_value = function(){
  return this.content
}

/* Detailed implementations for FormField thru factories  */
VirtualField.prototype = new GenericField
VirtualField.prototype.constructor = VirtualField
function VirtualField(){
}


TextField.prototype = new GenericField
TextField.prototype.constructor = TextField
TextField.prototype.super = GenericField
function TextField(config){
  this.tag_sign = "input type='text'" // Todo: This should be a class variable. But class() shall return the current class (not the parent for instance)
    GenericField.call(this, config || {})
}

TextField.prototype.get_value = function(){
  return this.config.html_attr.value
}

Label.prototype = new GenericField
Label.prototype.constructor = TextField
Label.prototype.super = GenericField
function Label(config, content){
  this.tag_sign = 'label'
  GenericField.call(this, config || {}, content || "")
}


TextArea.prototype = new GenericField
TextArea.prototype.constructor = TextArea
TextArea.prototype.super = GenericField
function TextArea(config, content){
  this.tag_sign = 'textarea'
  GenericField.call(this, config || {}, content || "")
}


CheckBox.prototype = new GenericField
CheckBox.prototype.constructor = CheckBox
CheckBox.prototype.super = GenericField
function CheckBox(config, content){
  this.tag_sign = "input type='checkbox'"
  GenericField.call(this, config || {}, content || "")
}

Radio.prototype = new GenericField
Radio.prototype.constructor = Radio
Radio.prototype.super = GenericField
function Radio(config, content){
  this.tag_sign = "input type='radio'"
  GenericField.call(this, config || {}, content || "")
}

Password.prototype = new GenericField
Password.prototype.constructor = Password
Password.prototype.super = GenericField
function Password(config){
  this.tag_sign = "input type='password'" 
    GenericField.call(this, config || {})
}

Button.prototype = new GenericField
Button.prototype.constructor = Button
Button.prototype.super = GenericField
function Button(config, content){
  this.tag_sign = "Button type='button'" 
    GenericField.call(this, config || {}, content || "")
}

Submit.prototype = new GenericField
Submit.prototype.constructor = Submit
Submit.prototype.super = GenericField
function Submit(config){
  this.tag_sign = "input type='submit'" 
    GenericField.call(this, config || {})
}


Range.prototype = new GenericField
Range.prototype.constructor = Range
Range.prototype.super = GenericField
function Range(config){
  this.tag_sign = "input type='text'"
    GenericField.call(this, config || {})
}

Color.prototype = new GenericField
Color.prototype.constructor = Color
Color.prototype.super = GenericField
function Color(config){
  this.tag_sign = "input type='text'"
    GenericField.call(this, config || {})
}

Email.prototype = new GenericField
Email.prototype.constructor = Email
Email.prototype.super = GenericField
function Email(config){
  this.tag_sign = "input type='text'"
    GenericField.call(this, config || {})
}

Telephone.prototype = new GenericField
Telephone.prototype.constructor = Telephone
Telephone.prototype.super = GenericField
function Telephone	(config){
  this.tag_sign = "input type='text'"
    GenericField.call(this, config || {})
}

/* FormField is a class selector and an object factory */

FormField.prototype.constructor = FormField

function FormField(type, attr, content){
    var field_class

    function to_html(){
      return "This method is abstract, belongs to a virtual class, and needs to be redefined."
    }

  if (type instanceof Array){
    var params = type
    if (params[0]) type = params[0]
    if (params[1]) attr = params[1]
    if (params[2]) content = params[2]
  }

  if (type && type.match(/^\s*edit\s*$/i))
    field_class = TextField
    
  if (type && type.match(/^\s*label\s*$/i))
    field_class = Label

  if (type && type.match(/^\s*textarea\s*$/i))
    field_class = TextArea

  if (type && type.match(/^\s*checkbox\a*$/i))
    field_class = CheckBox

  if (type && type.match(/^\s*radio\a*$/i))
    field_class = Radio

  if (type && type.match(/^\s*password\a*$/i))
    field_class = Password

  if (type && type.match(/^\s*button\a*$/i))
    field_class = Button

  if (type && type.match(/^\s*submit\a*$/i))
    field_class = Submit
  
  if (type && type.match(/^\s*range\a*$/i))
    field_class = Range

  if (type && type.match(/^\s*telephone\a*$/i))
    field_class = Telephone
	
  if (type && type.match(/^\s*color\a*$/i))
    field_class = Color
	
  if (type && type.match(/^\s*email\a*$/i))
    field_class = Email
		
if (!field_class){  
    field_class = VirtualField
    field_class.prototype.to_html = to_html
  }
  
  return new field_class(attr || null, content || "")
  
}


function validarRango(valor,max,min) {
  if(valor<=max && valor>=min)
    return (true)
  return (false)
}

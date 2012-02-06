/**
  * Expose objects to html interfaces
  * @author Txema, Unker
  * @version 1.00, november 2011
  */

HtmlAccessible.prototype.constructor = HtmlAccessible

/**
  * @classDescription   Module that extends any kind of object for html editing
  * @return             {HtmlAccessible}
  * @constructor
  */
function HtmlAccessible(){ 
}

HtmlAccessible.prototype.html_accessible = function(config, fields){
   
  this.form_builder = new FormBuilder(config, fields)
  HtmlAccessible.prototype.html_accessible.yield(this.form_builder)

}

FormBuilder.prototype.constructor = FormBuilder

function FormBuilder(config, fields){
  var that = this
  
  this.field = []
  
  function normalize(key){
    if (typeof(key) === "string")
      return key.replace(/\s/g , "").toLowerCase()
    return key
  }
  
  config.self_keys().each(function(key){
     that[key] = normalize(config[key])
  })
  
  fields.self_keys().each(function(key){
     that.field.push( FormField(fields[key])  )
  })
}

FormBuilder.prototype.to_html = function(){
  return "<form></form>"
}

FormBuilder.prototype.find = function(id){
  var html_element = null
  this.field.each(function(field){
    try{
    if (field.is$U(id))
      html_element = field
    }catch(err){
      alert(field.toSource())
      ; /* Invalid property */
    }
  })
  return html_element
}

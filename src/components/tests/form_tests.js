given("Given an html_accessible object.",
      $LLGvn = " function HtmlObj(){;\
                  this.a = 2;\
                };\
               HtmlObj.extend(HtmlAccessible);\
               html_obj = new HtmlObj();")
			
eval($LLGvn)

assert("An html accessible object should repond to html_accessible", 
      "html_obj.respond_to('html_accessible')", "true", "")		
      

assert("An html accessible object should repond to html_accessible", 
      "html_obj.respond_to('htmler_accessible')", "false", "")


assert("An html accessible object passes a form builder in the block", 
      "is_a_form_builder", "true", 
      "is_a_form_builder = false;\
       html_obj.html_accessible( {}, {}, function(form_builder){;\
                                        is_a_form_builder = form_builder instanceof FormBuilder;\
                                      });")

assert("We can set up the form builder to a valid given html version",
	"html_obj.form_builder.output_format","'html:5'",
        "html_obj.html_accessible( {output_format: 'html: 5'}, {});")

assert( "FormField has an abstract form field",
        "f instanceof VirtualField ", "true",
        "f = FormField();")


assert( "VirtualField has an abstract to_html method	",
        "f.to_html().match(/virtual/i) != null ", "true",
        "f = FormField();")

assert( "The FormField can create a TextField",
        "f.to_html().match(/input type=['\"]text['\"]/i) != null ", "true",
        "f = FormField('edit');")
        
assert( "TextField can receive an id",
        "f.to_html().match(/id=['\"]one_name['\"]/i) != null ", "true",
        "f = FormField('edit', {html_attr: {id: \"one_name\"}});") 

assert( "TextField without id",
        "f.to_html().match(/id/i) == null", "true",
        "f = FormField('edit');")
        
assert( "Label",
        "f.to_html().match(/label for=['\"]field['\"]/i) != null", "true",
        "f = FormField('label', {html_attr: { for: 'field'}});")

assert( "Label with content",
        "f.to_html().match(/content/i) != null", "true",
        "f = FormField('label', {html_attr: { for: 'field'}}, 'content');")

assert( "The FormField can create a PasswordField",
        "f.to_html().match(/input type=['\"]password['\"]/i) != null ", "true",
        "f = FormField('password');")
        
assert( "The FormField can create a CheckboxField",
        "f.to_html().match(/input type=['\"]checkbox['\"]/i) != null ", "true",
        "f = FormField('checkbox');")

assert( "The FormField can create a RadioField",
        "f.to_html().match(/input type=['\"]radio['\"]/i) != null ", "true",
        "f = FormField('radio');")

assert( "The FormField can create a ButtonField",
        "f.to_html().match(/Button type=['\"]button['\"]/i) != null ", "true",
        "f = FormField('button');")

assert( "The FormField can create a SubmitField",
        "f.to_html().match(/input type=['\"]submit['\"]/i) != null ", "true",
        "f = FormField('submit');")

/* Dynamic linking */
given("Given a complex object with at least two fields.",
      $LLGvn = " function EdObj(){;\
                  this.min  = 2;\
                  this.b    = 3;\
                  this.max  = 5;\
                  this.name = 'lluvia Project form';\
                };\
               EdObj.extend(HtmlAccessible);\
               obj = new EdObj();" )
			
eval($LLGvn)

assert( "Label with content",
        "obj.form_builder.find('b_field').get_value()", "5",
        "             obj.html_accessible( \
                     { output_format: 'html: 5'}, \
                     { name: ['label', {html_attr: {id: 'b_field'}}, follow('b')]\
                     }\
                     );\
                     obj.b = 5;\
                     ")

        
/*



assert("we can choose the form sending frequency",
	"html_obj.update_every","45","") 

assert("we can choose the destiny",
	"html_obj.destiny","'http://www.google.com'","") 

assert("we can choose sent every update",
	"html_obj.envio","45","") 

given("Given an html_accessible object.",
      $LLGvn = " function HtmlObj(){;\
                  this.a = 2;\
                };\
               HtmlObj.extend(HtmlAccessible);\
               html_obj = new HtmlObj();\
	       html_obj.html_accessible({output_format: 'html:5',destiny: 'http://www.google.com', update_every: -1});")
			
eval($LLGvn)

assert("we can choose ajax",
	"html_obj.envio","'ajax'","") 

given("Given an html_accessible object.",
      $LLGvn = " function HtmlObj(){;\
                  this.a = 2;\
                };\
               HtmlObj.extend(HtmlAccessible);\
               html_obj = new HtmlObj();\
	       html_obj.html_accessible({output_format: 'html:5',destiny: 'http://www.google.com'});")
			
eval($LLGvn)

assert("we can choose no ajax ",
	"html_obj.envio","'no_ajax'","") 

given("Given an html_accessible object.",
      $LLGvn = " function HtmlObj(){;\
                  this.a = 2;\
                };\
	       html_obj2=new HtmlObj();\
               HtmlObj.extend(HtmlAccessible);\
               html_obj = new HtmlObj();\
	       html_obj.html_accessible({output_format: 'html:5',destiny: html_obj2, update_every: 45});")
			
eval($LLGvn)

assert("we can choose sent to object ",
	"html_obj.envio","'persistir_inm'","") 

given("Given an html_accessible object.",
      $LLGvn = " function HtmlObj(){;\
                  this.a = 2;\
                };\
	       html_obj2=new HtmlObj();\
               HtmlObj.extend(HtmlAccessible);\
               html_obj = new HtmlObj();\
	       html_obj.html_accessible({output_format: 'html:5',destiny: html_obj2, update_every: -1});")
			
eval($LLGvn)

assert("we can choose  sent to object when submit ",
	"html_obj.envio","'persistir'","") 
*/

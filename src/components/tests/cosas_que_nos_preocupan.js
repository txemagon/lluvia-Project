...
{
  brain, // Objeto compuesto tiene múltiples formularios que se deberían de abrir en un popup/ div emergente/ panel / ...
  last_heading, // label, edit readonly
  geo_data, // Objeto compuesto
  vel_max, // Editable dentro de un rango
  my_world, // No editable
  current_time, // label, edit readonly
  last_time, //No editable
  colour, //css [validador]
  mass, //Número 
  vision, // Objeto compuesto
  force_limits, // Objeto compuesto
  id: label
  }
...

this.html_accesible(    
                   output_format: "html:5", // default xhtml:1.1
                   html: { multipart: "true"
                         }
                   destiny: "http://jlfjklafkjah" | objeto,
                   update_every: 50 //  Si es dinámico mandar cada 50 milisegundos
                   /* Si existe update_every => dinamico | ajax
                        Si typeof(destiny) === "string"
                        | Si (update_every)
                        | | Si update_every <= 0
                        | | | Cuando le de a submit hace un ajax
                        | | sino
                        | | | lo va enviando cada update_every
                        | | finsi 
                        | sino
                        | | Envio normal (no ajax)
                        | finsi
                        sino
                        |  Si update_every <= 0
                        |  |  Cuando le de a submit lo persiste
                        |  sino
                        |  |  lo va persistiendo nada mas cambiarlo
                        |  finsi
                        finsi    
                   */
                }, 
                {
			  brain: "new panel in <#id>", // Objeto compuesto tiene múltiples formularios que se deberían de abrir en un popup/ div emergente/ panel / ...
			  last_heading: "label", // label, edit readonly
			  geo_data, // Objeto compuesto
			  vel_max, // Editable dentro de un rango
			  current_time, // label, edit readonly
			  last_time, //No editable
			  colour, //css [validador]
			  mass, //Número 
			  vision, // Objeto compuesto
			  force_limits, // Objeto compuesto
			  id: label
			  color: "edit, html => {id => 'pepe', class => 'Pepa'}, type => 'numeric'"
                 },
                function(form_builder){
                  

                 )

// Problema del slider /edit con un rango con valores límites dinámicos
// Problema de la caja de texto [email] con un patron (expresión regular) fijada en otra caja de texto.
// Enlaces dinámicos (fuertes o débiles)
// Las cajas de texto pueden ser para elegir entre n valores prefijados [select box]. Pueden ser un [combobox].
// Los valores pueden estar mapeados ["soltero" => 0]
// Un objeto puede tener atributos compuestos que a su vez desplieguen otro panel.
// Los cambios pueden persistirse directamente en el objeto, o pueden esperar hasta que le demos a enviar.
// Aunque el objeto no se persista automaticamente, algunos atributos si pueden hacerlo.
// Los cambios pueden ser remitidos al objeto o a una url, bien estáticamente, bien via ajax. Las respuestas ajax se reflejan
// si procede en el formulario y en el objeto.
// htmlizador debe elegir el dialecto de html (xhtml1.1, html5)
// Se tienen que poder extender clases ya existentes.
// Los atributos html se puedan pasar en lluvia

/* Tipos precocinados
   boolean => radiobutton
   mapeados => checkbox 
   mapeados => select box
   mapeados => combo box
   mapeado => multiples opciones o no (csv)
  
  email
  telefonos
  numeros
  rangos
  TimeData
  Week
  Month
  hour
  day
  date
  lista de emails
  color
  ficheros 
*/

/* cosas que pueden querer escribir
"new panel in <#id>"
"new panel inside <#id>"
"the last panel of <#id>" (hace lo mismo que el anterior)
"the first panel of <#id>"

"label"
"text [readonly]"
"tel"
"email"
"textarea"
"number"
"real" (hace lo mismo que el anterior)
"integer"
"color"
"complex"
"vector"
"text value=2"
"text value=2 readonly"
"text readonly value=2"
"number from='2' to='1000'"
"number from='2'"
"number from='2' step='2'"
"number from='vel_max' to 'force_limits.steer [in form]'"
*/

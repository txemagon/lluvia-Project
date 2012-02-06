function pretty_print(html_element){
  var final_string = ""
  html_element.value.each_line( function (line){
       final_string += line.center(10)
       final_string += "\n"
    }
  )
  
  document.getElementById("output").innerHTML = "<pre" +
      final_string.replace(/\n/g, "<br/>").replace(/\s/g, "&nbsp;") + "</pre>"
}

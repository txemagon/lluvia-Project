chat = null

function send_input(event){

  var keynum = window.event ? event.keyCode : event.which;
  var keychar = String.fromCharCode(keynum);

  chat.each( function(ch){ ch.input(keychar) })

  return false
}

function main(){

    chat = [
                 new Chat("1"),
                 new Chat("2")
               ]

    Chat.connect(chat[0], chat[1])

}

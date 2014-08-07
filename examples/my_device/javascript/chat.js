Chat.prototype = new Device
Chat.prototype.constructor = Chat
function Chat(view_number){

  var that = this
  var args = arguments
  this.default_content = "Waiting for some text."
  this.content = this.default_content

  function initialize(){
    Device.call(that,"output" + view_number )
    that.inbox = that.newGate("text" + view_number, Inbox)
    that.send_button = that.newGate("sender" + view_number, Sender)
  }

 if(arguments.length) 
   initialize() 

}

Chat.connect = function(chat1, chat2){
  chat1.socket = chat2
  chat2.socket = chat1
}

Chat.prototype.set_content = function(text){ 
 this.content = text
 this.inbox.refresh()
}

Chat.prototype.get_content = function(){ return this.content }
Chat.prototype.append_content = function(text){ this.set_content( this.content + text) }
Chat.prototype.get_default_content = function(){ return this.default_content }
Chat.prototype.restore_default_content = function(){ this.set_content(this.default_content) }
Chat.prototype.input = function(one_char){ 
  if (this.inbox.current_mode == this.inbox.mode.edition){
    this.append_content(one_char) 
    this.inbox.refresh()
  }
}



Chat.prototype.send = function(){
  this.socket.eventDispatcher.enqueue(systemEv("sync", {name: "new_message", data: this.content}))
}

Chat.prototype.attend_new_message = function(date, mssg){
  this.view.innerHTML += mssg.event.new_message.data + "<br/>"
}


Inbox.prototype = new Gate
Inbox.prototype.constructor = Inbox
function Inbox(element){
 
  var that = this
  var args = arguments
  this.mode = {command: 0, edition: 1}
  this.current_mode = this.mode.command


  function initialize(){
    Gate.call(that, element)
  }

  if(arguments.length)
   initialize()

}

Inbox.prototype.refresh = function(){
  this.panel.innerHTML = this.device.get_content()
}

Inbox.prototype.do_onclick = function(event, element){
  this.current_mode = this.mode.edition
  this.device.set_content("$ ")
}

Inbox.prototype.do_onmouseout = function(event, element){
  if (this.current_mode == this.mode.edition){
    this.current_mode = this.mode.command
  }
}


Sender.prototype = new Gate
Sender.prototype.constructor = Sender
function Sender(element){
 
  var that = this
  var args = arguments

  function initialize(){
    Gate.call(that, element)
  }

  if(arguments.length)
   initialize()

}

Sender.prototype.do_onclick = function(event, element){
    this.device.send()
    this.device.restore_default_content()
}


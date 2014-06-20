var module_loading = {}

function $timeStamp(){
  var dat = new Date()
  var timestamp = ""
  timestamp += dat.getHours() + " : " + dat.getMinutes() + " : " + dat.getSeconds()
  return timestamp
}

function LogFileIncluded(file_source){
  this.template = [
    "<div class='_LogFile'>",
    file_source.name,
    " [" + $timeStamp() + "]",
    ": ",
    file_source.description,
    "</div>"
  ]
}

LogFileIncluded.prototype.toString = function(){
  return this.template.join("")
}

function LogModuleLoad(module_source){
  this.template = [
      "<div class='_LogModule'>",
      "<h3 class='_LogModuleName'> MODULE: ",
      "I02:Module Name",
      "</h3>\n",
      "<span class='_LogModulePath'>&nbsp;&nbsp;(",
      "I05: Module Path",
      ")</span>\n<br/>",
      "<span class='_LogModuleDescription'>",
      "I08: Module Description",
      "</span>\n<br/>",
      "Load Start Time: ",
      "I11: start Time",
      "<br/>\n",
      "Load Finish Time: ",
      "I14: Finish Time: ",
      "<br/>\n",
      "Load Time: ",
      "I17: Elapsed Time: ",
      " s.<br/>",
      "FILES:<br/>",
      "I20: FILES",
      "<br/>",
      "</div>"
    ]

 this.start = new Date().getTime()
 this.end   = new Date().getTime()
 this.template[11] = $timeStamp()
 this.template[2]  = module_source.module
 this.template[5]  = module_source.path
 this.template[8]  = module_source.description
 this.files = []
}

LogModuleLoad.prototype.addFile = function(file_source){
 this.files.push(new LogFileIncluded(file_source))
}

LogModuleLoad.prototype.endLoad = function(){
  this.end   = new Date().getTime()
  this.template[14] = $timeStamp()     
  this.template[17] = "" + ( Math.round((this.end - this.start) / 10) / 100);
  return this.toString()
}

LogModuleLoad.prototype.toString = function(){  
  this.template[20] = ""
  for (var i=0; i<this.files.length; i++)
    this.template[20] += this.files[i].toString()
  return this.template.join('\n')
}

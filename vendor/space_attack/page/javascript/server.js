'use strict';
var serverPort = 1337;
var http = require('http').createServer(MyServer);

http.listen(serverPort, function(){
    console.log('Server running at http://localhost:' + serverPort);
});

function MyServer(request,response){
    response.writeHead(200,{'Content-Type':'text/html'});
    response.end('<h1>Hello Node.js</h1>');
}
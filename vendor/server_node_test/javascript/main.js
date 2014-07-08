function main(){

    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "http://localhost:8888/", false );
    xmlHttp.send( "hola" );
    return xmlHttp.responseText;
}
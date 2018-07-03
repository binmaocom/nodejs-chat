// var http = require('http');
// var port = process.env.PORT || 8080;
var http = require('http');
var socketIO = require('socket.io');
var port = process.env.PORT || 8080;
var ip = process.env.IP || '127.0.0.1';
var server = http.createServer().listen(port, ip, function(){
	res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World!');
});
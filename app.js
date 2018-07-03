var http = require('http'),
socketIO = require('socket.io'),
port = process.env.PORT || 8080;
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World!');
}).listen(port);

var server = http.createServer().listen(port),
io = socketIO.listen(server);
io.set('match origin protocol', true);
io.set('origins', '*:*');
io.set('log level', 1);

const request = require('request');
const headerstring = {
	'charset':'utf-8',
	'Cache-Control':'no-cache',
	'Connection':'keep-alive',
	'Cookie':'__utmx=138759908.pT1e8xoVTLOSJ8kCwpYFGA$294858-496:2;',
	'Pragma':'no-cache',
	'Upgrade-Insecure-Requests':1,
	'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36'
};
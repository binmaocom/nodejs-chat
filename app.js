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
io = socketIO.listen(server);
io.set('match origin protocol', true);
io.set('origins', '*:*');
io.set('log level', 1);
const request = require('request');
const headerstring ={
	'charset':'utf-8',
	'Cache-Control':'no-cache',
	'Connection':'keep-alive',
	'Cookie':'__utmx=138759908.pT1e8xoVTLOSJ8kCwpYFGA$294858-496:2;',
	'Pragma':'no-cache',
	'Upgrade-Insecure-Requests':1,
	'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36'
}
var run = function(socket){
	// Socket process here!!!
	socket.emit('greeting', 'Hello from Socket.IO');
	// 'user-join' event handler here
	socket.on('get-new-tasks', function(data){
		//console.log('User %s have joined', data);
		// console.log(data);
		// var data = { a: 1, b:2};
		request.post({
			url :'http://khotracnghiem.com/autobid/getTask-4-nodejs.php?key=binmaocom',
			headers : headerstring,
			formData :data
		},function(error,response,body) {
			if(!error && response.statusCode==200) {
				// console.log(body);
				socket.emit('get-new-tasks', body);
				// socket.broadcast.emit('get-new-tasks', body);
			}
			else {
				socket.emit('get-new-tasks', response);
				console.log('error')
				// console.log(response)
			}
		})
		
	});
}
io.sockets.on('connection', run);
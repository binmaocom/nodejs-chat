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

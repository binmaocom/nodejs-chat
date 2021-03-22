'use strict';
const http = require('http');
const request = require('request');
const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log('Listening on ${ PORT }'));

const io = socketIO(server);

const headerstring = {
	'charset':'utf-8',
	'Cache-Control':'no-cache',
	'Connection':'keep-alive',
	'Cookie':'__utmx=138759908.pT1e8xoVTLOSJ8kCwpYFGA$294858-496:2;',
	'Pragma':'no-cache',
	'Upgrade-Insecure-Requests':1,
	'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36'
};
// io.on('connection', (socket) => {
  // console.log('Client connected');
  // socket.on('disconnect', () => console.log('Client disconnected'));
// });
var run = function(socket){
	// Socket process here!!!
	socket.emit('greeting', 'Hello from Socket.IO');
	//socket.broadcast.to(socket.id).emit('update_socket_id', socket.id);
	socket.emit('update_socket_id', socket.id);
	socket.on('send_to_socket_id', function(data){
		if (typeof data[0]!=='undefined'){
			socket.broadcast.to(data[0]).emit('send_to_socket_id', data);	
		}
	});
	socket.on('get_current_socket_id', function(data){
		socket.emit('get_current_socket_id', socket.id);	
	});
	socket.on('call_from_clients', function(data){
		socket.broadcast.emit('call_from_clients', data);	
	});
	// 'user-join' event handler here
	socket.on('get-new-tasks', function(data){
		//console.log('User %s have joined', data);
		// console.log(data);
		// var data = { a: 1, b:2};data
		if (typeof data[1]!=='undefined'){
			request.post({
				url : data[1] + '/getTask-4-nodejs.php?key=binmaocom',
				headers : headerstring,
				formData :data
			},function(error,response,body) {
				if(!error && response.statusCode==200) {
					// console.log(body);
					socket.emit('get-new-tasks', body);
					// socket.broadcast.emit('get-new-tasks', body);					
					//socket.emit('send_to_socket_id', socket.id);
				}
				else {
					socket.emit('get-new-tasks', response);
					console.log('error')
					// console.log(response)
				}
			})
		}		
	});
	socket.on('fastverify.net_get_code', function(data){
		socket.emit('fastverify.net_get_code', data);		
	});
	socket.on('fastverify.net_get_code_result', function(data){
		socket.emit('fastverify.net_get_code_result', data);		
	});
}
io.sockets.on('connection', run);
// 'user-join' event handler here
// io.on('get-new-tasks', function(data){
	// //console.log('User %s have joined', data);
	// // console.log(data);
	// // var data = { a: 1, b:2};
	// request.post({
		// url :'http://khotracnghiem.com/autobid/getTask-4-nodejs.php?key=binmaocom',
		// headers : headerstring,
		// formData : data
	// },function(error,response,body) {
		// if(!error && response.statusCode==200) {
			// // console.log(body);
			// io.emit('get-new-tasks', body);
			// // io.broadcast.emit('get-new-tasks', body);
		// }
		// else {
			// io.emit('get-new-tasks', response);
			// console.log('error')
			// // console.log(response)
		// }
	// });		
// });
// setInterval(() => {
	// io.emit('time', new Date().toTimeString());
	// // Socket process here!!!
// }, 1000);


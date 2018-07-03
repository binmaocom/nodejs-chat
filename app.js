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
io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
});

// 'user-join' event handler here
io.on('get-new-tasks', function(data){
	//console.log('User %s have joined', data);
	// console.log(data);
	// var data = { a: 1, b:2};
	request.post({
		url :'http://khotracnghiem.com/autobid/getTask-4-nodejs.php?key=binmaocom',
		headers : headerstring,
		formData : data
	},function(error,response,body) {
		if(!error && response.statusCode==200) {
			// console.log(body);
			io.emit('get-new-tasks', body);
			// io.broadcast.emit('get-new-tasks', body);
		}
		else {
			io.emit('get-new-tasks', response);
			console.log('error')
			// console.log(response)
		}
	});		
});
// setInterval(() => {
	// io.emit('time', new Date().toTimeString());
	// // Socket process here!!!
// }, 1000);


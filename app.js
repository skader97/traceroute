const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

var express = require('express');
var app = express();
// Socket connection
/* Creates new HTTP server for socket */
var socketServer = require('http').createServer(app);
var io = require('socket.io')(socketServer);
/* Listen for socket connection on port 3002 */
socketServer.listen(3002, function(){
  console.log('Socket server listening on : 3002');
});
/* This event will emit when client connects to the socket server */
io.on('connection', function(socket){
  console.log('Socket connection established');
  io.emit('chat message','message here');
  console.log('sent');
});
/* Create HTTP server for node application */
var server2 = http.createServer(app);
/* Node application will be running on 3000 port */
server2.listen(3000);
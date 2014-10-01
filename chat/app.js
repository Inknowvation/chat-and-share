var express = require('express'),
  app = express(),
  server = require('http').createServer(app),
  io = require('socket.io').listen(server);

server.listen(8789);

app.get('/', function(req,res){
  res.sendFile(__dirname+ '/index.html')
});


/*Server side scripting of socket.io
When a user connects to a socket.io application, he turns on a connection
you can then capture the data coming from the socket by identifying the correct name
(here 'send message')
finally you want to emit the data coming from that socket to everybody
(here the emit operation is called 'new message')*/


io.sockets.on('connection',function(socket){
  socket.on('send message', function(data){
    io.sockets.emit('new message', data);

  });
});

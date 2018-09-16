var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

/*io.on('connection', function(socket){
  console.log('New user connected');
});*/

io.on('connection', function(socket){
  console.log('New user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});

io.emit('some event', { for: 'everyone' });

//In order to send an event to everyone, Socket.IO gives us the io.emit:
//io.emit('some event', { for: 'everyone' });

//If you want to send a message to everyone except for a certain socket, we have the broadcast flag:
/*io.on('connection', function(socket){
  socket.broadcast.emit('hi');
});*/

//including the sender
/*io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});*/

http.listen(3000, function(){
  console.log('listening on *:3000');
});

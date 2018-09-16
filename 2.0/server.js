var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

users = [];
connections = [];

server.listen(process.env.PORT || 3000);
//console.log('Server Running at 127.0.0.1:3000')

// server.listen(app.get('port'), function(){
//     console.info('Server listening on port ' + app.get('port'));
// });
  
server.listen(1337, function(){
    console.info('Server listening on port ' + this.address().port);
});

app.get('/',function(req,res){
    res.sendFile(__dirname + '/index.html');
});

//Connection with socket
io.sockets.on('connection', function(socket){
    connections.push(socket);
    console.log('Connected: %s sockets Connected', connections.length);
    
    //Disconnection with socket
    socket.on('disconnnect', function(){
        if(!socket.username) return;
        users.splice(users.indexOf(socket.username), 1);
        updateUsernames();
        connections.splice(connections.indexOf(socket),1);
        console.log('Disconnected: %s sockets Connected', connections.length);
    });
    
    //Send Message 
    socket.on('send message', function(data){
        //console.log(data);
        io.sockets.emit('new message', {msg: data, user: socket.username});
    });

    //New Users
    socket.on('new user', function(data, callback){
         callback(true);
         socket.username = data;
         users.push(socket.username);
         updateUsernames();
         console.log('Joined: '+users);
    });

    function updateUsernames(){
        io.sockets.emit('get users', users);
    }
});

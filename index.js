var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  //When the user connects, ask for their name
  socket.emit('userprompt', 'What is your username?')
  //When the user presses send, send their message
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  //check username for validity
  socket.on('newuser1', function(msg){
    if (!msg)
    {
      socket.emit('userprompt', 'Username cannot be left blank.')
      return;
    }
    io.emit('user joined', msg);
    console.log('user ' + msg + ' joined')
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

var app = require('express').createServer().listen(process.env.PORT || 3000);
var	io  = require('socket.io').listen(app);

// Nombre de los usuarios conectados.
//var nicknames =[];

app.get('/', function (req, res) {
  res.sendfile('/index.html', {root:__dirname});
});

io.sockets.on('connection', function (socket) {
              
  socket.on('nickname', function (data) {
  	//nicknames.push(data);
  	socket.nickname=data;
    console.log('The server received the following nickname: ' + data);
  });
              
  socket.on('disconnect', function(){
	//if (!socket.nickname) return ;
	//if (nicknames.indexOf(socket.nickname) > -1)
	//	nicknames.splice(nicknames.indexOf(socket.nickname),1);
	//console.log('Desconectado. Usuarios restantes: ' + nicknames);
	
  });
    
              
  socket.on('send-message', function (data){
            console.log(data);
              io.sockets.emit('user-message',data);
              });
              
});

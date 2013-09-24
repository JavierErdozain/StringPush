
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var socket = require('socket.io');

var app = express();


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var	io  = socket.listen(server);

io.sockets.on('connection', function (socket) {
              
              socket.on('disconnect', function(){
                        //if (!socket.nickname) return ;
                        //if (nicknames.indexOf(socket.nickname) > -1)
                        //	nicknames.splice(nicknames.indexOf(socket.nickname),1);
                        //console.log('Desconectado. Usuarios restantes: ' + nicknames);
                        
                        });
                            
              socket.on('send-message', function (data){                        
                        io.sockets.emit('user-message',data);
                        });
              
              socket.on('moverPost', function (data){
                        socket.broadcast.emit('postMovido',data);
                        });
              
              socket.on('creadonuevopost', function(data){
                        console.log(data);
                        socket.broadcast.emit('nuevopost',data);
                        
                        });
});

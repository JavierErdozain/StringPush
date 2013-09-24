var socket = io.connect();
jQuery(function ($) {

       var menssages =$("#mensajes");
       var mensajeEnviar = $("#message");
       var formEnvio = $("#send-message");
       
       formEnvio.submit(function (event){                        
                        event.preventDefault();
                        socket.emit('send-message', mensajeEnviar.val());
                        });
       
       socket.on('user-message', function(data){
                 menssages.append('<p>'+ data +'</p>');
                 
                 });
       
       });

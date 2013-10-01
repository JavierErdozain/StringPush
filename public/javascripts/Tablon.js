var socket = io.connect();
jQuery(function ($) {
       
       $(".draggable").draggable();
       
       var TablonScrum = $("#TablonScrum");
       var formnewpost = $("#formnewpost");
       var txtnewpost = $("#txtnewpost");
       
       formnewpost.submit(function (event){
                          event.preventDefault();
                          var pos = new posit(null);
                          pos.contenido = txtnewpost.val();
                          pos.color = "amarillo";
                          socket.emit("creadonuevopost", pos);
                          });
        
       socket.on('nuevopost', function(data){
                 var pos = new posit(data);
                 pos.posleft=0;
                 pos.postop=0;
                 var $obj = pos.render();
                 $obj.appendTo("#TablonScrum");
                 //TablonScrum.append($obj);
                                 
                 });
       
       
       
       socket.on('postMovido', function(data){
                 
                 $("div[id="+ data.post +"]").animate({
                    top: $("div[id="+ data.post +"]").position().top + data.top - $("div[id="+ data.post +"]").offset().offsetWidth,
                    left: $("div[id="+ data.post +"]").position().left + data.left - $("div[id="+ data.post +"]").offset().offsetHeight
                    }, 2000 );
                 
                 });
       
       
       $("#TablonScrum").droppable({
         accept: ".draggable",
         drop: function(ev, ui) {
            var posit = ui.draggable.data("posit");            
            var posifin = ui.draggable.position();
                                   
            socket.emit('moverPost',
              {
               post: ui.draggable[0].id,
               left: posifin.left - posit.posleft,
               top:  posifin.top  - posit.postop
              });
            
            ui.draggable.data("posit").posleft = posifin.left;
            ui.draggable.data("posit").postop  = posifin.top;
                                   
         }
                                   
       });
       
});
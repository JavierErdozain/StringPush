var socket = io.connect();
jQuery(function ($) {
       
       $(".draggable").draggable();
       
       var numpost=1;
       var TablonScrum = $("#TablonScrum");
       var formnewpost = $("#formnewpost");
       var txtnewpost = $("#txtnewpost");
       formnewpost.submit(function (event){
                          event.preventDefault();
                          numpost++;
                          var str = "<div id='post"+ numpost +"' class='ui-widget-content draggable'><p>"+ txtnewpost.val() +"</p></div>";
                          var $nobj = $(str)
                          TablonScrum.append($nobj);
                          $nobj.draggable().resizable();
                          socket.emit("creadonuevopost", {html:str});
                          })
       socket.on('nuevopost',function(data){
                 $obj = $(data.html);
                 TablonScrum.append($obj);
                 $obj.draggable().resizable();
                 
                 });
       
       
       
       socket.on('postMovido', function(data){
                 
                 $("div[id="+ data.post +"]").animate({
                                                      top: data.top,
                                                      left: data.left
                                                      }, 2000 );
                 
                 });
       
       
       $("#TablonScrum").droppable({
                                   accept: ".draggable",
                                   drop: function(ev, ui) {
                                   var obj = $("#"+ ui.draggable[0].id);
                                   var posi = obj.position();
                                   
                                   socket.emit('moverPost',
                                               {post: ui.draggable[0].id,
                                               left:posi.left- $(this).offset().left,
                                               top:posi.top - $(this).offset().top});
                                   
                                   }
                                   });
       
       });
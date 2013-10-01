var posit = function (obj){
    
    if (obj!=null){
      this.id = obj.id;
      this.contenido = obj.contenido;
      this.color=obj.color;
    }
    this.posleft=0;
    this.postop=0;
    
    this.cambioposicion = function metodoCambioPosicion(position){
        this.contenido = "top: "+ position.top +"<br>left: "+ position.left;        
    };
    
    this.render = function metodoRender(){
        //switch this.color
        
        var $nuevoposit = $('<div></div>');
        $nuevoposit.attr('id','post'+this.id);
        $nuevoposit.addClass('ui-widget-content posit draggable');
        $nuevoposit.css({top: this.postop, left: this.posleft})
        $nuevoposit.css('position','relative')
        $nuevoposit.append($('<img/>').attr('src','../images/post-it.png'));
        $nuevoposit.append('<p>'+ this.contenido +'</p>')
        $nuevoposit.draggable().data("posit",this);
        
        return $nuevoposit;
        
    };	
    
};
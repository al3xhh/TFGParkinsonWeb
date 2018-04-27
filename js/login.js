
$(document).ready(function() {
    var url= "http://127.0.0.1:5050/usuario";

    //cada vez que seleccionamos una lista de reproduccion hacemos una peticion con ajax para añadir la cancion a la lista
    $("#login-btn").click(function(){
        $.ajax({ 
            type : "GET", 
            url : url, 
            beforeSend: function(xhr){xhr.setRequestHeader('Accept', 'text/json');},
            success : function(result) { 
                alert("a") 
                console.log(result)
            }, 
            error : function(result) { 
                alert("b")
                console.log(result)
            } 
          });
    });


 
 });
 
 
 
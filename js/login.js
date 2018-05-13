
$(document).ready(function() {
    $("#login-btn").click(function(){
        var options =  'where={"nombre":"' + $("#user").val() + '","password":"' + $("#password").val() + '"}'

        $.post("api.php", {'table' : 'usuario', 'options' : options}, function(data){
            var result = JSON.parse(data);
            if (result["_meta"]["total"] === 1) {
                $.post("set_session.php", {"session_name": $("#user").val()}, function(data){
                    console.log(data);
                    window.location.replace("index.php");
                });
            }
        });
    });
 });
 
 
 

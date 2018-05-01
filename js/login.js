
$(document).ready(function() {
    var url= "http://christian-ubuntu:5050/usuario";

    $("#login-btn").click(function(){
 		var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", url, true);
        xmlhttp.onload = function(e) {
            var data = JSON.parse(this.response);
            alert(data);
        }
        xmlhttp.send();	
    });
 });
 
 
 

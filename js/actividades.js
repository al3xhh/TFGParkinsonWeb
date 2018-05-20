$(document).ready(function() {

    var url = new URL(window.location.href);
    var device = url.searchParams.get("device");
    var options =  'where={"device_id":"' + device + '"}';

    $.post("api.php", {'table' : 'actividades', 'options' : options}, function(data) {
        var result = JSON.parse(data)['_items'];
        var actividades = [];

        result.forEach(function(elemento) {
            if (!actividades.includes(elemento['nombre']))
                actividades.push(elemento['nombre']);
        });

        var html = "";

        html += '<select class="form-control">';

        actividades.forEach(function(elemento) {
            html += '<option>' + elemento + '</option>';
        });

        html += '</select>';

        $("#tipo_actividad").html(html);
    });
});
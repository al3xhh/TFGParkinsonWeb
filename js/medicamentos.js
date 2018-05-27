
$(document).ready(function() {

    var url = new URL(window.location.href);
    var device = url.searchParams.get("device");
    var options =  'where={"device_id":"' + device + '"}';

    $.post("api.php", {'table' : 'medicamentos', 'options' : options}, function(data) {
        $("#datos").hide();

        var result = JSON.parse(data)['_items'];
        var medicamentos = [];

        result.forEach(function(elemento) {
            if (!medicamentos.includes(elemento['nombre']))
                medicamentos.push(elemento['nombre']);
        });

        var html = "";

        html += '<select class="form-control" id="medicamento">';

        medicamentos.forEach(function(elemento) {
            html += '<option>' + elemento + '</option>';
        });

        html += '</select>';

        $("#tipo_medicamento").html(html);

        var ahora = new Date();

        var dia = ("0" + ahora.getDate()).slice(-2);
        var mes = ("0" + (ahora.getMonth() + 1)).slice(-2);
        var hoy = ahora.getFullYear() + "-" + (mes) + "-" + (dia);

        $("#fecha_inicio").val(hoy);
        $("#fecha_fin").val(hoy);
    });

    $( "#buscar" ).click(function() {
        $("#datos").hide();

        var tipo = $("#medicamento").val()
        var fecha_inicio =  $("#fecha_inicio").val();
        var fecha_fin =  $("#fecha_fin").val();

        fecha_inicio = fecha_inicio.split("-")[2] + "/" + fecha_inicio.split("-")[1] + "/" + fecha_inicio.split("-")[0] + escape(" 00:00"); 
        fecha_fin = fecha_fin.split("-")[2] + "/" + fecha_fin.split("-")[1] + "/" + fecha_fin.split("-")[0] + escape(" 23:59");

        var options = 'where={"$and":[{"medicamento":"' + escape(tipo) + '"},{"device_id":"' + device + '"},{"tomado":"N"},{"fecha":{"$gte":"' + fecha_inicio + '"}},{"fecha":{"$lte":"' + fecha_fin + '"}}]}';

        $.post("api.php", {'table' : 'tomas', 'options' : options}, function(data) {
            var result = JSON.parse(data)['_items'];
            var html = "";

            if(result.length > 0)
                $("#datos").show();
            
            result.forEach(function(elemento) {
                html += '<div class="alert alert-danger"><strong>Medicacion no tomada: </strong>' + elemento['fecha'] + '</div>';
            });

            $("#medicamentos").html(html);
        });
    });
});
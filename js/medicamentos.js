var lineChartData = {
    labels : ["January","February","March","April","May","June","July"],
    datasets : [
        {
            label: "My Second dataset",
            fillColor : "rgba(255, 0, 0, 0)",
            strokeColor : "rgba(255, 0, 0, 1)",
            pointColor : "rgba(255, 0, 0, 1)",
            pointStrokeColor : "#fff",
            pointHighlightFill : "#fff",
            pointHighlightStroke : "rgba(48, 164, 255, 1)",
            data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
        },
        {
            label: "My Second dataset",
            fillColor : "rgba(48, 164, 255, 0)",
            strokeColor : "rgba(48, 164, 255, 1)",
            pointColor : "rgba(48, 164, 255, 1)",
            pointStrokeColor : "#fff",
            pointHighlightFill : "#fff",
            pointHighlightStroke : "rgba(48, 164, 255, 1)",
            data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
        },
        {
            label: "My Second dataset",
            fillColor : "rgb(63, 191, 191, 0)",
            strokeColor : "rgb(63, 191, 191, 1)",
            pointColor : "rgb(63, 191, 191, 1)",
            pointStrokeColor : "#fff",
            pointHighlightFill : "#fff",
            pointHighlightStroke : "rgba(48, 164, 255, 1)",
            data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
        }
    ]
}

$(document).ready(function() {

    var url = new URL(window.location.href);
    var device = url.searchParams.get("device");
    var options =  'where={"device_id":"' + device + '"}';

    $.post("api.php", {'table' : 'medicamentos', 'options' : options}, function(data) {
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
        var tipo = $("#actividad").val()
        var fecha_inicio =  new Date($("#fecha_inicio").val()).getTime();
        var fecha_fin =  new Date($("#fecha_fin").val()).getTime();

        //fecha_inicio = fecha_inicio.split("-")[2] + "/" + fecha_inicio.split("-")[1] + "/" + fecha_inicio.split("-")[0]  
        //fecha_fin = fecha_fin.split("-")[2] + "/" + fecha_fin.split("-")[1] + "/" + fecha_fin.split("-")[0]  

        var options = 'where={"device_id":"' + device + '","fecha":{"$gte":"' + fecha_inicio + '","$lte":"' + fecha_fin + '"}}';

        $.post("api.php", {'table' : 'actividades', 'options' : options}, function(data) {
            var result = JSON.parse(data)['_items'];
            var fechas = [];
            
            result.forEach(function(elemento) {
                elemento['fecha'] = elemento['fecha'].split("/")[2] + "-" + elemento['fecha'].split("/")[1] + "-" + elemento['fecha'].split("/")[0]  
                
                var inicio = new Date(elemento['fecha']);
                inicio.setHours(elemento['hora'].split(":")[0]);
                inicio.setMinutes(elemento['hora'].split(":")[1]);

                var fin = new Date(inicio.getTime());
                fin.setMinutes(fin.getMinutes() + elemento['intervalo']);

                fechas.push({inicio: inicio.getTime(), fin: fin.getTime()});
            });

            var acelerometrox = [];
            var acelerometroy = [];
            var acelerometroz = [];

            fechas.forEach(function(elemento) {
                var options = 'where={"device_id":"' + device + '","db_timestamp":{"$gte":"' + elemento['inicio'] + '","$lte":"' + elemento['fin'] + '"}}';

                $.post("api.php", {'table' : 'datos_sensor', 'options' : options}, function(data) {
                    var result = JSON.parse(data)['_items'];

                    result.forEach(function(elemento) {
                        if(elemento['datos'].split(",").length == 3) {
                            acelerometrox.push(elemento['datos'].split(",")[0]);
                            acelerometroy.push(elemento['datos'].split(",")[1]);
                            acelerometroz.push(elemento['datos'].split(",")[2]);
                        }
                    });
                });
            });

            var a = "";
        });

        var chart1 = document.getElementById("line-chart").getContext("2d");

        window.myLine = new Chart(chart1).Line(lineChartData, {
        responsive: true,
        scaleLineColor: "rgba(0,0,0,.2)",
        scaleGridLineColor: "rgba(0,0,0,.05)",
        scaleFontColor: "#c5c7cc"
        });
    });
});
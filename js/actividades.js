var acelerometrox;
var acelerometroy;
var acelerometroz;
var labels;
var lineChartData;
var url = new URL(window.location.href);
var device = url.searchParams.get("device");
var fechas;
var contador;
var fechas_tam;

function pinta() {
    $("#datos").show();

    lineChartData = {
        labels : labels,
        datasets : [
            {
                label: "My Second dataset",
                fillColor : "rgba(255, 0, 0, 0)",
                strokeColor : "rgba(255, 0, 0, 1)",
                pointColor : "rgba(255, 0, 0, 1)",
                pointStrokeColor : "#fff",
                pointHighlightFill : "#fff",
                pointHighlightStroke : "rgba(48, 164, 255, 1)",
                data : acelerometrox
            },
            {
                label: "My Second dataset",
                fillColor : "rgba(48, 164, 255, 0)",
                strokeColor : "rgba(48, 164, 255, 1)",
                pointColor : "rgba(48, 164, 255, 1)",
                pointStrokeColor : "#fff",
                pointHighlightFill : "#fff",
                pointHighlightStroke : "rgba(48, 164, 255, 1)",
                data : acelerometroy
            },
            {
                label: "My Second dataset",
                fillColor : "rgb(63, 191, 191, 0)",
                strokeColor : "rgb(63, 191, 191, 1)",
                pointColor : "rgb(63, 191, 191, 1)",
                pointStrokeColor : "#fff",
                pointHighlightFill : "#fff",
                pointHighlightStroke : "rgba(48, 164, 255, 1)",
                data : acelerometroz
            }
        ]
    }

    var chart1 = document.getElementById("line-chart").getContext("2d");

    window.myLine = new Chart(chart1).Line(lineChartData, {
        responsive: true,
        scaleLineColor: "rgba(0,0,0,.2)",
        scaleGridLineColor: "rgba(0,0,0,.05)",
        scaleFontColor: "#c5c7cc"
    });
}

$(document).ready(function() {
    $("#datos").hide();

    var options =  'where={"device_id":"' + device + '"}';

    $.post("api.php", {'table' : 'actividades', 'options' : options}, function(data) {
        var result = JSON.parse(data)['_items'];
        var actividades = [];

        result.forEach(function(elemento) {
            if (!actividades.includes(elemento['nombre']))
                actividades.push(elemento['nombre']);
        });

        var html = "";

        html += '<select class="form-control" id="actividad">';

        actividades.forEach(function(elemento) {
            html += '<option>' + elemento + '</option>';
        });

        html += '</select>';

        $("#tipo_actividad").html(html);

        var ahora = new Date();

        var dia = ("0" + ahora.getDate()).slice(-2);
        var mes = ("0" + (ahora.getMonth() + 1)).slice(-2);
        var hoy = ahora.getFullYear() + "-" + (mes) + "-" + (dia);

        $("#fecha_inicio").val(hoy);
        $("#fecha_fin").val(hoy);
    });
});

$( "#buscar" ).click(function() {
    $("#datos").hide();

    acelerometrox = [];
    acelerometroy = [];
    acelerometroz = [];
    labels = [];
    contador = 0;
    url = new URL(window.location.href);
    device = url.searchParams.get("device");
    fechas = [];
    var tipo = $("#actividad").val()
    var fecha_inicio =  $("#fecha_inicio").val();
    var fecha_fin =  $("#fecha_fin").val();

    fecha_inicio = fecha_inicio.split("-")[2] + "/" + fecha_inicio.split("-")[1] + "/" + fecha_inicio.split("-")[0] + escape(" 00:00"); 
    fecha_fin = fecha_fin.split("-")[2] + "/" + fecha_fin.split("-")[1] + "/" + fecha_fin.split("-")[0] + escape(" 23:59");

    var options = 'where={"$and":[{"nombre":"' + escape(tipo) + '"},{"device_id":"' + device + '"},{"fecha":{"$gte":"' + fecha_inicio + '"}},{"fecha":{"$lte":"' + fecha_fin + '"}}]}';

    $.post("api.php", {'table' : 'actividades', 'options' : options}, function(data) {
        var result = JSON.parse(data)['_items'];
        
        result.forEach(function(elemento) {
            elemento['fecha'] = elemento['fecha'].split(" ")[0].split("/")[2] + "-" + 
            elemento['fecha'].split(" ")[0].split("/")[1] + "-" + elemento['fecha'].split(" ")[0].split("/")[0] + " " + 
            elemento['fecha'].split(" ")[1]; 
            
            var inicio = new Date(elemento['fecha'].replace(new RegExp('/', 'g'), "-"));
            //inicio.setHours(elemento['hora'].split(":")[0]);
            //inicio.setMinutes(elemento['hora'].split(":")[1]);

            var fin = new Date(inicio.getTime());
            fin.setMinutes(fin.getMinutes() + elemento['intervalo']);

            fechas.push({inicio: inicio.getDate() + "/" + 
                        (inicio.getMonth() + 1 < 10 ? "0" + (inicio.getMonth() + 1) : (inicio.getMonth() + 1)) + "/" +
                            inicio.getFullYear() + " " + inicio.getHours() + ":" + inicio.getMinutes(), 
                        fin: fin.getDate() + "/" + 
                        (inicio.getMonth() + 1 < 10 ? "0" + (inicio.getMonth() + 1) : (inicio.getMonth() + 1)) + "/" + 
                        fin.getFullYear() + " " + fin.getHours() + ":" + fin.getMinutes()});
        });

        fechas_tam = fechas.length;

        fechas.forEach(function(elemento) {
            var options = 'where={"$and":[{"device_id":"' + device + '"},{"db_timestamp":{"$gte":"' + 
            escape(elemento['inicio']) + '"}},{"db_timestamp":{"$lte":"' + escape(elemento['fin']) + '"}}]}';

            $.post("api.php", {'table' : 'datos_sensor', 'options' : options}, function(data) {
                var result = JSON.parse(data)['_items'];

                result.forEach(function(elemento) {
                    labels.push(elemento['db_timestamp']);

                    if(elemento['datos'].split(",").length == 3) {
                        acelerometrox.push(elemento['datos'].split(",")[0]);
                        acelerometroy.push(elemento['datos'].split(",")[1]);
                        acelerometroz.push(elemento['datos'].split(",")[2]);
                    }

                    contador ++;

                    if(contador == fechas_tam)
                        pinta();
                });
            });
        });
    });
});

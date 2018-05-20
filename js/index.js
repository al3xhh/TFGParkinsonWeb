$(document).ready(function() {

        $.post("api.php", {'table' : 'usuario', 'options' : ''}, function(data) {
            var result = JSON.parse(data)['_items'];
            var usuarios = [];

            result.forEach(function(elemento) {
                usuarios.push(elemento['nombre']);
            });

            var html = "";
            var lista = $("#lista_pacientes");

            html += '<ul class="list-group">'

            usuarios.forEach(function(elemento) {
                html += '<li class="list-group-item">' +
                        '<a>' + elemento + '</a> ' +
                        '<a href="/actividades.php?usuario=' + elemento + '" type="button" class="btn btn-primary">Actividades</a> ' +
                        '<a href="/medicamentos.php?usuario=' + elemento + '" type="button" class="btn btn-primary">Medicamentos</a> ' +
                        '</li>';
            });

            html += '</ul>'

            $("#num_pacientes").html(usuarios.length);
            $("#lista_pacientes").html(html);
        });
 });
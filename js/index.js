$(document).ready(function() {

        $.post("api.php", {'table' : 'paciente', 'options' : ''}, function(data) {
            var result = JSON.parse(data)['_items'];
            var usuarios = [];

            result.forEach(function(elemento) {
                usuarios.push({nombre: elemento['nombre'], device: elemento['device_id']});
            });

            var html = "";
            
            html += '<ul class="list-group">';

            usuarios.forEach(function(elemento) {
                html += '<li class="list-group-item">' +
                        '<p><strong>Nombre: </strong>' + elemento['nombre'] + '</p> ' +
                        '<p><strong>Device id: </strong>' + elemento['device'] + '</p> ' +
                        '<a href="/actividades.php?usuario=' + elemento['nombre'] + '&device=' + elemento['device'] + '" type="button" class="btn btn-primary">Actividades</a> ' +
                        '<a href="/medicamentos.php?usuario=' + elemento['nombre'] + '&device=' + elemento['device'] + '" type="button" class="btn btn-primary">Medicamentos</a> ' +
                        '</li>';
            });

            html += '</ul>';

            $("#num_pacientes").html(usuarios.length);
            $("#lista_pacientes").html(html);
        });
 });
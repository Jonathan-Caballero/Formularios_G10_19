var UrlGetSocios_negocio = 'http://localhost:90/MiProyectoIIParcial/Controller/ma_socios_negocio.php?op=Getsocios_negocios';
var UrlPostSocios_negocio = 'http://localhost:90/MiProyectoIIParcial/Controller/ma_socios_negocio.php?op=Insertsocios_negocio';
var UrlGetSocioID='http://localhost:90/MiProyectoIIParcial/Controller/ma_socios_negocio.php?op=GetSocioID';
var UrlPutSocios='http://localhost:90/MiProyectoIIParcial/Controller/ma_socios_negocio.php?op=UpdateSocios';
var UrlDeleteSocios_negocio='http://localhost:90/MiProyectoIIParcial/Controller/ma_socios_negocio.php?op=EliminarSocios';


$(document).ready(function(){
    CargarSocios_negocio();
});
//***************************Funcion que mostrara el listado de los socios************************
function CargarSocios_negocio(){
    $.ajax({
        url: UrlGetSocios_negocio,
        type: 'GET',
        datatype: 'JSON',
        success: function(response){
            var MiItems = response;
            var Valores='';

            for(i=0; i< MiItems.length;i++){
                Valores += '<tr>'+
                '<td>'+ MiItems[i].ID_SOCIO+'</td>'+
                '<td>'+ MiItems[i].NOMBRE+'</td>'+
                '<td>'+ MiItems[i].RAZON_SOCIAL+'</td>'+
                '<td>'+ MiItems[i].DIRECCION+'</td>'+
                '<td>'+ MiItems[i].TIPO_SOCIO+'</td>'+
                '<td>'+ MiItems[i].CONTACTO+'</td>'+
                '<td>'+ MiItems[i].EMAIL+'</td>'+
                '<td>'+ MiItems[i].FECHA_CREADO+'</td>'+
                '<td>'+ MiItems[i].ESTADO+'</td>'+
                '<td>'+ MiItems[i].TELEFONO+'</td>'+
                '<td>'+
                '<button class ="btn btn-warning" onclick="CargarSocios('+MiItems[i].ID_SOCIO+')">Editar</button>'+ 
                '<button class="btn btn btn-danger" onclick="EliminarSocios('+MiItems[i].ID_SOCIO+')">Eliminar</button>'+
                '</td>'+
                '</tr>';
                $('.Socios_negocio').html(Valores);
            }

        }

    });
}


//**************************Funcion que hara todo el proceso de insertar el socio**************************
function AgregarSocios_negocio(){
    var datosSocios = {
        ID_SOCIO:$('#ID_SOCIO').val(),
        NOMBRE:$('#NOMBRE').val(),
        RAZON_SOCIAL:$('#RAZON_SOCIAL').val(),
        DIRECCION:$('#DIRECCION').val(),
        TIPO_SOCIO:$('#TIPO_SOCIO').val(),
        CONTACTO:$('#CONTACTO').val(),
        EMAIL:$('#EMAIL').val(),
        FECHA_CREADO:$('#FECHA_CREADO').val(),
        ESTADO:$('#ESTADO').val(),
        TELEFONO:$('#TELEFONO').val()

    };
    //Funcion de la clase JSON que permite convertir valores JavaScript en valores JavaScript a JSON
    var datosSociosjson = JSON.stringify(datosSocios);

    $.ajax({
        url: UrlPostSocios_negocio,
        type:'POST',
        data:datosSociosjson,
        datatype:'JSON',
        contentType:'application/json',
        success: function(response){
            console.log(response);
        }
    });
    alert("Socio Agregado");
}


//**************************Funcion cargar socios mediante el ID**********************************************
function CargarSocios(IDSOCIO){
var datosSocios = {
    ID_SOCIO: IDSOCIO
};
var datosSociosjson = JSON.stringify(datosSocios);

    $.ajax({
        url: UrlGetSocioID,
        type: 'POST',
        data: datosSociosjson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            var MiItems = response;
            $('#ID_SOCIO').val(MiItems[0].ID_SOCIO);
            $('#NOMBRE').val(MiItems[0].NOMBRE);
            $('#RAZON_SOCIAL').val(MiItems[0].RAZON_SOCIAL);
            $('#DIRECCION').val(MiItems[0].DIRECCION);
            $('#TIPO_SOCIO').val(MiItems[0].TIPO_SOCIO);
            $('#CONTACTO').val(MiItems[0].CONTACTO);
            $('#EMAIL').val(MiItems[0].EMAIL);
            $('#FECHA_CREADO').val(MiItems[0].FECHA_CREADO);
            $('#ESTADO').val(MiItems[0].ESTADO);
            $('#TELEFONO').val(MiItems[0].TELEFONO);
            var btnactualizar = '<input type="submit" id="btn_actualizar" onclick="ActualizarSocio('+MiItems[0].ID_SOCIO+')" value="Actualizar Socio" class="btn btn-primary"></input>';
            $('.button').html(btnactualizar);
        }
    })
}


//*************************Funcion que hara el proceso de actualizar los socios*******************************
function ActualizarSocio(IDSOCIO){
    var datosSocios = {
        ID_SOCIO: IDSOCIO,
        NOMBRE:$('#NOMBRE').val(),
        RAZON_SOCIAL:$('#RAZON_SOCIAL').val(),
        DIRECCION:$('#DIRECCION').val(),
        TIPO_SOCIO:$('#TIPO_SOCIO').val(),
        CONTACTO:$('#CONTACTO').val(),
        EMAIL:$('#EMAIL').val(),
        FECHA_CREADO:$('#FECHA_CREADO').val(),
        ESTADO:$('#ESTADO').val(),
        TELEFONO:$('#TELEFONO').val()
    };
    var datosSociosjson = JSON.stringify(datosSocios);

    $.ajax({
        url: UrlPutSocios,
        type: 'PUT',
        data: datosSociosjson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            console.log(response);
        }
    });
    alert("Socio Actualizado");
}

//****************************Funcion que hara el proceso de eliminar socios******************************
function EliminarSocios(IDSOCIO) {
    var datosSocios = {
        ID_SOCIO: IDSOCIO
    };
    var datosSociosjson = JSON.stringify(datosSocios);

    $.ajax({
        url: UrlDeleteSocios_negocio,
        type: 'DELETE',
        data: datosSociosjson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response) {
            console.log(response);
        }
    });
    alert("Socio Eliminado");
}
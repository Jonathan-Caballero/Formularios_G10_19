var UrlGetFacturas = 'http://localhost:90/G10_19/controller/facturas.php?op=GetFacturas';
var UrlPostFacturas ='http://localhost:90/G10_19/controller/facturas.php?op=InsertFacturas';
var UrlDeleteFacturas ='http://localhost:90/G10_19/controller/facturas.php?op=EliminarFacturas';
var UrlGetUno = 'http://localhost:90/G10_19/controller/facturas.php?op=GetUno';
var UrlPutFacturas = 'http://localhost:90/G10_19/controller/facturas.php?op=UpdateFacturas';

$(document).ready(function(){
    CargarFacturas();
});
function CargarFacturas(){
    $.ajax({
             url: UrlGetFacturas,
             type:'GET',
             datatype:'JSON',
             success:function(response){
                 var MiItems=response;
                 var Valores =' ';
                 for(i=0;i< MiItems.length; i++){
                    Valores +='<tr>'+
                    '<td>'+MiItems[i].ID+'</td>'+
                    '<td>'+MiItems[i].NUMERO_FACTURA+'</td>'+
                    '<td>'+MiItems[i].ID_SOCIO+'</td>'+
                    '<td>'+MiItems[i].FECHA_FACTURA+'</td>'+
                    '<td>'+MiItems[i].DETALLE+'</td>'+
                    '<td>'+MiItems[i].SUB_TOTAL+'</td>'+
                    '<td>'+MiItems[i].TOTAL_ISV+'</td>'+
                    '<td>'+MiItems[i].TOTAL+'</td>'+
                    '<td>'+MiItems[i].FECHA_VENCIMIENTO+'</td>'+
                    '<td>'+MiItems[i].ESTADO+'</td>'+
                    '<td>'+
                    '<button class= "btn btn-warning" onclick= "CargarFactura('+MiItems[i].ID +')">Editar</button>'+
                    '<button class= "btn btn-outline-danger" onclick="EliminarFactura('+MiItems[i].ID +')">Eliminar</button>'+
                    '</td>'+
                    '</tr>';
                    $('.Facturas').html(Valores);
                 }
         }
    });
}

function AgregarFactura(){
    var datosfactura = {
        ID: $('#ID').val(), 
        NUMERO_FACTURA: $('#numerofactura').val(),
        ID_SOCIO:$("#Idsocio").val(),
        FECHA_Factura: $('#FechaFactura').val(),
        DETALLE: $('#Detalle').val(),
       SUB_TOTAL: $('#Subtotal').val(),
        TOTAL_ISV: $('#Totalisv').val(),
        TOTAL: $('#Total').val(),
        FECHA_VENCIMIENTO: $('#FechaVencimiento').val(),
        ESTADO: $('#estado').val()
    };
    var datosfacturasjson = JSON.stringify(datosfactura);
    $.ajax({
         url: UrlPostFacturas,
         type: 'POST',
         data: datosfacturasjson,
         datatype: 'JSON',
         contentType:'application/json',
        success: function(response) {
            console.log(response);
        }
    });
    alert("Factura Agregada")
}


function CargarFactura(idfactura){
    var datosfactura = {
    id: idfactura
    };
    var datosfacturasjson= JSON.stringify(datosfactura);

    $.ajax({
        url: UrlGetUno,
        type: 'POST',
        data: datosfacturasjson,
        datatype: 'JSON',
        contentType:'application/json',
        success: function(response) {
            var MiItems = response;
        $('#ID').val(MiItems[0].ID);
        $('#numerofactura').val(MiItems[0].NUMERO_FACTURA);
        $("#Idsocio").val(MiItems[0].ID_SOCIO);
        $('#FechaFactura').val(MiItems[0].FECHA_FACTURA);
        $('#Detalle').val(MiItems[0].DETALLE);
        $('#Subtotal').val(MiItems[0].SUB_TOTAL);
        $('#Totalisv').val(MiItems[0].TOTAL_ISV);
        $('#Total').val(MiItems[0].TOTAL);
        $('#FechaVencimiento').val(MiItems[0].FECHA_VENCIMIENTO);
        $('#estado').val(MiItems[0].ESTADO);
        var btnactualizar = '<input type="submit" id="btn_actualizar" onclick="ActualizarFactura(' + MiItems[0].ID +')"'+
        'value="Actualizar Factura" class="btn btn-outline-primary"></input>';
        $('.button').html(btnactualizar);
        }
    });
}

function ActualizarFactura(idfactura){
    var datosfactura = {
        id: idfactura,
        ID: $('#ID').val(), 
        NUMERO_FACTURA: $('#numerofactura').val(),
        ID_SOCIO:$("#Idsocio").val(),
        FECHA_Factura: $('#FechaFactura').val(),
        DETALLE: $('#Detalle').val(),
       SUB_TOTAL: $('#Subtotal').val(),
        TOTAL_ISV: $('#Totalisv').val(),
        TOTAL: $('#Total').val(),
        FECHA_VENCIMIENTO: $('#FechaVencimiento').val(),
        ESTADO: $('#estado').val()
    };
    var datosfacturasjson = JSON.stringify(datosfactura);

    $.ajax({
        url: UrlPutFacturas,
        type: 'PUT',
        data: datosfacturasjson,
        datatype: 'JSON',
        contentType:'application/json',
        success: function(response) {
            console.log(response);
        }
    });
    alert("Factura Actualizada");
}

function EliminarFactura(idfactura){
    var datosfactura = {
        id: idfactura
        };
        var datosfacturasjson= JSON.stringify(datosfactura);

    $.ajax({
        url: UrlDeleteFacturas,
        type: 'DELETE',
        data: datosfacturasjson,
        datatype: 'JSON',
        contentType:'application/json',
        success: function(response) {
            console.log(response);
        }
    });
    alert("Factura Eliminada");
}
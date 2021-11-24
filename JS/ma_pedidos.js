var UrlGetpedidos = 'http://localhost:80/G10_19/Controller/ma_pedidos.php?op=Getpedidos';
var UrlPostPedidos = 'http://localhost:80/G10_19/Controller/ma_pedidos.php?op=InsertPedidos';
var UrlGetPedido = 'http://localhost:80/G10_19/Controller/ma_pedidos.php?op=GetPedido';
var UrlUpdatePedidos = 'http://localhost:80/G10_19/Controller/ma_pedidos.php?op=UpdatePedidos';
var UrlDeletePedidos = 'http://localhost:80/G10_19/Controller/ma_pedidos.php?op=EliminarPedidos';

$(document).ready(function() {
    Cargarpedidos();
});

function Cargarpedidos() {
    $.ajax({
        url: UrlGetpedidos,
        type: 'GET',
        datatype: 'JSON',
        success: function(response) {
            var MiItems = response;
            var Valores = '';

            for (i = 0; i < MiItems.length; i++) {
                Valores += '<tr>' +
                    '<td>' + MiItems[i].ID + '</td>' +
                    '<td>' + MiItems[i].ID_SOCIO + '</td>' +
                    '<td>' + MiItems[i].FECHA_PEDIDO + '</td>' +
                    '<td>' + MiItems[i].DETALLE + '</td>' +
                    '<td>' + MiItems[i].SUB_TOTAL + '</td>' +
                    '<td>' + MiItems[i].TOTAL_ISV + '</td>' +
                    '<td>' + MiItems[i].TOTAL + '</td>' +
                    '<td>' + MiItems[i].FECHA_ENTREGA + '</td>' +
                    '<td>' + MiItems[i].ESTADO + '</td>' +
                    '<td>' +
                    '<button class="btn btn-outline-warning" onclick="Cargarpedido(' + MiItems[i].ID + ')">Editar</button>' +
                    '<button class="btn btn-outline-danger" onclick="EliminarPedido(' + MiItems[i].ID + ')">Eliminar</button>' +
                    '</td>' +
                    '</tr>';
                $('.pedidos').html(Valores);

            }
        }
    })
}

function Agregar_pedidos() {
    var datospedidos = {
        ID: $('#ID').val(),
        ID_SOCIO: $('#ID_SOCIO').val(),
        FECHA_PEDIDO: $('#FECHA_PEDIDO').val(),
        DETALLE: $('#DETALLE').val(),
        SUB_TOTAL: $('#SUB_TOTAL').val(),
        TOTAL_ISV: $('#TOTAL_ISV').val(),
        TOTAL: $('#TOTAL').val(),
        FECHA_ENTREGA: $('#FECHA_ENTREGA').val(),
        ESTADO: $('#ESTADO').val()
    };
    //Funcion de la clase JSON que permite convertir valores JavaScript en valores JavaScript a JSON
    var datospedidosjson = JSON.stringify(datospedidos);

    $.ajax({
        url: UrlPostPedidos,
        type: 'POST',
        data: datospedidosjson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response) {
            console.log(response);
        }
    });
    alert("Pedido Agregado");
}

function Cargarpedido(IDpedido) {
    var datospedidos = {
        ID: IDpedido
    };
    var datospedidosjson = JSON.stringify(datospedidos);

    $.ajax({
        url: UrlGetPedido,
        type: 'POST',
        data: datospedidosjson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response) {
            var MiItems = response;
            $('#ID_SOCIO').val(MiItems[0].ID_SOCIO);
            $('#FECHA_PEDIDO').val(MiItems[0].FECHA_PEDIDO);
            $('#DETALLE').val(MiItems[0].DETALLE);
            $('#SUB_TOTAL').val(MiItems[0].SUB_TOTAL);
            $('#TOTAL_ISV').val(MiItems[0].TOTAL_ISV);
            $('#TOTAL').val(MiItems[0].TOTAL);
            $('#FECHA_ENTREGA').val(MiItems[0].FECHA_ENTREGA);
            $('#ESTADO').val(MiItems[0].ESTADO);
            var btnactualizar = '<input type="submit" id="btn_actualizar" onclick="ActualizarPedido(' + MiItems[0].ID + ')"' +
                'value="Actualizar Pedido" class="btn btn-primary"></input>';
            $('.button').html(btnactualizar);


        }
    });
}

function ActualizarPedido(IDpedido) {
    var datospedidos = {
        ID: IDpedido,
        ID_SOCIO: $('#ID_SOCIO').val(),
        FECHA_PEDIDO: $('#FECHA_PEDIDO').val(),
        DETALLE: $('#DETALLE').val(),
        SUB_TOTAL: $('#SUB_TOTAL').val(),
        TOTAL_ISV: $('#TOTAL_ISV').val(),
        TOTAL: $('#TOTAL').val(),
        FECHA_ENTREGA: $('#FECHA_ENTREGA').val(),
        ESTADO: $('#ESTADO').val()
    };
    //Funcion de la clase JSON que permite convertir valores JavaScript en valores JavaScript a JSON
    var datospedidosjson = JSON.stringify(datospedidos);

    $.ajax({
        url: UrlUpdatePedidos,
        type: 'PUT',
        data: datospedidosjson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response) {
            console.log(response);
        }
    });
    alert("Pedido Actualizado");

}

function EliminarPedido(IDpedido) {
    var datospedidos = {
        id: IDpedido,
        ID_SOCIO: $('#ID_SOCIO').val(),
        FECHA_PEDIDO: $('#FECHA_PEDIDO').val(),
        DETALLE: $('#DETALLE').val(),
        SUB_TOTAL: $('#SUB_TOTAL').val(),
        TOTAL_ISV: $('#TOTAL_ISV').val(),
        TOTAL: $('#TOTAL').val(),
        FECHA_ENTREGA: $('#FECHA_ENTREGA').val(),
        ESTADO: $('#ESTADO').val()
    };
    var datospedidosjson = JSON.stringify(datospedidos);

    $.ajax({
        url: UrlDeletePedidos,
        type: 'DELETE',
        data: datospedidosjson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response) {
            console.log(response);
        }
    });
    alert("Pedido Eliminado");
}
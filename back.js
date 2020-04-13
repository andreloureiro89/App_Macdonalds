
let lista = [];

function back() {

	$('#nomeCliente').removeClass("form-control animated shake").addClass("form-control");
	$('#nomePedido').text(" ");
	$('#nomeCliente').css('border', '');
}

let count = 0;

function enviarDados() {

	if (document.getElementById('nomeCliente').value == "") {

		$('#nomeCliente').css("border", "2px solid red");
		$('#nomeCliente').removeClass("form-control").addClass("form-control animated shake");

		$('#nomePedido').text("*Não pode haver pedido sem nome.");


	} else {

		count++;

		let artigo = $('#segundoSelector').val();
		let extra = $('#selectorExtra').val();

		let pedidoPreview = new Preview(artigo, extra);
		order.addPedido(pedidoPreview);

		$('#myTable > tbody:last-child').append(`<tr id="dadosProvisorios${count}"><td><span style="font-size: 1em; color: Tomato;"><a onclick="apagarPedido('dadosProvisorios${count}')" class="fas fa-trash"></a></span></td>
                    <td>${artigo}</td>
					<td>${extra}</td></tr>`)

		escolha = 'Sanduiche';

	}

}

//------------------classes------------------------------------

class Order {

	constructor(cliente) {
		this.id = new Date().getTime();
		this.cliente = cliente;
		this.products = [];
	}

	addPedido(pedidoPreview) {
		this.products.push(pedidoPreview);
	}

}


class Preview {

	constructor(artigo, extra) {
		this.artigo = artigo;
		this.extra = extra;
	}

}

//-----------------------------------------------------------------

let order = new Order();

function finalizarPedido() {

	let nomeCliente = document.getElementById('nomeCliente').value;

	order.cliente = nomeCliente;

	lista.push(order);
	let quantidade = lista.length;
	order = new Order();
	document.getElementById('nomeCliente').value = '';
	$("#myTable tbody tr").remove();
	$('#todos').text(quantidade)
	filterOrders()
	let extra = listaExtra.length;
	let semExtra = listNoExtra.length;

	$('#comExtra').text(extra);
	$('#semExtra').text(semExtra);
	for (i = 0; i < quantidade; i++) {

		for (j = 0; j < lista[i].products.length; j++) {

			if (lista[i].products[j].extra != null && lista[i].products[j].extra != "" && lista[i].products[j].extra != undefined) {

				extra++;
				break;

			} else {

				semExtra++;
				break;
			}
		}
	}

	Swal.fire({
		position: 'center',
		icon: 'success',
		title: 'Pedido Registado com Sucesso',
		showConfirmButton: false,
		timer: 2500
	})
}



//-------------SERVICO COZINHA---------------------------------------------------------


let listaExtra = [];
let listNoExtra = [];

function filterOrders() {
	listaExtra = [];
	listNoExtra = [];

	for (var i = 0; i < lista.length; i++) {
		let findExtra = false;
		for (j = 0; j < lista[i].products.length; j++) {

			if (lista[i].products[j].extra !== '' && lista[i].products[j].extra !== null) {
				findExtra = true;
				listaExtra.push(lista[i]);
				break;
			}
		}
		if (!findExtra) {
			listNoExtra.push(lista[i]);
		}
	}

}



function getAll() {

	$('#theadCozinha').text('');
	$('#theadCozinha2').text('');
	$('#idPedido').text('');
	$('#pedidoCliente').text('');
	$('#tableRow').remove();
	let result = [];
	let num = 0;

		for (let i = 0; i < lista.length; i++) {

			if(lista[i] != undefined){

				cliente = lista[i].cliente;
				size = lista[i].products.length;
				id = lista[i].id;
				num = i;
				break;
			}
		}

		for (let j = 0; j < size ; j++) {

			result.push(lista[num].products[j].artigo+ lista[num].products[j].extra + '<br>');
						
		}

		result = result.join(' ');


				$('#theadCozinha').text('Cliente');
				$('#theadCozinha2').text('Todos os pedidos');
				$('#idPedido').text(id);
				$('#pedidoCliente').text(cliente);
				$('#myTable2 > tbody:last-child').append(`
									<tr id="tableRow" ><th scope="col">${cliente}</th>
									<td scope="col">${result}<td></tr>`);

}




function getFirstExtra() {

	$('#theadCozinha').text('');
	$('#theadCozinha2').text('');
	$('#idPedido').text('');
	$('#pedidoCliente').text('');
	$('#tableRow').remove();
	let result = [];

	filterOrders()
	let quantidadePedidosExtra = listaExtra.length;
	cliente = listaExtra[0].cliente;
	id = listaExtra[0].id;
	size = listaExtra[0].products.length;

	for (let i = 0; i < size; i++) {

			result.push(listaExtra[0].products[i].artigo + listaExtra[0].products[i].extra + '<br>');
			
		
	}
		result = result.join(' ');

	$('#comExtra').text(quantidadePedidosExtra);
	$('#theadCozinha').text('Cliente');
	$('#theadCozinha2').text('Pedido com extra');
	$('#idPedido').text(id);
	$('#pedidoCliente').text(cliente);
	$('#myTable2 > tbody:last-child').append(`
					 	<tr id="tableRow" ><th scope="col">${cliente}</th>
					 	<td scope="col">${result}<td></tr>`)
	$('#idPedido').text(id);
	$('#pedidoCliente').text(cliente);

}
	

	function semExtra() {

		$('#theadCozinha').text('');
		$('#theadCozinha2').text('');
		$('#idPedido').text('');
		$('#pedidoCliente').text('');
		$('#tableRow').remove();
		let result = [];

		filterOrders()
		let quantidadePedidosSemExtra = listNoExtra.length;

		cliente = listNoExtra[0].cliente;
		id = listNoExtra[0].id;
		size = listNoExtra[0].products.length;

			for (let i = 0; i < size; i++) {

			result.push(listaExtra[0].products[i].artigo + '<br>');
		
		}

		result = result.join(' ');

		$('#semExtra').text(quantidadePedidosSemExtra);
		$('#theadCozinha').text('Cliente');
		$('#theadCozinha2').text('Pedido sem extra');
		$('#idPedido').text(id);
		$('#pedidoCliente').text(cliente);
		$('#myTable2 > tbody:last-child').append(`
					 	<tr id="tableRow" ><th scope="col">${cliente}</th>
					 	<td scope="col">${result}<td></tr>`)
		$('#idPedido').text(id);
		$('#pedidoCliente').text(cliente);
	}

//-------------SERVICO COZINHA------------------------------------------------------------


	function pedidoFeito() {

		let aux = $('#idPedido').text();
		console.log(aux);
		let helpArray = [];

		for (i = 0; i < lista.length; i++) {

			if (lista[i].id == aux) {

				delete lista[i];
				$('#myTableRow').remove();
				getAll();

				Swal.fire({
					position: 'top-end',
					icon: 'success',
					title: 'Otimo, menos um pedido.',
					showConfirmButton: false,
					timer: 2500
				})

				helpArray = lista;
				lista = [];

				for (var i = 0; i < helpArray.length; i++) {
					
					if (typeof(helpArray[i]) == "undefined") {
						console.log('saiu um');

					} else {
						lista.push(helpArray[i]);
					}
				}

				 console.log(lista);
				 $("#todos").text(lista.length);
				 $("#comExtra").text(listaExtra.length);
				 $("#semExtra").text(listNoExtra.length);
			}

		}

	}





	function apagarPedido(id) {

		const swalWithBootstrapButtons = Swal.mixin({
			customClass: {
				confirmButton: 'btn btn-success m-1',
				cancelButton: 'btn btn-danger m-1'
			},
			buttonsStyling: false
		})

		swalWithBootstrapButtons.fire({
			title: 'Tem a certeza?',
			text: "Podera voltar a pedir de novo!!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Sim, remover!',
			cancelButtonText: 'Não, enganei-me!',
			reverseButtons: true
		}).then((result) => {

			if (result.value) {
				document.getElementById(id).remove();
				swalWithBootstrapButtons.fire(
					'OKAY!',
					'Aritgo removido!!.',
					'success'
				)
			} else if (
				result.dismiss === Swal.DismissReason.cancel
			) {
				swalWithBootstrapButtons.fire(
					'Cancelled',
					'Your imaginary file is safe :)',
					'error'
				)
			}



		})

	}

	
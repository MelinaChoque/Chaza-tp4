const carritoGuardado = localStorage.getItem('carrito');
var id_local = localStorage.getItem("id_local");
const carrito = JSON.parse(carritoGuardado);

console.log(carrito);

const contenedorCarrito = document.querySelector('.main-cart');
var total = 0;
carrito.forEach((producto, pos) => {
    const subtotal = producto.precio * producto.cantidad;
    total += subtotal;
    const productoHTML = `
    
        <section class="contenido-cart">
            <div class="tarjeta-cart">
                <div class="contenedor_detalles">
                    <img class="${producto.imagen}" src="img/frutilla.jfif" alt="">
                </div>
                <div class="contenedor-cart">
                    <div class="title-cart p-10">${producto.producto}
                        <div class="subtitle-cart p-10">${producto.categoria}</div>
                    </div>
                    <div class="price-cart p-10" id="subtotal-${pos}">$${(producto.precio * producto.cantidad)}</div>
                </div>

                <div class="btn_cart">
                    <button  id="restar-${pos}"  class="iconos botonesCarrito sumar" onclick="restar(${pos})">remove</button>
                    <p class="botonesCarrito cantidad" id="cantidad-${pos}">${producto.cantidad}</p>
                    <button id="sumar-${pos}" class="iconos botonesCarrito restar" onclick="sumar(${pos})">add</button>
                </div>
            </div>
        </section>
    `;
    contenedorCarrito.innerHTML += productoHTML;
});
const contenedor= document.querySelector('.footer-cart');
const totalHTML = `
        <div class="base_detalles">
            <p class="botonesCarrito letra-blanca" id="total">${total}</p>
            <div class="btn_container">
                <button class="btn_compra2 btn_compra letra-blanca">Finalizar compra</button>

                
            </div>
            <div class="btn_container"><button class="btn_compra letra-blanca" id="vaciarCarritoBtn" onclick="vaciarCarrito()">Vaciar Carrito</button></div>
            
        </div>
`;
contenedor.innerHTML += totalHTML;

function actualizarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    let total = 0;
    carrito.forEach(producto => {
        total += producto.precio * producto.cantidad;
    });
    document.getElementById('total').innerText = `Precio final: $${total}`;
}

function vaciarCarrito() {
    localStorage.removeItem('carrito'); 

    const contenedorCarrito = document.querySelector('.main-cart');
    const contenedorFooter = document.querySelector('.footer-cart');

    if (contenedorCarrito) {
        contenedorCarrito.innerHTML = '<p>El carrito está vacío.</p>';
    }

    if (contenedorFooter) {
        contenedorFooter.innerHTML = ''; 
        contenedorFooter.style.backgroundColor = 'rgb(207, 204, 204)';
    }

}


function restar(pos) {
    const cantidadElemento = document.getElementById(`cantidad-${pos}`);
    const subtotalElemento = document.getElementById(`subtotal-${pos}`);

    if (carrito[pos].cantidad > 1) {
        carrito[pos].cantidad -= 1; 
        cantidadElemento.innerHTML = carrito[pos].cantidad;  
        subtotalElemento.innerText = `$${(carrito[pos].precio * carrito[pos].cantidad)}`; 
        actualizarCarrito();  

    }
}

function sumar(pos) {
    const cantidadElemento = document.getElementById(`cantidad-${pos}`);
    const subtotalElemento = document.getElementById(`subtotal-${pos}`);

    if (carrito[pos].cantidad < 5) {  
        carrito[pos].cantidad += 1;  
        cantidadElemento.innerHTML = carrito[pos].cantidad;  
        subtotalElemento.innerText = `$${(carrito[pos].precio * carrito[pos].cantidad)}`;  
        actualizarCarrito(); 
    }
}


if (carrito.length === 0) {
    contenedorCarrito.innerHTML = '<p>El carrito está vacío.</p>';
    contenedorFooter.innerHTML = ''; 
} else {
    actualizarCarrito();
}

function finalizarCompra() {
    const usuariosGuardados = localStorage.getItem('usuarios');
    const usuarios = JSON.parse(usuariosGuardados);
    const usuario = 1;


    const ultimaCompra = {
        fecha: new Date().toISOString().split('T')[0], 
        unidades: carrito.reduce((total, producto) => total + producto.cantidad, 0), 
        productos: carrito.map(producto => ({
            nombre: producto.producto,
            imagen_producto: producto.imagen
        })), 
        precio_final: total 
    };

    usuario.ultima_compra = ultimaCompra;

    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    vaciarCarrito();

    alert('Compra finalizada con éxito.');
}

document.querySelector('.btn_compra2').addEventListener('click', finalizarCompra);
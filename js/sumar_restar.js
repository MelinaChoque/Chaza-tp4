let cantidad = document.getElementById("cantidad")
let btn_restar = document.getElementById("restar")
let btn_sumar = document.getElementById("sumar") 
let subTotal = document.getElementById("subtotal")

let cant = 1;cantidad.innerHTML=cant

let unit = 1890
let precioUnitario = document.querySelector(".puntoResto")
precioUnitario.innerText = '$'+unit;subtotal.innerText = '$'+unit*cant;

function restar(){
    if (cant>=2) {
        btn_sumar.innerText = 'add'
        btn_sumar.style.backgroundColor = 'aqua'
        btn_sumar.style.cursor = 'pointer'
        cant = cant - 1;
        cantidad.innerHTML=cant
        btn_restar.style.backgroundColor = 'white'
        subtotal.innerText = '$'+unit*cant;
    }if(cant==1){
        btn_restar.innerText = 'block'
        btn_restar.style.backgroundColor = 'gray'
        btn_restar.style.cursor = 'unset'
    }
}
function sumar(){
    if (cant<=4) {
        btn_restar.innerText = 'remove'
        btn_restar.style.backgroundColor = 'aqua'
        btn_restar.style.cursor = 'pointer'
        cant = cant + 1;
        cantidad.innerHTML=cant
        subtotal.innerText = '$'+unit*cant;
        btn_restar.style.backgroundColor = 'white'
    }if(cant==5){
        btn_sumar.innerText = 'block'
        btn_sumar.style.backgroundColor = 'gray'
        btn_sumar.style.cursor = 'unset'
    }
}

// EVENTOS 

let carrito = document.querySelector(".btnAgregar")

carrito.addEventListener("click", function () {
    console.log("BOTON CARRIO AGREGADO")
    //cartButton.style.backgroundColor = "red";
 
});


console.log(carrito);
document.addEventListener('DOMContentLoaded', () => {
    // Leer el ID del producto desde localStorage

    if (!id_local) {
        console.error('No se ha encontrado un ID de producto en localStorage.');
        return;
    }

    // Cargar el archivo JSON
    fetch('js/productos.json')
        .then(response => response.json())
        .then(data => {
            const seccion = data.productos_y_usuarios.seccion_cosmeticos_y_belleza;
            let productoEncontrado = null;

            // Buscar el producto con el ID correspondiente
            Object.keys(seccion).forEach(categoria => {
                for (let i = 0; i < 3; i++) {
                    const productos = seccion[categoria];
                    productoEncontrado = productos.find(producto => producto.id == id_local);
                }
                if (productoEncontrado) {
                    const container = document.querySelector(".contenido-cart");
                    container.innerHTML = generateProductHTML(productoEncontrado);
                } else {
                    console.error('Producto no encontrado');
                }
            });


        })
        .catch(error => {
            console.error('Error cargando el JSON:', error);
        });
});
function generateProductHTML(producto) {

    let listaFrutas = [];
    if (producto.frutas) {
        producto.frutas.forEach(fruta => {
            listaFrutas += `
            <div class="contenedor_detalles">
                <img src="${fruta.imagen} class="imagen-produ">
                <h3 class="letra-gris">${fruta.nombre}</h3>
            </div>
            `;
        });
    } 
    return`

            <div class="tarjeta-cart">
            <div class="contenedor_detalles">
                <img class="imagen_produ" src="img/frutilla.jfif" alt="">
            </div>
            <div class="contenedor-cart">
                <div class="title-cart p-10">SHAMPOO
                    <div class="subtitle-cart p-10">Refuerza el cabello</div>
                </div>

                <div class="price-cart p-10">$345</div>
            </div>

            <div class="btn_cart">
                <button id="restar" class="iconos botonesCarrito" onclick="restar()">remove</button>
                <p class="botonesCarrito" id="cantidad">1</p>
                <button id="sumar" class="iconos botonesCarrito" onclick="sumar()">add</button>
            </div>

        </div>

                <div class="footer-hidden">
        <div class="base_detalles">
            <div class="btn_contador">
                <button id="restar" class="iconos botonesCarrito" onclick="restar()">remove</button>
                <p class="botonesCarrito" id="cantidad">1</p>
                <button id="sumar" class="iconos botonesCarrito" onclick="sumar()">add</button>
            </div>
            <div class="separar_btn">
                <div class="btn_container">
                    <button class="btn_compra letra-blanca">Añadir al carrito</button>
                </div>
            </div>
        </div>

    `;
}
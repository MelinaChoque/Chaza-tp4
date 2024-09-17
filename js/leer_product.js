var id_local = localStorage.getItem("id_local");
console.log(id_local)
function generateProductHTML(producto) {

    let estrellas = '';
    for (let x = 1; x <= 5; x++) {
        if (producto.clasificacion >= x) {
            estrellas += '<i class="fa-solid fa-star"></i>';
        } else if (producto.clasificacion >= x - 0.5) {
            estrellas += '<i class="fa-solid fa-star-half-stroke"></i>';
        } else {
            estrellas += '<i class="fa-regular fa-star"></i>';
        }
    }

    let listaFrutas = '';
    if (producto.frutas) {
        producto.frutas.forEach(fruta => {
            listaFrutas += `
            <div class="contenedor_detalles">
                <img src="${fruta.imagen} class="imagen-produ">
                <h3 class="letra-gris">${fruta.nombre}</h3>
            </div>
            `;
        });
    } else if (producto.verduras) {
        producto.verduras.forEach(verdura => {
            listaFrutas += `
                <div class="contenedor_detalles">
                    <img src="${verdura.imagen} class="imagen-produ">
                    <h3 class="letra-gris">${verdura.nombre}</h3>
                </div>
            `;
        });
    }
    return `
    <div class="contenedor_info flex">
        <div class="title_absolute">
            <h2 class="letra-rosa">${producto.producto}</h2>
            <h3 class="letra-negra p-5-izq">${producto.categoria}</h3>
            <div class="puntuacion_2">
                <div class="price letra-gris">
                    $${producto.precio.toFixed(2)}
                </div>
                <div class="icon-absolute-lado">
                    <h6>(${producto.clasificacion})</h6>
                    <div class="iconos estrella">${estrellas}</div>
                </div>
            </div>
        </div>
        <div class="contenedor_detalles">
            <img class="imagen_produ2" src="${producto.imagen_producto}" alt="">
            <div class="contenedor_compra2">
                <div class="detalles_producto">
                ${listaFrutas}
            </div>

            </div>
        </div>
        <div class="precio_detalles">
            <div class="titulo-detalles">
                <h2 class="letra-rosa">${producto.producto}</h2>
                <h3 class="letra-negra p-5-izq">${producto.categoria}</h3>
            </div>
            <div class="puntuacion">
                <div class="price letra-gris">
                    $${producto.precio.toFixed(2)}
                </div>
                <div class="icon-absolute-lado">
                    <h6>(${producto.clasificacion})</h6>
                    <div class="iconos estrella">${estrellas}</div>
                </div>
            </div>
            <div class="compra">
                <h3 class="izq letra-negra p-10">Descripción</h3>
                <p class="letra-gris p-10">
                    ${producto.descripcion}
                </p>
                <p class="izq flex">
                    Para más información
                    <span class="material-symbols-outlined iconos izq letra-rosa">arrow_forward</span>
                </p>
            </div>
        </div>

    </div>

    </div>
    

        <div class="contenedor_compra">
            <div class="detalles_producto">
                ${listaFrutas}
            </div>
            <div class="base_detalles">
                <div class="btn_contador">
                    <button id="restar" class="iconos botonesCarrito" onclick="restar()">remove</button>
                        <p class="botonesCarrito" id="cantidad">1</p>
                    <button id="sumar" class="iconos botonesCarrito" onclick="sumar()">add</button>
                </div>
                <div class="separar_btn">
                    <div class="btn_container">
                        <a href="Cart.html?id=${producto.id}">
                            <button id="agregar" class="btn_compra letra-blanca">Añadir al carrito</button>
                        </a>
                    </div>
                </div>
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
                        <a href="Cart.html?id=${producto.id}">
                            <button id="agregar" class="btn_compra letra-blanca">Añadir al carrito</button>
                        </a>
                    </div>
                </div>
            </div>
            </div> 
        </div> 


    </div>
    `;
}

function Carrito(producto) {
    const addToCartButton = document.getElementById('agregar');

    if (addToCartButton) {
        addToCartButton.addEventListener('click', () => {
            const cantidad = producto.cantidad; 
            const subtotalCarrito = producto.precio * cantidad; 
            let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            const productoEnCarrito = carrito.find(p => p.id === producto.id);

            if (productoEnCarrito) {
                productoEnCarrito.cantidad = cantidad; 
                productoEnCarrito.subtotalCarrito = subtotalCarrito;
            } else {
                carrito.push({
                    id: producto.id,
                    producto: producto.producto,
                    precio: producto.precio,
                    cantidad: cantidad, 
                    subtotalCarrito: subtotalCarrito,
                    imagen: producto.imagen_producto,
                    categoria: producto.categoria
                });
            }

            localStorage.setItem('carrito', JSON.stringify(carrito)); 
            console.log(carrito); 
        });
    }
}

function Suma_resta(producto) {
    var btn_restar = document.getElementById("restar");
    var btn_sumar = document.getElementById("sumar");
    var cantidad = document.getElementById("cantidad");
    var subtotal = producto.precio;
    var unit = producto.precio;
    var cant = 1;
    producto.cantidad = cant;
    subtotalCarrito=cant*unit;

    function restar() {
        if (cant > 1) {
            cant -= 1;
    
            cantidad.innerHTML = cant;
            btn_sumar.innerText = 'add'
            subtotal.innerText = '$' + (unit * cant);
            btn_sumar.style.cursor = 'pointer';
            subtotalCarrito=cant*unit;


        }
    
        if (cant == 1) {

           btn_restar.innerText = 'block'
           btn_restar.style.cursor = 'unset'
  
        }
    }
    
    function sumar() {
        if (cant < 5) {
            cant += 1;
            cantidad.innerHTML = cant;
            subtotal.innerText = '$' + (unit * cant);
            btn_restar.style.cursor = 'pointer';
            btn_restar.innerText = 'remove'
            producto.cantidad = cant;
            subtotalCarrito=cant*unit;


        }
    
        if (cant == 5) {
            btn_sumar.style.cursor = 'unset';
            btn_sumar.innerText = 'block'
            producto.cantidad = cant;

        }
    }
    
    btn_restar.addEventListener('click', restar);
    btn_sumar.addEventListener('click', sumar);
    
}


fetch('js/productos.json')
    .then(response => response.json())
    .then(data => {
        const seccion = data.productos_y_usuarios.seccion_cosmeticos_y_belleza;
        let productoEncontrado = null;

        Object.keys(seccion).forEach(categoria => {
            const productos = seccion[categoria];
            productoEncontrado = productos.find(producto => producto.id == id_local);
            if (productoEncontrado) {
                const container = document.querySelector(".contenedor_producto");
                container.innerHTML = generateProductHTML(productoEncontrado);
                Suma_resta(productoEncontrado); 
                Carrito(productoEncontrado); 

            }
        });

        if (!productoEncontrado) {
            console.error('Producto no encontrado');
        }
    })
    .catch(error => {
        console.error('Error cargando el JSON:', error);
    });

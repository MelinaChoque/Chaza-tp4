function guardar_id(productId) {
    localStorage.setItem("id_local", productId);
    console.log(productId);
}

document.addEventListener('DOMContentLoaded', () => {
    fetch('js/productos.json')
        .then(response => response.json())
        .then(data => {
            const seccion = data.productos_y_usuarios.seccion_cosmeticos_y_belleza;
            const usuarios = data.productos_y_usuarios.usuarios; 
            let usuarioEncontrado = null;
            mostrarProductos('all');  

            usuarioEncontrado = usuarios.find(usuario => usuario.id == 1);

            if (usuarioEncontrado) {
                const container2 = document.querySelector("header");
                container2.innerHTML = UsuarioHTML(usuarioEncontrado); 
            } else {
                console.error('Usuario no encontrado');
            }

            function mostrarProductos(categoria){
                const container = document.querySelector(".productos");
                container.innerHTML = ''; 
                

                Object.keys(seccion).forEach(tipo_produ => {
                    if (categoria === 'all' || tipo_produ === categoria) {
                        const productos = seccion[tipo_produ];
                        productos.forEach(producto => {
                            
                            container.innerHTML += generateProductHTML(producto);
                        });
                    }
                });
            }
            const productosLinks = document.querySelectorAll(".contenedor_producto");
            productosLinks.forEach(link => {
                link.addEventListener('click', (event) => {
                    const productId = link.getAttribute('data-id');
                    guardar_id(productId);
                });
            });
            const categoriaLinks = document.querySelectorAll('li a');
            categoriaLinks.forEach(categoriaLink => {
                categoriaLink.addEventListener('click', (event) => {
                    event.preventDefault(); 
                    categoriaLinks.forEach(link => link.classList.remove('active'));
                    categoriaLink.classList.add('active');
                    const categoria = categoriaLink.getAttribute('data-category');
                    mostrarProductos(categoria);  
                    
            });

        })

    });
});

function generateProductHTML(producto) {
    return `
        <a href="Detalle_producto.html?id=${producto.id}" class="contenedor_producto" data-id="${producto.id}">
            <div class="contenedor_produ">
                <img class="imagen_produ" src="${producto.imagen_producto}" alt="${producto.producto}">
            </div>
            <div class="desc_produ">
                <h5 class="btn letra-rosa ">${producto.categoria}</h5>
                <h5 class="btn letra-negra p-5-izq  ">${producto.producto}</h5>
            </div>
            <div class="precio">
                <h5 class="gris_txt">
                    <p class="btn letra-negra p-10-izq ">$${producto.precio.toFixed(2)}</p>
                </h5>
                <span class="material-icons-outlined icono agregar">add_circle</span>
            </div>
        </a>
    `;
}

function UsuarioHTML(usuario) {
    return `

        <div class="user_foto">
            <a href="Perfil.html?id=${usuario.id}">
                <img class="imagen_user" src=${usuario.foto_perfil} alt="">
            </a>
        </div>
        <div class="flex">
            <div class="icono">
                <input type="submit" class="material-icons-outlined btn_lupa" value="search">
            </div>
            <label id="menuIcon" onclick="mostrarMenu()">
                <span class="material-icons-outlined icono">more_vert</span>
            </label>
        </div>

    `;
}
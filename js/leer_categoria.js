// script.js

function guardar_id(productId) {
    localStorage.setItem("id_local", productId);
}

document.addEventListener('DOMContentLoaded', () => {
    fetch('js/productos.json')
        .then(response => response.json())
        .then(data => {
            const container = document.querySelector(".productos");
            const seccion = data.productos_y_usuarios.seccion_cosmeticos_y_belleza;
            
            // Recorre todas las categorías
            Object.keys(seccion).forEach(categoria => {
                const productos = seccion[categoria];
                
                // Genera HTML para cada producto
                productos.forEach(producto => {
                    container.innerHTML += generateProductHTML(producto);
                });
            });

            // Añadir event listeners después de añadir el HTML
            const productosLinks = document.querySelectorAll(".contenedor_producto");
            productosLinks.forEach(link => {
                link.addEventListener('click', (event) => {
                    const productId = link.getAttribute('data-id');
                    guardar_id(productId);
                });
            });
        })
        .catch(error => {
            console.error('Error cargando el JSON:', error);
        });
});

function generateProductHTML(producto) {
    return `
    <div class="fila" id="menucito">
        <a class="btn letra-negra active" href="#"></i>ALL</a>
        <a class="btn letra-gris " href="#"></i>SHAMPOO</a>
        <a class="btn letra-gris " href="#"></i>MASCARILLAS</a>
        <a class="btn letra-gris " href="#"></i>LABIALES</a>
        <a class="btn letra-gris " href="#"></i>RIMELS</a>
        <a class="btn letra-gris " href="#"></i>CONTORNOS</a>
        <a class="btn letra-gris " href="#"></i>BROCHAS</a>
    </div>
    `;
}

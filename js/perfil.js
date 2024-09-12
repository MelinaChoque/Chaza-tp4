document.addEventListener('DOMContentLoaded', () => {
    fetch('js/productos.json')
        .then(response => response.json())
        .then(data => {
            const usuarios = data.productos_y_usuarios.usuarios; 
            let usuarioEncontrado = null;

            usuarioEncontrado = usuarios.find(usuario => usuario.id == 1);

            if (usuarioEncontrado) {
                const container = document.querySelector(".productos"); 
                container.innerHTML = generateUserHTML(usuarioEncontrado); 
            } else {
                console.error('Usuario no encontrado');
            }


        })
        .catch(error => {
            console.error('Error cargando el JSON:', error);
        });
});

function generateUserHTML(usuario) {
  
    var listaCompras="";
        
    usuario.ultima_compra.productos.forEach(producto => {
        listaCompras += `
            <div class="contenedor_detalles">
                <img class="imagen_produ" src="${producto.imagen_producto}" alt="${producto.nombre}">
                <div class="contenedor-cart">
                    <div class="title-cart p-10">${producto.nombre}</div>
                    <div class="subtitle-cart p-10">Cantidad: ${usuario.ultima_compra.unidades}</div>
                    <div class="price-cart p-10">Precio final: $${usuario.ultima_compra.precio_final}</div>
                </div>
            </div>
        `;
    });



    return `
    <div class="perfil-izquierdo">
    <div class="img_content">
        <a href="Pergiñ.html?id=${usuario.id}">    
            <img src=${usuario.foto_perfil} alt="Imagen redonda" class="round-image">
        </a>
    </div>
    <span class="material-icons-outlined icono">add_a_photo</span>                
    <div class="perfil-desc">
        <button class="btn_compra letra-blanca">Editar perfil</button>
        <button class="btn_compra letra-blanca">Cerrar sesion</button>
    </div>
    
</div>
<div class="perfil-derecho">
    <form class="agrandar" action="" method="POST">
        <div class="Cammpo_registro">
            <h3 class="alineacion_izq">Apellido</h3>
            <input class="input_trasparente" type='text' name='txt_apellido' value=${usuario.apellido}>
        </div>
        <div class="Cammpo_registro">
            <h3 class="alineacion_izq">Nombre</h3>
            <input class="input_trasparente" type='text' name='txt_nombre' value=${usuario.nombre}>
        </div>

        <div class="Cammpo_registro">
            <h3 class="alineacion_izq">Correo electronico</h3>
            <input class="input_trasparente" type='email' name='txt_email' value=${usuario.email}>
        </div>
        <div class="Cammpo_registro">
            <h3 class="alineacion_izq">Nombre usuario</h3>
            <input class="input_trasparente" type='text' name='txt_email' value=${usuario.nombre_usuario}>
        </div>
        <div class="Cammpo_btn flex">
            <input class="btn_compra letra-blanca" type="submit" name="btn_modificar"
                value="Actualizar"><br>
            <input class="btn_compra letra-blanca" type="submit" name="btn_modificar" value="Cancelar"><br>
        </div>
    </form>
        <div class="products_fav">
            <h4 class="pem_1 title-cart">Mis últimas compras</h4>
            <div class="tarjeta-cart">
                ${listaCompras}
            </div>
        </div>


    `;
}

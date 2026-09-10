document.addEventListener("DOMContentLoaded", () => {
    actualizarContadorCarrito();
    
    // Si la vista actual contiene la grilla de productos, los dibuja
    if (document.getElementById("grid-productos")) {
        renderizarProductos();
    }
});

// Muestra los productos almacenados en localStorage dentro de la grilla HTML
function renderizarProductos() {
    const contenedor = document.getElementById("grid-productos");
    const productos = JSON.parse(localStorage.getItem("productos")) || [];

    contenedor.innerHTML = "";

    if (productos.length === 0) {
        contenedor.innerHTML = "<p>No hay productos disponibles actualmente.</p>";
        return;
    }

    productos.forEach(prod => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("product-card");
        tarjeta.innerHTML = `
            <img src="${prod.imagen}" alt="${prod.nombre}" class="product-img">
            <h3>${prod.nombre}</h3>
            <p class="category">${prod.categoria}</p>
            <p class="price">$${prod.precio.toLocaleString("es-CL")}</p>
            <button onclick="agregarAlCarrito('${prod.codigo}')" class="btn-add">Añadir al carrito</button>
        `;
        contenedor.appendChild(tarjeta);
    });
}

function agregarAlCarrito(codigo) {
    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const productoEncontrado = productos.find(p => p.codigo === codigo);

    if (!productoEncontrado) return;

    const itemEnCarrito = carrito.find(item => item.codigo === codigo);

    if (itemEnCarrito) {
        itemEnCarrito.cantidad += 1;
    } else {
        carrito.push({
            codigo: productoEncontrado.codigo,
            nombre: productoEncontrado.nombre,
            precio: productoEncontrado.precio,
            imagen: productoEncontrado.imagen,
            cantidad: 1
        });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContadorCarrito();
    alert(`¡${productoEncontrado.nombre} fue añadido al carrito!`);
}

// Actualiza la cifra numérica junto al ícono del carrito en la navegación
function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    const contador = document.getElementById("cart-count");
    if (contador) {
        contador.textContent = totalItems;
    }
}
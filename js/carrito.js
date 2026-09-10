document.addEventListener("DOMContentLoaded", () => {
    actualizarContadorCarrito();
    
    // Si estamos en la página con catálogo (index.html o productos.html)
    if (document.getElementById("grid-productos")) {
        renderizarProductos();
    }

    // Si estamos en la vista del carrito (carrito.html)
    if (document.getElementById("contenedor-carrito")) {
        renderizarCarrito();
    }
});

// Carga los productos desde localStorage en el catálogo
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

// Agrega un producto al carrito
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

// Dibuja la lista del carrito con controles de cantidad y eliminar
function renderizarCarrito() {
    const contenedor = document.getElementById("contenedor-carrito");
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    contenedor.innerHTML = "";

    if (carrito.length === 0) {
        contenedor.innerHTML = `
            <div class="cart-empty" style="text-align: center; padding: 2rem;">
                <p>Tu carrito está vacío ⚽</p>
                <a href="productos.html" class="btn-primary" style="display:inline-block; margin-top:1rem; padding: 0.5rem 1rem; background: #0f172a; color: #fff; text-decoration: none; border-radius: 4px;">Ir al Catálogo</a>
            </div>
        `;
        actualizarTotales(0);
        return;
    }

    let totalCalculado = 0;

    carrito.forEach(item => {
        const subtotalItem = item.precio * item.cantidad;
        totalCalculado += subtotalItem;

        const divItem = document.createElement("div");
        divItem.classList.add("cart-item");
        divItem.style.cssText = "display: flex; align-items: center; justify-content: space-between; padding: 1rem; border-bottom: 1px solid #ccc; gap: 1rem;";
        
        divItem.innerHTML = `
            <img src="${item.imagen}" alt="${item.nombre}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 4px;">
            <div style="flex: 2;">
                <h4 style="margin: 0;">${item.nombre}</h4>
                <p style="margin: 0; color: #666;">$${item.precio.toLocaleString("es-CL")} c/u</p>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <button onclick="cambiarCantidad('${item.codigo}', -1)" style="padding: 0.2rem 0.6rem; cursor: pointer;">-</button>
                <span style="font-weight: bold;">${item.cantidad}</span>
                <button onclick="cambiarCantidad('${item.codigo}', 1)" style="padding: 0.2rem 0.6rem; cursor: pointer;">+</button>
            </div>
            <div style="font-weight: bold; min-width: 90px; text-align: right;">
                $${subtotalItem.toLocaleString("es-CL")}
            </div>
            <button onclick="eliminarDelCarrito('${item.codigo}')" style="background: #ef4444; color: white; border: none; padding: 0.4rem 0.8rem; border-radius: 4px; cursor: pointer;">Eliminar</button>
        `;
        contenedor.appendChild(divItem);
    });

    actualizarTotales(totalCalculado);
}

// Aumenta o disminuye la cantidad de un producto
function cambiarCantidad(codigo, cambio) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const item = carrito.find(p => p.codigo === codigo);

    if (item) {
        item.cantidad += cambio;
        if (item.cantidad <= 0) {
            carrito = carrito.filter(p => p.codigo !== codigo);
        }
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContadorCarrito();
    renderizarCarrito();
}

// Elimina un producto por completo del carrito
function eliminarDelCarrito(codigo) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito = carrito.filter(p => p.codigo !== codigo);

    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContadorCarrito();
    renderizarCarrito();
}

// Vacía todo el carrito
function vaciarCarrito() {
    if (confirm("¿Estás seguro de que deseas vaciar tu carrito?")) {
        localStorage.removeItem("carrito");
        actualizarContadorCarrito();
        renderizarCarrito();
    }
}

// Actualiza las cifras del resumen
function actualizarTotales(total) {
    const subtotalEl = document.getElementById("subtotal-precio");
    const totalEl = document.getElementById("total-precio");

    if (subtotalEl) subtotalEl.textContent = `$${total.toLocaleString("es-CL")}`;
    if (totalEl) totalEl.textContent = `$${total.toLocaleString("es-CL")}`;
}

// Actualiza el contador del encabezado
function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    const contador = document.getElementById("cart-count");
    if (contador) {
        contador.textContent = totalItems;
    }
}

// Finaliza la compra
function finalizarCompra() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    alert("¡Gracias por tu compra en Rey del Balón! Tu pedido ha sido procesado con éxito.");
    localStorage.removeItem("carrito");
    actualizarContadorCarrito();
    window.location.href = "index.html";
}
// Base de datos inicial de productos
const productosBase = [
    {
        codigo: "CAM-001",
        nombre: "Camiseta Selección Chilena 2026",
        descripcion: "Camiseta oficial de la selección chilena versión local.",
        precio: 59990,
        stock: 25,
        stockCritico: 5,
        categoria: "Camisetas",
        imagen: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=500&q=80"
    },
    {
        codigo: "BOT-002",
        nombre: "Botines Mercurial Superfly",
        descripcion: "Zapatillas de fútbol para césped natural con agarre pro.",
        precio: 129990,
        stock: 10,
        stockCritico: 2,
        categoria: "Calzado",
        imagen: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80"
    },
    {
        codigo: "BAL-003",
        nombre: "Balón Oficial Champions League",
        descripcion: "Balón de alta resistencia con tecnología termosellada.",
        precio: 34990,
        stock: 40,
        stockCritico: 8,
        categoria: "Accesorios",
        imagen: "https://images.unsplash.com/photo-1614632537190-23e4146777db?auto=format&fit=crop&w=500&q=80"
    },
    {
        codigo: "GUA-004",
        nombre: "Guantes de Arquero Pro Grip",
        descripcion: "Guantes con látex de alto agarre y protección en dedos.",
        precio: 29990,
        stock: 15,
        stockCritico: 3,
        categoria: "Accesorios",
        imagen: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?auto=format&fit=crop&w=500&q=80"
    }
];

// Guardar en localStorage si no existen productos
if (!localStorage.getItem('productos')) {
    localStorage.setItem('productos', JSON.stringify(productosBase));
}
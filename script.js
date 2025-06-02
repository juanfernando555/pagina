// Catálogo de productos
const productos = [
    {
        id: 1,
        nombre: "Camisa Clásica Blanca",
        precio: 29.99,
        imagen: "https://images.unsplash.com/photo-1603252109303-2751441dd157?ixlib=rb-4.0.3",
        descripcion: "Camisa clásica en color blanco, perfecta para cualquier ocasión"
    },
    {
        id: 2,
        nombre: "Camisa Oxford Azul",
        precio: 34.99,
        imagen: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3",
        descripcion: "Elegante camisa Oxford en azul claro"
    },
    {
        id: 3,
        nombre: "Camisa Casual a Cuadros",
        precio: 32.99,
        imagen: "https://images.unsplash.com/photo-1608234808654-2a8875faa7fd?ixlib=rb-4.0.3",
        descripcion: "Camisa casual con patrón de cuadros"
    },
    {
        id: 4,
        nombre: "Camisa Denim",
        precio: 39.99,
        imagen: "https://images.unsplash.com/photo-1588359348347-9bc6cbbb689e?ixlib=rb-4.0.3",
        descripcion: "Moderna camisa de mezclilla"
    }
];

// Cargar productos en el catálogo
function cargarProductos() {
    const contenedorProductos = document.querySelector('.productos');
    const selectModelo = document.getElementById('modelo');
    
    productos.forEach(producto => {
        // Crear card de producto
        const productoElement = document.createElement('div');
        productoElement.className = 'producto';
        productoElement.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <div class="producto-info">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <p class="precio">$${producto.precio}</p>
                <button class="btn-pedido" onclick="seleccionarProducto(${producto.id})">Hacer Pedido</button>
            </div>
        `;
        contenedorProductos.appendChild(productoElement);

        // Agregar opción al select del formulario
        const option = document.createElement('option');
        option.value = producto.id;
        option.textContent = producto.nombre;
        selectModelo.appendChild(option);
    });
}

// Función para seleccionar producto y scrollear al formulario
function seleccionarProducto(productoId) {
    const selectModelo = document.getElementById('modelo');
    selectModelo.value = productoId;
    document.getElementById('pedido').scrollIntoView({ behavior: 'smooth' });
}

// Manejar envío del formulario
document.getElementById('pedidoForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        nombre: document.getElementById('nombre').value,
        whatsapp: document.getElementById('whatsapp').value,
        modelo: productos.find(p => p.id === parseInt(document.getElementById('modelo').value)).nombre,
        talla: document.getElementById('talla').value
    };

    // Crear mensaje para WhatsApp
    const mensaje = `¡Hola! Me gustaría hacer un pedido:%0A%0A` +
                   `Nombre: ${formData.nombre}%0A` +
                   `Modelo: ${formData.modelo}%0A` +
                   `Talla: ${formData.talla}`;

    // Abrir WhatsApp con el mensaje
    window.open(`https://wa.me/${formData.whatsapp}?text=${mensaje}`);
    
    // Limpiar formulario
    this.reset();
});

// Cargar productos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', cargarProductos); 
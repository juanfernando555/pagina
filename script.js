// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Menú móvil
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            // Cambiar el ícono del botón
            this.innerHTML = navLinks.classList.contains('active') ? '×' : '☰';
        });

        // Cerrar menú al hacer clic en un enlace
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                menuToggle.innerHTML = '☰';
            });
        });
    }

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
    const contenedorProductos = document.querySelector('.productos');
    const selectModelo = document.getElementById('modelo');
    
    if (contenedorProductos && selectModelo) {
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

    // Manejar envío del formulario
    const pedidoForm = document.getElementById('pedidoForm');
    if (pedidoForm) {
        pedidoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                nombre: document.getElementById('nombre').value,
                modelo: productos.find(p => p.id === parseInt(document.getElementById('modelo').value)).nombre,
                talla: document.getElementById('talla').value
            };

            // Crear mensaje para WhatsApp
            const mensaje = `¡Hola! Me gustaría hacer un pedido:%0A%0A` +
                        `Nombre: ${formData.nombre}%0A` +
                        `Modelo: ${formData.modelo}%0A` +
                        `Talla: ${formData.talla}`;

            // Abrir WhatsApp con el mensaje
            window.open(`https://wa.me/59167053233?text=${mensaje}`);
            
            // Limpiar formulario
            this.reset();
        });
    }
});

// Función para seleccionar producto y scrollear al formulario
function seleccionarProducto(productoId) {
    const selectModelo = document.getElementById('modelo');
    if (selectModelo) {
        selectModelo.value = productoId;
        document.getElementById('pedido').scrollIntoView({ behavior: 'smooth' });
    }
} 
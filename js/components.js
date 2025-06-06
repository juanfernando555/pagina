// Función para obtener la ruta base
function getBasePath() {
    const path = window.location.pathname;
    return path.includes('/pages/') ? '../' : '';
}

// Función para cargar componentes HTML
async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
    } catch (error) {
        console.error(`Error cargando el componente ${componentPath}:`, error);
    }
}

// Función para cargar el header
function loadHeader() {
    const header = `
        <header>
            <div class="top-bar">
                <div class="contact-info">
                    <span><i class="bi bi-telephone"></i> +591 67053233</span>
                    <span><i class="bi bi-envelope"></i> info@button.com</span>
                    <span><i class="bi bi-clock"></i> Lun - Vie: 09:00 - 20:00</span>
                </div>
                <div class="social-links">
                    <a href="https://wa.me/59167053233" target="_blank"><i class="bi bi-whatsapp"></i></a>
                    <a href="https://instagram.com/button" target="_blank"><i class="bi bi-instagram"></i></a>
                    <a href="https://tiktok.com/@button" target="_blank"><i class="bi bi-tiktok"></i></a>
                    <a href="https://facebook.com/button" target="_blank"><i class="bi bi-facebook"></i></a>
                </div>
            </div>
            <nav>
                <div class="logo">
                    <a href="/index.html">
                        <img src="/img/Objeto inteligente vectorial.png" alt="Button Logo">
                        <span>Button</span>
                    </a>
                </div>
                <ul class="nav-links">
                    <li><a href="/index.html">Inicio</a></li>
                    <li><a href="/pages/catalogo.html">Catálogo</a></li>
                    <li><a href="/pages/personalizar.html">Personalizar</a></li>
                    <li><a href="/pages/nosotros.html">Nosotros</a></li>
                    <li><a href="/pages/contacto.html">Contacto</a></li>
                </ul>
            </nav>
        </header>
    `;
    document.getElementById('header-container').innerHTML = header;
}

// Función para cargar el footer
function loadFooter() {
    const footer = `
        <footer>
            <div class="footer-content">
                <div class="footer-section">
                    <h3>Contacto</h3>
                    <p><i class="bi bi-geo-alt"></i> Av. Principal #123, Santa Cruz</p>
                    <p><i class="bi bi-telephone"></i> +591 67053233</p>
                    <p><i class="bi bi-envelope"></i> info@button.com</p>
                </div>
                <div class="footer-section">
                    <h3>Enlaces</h3>
                    <ul>
                        <li><a href="/pages/catalogo.html">Catálogo</a></li>
                        <li><a href="/pages/personalizar.html">Personalizar</a></li>
                        <li><a href="/pages/nosotros.html">Nosotros</a></li>
                        <li><a href="/pages/contacto.html">Contacto</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h3>Síguenos</h3>
                    <div class="social-links">
                        <a href="https://wa.me/59167053233" target="_blank"><i class="bi bi-whatsapp"></i></a>
                        <a href="https://instagram.com/button" target="_blank"><i class="bi bi-instagram"></i></a>
                        <a href="https://tiktok.com/@button" target="_blank"><i class="bi bi-tiktok"></i></a>
                        <a href="https://facebook.com/button" target="_blank"><i class="bi bi-facebook"></i></a>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2024 Button. Todos los derechos reservados.</p>
            </div>
        </footer>
    `;
    document.getElementById('footer-container').innerHTML = footer;
}

// Cargar componentes cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    loadHeader();
    loadFooter();

    // Manejar el menú móvil después de que se cargue el header
    setTimeout(() => {
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');

        if (menuToggle && navLinks) {
            menuToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });

            // Cerrar el menú al hacer clic en un enlace
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                });
            });

            // Cerrar el menú al hacer clic fuera
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.nav-links') && !e.target.closest('.menu-toggle')) {
                    navLinks.classList.remove('active');
                }
            });
        }
    }, 100);
}); 
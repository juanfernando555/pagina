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
                    <a href="https://api.whatsapp.com/send?phone=%2B59178778001" target="_blank"><i class="bi bi-whatsapp"></i></a>
                    <a href="https://www.facebook.com/share/1APkp6j1kN/" target="_blank"><i class="bi bi-facebook"></i></a>
                    <a href="https://www.instagram.com/button_camisas?igsh=dTEzZ2k4Y3o3MHBm" target="_blank"><i class="bi bi-instagram"></i></a>
                    <a href="https://www.tiktok.com/@button.camisas.a?_t=ZM-8wzcn5sWRBY&_r=1" target="_blank"><i class="bi bi-tiktok"></i></a>
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
                        <a href="https://api.whatsapp.com/send?phone=%2B59178778001" target="_blank"><i class="bi bi-whatsapp"></i></a>
                        <a href="https://www.facebook.com/share/1APkp6j1kN/" target="_blank"><i class="bi bi-facebook"></i></a>
                        <a href="https://www.instagram.com/button_camisas?igsh=dTEzZ2k4Y3o3MHBm" target="_blank"><i class="bi bi-instagram"></i></a>
                        <a href="https://www.tiktok.com/@button.camisas.a?_t=ZM-8wzcn5sWRBY&_r=1" target="_blank"><i class="bi bi-tiktok"></i></a>
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

    // Mobile menu toggle
    const menuBtn = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuBtn.setAttribute('aria-expanded', navLinks.classList.contains('active'));
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInside = navLinks.contains(event.target) || menuBtn.contains(event.target);
            if (!isClickInside && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuBtn.setAttribute('aria-expanded', false);
            }
        });

        // Close menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuBtn.setAttribute('aria-expanded', false);
            });
        });
    }
}); 
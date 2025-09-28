// ================================
// MENÚ MÓVIL
// ================================
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector(".mobile-menu-btn"); // nombre correcto
  const navLinks = document.querySelector(".nav-links");

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });

    // Cerrar el menú al hacer clic en un enlace
    document.querySelectorAll(".nav-links a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
      });
    });

    // Cerrar al hacer clic fuera del menú
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".nav-links") && !e.target.closest(".mobile-menu-btn")) {
        navLinks.classList.remove("active");
      }
    });
  }
});

// ================================
// CARRUSEL
// ================================
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".carousel-slide");
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");
  const dots = document.querySelectorAll(".dot");
  let currentIndex = 0;

  if (slides.length > 0) {
    function updateCarousel() {
      slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === currentIndex);
        if (dots[i]) dots[i].classList.toggle("active", i === currentIndex);
      });
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % slides.length;
      updateCarousel();
    }

    function prevSlide() {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateCarousel();
    }

    // Eventos flechas
    if (nextBtn) nextBtn.addEventListener("click", nextSlide);
    if (prevBtn) prevBtn.addEventListener("click", prevSlide);

    // Eventos puntos
    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        currentIndex = i;
        updateCarousel();
      });
    });

    // Cambio automático cada 5s
    setInterval(nextSlide, 5000);

    updateCarousel();
  }
});

document.addEventListener("DOMContentLoaded", function() {
  const header = document.querySelector(".main-header");
  const navLinks = document.querySelectorAll(".nav-link");
  const contentSections = document.querySelectorAll(".content-section");
  const typingLogo = document.getElementById("typing-logo");
  const themeToggle = document.getElementById("theme-toggle");
  const form = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  // --- AOS Animations mejorado
  AOS.init({
    duration: 1000,
    easing: "ease-out-cubic",
    once: true,
    offset: 100
  });

  // --- Typing Effect
  const text = "AGUSTÍN FLORES";
  let i = 0;
  function typing() {
    if (i < text.length) {
      typingLogo.textContent += text.charAt(i);
      i++;
      setTimeout(typing, 150);
    }
  }
  typing();

  // --- Navegación entre secciones
  function showSection(targetId) {
    contentSections.forEach(section => {
      section.classList.toggle("active", "#" + section.id === targetId);
    });
  }

  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (href.startsWith("#") && href !== "#") {
      link.addEventListener("click", function(event) {
        event.preventDefault();
        showSection(href);
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  });

  showSection("#sobre-mi");

  // --- Scroll header effect
  window.addEventListener("scroll", function() {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // --- Dark/Light mode
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");
    themeToggle.innerHTML = document.body.classList.contains("light")
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
  });

  // --- EmailJS Init
  emailjs.init("YOUR_USER_ID"); // ⚡ reemplaza con tu User ID de EmailJS

  form.addEventListener("submit", function(event) {
    event.preventDefault();
    formStatus.textContent = "Enviando...";
    emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", form)
      .then(() => {
        formStatus.textContent = "Mensaje enviado con éxito ✅";
        form.reset();
      }, (err) => {
        formStatus.textContent = "Error al enviar ❌";
        console.error(err);
      });
  });
});

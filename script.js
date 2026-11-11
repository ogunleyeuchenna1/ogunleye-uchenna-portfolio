document.documentElement.classList.add("js");

const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");

function closeMenu() {
  if (!menuToggle || !primaryNav) return;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
  primaryNav.classList.remove("is-open");
}

if (menuToggle && primaryNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    primaryNav.classList.toggle("is-open", !isOpen);
  });

  primaryNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

const contactForm = document.querySelector("#contact-form");
if (contactForm) {
  const phoneInput = contactForm.querySelector("#sender-phone");
  const messageInput = contactForm.querySelector("#sender-message");
  const whatsappText = contactForm.querySelector("#whatsapp-text");

  contactForm.addEventListener("submit", (event) => {
    phoneInput.value = phoneInput.value.trim();
    messageInput.value = messageInput.value.trim();
    whatsappText.value = "";

    if (!phoneInput.value || !messageInput.value) {
      event.preventDefault();
      contactForm.reportValidity();
      return;
    }

    whatsappText.value = `Hi Uchenna, my phone number is ${phoneInput.value}.\n\n${messageInput.value}`;
  });
}

const year = document.querySelector("#current-year");
if (year) year.textContent = String(new Date().getFullYear());

const revealItems = document.querySelectorAll("[data-reveal]");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

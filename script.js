document.documentElement.classList.add("js");

const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("#site-nav");

if (toggle && nav) {
  const closeMenu = (restoreFocus = false) => {
    document.body.classList.remove("menu-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Відкрити меню");
    if (restoreFocus) toggle.focus();
  };

  toggle.addEventListener("click", () => {
    const open = document.body.classList.toggle("menu-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Закрити меню" : "Відкрити меню");
  });

  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && document.body.classList.contains("menu-open")) {
      closeMenu(true);
    }
  });

  document.addEventListener("click", (event) => {
    if (document.body.classList.contains("menu-open") && !event.target.closest(".site-header")) {
      closeMenu();
    }
  });

  document.addEventListener("focusin", (event) => {
    if (document.body.classList.contains("menu-open") && !event.target.closest(".site-header")) {
      closeMenu();
    }
  });

  const desktop = window.matchMedia("(min-width: 951px)");
  if (desktop.addEventListener) {
    desktop.addEventListener("change", () => closeMenu());
  } else {
    desktop.addListener(() => closeMenu());
  }
}

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const sections = document.querySelectorAll(
    ".section-head, .service-card, .about-copy, .contact-copy, .location-card, .audience-grid, .process-card, .related-inner"
  );
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -24px 0px" });

  sections.forEach((section) => {
    section.classList.add("reveal");
    revealObserver.observe(section);
  });
}

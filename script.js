// ===== Mobile Navigation =====
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");
        menuBtn.setAttribute("aria-expanded", String(isOpen));
        menuBtn.textContent = isOpen ? "✕" : "☰";
    });

    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            menuBtn.setAttribute("aria-expanded", "false");
            menuBtn.textContent = "☰";
        });
    });

    document.addEventListener("click", event => {
        if (!navLinks.contains(event.target) && !menuBtn.contains(event.target)) {
            navLinks.classList.remove("open");
            menuBtn.setAttribute("aria-expanded", "false");
            menuBtn.textContent = "☰";
        }
    });
}

// ===== Scroll Reveal =====
const revealElements = document.querySelectorAll(".section:not(.hero)");
if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });

    revealElements.forEach(element => {
        element.classList.add("reveal");
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach(element => element.classList.add("show"));
}

// ===== Active Navigation =====
const sections = document.querySelectorAll("main section[id]");
const navItems = navLinks ? navLinks.querySelectorAll("a") : [];
if ("IntersectionObserver" in window && navItems.length) {
    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navItems.forEach(link => {
                    const active = link.getAttribute("href") === `#${entry.target.id}`;
                    link.classList.toggle("active", active);
                });
            }
        });
    }, { rootMargin: "-25% 0px -60% 0px" });
    sections.forEach(section => sectionObserver.observe(section));
}

// ===== Back To Top =====
const toTop = document.getElementById("toTop");
if (toTop) {
    window.addEventListener("scroll", () => {
        toTop.classList.toggle("visible", window.scrollY > 400);
    }, { passive: true });
    toTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// ===== Subtle Project Card Tilt (desktop pointer only) =====
if (window.matchMedia("(hover: hover) and (pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(".project-card").forEach(card => {
        card.addEventListener("pointermove", event => {
            const rect = card.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `perspective(900px) rotateX(${(-y * 3).toFixed(2)}deg) rotateY(${(x * 3).toFixed(2)}deg) translateY(-5px)`;
        });
        card.addEventListener("pointerleave", () => { card.style.transform = ""; });
    });
}

// ===== Footer Year =====
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

(() => {
  "use strict";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Nav: border on scroll ---------- */
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  const burger = document.getElementById("burger");
  const menu = document.getElementById("mobileMenu");

  const closeMenu = () => {
    burger.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Open menu");
    menu.hidden = true;
  };

  burger.addEventListener("click", () => {
    const open = menu.hidden;
    burger.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menu.hidden = !open;
  });

  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
  window.addEventListener("resize", () => {
    if (window.innerWidth > 880) closeMenu();
  });

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("in"));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  }

  /* ---------- Stat counters ---------- */
  const counters = document.querySelectorAll(".count");

  const renderCount = (el, value) => {
    const prefix = el.dataset.prefix || "";
    const suffix = el.dataset.suffix || "";
    el.innerHTML = prefix + value.toLocaleString("en-US") + suffix;
  };

  const animateCount = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1400;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      renderCount(el, Math.round(target * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if (reducedMotion || !("IntersectionObserver" in window)) {
    counters.forEach((el) => renderCount(el, parseInt(el.dataset.target, 10)));
  } else {
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            cio.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((el) => cio.observe(el));
  }

  /* ---------- Hero room palette switcher ---------- */
  const room = document.getElementById("room");
  const palButtons = document.querySelectorAll(".pal-btn");
  palButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      room.dataset.palette = btn.dataset.palette;
      palButtons.forEach((b) => {
        const on = b === btn;
        b.classList.toggle("active", on);
        b.setAttribute("aria-pressed", String(on));
      });
    });
  });

  /* ---------- Pricing toggle ---------- */
  const btnMonthly = document.getElementById("btnMonthly");
  const btnAnnual = document.getElementById("btnAnnual");

  const setBilling = (period) => {
    const annual = period === "a";
    btnAnnual.classList.toggle("active", annual);
    btnMonthly.classList.toggle("active", !annual);
    btnAnnual.setAttribute("aria-pressed", String(annual));
    btnMonthly.setAttribute("aria-pressed", String(!annual));
    document.querySelectorAll(".plan-price .amount").forEach((el) => {
      el.textContent = "$" + el.dataset[period];
    });
    document.querySelectorAll(".plan-billed").forEach((el) => {
      el.textContent = el.dataset[period];
    });
  };

  btnMonthly.addEventListener("click", () => setBilling("m"));
  btnAnnual.addEventListener("click", () => setBilling("a"));

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll(".faq-item").forEach((item) => {
    const btn = item.querySelector(".faq-q");
    const panel = item.querySelector(".faq-a");
    btn.addEventListener("click", () => {
      const open = panel.hidden;
      document.querySelectorAll(".faq-item.open").forEach((other) => {
        if (other === item) return;
        other.classList.remove("open");
        other.querySelector(".faq-a").hidden = true;
        other.querySelector(".faq-q").setAttribute("aria-expanded", "false");
      });
      item.classList.toggle("open", open);
      panel.hidden = !open;
      btn.setAttribute("aria-expanded", String(open));
    });
  });

  /* ---------- Footer year ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();
})();

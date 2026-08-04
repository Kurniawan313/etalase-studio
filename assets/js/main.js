/* ==========================================================================
   MAIN.JS — navigasi, reveal, scramble, counter, form
   Menghormati prefers-reduced-motion.
   ========================================================================== */
(function () {
  "use strict";
  const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Drawer seluler ---------- */
  const burger = document.getElementById("burger");
  const drawer = document.getElementById("drawer");
  if (burger && drawer) {
    const toggle = (open) => {
      drawer.classList.toggle("open", open);
      document.body.classList.toggle("drawer-open", open);
      burger.setAttribute("aria-expanded", open);
      burger.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
    };
    burger.addEventListener("click", () => toggle(!drawer.classList.contains("open")));
    drawer.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => toggle(false)));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") toggle(false); });
  }

  /* ---------- Bayangan header saat scroll ---------- */
  const header = document.querySelector(".site-header");
  addEventListener("scroll", () => header && header.classList.toggle("scrolled", scrollY > 8), { passive: true });

  /* ---------- Kembali ke atas ---------- */
  const toTop = document.getElementById("to-top");
  toTop && toTop.addEventListener("click", () => scrollTo({ top: 0, behavior: REDUCED ? "auto" : "smooth" }));

  /* ---------- Scramble decode ---------- */
  function scramble(el) {
    const final = el.textContent;
    const glyphs = "ABCDEFGHKMNPRSTUVWXYZ#%&/0123456789";
    let frame = 0;
    const total = final.length * 3 + 12;
    (function tick() {
      let out = "";
      for (let i = 0; i < final.length; i++) {
        if (final[i] === " ") { out += " "; continue; }
        out += frame > i * 3 + 9 ? final[i] : glyphs[(Math.random() * glyphs.length) | 0];
      }
      el.textContent = out;
      if (++frame < total) requestAnimationFrame(tick); else el.textContent = final;
    })();
  }

  /* ---------- Counter naik ---------- */
  function countUp(el) {
    const target = parseFloat(el.dataset.count);
    const dec = +(el.dataset.dec || 0);
    const suffix = el.dataset.suffix || "";
    if (REDUCED) { el.textContent = target.toFixed(dec).replace(".", ",") + suffix; return; }
    const start = performance.now(), dur = 1400;
    (function step(now) {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(dec).replace(".", ",") + suffix;
      if (p < 1) requestAnimationFrame(step);
    })(start);
  }

  /* ---------- Reveal on scroll ---------- */
  const watch = document.querySelectorAll(".reveal, [data-count], [data-scramble]");
  if (REDUCED) {
    watch.forEach((el) => {
      el.classList.add("in");
      if (el.hasAttribute("data-count")) countUp(el);
    });
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target;
        el.classList.add("in");
        if (el.hasAttribute("data-count")) countUp(el);
        if (el.hasAttribute("data-scramble")) scramble(el);
        io.unobserve(el);
      });
    }, { threshold: 0.18, rootMargin: "0px 0px -6% 0px" });
    watch.forEach((el) => io.observe(el));
  }

  /* ---------- Form newsletter (dummy) ---------- */
  document.querySelectorAll(".fake-form").forEach((f) =>
    f.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = f.querySelector("input");
      if (!input.checkValidity()) { input.reportValidity(); return; }
      f.innerHTML = '<p class="mono" style="color:#F0B294">✓ TERIMA KASIH! CEK EMAILMU.</p>';
    })
  );

  /* ---------- Form kontak (validasi) ---------- */
  const form = document.getElementById("contact-form");
  if (form) form.addEventListener("submit", (e) => {
    e.preventDefault();
    let ok = true;
    form.querySelectorAll("[required]").forEach((input) => {
      const err = input.closest(".field")?.querySelector(".err");
      let msg = "";
      if (!input.value.trim()) msg = "Wajib diisi ya.";
      else if (input.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) msg = "Format email belum benar.";
      else if (input.type === "tel" && !/^[0-9+\-\s]{9,}$/.test(input.value)) msg = "Nomor belum valid.";
      input.classList.toggle("invalid", !!msg);
      if (err) err.textContent = msg;
      if (msg) ok = false;
    });
    if (!ok) return;
    /* Produksi: kirim ke Formspree / backend / WA API di sini. */
    form.reset();
    form.querySelectorAll(".err").forEach((el) => (el.textContent = ""));
    document.getElementById("form-success").hidden = false;
  });
})();

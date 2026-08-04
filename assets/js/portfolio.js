/* ==========================================================================
   PORTFOLIO.JS — render kartu dari projects.js + pencarian + filter kategori
   Mendukung URL ?cat=website|aplikasi|ebook (dipakai link dari Beranda).
   ========================================================================== */
(function () {
  "use strict";
  const grid = document.getElementById("project-grid");
  if (!grid || typeof PROJECTS === "undefined") return;

  const chipBar = document.getElementById("chip-bar");
  const searchInput = document.getElementById("search-input");
  const countEl = document.getElementById("result-count");
  const emptyEl = document.getElementById("empty-state");
  const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const state = {
    cat: new URLSearchParams(location.search).get("cat") || "semua",
    q: ""
  };

  /* ---- Chips kategori (dibangun otomatis dari data) ---- */
  const cats = ["semua", ...new Set(PROJECTS.map((p) => p.cat))];
  chipBar.innerHTML = cats.map((c) =>
    `<button class="chip${c === state.cat ? " chip-on" : ""}" data-cat="${c}" aria-pressed="${c === state.cat}">${c === "semua" ? "Semua" : CAT_LABEL[c]}</button>`
  ).join("");

  /* ---- Template kartu ---- */
  const cardHTML = (p, i) => `
    <article class="p-card" style="--i:${REDUCED ? 0 : i}">
      <a class="p-media" href="${p.slug}" aria-label="Lihat detail ${p.title}">
        <img src="https://picsum.photos/seed/${p.img}/800/600" width="800" height="600"
             alt="Tampilan ${p.title}" loading="lazy" decoding="async">
        <span class="p-cat tag t-${p.cat}">${CAT_LABEL[p.cat]}</span>
      </a>
      <div class="p-body">
        <h3><a href="${p.slug}">${p.title}</a></h3>
        <p>${p.desc}</p>
        <ul class="p-tech" aria-label="Teknologi">${p.tech.map((t) => `<li>${t}</li>`).join("")}</ul>
        <div class="p-actions">
          <a class="btn btn-sm btn-ghost" href="#" target="_blank" rel="noopener">Live Demo ↗</a>
          <a class="btn btn-sm btn-ghost" href="${p.slug}">Detail</a>
          <a class="btn btn-sm btn-solid" href="${waLink(`Halo, saya tertarik dengan "${p.title}" (${CAT_LABEL[p.cat]}). Boleh info lebih lanjut?`)}" target="_blank" rel="noopener">Pesan</a>
        </div>
      </div>
    </article>`;

  /* ---- Render + filter ---- */
  function render() {
    const q = state.q.trim().toLowerCase();
    const list = PROJECTS.filter((p) => {
      const matchCat = state.cat === "semua" || p.cat === state.cat;
      const hay = (p.title + " " + p.desc + " " + p.tech.join(" ")).toLowerCase();
      return matchCat && (!q || hay.includes(q));
    });
    grid.innerHTML = list.map(cardHTML).join("");
    emptyEl.hidden = list.length > 0;
    countEl.textContent = list.length
      ? `Menampilkan ${list.length} dari ${PROJECTS.length} karya`
      : "Tidak ada karya yang cocok";
  }

  /* ---- Event ---- */
  chipBar.addEventListener("click", (e) => {
    const btn = e.target.closest(".chip");
    if (!btn) return;
    state.cat = btn.dataset.cat;
    chipBar.querySelectorAll(".chip").forEach((c) => {
      const on = c === btn;
      c.classList.toggle("chip-on", on);
      c.setAttribute("aria-pressed", on);
    });
    render();
  });

  let timer;
  searchInput.addEventListener("input", () => {
    clearTimeout(timer);
    timer = setTimeout(() => { state.q = searchInput.value; render(); }, 160);
  });

  render();
})();

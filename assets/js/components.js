/* ==========================================================================
   KOMPONEN PAKAI-ULANG : header & footer dirender sekali di sini.
   ★ Ganti WA_NUMBER di bawah → semua tombol "Pesan/Chat" ikut berubah.
   ========================================================================== */
const WA_NUMBER = "6281234567890"; // ← ganti dengan nomor WhatsApp-mu
const waLink = (text) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text || "Halo Etalase Studio, saya mau bertanya.")}`;

const NAV = [
  ["Beranda", "index.html"], ["Portofolio", "portfolio.html"],
  ["Layanan", "layanan.html"], ["Blog", "blog.html"],
  ["Tentang", "tentang.html"], ["Kontak", "kontak.html"]
];

(function renderChrome() {
  const page = document.body.dataset.page || "index.html";
  const isActive = (href) => href === page || (href === "portfolio.html" && page === "project-detail.html");

  /* ---- Header ---- */
  const navLinks = NAV.map(([label, href]) =>
    `<li><a href="${href}"${isActive(href) ? ' class="active" aria-current="page"' : ""}>${label}</a></li>`
  ).join("");
  const drawerLinks = NAV.map(([label, href], i) =>
    `<a href="${href}">${label}<span class="n">0${i + 1}</span></a>`
  ).join("");

  document.getElementById("site-header").innerHTML = `
    <div class="topbar">
      <span>✶ Melayani seluruh Indonesia & luar negeri</span>
      <a href="${waLink()}" target="_blank" rel="noopener">Chat WhatsApp ↗</a>
    </div>
    <header class="site-header" id="site-header-in">
      <div class="container header-in">
        <a class="logo" href="index.html" aria-label="Etalase Studio — beranda"><span class="star">✶</span>Etalase<sup>STUDIO</sup></a>
        <nav aria-label="Navigasi utama"><ul class="nav-desktop">${navLinks}</ul></nav>
        <div class="header-actions">
          <a class="btn btn-solid btn-sm header-cta" href="kontak.html">Pesan Jasa</a>
          <button class="burger" id="burger" aria-expanded="false" aria-controls="drawer" aria-label="Buka menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>
    <nav class="drawer" id="drawer" aria-label="Menu seluler">
      ${drawerLinks}
      <div class="drawer-foot">
        <a class="btn btn-accent" href="${waLink()}" target="_blank" rel="noopener">WhatsApp ↗</a>
        <span class="mono">Yogyakarta · Indonesia</span>
      </div>
    </nav>`;

  /* ---- Footer ---- */
  document.getElementById("site-footer").innerHTML = `
    <footer class="site-footer">
      <div class="container">
        <div class="f-grid">
          <div class="f-brand">
            <a class="logo" href="index.html" style="color:var(--paper)"><span class="star">✶</span>Etalase<sup style="color:#8E8574">STUDIO</sup></a>
            <p>Etalase karya digital untuk UMKM naik kelas: template website, aplikasi bisnis, dan ebook — siap pakai, mudah dikustom.</p>
            <div class="f-social">
              <a href="#" rel="noopener">IG</a><a href="#" rel="noopener">TikTok</a><a href="#" rel="noopener">YT</a><a href="#" rel="noopener">LI</a>
            </div>
          </div>
          <div class="f-col"><h3>Halaman</h3>${NAV.map(([l, h]) => `<a href="${h}">${l}</a>`).join("")}</div>
          <div class="f-col"><h3>Layanan</h3>
            <a href="layanan.html">Template Website</a><a href="layanan.html">Aplikasi Bisnis</a>
            <a href="portfolio.html?cat=ebook">Ebook Digital</a><a href="layanan.html">Perawatan Situs</a>
          </div>
          <div class="f-col"><h3>Kontak</h3>
            <a href="${waLink()}" target="_blank" rel="noopener">WhatsApp ↗</a>
            <a href="mailto:halo@etalasestudio.id">halo@etalasestudio.id</a>
            <a href="kontak.html">Yogyakarta, Indonesia</a>
            <a href="kontak.html">Senin–Sabtu · 09.00–21.00 WIB</a>
          </div>
        </div>
        <div class="f-news">
          <div><h3>Kabar rilis template & diskon ebook</h3><p>Sebulan sekali, tanpa spam.</p></div>
          <form class="fake-form">
            <label class="visually-hidden" for="f-foot-email">Email</label>
            <input type="email" id="f-foot-email" placeholder="email@kamu.com" required style="border:1.5px solid #4A4234;border-radius:999px;padding:.75rem 1.2rem;background:var(--dark-2);color:var(--paper);min-width:210px">
            <button class="btn btn-accent" type="submit">Ikut</button>
          </form>
        </div>
        <div class="f-bottom">
          <span>© <span id="year"></span> Etalase Studio · Dibuat di Indonesia 🇮🇩</span>
          <button class="to-top" id="to-top" aria-label="Kembali ke atas">↑</button>
        </div>
      </div>
    </footer>`;

  document.getElementById("year").textContent = new Date().getFullYear();

  /* Tombol .js-wa : isi href WhatsApp otomatis dari data-wa */
  document.querySelectorAll(".js-wa").forEach((el) => {
    el.href = waLink(el.dataset.wa);
    el.target = "_blank";
    el.rel = "noopener";
  });
})();

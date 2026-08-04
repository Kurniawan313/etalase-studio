/* ==========================================================================
   SUMBER DATA TUNGGAL KARYA
   Menambah karya baru = menambah satu objek di bawah ini.
   `slug` menunjuk ke halaman detail (duplikasi project-detail.html per karya).
   ========================================================================== */
const CAT_LABEL = { website: "Website", aplikasi: "Aplikasi", ebook: "Ebook" };

const PROJECTS = [
  {
    slug: "project-detail.html", title: "Warungku POS", cat: "aplikasi",
    desc: "Aplikasi kasir & laporan penjualan harian untuk warung dan kedai, dengan mode offline-first dan kirim struk via WhatsApp.",
    tech: ["Flutter", "Firebase", "SQLite"], img: "kasir-pos"
  },
  {
    slug: "project-detail.html", title: "Kedai Kopi Senja", cat: "website",
    desc: "Company profile + menu digital dan tombol pesan langsung via WhatsApp untuk roastery kopi lokal.",
    tech: ["HTML5", "CSS3", "JavaScript"], img: "kedai-kopi"
  },
  {
    slug: "project-detail.html", title: "Batik Larasati", cat: "website",
    desc: "Toko online batik dengan katalog motif, keranjang belanja, dan integrasi pembayaran Midtrans.",
    tech: ["WordPress", "WooCommerce", "Midtrans"], img: "batik-store"
  },
  {
    slug: "project-detail.html", title: "LaundryKu", cat: "aplikasi",
    desc: "Manajemen order laundry: tracking status cucian, notifikasi otomatis ke pelanggan, dan laporan bulanan.",
    tech: ["Laravel", "MySQL", "WA API"], img: "laundry-app"
  },
  {
    slug: "project-detail.html", title: "Undangan Selametan", cat: "website",
    desc: "Template undangan digital interaktif: countdown acara, peta lokasi, konfirmasi kehadiran, amplop digital.",
    tech: ["HTML5", "JavaScript", "GSAP"], img: "undangan-digital"
  },
  {
    slug: "project-detail.html", title: "StokKita", cat: "aplikasi",
    desc: "Pencatatan stok barang masuk-keluar untuk toko kelontong, lengkap dengan scan barcode dan stok minimum.",
    tech: ["React Native", "SQLite"], img: "stok-app"
  },
  {
    slug: "project-detail.html", title: "Ebook: UMKM Go Digital", cat: "ebook",
    desc: "Panduan 120 halaman memindahkan bisnis ke ranah digital — peta jalan 90 hari lengkap dengan checklist.",
    tech: ["PDF", "120 hlm", "Bonus checklist"], img: "ebook-godigital"
  },
  {
    slug: "project-detail.html", title: "Ebook: Jualan Laris di Marketplace", cat: "ebook",
    desc: "Strategi optimasi toko di Shopee & Tokopedia: foto produk, judul, iklan, sampai kalender promo.",
    tech: ["PDF", "78 hlm"], img: "ebook-marketplace"
  },
  {
    slug: "project-detail.html", title: "Ebook: Resep Konten 30 Hari", cat: "ebook",
    desc: "Kalender + template caption siap posting untuk media sosial UMKM selama sebulan penuh.",
    tech: ["PDF", "Notion", "52 hlm"], img: "ebook-konten"
  }
];

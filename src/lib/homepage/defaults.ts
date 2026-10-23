import { services } from "@/lib/data/services";
import { SECTION_KEYS, type HomepageContent } from "./types";

export const HOMEPAGE_DEFAULTS: HomepageContent = {
  version: 1,
  order: [...SECTION_KEYS],
  hidden: [],
  seo: {
    title: "BJA Logistic — Ekspedisi Spesialis Papua & Indonesia Timur",
    description:
      "BJA Logistic, spesialis ekspedisi Papua & Indonesia Timur (Maluku, NTT, Sulawesi). Mulai Rp 7.000/kg, door to door Jabodetabek, 10+ tahun pengalaman.",
  },
  hero: {
    badge: "#1 Ekspedisi Papua & Indonesia Timur",
    title: "Ekspedisi Papua & Indonesia Timur,",
    titleAccent: "Spesialis Cargo Terpercaya",
    description:
      "Mulai **Rp 7.000/kg** ·  Door to Door Service  ·  Kapal Roro, PELNI & Pesawat",
    image: "/hero-bg.jpg",
    imageAlt: "Pelabuhan cargo Indonesia",
    ctaLabel: "Cek Ongkir via WhatsApp",
    trustBadges: [
      "10+ Tahun Pengalaman",
      "50+ Kota Tujuan",
      "Indomaret & BNI Percaya Kami",
      "98% Tepat Waktu",
    ],
  },
  stats: {
    items: [
      { value: "50+", label: "Kota Tujuan", sub: "Papua, Maluku, NTT, Sulawesi" },
      { value: "10+", label: "Tahun Pengalaman", sub: "Terpercaya & profesional" },
      { value: "50.000+", label: "Pengiriman Sukses", sub: "Setiap tahunnya" },
      { value: "98%", label: "Tepat Waktu", sub: "Tracking real-time" },
    ],
  },
  services: {
    eyebrow: "Layanan Kami",
    title: "Cargo Spesialis",
    titleAccent: "Indonesia Timur",
    subtitle:
      "Spesialis pengiriman ke Papua, Maluku, NTT, dan Sulawesi — dengan armada laut dan darat yang terintegrasi selama 10+ tahun",
    items: services.map((s) => ({
      id: s.id,
      name: s.name,
      description: s.description,
      icon: s.icon,
      href: s.href,
      waService: s.waService,
      highlights: [...s.highlights],
      variant: s.id === "corporate" ? "corporate" : "default",
    })),
  },
  whyUs: {
    eyebrow: "Mengapa BJA?",
    title: "Kenapa Ribuan Pelanggan Percaya Kami",
    subtitle:
      "Bukan sekadar ekspedisi biasa — kami adalah spesialis dengan pengalaman mendalam di wilayah timur Indonesia",
    items: [
      {
        icon: "MapPin",
        title: "Spesialis Papua",
        desc: "Kami memahami betul kondisi geografis, cuaca, dan infrastruktur di Papua & Indonesia Timur — bukan generalis.",
      },
      {
        icon: "Layers",
        title: "Layanan Lengkap",
        desc: "Darat, laut, udara, kendaraan, hingga project logistics — semua tersedia dalam satu atap.",
      },
      {
        icon: "DollarSign",
        title: "Harga Paling Kompetitif",
        desc: "Tarif mulai Rp 6.000/kg tanpa biaya tersembunyi. Jauh lebih hemat dari ekspedisi umum.",
      },
      {
        icon: "Home",
        title: "Door to Door",
        desc: "Layanan antar-jemput langsung dari lokasi Anda di Jabodetabek. Tanpa repot ke terminal.",
      },
      {
        icon: "Globe",
        title: "Jaringan Sangat Luas",
        desc: "Menjangkau 50+ kota termasuk pelosok Papua yang tidak terlayani ekspedisi lain.",
      },
      {
        icon: "ShieldCheck",
        title: "Aman & Tepat Waktu",
        desc: "Tracking real-time, packing kayu tersedia, asuransi pengiriman, dan garansi waktu tiba.",
      },
    ],
  },
  coverage: {
    eyebrow: "Jangkauan Kami",
    title: "Kami Menjangkau Seluruh Indonesia Timur",
    subtitle: "Termasuk daerah pelosok yang tidak terlayani ekspedisi umum lainnya",
    regions: [
      {
        name: "Papua & Papua Barat",
        color: "merah",
        cargoSlug: "papua",
        cities: [
          { name: "Jayapura", slug: "jayapura" },
          { name: "Sorong", slug: "sorong" },
          { name: "Manokwari", slug: "manokwari" },
          { name: "Merauke", slug: "merauke" },
          { name: "Timika", slug: "timika" },
          { name: "Wamena", slug: "wamena" },
          { name: "Nabire", slug: "nabire" },
          { name: "Biak", slug: "biak" },
          { name: "Fakfak", slug: "fakfak" },
          { name: "Raja Ampat", slug: "raja-ampat" },
          { name: "+ semua kab/kota & pelosok Papua", slug: "" },
        ],
      },
      {
        name: "Maluku & Maluku Utara",
        color: "merahTua",
        cargoSlug: "maluku",
        cities: [
          { name: "Ambon", slug: "ambon" },
          { name: "Ternate", slug: "ternate" },
          { name: "Tidore", slug: "tidore" },
          { name: "Tual", slug: "tual" },
          { name: "Saumlaki", slug: "" },
          { name: "Namlea", slug: "" },
          { name: "Masohi", slug: "" },
          { name: "+ semua pulau & kepulauan Maluku", slug: "" },
        ],
      },
      {
        name: "Nusa Tenggara Timur",
        color: "merah",
        cargoSlug: "ntt",
        cities: [
          { name: "Kupang", slug: "kupang" },
          { name: "Ende", slug: "ende" },
          { name: "Maumere", slug: "maumere" },
          { name: "Labuan Bajo", slug: "labuan-bajo" },
          { name: "Waingapu", slug: "" },
          { name: "Atambua", slug: "" },
          { name: "Ruteng", slug: "" },
          { name: "+ semua kab/kota NTT", slug: "" },
        ],
      },
      {
        name: "Sulawesi Tenggara & Sekitarnya",
        color: "merahTua",
        cargoSlug: "sulawesi",
        cities: [
          { name: "Kendari", slug: "kendari" },
          { name: "Baubau", slug: "baubau" },
          { name: "Kolaka", slug: "" },
          { name: "Raha", slug: "" },
          { name: "Pomalaa", slug: "" },
          { name: "+ semua wilayah Sulawesi Tenggara", slug: "" },
        ],
      },
    ],
  },
  gallery: {
    eyebrow: "Galeri",
    title: "Operasional BJA Logistic",
    subtitle:
      "Dari pelabuhan hingga gudang — armada dan fasilitas kami siap melayani pengiriman Anda",
    photos: [
      { src: "/gallery/Galeri-Jasa-Ekspedisi-BJA-Logistic-8.webp", alt: "Operasional ekspedisi BJA Logistic", caption: "Operasional Kami", wide: true },
      { src: "/gallery/Galeri-Jasa-Ekspedisi-BJA-Logistic-21.webp", alt: "Armada pengiriman BJA Logistic", caption: "Armada Kami", wide: false },
      { src: "/gallery/Galeri-Jasa-Ekspedisi-BJA-Logistic-24.webp", alt: "Pengiriman cargo ke Indonesia Timur", caption: "Cargo Laut", wide: false },
      { src: "/gallery/Galeri-Jasa-Ekspedisi-BJA-Logistic-26.webp", alt: "Kegiatan bongkar muat di pelabuhan", caption: "Bongkar Muat", wide: false },
      { src: "/gallery/afesd-2048x1365.webp", alt: "Pengiriman barang BJA Logistic", caption: "Pengiriman", wide: false },
      { src: "/gallery/1fewafd.webp", alt: "Gudang BJA Logistic", caption: "Gudang Kami", wide: true },
      { src: "/gallery/afvsbdbf.webp", alt: "Cargo darat BJA Logistic", caption: "Cargo Darat", wide: false },
      { src: "/gallery/fefref.webp", alt: "Proses pengiriman barang", caption: "Proses Pengiriman", wide: false },
      { src: "/gallery/fvsdfvsvdvfsd.webp", alt: "Operasional logistik BJA", caption: "Logistik", wide: false },
      { src: "/gallery/regfd.webp", alt: "Armada truk BJA Logistic", caption: "Cargo Darat", wide: false },
      { src: "/gallery/sdfvsd.webp", alt: "Kegiatan pengiriman BJA Logistic", caption: "Pengiriman", wide: true },
      { src: "https://assets.bjalogistic.id/blog/2026/09/cedf66fd51280a509025.jpg", alt: "Packing barang", caption: "Ekspedisi", wide: false },
      { src: "https://assets.bjalogistic.id/blog/2026/09/9deeaecf5029e971d36a.jpg", alt: "Container", caption: "Proses Pemuatan di Container", wide: false },
    ],
  },
  clients: {
    eyebrow: "Dipercaya oleh perusahaan-perusahaan terkemuka",
    title: "Klien Corporate Kami",
    logos: [
      { name: "Indomaret", src: "/client/indomaret.webp", width: 160, height: 80 },
      { name: "BNI", src: "/client/bni.webp", width: 160, height: 55 },
      { name: "United Tractors", src: "/client/united-tractor.webp", width: 180, height: 45 },
      { name: "PLN", src: "/client/pln.webp", width: 60, height: 80 },
      { name: "Chandra Asri", src: "/client/cap.webp", width: 180, height: 55 },
      { name: "Synnex Metrodata", src: "/client/synnex.webp", width: 180, height: 55 },
      { name: "Madesa", src: "/client/madesa.webp", width: 160, height: 45 },
      { name: "Sonton", src: "/client/sonton.webp", width: 140, height: 60 },
      { name: "SIGS", src: "/client/sigs.webp", width: 80, height: 55 },
      { name: "Aksara Grafika", src: "/client/aksara.webp", width: 160, height: 60 },
    ],
    footnote: "+ ratusan klien UKM & perorangan lainnya",
  },
  testimonials: {
    eyebrow: "Testimoni",
    title: "Apa Kata Pelanggan Kami",
    subtitle: "Ribuan pelanggan sudah merasakan manfaat layanan kami",
    items: [
      {
        name: "Budi Santoso",
        role: "Owner Toko Material, Jayapura",
        rating: 5,
        text: "Sudah 3 tahun pakai BJA untuk kirim material bangunan dari Surabaya ke Jayapura. Harganya paling murah dibanding yang lain, dan barang selalu dateng tepat waktu. Pelayanan CS juga responsif banget!",
      },
      {
        name: "Dewi Rahayu",
        role: "Distributor FMCG, Sorong",
        rating: 5,
        text: "Kirim 2-3 ton barang tiap bulan via cargo laut BJA. Trackingnya real-time, jadi saya bisa kasih info akurat ke customer saya di Sorong. Highly recommended untuk bisnis yang butuh logistik ke Papua!",
      },
      {
        name: "Hendra Wijaya",
        role: "Pengusaha, Jakarta",
        rating: 5,
        text: "Awalnya ragu kirim mesin industri ke Timika, tapi BJA meyakinkan dengan solusi packing kayu dan asuransi. Alhamdulillah semua aman sampai tujuan. Proses koordinasinya juga mudah via WhatsApp.",
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Pertanyaan yang Sering Ditanyakan",
    items: [
      {
        q: "Apa itu BJA Logistic dan apa spesialisasinya?",
        a: "BJA Logistic adalah perusahaan ekspedisi yang berspesialisasi pada pengiriman cargo ke Papua dan Indonesia Timur, mencakup Maluku, NTT, dan Sulawesi. Kami memiliki pengalaman lebih dari 10 tahun dengan jaringan yang luas termasuk daerah pelosok.",
      },
      {
        q: "Berapa ongkir kirim ke Papua?",
        a: "Ongkir ke Papua mulai dari Rp 7.000/kg untuk cargo laut (min. 100 kg) dan Rp 7.000/kg untuk cargo darat. Harga final tergantung berat, volume, dan rute tujuan. Hubungi kami via WhatsApp untuk harga pasti.",
      },
      {
        q: "Berapa lama pengiriman ke Papua?",
        a: "Cargo laut: 14–20 hari. Cargo darat: 7–14 hari. Cargo udara: 2–4 hari. Waktu dapat bervariasi tergantung jadwal kapal dan kondisi cuaca.",
      },
      {
        q: "Apakah ada layanan door to door?",
        a: "Ya! Kami menyediakan layanan jemput barang langsung dari lokasi Anda di area Jabodetabek dan Surabaya. Antar ke tujuan juga tersedia di beberapa kota.",
      },
      {
        q: "Bagaimana cara tracking pengiriman saya?",
        a: "Anda bisa tracking melalui halaman tracking di website kami menggunakan nomor resi, atau langsung chat ke WhatsApp kami dengan menyebutkan nomor resi. Kami juga akan kirim notifikasi status secara berkala.",
      },
      {
        q: "Apakah ada layanan packing dan asuransi?",
        a: "Ya! Kami menyediakan jasa packing kayu (wooden crate) untuk barang fragile dan berharga, serta asuransi pengiriman untuk ketenangan pikiran Anda. Biaya tambahan berlaku.",
      },
      {
        q: "Apakah bisa kirim motor atau mobil?",
        a: "Ya, kami melayani pengiriman sepeda motor dan mobil ke seluruh Papua dan Indonesia Timur. Hubungi kami untuk survei dan penawaran harga terbaik.",
      },
      {
        q: "Apakah ada harga khusus untuk pengiriman volume besar / corporate?",
        a: "Tentu! Kami memiliki program corporate dengan harga kontrak khusus, diskon volume, dedicated account manager, dan asuransi pengiriman. Hubungi kami untuk diskusi lebih lanjut.",
      },
    ],
  },
  finalCta: {
    badge: "Siap Kirim Sekarang?",
    title: "Konsultasi Gratis,",
    titleAccent: "Harga Langsung Transparan",
    description:
      "Chat WhatsApp kami sekarang — tim kami siap bantu hitung ongkir, konfirmasi jadwal, dan proses pengiriman Anda dalam hitungan menit.",
    waLabel: "Chat WhatsApp Sekarang",
    hours: "Senin – Sabtu, 08.00 – 20.00 WIB  ·  Respon dalam 5 menit",
  },
};

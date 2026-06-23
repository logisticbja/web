import { ongkirGroups, type OngkirRegion } from "./ongkir";

export type RegionSlug = "papua" | "maluku" | "ntt" | "sulawesi";

export interface Testimonial {
  name: string;
  role: string;
  city: string;
  text: string;
  rating: number;
}

export interface FAQ {
  q: string;
  a: string;
}

export interface RegionConfig {
  slug: RegionSlug;
  ongkirRegion: OngkirRegion;
  scheduleRegion: string;
  label: string;
  tagline: string;
  description: string;
  defaultCityValue: string;
  defaultCityLabel: string;
  stats: { label: string; value: string }[];
  testimonials: Testimonial[];
  faqs: FAQ[];
  waText: string;
}

export const regionConfigs: RegionConfig[] = [
  {
    slug: "papua",
    ongkirRegion: "papua",
    scheduleRegion: "Papua",
    label: "Papua",
    tagline: "Cargo ke Papua — Terpercaya, Tepat Waktu",
    description: "Spesialis pengiriman cargo ke seluruh wilayah Papua. Melayani kota besar hingga pedalaman.",
    defaultCityValue: "sorong",
    defaultCityLabel: "Sorong",
    stats: [
      { label: "Estimasi Transit", value: "4–9 hari" },
      { label: "Kota Tujuan", value: "30+ Kota" },
      { label: "Frekuensi Kapal", value: "2x Sebulan" },
    ],
    testimonials: [
      {
        name: "Hendra Kusuma",
        role: "PT Mitra Papua Mandiri",
        city: "Sorong",
        text: "Sudah 2 tahun kirim peralatan berat ke Sorong via BJA. Barang selalu aman, tepat waktu, dan tim CS-nya cepat respons.",
        rating: 5,
      },
      {
        name: "Sari Wahyuni",
        role: "Toko Bangunan Sari",
        city: "Manokwari",
        text: "Cargo rutin tiap bulan ke Manokwari. Harganya bersaing dan tidak pernah ada barang yang rusak selama pengiriman.",
        rating: 5,
      },
      {
        name: "Anton Wibowo",
        role: "Kontraktor Papua Jaya",
        city: "Jayapura",
        text: "BJA jadi andalan kami buat kirim material proyek ke Jayapura. Bisa tracking dan tim lapangannya profesional.",
        rating: 5,
      },
    ],
    faqs: [
      {
        q: "Berapa lama pengiriman cargo dari Jakarta ke Papua?",
        a: "Estimasi transit 4–9 hari tergantung kota tujuan. Sorong dan Manokwari biasanya 4–6 hari, sedangkan kota seperti Merauke dan Wamena bisa 7–9 hari.",
      },
      {
        q: "Apakah BJA melayani pengiriman ke daerah pedalaman Papua?",
        a: "Ya, kami memiliki jaringan connecting agent ke berbagai wilayah pedalaman Papua. Hubungi tim kami untuk konfirmasi ketersediaan rute ke kota tujuan Anda.",
      },
      {
        q: "Berapa minimum berat pengiriman Regular ke Papua?",
        a: "Minimum 100 kg untuk layanan Regular. Untuk kiriman di bawah 100 kg, tersedia layanan Express dengan minimum 10 kg.",
      },
      {
        q: "Apakah bisa kirim barang elektronik atau alat berat ke Papua?",
        a: "Ya, kami berpengalaman menangani barang elektronik, mesin, alat berat, dan material proyek ke Papua dengan penanganan dan packing khusus.",
      },
    ],
    waText: "Halo BJA Logistic, saya ingin tanya ongkir dan jadwal pengiriman cargo ke Papua. Bisa bantu saya?",
  },
  {
    slug: "maluku",
    ongkirRegion: "maluku",
    scheduleRegion: "Maluku",
    label: "Maluku",
    tagline: "Cargo ke Maluku — Aman Sampai Kepulauan",
    description: "Pengiriman cargo ke Ambon, Ternate, dan seluruh kepulauan Maluku dengan jadwal rutin.",
    defaultCityValue: "ambon",
    defaultCityLabel: "Ambon",
    stats: [
      { label: "Estimasi Transit", value: "3–6 hari" },
      { label: "Kota Tujuan", value: "15+ Kota" },
      { label: "Frekuensi Kapal", value: "2x Sebulan" },
    ],
    testimonials: [
      {
        name: "Rahman Latuconsina",
        role: "UD Ambon Makmur",
        city: "Ambon",
        text: "Kirim barang elektronik ke Ambon, tiba dalam kondisi sempurna. Packing-nya sangat aman dan rapi. Sangat puas!",
        rating: 5,
      },
      {
        name: "Leni Soumokil",
        role: "Toko Sembako Leni",
        city: "Ternate",
        text: "Rutin kirim sembako ke Ternate setiap bulan. Harga per kg-nya lebih murah dari ekspedisi lain yang pernah saya coba.",
        rating: 5,
      },
      {
        name: "Dodi Pattiasina",
        role: "CV Maluku Sejahtera",
        city: "Tual",
        text: "Baru 3 bulan pakai BJA, tapi sudah jadi partner cargo utama kami ke Tual dan pulau sekitarnya. Recommended!",
        rating: 5,
      },
    ],
    faqs: [
      {
        q: "Berapa lama pengiriman cargo dari Jakarta ke Ambon?",
        a: "Estimasi transit 3–5 hari untuk Ambon. Untuk kota-kota lain di Maluku seperti Ternate dan Tual, berkisar 4–6 hari.",
      },
      {
        q: "Apakah BJA melayani pengiriman ke pulau-pulau kecil di Maluku?",
        a: "Ya, kami memiliki jaringan ke berbagai pulau di Maluku termasuk Seram, Tanimbar, Bacan, dan sekitarnya melalui connecting agent.",
      },
      {
        q: "Berapa harga cargo ke Maluku per kg?",
        a: "Harga bervariasi tergantung kota tujuan dan layanan yang dipilih. Gunakan kalkulator ongkir di atas untuk cek harga spesifik atau hubungi tim kami.",
      },
      {
        q: "Apakah cargo ke Maluku bisa diasuransikan?",
        a: "Ya, tersedia opsi asuransi pengiriman untuk perlindungan tambahan. Hubungi tim kami untuk info lebih lanjut mengenai biaya dan proses klaimnya.",
      },
    ],
    waText: "Halo BJA Logistic, saya ingin tanya ongkir dan jadwal pengiriman cargo ke Maluku. Bisa bantu saya?",
  },
  {
    slug: "ntt",
    ongkirRegion: "ntt",
    scheduleRegion: "NTT",
    label: "NTT",
    tagline: "Cargo ke NTT — Kupang, Flores & Seluruh NTT",
    description: "Layanan pengiriman cargo ke Nusa Tenggara Timur dengan jadwal kapal mingguan.",
    defaultCityValue: "kupang",
    defaultCityLabel: "Kupang",
    stats: [
      { label: "Estimasi Transit", value: "3–5 hari" },
      { label: "Kota Tujuan", value: "10+ Kota" },
      { label: "Frekuensi Kapal", value: "1x Seminggu" },
    ],
    testimonials: [
      {
        name: "Yohanes Bere",
        role: "UD Flores Indah",
        city: "Kupang",
        text: "Ekspedisi ke NTT yang benar-benar bisa diandalkan. Barang tiba tepat waktu dan kondisi sangat baik.",
        rating: 5,
      },
      {
        name: "Maria Fernandes",
        role: "Toko Elektronik Maria",
        city: "Ende",
        text: "Pertama kali kirim ke Flores via BJA dan langsung repeat order karena hasilnya memuaskan. CS-nya juga ramah.",
        rating: 5,
      },
      {
        name: "Eko Saputra",
        role: "CV Nusa Tenggara Karya",
        city: "Maumere",
        text: "Harga kompetitif, tim CS responsif di WhatsApp, dan barang selalu aman. Jadi pilihan utama kami untuk cargo ke NTT.",
        rating: 5,
      },
    ],
    faqs: [
      {
        q: "Berapa lama pengiriman cargo dari Jakarta ke Kupang?",
        a: "Estimasi transit 3–4 hari untuk Kupang via kapal. Untuk kota di Flores, Timor, atau pulau lainnya bisa 4–6 hari.",
      },
      {
        q: "Apakah BJA melayani pengiriman ke Labuan Bajo dan Flores?",
        a: "Ya, kami melayani Labuan Bajo, Ende, Maumere, dan berbagai kota di Flores serta pulau-pulau NTT lainnya.",
      },
      {
        q: "Apakah bisa kirim kendaraan (motor/mobil) ke NTT?",
        a: "Ya, kami memiliki layanan pengiriman kendaraan ke NTT. Hubungi tim kami untuk detail prosedur, biaya, dan jadwal.",
      },
      {
        q: "Berapa minimum pengiriman ke NTT?",
        a: "Minimum 100 kg untuk layanan Regular. Tersedia juga layanan Express dengan minimum 10 kg untuk kebutuhan mendesak.",
      },
    ],
    waText: "Halo BJA Logistic, saya ingin tanya ongkir dan jadwal pengiriman cargo ke NTT. Bisa bantu saya?",
  },
  {
    slug: "sulawesi",
    ongkirRegion: "sulawesi",
    scheduleRegion: "Sulawesi",
    label: "Sulawesi",
    tagline: "Cargo ke Sulawesi — Makassar & Seluruh Sulawesi",
    description: "Pengiriman cargo ke Makassar, Kendari, Manado, dan seluruh Sulawesi dengan transit tercepat.",
    defaultCityValue: "makassar",
    defaultCityLabel: "Makassar",
    stats: [
      { label: "Estimasi Transit", value: "2–5 hari" },
      { label: "Kota Tujuan", value: "30+ Kota" },
      { label: "Frekuensi Kapal", value: "2x Sebulan" },
    ],
    testimonials: [
      {
        name: "Faisal Rachman",
        role: "PT Makassar Distribusi",
        city: "Makassar",
        text: "Sudah 1 tahun jadi pelanggan BJA Logistic. Pengiriman ke Makassar selalu on time dan tidak pernah ada masalah.",
        rating: 5,
      },
      {
        name: "Dewi Kusuma",
        role: "Toko Material Dewi",
        city: "Kendari",
        text: "Kirim material bangunan ke Kendari dalam jumlah besar, semua aman sampai tujuan. Harganya juga sangat reasonable.",
        rating: 5,
      },
      {
        name: "Rudi Hartono",
        role: "CV Sulawesi Jaya",
        city: "Palu",
        text: "BJA bantu kami kirim kargo ke Palu dengan cepat dan efisien. Tracking-nya juga memudahkan kami monitor barang.",
        rating: 5,
      },
    ],
    faqs: [
      {
        q: "Berapa lama pengiriman cargo dari Jakarta ke Makassar?",
        a: "Estimasi transit 2–3 hari untuk Makassar via kapal. Untuk kota lain di Sulawesi seperti Kendari, Palu, Manado berkisar 3–5 hari.",
      },
      {
        q: "Apakah ada layanan Express ke Sulawesi?",
        a: "Ya, tersedia layanan Express untuk pengiriman prioritas dengan waktu transit lebih cepat. Minimum 10 kg untuk layanan Express.",
      },
      {
        q: "Apakah BJA bisa handle pengiriman proyek skala besar ke Sulawesi?",
        a: "Ya, kami melayani korporat dan proyek skala besar dengan harga kontrak khusus, dedicated team, dan laporan pengiriman. Hubungi kami untuk info corporate.",
      },
      {
        q: "Kota apa saja di Sulawesi yang dilayani BJA?",
        a: "Kami melayani hampir seluruh kota di Sulawesi termasuk Makassar, Kendari, Manado, Palu, Gorontalo, Mamuju, Bitung, dan puluhan kota lainnya.",
      },
    ],
    waText: "Halo BJA Logistic, saya ingin tanya ongkir dan jadwal pengiriman cargo ke Sulawesi. Bisa bantu saya?",
  },
];

export function getRegionConfig(slug: string): RegionConfig | undefined {
  return regionConfigs.find((r) => r.slug === slug);
}

export function getCitiesByRegion(ongkirRegion: OngkirRegion) {
  return ongkirGroups.filter((g) => g.region === ongkirRegion);
}

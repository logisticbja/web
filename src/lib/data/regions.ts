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
    tagline: "Cargo ke Papua — Reguler & Express Sesuai Kota Tujuan",
    description: "Pengiriman cargo dari Jabodetabek dan Surabaya ke berbagai kota di Papua. Tarif, layanan, dan estimasi mengikuti kota tujuan.",
    defaultCityValue: "sorong",
    defaultCityLabel: "Sorong",
    stats: [
      { label: "Minimum", value: "100 kg" },
      { label: "Tujuan", value: "57 Kota" },
      { label: "Layanan", value: "Sesuai Rute" },
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
        a: "Estimasi pengiriman ke Papua berbeda untuk setiap kota dan layanan. Contohnya, Sorong Express sekitar 6–8 hari dan Reguler 15–20 hari. Estimasi dihitung sejak kapal berangkat dari pelabuhan asal. Gunakan kalkulator ongkir atau halaman kota tujuan untuk melihat estimasi rute yang dipilih.",
      },
      {
        q: "Apakah BJA melayani pengiriman ke daerah pedalaman Papua?",
        a: "Ya, kami memiliki jaringan connecting agent ke berbagai wilayah pedalaman Papua. Hubungi tim kami untuk konfirmasi ketersediaan rute ke kota tujuan Anda.",
      },
      {
        q: "Berapa minimum berat pengiriman Regular ke Papua?",
        a: "Minimum pengiriman BJA Logistic adalah 100 kg. Ketentuan ini berlaku untuk layanan Reguler maupun Express yang tersedia pada kota tujuan.",
      },
      {
        q: "Apakah bisa kirim barang elektronik atau alat berat ke Papua?",
        a: "Ya, kami berpengalaman menangani barang elektronik, mesin, alat berat, dan material proyek ke Papua dengan penanganan dan packing khusus.",
      },
    ],
    waText: "Halo BJA Logistic, saya ingin cek ongkir, layanan yang tersedia, dan jadwal kapal terdekat untuk pengiriman cargo ke Papua. Bisa bantu saya?",
  },
  {
    slug: "maluku",
    ongkirRegion: "maluku",
    scheduleRegion: "Maluku",
    label: "Maluku",
    tagline: "Cargo ke Maluku — Pilih Kota, Layanan & Estimasi",
    description: "Pengiriman cargo dari Jabodetabek dan Surabaya ke Ambon, Ternate, Tual, dan berbagai tujuan lain di Maluku. Tarif dan estimasi mengikuti kota serta layanan yang tersedia.",
    defaultCityValue: "ambon",
    defaultCityLabel: "Ambon",
    stats: [
      { label: "Minimum", value: "100 kg" },
      { label: "Tujuan", value: "15 Kota" },
      { label: "Layanan", value: "Sesuai Rute" },
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
        a: "Estimasi pengiriman ke Maluku berbeda untuk setiap kota dan layanan. Ambon Express sekitar 4–5 hari dan Reguler 10–15 hari. Ternate, Tual, dan kota lainnya memiliki estimasi masing-masing. Estimasi dihitung sejak kapal berangkat dari pelabuhan asal.",
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
    waText: "Halo BJA Logistic, saya ingin cek ongkir, layanan yang tersedia, dan jadwal kapal terdekat untuk pengiriman cargo ke Maluku. Bisa bantu saya?",
  },
  {
    slug: "ntt",
    ongkirRegion: "ntt",
    scheduleRegion: "NTT",
    label: "NTT",
    tagline: "Cargo ke NTT — Kupang, Flores & Berbagai Kota Tujuan",
    description: "Pengiriman cargo dari Jabodetabek dan Surabaya ke Kupang, Flores, Sumba, Timor, dan berbagai tujuan lain di NTT. Ketersediaan Reguler atau Express mengikuti kota tujuan.",
    defaultCityValue: "kupang",
    defaultCityLabel: "Kupang",
    stats: [
      { label: "Minimum", value: "100 kg" },
      { label: "Tujuan", value: "22 Kota" },
      { label: "Layanan", value: "Sesuai Rute" },
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
        a: "Estimasi pengiriman ke NTT berbeda untuk setiap kota dan layanan. Untuk Kupang, layanan Reguler memiliki estimasi 8–11 hari. Kota lain seperti Ende, Maumere, Labuan Bajo, atau Sumba memiliki estimasi masing-masing. Estimasi dihitung sejak kapal berangkat dari pelabuhan asal.",
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
        a: "Minimum pengiriman BJA Logistic adalah 100 kg. Ketersediaan layanan Reguler dan Express berbeda untuk setiap kota tujuan.",
      },
    ],
    waText: "Halo BJA Logistic, saya ingin cek ongkir, layanan yang tersedia, dan jadwal kapal terdekat untuk pengiriman cargo ke NTT. Bisa bantu saya?",
  },
  {
    slug: "sulawesi",
    ongkirRegion: "sulawesi",
    scheduleRegion: "Sulawesi",
    label: "Sulawesi",
    tagline: "Cargo ke Sulawesi — Makassar & Banyak Kota Tujuan",
    description: "Pengiriman cargo dari Jabodetabek dan Surabaya ke Makassar, Kendari, Manado, Palu, dan berbagai kota lain di Sulawesi. Tarif dan estimasi mengikuti rute tujuan.",
    defaultCityValue: "makassar",
    defaultCityLabel: "Makassar",
    stats: [
      { label: "Minimum", value: "100 kg" },
      { label: "Tujuan", value: "57 Kota" },
      { label: "Layanan", value: "Sesuai Rute" },
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
        a: "Estimasi pengiriman ke Sulawesi berbeda untuk setiap kota. Makassar Express sekitar 3–4 hari, sedangkan Kendari, Palu, Manado, dan kota lainnya memiliki estimasi masing-masing. Estimasi dihitung sejak kapal berangkat dari pelabuhan asal.",
      },
      {
        q: "Apakah ada layanan Express ke Sulawesi?",
        a: "Ya, layanan Express tersedia untuk berbagai kota di Sulawesi dan umumnya memiliki waktu transit lebih cepat. Minimum pengiriman BJA Logistic adalah 100 kg.",
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
    waText: "Halo BJA Logistic, saya ingin cek ongkir, layanan yang tersedia, dan jadwal kapal terdekat untuk pengiriman cargo ke Sulawesi. Bisa bantu saya?",
  },
];

export function getRegionConfig(slug: string): RegionConfig | undefined {
  return regionConfigs.find((r) => r.slug === slug);
}

export function getCitiesByRegion(ongkirRegion: OngkirRegion) {
  return ongkirGroups.filter((g) => g.region === ongkirRegion);
}

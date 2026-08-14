import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bjalogistic.id",
        pathname: "/wp-content/**",
      },
      {
        protocol: "https",
        hostname: "wgvzgvpqqoluavrwnufi.supabase.co",
        pathname: "/storage/**",
      },
      {
        protocol: "https",
        hostname: "invoice.bjalogistic.id",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "assets.bjalogistic.id",
      },
    ],
  },

  async redirects() {
    return [
      // ─── SERVICE PAGES (URL lama → URL baru) ───
      { source: "/cek-ongkir-cargo-darat", destination: "/layanan/cargo-darat", permanent: true },
      { source: "/ekspedisi-cargo-laut-dengan-kapal-cepat-roro-pelni", destination: "/layanan/cargo-laut", permanent: true },
      { source: "/cargo-udara", destination: "/layanan/cargo-udara", permanent: true },
      { source: "/kirim-motor", destination: "/layanan/kirim-motor", permanent: true },
      { source: "/kirim-mobil", destination: "/layanan/kirim-mobil", permanent: true },

      // ─── /jakarta-Asmat/Agats — dua segmen path, tidak bisa dijadikan halaman ───
      { source: "/jakarta-Asmat/Agats", destination: "/cargo/papua", permanent: true },

      // ─── /ekspedisi-jakarta-* di root (berbeda dari /cek-ongkir-cargo/) ───
      { source: "/ekspedisi-jakarta-Makassar", destination: "/kirim-ke/makassar", permanent: true },
      { source: "/ekspedisi-jakarta-Bone",     destination: "/kirim-ke/bone", permanent: true },
      // ─── Redirect halaman kota lama (/blog/) → halaman /kirim-ke/ yang baru ───
      { source: "/blog/ekspedisi-jakarta-manokwari", destination: "/kirim-ke/manokwari", permanent: true },
      { source: "/blog/ekspedisi-jakarta-ambon",     destination: "/kirim-ke/ambon", permanent: true },
      { source: "/blog/ekspedisi-jakarta-jayapura",  destination: "/kirim-ke/jayapura", permanent: true },
      { source: "/blog/ekspedisi-jakarta-merauke",   destination: "/kirim-ke/merauke", permanent: true },
      { source: "/blog/ekspedisi-jakarta-sorong",    destination: "/kirim-ke/sorong", permanent: true },
      { source: "/blog/ekspedisi-jakarta-kupang",    destination: "/kirim-ke/kupang", permanent: true },
      { source: "/blog/ekspedisi-jakarta-ternate",   destination: "/kirim-ke/ternate", permanent: true },
      { source: "/blog/ekspedisi-jakarta-makassar",  destination: "/kirim-ke/makassar", permanent: true },
      { source: "/blog/ekspedisi-jakarta-manado",    destination: "/kirim-ke/manado", permanent: true },
      { source: "/blog/ekspedisi-jakarta-palu",      destination: "/kirim-ke/palu", permanent: true },
      { source: "/blog/ekspedisi-jakarta-kendari",   destination: "/kirim-ke/kendari", permanent: true },
      { source: "/blog/ekspedisi-jakarta-baubau",    destination: "/kirim-ke/baubau", permanent: true },
      { source: "/blog/ekspedisi-jakarta-bone",      destination: "/kirim-ke/bone", permanent: true },
      { source: "/blog/ekspedisi-jakarta-maros",     destination: "/kirim-ke/maros", permanent: true },
      { source: "/blog/jakarta-fakfak",              destination: "/kirim-ke/fakfak", permanent: true },
      { source: "/blog/jakarta-saumlaki",            destination: "/kirim-ke/saumlaki", permanent: true },

      // ─── /bja/jasa-ekspedisi/* ───
      { source: "/bja/jasa-ekspedisi/jasa-cargo-darat",           destination: "/layanan/cargo-darat", permanent: true },
      { source: "/bja/jasa-ekspedisi/jasa-cargo-laut",            destination: "/layanan/cargo-laut",  permanent: true },
      { source: "/bja/jasa-ekspedisi/jasa-cargo-udara",           destination: "/layanan/cargo-udara", permanent: true },
      { source: "/bja/jasa-ekspedisi/jasa-pengiriman-alat-berat", destination: "/layanan/cargo-laut",  permanent: true },
      { source: "/bja/jasa-ekspedisi/jasa-pengiriman-container",  destination: "/layanan/cargo-laut",  permanent: true },
      { source: "/bja/jasa-ekspedisi/project-logistics",          destination: "/corporate",           permanent: true },
      { source: "/bja/:path*",                                    destination: "/",                    permanent: true },
    ];
  },
};

export default nextConfig;

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
      { source: "/ekspedisi-jakarta-Makassar", destination: "/cargo/sulawesi", permanent: true },
      { source: "/ekspedisi-jakarta-Bone",     destination: "/cargo/sulawesi", permanent: true },
      { source: "/ekspedisi-jakarta-:slug*",   destination: "/cek-ongkir",     permanent: true },

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

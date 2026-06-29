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
      // ─────────────────────────────────────────
      // SERVICE PAGES (URL lama → URL baru)
      // ─────────────────────────────────────────
      { source: "/cek-ongkir-cargo-darat", destination: "/layanan/cargo-darat", permanent: true },
      { source: "/ekspedisi-cargo-laut-dengan-kapal-cepat-roro-pelni", destination: "/layanan/cargo-laut", permanent: true },
      { source: "/cargo-udara", destination: "/layanan/cargo-udara", permanent: true },
      { source: "/kirim-motor", destination: "/layanan/kirim-motor", permanent: true },
      { source: "/kirim-mobil", destination: "/layanan/kirim-mobil", permanent: true },

      // ─────────────────────────────────────────
      // MALUKU — kota dengan halaman /kirim-ke/
      // ─────────────────────────────────────────
      { source: "/jakarta-Ambon",   destination: "/kirim-ke/ambon",   permanent: true },
      { source: "/jakarta-Ternate", destination: "/kirim-ke/ternate", permanent: true },
      { source: "/jakarta-Tidore",  destination: "/kirim-ke/tidore",  permanent: true },
      { source: "/jakarta-Tual",    destination: "/kirim-ke/tual",    permanent: true },

      // Maluku — regional
      { source: "/jakarta-Dabo",      destination: "/cargo/maluku", permanent: true },
      { source: "/jakarta-Masohi",    destination: "/cargo/maluku", permanent: true },
      { source: "/jakarta-Namlea",    destination: "/cargo/maluku", permanent: true },
      { source: "/jakarta-Saumlaki",  destination: "/cargo/maluku", permanent: true },
      { source: "/jakarta-Seram",     destination: "/cargo/maluku", permanent: true },
      { source: "/jakarta-Tanimbar",  destination: "/cargo/maluku", permanent: true },
      { source: "/jakarta-Tiakur",    destination: "/cargo/maluku", permanent: true },
      { source: "/jakarta-Jailolo",   destination: "/cargo/maluku", permanent: true },
      { source: "/jakarta-Tobelo",    destination: "/cargo/maluku", permanent: true },
      { source: "/jakarta-Halmahera", destination: "/cargo/maluku", permanent: true },
      { source: "/jakarta-Bacan",     destination: "/cargo/maluku", permanent: true },

      // ─────────────────────────────────────────
      // PAPUA — kota dengan halaman /kirim-ke/
      // ─────────────────────────────────────────
      { source: "/jakarta-Jayapura",  destination: "/kirim-ke/jayapura",  permanent: true },
      { source: "/jakarta-Sorong",    destination: "/kirim-ke/sorong",    permanent: true },
      { source: "/jakarta-Manokwari", destination: "/kirim-ke/manokwari", permanent: true },
      { source: "/jakarta-Merauke",   destination: "/kirim-ke/merauke",   permanent: true },
      { source: "/jakarta-Mimika",    destination: "/kirim-ke/timika",    permanent: true },
      { source: "/jakarta-Wamena",    destination: "/kirim-ke/wamena",    permanent: true },
      { source: "/jakarta-Nabire",    destination: "/kirim-ke/nabire",    permanent: true },
      { source: "/jakarta-fakfak",    destination: "/kirim-ke/fakfak",    permanent: true },
      // Multi-word city names (dengan spasi)
      { source: "/jakarta-Biak Numfor", destination: "/kirim-ke/biak",      permanent: true },
      { source: "/jakarta-Raja Ampat",  destination: "/kirim-ke/raja-ampat", permanent: true },

      // Papua — regional
      { source: "/jakarta-Deiya",          destination: "/cargo/papua", permanent: true },
      { source: "/jakarta-Dogiyai",        destination: "/cargo/papua", permanent: true },
      { source: "/jakarta-Paniai",         destination: "/cargo/papua", permanent: true },
      { source: "/jakarta-Puncak-Jaya",    destination: "/cargo/papua", permanent: true },
      { source: "/jakarta-Keerom",         destination: "/cargo/papua", permanent: true },
      { source: "/jakarta-Yapen",          destination: "/cargo/papua", permanent: true },
      { source: "/jakarta-Memberamo-Raya", destination: "/cargo/papua", permanent: true },
      { source: "/jakarta-Sarmi",          destination: "/cargo/papua", permanent: true },
      { source: "/jakarta-Supriori",       destination: "/cargo/papua", permanent: true },
      { source: "/jakarta-Waropen",        destination: "/cargo/papua", permanent: true },
      { source: "/jakarta-Jayawijaya",     destination: "/cargo/papua", permanent: true },
      { source: "/jakarta-Mappi",          destination: "/cargo/papua", permanent: true },
      { source: "/jakarta-Yahukimo",       destination: "/cargo/papua", permanent: true },
      { source: "/jakarta-Tolikara",       destination: "/cargo/papua", permanent: true },
      { source: "/jakarta-Sentani",        destination: "/cargo/papua", permanent: true },
      { source: "/jakarta-Serui",          destination: "/cargo/papua", permanent: true },
      { source: "/jakarta-Kaimana",        destination: "/cargo/papua", permanent: true },
      { source: "/jakarta-Bintuni",        destination: "/cargo/papua", permanent: true },
      // Multi-word
      { source: "/jakarta-Boven Digoel",   destination: "/cargo/papua", permanent: true },
      { source: "/jakarta-Lany Jaya",      destination: "/cargo/papua", permanent: true },
      // Slash dalam path (Asmat/Agats)
      { source: "/jakarta-Asmat/Agats",    destination: "/cargo/papua", permanent: true },

      // ─────────────────────────────────────────
      // NTT — kota dengan halaman /kirim-ke/
      // ─────────────────────────────────────────
      { source: "/jakarta-Kupang",       destination: "/kirim-ke/kupang",     permanent: true },
      { source: "/jakarta-Ende",         destination: "/kirim-ke/ende",       permanent: true },
      { source: "/jakarta-Maumere",      destination: "/kirim-ke/maumere",    permanent: true },
      { source: "/jakarta-Labuhan Bajo", destination: "/kirim-ke/labuan-bajo", permanent: true },

      // NTT — regional (Flores, Timor, Sumba, Rote)
      { source: "/jakarta-Lembor",    destination: "/cargo/ntt", permanent: true },
      { source: "/jakarta-Ruteng",    destination: "/cargo/ntt", permanent: true },
      { source: "/jakarta-Borong",    destination: "/cargo/ntt", permanent: true },
      { source: "/jakarta-Bajawa",    destination: "/cargo/ntt", permanent: true },
      { source: "/jakarta-Nagakeo",   destination: "/cargo/ntt", permanent: true },
      { source: "/jakarta-Larantuka", destination: "/cargo/ntt", permanent: true },
      { source: "/jakarta-Andonara",  destination: "/cargo/ntt", permanent: true },
      { source: "/jakarta-Lembata",   destination: "/cargo/ntt", permanent: true },
      { source: "/jakarta-Soe",       destination: "/cargo/ntt", permanent: true },
      { source: "/jakarta-Kefamenanu", destination: "/cargo/ntt", permanent: true },
      { source: "/jakarta-Atambua",   destination: "/cargo/ntt", permanent: true },
      { source: "/jakarta-Malaka",    destination: "/cargo/ntt", permanent: true },
      { source: "/jakarta-Betun",     destination: "/cargo/ntt", permanent: true },
      // Multi-word
      { source: "/jakarta-Sumba Barat Daya", destination: "/cargo/ntt", permanent: true },
      { source: "/jakarta-Sumba Barat",      destination: "/cargo/ntt", permanent: true },
      { source: "/jakarta-Sumba Tengah",     destination: "/cargo/ntt", permanent: true },
      { source: "/jakarta-Sumba Timur",      destination: "/cargo/ntt", permanent: true },
      { source: "/jakarta-Rote Ndao",        destination: "/cargo/ntt", permanent: true },
      { source: "/jakarta-Pulau Sabu",       destination: "/cargo/ntt", permanent: true },
      { source: "/jakarta-Sabu Seba",        destination: "/cargo/ntt", permanent: true },

      // ─────────────────────────────────────────
      // SULAWESI — kota dengan halaman /kirim-ke/
      // ─────────────────────────────────────────
      { source: "/jakarta-Kendari", destination: "/kirim-ke/kendari", permanent: true },
      { source: "/jakarta-Bau-bau", destination: "/kirim-ke/baubau",  permanent: true },

      // Sulawesi — regional
      { source: "/jakarta-Makassar",  destination: "/cargo/sulawesi", permanent: true },
      { source: "/jakarta-Bantaeng",  destination: "/cargo/sulawesi", permanent: true },
      { source: "/jakarta-Barru",     destination: "/cargo/sulawesi", permanent: true },
      { source: "/jakarta-Bone",      destination: "/cargo/sulawesi", permanent: true },
      { source: "/jakarta-Bulukumba", destination: "/cargo/sulawesi", permanent: true },
      { source: "/jakarta-Enrekang",  destination: "/cargo/sulawesi", permanent: true },
      { source: "/jakarta-Gowa",      destination: "/cargo/sulawesi", permanent: true },
      { source: "/jakarta-Jeneponto", destination: "/cargo/sulawesi", permanent: true },
      { source: "/jakarta-Maros",     destination: "/cargo/sulawesi", permanent: true },
      { source: "/jakarta-Palopop",   destination: "/cargo/sulawesi", permanent: true },
      { source: "/jakarta-Pangkep",   destination: "/cargo/sulawesi", permanent: true },
      { source: "/jakarta-Pare-pare", destination: "/cargo/sulawesi", permanent: true },
      { source: "/jakarta-Pinrang",   destination: "/cargo/sulawesi", permanent: true },
      { source: "/jakarta-Rappang",   destination: "/cargo/sulawesi", permanent: true },
      { source: "/jakarta-Rantepao",  destination: "/cargo/sulawesi", permanent: true },
      { source: "/jakarta-Selayar",   destination: "/cargo/sulawesi", permanent: true },
      { source: "/jakarta-Sidrap",    destination: "/cargo/sulawesi", permanent: true },
      { source: "/jakarta-Sinjay",    destination: "/cargo/sulawesi", permanent: true },
      { source: "/jakarta-Siwa",      destination: "/cargo/sulawesi", permanent: true },
      { source: "/jakarta-Soppeng",   destination: "/cargo/sulawesi", permanent: true },
      { source: "/jakarta-Sorowako",  destination: "/cargo/sulawesi", permanent: true },
      { source: "/jakarta-Takalar",   destination: "/cargo/sulawesi", permanent: true },
      { source: "/jakarta-Wajo",      destination: "/cargo/sulawesi", permanent: true },
      { source: "/jakarta-Majene",    destination: "/cargo/sulawesi", permanent: true },
      { source: "/jakarta-Mamuju",    destination: "/cargo/sulawesi", permanent: true },
      { source: "/jakarta-Mamasa",    destination: "/cargo/sulawesi", permanent: true },
      { source: "/jakarta-Palman",    destination: "/cargo/sulawesi", permanent: true },
      { source: "/jakarta-Topoyo",    destination: "/cargo/sulawesi", permanent: true },
      { source: "/jakarta-Ampana",    destination: "/cargo/sulawesi", permanent: true },
      { source: "/jakarta-Buol",      destination: "/cargo/sulawesi", permanent: true },
      { source: "/jakarta-Donggala",  destination: "/cargo/sulawesi", permanent: true },
      { source: "/jakarta-Morowali",  destination: "/cargo/sulawesi", permanent: true },
      { source: "/jakarta-Palu",      destination: "/cargo/sulawesi", permanent: true },
      { source: "/jakarta-Poso",      destination: "/cargo/sulawesi", permanent: true },
      { source: "/jakarta-Gorontalo", destination: "/cargo/sulawesi", permanent: true },
      { source: "/jakarta-Bitung",    destination: "/cargo/sulawesi", permanent: true },
      { source: "/jakarta-Manado",    destination: "/cargo/sulawesi", permanent: true },
      { source: "/jakarta-Tomohon",   destination: "/cargo/sulawesi", permanent: true },
      { source: "/jakarta-Tondano",   destination: "/cargo/sulawesi", permanent: true },
      { source: "/jakarta-Tahunan",   destination: "/cargo/sulawesi", permanent: true },
      // Multi-word
      { source: "/jakarta-Tana Toraja",       destination: "/cargo/sulawesi", permanent: true },
      { source: "/jakarta-Luwu Belopa",       destination: "/cargo/sulawesi", permanent: true },
      { source: "/jakarta-Luwu Timur",        destination: "/cargo/sulawesi", permanent: true },
      { source: "/jakarta-Luwu Utara",        destination: "/cargo/sulawesi", permanent: true },
      { source: "/jakarta-Pasang Kayu",       destination: "/cargo/sulawesi", permanent: true },
      { source: "/jakarta-Banggai Laut",      destination: "/cargo/sulawesi", permanent: true },
      { source: "/jakarta-Banggai Kepulauan", destination: "/cargo/sulawesi", permanent: true },
      { source: "/jakarta-Batul Tolli",       destination: "/cargo/sulawesi", permanent: true },
      { source: "/jakarta-Luwuk Banggai",     destination: "/cargo/sulawesi", permanent: true },
      { source: "/jakarta-Parigi Mountong",   destination: "/cargo/sulawesi", permanent: true },
      { source: "/jakarta-Toli-toli",         destination: "/cargo/sulawesi", permanent: true },
      { source: "/jakarta-Tojo Una-una",      destination: "/cargo/sulawesi", permanent: true },
      { source: "/jakarta-Konawe Selatan",    destination: "/cargo/sulawesi", permanent: true },
      { source: "/jakarta-Kota Mubago",       destination: "/cargo/sulawesi", permanent: true },
      { source: "/jakarta-Bolaang Mongondow", destination: "/cargo/sulawesi", permanent: true },

      // ─────────────────────────────────────────
      // TAMBAHAN BATCH 3 — Varian baru /jakarta-*
      // ─────────────────────────────────────────

      // Hyphenated variants dari kota multi-kata yang punya /kirim-ke/
      { source: "/jakarta-Biak-Numfor", destination: "/kirim-ke/biak",       permanent: true },
      { source: "/jakarta-Raja-Ampat",  destination: "/kirim-ke/raja-ampat", permanent: true },
      { source: "/jakarta-Labuan-Bajo", destination: "/kirim-ke/labuan-bajo", permanent: true },

      // Case/spelling variants
      { source: "/jakarta-Fakfak", destination: "/kirim-ke/fakfak", permanent: true },
      { source: "/jakarta-Baubau", destination: "/kirim-ke/baubau", permanent: true },

      // Kota baru yang belum ada di batch sebelumnya
      { source: "/jakarta-Weda",        destination: "/cargo/maluku",   permanent: true },
      { source: "/jakarta-Asmat",       destination: "/cargo/papua",    permanent: true },
      { source: "/jakarta-Palopo",      destination: "/cargo/sulawesi", permanent: true },
      { source: "/jakarta-Parepare",    destination: "/cargo/sulawesi", permanent: true },
      { source: "/jakarta-Konawe",      destination: "/cargo/sulawesi", permanent: true },
      { source: "/jakarta-Kolaka",      destination: "/cargo/sulawesi", permanent: true },
      { source: "/jakarta-Nagekeo",     destination: "/cargo/ntt",      permanent: true },
      { source: "/jakarta-Sabu-Raijua", destination: "/cargo/ntt",      permanent: true },
      { source: "/jakarta-Seba",        destination: "/cargo/ntt",      permanent: true },

      // ─────────────────────────────────────────
      // CATCH-ALL — Jawa, Yogyakarta, dan kota lain
      // Semua /jakarta-* yang belum ditangkap di atas → /cek-ongkir
      // ─────────────────────────────────────────
      { source: "/jakarta-:slug*", destination: "/cek-ongkir", permanent: true },

      // ─────────────────────────────────────────
      // /ekspedisi-jakarta-* (prefix baru dari batch 3)
      // ─────────────────────────────────────────
      { source: "/ekspedisi-jakarta-Makassar", destination: "/cargo/sulawesi", permanent: true },
      { source: "/ekspedisi-jakarta-Bone",     destination: "/cargo/sulawesi", permanent: true },
      { source: "/ekspedisi-jakarta-:slug*",   destination: "/cek-ongkir",     permanent: true },

      // ─────────────────────────────────────────
      // /cek-ongkir-cargo/ekspedisi-jakarta-* (batch ke-2)
      // Kota dengan halaman /kirim-ke/ → redirect spesifik
      // ─────────────────────────────────────────

      // Maluku — /kirim-ke/
      { source: "/cek-ongkir-cargo/ekspedisi-jakarta-ambon",   destination: "/kirim-ke/ambon",   permanent: true },
      { source: "/cek-ongkir-cargo/ekspedisi-jakarta-tual",    destination: "/kirim-ke/tual",    permanent: true },
      { source: "/cek-ongkir-cargo/ekspedisi-jakarta-ternate", destination: "/kirim-ke/ternate", permanent: true },
      { source: "/cek-ongkir-cargo/ekspedisi-jakarta-tidore",  destination: "/kirim-ke/tidore",  permanent: true },

      // Papua — /kirim-ke/
      { source: "/cek-ongkir-cargo/ekspedisi-jakarta-jayapura",  destination: "/kirim-ke/jayapura",  permanent: true },
      { source: "/cek-ongkir-cargo/ekspedisi-jakarta-sorong",    destination: "/kirim-ke/sorong",    permanent: true },
      { source: "/cek-ongkir-cargo/ekspedisi-jakarta-manokwari", destination: "/kirim-ke/manokwari", permanent: true },
      { source: "/cek-ongkir-cargo/ekspedisi-jakarta-merauke",   destination: "/kirim-ke/merauke",   permanent: true },
      { source: "/cek-ongkir-cargo/ekspedisi-jakarta-mimika",    destination: "/kirim-ke/timika",    permanent: true },
      { source: "/cek-ongkir-cargo/ekspedisi-jakarta-wamena",    destination: "/kirim-ke/wamena",    permanent: true },
      { source: "/cek-ongkir-cargo/ekspedisi-jakarta-nabire",    destination: "/kirim-ke/nabire",    permanent: true },
      { source: "/cek-ongkir-cargo/ekspedisi-jakarta-fak-fak",   destination: "/kirim-ke/fakfak",    permanent: true },
      { source: "/cek-ongkir-cargo/ekspedisi-jakarta-biak-numfor", destination: "/kirim-ke/biak",      permanent: true },
      { source: "/cek-ongkir-cargo/ekspedisi-jakarta-raja-ampat",  destination: "/kirim-ke/raja-ampat", permanent: true },

      // NTT — /kirim-ke/
      { source: "/cek-ongkir-cargo/ekspedisi-jakarta-kupang",      destination: "/kirim-ke/kupang",     permanent: true },
      { source: "/cek-ongkir-cargo/ekspedisi-jakarta-ende",        destination: "/kirim-ke/ende",       permanent: true },
      { source: "/cek-ongkir-cargo/ekspedisi-jakarta-maumere",     destination: "/kirim-ke/maumere",    permanent: true },
      { source: "/cek-ongkir-cargo/ekspedisi-jakarta-labuhan-bajo", destination: "/kirim-ke/labuan-bajo", permanent: true },

      // Catch-all untuk semua /cek-ongkir-cargo/* yang belum tertangkap
      // (kota Jawa + kota regional yang belum ada /kirim-ke/)
      { source: "/cek-ongkir-cargo/:path*", destination: "/cek-ongkir", permanent: true },

      // ─────────────────────────────────────────
      // /bja/jasa-ekspedisi/* (URL lama jasa)
      // ─────────────────────────────────────────
      { source: "/bja/jasa-ekspedisi/jasa-cargo-darat",            destination: "/layanan/cargo-darat", permanent: true },
      { source: "/bja/jasa-ekspedisi/jasa-cargo-laut",             destination: "/layanan/cargo-laut",  permanent: true },
      { source: "/bja/jasa-ekspedisi/jasa-cargo-udara",            destination: "/layanan/cargo-udara", permanent: true },
      { source: "/bja/jasa-ekspedisi/jasa-pengiriman-alat-berat",  destination: "/layanan/cargo-laut",  permanent: true },
      { source: "/bja/jasa-ekspedisi/jasa-pengiriman-container",   destination: "/layanan/cargo-laut",  permanent: true },
      { source: "/bja/jasa-ekspedisi/project-logistics",           destination: "/corporate",           permanent: true },
      // Catch-all untuk URL /bja/* lainnya
      { source: "/bja/:path*", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;

export interface Service {
  id: string;
  name: string;
  description: string;
  priceFrom: string;
  eta: string;
  icon: string;
  href: string;
  waService: string;
  highlights: string[];
}

export const services: Service[] = [
  {
    id: "cargo-laut",
    name: "Cargo Laut",
    description: "Pengiriman via kapal Roro & PELNI, solusi ekonomis untuk barang berat",
    priceFrom: "Rp 6.000/kg",
    eta: "14–20 hari",
    icon: "Ship",
    href: "/layanan/cargo-laut",
    waService: "Cargo Laut",
    highlights: ["Kapal Roro & PELNI", "Cocok untuk barang besar", "Tracking real-time"],
  },
  {
    id: "cargo-darat",
    name: "Cargo Darat",
    description: "Pengiriman via truk armada sendiri, cepat dan fleksibel untuk rute tertentu",
    priceFrom: "Rp 7.000/kg",
    eta: "7–14 hari",
    icon: "Truck",
    href: "/layanan/cargo-darat",
    waService: "Cargo Darat",
    highlights: ["Armada sendiri", "Door to door", "Terpercaya"],
  },
  {
    id: "cargo-udara",
    name: "Cargo Udara",
    description: "Pengiriman via pesawat untuk barang urgent yang butuh tiba cepat",
    priceFrom: "Rp 20.000/kg",
    eta: "2–4 hari",
    icon: "Plane",
    href: "/layanan/cargo-udara",
    waService: "Cargo Udara",
    highlights: ["Paling cepat", "Aman & terlacak", "Cocok untuk urgent"],
  },
  {
    id: "kirim-motor",
    name: "Kirim Motor",
    description: "Layanan khusus pengiriman sepeda motor ke seluruh Papua dan Indonesia Timur",
    priceFrom: "Hubungi kami",
    eta: "Sesuai rute",
    icon: "Bike",
    href: "/layanan/kirim-motor",
    waService: "Kirim Motor",
    highlights: ["Dikemas aman", "Asuransi tersedia", "Door to door"],
  },
  {
    id: "kirim-mobil",
    name: "Kirim Mobil",
    description: "Pengiriman mobil dan kendaraan roda empat dengan armada khusus",
    priceFrom: "Hubungi kami",
    eta: "Sesuai rute",
    icon: "Car",
    href: "/layanan/kirim-mobil",
    waService: "Kirim Mobil",
    highlights: ["Kendaraan aman", "Survey & asuransi", "Full tracking"],
  },
  {
    id: "project-logistics",
    name: "Project Logistics",
    description: "Solusi logistik untuk proyek besar, alat berat, dan kargo B2B skala enterprise",
    priceFrom: "Penawaran khusus",
    eta: "Custom schedule",
    icon: "Package",
    href: "/kontak",
    waService: "Project Logistics",
    highlights: ["Alat berat & industri", "Harga corporate", "Tim dedicated"],
  },
];

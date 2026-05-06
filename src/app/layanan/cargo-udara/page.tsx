import { Metadata } from "next";
import { Plane } from "lucide-react";
import { ServicePageLayout } from "@/components/layout/ServicePageLayout";
import { buildServiceMessage } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Cargo Udara Papua",
  description: "Layanan cargo udara (air freight) paling cepat ke Papua & Indonesia Timur. Tiba 2-4 hari. Cocok untuk pengiriman urgent.",
};

export default function CargoUdaraPage() {
  return (
    <ServicePageLayout
      icon={Plane}
      title="Cargo Udara ke Papua & Indonesia Timur"
      subtitle="Paling Cepat — Untuk Kebutuhan Urgent"
      description="Pengiriman via pesawat komersial — solusi tercepat untuk barang urgent yang harus tiba dalam hitungan hari, bukan minggu."
      priceFrom="Rp 20.000/kg"
      priceNote="Minimum 10 kg · Harga tergantung rute"
      eta="2–4 hari"
      waHref={buildServiceMessage("Cargo Udara")}
      waLabel="Tanya Harga Cargo Udara"
      features={[
        "Via pesawat komersial terjadwal",
        "Paling cepat sampai (2–4 hari)",
        "Cocok untuk barang urgent",
        "Tracking real-time per penerbangan",
        "Kapasitas fleksibel",
        "Layanan express tersedia",
        "Penanganan barang fragile",
        "Koordinasi custom clearance",
      ]}
      details={[
        {
          title: "Penerbangan yang Digunakan",
          desc: "Kami bekerja sama dengan maskapai komersial utama (Garuda, Lion Air, Batik Air, dll) untuk memastikan ketersediaan slot cargo ke seluruh kota di Papua dan Indonesia Timur.",
        },
        {
          title: "Kapan Memilih Cargo Udara?",
          desc: "Pilih cargo udara jika: barang harus tiba dalam 2–4 hari, nilai barang tinggi, barang mudah rusak/kadaluarsa, atau kebutuhan bisnis yang tidak bisa menunggu 2–3 minggu.",
        },
        {
          title: "Jenis Barang yang Dilayani",
          desc: "Dokumen penting, spare parts mesin, obat-obatan, makanan perishable, elektronik, pakaian, dan barang bernilai tinggi lainnya.",
        },
        {
          title: "Proses & Dokumentasi",
          desc: "Kami handle semua proses termasuk packing standar penerbangan, AWB (Air Waybill), dan koordinasi pengambilan di bandara tujuan.",
        },
      ]}
      relatedServices={[
        { name: "Cargo Laut", href: "/layanan/cargo-laut" },
        { name: "Cargo Darat", href: "/layanan/cargo-darat" },
        { name: "Kirim Motor", href: "/layanan/kirim-motor" },
        { name: "Kirim Mobil", href: "/layanan/kirim-mobil" },
      ]}
    />
  );
}

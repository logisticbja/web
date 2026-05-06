import { Metadata } from "next";
import { Ship } from "lucide-react";
import { ServicePageLayout } from "@/components/layout/ServicePageLayout";
import { buildServiceMessage } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Cargo Laut Papua",
  description: "Layanan cargo laut ke Papua, Maluku, NTT dan Sulawesi via kapal Roro & PELNI. Mulai Rp 6.000/kg. Terpercaya dan tepat waktu.",
};

export default function CargoLautPage() {
  return (
    <ServicePageLayout
      icon={Ship}
      title="Cargo Laut ke Papua & Indonesia Timur"
      subtitle="Layanan Unggulan"
      description="Pengiriman cargo via kapal Roro & PELNI — solusi paling hemat dan andal untuk barang berat & besar ke seluruh Papua dan Indonesia Timur."
      priceFrom="Rp 6.000/kg"
      priceNote="Minimum 100 kg · Harga tergantung rute"
      eta="14–20 hari"
      waHref={buildServiceMessage("Cargo Laut")}
      waLabel="Tanya Harga Cargo Laut"
      features={[
        "Kapal Roro & PELNI terpercaya",
        "Cocok untuk barang berat & besar",
        "Harga paling terjangkau",
        "Tracking pengiriman real-time",
        "Packing kayu tersedia",
        "Asuransi pengiriman tersedia",
        "Door to door Jabodetabek & Surabaya",
        "Coverage 50+ kota tujuan",
      ]}
      details={[
        {
          title: "Kapal yang Digunakan",
          desc: "Kami menggunakan armada kapal PELNI (KM Tidar, KM Ciremai, KM Dorolonda, dll) dan kapal Roro berlisensi resmi dengan standar keamanan tinggi.",
        },
        {
          title: "Proses Pengiriman",
          desc: "Barang dijemput atau diserahkan ke gudang kami → proses administrasi & penimbangan → muat ke kapal sesuai jadwal → pengiriman hingga pelabuhan tujuan → antar ke alamat (opsional).",
        },
        {
          title: "Jenis Barang yang Dilayani",
          desc: "Barang dagangan, sembako, material bangunan, elektronik, perabotan, mesin industri, alat pertanian, dan hampir semua jenis kargo umum.",
        },
        {
          title: "Area Jemput (Door to Door)",
          desc: "Layanan penjemputan tersedia di seluruh area Jabodetabek dan Surabaya dan sekitarnya. Hubungi kami untuk informasi penjemputan ke daerah lain.",
        },
        {
          title: "Packing & Keamanan",
          desc: "Barang dikemas dengan standar pengiriman laut. Tersedia layanan packing kayu (wooden crate) untuk barang fragile dengan biaya tambahan.",
        },
      ]}
      relatedServices={[
        { name: "Cargo Darat", href: "/layanan/cargo-darat" },
        { name: "Cargo Udara", href: "/layanan/cargo-udara" },
        { name: "Kirim Motor", href: "/layanan/kirim-motor" },
        { name: "Kirim Mobil", href: "/layanan/kirim-mobil" },
      ]}
    />
  );
}

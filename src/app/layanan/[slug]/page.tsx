import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePageLayout } from "@/components/layout/ServicePageLayout";
import { buildServiceMessage } from "@/lib/whatsapp";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { getServicePage, getAllServicePages, type ServicePageData } from "@/lib/servicePages";
import { getServiceIcon } from "@/lib/serviceIcons";

export const revalidate = 300;

// Fallback hardcoded — dipakai kalau CRM belum sempat diisi / API lagi
// bermasalah, biar 5 halaman awal ini tetap tampil walau database kosong.
// Layanan BARU yang ditambah dari CRM otomatis jalan tanpa perlu masuk ke
// sini — ini cuma jaring pengaman buat yang 5 awal.
const hardcodedServices: Record<string, ServicePageData> = {
  "cargo-laut": {
    title: "Cargo Laut ke Papua & Indonesia Timur",
    slug: "cargo-laut",
    icon: "Ship",
    subtitle: "Layanan Unggulan",
    description: "Pengiriman cargo via kapal Roro & PELNI — solusi paling hemat dan andal untuk barang berat & besar ke seluruh Papua dan Indonesia Timur.",
    priceFrom: "Rp 6.000/kg",
    priceNote: "Minimum 100 kg · Harga tergantung rute",
    eta: "14–20 hari",
    waLabel: "Tanya Harga Cargo Laut",
    features: ["Kapal Roro & PELNI terpercaya", "Cocok untuk barang berat & besar", "Harga paling terjangkau", "Tracking pengiriman real-time", "Packing kayu tersedia", "Asuransi pengiriman tersedia", "Door to door Jabodetabek & Surabaya", "Coverage 50+ kota tujuan"],
    details: [
      { title: "Kapal yang Digunakan", desc: "Kami menggunakan armada kapal PELNI (KM Tidar, KM Ciremai, KM Dorolonda, dll) dan kapal Roro berlisensi resmi dengan standar keamanan tinggi." },
      { title: "Proses Pengiriman", desc: "Barang dijemput atau diserahkan ke gudang kami → proses administrasi & penimbangan → muat ke kapal sesuai jadwal → pengiriman hingga pelabuhan tujuan → antar ke alamat (opsional)." },
      { title: "Jenis Barang yang Dilayani", desc: "Barang dagangan, sembako, material bangunan, elektronik, perabotan, mesin industri, alat pertanian, dan hampir semua jenis kargo umum." },
      { title: "Area Jemput (Door to Door)", desc: "Layanan penjemputan tersedia di seluruh area Jabodetabek dan Surabaya dan sekitarnya. Hubungi kami untuk informasi penjemputan ke daerah lain." },
      { title: "Packing & Keamanan", desc: "Barang dikemas dengan standar pengiriman laut. Tersedia layanan packing kayu (wooden crate) untuk barang fragile dengan biaya tambahan." },
    ],
    relatedServices: [
      { name: "Cargo Darat", href: "/layanan/cargo-darat" },
      { name: "Cargo Udara", href: "/layanan/cargo-udara" },
      { name: "Kirim Motor", href: "/layanan/kirim-motor" },
      { name: "Kirim Mobil", href: "/layanan/kirim-mobil" },
    ],
    metaTitle: "Cargo Laut ke Papua & Indonesia Timur — Mulai Rp 6.000/kg",
    metaDescription: "Jasa cargo laut ke Papua, Maluku, NTT & Sulawesi via kapal Roro & PELNI. Harga mulai Rp 6.000/kg, min. 100 kg, estimasi 14–20 hari. Door to door Jabodetabek. Pesan via WhatsApp.",
  },
  "cargo-darat": {
    title: "Cargo Darat ke Papua & Indonesia Timur",
    slug: "cargo-darat",
    icon: "Truck",
    subtitle: "Seimbang & Fleksibel",
    description: "Pengiriman cargo via armada truk sendiri — pilihan ideal yang menyeimbangkan kecepatan dan harga untuk pengiriman ke Papua dan Indonesia Timur.",
    priceFrom: "Rp 7.000/kg",
    priceNote: "Minimum 100 kg · Harga tergantung rute",
    eta: "7–14 hari",
    waLabel: "Tanya Harga Cargo Darat",
    features: ["Armada truk milik sendiri", "Door to door seluruh Jabodetabek", "Lebih cepat dari cargo laut", "Tracking pengiriman", "Cocok untuk barang menengah", "Flexible pickup schedule", "Driver berpengalaman", "Tersedia packing standar"],
    details: [
      { title: "Armada & Kapasitas", desc: "Armada truk kami mencakup truk box, truk engkel, dan truk besar sesuai kebutuhan. Kapasitas mulai dari 1 ton hingga 20+ ton per pengiriman." },
      { title: "Rute & Cakupan", desc: "Pengiriman darat mencakup rute Jawa–Bali–Lombok, kemudian dilanjutkan via kapal ke Papua dan Indonesia Timur. Kombinasi darat-laut untuk efisiensi optimal." },
      { title: "Keunggulan vs Cargo Laut", desc: "Cargo darat lebih cepat 30–50% dibanding cargo laut untuk rute tertentu. Cocok jika kebutuhan mendesak tapi budget tidak memungkinkan cargo udara." },
      { title: "Jadwal Keberangkatan", desc: "Pengiriman dilakukan setiap minggu sesuai jadwal keberangkatan. Hubungi kami untuk informasi jadwal terdekat dari kota Anda." },
    ],
    relatedServices: [
      { name: "Cargo Laut", href: "/layanan/cargo-laut" },
      { name: "Cargo Udara", href: "/layanan/cargo-udara" },
      { name: "Kirim Motor", href: "/layanan/kirim-motor" },
      { name: "Kirim Mobil", href: "/layanan/kirim-mobil" },
    ],
    metaTitle: "Cargo Darat ke Papua & Indonesia Timur — Mulai Rp 7.000/kg",
    metaDescription: "Jasa cargo darat ke Papua & Indonesia Timur via armada truk. Harga mulai Rp 7.000/kg, estimasi 7–14 hari. Door to door Jabodetabek & Surabaya. Hubungi WhatsApp.",
  },
  "cargo-udara": {
    title: "Cargo Udara ke Papua & Indonesia Timur",
    slug: "cargo-udara",
    icon: "Plane",
    subtitle: "Paling Cepat — Untuk Kebutuhan Urgent",
    description: "Pengiriman via pesawat komersial — solusi tercepat untuk barang urgent yang harus tiba dalam hitungan hari, bukan minggu.",
    priceFrom: "Rp 20.000/kg",
    priceNote: "Minimum 10 kg · Harga tergantung rute",
    eta: "2–4 hari",
    waLabel: "Tanya Harga Cargo Udara",
    features: ["Via pesawat komersial terjadwal", "Paling cepat sampai (2–4 hari)", "Cocok untuk barang urgent", "Tracking real-time per penerbangan", "Kapasitas fleksibel", "Layanan express tersedia", "Penanganan barang fragile", "Koordinasi custom clearance"],
    details: [
      { title: "Penerbangan yang Digunakan", desc: "Kami bekerja sama dengan maskapai komersial utama (Garuda, Lion Air, Batik Air, dll) untuk memastikan ketersediaan slot cargo ke seluruh kota di Papua dan Indonesia Timur." },
      { title: "Kapan Memilih Cargo Udara?", desc: "Pilih cargo udara jika: barang harus tiba dalam 2–4 hari, nilai barang tinggi, barang mudah rusak/kadaluarsa, atau kebutuhan bisnis yang tidak bisa menunggu 2–3 minggu." },
      { title: "Jenis Barang yang Dilayani", desc: "Dokumen penting, spare parts mesin, obat-obatan, makanan perishable, elektronik, pakaian, dan barang bernilai tinggi lainnya." },
      { title: "Proses & Dokumentasi", desc: "Kami handle semua proses termasuk packing standar penerbangan, AWB (Air Waybill), dan koordinasi pengambilan di bandara tujuan." },
    ],
    relatedServices: [
      { name: "Cargo Laut", href: "/layanan/cargo-laut" },
      { name: "Cargo Darat", href: "/layanan/cargo-darat" },
      { name: "Kirim Motor", href: "/layanan/kirim-motor" },
      { name: "Kirim Mobil", href: "/layanan/kirim-mobil" },
    ],
    metaTitle: "Cargo Udara ke Papua — Tiba 2–4 Hari, Paling Cepat",
    metaDescription: "Jasa cargo udara (air freight) tercepat ke Papua & Indonesia Timur. Tiba 2–4 hari via pesawat komersial. Cocok untuk barang urgent & bernilai tinggi. Hubungi BJA Logistic.",
  },
  "kirim-mobil": {
    title: "Kirim Mobil ke Papua & Indonesia Timur",
    slug: "kirim-mobil",
    icon: "Car",
    subtitle: "Pengiriman Kendaraan Roda Empat",
    description: "Layanan khusus pengiriman mobil dan kendaraan roda empat ke Papua dan seluruh Indonesia Timur. Aman, bergaransi, dengan asuransi pengiriman.",
    priceFrom: "Hubungi Kami",
    priceNote: "Harga tergantung jenis & ukuran mobil serta rute",
    eta: "Sesuai rute",
    waLabel: "Tanya Kirim Mobil",
    features: ["Semua jenis mobil dilayani", "Asuransi pengiriman wajib", "Survey & dokumentasi lengkap", "Tracking perjalanan", "Kendaraan terlindungi penuh", "Tim khusus kendaraan", "Foto kondisi sebelum & sesudah", "Pengalaman 10+ tahun"],
    details: [
      { title: "Jenis Kendaraan yang Dilayani", desc: "Sedan, SUV, MPV, pickup, truk kecil, bus kecil, minibus, dan kendaraan niaga. Untuk kendaraan alat berat, silakan lihat layanan Project Logistics." },
      { title: "Proses Pengiriman Mobil", desc: "Survey & foto kondisi mobil → pengurusan dokumen → mobilisasi ke pelabuhan → muat ke kapal Roro/container → pengiriman → serah terima di pelabuhan tujuan." },
      { title: "Keamanan & Asuransi", desc: "Setiap pengiriman mobil dilindungi asuransi transportasi. Survey kondisi dilakukan sebelum dan sesudah pengiriman dengan dokumentasi foto lengkap." },
      { title: "Dokumen yang Dibutuhkan", desc: "STNK kendaraan, KTP pemilik, surat kuasa jika dikuasakan, dan form pengiriman BJA. Pastikan pajak kendaraan masih aktif." },
      { title: "Metode Pengiriman", desc: "Pengiriman mobil umumnya via kapal Roro (Roll-on Roll-off) atau kapal container, tergantung rute dan ketersediaan armada. Hubungi kami untuk detail rute spesifik." },
    ],
    relatedServices: [
      { name: "Kirim Motor", href: "/layanan/kirim-motor" },
      { name: "Cargo Laut", href: "/layanan/cargo-laut" },
      { name: "Project Logistics", href: "/kontak" },
      { name: "Cargo Darat", href: "/layanan/cargo-darat" },
    ],
    metaTitle: "Kirim Mobil ke Papua & Indonesia Timur — Penanganan Khusus",
    metaDescription: "Jasa kirim mobil ke Papua, Maluku, NTT & Sulawesi. Semua jenis kendaraan diterima, asuransi wajib, penanganan profesional. Hubungi BJA Logistic untuk info harga.",
  },
  "kirim-motor": {
    title: "Kirim Motor ke Papua & Indonesia Timur",
    slug: "kirim-motor",
    icon: "Bike",
    subtitle: "Pengiriman Kendaraan Roda Dua",
    description: "Layanan khusus pengiriman sepeda motor yang aman dan terpercaya ke seluruh Papua, Maluku, NTT, dan Sulawesi. Motor Anda aman di tangan kami.",
    priceFrom: "Hubungi Kami",
    priceNote: "Harga tergantung jenis motor & rute tujuan",
    eta: "Sesuai rute",
    waLabel: "Tanya Kirim Motor",
    features: ["Packing standar kendaraan", "Asuransi pengiriman tersedia", "Semua jenis motor dilayani", "Tracking pengiriman", "Door to door tersedia", "Tim berpengalaman", "Survey kondisi motor sebelum kirim", "Dokumentasi foto sebelum & sesudah"],
    details: [
      { title: "Jenis Motor yang Dilayani", desc: "Semua jenis sepeda motor: motor bebek, matic, sport, trail, motor listrik, dan motor besar (moge). Kondisi: bisa berjalan maupun tidak bisa berjalan (dengan biaya tambahan)." },
      { title: "Proses Pengiriman Motor", desc: "Survey kondisi & foto motor → packing aman dengan cover dan pengaman → muat ke kapal/truk → pengiriman ke tujuan → serah terima dengan dokumentasi foto." },
      { title: "Packing & Perlindungan", desc: "Motor dikemas dengan bubble wrap, cover khusus, dan pengaman tambahan untuk menghindari goresan dan kerusakan selama perjalanan laut/darat." },
      { title: "Dokumen yang Dibutuhkan", desc: "STNK motor (wajib), KTP pemilik, dan form pengiriman dari BJA Logistic. Tanpa STNK, motor tidak bisa dikirim." },
      { title: "Estimasi Harga", desc: "Harga kirim motor tergantung jenis motor, rute tujuan, dan layanan yang dipilih (laut/darat/udara). Hubungi CS kami untuk penawaran terbaik." },
    ],
    relatedServices: [
      { name: "Kirim Mobil", href: "/layanan/kirim-mobil" },
      { name: "Cargo Laut", href: "/layanan/cargo-laut" },
      { name: "Cargo Darat", href: "/layanan/cargo-darat" },
      { name: "Project Logistics", href: "/kontak" },
    ],
    metaTitle: "Kirim Motor ke Papua & Indonesia Timur — Aman Bergaransi",
    metaDescription: "Jasa kirim motor ke Papua, Maluku, NTT & Sulawesi. Packing standar, asuransi tersedia, door to door service. Hubungi BJA Logistic untuk info harga.",
  },
};

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const dbServices = await getAllServicePages();
  const slugs = new Set<string>([...Object.keys(hardcodedServices), ...dbServices.map((s) => s.slug)]);
  return Array.from(slugs).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const apiData = await getServicePage(slug);
  const data = apiData ?? hardcodedServices[slug];
  if (!data) return {};

  const canonical = `https://bjalogistic.id/layanan/${slug}`;
  return {
    title: data.metaTitle || `${data.title} | BJA Logistic`,
    description: data.metaDescription || data.description,
    alternates: { canonical },
    openGraph: {
      title: data.metaTitle || data.title,
      description: data.metaDescription || data.description,
      url: canonical,
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
  };
}

export default async function LayananSlugPage({ params }: Props) {
  const { slug } = await params;
  const apiData = await getServicePage(slug);
  const data = apiData ?? hardcodedServices[slug];
  if (!data) notFound();

  const Icon = getServiceIcon(data.icon);
  const waHref = buildServiceMessage(data.title);

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Beranda", url: "https://bjalogistic.id" },
        { name: "Layanan", url: `https://bjalogistic.id/layanan/${slug}` },
        { name: data.title, url: `https://bjalogistic.id/layanan/${slug}` },
      ]} />
      <ServicePageLayout
        icon={Icon}
        title={data.title}
        subtitle={data.subtitle}
        description={data.description}
        priceFrom={data.priceFrom}
        priceNote={data.priceNote}
        eta={data.eta}
        waHref={waHref}
        waLabel={data.waLabel}
        features={data.features}
        details={data.details}
        relatedServices={data.relatedServices}
      />
    </>
  );
}

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description: "Kebijakan privasi BJA Logistic mengenai pengumpulan, penggunaan, dan perlindungan data pelanggan.",
  alternates: { canonical: "https://bjalogistic.id/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="relative bg-gradient-to-br from-[#CC1F2A] to-[#8B1219] min-h-[280px] flex items-center w-full">
        <div className="relative max-w-3xl mx-auto text-center px-4 w-full min-w-0">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-3">Kebijakan Privasi</h1>
          <p className="text-white/70 text-base sm:text-lg">Terakhir diperbarui: Agustus 2026</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12 space-y-8 text-gray-700 text-sm leading-relaxed">
        <p>
          BJA Logistic ("kami") menghargai privasi Anda. Kebijakan ini menjelaskan bagaimana kami
          mengumpulkan, menggunakan, dan melindungi data pribadi Anda saat menggunakan layanan dan situs
          bjalogistic.id.
        </p>

        <section>
          <h2 className="text-lg font-black text-[#111111] mb-2">1. Data yang Kami Kumpulkan</h2>
          <p>Kami dapat mengumpulkan data berikut saat Anda menggunakan layanan kami:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Nama, nomor telepon/WhatsApp, dan alamat pengirim maupun penerima</li>
            <li>Detail barang dan tujuan pengiriman</li>
            <li>Riwayat komunikasi via WhatsApp, telepon, atau formulir di situs</li>
            <li>Data teknis penggunaan situs (misalnya melalui Google Analytics dan Google Ads)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-black text-[#111111] mb-2">2. Penggunaan Data</h2>
          <p>Data yang kami kumpulkan digunakan untuk:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Memproses dan mengirim pesanan pengiriman Anda</li>
            <li>Memberikan informasi tracking dan status pengiriman</li>
            <li>Menghubungi Anda terkait layanan yang Anda gunakan</li>
            <li>Meningkatkan kualitas layanan dan situs kami</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-black text-[#111111] mb-2">3. Berbagi Data dengan Pihak Ketiga</h2>
          <p>
            Kami dapat membagikan data yang diperlukan kepada mitra operasional (seperti mitra transportasi
            laut/darat/udara) semata-mata untuk keperluan penyelesaian pengiriman Anda. Kami tidak menjual data
            pribadi Anda kepada pihak ketiga untuk kepentingan pemasaran.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-black text-[#111111] mb-2">4. Cookie dan Teknologi Pelacakan</h2>
          <p>
            Situs kami menggunakan cookie dan alat analitik (seperti Google Analytics dan Google Ads) untuk
            memahami penggunaan situs dan meningkatkan pengalaman Anda. Anda dapat menonaktifkan cookie melalui
            pengaturan browser Anda.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-black text-[#111111] mb-2">5. Hak Anda</h2>
          <p>
            Anda berhak untuk meminta akses, koreksi, atau penghapusan data pribadi Anda yang kami simpan, dengan
            menghubungi kami melalui kontak di bawah.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-black text-[#111111] mb-2">6. Perubahan Kebijakan</h2>
          <p>
            Kami dapat memperbarui kebijakan ini dari waktu ke waktu. Perubahan akan diinformasikan melalui
            halaman ini.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-black text-[#111111] mb-2">7. Hubungi Kami</h2>
          <p>
            Untuk pertanyaan terkait kebijakan privasi ini, silakan hubungi kami melalui halaman{" "}
            <a href="/kontak" className="text-[#CC1F2A] underline">Kontak</a>.
          </p>
        </section>
      </div>
    </div>
  );
}

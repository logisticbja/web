import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan",
  description: "Syarat dan ketentuan penggunaan layanan pengiriman BJA Logistic.",
  alternates: { canonical: "https://bjalogistic.id/terms" },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="relative bg-gradient-to-br from-[#CC1F2A] to-[#8B1219] min-h-[280px] flex items-center w-full">
        <div className="relative max-w-3xl mx-auto text-center px-4 w-full min-w-0">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-3">Syarat & Ketentuan</h1>
          <p className="text-white/70 text-base sm:text-lg">Terakhir diperbarui: Agustus 2026</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12 space-y-8 text-gray-700 text-sm leading-relaxed">
        <p>
          Dengan menggunakan layanan BJA Logistic ("kami"), Anda dianggap telah membaca, memahami, dan menyetujui
          syarat dan ketentuan berikut.
        </p>

        <section>
          <h2 className="text-lg font-black text-[#111111] mb-2">1. Layanan</h2>
          <p>
            BJA Logistic menyediakan jasa pengiriman kargo laut, darat, dan udara ke wilayah Papua, Maluku, NTT,
            dan Sulawesi. Estimasi waktu dan biaya pengiriman bersifat perkiraan dan dapat berubah tergantung
            kondisi cuaca, rute, dan operasional armada.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-black text-[#111111] mb-2">2. Pemesanan dan Pembayaran</h2>
          <p>
            Pemesanan dianggap sah setelah pelanggan mengonfirmasi detail pengiriman dan menyelesaikan pembayaran
            sesuai kesepakatan. Harga yang berlaku adalah harga yang dikonfirmasi pada saat pemesanan.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-black text-[#111111] mb-2">3. Barang yang Dilarang</h2>
          <p>
            Pelanggan bertanggung jawab memastikan barang yang dikirim bukan barang berbahaya, ilegal, atau
            dilarang oleh peraturan perundang-undangan yang berlaku di Indonesia. BJA Logistic berhak menolak
            pengiriman barang yang melanggar ketentuan ini.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-black text-[#111111] mb-2">4. Tanggung Jawab dan Klaim</h2>
          <p>
            BJA Logistic berupaya menjaga keamanan barang selama proses pengiriman. Apabila terjadi kerusakan
            atau kehilangan yang menjadi tanggung jawab kami, klaim dapat diajukan sesuai kebijakan yang berlaku
            dan bukti pengiriman yang sah. Klaim untuk kondisi di luar kendali kami (force majeure, bencana alam,
            keterlambatan pihak ketiga) tidak termasuk dalam tanggung jawab kami.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-black text-[#111111] mb-2">5. Pembatalan</h2>
          <p>
            Pembatalan pengiriman yang sudah diproses dapat dikenakan biaya sesuai kebijakan yang berlaku pada
            saat pemesanan.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-black text-[#111111] mb-2">6. Perubahan Ketentuan</h2>
          <p>
            Kami dapat memperbarui syarat dan ketentuan ini dari waktu ke waktu. Perubahan akan diinformasikan
            melalui halaman ini.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-black text-[#111111] mb-2">7. Hukum yang Berlaku</h2>
          <p>
            Syarat dan ketentuan ini tunduk pada hukum yang berlaku di Republik Indonesia.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-black text-[#111111] mb-2">8. Hubungi Kami</h2>
          <p>
            Untuk pertanyaan terkait syarat dan ketentuan ini, silakan hubungi kami melalui halaman{" "}
            <a href="/kontak" className="text-[#CC1F2A] underline">Kontak</a>.
          </p>
        </section>
      </div>
    </div>
  );
}

import {
  Document, Packer, Paragraph, Table, TableRow, TableCell,
  TextRun, HeadingLevel, AlignmentType, WidthType, BorderStyle,
  ShadingType, convertInchesToTwip, TableLayoutType,
} from "docx";
import fs from "fs";
import path from "path";

const RED   = "CC1F2A";
const GOLD  = "F5C518";
const DARK  = "1A1A1A";
const GRAY  = "F8FAFC";
const WHITE = "FFFFFF";
const LIGHT_GRAY = "E5E7EB";

function heading1(text) {
  return new Paragraph({
    text,
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 400, after: 150 },
    run: { color: WHITE, bold: true, size: 28 },
    shading: { type: ShadingType.SOLID, color: RED, fill: RED },
    indent: { left: convertInchesToTwip(0.1) },
  });
}

function heading2(text) {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, size: 24, color: RED })],
    spacing: { before: 320, after: 100 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: RED } },
  });
}

function heading3(text) {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, size: 22, color: DARK })],
    spacing: { before: 240, after: 80 },
  });
}

function body(text, opts = {}) {
  return new Paragraph({
    children: [new TextRun({ text, size: 20, color: DARK, ...opts })],
    spacing: { before: 60, after: 60 },
  });
}

function bullet(text, bold = false) {
  return new Paragraph({
    children: [new TextRun({ text, size: 20, color: DARK, bold })],
    bullet: { level: 0 },
    spacing: { before: 40, after: 40 },
  });
}

function subBullet(text) {
  return new Paragraph({
    children: [new TextRun({ text, size: 19, color: "4B5563" })],
    bullet: { level: 1 },
    spacing: { before: 30, after: 30 },
  });
}

function spacer() {
  return new Paragraph({ text: "", spacing: { before: 80, after: 80 } });
}

function tableCell(text, opts = {}) {
  const { bold = false, bg = WHITE, color = DARK, width } = opts;
  return new TableCell({
    children: [
      new Paragraph({
        children: [new TextRun({ text, bold, size: 19, color })],
        spacing: { before: 80, after: 80 },
        indent: { left: convertInchesToTwip(0.05) },
      }),
    ],
    shading: { type: ShadingType.SOLID, color: bg, fill: bg },
    ...(width ? { width: { size: width, type: WidthType.PERCENTAGE } } : {}),
  });
}

function headerRow(cells) {
  return new TableRow({
    children: cells.map(([text, w]) => tableCell(text, { bold: true, bg: RED, color: WHITE, width: w })),
    tableHeader: true,
  });
}

function dataRow(cells, alternate = false) {
  return new TableRow({
    children: cells.map(([text, w]) => tableCell(text, { bg: alternate ? "FFF7F7" : WHITE, width: w })),
  });
}

function makeTable(headers, rows) {
  return new Table({
    layout: TableLayoutType.FIXED,
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      headerRow(headers),
      ...rows.map((r, i) => dataRow(r, i % 2 === 1)),
    ],
    margins: { top: 80, bottom: 80, left: 80, right: 80 },
  });
}

const doc = new Document({
  creator: "BJA Logistic",
  title: "SEO Planning Report — BJA Logistic",
  description: "Laporan perencanaan dan status SEO bjalogistic.id",
  styles: {
    default: {
      document: {
        run: { font: "Calibri", size: 20, color: DARK },
        paragraph: { spacing: { line: 276 } },
      },
    },
  },
  sections: [
    {
      properties: {
        page: {
          margin: {
            top:    convertInchesToTwip(1.0),
            bottom: convertInchesToTwip(1.0),
            left:   convertInchesToTwip(1.15),
            right:  convertInchesToTwip(1.15),
          },
        },
      },
      children: [

        // ── COVER ──────────────────────────────────────────────────────────
        new Paragraph({
          children: [new TextRun({ text: "BJA LOGISTIC", bold: true, size: 52, color: RED })],
          alignment: AlignmentType.CENTER,
          spacing: { before: 1200, after: 200 },
        }),
        new Paragraph({
          children: [new TextRun({ text: "SEO Planning & Status Report", bold: true, size: 36, color: DARK })],
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 200 },
        }),
        new Paragraph({
          children: [new TextRun({ text: "bjalogistic.id", size: 24, color: "6B7280" })],
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 200 },
        }),
        new Paragraph({
          children: [new TextRun({ text: "Juni 2026", size: 22, color: "9CA3AF" })],
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 800 },
        }),
        new Paragraph({
          children: [new TextRun({ text: "Disiapkan oleh: Tim Digital BJA Logistic", size: 20, color: "6B7280", italics: true })],
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 0 },
        }),

        spacer(),
        spacer(),

        // ── RINGKASAN EKSEKUTIF ────────────────────────────────────────────
        heading1("1.  RINGKASAN EKSEKUTIF"),
        spacer(),
        body("Website bjalogistic.id telah dibangun ulang dari WordPress ke Next.js dengan fondasi SEO yang solid. Saat ini website sudah aktif live di domain bjalogistic.id dengan dukungan Google Ads berjalan dan kampanye pertama menghasilkan CTR 12,99% pada hari pertama tayang."),
        spacer(),
        body("Google Search Console telah disetup dan sitemap telah disubmit. Tahap selanjutnya adalah membangun konten blog secara konsisten dan memperkuat otoritas domain melalui backlink."),

        spacer(),

        // ── STATUS IMPLEMENTASI ────────────────────────────────────────────
        heading1("2.  STATUS IMPLEMENTASI SEO"),
        spacer(),

        heading2("2.1  Technical SEO ✅ Selesai"),
        spacer(),
        makeTable(
          [["Komponen", 45], ["Status", 20], ["Keterangan", 35]],
          [
            [["Metadata (title, description, canonical)", 45], ["✅ Selesai", 20], ["Semua halaman", 35]],
            [["Open Graph & Twitter Card", 45], ["✅ Selesai", 20], ["Semua halaman + blog", 35]],
            [["Sitemap XML dinamis", 45], ["✅ Selesai", 20], ["Blog + 20 halaman kota tujuan", 35]],
            [["Robots.txt", 45], ["✅ Selesai", 20], ["Dikonfigurasi dengan benar", 35]],
            [["Structured Data JSON-LD", 45], ["✅ Selesai", 20], ["LocalBusiness, FAQ, Breadcrumb", 35]],
            [["Google Analytics 4", 45], ["✅ Aktif", 20], ["ID: G-8XR43TRSP7", 35]],
            [["Event WhatsApp Click", 45], ["✅ Aktif", 20], ["Tracking konversi per klik WA", 35]],
            [["Google Search Console", 45], ["✅ Submitted", 20], ["Sitemap sudah disubmit", 35]],
            [["HTTPS & Domain", 45], ["✅ Aktif", 20], ["bjalogistic.id via Vercel + Cloudflare", 35]],
          ]
        ),

        spacer(),

        heading2("2.2  Halaman Landing yang Sudah Dibuat"),
        spacer(),
        makeTable(
          [["Tipe Halaman", 40], ["Jumlah", 15], ["Keterangan", 45]],
          [
            [["Halaman Layanan", 40], ["5 halaman", 15], ["Cargo Laut, Darat, Udara, Kirim Motor, Mobil", 45]],
            [["Halaman Kota Tujuan", 40], ["20 halaman", 15], ["Papua, Maluku, NTT, Sulawesi — /kirim-ke/[kota]", 45]],
            [["Blog Artikel", 40], ["2 artikel", 15], ["Siap dikembangkan rutin 1–2x/minggu", 45]],
            [["Halaman Corporate", 40], ["1 halaman", 15], ["Target segmen B2B", 45]],
            [["Halaman Cek Ongkir", 40], ["1 halaman", 15], ["Konversi tinggi, dapat traffic dari Google Ads", 45]],
          ]
        ),

        spacer(),

        heading2("2.3  Konten Blog & SEO Fields"),
        spacer(),
        body("Setiap artikel blog dilengkapi dengan field SEO individual yang bisa dikustomisasi per artikel tanpa sentuh kode:"),
        spacer(),
        bullet("meta_title — judul custom untuk tag <title>"),
        bullet("meta_desc — deskripsi custom untuk meta description"),
        bullet("focus_keyword — kata kunci utama yang ditarget"),
        bullet("tags — array kata kunci pendukung"),
        bullet("og_title / og_desc / og_image — custom Open Graph untuk sharing media sosial"),
        bullet("cover_alt — alt text gambar untuk aksesibilitas & SEO"),

        spacer(),

        // ── PERFORMA GOOGLE ADS ────────────────────────────────────────────
        heading1("3.  PERFORMA GOOGLE ADS (4 Hari Pertama)"),
        spacer(),
        body("Kampanye Search pertama diluncurkan pada 29 Mei 2026 dengan target keyword cargo & ekspedisi Papua:"),
        spacer(),
        makeTable(
          [["Metrik", 35], ["Hasil", 20], ["Benchmark Industri", 45]],
          [
            [["Total Klik", 35], ["121 klik", 20], ["—", 45]],
            [["Tayangan", 35], ["1.088", 20], ["—", 45]],
            [["CTR (Click-Through Rate)", 35], ["11,1%", 20], ["Rata-rata industri: 2–5%", 45]],
            [["CPC Rata-rata", 35], ["Rp 2.726", 20], ["Di bawah target Rp 5.000", 45]],
            [["Total Biaya (4 hari)", 35], ["Rp 329.894", 20], ["Budget Rp 75.000/hari", 45]],
            [["Klik WhatsApp (Konversi)", 35], ["17 klik", 20], ["Konversi rate: 14%", 45]],
            [["Biaya per Lead WA", 35], ["Rp 19.400", 20], ["Sangat efisien untuk jasa cargo", 45]],
          ]
        ),
        spacer(),
        body("Catatan: 95,5% traffic dari perangkat mobile. Kampanye B2B/Corporate sedang dalam persiapan.", { italics: true }),

        spacer(),

        // ── ROADMAP ────────────────────────────────────────────────────────
        heading1("4.  ROADMAP SEO 3 BULAN"),
        spacer(),

        heading2("Bulan 1 — Juni 2026: Fondasi"),
        spacer(),
        makeTable(
          [["Prioritas", 15], ["Aksi", 55], ["Target Selesai", 30]],
          [
            [["🔴 Tinggi", 15], ["Google Search Console — submit sitemap, pantau indexing", 55], ["✅ Selesai", 30]],
            [["🔴 Tinggi", 15], ["Tulis 8 artikel blog dengan keyword high-intent", 55], ["Minggu 4 Juni", 30]],
            [["🟡 Sedang", 15], ["Tambah konten unik di halaman /kirim-ke/[kota]", 55], ["Minggu 3 Juni", 30]],
            [["🟡 Sedang", 15], ["Pasang internal link antar halaman & artikel", 55], ["Minggu 3 Juni", 30]],
          ]
        ),

        spacer(),

        heading2("Bulan 2 — Juli 2026: Konten & Otoritas"),
        spacer(),
        makeTable(
          [["Prioritas", 15], ["Aksi", 55], ["Target Selesai", 30]],
          [
            [["🔴 Tinggi", 15], ["Lanjut 8 artikel blog baru", 55], ["Minggu 4 Juli", 30]],
            [["🟡 Sedang", 15], ["Daftar di direktori bisnis (Yellow Pages, dll)", 55], ["Minggu 2 Juli", 30]],
            [["🟡 Sedang", 15], ["Cari peluang backlink dari media logistik Indonesia", 55], ["Minggu 3 Juli", 30]],
            [["🟡 Sedang", 15], ["Review & optimasi halaman layanan berdasarkan data GSC", 55], ["Minggu 4 Juli", 30]],
          ]
        ),

        spacer(),

        heading2("Bulan 3 — Agustus 2026: Monitor & Optimasi"),
        spacer(),
        makeTable(
          [["Prioritas", 15], ["Aksi", 55], ["Target Selesai", 30]],
          [
            [["🔴 Tinggi", 15], ["Analisis GSC — keyword halaman 2, dorong ke halaman 1", 55], ["Minggu 2 Agustus", 30]],
            [["🟡 Sedang", 15], ["Update artikel lama berdasarkan data performa", 55], ["Minggu 3 Agustus", 30]],
            [["🟢 Rendah", 15], ["Tambah schema markup HowTo & Article", 55], ["Minggu 4 Agustus", 30]],
            [["🟢 Rendah", 15], ["Audit Core Web Vitals (PageSpeed)", 55], ["Minggu 4 Agustus", 30]],
          ]
        ),

        spacer(),

        // ── KEYWORD PRIORITY ───────────────────────────────────────────────
        heading1("5.  KEYWORD PRIORITY BLOG"),
        spacer(),

        heading2("High Intent — Langsung Butuh Jasa"),
        spacer(),
        makeTable(
          [["Keyword", 60], ["Tipe Konten", 40]],
          [
            [["ekspedisi surabaya ke papua", 60], ["Landing page / artikel", 40]],
            [["cargo jakarta ke jayapura", 60], ["Landing page / artikel", 40]],
            [["kirim barang ke sorong murah", 60], ["Artikel perbandingan", 40]],
            [["ongkir ke manokwari per kg", 60], ["Artikel informasi harga", 40]],
          ]
        ),

        spacer(),

        heading2("Informational — Bangun Trust & Expertise"),
        spacer(),
        makeTable(
          [["Keyword", 60], ["Tipe Konten", 40]],
          [
            [["berapa hari cargo laut ke papua", 60], ["Artikel FAQ", 40]],
            [["cara kirim motor ke papua", 60], ["Panduan langkah demi langkah", 40]],
            [["dokumen kirim barang ke papua", 60], ["Checklist artikel", 40]],
            [["perbedaan cargo laut vs udara papua", 60], ["Artikel perbandingan", 40]],
          ]
        ),

        spacer(),

        heading2("Long Tail — Mudah Ranking, Traffic Tertarget"),
        spacer(),
        makeTable(
          [["Keyword", 60], ["Target Halaman", 40]],
          [
            [["ekspedisi cargo ke raja ampat", 60], ["/kirim-ke/raja-ampat", 40]],
            [["kirim barang ke wamena papua", 60], ["/kirim-ke/wamena", 40]],
            [["cargo ke fakfak berapa lama", 60], ["/kirim-ke/fakfak", 40]],
            [["pengiriman ke labuan bajo", 60], ["/kirim-ke/labuan-bajo", 40]],
          ]
        ),

        spacer(),

        // ── NEXT STEPS ────────────────────────────────────────────────────
        heading1("6.  LANGKAH PRIORITAS BERIKUTNYA"),
        spacer(),
        body("Berdasarkan kondisi saat ini, berikut 5 aksi yang paling berdampak untuk dikerjakan segera:"),
        spacer(),
        bullet("1. Pantau Google Search Console setiap minggu — perhatikan halaman mana yang mulai terindeks dan keyword apa yang memunculkan website", true),
        spacer(),
        bullet("2. Tulis artikel blog secara konsisten — minimal 1–2 artikel per minggu dengan keyword dari daftar di atas", true),
        spacer(),
        bullet("3. Aktifkan kampanye Google Ads Corporate B2B — kampanye B2B sudah direncanakan, segera launch untuk mulai dapat leads korporat", true),
        spacer(),
        bullet("4. Optimasi Google Business Profile — pastikan info akurat, foto kantor terupload, aktifkan notifikasi untuk pantau review", true),
        spacer(),
        bullet("5. Bangun backlink — daftarkan bjalogistic.id ke direktori bisnis terpercaya di Indonesia", true),

        spacer(),
        spacer(),

        new Paragraph({
          children: [
            new TextRun({ text: "Dokumen ini dibuat oleh Tim Digital BJA Logistic  •  bjalogistic.id  •  Juni 2026", size: 18, color: "9CA3AF", italics: true }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { before: 400, after: 0 },
          border: { top: { style: BorderStyle.SINGLE, size: 4, color: LIGHT_GRAY } },
        }),
      ],
    },
  ],
});

const outPath = path.join(process.cwd(), "SEO-Report-BJA-Logistic-Juni2026.docx");
const buffer = await Packer.toBuffer(doc);
fs.writeFileSync(outPath, buffer);
console.log("✅ Report saved:", outPath);

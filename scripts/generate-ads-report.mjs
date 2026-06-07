import {
  Document, Packer, Paragraph, Table, TableRow, TableCell,
  TextRun, HeadingLevel, AlignmentType, WidthType, BorderStyle,
  ShadingType, convertInchesToTwip, TableLayoutType,
} from "docx";
import fs from "fs";

const RED   = "CC1F2A";
const GOLD  = "F5C518";
const DARK  = "1A1A1A";
const WHITE = "FFFFFF";
const GREEN = "16A34A";
const LIGHT_RED = "FFF0F0";

function heading1(text) {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, size: 28, color: WHITE })],
    spacing: { before: 400, after: 150 },
    shading: { type: ShadingType.SOLID, color: RED, fill: RED },
    indent: { left: convertInchesToTwip(0.1), right: convertInchesToTwip(0.1) },
  });
}

function heading2(text) {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, size: 24, color: RED })],
    spacing: { before: 320, after: 100 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: RED } },
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
    spacing: { before: 50, after: 50 },
  });
}

function spacer() {
  return new Paragraph({ text: "", spacing: { before: 80, after: 80 } });
}

function cell(text, opts = {}) {
  const { bold = false, bg = WHITE, color = DARK, align = AlignmentType.LEFT } = opts;
  return new TableCell({
    children: [
      new Paragraph({
        children: [new TextRun({ text: String(text), bold, size: 19, color })],
        alignment: align,
        spacing: { before: 90, after: 90 },
        indent: { left: convertInchesToTwip(0.08), right: convertInchesToTwip(0.08) },
      }),
    ],
    shading: { type: ShadingType.SOLID, color: bg, fill: bg },
  });
}

function headerRow(labels) {
  return new TableRow({
    children: labels.map((t) => cell(t, { bold: true, bg: RED, color: WHITE })),
    tableHeader: true,
  });
}

function dataRow(cells, alt = false) {
  return new TableRow({
    children: cells.map(([text, opts = {}]) => cell(text, { bg: alt ? "FFF7F7" : WHITE, ...opts })),
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

// ── Data ─────────────────────────────────────────────────────────────────────
const PERIOD    = "29 Mei – 7 Juni 2026";
const DAYS      = 10;
const KLIK      = 320;
const TAYANGAN  = 2783;
const CTR       = "11,50%";
const CPC       = "Rp 3.259";
const BIAYA     = 1040000;
const KONVERSI  = 50;
const CPL       = Math.round(BIAYA / KONVERSI);      // Rp 20.800
const CONV_RATE = ((KONVERSI / KLIK) * 100).toFixed(1) + "%";  // 15,6%
const AVG_KLIK  = Math.round(KLIK / DAYS);
const AVG_LEAD  = Math.round(KONVERSI / DAYS);
const AVG_BIAYA = Math.round(BIAYA / DAYS);
const fmt       = (n) => "Rp " + n.toLocaleString("id-ID");

const doc = new Document({
  creator: "BJA Logistic",
  title: "Laporan Performa Google Ads — BJA Logistic",
  styles: {
    default: {
      document: {
        run: { font: "Calibri", size: 20, color: DARK },
        paragraph: { spacing: { line: 276 } },
      },
    },
  },
  sections: [{
    properties: {
      page: {
        margin: {
          top: convertInchesToTwip(1.0), bottom: convertInchesToTwip(1.0),
          left: convertInchesToTwip(1.15), right: convertInchesToTwip(1.15),
        },
      },
    },
    children: [

      // ── COVER ──────────────────────────────────────────────────────────────
      new Paragraph({
        children: [new TextRun({ text: "BJA LOGISTIC", bold: true, size: 52, color: RED })],
        alignment: AlignmentType.CENTER,
        spacing: { before: 1000, after: 200 },
      }),
      new Paragraph({
        children: [new TextRun({ text: "Laporan Performa Google Ads", bold: true, size: 36, color: DARK })],
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 160 },
      }),
      new Paragraph({
        children: [new TextRun({ text: `Periode: ${PERIOD}`, size: 24, color: "6B7280" })],
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 160 },
      }),
      new Paragraph({
        children: [new TextRun({ text: "Kampanye: BJA - Search - Cargo Indonesia Timur", size: 20, color: "9CA3AF" })],
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 800 },
      }),
      new Paragraph({
        children: [new TextRun({ text: "Disiapkan oleh: Tim Digital BJA Logistic", size: 20, color: "6B7280", italics: true })],
        alignment: AlignmentType.CENTER,
      }),

      spacer(), spacer(),

      // ── 1. RINGKASAN EKSEKUTIF ─────────────────────────────────────────────
      heading1("1.  RINGKASAN EKSEKUTIF"),
      spacer(),
      body(`Kampanye Google Ads BJA Logistic diluncurkan pertama kali pada 29 Mei 2026. Dalam 10 hari pertama berjalan, kampanye menghasilkan performa yang sangat melampaui rata-rata industri dengan CTR 11,50% (industri: 2–5%) dan biaya per lead WhatsApp hanya ${fmt(CPL)}.`),
      spacer(),
      body("Kampanye berhasil mendatangkan 50 leads WhatsApp berkualitas dari pengguna yang secara aktif mencari jasa ekspedisi cargo ke Papua & Indonesia Timur — dengan total investasi iklan Rp 1.040.000 selama 10 hari."),

      spacer(),

      // ── 2. RINGKASAN METRIK ────────────────────────────────────────────────
      heading1("2.  RINGKASAN METRIK UTAMA"),
      spacer(),
      makeTable(
        ["Metrik", "Hasil", "Benchmark Industri", "Evaluasi"],
        [
          [["Periode Kampanye"], [PERIOD], ["—"], ["—"]],
          [["Total Klik"], [KLIK.toLocaleString("id-ID")], ["—"], ["✅ Bagus"]],
          [["Total Tayangan"], [TAYANGAN.toLocaleString("id-ID")], ["—"], ["✅ Jangkauan luas"]],
          [["CTR (Click-Through Rate)"], [CTR], ["2–5%"], ["✅ 2× di atas rata-rata"]],
          [["CPC Rata-rata"], [CPC], ["Rp 5.000–10.000"], ["✅ Sangat efisien"]],
          [["Total Biaya (10 hari)"], [fmt(BIAYA)], ["Budget Rp 150k/hari"], ["✅ Sesuai budget"]],
          [["Total Leads WhatsApp"], [KONVERSI.toString()], ["—"], ["✅ Bagus"]],
          [["Konversi Rate (Klik → Lead)"], [CONV_RATE], ["2–5%"], ["✅ 3× di atas rata-rata"]],
          [["Biaya per Lead WhatsApp"], [fmt(CPL)], ["Rp 50.000–150.000"], ["✅ Sangat murah"]],
        ]
      ),

      spacer(),

      // ── 3. RATA-RATA HARIAN ────────────────────────────────────────────────
      heading1("3.  RATA-RATA HARIAN"),
      spacer(),
      makeTable(
        ["Metrik", "Per Hari"],
        [
          [["Klik"], [AVG_KLIK + " klik/hari"]],
          [["Leads WhatsApp"], [AVG_LEAD + " leads/hari"]],
          [["Biaya Iklan"], [fmt(AVG_BIAYA) + "/hari"]],
        ]
      ),
      spacer(),
      body(`Dengan rata-rata ${AVG_LEAD} leads WhatsApp per hari dan biaya iklan ${fmt(AVG_BIAYA)}/hari, kampanye ini menghasilkan biaya per lead yang sangat kompetitif dibandingkan channel marketing konvensional.`, { italics: true }),

      spacer(),

      // ── 4. ANALISIS ────────────────────────────────────────────────────────
      heading1("4.  ANALISIS & INSIGHT"),
      spacer(),

      heading2("4.1  CTR 11,50% — Jauh di Atas Rata-rata Industri"),
      spacer(),
      body("CTR (Click-Through Rate) mengukur persentase orang yang melihat iklan dan memutuskan untuk klik. Rata-rata industri logistik berada di kisaran 2–5%. CTR 11,50% yang dicapai BJA Logistic menunjukkan bahwa:"),
      spacer(),
      bullet("Pemilihan keyword sudah sangat tepat sasaran — iklan muncul ke orang yang memang sedang mencari jasa cargo Papua"),
      bullet("Teks iklan (ad copy) relevan dan menarik — mendorong calon pelanggan untuk klik"),
      bullet("Tidak ada pemborosan tayangan ke audience yang tidak relevan"),

      spacer(),

      heading2("4.2  Biaya per Lead Rp 20.800 — Sangat Efisien"),
      spacer(),
      body(`Biaya per lead WhatsApp sebesar ${fmt(CPL)} sangat efisien untuk bisnis jasa cargo. Dengan asumsi nilai order rata-rata Rp 500.000–5.000.000 per pengiriman, potensi Return on Ad Spend (ROAS) sangat tinggi:`),
      spacer(),
      makeTable(
        ["Asumsi Nilai Order", "Closing Rate", "Estimasi Revenue dari 50 Leads", "ROAS"],
        [
          [["Rp 500.000"], ["20% (10 order)"], ["Rp 5.000.000"], ["4,8×"]],
          [["Rp 1.000.000"], ["20% (10 order)"], ["Rp 10.000.000"], ["9,6×"]],
          [["Rp 2.000.000"], ["20% (10 order)"], ["Rp 20.000.000"], ["19,2×"]],
          [["Rp 5.000.000"], ["20% (10 order)"], ["Rp 50.000.000"], ["48,1×"]],
        ]
      ),

      spacer(),

      heading2("4.3  Konversi Rate 15,6% — Kualitas Traffic Tinggi"),
      spacer(),
      body("Dari 320 orang yang klik iklan, 50 orang (15,6%) melanjutkan dengan klik tombol WhatsApp di website. Angka ini menunjukkan bahwa:"),
      spacer(),
      bullet("Landing page (/cek-ongkir) relevan dan meyakinkan"),
      bullet("User yang datang memang punya niat beli yang tinggi"),
      bullet("CTA WhatsApp di website efektif mendorong konversi"),

      spacer(),

      // ── 5. DETAIL KAMPANYE ─────────────────────────────────────────────────
      heading1("5.  DETAIL KAMPANYE"),
      spacer(),
      makeTable(
        ["Parameter", "Detail"],
        [
          [["Nama Kampanye"], ["BJA - Search - Cargo Indonesia Timur"]],
          [["Jenis Kampanye"], ["Google Search (Penelusuran)"]],
          [["Strategi Bidding"], ["Maksimalkan Konversi"]],
          [["Budget Harian"], ["Rp 150.000/hari"]],
          [["Lokasi Target"], ["Jabodetabek & Surabaya (Jawa)"]],
          [["Target Audience"], ["Pengirim cargo 100 kg ke atas ke Indonesia Timur"]],
          [["Landing Page"], ["bjalogistic.id/cek-ongkir"]],
          [["Konversi yang Dilacak"], ["Klik tombol WhatsApp (whatsapp_click via GA4)"]],
          [["Perangkat"], ["95,5% Mobile, 4,5% Desktop"]],
        ]
      ),

      spacer(),

      // ── 6. STRATEGI ────────────────────────────────────────────────────────
      heading1("6.  STRATEGI & OPTIMASI YANG DILAKUKAN"),
      spacer(),
      makeTable(
        ["Tanggal", "Aksi", "Dampak"],
        [
          [["29 Mei 2026"], ["Launch kampanye pertama — bidding Maksimalkan Klik"], ["CTR 13% di hari pertama"]],
          [["30 Mei 2026"], ["Perbaiki targeting lokasi — hapus seluruh Indonesia, fokus Jabodetabek + Surabaya"], ["Leads lebih relevan, tidak ada leads dari luar area pickup"]],
          [["31 Mei 2026"], ["Ganti bidding ke Maksimalkan Konversi, naikkan budget Rp 75k → Rp 150k/hari"], ["Volume leads meningkat"]],
          [["6 Jun 2026"], ["Update keyword fokus muatan besar (cargo laut, ton, muatan besar)"], ["Filter alami pengirim 100kg ke atas"]],
          [["7 Jun 2026"], ["Update landing page — tampilkan minimum berat per layanan"], ["Ekspektasi user tersaring sebelum chat WA"]],
        ]
      ),

      spacer(),

      // ── 7. NEXT STEPS ──────────────────────────────────────────────────────
      heading1("7.  RENCANA KE DEPAN"),
      spacer(),
      makeTable(
        ["Prioritas", "Aksi", "Target"],
        [
          [["🔴 Tinggi"], ["Monitor & optimalkan keyword berdasarkan Search Term Report"], ["Minggu ini"]],
          [["🔴 Tinggi"], ["Launch kampanye Corporate B2B terpisah"], ["Minggu ini"]],
          [["🟡 Sedang"], ["Uji coba budget lebih tinggi (Rp 200k/hari) jika performa stabil"], ["2 minggu ke depan"]],
          [["🟡 Sedang"], ["Tambah aset iklan: gambar & video untuk meningkatkan ad strength"], ["2 minggu ke depan"]],
          [["🟢 Rendah"], ["Evaluasi ganti ke Performance Max setelah 100+ konversi/bulan"], ["3 bulan ke depan"]],
        ]
      ),

      spacer(),

      // ── FOOTER ─────────────────────────────────────────────────────────────
      new Paragraph({
        children: [
          new TextRun({
            text: `Laporan ini mencakup periode ${PERIOD}  •  Kampanye: BJA - Search - Cargo Indonesia Timur  •  bjalogistic.id`,
            size: 17, color: "9CA3AF", italics: true,
          }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: { before: 500 },
        border: { top: { style: BorderStyle.SINGLE, size: 4, color: "E5E7EB" } },
      }),
    ],
  }],
});

const outPath = "Laporan-Google-Ads-BJA-Logistic-29Mei-7Juni2026.docx";
const buffer = await Packer.toBuffer(doc);
fs.writeFileSync(outPath, buffer);
console.log("✅ Report saved:", outPath);

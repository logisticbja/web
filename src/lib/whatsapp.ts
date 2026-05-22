const WA_NUMBER = "6281513335157";
const WA_BASE = `https://api.whatsapp.com/send/?phone=${WA_NUMBER}&text=`;

function encode(text: string) {
  return encodeURIComponent(text);
}

export function buildGeneralMessage() {
  const msg = "Halo BJA Logistic, saya ingin tanya mengenai layanan pengiriman ke Papua/Indonesia Timur. Bisa bantu saya?";
  return WA_BASE + encode(msg);
}

export function buildServiceMessage(service: string) {
  const msg = `Halo BJA Logistic, saya tertarik dengan layanan ${service}. Bisa info harga dan jadwalnya? Terima kasih.`;
  return WA_BASE + encode(msg);
}

export function buildOngkirMessage(from: string, to: string, weight: number, service: string, estimatedPrice: string) {
  const msg = `Halo BJA Logistic, saya ingin memesan pengiriman:\n- Dari: ${from}\n- Ke: ${to}\n- Berat: ${weight} kg\n- Layanan: ${service}\n- Estimasi harga: ${estimatedPrice}\n\nMohon konfirmasi ketersediaan dan harga finalnya. Terima kasih.`;
  return WA_BASE + encode(msg);
}

export function buildCorporateMessage() {
  const msg = "Halo BJA Logistic, perusahaan kami tertarik untuk menjalin kerjasama corporate. Bisa info lebih lanjut mengenai harga dan syarat kerjasama?";
  return WA_BASE + encode(msg);
}

export function buildTrackingMessage(resi: string) {
  const msg = `Halo BJA Logistic, saya ingin cek status pengiriman dengan nomor resi: ${resi}. Terima kasih.`;
  return WA_BASE + encode(msg);
}

export function buildVehicleMessage(type: "motor" | "mobil") {
  const vehicle = type === "motor" ? "motor" : "mobil";
  const msg = `Halo BJA Logistic, saya ingin tanya tentang layanan pengiriman ${vehicle} ke Papua/Indonesia Timur. Bisa info harga dan prosedurnya?`;
  return WA_BASE + encode(msg);
}

export function buildDestinationMessage(city: string) {
  const msg = `Halo BJA Logistic, saya ingin kirim cargo ke ${city}. Bisa bantu info harga, jadwal, dan estimasi pengirimannya? Terima kasih.`;
  return WA_BASE + encode(msg);
}

export const WA_PHONE = "0815 1333 5157";
export const WA_PHONE_RAW = "6281513335157";

export type AirFreightRate = { city: string; price: number; days: number };

export type AirFreightRegion = { region: string; rates: AirFreightRate[] };

export const AIR_FREIGHT_MIN_KG = 20;

export const AIR_FREIGHT_VOLUME_DIVISOR = 6000;

export const airFreightRates: AirFreightRegion[] = [
  {
    region: "Papua",
    rates: [
      { city: "Jayapura", price: 218000, days: 4 },
      { city: "Mimika (Timika)", price: 209000, days: 4 },
      { city: "Biak Numfor", price: 196000, days: 5 },
      { city: "Jayawijaya (Wamena)", price: 351000, days: 6 },
      { city: "Merauke", price: 197000, days: 8 },
      { city: "Nabire", price: 302000, days: 6 },
    ],
  },
  {
    region: "Papua Barat",
    rates: [
      { city: "Sorong", price: 186000, days: 3 },
      { city: "Manokwari", price: 221000, days: 4 },
      { city: "Fakfak", price: 325000, days: 3 },
      { city: "Kaimana", price: 528000, days: 6 },
      { city: "Teluk Bintuni", price: 293000, days: 6 },
    ],
  },
  {
    region: "Maluku",
    rates: [
      { city: "Ambon", price: 147000, days: 2 },
      { city: "Buru", price: 183000, days: 6 },
      { city: "Tual", price: 434000, days: 6 },
    ],
  },
  {
    region: "Maluku Utara",
    rates: [
      { city: "Ternate", price: 163000, days: 4 },
      { city: "Halmahera Barat", price: 250000, days: 5 },
      { city: "Halmahera Tengah", price: 250000, days: 8 },
      { city: "Halmahera Timur", price: 250000, days: 6 },
      { city: "Halmahera Utara", price: 250000, days: 6 },
      { city: "Halmahera Selatan", price: 345000, days: 6 },
      { city: "Kepulauan Sula", price: 345000, days: 5 },
    ],
  },
  {
    region: "Nusa Tenggara Timur",
    rates: [
      { city: "Kupang", price: 167000, days: 4 },
      { city: "Alor", price: 170000, days: 7 },
      { city: "Ende", price: 177000, days: 7 },
      { city: "Flores Timur", price: 170000, days: 7 },
      { city: "Manggarai", price: 176000, days: 7 },
      { city: "Manggarai Barat", price: 182000, days: 10 },
      { city: "Nagekeo", price: 174000, days: 16 },
      { city: "Ngada", price: 174000, days: 7 },
      { city: "Sumba Barat Daya", price: 184000, days: 13 },
    ],
  },
  {
    region: "Sulawesi Utara",
    rates: [
      { city: "Manado", price: 147000, days: 3 },
      { city: "Bitung", price: 168000, days: 4 },
      { city: "Minahasa", price: 160000, days: 3 },
      { city: "Minahasa Selatan", price: 187000, days: 4 },
      { city: "Minahasa Tenggara", price: 175000, days: 5 },
      { city: "Minahasa Utara", price: 177000, days: 4 },
      { city: "Kotamobagu", price: 172000, days: 4 },
      { city: "Tomohon", price: 160000, days: 3 },
    ],
  },
  {
    region: "Gorontalo",
    rates: [
      { city: "Gorontalo", price: 139000, days: 4 },
      { city: "Pahuwato", price: 199000, days: 7 },
    ],
  },
  {
    region: "Sulawesi Tengah",
    rates: [
      { city: "Palu", price: 150000, days: 4 },
      { city: "Banggai", price: 178000, days: 4 },
      { city: "Morowali", price: 171000, days: 7 },
      { city: "Parigi Moutong", price: 162000, days: 3 },
      { city: "Poso", price: 162000, days: 3 },
      { city: "Sigi", price: 156000, days: 3 },
      { city: "Toli-Toli", price: 165000, days: 3 },
    ],
  },
  {
    region: "Sulawesi Tenggara",
    rates: [
      { city: "Kendari", price: 141000, days: 4 },
      { city: "Baubau", price: 164000, days: 3 },
      { city: "Bombana", price: 189000, days: 4 },
      { city: "Buton", price: 189000, days: 3 },
      { city: "Kolaka", price: 164000, days: 4 },
      { city: "Konawe", price: 164000, days: 3 },
      { city: "Muna", price: 164000, days: 3 },
      { city: "Wakatobi", price: 211000, days: 4 },
    ],
  },
  {
    region: "Sulawesi Selatan",
    rates: [
      { city: "Makassar", price: 102000, days: 3 },
      { city: "Parepare", price: 107000, days: 4 },
      { city: "Palopo", price: 111000, days: 4 },
      { city: "Maros", price: 106000, days: 3 },
      { city: "Gowa", price: 104000, days: 4 },
      { city: "Takalar", price: 104000, days: 4 },
      { city: "Bone", price: 112000, days: 3 },
      { city: "Bulukumba", price: 112000, days: 4 },
      { city: "Bantaeng", price: 111000, days: 3 },
      { city: "Jeneponto", price: 110000, days: 3 },
      { city: "Sinjai", price: 113000, days: 3 },
      { city: "Soppeng", price: 113000, days: 3 },
      { city: "Wajo", price: 111000, days: 4 },
      { city: "Barru", price: 108000, days: 4 },
      { city: "Pinrang", price: 111000, days: 4 },
      { city: "Sidenreng Rappang", price: 110000, days: 4 },
      { city: "Enrekang", price: 116000, days: 3 },
      { city: "Luwu", price: 116000, days: 4 },
      { city: "Toraja Utara", price: 116000, days: 3 },
      { city: "Pangkajene Kepulauan", price: 107000, days: 4 },
    ],
  },
  {
    region: "Sulawesi Barat",
    rates: [
      { city: "Mamuju", price: 117000, days: 4 },
      { city: "Majene", price: 114000, days: 4 },
      { city: "Mamasa", price: 122000, days: 3 },
      { city: "Polewali Mandar", price: 112000, days: 4 },
    ],
  },
  {
    region: "Kota besar lainnya",
    rates: [
      { city: "Banda Aceh", price: 102000, days: 3 },
      { city: "Medan", price: 87000, days: 3 },
      { city: "Padang", price: 57000, days: 3 },
      { city: "Pekanbaru", price: 63000, days: 3 },
      { city: "Batam", price: 82000, days: 3 },
      { city: "Jambi", price: 51000, days: 2 },
      { city: "Palembang", price: 53000, days: 3 },
      { city: "Bengkulu", price: 54000, days: 4 },
      { city: "Bandar Lampung", price: 56000, days: 2 },
      { city: "Pangkal Pinang", price: 58000, days: 4 },
      { city: "Semarang", price: 53000, days: 2 },
      { city: "Yogyakarta", price: 45000, days: 3 },
      { city: "Surabaya", price: 54000, days: 3 },
      { city: "Malang", price: 58000, days: 3 },
      { city: "Denpasar", price: 57000, days: 3 },
      { city: "Mataram", price: 68000, days: 3 },
      { city: "Pontianak", price: 76000, days: 2 },
      { city: "Banjarmasin", price: 83000, days: 3 },
      { city: "Balikpapan", price: 85000, days: 3 },
      { city: "Samarinda", price: 97000, days: 2 },
      { city: "Palangkaraya", price: 85000, days: 3 },
      { city: "Tarakan", price: 192000, days: 4 },
    ],
  },
];

export type OngkirRegion = "maluku" | "papua" | "ntt" | "sulawesi";

export interface OngkirCity {
  value: string;
  label: string;
}

export interface OngkirGroup {
  groupLabel: string;
  region: OngkirRegion;
  cities: OngkirCity[];
}

export const ongkirGroups: OngkirGroup[] = [
  {
    groupLabel: "Maluku",
    region: "maluku",
    cities: [
      { value: "ambon", label: "Ambon" },
      { value: "dabo", label: "Dabo" },
      { value: "masohi", label: "Masohi" },
      { value: "namlea", label: "Namlea" },
      { value: "saumlaki", label: "Saumlaki" },
      { value: "seram", label: "Seram" },
      { value: "tanimbar", label: "Tanimbar" },
      { value: "tiakur", label: "Tiakur" },
      { value: "tual", label: "Tual" },
    ],
  },
  {
    groupLabel: "Maluku Utara",
    region: "maluku",
    cities: [
      { value: "ternate", label: "Ternate" },
      { value: "jailolo", label: "Jailolo" },
      { value: "tobelo", label: "Tobelo" },
      { value: "tidore", label: "Tidore" },
      { value: "weda", label: "Weda" },
      { value: "bacan", label: "Bacan" },
    ],
  },
  {
    groupLabel: "Papua Tengah",
    region: "papua",
    cities: [
      { value: "mimika", label: "Mimika" },
      { value: "nabire", label: "Nabire" },
      { value: "deiyai", label: "Deiyai" },
      { value: "dogiyai", label: "Dogiyai" },
      { value: "paniai", label: "Paniai" },
      { value: "puncak-jaya", label: "Puncak Jaya" },
      { value: "waropen", label: "Waropen" },
    ],
  },
  {
    groupLabel: "Papua",
    region: "papua",
    cities: [
      { value: "biak-numfor", label: "Biak Numfor" },
      { value: "jayapura", label: "Jayapura" },
      { value: "keerom", label: "Keerom" },
      { value: "yapen", label: "Yapen" },
      { value: "mamberamo-raya", label: "Mamberamo Raya" },
      { value: "sarmi", label: "Sarmi" },
      { value: "supiori", label: "Supiori" },
      { value: "sentani", label: "Sentani" },
      { value: "serui", label: "Serui" },
    ],
  },
  {
    groupLabel: "Papua Pegunungan",
    region: "papua",
    cities: [
      { value: "jayawijaya", label: "Jayawijaya" },
      { value: "yahukimo", label: "Yahukimo" },
      { value: "tolikara", label: "Tolikara" },
      { value: "lanny-jaya", label: "Lanny Jaya" },
      { value: "wamena", label: "Wamena" },
    ],
  },
  {
    groupLabel: "Papua Selatan",
    region: "papua",
    cities: [
      { value: "merauke", label: "Merauke" },
      { value: "boven-digoel", label: "Boven Digoel" },
      { value: "mappi", label: "Mappi" },
      { value: "asmat-agats", label: "Asmat/Agats" },
    ],
  },
  {
    groupLabel: "Papua Barat",
    region: "papua",
    cities: [
      { value: "fak-fak", label: "Fak-Fak" },
      { value: "kaimana", label: "Kaimana" },
      { value: "manokwari", label: "Manokwari" },
      { value: "bintuni", label: "Bintuni" },
    ],
  },
  {
    groupLabel: "Papua Barat Daya",
    region: "papua",
    cities: [
      { value: "sorong", label: "Sorong" },
      { value: "raja-ampat", label: "Raja Ampat" },
    ],
  },
  {
    groupLabel: "NTT",
    region: "ntt",
    cities: [
      { value: "sumba-barat-daya", label: "Sumba Barat Daya" },
      { value: "sumba-barat", label: "Sumba Barat" },
      { value: "sumba-tengah", label: "Sumba Tengah" },
      { value: "sumba-timur", label: "Sumba Timur" },
      { value: "labuhan-bajo", label: "Labuhan Bajo" },
      { value: "lembor", label: "Lembor" },
      { value: "ruteng", label: "Ruteng" },
      { value: "borong", label: "Borong" },
      { value: "bajawa", label: "Bajawa" },
      { value: "nagekeo", label: "Nagekeo" },
      { value: "ende", label: "Ende" },
      { value: "maumere", label: "Maumere" },
      { value: "larantuka", label: "Larantuka" },
      { value: "adonara", label: "Adonara" },
      { value: "lembata", label: "Lembata" },
      { value: "kupang", label: "Kupang" },
      { value: "soe", label: "Soe" },
      { value: "kefamenanu", label: "Kefamenanu" },
      { value: "atambua", label: "Atambua" },
      { value: "malaka", label: "Malaka" },
      { value: "betun", label: "Betun" },
      { value: "rote-ndao", label: "Rote Ndao" },
    ],
  },
  {
    groupLabel: "Sulawesi Selatan",
    region: "sulawesi",
    cities: [
      { value: "makassar", label: "Makassar" },
      { value: "bantaeng", label: "Bantaeng" },
      { value: "barru", label: "Barru" },
      { value: "bone", label: "Bone" },
      { value: "bulukumba", label: "Bulukumba" },
      { value: "enrekang", label: "Enrekang" },
      { value: "gowa", label: "Gowa" },
      { value: "jeneponto", label: "Jeneponto" },
      { value: "luwu-belopa", label: "Luwu Belopa" },
      { value: "luwu-timur", label: "Luwu Timur" },
      { value: "luwu-utara", label: "Luwu Utara" },
      { value: "maros", label: "Maros" },
      { value: "palopo", label: "Palopo" },
      { value: "pangkep", label: "Pangkep" },
      { value: "pare-pare", label: "Pare-pare" },
      { value: "pinrang", label: "Pinrang" },
      { value: "rappang", label: "Rappang" },
      { value: "rantepao", label: "Rantepao" },
      { value: "selayar", label: "Selayar" },
      { value: "sidrap", label: "Sidrap" },
      { value: "sinjai", label: "Sinjai" },
      { value: "siwa", label: "Siwa" },
      { value: "soppeng", label: "Soppeng" },
      { value: "sorowako", label: "Sorowako" },
      { value: "takalar", label: "Takalar" },
      { value: "tana-toraja", label: "Tana Toraja" },
      { value: "wajo", label: "Wajo" },
    ],
  },
  {
    groupLabel: "Sulawesi Barat",
    region: "sulawesi",
    cities: [
      { value: "majene", label: "Majene" },
      { value: "mamuju", label: "Mamuju" },
      { value: "mamasa", label: "Mamasa" },
      { value: "polman", label: "Polman" },
      { value: "pasang-kayu", label: "Pasang Kayu" },
      { value: "topoyo", label: "Topoyo" },
    ],
  },
  {
    groupLabel: "Sulawesi Tengah",
    region: "sulawesi",
    cities: [
      { value: "ampana", label: "Ampana" },
      { value: "banggai-laut", label: "Banggai Laut" },
      { value: "banggai-kepulauan", label: "Banggai Kepulauan" },
      { value: "batui-toili", label: "Batui Toili" },
      { value: "buol", label: "Buol" },
      { value: "donggala", label: "Donggala" },
      { value: "luwuk-banggai", label: "Luwuk Banggai" },
      { value: "morowali", label: "Morowali" },
      { value: "palu", label: "Palu" },
      { value: "parigi-moutong", label: "Parigi Moutong" },
      { value: "poso", label: "Poso" },
      { value: "toli-toli", label: "Toli-toli" },
      { value: "tojo-una-una", label: "Tojo Una-una" },
    ],
  },
  {
    groupLabel: "Sulawesi Tenggara",
    region: "sulawesi",
    cities: [
      { value: "konawe-selatan", label: "Konawe Selatan" },
      { value: "bau-bau", label: "Bau-bau" },
      { value: "kendari", label: "Kendari" },
      { value: "kolaka", label: "Kolaka" },
    ],
  },
  {
    groupLabel: "Gorontalo",
    region: "sulawesi",
    cities: [
      { value: "gorontalo", label: "Gorontalo" },
    ],
  },
  {
    groupLabel: "Sulawesi Utara",
    region: "sulawesi",
    cities: [
      { value: "bitung", label: "Bitung" },
      { value: "kotamobagu", label: "Kotamobagu" },
      { value: "manado", label: "Manado" },
      { value: "tomohon", label: "Tomohon" },
      { value: "tondano", label: "Tondano" },
      { value: "tahuna", label: "Tahuna" },
      { value: "bolaang-mongondow", label: "Bolaang Mongondow" },
    ],
  },
];

export function findOngkirCity(value: string): { city: OngkirCity; region: OngkirRegion } | undefined {
  for (const group of ongkirGroups) {
    const city = group.cities.find((c) => c.value === value);
    if (city) return { city, region: group.region };
  }
  return undefined;
}

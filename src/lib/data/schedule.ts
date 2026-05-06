export interface ShipSchedule {
  id: string;
  route: string;
  from: string;
  to: string;
  ship: string;
  operator: string;
  departure: string;
  eta: string;
  frequency: string;
  region: string;
}

export const schedules: ShipSchedule[] = [
  {
    id: "1",
    route: "Surabaya → Jayapura",
    from: "Surabaya",
    to: "Jayapura",
    ship: "KM Tidar",
    operator: "PELNI",
    departure: "Setiap 2 minggu (Rabu)",
    eta: "5–7 hari",
    frequency: "2x sebulan",
    region: "Papua",
  },
  {
    id: "2",
    route: "Surabaya → Sorong",
    from: "Surabaya",
    to: "Sorong",
    ship: "KM Ciremai",
    operator: "PELNI",
    departure: "Setiap 2 minggu (Sabtu)",
    eta: "4–6 hari",
    frequency: "2x sebulan",
    region: "Papua",
  },
  {
    id: "3",
    route: "Surabaya → Manokwari",
    from: "Surabaya",
    to: "Manokwari",
    ship: "KM Dorolonda",
    operator: "PELNI",
    departure: "Setiap 2 minggu (Senin)",
    eta: "5–7 hari",
    frequency: "2x sebulan",
    region: "Papua",
  },
  {
    id: "4",
    route: "Surabaya → Merauke",
    from: "Surabaya",
    to: "Merauke",
    ship: "KM Sirimau",
    operator: "PELNI",
    departure: "Setiap 2 minggu (Jumat)",
    eta: "7–9 hari",
    frequency: "2x sebulan",
    region: "Papua",
  },
  {
    id: "5",
    route: "Surabaya → Ambon",
    from: "Surabaya",
    to: "Ambon",
    ship: "KM Binaiya",
    operator: "PELNI",
    departure: "Setiap 2 minggu (Selasa)",
    eta: "3–4 hari",
    frequency: "2x sebulan",
    region: "Maluku",
  },
  {
    id: "6",
    route: "Surabaya → Ternate",
    from: "Surabaya",
    to: "Ternate",
    ship: "KM Labobar",
    operator: "PELNI",
    departure: "Setiap 2 minggu (Kamis)",
    eta: "4–5 hari",
    frequency: "2x sebulan",
    region: "Maluku",
  },
  {
    id: "7",
    route: "Surabaya → Kupang",
    from: "Surabaya",
    to: "Kupang",
    ship: "KM Awu",
    operator: "PELNI",
    departure: "Setiap minggu (Minggu)",
    eta: "3–4 hari",
    frequency: "1x seminggu",
    region: "NTT",
  },
  {
    id: "8",
    route: "Surabaya → Kendari",
    from: "Surabaya",
    to: "Kendari",
    ship: "KM Tilongkabila",
    operator: "PELNI",
    departure: "Setiap 2 minggu (Rabu)",
    eta: "2–3 hari",
    frequency: "2x sebulan",
    region: "Sulawesi",
  },
];

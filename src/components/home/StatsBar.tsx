const stats = [
  { value: "50+", label: "Kota Tujuan", sub: "Papua, Maluku, NTT, Sulawesi" },
  { value: "10+", label: "Tahun Pengalaman", sub: "Terpercaya & profesional" },
  { value: "50.000+", label: "Pengiriman Sukses", sub: "Setiap tahunnya" },
  { value: "98%", label: "Tepat Waktu", sub: "Tracking real-time" },
];

export function StatsBar() {
  return (
    <section className="bg-[#F5C518] py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-yellow-600">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center text-[#1A1A1A] px-4 py-2">
              <p className="text-3xl lg:text-4xl font-black">{stat.value}</p>
              <p className="font-bold text-sm mt-0.5">{stat.label}</p>
              <p className="text-[#1A1A1A]/60 text-xs mt-0.5">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

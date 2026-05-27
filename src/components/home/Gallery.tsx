import Image from "next/image";

const photos = [
  { src: "/gallery/Galeri-Jasa-Ekspedisi-BJA-Logistic-8.webp",  alt: "Operasional ekspedisi BJA Logistic",    caption: "Operasional Kami",     desktopCls: "col-span-2" },
  { src: "/gallery/Galeri-Jasa-Ekspedisi-BJA-Logistic-21.webp", alt: "Armada pengiriman BJA Logistic",        caption: "Armada Kami",          desktopCls: "" },
  { src: "/gallery/Galeri-Jasa-Ekspedisi-BJA-Logistic-24.webp", alt: "Pengiriman cargo ke Indonesia Timur",   caption: "Cargo Laut",           desktopCls: "" },
  { src: "/gallery/Galeri-Jasa-Ekspedisi-BJA-Logistic-26.webp", alt: "Kegiatan bongkar muat di pelabuhan",   caption: "Bongkar Muat",         desktopCls: "" },
  { src: "/gallery/afesd-2048x1365.webp",                        alt: "Pengiriman barang BJA Logistic",       caption: "Pengiriman",           desktopCls: "" },
  { src: "/gallery/1fewafd.webp",                                 alt: "Gudang BJA Logistic",                  caption: "Gudang Kami",          desktopCls: "col-span-2" },
  { src: "/gallery/afvsbdbf.webp",                                alt: "Cargo darat BJA Logistic",             caption: "Cargo Darat",          desktopCls: "" },
  { src: "/gallery/fefref.webp",                                  alt: "Proses pengiriman barang",             caption: "Proses Pengiriman",    desktopCls: "" },
  { src: "/gallery/fvsdfvsvdvfsd.webp",                           alt: "Operasional logistik BJA",             caption: "Logistik",             desktopCls: "" },
  { src: "/gallery/regfd.webp",                                   alt: "Armada truk BJA Logistic",             caption: "Cargo Darat",          desktopCls: "" },
  { src: "/gallery/sdfvsd.webp",                                  alt: "Kegiatan pengiriman BJA Logistic",     caption: "Pengiriman",           desktopCls: "col-span-2" },
];

function GalleryItem({ photo, className }: { photo: (typeof photos)[number]; className?: string }) {
  return (
    <div className={`group relative overflow-hidden rounded-2xl bg-gray-100 ${className ?? ""}`}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 50vw, 33vw"
      />
      {/* Dark overlay on hover */}
      <div className="absolute inset-0 bg-[#1A1A1A]/0 group-hover:bg-[#1A1A1A]/50 transition-colors duration-300" />
      {/* Caption badge */}
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <span className="inline-block bg-[#CC1F2A] text-white text-xs font-bold px-3 py-1.5 rounded-lg">
          {photo.caption}
        </span>
      </div>
    </div>
  );
}

export function Gallery() {
  return (
    <section className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[#CC1F2A] font-bold text-sm uppercase tracking-wider mb-2">Galeri</p>
          <h2 className="text-3xl lg:text-4xl font-black text-[#111111]">
            Operasional BJA Logistic
          </h2>
          <p className="text-gray-500 text-lg mt-3 max-w-2xl mx-auto">
            Dari pelabuhan hingga gudang — armada dan fasilitas kami siap melayani pengiriman Anda
          </p>
        </div>

        {/* Desktop grid */}
        <div
          className="hidden lg:grid grid-cols-4 gap-4"
          style={{ gridAutoRows: "220px" }}
        >
          {photos.map((photo) => (
            <GalleryItem
              key={photo.src}
              photo={photo}
              className={photo.desktopCls}
            />
          ))}
        </div>

        {/* Mobile 2-col grid */}
        <div className="grid lg:hidden grid-cols-2 gap-3">
          {photos.map((photo) => (
            <GalleryItem
              key={photo.src}
              photo={photo}
              className="h-44"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

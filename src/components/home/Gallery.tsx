import Image from "next/image";

const photos = [
  {
    src: "/gallery-5.jpg",
    alt: "Kapal container di pelabuhan",
    caption: "Cargo Laut",
    desktopCls: "col-span-2",
  },
  {
    src: "/gallery-1.jpg",
    alt: "Armada truk cargo di jalan raya",
    caption: "Cargo Darat",
    desktopCls: "row-span-2",
  },
  {
    src: "/gallery-2.jpg",
    alt: "Gudang penyimpanan barang BJA",
    caption: "Gudang Kami",
    desktopCls: "",
  },
  {
    src: "/gallery-3.jpg",
    alt: "Cargo udara via pesawat komersial",
    caption: "Cargo Udara",
    desktopCls: "",
  },
  {
    src: "/gallery-4.jpg",
    alt: "Pengiriman ke pelosok Indonesia",
    caption: "Jangkauan Luas",
    desktopCls: "",
  },
  {
    src: "/gallery-6.jpg",
    alt: "Lorong gudang BJA Logistic",
    caption: "Pergudangan Modern",
    desktopCls: "col-span-2",
  },
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

        {/* Desktop bento grid */}
        <div
          className="hidden lg:grid grid-cols-3 gap-4"
          style={{ gridTemplateRows: "260px 200px 200px" }}
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

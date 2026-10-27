import Image from "next/image";
import type { GalleryContent, GalleryPhoto } from "@/lib/homepage/types";
import { cms, type EditProps } from "./cms";

function GalleryItem({ photo, className, edit, path }: { photo: GalleryPhoto; className?: string; path: string } & EditProps) {
  return (
    <div className={`group relative overflow-hidden rounded-2xl bg-gray-100 ${className ?? ""}`} {...cms(edit, path)}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105 group-hover:brightness-75"
        sizes="(max-width: 768px) 50vw, 33vw"
        {...(edit ? { unoptimized: true } : {})}
      />
    </div>
  );
}

export function Gallery({ content, edit }: { content: GalleryContent } & EditProps) {
  return (
    <section className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          {content.eyebrow && (
            <p className="text-[#CC1F2A] font-bold text-sm uppercase tracking-wider mb-2" {...cms(edit, "gallery.eyebrow")}>{content.eyebrow}</p>
          )}
          <h2 className="text-3xl lg:text-4xl font-black text-[#111111]" {...cms(edit, "gallery.title")}>
            {content.title}
          </h2>
          {content.subtitle && (
            <p className="text-gray-500 text-lg mt-3 max-w-2xl mx-auto" {...cms(edit, "gallery.subtitle")}>
              {content.subtitle}
            </p>
          )}
        </div>

        {/* Desktop grid */}
        <div
          className="hidden lg:grid grid-cols-4 gap-4"
          style={{ gridAutoRows: "220px" }}
        >
          {content.photos.map((photo, i) => (
            <GalleryItem
              key={`${i}-${photo.src}`}
              photo={photo}
              className={photo.wide ? "col-span-2" : ""}
              edit={edit}
              path={`gallery.photos.${i}`}
            />
          ))}
        </div>

        {/* Mobile 2-col grid */}
        <div className="m-swipe m-swipe-sm grid lg:hidden grid-cols-2 gap-3">
          {content.photos.map((photo, i) => (
            <GalleryItem
              key={`${i}-${photo.src}`}
              photo={photo}
              className="h-44"
              edit={edit}
              path={`gallery.photos.${i}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

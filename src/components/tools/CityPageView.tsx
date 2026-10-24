import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Clock, CheckCircle, ArrowRight, MapPin, Star, Quote, Scale, Ban, AlertCircle } from "lucide-react";
import { formatPrice } from "@/lib/data/pricing";
import { buildDestinationMessage, buildOngkirMessage } from "@/lib/whatsapp";
import { WALink } from "@/components/ui/WALink";
import { cms } from "@/components/home/cms";
import { sanitizeCityHtml } from "@/lib/safeHtml";
import type { CityPageData } from "@/lib/cityPages";
import { ONGKIR_REGIONS, corporateClients, genericTestimonials, orderSteps, serviceInfo, toSlug, type CityView } from "@/lib/cityPage";

export function CityPageView({ view, data, edit }: { view: CityView; data: CityPageData | null; edit?: boolean }) {
  const { cityLabel, region, relatedCities, cityGroups, validCityValues, lautPrice, cp, primaryPrice, faqs } = view;
  const belowBanner = sanitizeCityHtml(data?.belowBannerContent);
  const servedCities = (data?.servedCities ?? []).filter((c) => typeof c === "string" && c.trim() !== "");
  const popup = data?.popupInfo?.enabled
    ? {
        minKg: data.popupInfo.minKg || cp.minWeightKg,
        restrictedItems: (data.popupInfo.restrictedItems ?? []).filter((x) => typeof x === "string" && x.trim() !== ""),
      }
    : null;
  const hasApiTestimonials = !!data && data.testimonials.length > 0;
  const hasApiFaqs = !!data?.faqs && data.faqs.length > 0;

  return (
    <>
      <div className={`relative py-8 px-4 overflow-hidden ${data?.imageBanner ? "" : "bg-[#CC1F2A]"}`} {...cms(edit, "imageBanner")}>
        {data?.imageBanner && (
          <>
            <Image
              src={data.imageBanner}
              alt={`Banner ${cityLabel}`}
              fill
              priority
              sizes="100vw"
              className="object-cover"
              unoptimized={edit}
            />
            <div className="absolute inset-0 bg-[#CC1F2A]/80" />
          </>
        )}
        <div className="max-w-5xl mx-auto relative">
          <div className="flex items-center gap-2 mb-3">
            <Link href="/cargo" className="text-white/60 text-sm hover:text-white">Cargo</Link>
            <span className="text-white/40 text-sm">›</span>
            {region && (
              <>
                {ONGKIR_REGIONS.has(region.toLowerCase()) ? (
                  <Link
                    href={`/cargo/${region.toLowerCase()}`}
                    className="text-[#F5C518] text-sm font-semibold hover:underline"
                  >
                    {region}
                  </Link>
                ) : (
                  <span className="text-[#F5C518] text-sm font-semibold">{region}</span>
                )}
                <span className="text-white/40 text-sm">›</span>
              </>
            )}
            <span className="text-white text-sm font-bold">{cityLabel}</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#F5C518] flex items-center justify-center shrink-0">
                  <MapPin size={20} className="text-[#1A1A1A]" />
                </div>
                {region && <span className="text-white/70 text-sm font-semibold" {...cms(edit, "region")}>{region}</span>}
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white mb-3 leading-tight" {...cms(edit, "city")}>
                Ekspedisi Cargo<br />ke {cityLabel}
              </h1>
              <p className="text-white/70 text-sm mb-5">
                Ekspedisi cargo Jakarta ke {cityLabel}: kirim barang mulai dari{" "}
                <strong className="text-[#F5C518]">
                  {`Rp ${primaryPrice.toLocaleString("id-ID")}/kg`}
                </strong>{" "}
                via cargo laut, minimal {cp.minWeightKg} kg. Door to door dari Jabodetabek & Surabaya.
              </p>
              <div className="flex flex-wrap gap-3">
                <WALink
                  href={buildDestinationMessage(cityLabel)}
                  className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20bc59] text-white font-black px-6 py-3.5 rounded-xl transition-all hover:shadow-lg text-base"
                >
                  <MessageCircle size={18} />
                  Tanya Harga ke {cityLabel}
                </WALink>
                <Link
                  href="/cek-ongkir"
                  className="flex items-center gap-2 border-2 border-white/30 text-white hover:bg-white/10 font-bold px-6 py-3.5 rounded-xl transition-all text-base"
                >
                  Hitung Ongkir <ArrowRight size={16} />
                </Link>
              </div>
            </div>

              <div className="shrink-0 lg:pl-10">
              <p className="text-[#F5C518] text-xs sm:text-sm font-bold uppercase tracking-wide mb-5 text-center lg:text-left">
                Estimasi Ongkir ke {cityLabel}
              </p>
              <div className="flex flex-col gap-6">
                {[
                  {
                    label: "Reguler",
                    price: cp.regulerPrice,
                    available: cp.regulerPrice !== null,
                  },
                  {
                    label: "Express",
                    price: cp.expressPrice,
                    available: cp.expressPrice !== null,
                  },
                ].map((s) => (
                  <div key={s.label} className="relative" {...cms(edit, s.label === "Reguler" ? "priceRegular" : "priceExpress")}>
                    <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-[#CC1F2A] z-10" />
                    <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#F5C518] z-20" />
                    <div className="bg-white rounded-full pl-16 pr-10 py-4 flex items-center gap-3 shadow-lg min-w-[320px]">
                      <span className="font-black text-[#111111] text-lg sm:text-xl whitespace-nowrap">
                        {s.label} →
                      </span>
                      {s.available && s.price !== null ? (
                        <span className="text-[#CC1F2A] font-black text-lg sm:text-xl whitespace-nowrap">
                          Rp {s.price.toLocaleString("id-ID")}/kg
                        </span>
                      ) : (
                        <span className="text-gray-500 font-bold text-sm sm:text-base">
                          Layanan tidak tersedia untuk tujuan ini
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-8 pt-6 border-t border-white/10 text-white/80 text-xs sm:text-sm">
            <span className="flex items-center gap-1.5" {...cms(edit, "minWeightKg")}>
              <Scale size={14} className="text-[#F5C518] shrink-0" />
              Minimal pengiriman {cp.minWeightKg} kg
            </span>
            <span className="flex items-center gap-1.5">
              <Ban size={14} className="text-[#F5C518] shrink-0" />
              Tidak menerima pengiriman hewan & frozen food
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12 space-y-14">
        {popup && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4" {...cms(edit, "popupInfo")}>
            <div className="flex items-start gap-3">
              <AlertCircle size={18} className="text-amber-700 shrink-0 mt-0.5" />
              <div>
                <p className="font-black text-amber-950 text-sm mb-1">Info Penting Pengiriman ke {cityLabel}</p>
                <p className="text-sm text-amber-900 leading-relaxed">Minimal pengiriman {popup.minKg} kg.</p>
                {popup.restrictedItems.length > 0 && (
                  <>
                    <p className="text-sm text-amber-900 leading-relaxed mt-2">Barang yang tidak bisa dikirim ke {cityLabel}:</p>
                    <ul className="mt-1 flex flex-wrap gap-2">
                      {popup.restrictedItems.map((item, i) => (
                        <li key={`${item}-${i}`} className="bg-white border border-amber-200 text-amber-900 text-xs font-semibold px-3 py-1 rounded-full">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {belowBanner && (
          <div
            className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 prose prose-gray max-w-none [&>*:first-child]:mt-0"
            {...cms(edit, "belowBannerContent")}
            dangerouslySetInnerHTML={{ __html: belowBanner }}
          />
        )}

        <div>
          <h2 className="text-2xl font-black text-[#111111] mb-2">Ongkir Cargo ke {cityLabel}: Pilih Layanan</h2>
          <p className="text-gray-500 mb-8">Estimasi harga berdasarkan tarif per kg. Harga final menyesuaikan berat & volume aktual.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {serviceInfo.map((svc) => {
              const isExpress = svc.type === "express";
              const price = isExpress ? cp.expressPrice : cp.regulerPrice;
              const etaMin = isExpress ? cp.expressEtaMin : cp.regulerEtaMin;
              const etaMax = isExpress ? cp.expressEtaMax : cp.regulerEtaMax;

              const isAvailable =
                price !== null && etaMin !== null && etaMax !== null;

              if (!isAvailable) {
                return (
                  <div
                    key={svc.type}
                    className={`rounded-2xl border-2 p-6 ${svc.color}`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <svc.icon size={22} className={svc.iconColor} />
                      <h3 className="font-black text-[#111111]">{svc.label}</h3>
                    </div>

                    <div className="rounded-xl border border-dashed border-gray-300 bg-white/70 p-5">
                      <div className="flex items-start gap-3">
                        <AlertCircle
                          size={18}
                          className="text-gray-400 shrink-0 mt-0.5"
                        />
                        <div>
                          <p className="font-bold text-gray-700 mb-1">
                            Layanan tidak tersedia
                          </p>
                          <p className="text-sm text-gray-500 leading-relaxed">
                            {svc.label} saat ini tidak tersedia untuk tujuan {cityLabel}.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              const waMsg = buildOngkirMessage(
                "Jabodetabek",
                cityLabel,
                cp.minWeightKg,
                svc.label,
                formatPrice(price * 100)
              );

              return (
                <div key={svc.type} className={`rounded-2xl border-2 p-6 ${svc.color}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <svc.icon size={22} className={svc.iconColor} />
                    <h3 className="font-black text-[#111111]">{svc.label}</h3>
                  </div>
                  <div className="mb-5">
                    <p className="text-3xl font-black text-[#111111] leading-none">
                      {formatPrice(price)}
                      <span className="text-base font-bold text-gray-500">/kg</span>
                    </p>

                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="rounded-xl bg-white/80 border border-gray-200 px-4 py-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Scale size={15} className="text-[#CC1F2A] shrink-0" />
                          <span className="text-xs font-bold uppercase tracking-wide text-gray-500">
                            Minimum
                          </span>
                        </div>
                        <p className="text-base font-black text-[#111111]">
                          {cp.minWeightKg} kg
                        </p>
                      </div>

                      <div className="rounded-xl bg-white/80 border border-gray-200 px-4 py-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Clock size={15} className="text-[#CC1F2A] shrink-0" />
                          <span className="text-xs font-bold uppercase tracking-wide text-gray-500">
                            Estimasi
                          </span>
                        </div>
                        <p className="text-base font-black text-[#111111]">
                          {etaMin}–{etaMax} hari*
                        </p>
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-1.5 mb-5">
                    {svc.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle size={13} className="text-green-500 shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <WALink
                    href={waMsg}
                    className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20bc59] text-white font-bold py-2.5 rounded-xl transition-colors text-sm"
                  >
                    <MessageCircle size={14} />
                    Pesan {svc.label}
                  </WALink>
                </div>
              );
            })}
          </div>
          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4">
            <div className="flex items-start gap-3">
              <AlertCircle
                size={18}
                className="text-amber-700 shrink-0 mt-0.5"
              />
              <div>
                <p className="font-black text-amber-950 text-sm mb-1">
                  Catatan estimasi pengiriman
                </p>
                <p className="text-sm text-amber-900 leading-relaxed">
                  Estimasi waktu dihitung sejak kapal berangkat dari pelabuhan asal,
                  bukan sejak barang dipesan atau di-pickup. Jadwal kapal dapat berubah
                  karena kondisi operasional, cuaca, pelabuhan, atau perjalanan.
                  Pastikan konfirmasi jadwal kapal terdekat ke CS BJA Logistic sebelum
                  melakukan pengiriman.
                </p>
              </div>
            </div>
          </div>
        </div>

        {servedCities.length > 0 && (
          <div {...cms(edit, "servedCities")}>
            <h2 className="text-2xl font-black text-[#111111] mb-6">
              Area yang Dilayani di {cityLabel}
            </h2>
            <div className="flex flex-wrap gap-2">
              {servedCities.map((area, i) => (
                <span
                  key={`${area}-${i}`}
                  className="flex items-center gap-1.5 bg-white border border-gray-200 text-gray-700 text-sm font-semibold px-3.5 py-2 rounded-xl"
                >
                  <MapPin size={13} className="text-[#CC1F2A]" />
                  {area}
                </span>
              ))}
            </div>
          </div>
        )}

        {data && data.services.length > 0 && (
          <div>
            <h2 className="text-2xl font-black text-[#111111] mb-6">
              Layanan Pengiriman ke {cityLabel}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {data.services.map((svc, i) => (
                <div key={`${svc.title}-${i}`} className="bg-white border border-gray-200 rounded-2xl p-6" {...cms(edit, `services.${i}`)}>
                  <h3 className="font-black text-[#111111] mb-2">{svc.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{svc.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-[#F8FAFC] rounded-3xl p-8">
          <h2 className="text-2xl font-black text-[#111111] mb-6">
            Mengapa Pilih BJA untuk Pengiriman ke {cityLabel}?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              {
                title: "10+ Tahun Pengalaman",
                desc: region
                  ? `Kami telah melayani pengiriman ke ${cityLabel} dan seluruh ${region} selama lebih dari 10 tahun.`
                  : `Kami telah melayani pengiriman ke ${cityLabel} selama lebih dari 10 tahun.`,
              },
              { title: "Jaringan Agen Lokal", desc: `Agen dan mitra lokal di ${cityLabel} memastikan pengiriman selesai hingga ke alamat tujuan.` },
              { title: "Tracking Real-Time", desc: "Pantau status pengiriman Anda kapan saja via WhatsApp atau halaman tracking kami." },
              { title: "Harga Kompetitif", desc: `Tarif pengiriman ke ${cityLabel} mulai ${formatPrice(lautPrice.priceMin)}/kg — salah satu yang paling kompetitif.` },
            ].map((item) => (
              <div key={item.title} className="flex gap-3">
                <CheckCircle size={18} className="text-[#CC1F2A] shrink-0 mt-0.5" />
                <div>
                  <p className="font-black text-[#111111] mb-0.5">{item.title}</p>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="text-center mb-6">
            <p className="text-sm text-gray-500 mb-1">Dipercaya oleh perusahaan-perusahaan terkemuka</p>
            <h2 className="text-2xl font-black text-[#111111]">Klien Corporate Kami</h2>
          </div>
          <div className="bg-[#F8FAFC] rounded-3xl p-8">
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
              {corporateClients.map((client) => (
                <div key={client.alt} className="bg-white border border-gray-200 rounded-xl h-20 relative p-3">
                  <Image src={client.src} alt={client.alt} fill className="object-contain" sizes="120px" />
                </div>
              ))}
            </div>
          </div>
          <p className="text-center text-gray-400 text-xs mt-4">+ ratusan klien UKM & perorangan lainnya</p>
        </div>

        <div>
          <h2 className="text-2xl font-black text-[#111111] mb-6 text-center">
            Cara Kirim Barang ke {cityLabel}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
            {orderSteps.map((step, i) => (
              <div key={step.title} className="text-center">
                <div className="w-12 h-12 rounded-xl bg-[#CC1F2A]/10 flex items-center justify-center mx-auto mb-3">
                  <step.icon size={22} className="text-[#CC1F2A]" />
                </div>
                <p className="text-xs text-gray-400 font-bold mb-1">Langkah {i + 1}</p>
                <p className="font-black text-[#111111] mb-1">{step.title}</p>
                <p className="text-gray-500 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="text-center mb-8">
            <p className="text-sm font-bold text-[#CC1F2A] mb-2">TESTIMONI</p>
            <h2 className="text-2xl font-black text-[#111111] mb-2">
              {data && data.testimonials.length > 0
                ? `Apa Kata Pelanggan Kami di ${cityLabel}`
                : "Apa Kata Pelanggan Kami"}
            </h2>
            <p className="text-gray-500">Ribuan pelanggan sudah merasakan manfaat layanan kami</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {(data && data.testimonials.length > 0
              ? data.testimonials.map((t) => ({
                  name: t.name,
                  initial: t.name.charAt(0).toUpperCase(),
                  role: "",
                  quote: t.message,
                  rating: t.rating,
                }))
              : genericTestimonials.map((t) => ({ ...t, rating: 5 }))
            ).map((t, i) => (
              <div key={`${t.name}-${i}`} className="bg-[#F8FAFC] rounded-2xl p-6 relative overflow-hidden" {...cms(edit, hasApiTestimonials ? `testimonials.${i}` : "testimonials")}>
                <Quote size={36} className="absolute top-5 right-5 text-[#CC1F2A]/10" />
                <div className="flex gap-0.5 mb-3 relative">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={16} className="text-[#F5C518] fill-[#F5C518]" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 relative">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3 relative">
                  <div className="w-9 h-9 rounded-full bg-[#CC1F2A]/10 flex items-center justify-center font-black text-[#CC1F2A] text-sm shrink-0">
                    {t.initial}
                  </div>
                  <div>
                    <p className="font-bold text-[#111111] text-sm">{t.name}</p>
                    {t.role && <p className="text-gray-500 text-xs">{t.role}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {cityGroups.length > 0 && (
          <div>
            <h2 className="text-2xl font-black text-[#111111] mb-6">
              Kota yang Dilayani di {region}
            </h2>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {cityGroups.map((group, gi) => (
                <div key={group.groupLabel} className={gi > 0 ? "border-t border-gray-100" : ""}>
                  <p className="text-[11px] font-black text-gray-400 uppercase tracking-wider px-5 pt-4 pb-2 flex items-center gap-1.5">
                    <MapPin size={11} />
                    {group.groupLabel}
                  </p>
                  <div className="px-5 pb-4 flex flex-wrap gap-2">
                    {group.cities.map((c) =>
                      validCityValues.has(c.value) ? (
                        <Link
                          key={c.value}
                          href={`/kirim-ke/${toSlug(c.value)}`}
                          className="bg-[#F8FAFC] border border-gray-200 hover:border-[#CC1F2A] hover:text-[#CC1F2A] text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full transition-colors"
                        >
                          {c.label}
                        </Link>
                      ) : (
                        <span
                          key={c.value}
                          className="bg-[#F8FAFC] border border-gray-200 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full"
                        >
                          {c.label}
                        </span>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {relatedCities.length > 0 && (
          <div>
            <h2 className="text-2xl font-black text-[#111111] mb-6">
              Kota Lain di {region}
            </h2>
            <div className="flex flex-wrap gap-3">
              {relatedCities.map((c) => (
                <Link
                  key={c.value}
                  href={`/kirim-ke/${toSlug(c.value)}`}
                  className="flex items-center gap-2 bg-white border border-gray-200 hover:border-[#CC1F2A] hover:text-[#CC1F2A] rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 transition-all"
                >
                  <MapPin size={13} />
                  Kirim ke {c.label}
                  <ArrowRight size={12} />
                </Link>
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="text-2xl font-black text-[#111111] mb-6">
            FAQ Pengiriman ke {cityLabel}
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details key={`${faq.q}-${i}`} className="group bg-white border border-gray-200 rounded-xl overflow-hidden" {...cms(edit, hasApiFaqs ? `faqs.${i}` : "faqs")}>
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer font-bold text-[#111111] list-none hover:bg-gray-50 transition-colors">
                  {faq.q}
                  <span className="ml-4 shrink-0 text-gray-400 group-open:rotate-180 transition-transform duration-200">▼</span>
                </summary>
                <div className="px-6 pb-5 pt-1 text-gray-600 text-sm leading-relaxed border-t border-gray-100">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>

        <div className="bg-[#CC1F2A] rounded-3xl p-8 text-center">
          <h2 className="text-2xl font-black text-white mb-3">Siap Kirim Cargo ke {cityLabel}?</h2>
          <p className="text-white/70 mb-6">Chat WhatsApp sekarang — tim kami konfirmasi harga & jadwal dalam hitungan menit.</p>
          <WALink
            href={buildDestinationMessage(cityLabel)}
            className="inline-flex items-center gap-2 bg-[#F5C518] hover:bg-[#D4A910] text-[#1A1A1A] font-black px-8 py-4 rounded-xl transition-all hover:shadow-lg text-base"
          >
            <MessageCircle size={18} />
            Chat Sekarang — Kirim ke {cityLabel}
          </WALink>
        </div>
      </div>
    </>
  );
}

import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Clock, CheckCircle, ArrowRight, MapPin, Star, Quote, Scale, Ban, AlertCircle } from "lucide-react";
import { formatPrice } from "@/lib/data/pricing";
import { buildDestinationMessage, buildOngkirMessage } from "@/lib/whatsapp";
import { WALink } from "@/components/ui/WALink";
import { cms } from "@/components/home/cms";
import { sanitizeCityHtml } from "@/lib/safeHtml";
import type { CityPageData } from "@/lib/cityPages";
import { ONGKIR_REGIONS, serviceInfo, toSlug, type CityView } from "@/lib/cityPage";
import type { KotaSection } from "@/lib/sitePages/kotaTemplate";
import { TOOL_ICONS } from "./ToolHero";
import { ExpandableHtml } from "@/components/ui/ExpandableHtml";

export type CityEditMode = "city" | "template";

function Sec({ on, id, children }: { on: boolean; id: KotaSection; children: React.ReactNode }) {
  return on ? <div data-cms-section={id}>{children}</div> : <>{children}</>;
}

function Lines({ text }: { text: string }) {
  const parts = text.split("\n");
  return (
    <>
      {parts.map((line, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          {line}
        </Fragment>
      ))}
    </>
  );
}

export function CityPageView({ view, data, edit }: { view: CityView; data: CityPageData | null; edit?: CityEditMode | boolean }) {
  const { cityLabel, region, relatedCities, cityGroups, validCityValues, cp, faqs, tpl, t } = view;
  const mode: CityEditMode | null = edit === true ? "city" : edit || null;
  const c = (path: string) => cms(mode === "city", path);
  const p = (path: string) => cms(mode === "template", path);

  const belowBanner = sanitizeCityHtml(data?.belowBannerContent);
  const servedCities = (data?.servedCities ?? []).filter((x) => typeof x === "string" && x.trim() !== "");
  const popup = data?.popupInfo?.enabled
    ? {
        minKg: data.popupInfo.minKg || cp.minWeightKg,
        restrictedItems: (data.popupInfo.restrictedItems ?? []).filter((x) => typeof x === "string" && x.trim() !== ""),
      }
    : null;
  const hasApiTestimonials = !!data && data.testimonials.length > 0;
  const hasApiFaqs = !!data?.faqs && data.faqs.length > 0;
  const hidden = new Set(tpl.hidden);

  const heroDesc = tpl.hero.description.split(/(\{harga\}(?:\/kg)?)/);

  const sections: Record<Exclude<KotaSection, "hero" | "info">, () => React.ReactNode> = {
    services: () => (
      <div>
        <h2 className="text-2xl font-black text-[#111111] mb-2" {...p("services.title")}>{t(tpl.services.title)}</h2>
        <p className="text-gray-500 mb-8" {...p("services.description")}>{t(tpl.services.description)}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {serviceInfo.map((svc) => {
            const isExpress = svc.type === "express";
            const copy = isExpress ? tpl.services.express : tpl.services.reguler;
            const price = isExpress ? cp.expressPrice : cp.regulerPrice;
            const etaMin = isExpress ? cp.expressEtaMin : cp.regulerEtaMin;
            const etaMax = isExpress ? cp.expressEtaMax : cp.regulerEtaMax;
            const isAvailable = price !== null && etaMin !== null && etaMax !== null;
            const svcVars = { layanan: copy.label };

            if (!isAvailable) {
              return (
                <div key={svc.type} className={`rounded-2xl border-2 p-6 ${svc.color}`} {...p("services.unavailableText")}>
                  <div className="flex items-center gap-3 mb-4">
                    <svc.icon size={22} className={svc.iconColor} />
                    <h3 className="font-black text-[#111111]">{copy.label}</h3>
                  </div>
                  <div className="rounded-xl border border-dashed border-gray-300 bg-white/70 p-5">
                    <div className="flex items-start gap-3">
                      <AlertCircle size={18} className="text-gray-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-gray-700 mb-1">{t(tpl.services.unavailableTitle, svcVars)}</p>
                        <p className="text-sm text-gray-500 leading-relaxed">{t(tpl.services.unavailableText, svcVars)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            const waMsg = buildOngkirMessage("Jabodetabek", cityLabel, cp.minWeightKg, copy.label, formatPrice(price * 100));

            return (
              <div key={svc.type} className={`rounded-2xl border-2 p-6 ${svc.color}`} {...p(`services.${svc.type}.label`)}>
                <div className="flex items-center gap-3 mb-4">
                  <svc.icon size={22} className={svc.iconColor} />
                  <h3 className="font-black text-[#111111]">{copy.label}</h3>
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
                        <span className="text-xs font-bold uppercase tracking-wide text-gray-500">Minimum</span>
                      </div>
                      <p className="text-base font-black text-[#111111]">{cp.minWeightKg} kg</p>
                    </div>
                    <div className="rounded-xl bg-white/80 border border-gray-200 px-4 py-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock size={15} className="text-[#CC1F2A] shrink-0" />
                        <span className="text-xs font-bold uppercase tracking-wide text-gray-500">Estimasi</span>
                      </div>
                      <p className="text-base font-black text-[#111111]">
                        {etaMin}–{etaMax} hari*
                      </p>
                    </div>
                  </div>
                </div>
                <ul className="space-y-1.5 mb-5">
                  {copy.highlights.map((h, i) => (
                    <li key={`${h}-${i}`} className="flex items-center gap-2 text-sm text-gray-600" {...p(`services.${svc.type}.highlights.${i}`)}>
                      <CheckCircle size={13} className="text-green-500 shrink-0" />
                      {t(h, svcVars)}
                    </li>
                  ))}
                </ul>
                <WALink
                  href={waMsg}
                  className="flex items-center justify-center gap-2 w-full bg-[#15803D] hover:bg-[#166534] text-white font-bold py-2.5 rounded-xl transition-colors text-sm"
                >
                  <MessageCircle size={14} />
                  {t(tpl.services.orderLabel, svcVars)}
                </WALink>
              </div>
            );
          })}
        </div>
        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4" {...p("services.noteText")}>
          <div className="flex items-start gap-3">
            <AlertCircle size={18} className="text-amber-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-black text-amber-950 text-sm mb-1">{t(tpl.services.noteTitle)}</p>
              <p className="text-sm text-amber-900 leading-relaxed">{t(tpl.services.noteText)}</p>
            </div>
          </div>
        </div>
      </div>
    ),

    served: () =>
      servedCities.length > 0 && (
        <div {...c("servedCities")}>
          <h2 className="text-2xl font-black text-[#111111] mb-6" {...p("served.title")}>{t(tpl.served.title)}</h2>
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
      ),

    cityServices: () =>
      data &&
      data.services.length > 0 && (
        <div>
          <h2 className="text-2xl font-black text-[#111111] mb-6" {...p("cityServices.title")}>{t(tpl.cityServices.title)}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {data.services.map((svc, i) => (
              <div key={`${svc.title}-${i}`} className="bg-white border border-gray-200 rounded-2xl p-6" {...c(`services.${i}`)}>
                <h3 className="font-black text-[#111111] mb-2">{svc.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{svc.description}</p>
              </div>
            ))}
          </div>
        </div>
      ),

    why: () =>
      tpl.why.items.length > 0 && (
        <div className="bg-[#F8FAFC] rounded-3xl p-8">
          <h2 className="text-2xl font-black text-[#111111] mb-6" {...p("why.title")}>{t(tpl.why.title)}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {tpl.why.items.map((item, i) => (
              <div key={`${item.title}-${i}`} className="flex gap-3" {...p(`why.items.${i}`)}>
                <CheckCircle size={18} className="text-[#CC1F2A] shrink-0 mt-0.5" />
                <div>
                  <p className="font-black text-[#111111] mb-0.5">{t(item.title)}</p>
                  <p className="text-gray-500 text-sm">{t(item.desc)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),

    clients: () => (
      <div>
        <div className="text-center mb-6">
          <p className="text-sm text-gray-500 mb-1" {...p("clients.subtitle")}>{t(tpl.clients.subtitle)}</p>
          <h2 className="text-2xl font-black text-[#111111]" {...p("clients.title")}>{t(tpl.clients.title)}</h2>
        </div>
        {tpl.clients.logos.length > 0 && (
          <div className="bg-[#F8FAFC] rounded-3xl p-8">
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
              {tpl.clients.logos.map((client, i) => (
                <div key={`${client.src}-${i}`} className="bg-white border border-gray-200 rounded-xl h-20 relative p-3" {...p(`clients.logos.${i}`)}>
                  <Image src={client.src} alt={client.alt} fill className="object-contain" sizes="120px" unoptimized={mode !== null} />
                </div>
              ))}
            </div>
          </div>
        )}
        {tpl.clients.footnote && (
          <p className="text-center text-gray-400 text-xs mt-4" {...p("clients.footnote")}>{t(tpl.clients.footnote)}</p>
        )}
      </div>
    ),

    steps: () =>
      tpl.steps.items.length > 0 && (
        <div>
          <h2 className="text-2xl font-black text-[#111111] mb-6 text-center" {...p("steps.title")}>{t(tpl.steps.title)}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
            {tpl.steps.items.map((step, i) => {
              const Icon = TOOL_ICONS[step.icon] ?? CheckCircle;
              return (
                <div key={`${step.title}-${i}`} className="text-center" {...p(`steps.items.${i}`)}>
                  <div className="w-12 h-12 rounded-xl bg-[#CC1F2A]/10 flex items-center justify-center mx-auto mb-3">
                    <Icon size={22} className="text-[#CC1F2A]" />
                  </div>
                  <p className="text-xs text-gray-400 font-bold mb-1">Langkah {i + 1}</p>
                  <p className="font-black text-[#111111] mb-1">{t(step.title)}</p>
                  <p className="text-gray-500 text-sm">{t(step.desc)}</p>
                </div>
              );
            })}
          </div>
        </div>
      ),

    testimonials: () => {
      const items = hasApiTestimonials
        ? data!.testimonials.map((x) => ({ name: x.name, initial: x.name.charAt(0).toUpperCase(), role: "", quote: x.message, rating: x.rating }))
        : tpl.testimonials.items.map((x) => ({ name: x.name, initial: x.name.charAt(0).toUpperCase(), role: x.role, quote: t(x.quote), rating: 5 }));
      if (items.length === 0) return null;
      return (
        <div>
          <div className="text-center mb-8">
            <p className="text-sm font-bold text-[#CC1F2A] mb-2" {...p("testimonials.label")}>{t(tpl.testimonials.label)}</p>
            <h2 className="text-2xl font-black text-[#111111] mb-2" {...p(hasApiTestimonials ? "testimonials.titleCity" : "testimonials.titleGeneric")}>
              {t(hasApiTestimonials ? tpl.testimonials.titleCity : tpl.testimonials.titleGeneric)}
            </h2>
            <p className="text-gray-500" {...p("testimonials.subtitle")}>{t(tpl.testimonials.subtitle)}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {items.map((x, i) => (
              <div
                key={`${x.name}-${i}`}
                className="bg-[#F8FAFC] rounded-2xl p-6 relative overflow-hidden"
                {...c(hasApiTestimonials ? `testimonials.${i}` : "testimonials")}
                {...p(hasApiTestimonials ? "testimonials.titleCity" : `testimonials.items.${i}`)}
              >
                <Quote size={36} className="absolute top-5 right-5 text-[#CC1F2A]/10" />
                <div className="flex gap-0.5 mb-3 relative">
                  {Array.from({ length: x.rating }).map((_, j) => (
                    <Star key={j} size={16} className="text-[#F5C518] fill-[#F5C518]" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 relative">&ldquo;{x.quote}&rdquo;</p>
                <div className="flex items-center gap-3 relative">
                  <div className="w-9 h-9 rounded-full bg-[#CC1F2A]/10 flex items-center justify-center font-black text-[#CC1F2A] text-sm shrink-0">
                    {x.initial}
                  </div>
                  <div>
                    <p className="font-bold text-[#111111] text-sm">{x.name}</p>
                    {x.role && <p className="text-gray-500 text-xs">{x.role}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    },

    cities: () =>
      cityGroups.length > 0 && (
        <div>
          <h2 className="text-2xl font-black text-[#111111] mb-6" {...p("cities.title")}>{t(tpl.cities.title)}</h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {cityGroups.map((group, gi) => (
              <div key={group.groupLabel} className={gi > 0 ? "border-t border-gray-100" : ""}>
                <p className="text-[11px] font-black text-gray-400 uppercase tracking-wider px-5 pt-4 pb-2 flex items-center gap-1.5">
                  <MapPin size={11} />
                  {group.groupLabel}
                </p>
                <div className="px-5 pb-4 flex flex-wrap gap-2">
                  {group.cities.map((x) =>
                    validCityValues.has(x.value) ? (
                      <Link
                        key={x.value}
                        href={`/kirim-ke/${toSlug(x.value)}`}
                        className="bg-[#F8FAFC] border border-gray-200 hover:border-[#CC1F2A] hover:text-[#CC1F2A] text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full transition-colors"
                      >
                        {x.label}
                      </Link>
                    ) : (
                      <span key={x.value} className="bg-[#F8FAFC] border border-gray-200 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full">
                        {x.label}
                      </span>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ),

    related: () =>
      relatedCities.length > 0 && (
        <div>
          <h2 className="text-2xl font-black text-[#111111] mb-6" {...p("related.title")}>{t(tpl.related.title)}</h2>
          <div className="flex flex-wrap gap-3" {...p("related.linkPrefix")}>
            {relatedCities.map((x) => (
              <Link
                key={x.value}
                href={`/kirim-ke/${toSlug(x.value)}`}
                className="flex items-center gap-2 bg-white border border-gray-200 hover:border-[#CC1F2A] hover:text-[#CC1F2A] rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 transition-all"
              >
                <MapPin size={13} />
                {`${t(tpl.related.linkPrefix)} ${x.label}`.trim()}
                <ArrowRight size={12} />
              </Link>
            ))}
          </div>
        </div>
      ),

    faq: () =>
      faqs.length > 0 && (
        <div>
          <h2 className="text-2xl font-black text-[#111111] mb-6" {...p("faq.title")}>{t(tpl.faq.title)}</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details
                key={`${faq.q}-${i}`}
                className="group bg-white border border-gray-200 rounded-xl overflow-hidden"
                {...c(hasApiFaqs ? `faqs.${i}` : "faqs")}
                {...p(hasApiFaqs ? "faq.title" : `faq.items.${i}`)}
              >
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer font-bold text-[#111111] list-none hover:bg-gray-50 transition-colors">
                  {faq.q}
                  <span className="ml-4 shrink-0 text-gray-400 group-open:rotate-180 transition-transform duration-200">▼</span>
                </summary>
                <div className="px-6 pb-5 pt-1 text-gray-600 text-sm leading-relaxed border-t border-gray-100">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      ),

    cta: () => (
      <div className="bg-[#CC1F2A] rounded-3xl p-8 text-center">
        <h2 className="text-2xl font-black text-white mb-3" {...p("cta.title")}>{t(tpl.cta.title)}</h2>
        <p className="text-white/70 mb-6" {...p("cta.description")}>{t(tpl.cta.description)}</p>
        <WALink
          href={buildDestinationMessage(cityLabel)}
          className="inline-flex items-center gap-2 bg-[#F5C518] hover:bg-[#D4A910] text-[#1A1A1A] font-black px-8 py-4 rounded-xl transition-all hover:shadow-lg text-base"
        >
          <MessageCircle size={18} />
          <span {...p("cta.waLabel")}>{t(tpl.cta.waLabel)}</span>
        </WALink>
      </div>
    ),
  };

  return (
    <>
      <Sec on={mode === "template"} id="hero">
        <div className={`relative py-8 px-4 overflow-hidden ${data?.imageBanner ? "" : "bg-[#CC1F2A]"}`} {...c("imageBanner")}>
          {data?.imageBanner && (
            <>
              <Image src={data.imageBanner} alt={`Banner ${cityLabel}`} fill priority sizes="100vw" className="object-cover" unoptimized={mode !== null} />
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
                    <Link href={`/cargo/${region.toLowerCase()}`} className="text-[#F5C518] text-sm font-semibold hover:underline">
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
                  {region && <span className="text-white/70 text-sm font-semibold" {...c("region")}>{region}</span>}
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-white mb-3 leading-tight" {...c("city")} {...p("hero.title")}>
                  <Lines text={t(tpl.hero.title)} />
                </h1>
                <p className="text-white/70 text-sm mb-5" {...p("hero.description")}>
                  {heroDesc.map((part, i) =>
                    i % 2 === 1 ? (
                      <strong key={i} className="text-[#F5C518]">
                        {t(part)}
                      </strong>
                    ) : (
                      <Fragment key={i}>{t(part)}</Fragment>
                    )
                  )}
                </p>
                <div className="flex flex-wrap gap-3">
                  <WALink
                    href={buildDestinationMessage(cityLabel)}
                    className="flex items-center gap-2 bg-[#15803D] hover:bg-[#166534] text-white font-black px-6 py-3.5 rounded-xl transition-all hover:shadow-lg text-base"
                  >
                    <MessageCircle size={18} />
                    <span {...p("hero.waLabel")}>{t(tpl.hero.waLabel)}</span>
                  </WALink>
                  <Link
                    href="/cek-ongkir"
                    className="flex items-center gap-2 border-2 border-white/30 text-white hover:bg-white/10 font-bold px-6 py-3.5 rounded-xl transition-all text-base"
                  >
                    <span {...p("hero.calcLabel")}>{t(tpl.hero.calcLabel)}</span> <ArrowRight size={16} />
                  </Link>
                </div>
              </div>

              <div className="shrink-0 lg:pl-10">
                <p className="text-[#F5C518] text-xs sm:text-sm font-bold uppercase tracking-wide mb-5 text-center lg:text-left" {...p("hero.priceTitle")}>
                  {t(tpl.hero.priceTitle)}
                </p>
                <div className="flex flex-col gap-4 sm:gap-6 pl-6 lg:pl-0">
                  {[
                    { label: "Reguler", price: cp.regulerPrice },
                    { label: "Express", price: cp.expressPrice },
                  ].map((s) => (
                    <div key={s.label} className="relative" {...c(s.label === "Reguler" ? "priceRegular" : "priceExpress")}>
                      <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-[#CC1F2A] z-10" />
                      <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#F5C518] z-20" />
                      <div className="bg-white rounded-full pl-10 pr-6 py-3 sm:pl-16 sm:pr-10 sm:py-4 flex items-center gap-2 sm:gap-3 shadow-lg sm:min-w-[320px]">
                        <span className="font-black text-[#111111] text-lg sm:text-xl whitespace-nowrap">{s.label} →</span>
                        {s.price !== null ? (
                          <span className="text-[#CC1F2A] font-black text-lg sm:text-xl whitespace-nowrap">
                            Rp {s.price.toLocaleString("id-ID")}/kg
                          </span>
                        ) : (
                          <span className="text-gray-500 font-bold text-sm sm:text-base">Layanan tidak tersedia untuk tujuan ini</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-8 pt-6 border-t border-white/10 text-white/80 text-xs sm:text-sm">
              <span className="flex items-center gap-1.5" {...c("minWeightKg")}>
                <Scale size={14} className="text-[#F5C518] shrink-0" />
                Minimal pengiriman {cp.minWeightKg} kg
              </span>
              {tpl.hero.notice.trim() !== "" && (
                <span className="flex items-center gap-1.5" {...p("hero.notice")}>
                  <Ban size={14} className="text-[#F5C518] shrink-0" />
                  {t(tpl.hero.notice)}
                </span>
              )}
            </div>
          </div>
        </div>
      </Sec>

      <div className="max-w-5xl mx-auto px-4 py-12 space-y-14">
        {(popup || belowBanner || mode === "template") && (
          <Sec on={mode === "template"} id="info">
            <div className="space-y-14">
              {popup ? (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4" {...c("popupInfo")} {...p("info.popupTitle")}>
                  <div className="flex items-start gap-3">
                    <AlertCircle size={18} className="text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-black text-amber-950 text-sm mb-1">{t(tpl.info.popupTitle)}</p>
                      <p className="text-sm text-amber-900 leading-relaxed">{t(tpl.info.popupMinText, { minkg: String(popup.minKg) })}</p>
                      {popup.restrictedItems.length > 0 && (
                        <>
                          <p className="text-sm text-amber-900 leading-relaxed mt-2">{t(tpl.info.popupRestrictedText)}</p>
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
              ) : (
                mode === "template" && (
                  <div className="rounded-2xl border border-dashed border-amber-300 bg-amber-50/60 px-5 py-4 text-sm text-amber-900" {...p("info.popupTitle")}>
                    Kotak info penting hanya tampil di kota yang mengaktifkannya. Contoh judul: <b>{t(tpl.info.popupTitle)}</b>
                  </div>
                )
              )}
              {belowBanner && (
                <ExpandableHtml
                  html={belowBanner}
                  collapse={mode === null}
                  className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 prose prose-gray max-w-none [&>*:first-child]:mt-0"
                  {...c("belowBannerContent")}
                />
              )}
            </div>
          </Sec>
        )}

        {tpl.order.map((key) => {
          if (key === "hero" || key === "info" || hidden.has(key)) return null;
          const node = sections[key]();
          if (!node) return null;
          return (
            <Sec key={key} on={mode === "template"} id={key}>
              {node}
            </Sec>
          );
        })}
      </div>
    </>
  );
}


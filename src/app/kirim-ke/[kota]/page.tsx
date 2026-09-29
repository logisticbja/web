        <div>
          <div className="text-center mb-8">
            <p className="text-sm font-bold text-[#CC1F2A] mb-2">TESTIMONI</p>
            <h2 className="text-2xl font-black text-[#111111] mb-2">
              {apiData && apiData.testimonials.length > 0
                ? `Apa Kata Pelanggan Kami di ${cityLabel}`
                : "Apa Kata Pelanggan Kami"}
            </h2>
            <p className="text-gray-500">Ribuan pelanggan sudah merasakan manfaat layanan kami</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {(apiData && apiData.testimonials.length > 0
              ? apiData.testimonials.map((t) => ({
                  name: t.name,
                  initial: t.name.charAt(0).toUpperCase(),
                  role: "",
                  quote: t.message,
                  rating: t.rating,
                }))
              : testimonials.map((t) => ({ ...t, rating: 5 }))
            ).map((t) => (
              <div key={t.name} className="bg-[#F8FAFC] rounded-2xl p-6 relative overflow-hidden">
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

        {/* Kota yang Dilayani */}
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
                    {group.cities.map((c) => (
                      <span
                        key={c.value}
                        className="bg-[#F8FAFC] border border-gray-200 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full"
                      >
                        {c.label}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related cities */}
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

        {/* FAQ */}
        <div>
          <h2 className="text-2xl font-black text-[#111111] mb-6">
            FAQ Pengiriman ke {cityLabel}
          </h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details key={faq.q} className="group bg-white border border-gray-200 rounded-xl overflow-hidden">
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

        {/* CTA */}
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

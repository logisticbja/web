"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, MessageCircle } from "lucide-react";
import { buildGeneralMessage } from "@/lib/whatsapp";
import { WALink } from "@/components/ui/WALink";

const navLinks = [
  {
    label: "Layanan",
    href: "/layanan/cargo-laut",
    children: [
      { label: "Cargo Laut", href: "/layanan/cargo-laut" },
      { label: "Cargo Darat", href: "/layanan/cargo-darat" },
      { label: "Cargo Udara", href: "/layanan/cargo-udara" },
      { label: "Kirim Motor", href: "/layanan/kirim-motor" },
      { label: "Kirim Mobil", href: "/layanan/kirim-mobil" },
    ],
  },
  {
    label: "Tujuan",
    href: "/cargo/papua",
    children: [
      { label: "Cargo ke Papua", href: "/cargo/papua" },
      { label: "Cargo ke Maluku", href: "/cargo/maluku" },
      { label: "Cargo ke NTT", href: "/cargo/ntt" },
      { label: "Cargo ke Sulawesi", href: "/cargo/sulawesi" },
    ],
  },
  { label: "Cek Ongkir", href: "/cek-ongkir" },
  { label: "Jadwal Kapal", href: "/jadwal-kapal" },
  { label: "Tracking", href: "/tracking" },
  { label: "Blog", href: "/blog" },
  { label: "Corporate", href: "/corporate" },
  { label: "Kontak", href: "/kontak" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();

  function isActive(href: string, children?: { href: string }[]) {
    if (children) return children.some((c) => pathname.startsWith(c.href));
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image
              src="/bja-logo.png"
              alt="BJA Logistic"
              width={3958}
              height={709}
              className="h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label} className="relative group">
                  <button
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      isActive(link.href, link.children)
                        ? "text-[#CC1F2A] bg-red-50"
                        : "text-gray-700 hover:text-[#CC1F2A] hover:bg-gray-50"
                    }`}
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    {link.label}
                    <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />
                  </button>
                  <div
                    className="absolute top-full left-0 mt-1 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`block px-4 py-2.5 text-sm font-medium transition-colors ${
                          pathname.startsWith(child.href)
                            ? "text-[#CC1F2A] bg-red-50"
                            : "text-gray-700 hover:text-[#CC1F2A] hover:bg-gray-50"
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : link.label === "Corporate" ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-1.5 rounded-lg text-sm font-black text-[#1A1A1A] bg-[#F5C518] hover:bg-[#D4A910] transition-colors"
                >
                  {link.label}
                </Link>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isActive(link.href)
                      ? "text-[#CC1F2A] bg-red-50"
                      : "text-gray-700 hover:text-[#CC1F2A] hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <WALink
              href={buildGeneralMessage()}
              className="hidden sm:flex items-center gap-2 bg-[#CC1F2A] hover:bg-[#A01820] text-white font-bold px-4 py-2 rounded-lg text-sm transition-all duration-200 hover:shadow-lg"
            >
              <MessageCircle size={16} />
              Chat WhatsApp
            </WALink>
            <button
              className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <div key={link.label}>
              {link.children ? (
                <>
                  <p className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">{link.label}</p>
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => setMobileOpen(false)}
                      className={`block px-6 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        pathname.startsWith(child.href)
                          ? "text-[#CC1F2A] bg-red-50"
                          : "text-gray-700 hover:text-[#CC1F2A] hover:bg-gray-50"
                      }`}
                    >
                      {child.label}
                    </Link>
                  ))}
                </>
              ) : link.label === "Corporate" ? (
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-sm font-black text-[#1A1A1A] bg-[#F5C518] hover:bg-[#D4A910] text-center"
                >
                  {link.label}
                </Link>
              ) : (
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                    isActive(link.href)
                      ? "text-[#CC1F2A] bg-red-50"
                      : "text-gray-700 hover:text-[#CC1F2A] hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </Link>
              )}
            </div>
          ))}
          <div className="pt-3">
            <WALink
              href={buildGeneralMessage()}
              className="flex items-center justify-center gap-2 bg-[#CC1F2A] text-white font-bold py-3 rounded-xl text-base w-full"
            >
              <MessageCircle size={18} />
              Chat WhatsApp Sekarang
            </WALink>
          </div>
        </div>
      )}
    </header>
  );
}

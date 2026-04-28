"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa6";
import Link from "next/link";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Relax", href: "/relaxationtherapy" },
  {
    label: "Heal",
    href: "/heal",
    subItems: [
      { label: "Nadi Pariksha", href: "/nadi-pariksha" },
      { label: "Netratejas (Eye Care)", href: "/netratejas" },
      { label: "Alternative Treatments", href: "/alternative-treatments" },
      { label: "Panchakarma", href: "/panchakarma" },
    ],
  },
  { label: "Products", href: "#products" },
  { label: "About", href: "#about" },
  { label: "Specialties", href: "#specialties" },
  { label: "Testimonial", href: "#testimonial" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when screen becomes large
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="fixed top-4 left-0 z-50 w-full md:top-6">
      <div className="mx-auto flex w-[min(1200px,calc(100%-24px))] items-center justify-between gap-4 md:w-[min(1200px,calc(100%-40px))]">
        {/* Logo */}
        <Link href="/" className="relative z-50 shrink-0">
          <Image
            src="/logo.svg"
            alt="Sri Sri Wellbeing"
            width={72}
            height={72}
            className="h-[56px] w-[56px] object-contain md:h-[72px] md:w-[72px]"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:block rounded-full bg-white/95 px-3 py-2 shadow-[0_10px_35px_rgba(0,0,0,0.08)] backdrop-blur-md">
          <ul className="flex items-center gap-2">
            {navItems.map((item, index) => (
              <li key={item.label} className="relative group">
                <Link
                  href={item.href.startsWith("/") ? item.href : `/${item.href}`}
                  onClick={(e) => {
                    if (pathname === "/" && item.href.startsWith("#")) {
                      // Let native scroll happen on homepage
                    } else if (item.href.startsWith("#")) {
                      // Native next links are fine here
                    }
                  }}
                  className={`inline-flex h-10 items-center justify-center rounded-full px-5 text-base md:text-lg font-medium transition-all duration-300 ${
                    index === 0 && pathname === "/"
                      ? "bg-[#D4AF37] text-white! shadow-sm font-semibold tracking-wide"
                      : "text-[#222] hover:bg-[#d0a93d]/10 hover:text-[#4b1f12]"
                  }`}
                >
                  {item.label}
                  {item.subItems && (
                    <svg
                      className="ml-1.5 h-4 w-4 text-inherit opacity-70 transition-transform group-hover:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </Link>

                {item.subItems && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <ul className="bg-white/95 backdrop-blur-md shadow-[0_10px_35px_rgba(0,0,0,0.1)] rounded-2xl w-56 p-2 flex flex-col gap-1 border border-black/5">
                      {item.subItems.map((subItem) => (
                        <li key={subItem.label}>
                          <Link
                            href={
                              subItem.href.startsWith("/")
                                ? subItem.href
                                : `/${subItem.href}`
                            }
                            className="block px-4 py-2.5 rounded-xl hover:bg-[#d0a93d]/10 hover:text-[#4b1f12] transition-colors text-sm font-medium text-[#222]"
                          >
                            {subItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Side: CTA & Mobile Toggle */}
        <div className="flex items-center gap-3 relative z-50">
          <Link
            href="/contact"
            className="hidden sm:inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-8 text-base md:text-lg font-semibold tracking-wide text-white! transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#b8952b] hover:shadow-md"
          >
            Contact
            <FaArrowRight className="text-[14px]" />
          </Link>

          {/* Hamburger Button */}
          <button
            title="Menu toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full bg-white/95 shadow-[0_4px_20px_rgba(0,0,0,0.08)] backdrop-blur-md lg:hidden"
          >
            <span
              className={`h-[2px] w-5 bg-[#361A0D] transition-all duration-300 ${
                isMobileMenuOpen ? "translate-y-[8px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-[2px] w-5 bg-[#361A0D] transition-all duration-300 ${
                isMobileMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`h-[2px] w-5 bg-[#361A0D] transition-all duration-300 ${
                isMobileMenuOpen ? "-translate-y-[8px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />
      <div
        className={`absolute left-4 right-4 top-[80px] z-40 rounded-[24px] bg-white p-5 shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-400 ease-[cubic-bezier(0.25,1,0.5,1)] lg:hidden ${
          isMobileMenuOpen
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-4 opacity-0 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col gap-2">
          {navItems.map((item, index) => (
            <li key={item.label}>
              <Link
                href={item.href.startsWith("/") ? item.href : `/${item.href}`}
                onClick={() => !item.subItems && setIsMobileMenuOpen(false)}
                className={`flex h-12 w-full items-center rounded-[14px] px-4 text-base md:text-lg font-medium transition-colors ${
                  index === 0 && pathname === "/"
                    ? "bg-[#D4AF37] text-white!"
                    : "text-[#361A0D] hover:bg-[#f6f3ee]"
                }`}
              >
                {item.label}
              </Link>
              {item.subItems && (
                <ul className="pl-4 border-l-2 border-[#d0a93d]/20 ml-4 mt-2 mb-4 flex flex-col gap-2">
                  {item.subItems.map((subItem) => (
                    <li key={subItem.label}>
                      <Link
                        href={
                          subItem.href.startsWith("/")
                            ? subItem.href
                            : `/${subItem.href}`
                        }
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex h-10 w-full items-center rounded-lg px-4 text-sm font-medium text-[#555] hover:bg-[#f6f3ee] hover:text-[#361A0D]"
                      >
                        {subItem.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
          <li className="mt-2 text-center sm:hidden">
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-[14px] bg-[#D4AF37] text-base md:text-lg font-medium text-white! shadow-md transition hover:bg-[#b8952b]"
            >
              Contact Us
              <FaArrowRight className="text-[15px]" />
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

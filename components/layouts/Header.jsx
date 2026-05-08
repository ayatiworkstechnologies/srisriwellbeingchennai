"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa6";
import Link from "next/link";
import WellnessButton from "./WellnessButton";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Relax", href: "/relaxationtherapy" },
  {
    label: "Heal",
    // href: "/heal",
    subItems: [
      { label: "Nadi Pariksha", href: "/heal/nadi-pariksha" },
      { label: "Netratejas (Eye Care)", href: "/heal/netratejas" },
      { label: "Alternative Treatments", href: "/heal/alternativetreatments" },
      { label: "Panchakarma", href: "/heal/panchakarma" },
    ],
  },
  { label: "Products", href: "/products" },
  { label: "About", href: "/about-us" },
  { label: "Facilities", href: "/facilities" },
  // { label: "Testimonial", href: "#testimonial" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isItemActive = (item) => {
    if (item.href === "/") {
      return pathname === "/";
    }

    if (item.subItems?.some((subItem) => pathname === subItem.href)) {
      return true;
    }

    if (item.href?.startsWith("/")) {
      if (pathname === item.href) {
        return true;
      }

      return item.href !== "/" && pathname.startsWith(`${item.href}/`);
    }

    return false;
  };

  // Close mobile menu when screen becomes large
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-black/5 bg-white py-3 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
      <div className="container-width flex items-center justify-between gap-4">
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
        <nav className="hidden lg:block rounded-full border border-black/5 bg-white px-3 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
          <ul className="flex items-center gap-2">
            {navItems.map((item) => {
              const itemActive = isItemActive(item);

              return (
                <li key={item.label} className="relative group">
                  <Link
                    href={
                      item.href ? (item.href.startsWith("/") ? item.href : `/${item.href}`) : "#"
                    }
                    onClick={(e) => {
                      if (!item.href) {
                        e.preventDefault();
                        return;
                      }
                      if (pathname === "/" && item.href.startsWith("#")) {
                        // Let native scroll happen on homepage
                      } else if (item.href.startsWith("#")) {
                        // Native next links are fine here
                      }
                    }}
                    className={`inline-flex h-10 items-center justify-center rounded-full px-5 text-base md:text-lg font-medium transition-all duration-300 ${
                      itemActive
                        ? "bg-[#D4AF37] !text-white shadow-sm font-semibold tracking-wide"
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
                              className={`block rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                                pathname &&
                                (pathname === subItem.href ||
                                  pathname === subItem.href + "/")
                                  ? "bg-[#D4AF37] !text-white"
                                  : "text-[#222] hover:bg-[#d0a93d]/10 hover:text-[#4b1f12]"
                              }`}
                            >
                              {subItem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right Side: CTA & Mobile Toggle */}
        <div className="flex items-center gap-3 relative z-50">
          {/* Desktop CTA */}
          <WellnessButton
            href="/contact"
            label="Contact"
            className="hidden lg:inline-flex scale-90"
          />

          {/* Hamburger — mobile only */}
          <button
            className="lg:hidden flex flex-col justify-center items-center h-10 w-10 gap-[5px] rounded-full border border-black/10 bg-white shadow-sm transition-all hover:bg-[#d0a93d]/10"
            onClick={() => setIsMobileMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span
              className={`block h-0.5 w-5 bg-[#4b1f12] rounded-full transition-all duration-300 ${isMobileMenuOpen ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 bg-[#4b1f12] rounded-full transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 bg-[#4b1f12] rounded-full transition-all duration-300 ${isMobileMenuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? "max-h-[80vh] border-t border-black/5" : "max-h-0"}`}
      >
        <nav className="container-width py-4">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href ? (item.href.startsWith("/") ? item.href : `/${item.href}`) : "#"}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                    isItemActive(item)
                      ? "bg-[#D4AF37] !text-white font-semibold"
                      : "text-[#222] hover:bg-[#d0a93d]/10 hover:text-[#4b1f12]"
                  }`}
                >
                  {item.label}
                </Link>
                {item.subItems && (
                  <ul className="ml-4 mt-1 flex flex-col gap-1">
                    {item.subItems.map((subItem) => (
                      <li key={subItem.label}>
                        <Link
                          href={
                            subItem.href.startsWith("/")
                              ? subItem.href
                              : `/${subItem.href}`
                          }
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`block rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                            pathname &&
                            (pathname === subItem.href ||
                              pathname === subItem.href + "/")
                              ? "bg-[#D4AF37] !text-white font-semibold"
                              : "text-[#555] hover:bg-[#d0a93d]/10 hover:text-[#4b1f12]"
                          }`}
                        >
                          {subItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-4">
            <WellnessButton
              href="/contact"
              label="Contact Us"
              className="w-full"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          </div>
        </nav>
      </div>
    </header>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Relax", href: "/relax" },
  { label: "Heal", href: "/heal" },
  { label: "Webinars", href: "/webinars" },
  { label: "Trainings", href: "/trainings" },
];

export default function Header() {
  return (
    <header className="fixed top-3 left-0 z-50 w-full md:top-4">
      <div className="mx-auto flex w-[min(1200px,calc(100%-24px))] items-center justify-between gap-2 md:w-[min(1200px,calc(100%-40px))] md:gap-4">
        <Link
          href="/"
          className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-white/85 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-md md:h-14 md:w-14"
        >
          <Image
            src="/logo.png"
            alt="Sri Sri Wellbeing"
            width={56}
            height={56}
            className="h-full w-full object-contain"
            priority
          />
        </Link>

        <nav className="max-w-[calc(100%-110px)] overflow-x-auto rounded-full bg-white/95 px-2 py-2 shadow-[0_10px_35px_rgba(0,0,0,0.08)] backdrop-blur-md md:max-w-none md:px-3">
          <ul className="flex w-max items-center gap-1 md:gap-2">
            {navItems.map((item, index) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`inline-flex h-8 items-center justify-center rounded-full px-3 text-[12px] font-medium transition-all duration-300 md:h-10 md:px-5 md:text-[14px] ${
                    index === 0
                      ? "bg-gradient-to-b from-[#d7b64f] to-[#bb9327] text-white shadow-[0_6px_16px_rgba(187,147,39,0.35)]"
                      : "text-[#222] hover:bg-[#d0a93d]/10 hover:text-[#4b1f12]"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <Link
            href="/contact"
            className="inline-flex h-8 items-center justify-center rounded-full border border-[#d0a93d] bg-[#4b1f12]/20 px-4 text-[12px] font-medium text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d0a93d] md:h-10 md:px-6 md:text-[14px]"
          >
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
}

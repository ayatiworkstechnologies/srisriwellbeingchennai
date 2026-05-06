"use client";

import Image from "next/image";
import Link from "next/link";

export default function AdminTopbar({ 
  adminSections, 
  currentSection, 
  handleLogout, 
  tabCounts 
}) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/60 bg-[rgba(255,252,248,0.78)] backdrop-blur-xl shadow-[0_12px_30px_rgba(32,18,10,0.04)]">
      <div className="mx-auto flex min-h-22 max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6">
        {/* Brand */}
        <div className="flex items-center gap-4">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-[1.2rem] border border-white/80 bg-white p-2 shadow-[0_10px_24px_rgba(32,18,10,0.06)]">
              <Image 
                src="/logo.svg" 
                alt="Sri Sri Wellbeing" 
                width={32} 
                height={32} 
                style={{ width: "auto", height: "auto" }}
                className="object-contain" 
              />
            </div>
            <div className="hidden sm:block">
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#c29a2f]">Admin Portal</p>
              <h1 className="font-serif text-lg font-semibold tracking-tight text-[#1f1a17]">Sri Sri Wellbeing</h1>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-2 rounded-full border border-white/80 bg-white/70 p-1.5 shadow-[0_10px_24px_rgba(32,18,10,0.04)]">
          {adminSections.map((section) => (
            <Link
              key={section.id}
              href={section.href}
              className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all ${
                currentSection === section.id
                  ? "bg-[linear-gradient(135deg,#caa03f,#a97b24)] text-white shadow-[0_12px_22px_rgba(194,154,47,0.28)]"
                  : "text-[#5c544f] hover:bg-[#f8f6f1] hover:text-[#1f1a17]"
              }`}
            >
              <span>{section.label}</span>
              {tabCounts[section.id] > 0 && (
                <span className={`inline-flex min-w-[22px] items-center justify-center rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                  currentSection === section.id 
                    ? "bg-white/20 text-white" 
                    : "bg-[#f8f6f1] text-[#8f8376]"
                }`}>
                  {tabCounts[section.id]}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden rounded-full border border-white/80 bg-white/70 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#8f8376] shadow-[0_10px_24px_rgba(32,18,10,0.04)] md:block">
            Operations Online
          </div>
          <button
            onClick={handleLogout}
            className="rounded-full border border-red-100 bg-white px-4 py-2.5 text-sm font-bold text-red-600 transition-all hover:bg-red-50 shadow-[0_8px_18px_rgba(32,18,10,0.04)]"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Nav Scroll */}
      <div className="lg:hidden border-t border-white/60 bg-[rgba(255,252,248,0.82)] overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-2 px-4 py-2 min-w-max">
          {adminSections.map((section) => (
            <Link
              key={`mobile-${section.id}`}
              href={section.href}
              className={`rounded-full px-3 py-2 text-xs font-semibold transition ${
                currentSection === section.id
                  ? "bg-[linear-gradient(135deg,#caa03f,#a97b24)] text-white"
                  : "bg-white text-[#5c544f]"
              }`}
            >
              {section.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

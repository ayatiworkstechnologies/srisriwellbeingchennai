"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#f5f2ec] pb-10 pt-2">
      <div className="mx-auto w-[min(1200px,calc(100%-24px))] md:w-[min(1200px,calc(100%-40px))]">
        <div className="rounded-[28px] bg-gradient-to-b from-[#582412] to-[#441b0e] px-6 py-8 text-white shadow-[0_16px_45px_rgba(53,20,11,0.18)] md:px-9 md:py-10">
          <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr_1fr] md:gap-10">
            <div>
              <h4 className="mb-4 text-[20px] font-bold">Our Mission:</h4>
              <p className="max-w-[320px] text-[14px] leading-8 text-white/80">
                Enabling a holistic approach towards health and wellbeing in
                mind, lifestyle. Providing authentic and effective products and
                services of the highest quality standards.
              </p>
            </div>

            <div>
              <h4 className="mb-4 text-[20px] font-bold">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/relax"
                    className="text-[14px] text-white/85 transition hover:pl-1 hover:text-[#e1c870]"
                  >
                    Relax
                  </Link>
                </li>
                <li>
                  <Link
                    href="/heal"
                    className="text-[14px] text-white/85 transition hover:pl-1 hover:text-[#e1c870]"
                  >
                    Heal
                  </Link>
                </li>
                <li>
                  <Link
                    href="/webinars"
                    className="text-[14px] text-white/85 transition hover:pl-1 hover:text-[#e1c870]"
                  >
                    Webinars
                  </Link>
                </li>
                <li>
                  <Link
                    href="/trainings"
                    className="text-[14px] text-white/85 transition hover:pl-1 hover:text-[#e1c870]"
                  >
                    Trainings
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-[20px] font-bold">Location</h4>
              <div className="overflow-hidden rounded-[14px] border border-white/10">
                <Image
                  src="/map.jpg"
                  alt="Location map"
                  width={320}
                  height={180}
                  className="h-[170px] w-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 md:flex-row md:flex-wrap md:items-center md:gap-8">
            <div className="flex items-center gap-2 text-[14px] text-white/90">
              <span>✉</span>
              <a href="mailto:care@srisriwellbeing.com">
                care@srisriwellbeing.com
              </a>
            </div>

            <div className="flex items-center gap-2 text-[14px] text-white/90">
              <span>📞</span>
              <a href="tel:+917355259588">+91 73552 59588</a>
            </div>
          </div>

          <div className="mt-5 border-t border-white/10 pt-5 text-left md:text-center">
            <p className="text-[11px] leading-7 text-white/75 md:text-[12px]">
              Copyright ©2026 srisriwellbeing - All rights reserved | Designed &
              Developed by{" "}
              <a
                href="https://www.ayatiworks.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#e1c870]"
              >
                AyatiWorks
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
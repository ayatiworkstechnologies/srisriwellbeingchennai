"use client";

import Link from "next/link";
import { FaEnvelope, FaPhoneVolume } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#f5f2ec] pb-10 pt-2">
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
                    href="/#relax"
                    className="text-[14px] text-white/85 transition hover:pl-1 hover:text-[#e1c870]"
                  >
                    Relax
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#heal"
                    className="text-[14px] text-white/85 transition hover:pl-1 hover:text-[#e1c870]"
                  >
                    Heal
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#products"
                    className="text-[14px] text-white/85 transition hover:pl-1 hover:text-[#e1c870]"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-[14px] text-white/85 transition hover:pl-1 hover:text-[#e1c870]"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-[20px] font-bold">Location</h4>
              <div className="overflow-hidden rounded-[14px] border border-white/10">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d971.5871486254812!2d80.23289638266331!3d13.077079876095443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267da1c867203%3A0x796c52276b379c45!2sSri%20Sri%20Wellbeing%20Holistic%20Health%20Mruthunjaya%20Ayur!5e0!3m2!1sen!2sin!4v1776087225095!5m2!1sen!2sin"
                  title="Sri Sri Wellbeing location map"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="h-[170px] w-full border-0 md:h-[180px]"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 md:flex-row md:flex-wrap md:items-center md:gap-8">
            <div className="flex items-center gap-2 text-[14px] text-white/90">
              <FaEnvelope className="text-[14px] text-[#e1c870]" />
              <a href="mailto:care@srisriwellbeing.com">
                care@srisriwellbeing.com
              </a>
            </div>

            <div className="flex items-center gap-2 text-[14px] text-white/90">
              <FaPhoneVolume className="text-[14px] text-[#e1c870]" />
              <a href="tel:+917355259588">+91 73552 59588</a>
            </div>
          </div>

          <div className="mt-5 border-t border-white/10 pt-5 text-left md:text-center">
            <p className="text-[11px] leading-7 text-white/75 md:text-[12px]">
              Copyright (c)2026 srisriwellbeing - All rights reserved | Designed &
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

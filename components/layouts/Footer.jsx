"use client";

import Link from "next/link";
import { FaEnvelope, FaPhoneVolume } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#f5f2ec] pb-10 pt-4 md:pb-12">
      <div className="mx-auto w-[min(1200px,calc(100%-24px))] md:w-[min(1200px,calc(100%-40px))]">
        <div className="rounded-[30px] bg-[#4a1d09] px-7 py-8 text-white shadow-[0_16px_45px_rgba(53,20,11,0.2)] md:px-10 md:py-9">
          <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr_1fr] md:gap-10">
            <div>
              <h4 className="mb-3 text-[30px] font-bold leading-none md:text-[29px]">
                Our Mission:
              </h4>
              <p className="max-w-[330px] text-[12px] leading-5 text-white/80">
                Enabling a holistic approach towards health and wellbeing in
                mind, lifestyle. Providing authentic and effective products and
                services of the highest quality standards.
              </p>

              <div className="mt-7">
                <h5 className="mb-3 text-[30px] font-bold leading-none md:text-[29px]">
                  Contact
                </h5>

                <div className="flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center md:gap-6">
                  <div className="flex items-center gap-2 text-[11px] text-white/90">
                    <FaEnvelope className="text-[12px] text-white" />
                    <a href="mailto:care@srisriwellbeing.com">
                      care@srisriwellbeing.com
                    </a>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-white/90">
                    <FaPhoneVolume className="text-[11px] text-white" />
                    <a href="tel:+917858623658">+91 78582 36558</a>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="mb-4 text-[30px] font-bold leading-none md:text-[29px]">
                Quick Links
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/#relax"
                    className="text-[24px] text-white/90 transition hover:pl-1 hover:text-[#e1c870] md:text-[20px]"
                  >
                    &middot; Relax
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#heal"
                    className="text-[24px] text-white/90 transition hover:pl-1 hover:text-[#e1c870] md:text-[20px]"
                  >
                    &middot; Heal
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#webinars"
                    className="text-[24px] text-white/90 transition hover:pl-1 hover:text-[#e1c870] md:text-[20px]"
                  >
                    &middot; Webinars
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#trainings"
                    className="text-[24px] text-white/90 transition hover:pl-1 hover:text-[#e1c870] md:text-[20px]"
                  >
                    &middot; Trainings
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-[30px] font-bold leading-none md:text-[29px]">
                Location
              </h4>
              <div className="overflow-hidden rounded-[8px] border border-white/10">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d971.5871486254812!2d80.23289638266331!3d13.077079876095443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267da1c867203%3A0x796c52276b379c45!2sSri%20Sri%20Wellbeing%20Holistic%20Health%20Mruthunjaya%20Ayur!5e0!3m2!1sen!2sin!4v1776087225095!5m2!1sen!2sin"
                  title="Sri Sri Wellbeing location map"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="h-[160px] w-full border-0 md:h-[170px]"
                />
              </div>
            </div>
          </div>

          <div className="mt-7 border-t border-white/30 pt-5 text-center">
            <p className="text-[10px] leading-6 text-white/85 md:text-[11px]">
              Copyright &copy;2026 srisriwellbeing - All right reserved |
              Designed &amp; Developed by{" "}
              <a
                href="https://www.ayatiworks.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-white"
              >
                Ayatiworks
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

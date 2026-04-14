"use client";

import Link from "next/link";
import { FaEnvelope, FaPhoneVolume, FaInstagram, FaFacebookF, FaLinkedinIn, FaChevronRight } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#f5f2ec] pb-10 pt-4 md:pb-12">
      <div className="mx-auto w-[min(1200px,calc(100%-24px))] md:w-[min(1200px,calc(100%-40px))]">
        <div className="rounded-[40px] bg-[#361A0D] px-8 py-10 text-white shadow-[0_16px_45px_rgba(53,20,11,0.2)] md:px-14 md:py-14">
          <div className="grid gap-10 md:grid-cols-[1fr_0.5fr_0.9fr] md:gap-14">

            {/* Column 1: Mission & Contact */}
            <div className="flex flex-col">
              <h4 className="mb-4 text-2xl md:text-3xl font-bold text-white">
                Our Mission:
              </h4>
              <p className="max-w-[400px] text-base md:text-lg leading-[1.8] text-white/80">
                Enabling a holistic approach towards health and wellbeing in modern lifestyles. Providing authentic and effective products and services of the highest quality standards.
              </p>

              <div className="mt-8 md:mt-12">
                <h5 className="mb-4 text-2xl md:text-3xl font-bold text-white">
                  Contact
                </h5>

                <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
                  <div className="flex items-center gap-3 text-base md:text-lg font-medium text-white">
                    <FaEnvelope className="shrink-0 text-[16px] text-white" />
                    <a href="mailto:care@srisriwellbeing.com" className="whitespace-nowrap transition hover:text-[#d0a93d]">
                      care@srisriwellbeing.com
                    </a>
                  </div>

                  <div className="flex items-center gap-3 text-base md:text-lg font-medium text-white">
                    <FaPhoneVolume className="shrink-0 text-[16px] text-white" />
                    <a href="tel:+919943013111" className="whitespace-nowrap transition hover:text-[#d0a93d]">
                      +91 9943013111
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h4 className="mb-5 text-2xl md:text-3xl font-bold text-white">
                Quick Links
              </h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="#relax"
                    className="flex items-center gap-2 text-base md:text-lg font-medium text-white/90 transition hover:pl-1 hover:text-[#d0a93d]"
                  >
                    <FaChevronRight className="text-[10px] text-[#d4af37]" /> Relax
                  </Link>
                </li>
                <li>
                  <Link
                    href="#heal"
                    className="flex items-center gap-2 text-base md:text-lg font-medium text-white/90 transition hover:pl-1 hover:text-[#d0a93d]"
                  >
                    <FaChevronRight className="text-[10px] text-[#d4af37]" /> Heal
                  </Link>
                </li>
                <li>
                  <Link
                    href="#products"
                    className="flex items-center gap-2 text-base md:text-lg font-medium text-white/90 transition hover:pl-1 hover:text-[#d0a93d]"
                  >
                    <FaChevronRight className="text-[10px] text-[#d4af37]" /> Products
                  </Link>
                </li>
                <li>
                  <Link
                    href="#about"
                    className="flex items-center gap-2 text-base md:text-lg font-medium text-white/90 transition hover:pl-1 hover:text-[#d0a93d]"
                  >
                    <FaChevronRight className="text-[10px] text-[#d4af37]" /> About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#specialties"
                    className="flex items-center gap-2 text-base md:text-lg font-medium text-white/90 transition hover:pl-1 hover:text-[#d0a93d]"
                  >
                    <FaChevronRight className="text-[10px] text-[#d4af37]" /> Specialties
                  </Link>
                </li>
                <li>
                  <Link
                    href="#testimonial"
                    className="flex items-center gap-2 text-base md:text-lg font-medium text-white/90 transition hover:pl-1 hover:text-[#d0a93d]"
                  >
                    <FaChevronRight className="text-[10px] text-[#d4af37]" /> Testimonial
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Location */}
            <div>
              <h4 className="mb-5 text-2xl md:text-3xl font-bold text-white">
                Location
              </h4>
              <div className="overflow-hidden rounded-[16px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d971.5871486254812!2d80.23289638266331!3d13.077079876095443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267da1c867203%3A0x796c52276b379c45!2sSri%20Sri%20Wellbeing%20Holistic%20Health%20Mruthunjaya%20Ayur!5e0!3m2!1sen!2sin!4v1776087225095!5m2!1sen!2sin"
                  title="Sri Sri Wellbeing location map"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="h-[180px] w-full border-0 md:h-[200px]"
                />
              </div>
            </div>

          </div>

          {/* Bottom Copyright Area */}
          <div className="mt-12 border-t border-white/20 pt-6">
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:gap-0">
              {/* Social Icons - Left */}
              <div className="flex items-center gap-5">
                <a
                  href="https://www.instagram.com/ssw_chennai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 transition hover:-translate-y-0.5 hover:text-[#d0a93d]"
                  aria-label="Instagram"
                >
                  <FaInstagram className="text-[18px]" />
                </a>
                <a
                  href="https://facebook.com/srisriwellbeingchennai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 transition hover:-translate-y-0.5 hover:text-[#d0a93d]"
                  aria-label="Facebook"
                >
                  <FaFacebookF className="text-[17px]" />
                </a>
                <a
                  href="https://linkedin.com/company/srisriwellbeingchennai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 transition hover:-translate-y-0.5 hover:text-[#d0a93d]"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn className="text-[18px]" />
                </a>
              </div>

              {/* Copyright - Center */}
              <p className="text-base md:text-lg font-medium text-white/90 text-center">
                Copyright &copy;2026 srisriwellbeingchennai - All right reserved
              </p>

              {/* Developer Credit - Right */}
              <p className="text-base md:text-lg font-medium text-white/90">
                Designed & Developed by{" "}
                <a
                  href="https://www.ayatiworks.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold transition hover:text-[#d0a93d]"
                >
                  Ayatiworks
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

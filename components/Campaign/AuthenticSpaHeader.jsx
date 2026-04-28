"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPhone } from "react-icons/fa6";
// import removed

export default function AuthenticSpaHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md py-3 shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/ayurvedic-spa" className="group flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="Sri Sri Wellbeing"
            width={72}
            height={72}
            className="h-[48px] w-[48px] object-contain md:h-[72px] md:w-[72px] transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(194,154,47,0.3)]"
            priority
          />
        </Link>

        <div className="flex items-center gap-3 md:gap-6">
          <a
            href="tel:+919943013111"
            className="group hidden md:flex items-center gap-2.5 transition-all duration-300 text-[#c29a2f] hover:text-[#c29a2f]"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 bg-[#c29a2f]/10 group-hover:bg-[#c29a2f] group-hover:text-white group-hover:shadow-[0_0_15px_rgba(194,154,47,0.4)]">
              <FaPhone className="text-[12px] text-[#c29a2f] group-hover:text-white transition-transform duration-300 group-hover:rotate-12" />
            </div>
            <span className="font-bold tracking-wide text-lg text-[#c29a2f]">
              +91 99430 13111
            </span>
          </a>

          <button
            onClick={() => {
              const el = document.getElementById("contact-section");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="group relative overflow-hidden rounded-full border border-[#c29a2f] bg-transparent px-5 py-2 md:px-7 md:py-2.5 text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#c29a2f] transition-all duration-300 hover:text-white active:scale-95"
          >
            <span className="absolute inset-0 z-0 translate-y-full bg-[#c29a2f] transition-transform duration-300 ease-out group-hover:translate-y-0" />
            <span className="relative z-10">Book Now</span>
          </button>
        </div>
      </div>
    </motion.header>
  );
}

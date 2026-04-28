"use client";

import Link from "next/link";
import Image from "next/image";
import RevealOnScroll from "../Main/RevealOnScroll";

export default function NadiCTASection() {
  return (
    <section className="relative overflow-hidden bg-[#3b2218] py-16 md:py-24">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-20">
        <Image
          src="/images/sec-1.svg"
          alt="Background"
          fill
          className="object-cover"
          priority={false}
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#3b2218] via-[#3b2218]/90 to-[#3b2218]/70" />

      <div className="relative z-10 mx-auto w-[min(1000px,calc(100%-24px))] text-center md:w-[min(1000px,calc(100%-40px))]">
        <RevealOnScroll>
          <p className="text-sm md:text-base font-semibold uppercase tracking-[0.2em] text-[#d0a93d]">
            Begin Your Healing Journey
          </p>
          <h2 className="mt-4 text-2xl md:text-4xl lg:text-[48px] font-bold leading-tight text-white">
            Ready to Discover What Your
            <br className="hidden md:block" /> Pulse Reveals?
          </h2>
          <p className="mx-auto mt-5 max-w-[640px] text-base md:text-lg leading-7 text-white/65 md:mt-6">
            Book your Nadi Pariksha consultation today and take the first step
            toward a personalised Ayurvedic wellness journey guided by our
            expert Nadi Vaidyas.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center md:mt-10">
            <Link
              href="/contact"
              className="group inline-flex h-13 md:h-14 items-center justify-center gap-2.5 rounded-full bg-[#d0a93d] px-8 md:px-10 text-base md:text-lg font-semibold tracking-wide text-white transition-all duration-400 hover:-translate-y-0.5 hover:bg-[#b8952b] hover:shadow-[0_12px_36px_rgba(208,169,61,0.35)]"
            >
              Book Consultation
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
            <Link
              href="tel:+919876543210"
              className="inline-flex h-13 md:h-14 items-center justify-center gap-2 rounded-full border-2 border-white/25 px-8 md:px-10 text-base md:text-lg font-semibold tracking-wide text-white transition-all duration-400 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/10"
            >
              📞 Call Us Now
            </Link>
          </div>
        </RevealOnScroll>

        {/* Trust badges */}
        <RevealOnScroll delay={0.35}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 md:mt-14 md:gap-10">
            {[
              "380+ Trained Doctors",
              "5M+ Lives Touched",
              "20+ Countries",
            ].map((badge) => (
              <div
                key={badge}
                className="flex items-center gap-2 text-sm md:text-base text-white/45"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#d0a93d]" />
                {badge}
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

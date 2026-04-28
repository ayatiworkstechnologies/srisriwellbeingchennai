"use client";

import Image from "next/image";
import RevealOnScroll from "../Main/RevealOnScroll";

export default function NadiHeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#3b2218] py-24 md:py-32 lg:py-40">
      {/* Subtle wood-grain texture overlay */}
      <div className="absolute inset-0 opacity-30">
        <Image
          src="/images/sec-1.svg"
          alt="Background texture"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#3b2218]/60 via-transparent to-[#3b2218]/80" />

      <div className="relative z-10 mx-auto w-[min(900px,calc(100%-24px))] text-center md:w-[min(900px,calc(100%-40px))]">
        <RevealOnScroll>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-white tracking-wide">
            Nadi Pariksha
          </h1>
          <div className="mx-auto mt-4 h-[3px] w-[100px] rounded-full bg-gradient-to-r from-[#e7d58f] to-[#c79f31] md:mt-5 md:w-[120px]" />
        </RevealOnScroll>

        <RevealOnScroll delay={0.15}>
          <p className="mx-auto mt-6 max-w-[760px] text-base md:text-lg leading-7 text-white/80 md:mt-8">
            Nadi Pariksha is an ancient, non-invasive pulse diagnosis technique
            rooted in Ayurveda. By analysing your pulse, it reveals imbalances in
            your doshas, assesses organ health, and provides deep insights into
            your physical, emotional, and mental wellbeing.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.25}>
          <p className="mx-auto mt-4 max-w-[760px] text-base md:text-lg leading-7 text-white/60 md:mt-5">
            It helps identify potential health concerns early and the Ayurveda
            Nadi Vaidya can guide the right diet, lifestyle changes, Ayurvedic
            supplements, and treatments personalised just for you.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}

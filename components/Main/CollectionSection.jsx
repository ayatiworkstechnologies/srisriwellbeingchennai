"use client";

import Image from "next/image";
import RevealOnScroll from "./RevealOnScroll";

export default function CollectionSection() {
  return (
    <section
      id="products"
      className="relative overflow-hidden bg-[#f5f5f5] pt-10 md:pt-12 min-h-[600px] md:min-h-[700px] flex flex-col items-center"
    >
      {/* Background Image - Desktop */}
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        <Image
          src="/images/pro.jpg"
          alt="Healing Collection Background Desktop"
          fill
          className="object-cover object-bottom"
          priority={false}
        />
      </div>

      {/* Background Image - Mobile */}
      <div className="pointer-events-none absolute inset-0 block md:hidden">
        <Image
          src="/images/pro-mob.jpg"
          alt="Healing Collection Background Mobile"
          fill
          className="object-cover object-bottom"
          priority={false}
        />
      </div>

      <div className="container-width relative z-10">
        {/* NEW HEADER PROVIDED BY USER */}
        <RevealOnScroll className="title-center mb-5 md:mb-10">
          <p className="eyebrow-text mb-3 text-[#c29a2f]">
            The Healing Collection
          </p>
          <h2 className="section-title text-white">
            Curated Wellness Formulations
          </h2>

          <div className="mx-auto mt-3 h-[3px] w-[78px] rounded-full bg-[#d8b03f]" />

          <p className="para-text mx-auto mt-4 max-w-[650px] text-white">
            A refined selection of Ayurvedic formulations crafted to complement
            your wellness journey, designed for daily balance, vitality, and
            sustained inner harmony.
          </p>
        </RevealOnScroll>
      </div>

      {/* Spacing at the bottom to allow the background image to show clearly */}
      <div className="relative z-10 w-full flex-grow"></div>
    </section>
  );
}

"use client";

import Image from "next/image";

export default function IntroSection() {
  return (
    <section className="relative overflow-hidden py-16 md:py-20">
      {/* Full background pattern image */}
      <div className="absolute inset-0">
        <Image
          src="/images/intro-bg.svg"
          alt="Background Pattern"
          fill
          className="object-cover"
          priority={false}
        />
      </div>

      {/* Content */}
      <div className="relative mx-auto w-[min(900px,calc(100%-24px))] text-center text-white md:w-[min(900px,calc(100%-40px))]">
        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-4 border-[#d0a93d] bg-white md:h-24 md:w-24">
          <Image
            src="/logo.png"
            alt="Sri Sri Wellbeing"
            width={84}
            height={84}
            className="object-contain"
          />
        </div>

        <h2 className="text-[28px] leading-[1.18] font-bold md:text-[44px]">
          Rooted in Tradition. Refined
          <br />
          for Modern Living.
        </h2>

        <p className="mx-auto mt-4 max-w-[720px] text-[13px] leading-7 text-white/80 md:mt-5 md:text-[15px] md:leading-8">
          Sri Sri Wellbeing is a refined Ayurvedic sanctuary where timeless
          healing meets modern living. Guided by centuries-old wisdom and
          elevated through thoughtful care, each therapy is designed to restore
          balance, vitality, and quiet clarity.
        </p>
      </div>
    </section>
  );
}
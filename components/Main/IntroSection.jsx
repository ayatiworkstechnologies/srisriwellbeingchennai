"use client";

import Image from "next/image";

export default function IntroSection() {
  return (
    <section className="relative overflow-hidden bg-[#4a1f12] py-16 md:py-20">
      <div className="absolute inset-0 opacity-35 [background-image:radial-gradient(circle_at_25px_25px,rgba(186,139,78,0.15)_10px,transparent_11px),radial-gradient(circle_at_75px_75px,rgba(186,139,78,0.10)_10px,transparent_11px)] [background-size:100px_100px]" />

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
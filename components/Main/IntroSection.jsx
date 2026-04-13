"use client";

import Image from "next/image";
import RevealOnScroll from "./RevealOnScroll";

export default function IntroSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden py-16 md:py-20"
    >
      {/* Full background pattern image */}
      <div className="absolute inset-0">
        <Image
          src="/images/sec-1.svg"
          alt="Background Pattern"
          fill
          className="object-cover"
          priority={false}
        />
      </div>

      {/* Content */}
      <RevealOnScroll className="relative mx-auto w-[min(900px,calc(100%-24px))] text-center text-white md:w-[min(900px,calc(100%-40px))]">
        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center overflow-hidden  md:h-24 md:w-24">
          <Image
            src="/logo.png"
            alt="Sri Sri Wellbeing"
            width={84}
            height={84}
            className="object-contain"
          />
        </div>

        <h2 className="text-4xl md:text-5xl leading-[1.18] font-bold">
          Rooted in Tradition. Refined
          <br />
          for Modern Living.
        </h2>

        <p className="mx-auto mt-4 max-w-[760px] text-base md:text-lg leading-7 text-white/80 md:mt-5">
          Sri Sri Wellbeing is an elevated Ayurvedic sanctuary where ancient wisdom is reinterpreted for the discerning modern lifestyle. Guided by accomplished Ayurveda physicians and master therapists, each therapy is meticulously tailored to restore equilibrium, elevate vitality, and cultivate inner stillness.    </p>
        <p className="mx-auto mt-4 max-w-[760px] text-base md:text-lg leading-7 text-white/80 md:mt-5">
          In the heart of the city, step into an environment of quiet sophistication, where every element is intentionally curated to soothe the senses and recalibrate the self.   </p>
        <p className="mx-auto mt-4 max-w-[760px] text-base md:text-lg leading-7 text-white/80 md:mt-5">
          Beyond treatment, it is a deeply personalised journey, one that harmonises health, enhances clarity, and nurtures a sustained sense of wellbeing, with uncompromising care and discretion.  </p>
      </RevealOnScroll>
    </section>
  );
}

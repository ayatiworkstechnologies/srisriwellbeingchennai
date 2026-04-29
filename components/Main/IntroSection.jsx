"use client";

import Image from "next/image";
import RevealOnScroll from "./RevealOnScroll";

export default function IntroSection() {
  return (
    <section
      id="about"
      className="section-padding relative"
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
      <RevealOnScroll className="title-center relative w-[min(900px,calc(100%-24px))] text-white md:w-[min(900px,calc(100%-40px))]">
        <div className="mx-auto mb-8 flex h-28 w-28 items-center justify-center md:h-40 md:w-40">
          <Image
            src="/logo.svg"
            alt="Sri Sri Wellbeing"
            width={160}
            height={160}
            className="h-full w-full object-contain"
          />
        </div>

        <h2 className="section-title leading-[1.18] text-white">
          Rooted in Tradition. Refined
          <br />
          for Modern Living.
        </h2>

        <p className="para-text mx-auto mt-4 max-w-[760px] text-white/80 md:mt-5">
          Sri Sri Wellbeing is an elevated Ayurvedic sanctuary where ancient wisdom is reinterpreted for the discerning modern lifestyle. Guided by accomplished Ayurveda physicians and master therapists, each therapy is meticulously tailored to restore equilibrium, elevate vitality, and cultivate inner stillness.    </p>
        <p className="para-text mx-auto mt-4 max-w-[760px] text-white/80 md:mt-5">
          In the heart of the city, step into an environment of quiet sophistication, where every element is intentionally curated to soothe the senses and recalibrate the self.   </p>
        <p className="para-text mx-auto mt-4 max-w-[760px] text-white/80 md:mt-5">
          Beyond treatment, it is a deeply personalised journey, one that harmonises health, enhances clarity, and nurtures a sustained sense of wellbeing, with uncompromising care and discretion.  </p>
      </RevealOnScroll>
    </section>
  );
}

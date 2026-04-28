"use client";

import Image from "next/image";
import RevealOnScroll from "../Main/RevealOnScroll";

const steps = [
  {
    number: "01",
    title: "Consultation",
    desc: "Begin with a brief discussion about your health history, current concerns, and wellness goals with the Nadi Vaidya.",
    image: "/images/ser-1.jpg",
  },
  {
    number: "02",
    title: "Pulse Reading",
    desc: "The Vaidya gently places three fingers on your wrist to read the subtle pulse vibrations that reveal your dosha constitution.",
    image: "/images/ser-3.jpg",
  },
  {
    number: "03",
    title: "Diagnosis",
    desc: "Based on the pulse patterns, the practitioner identifies imbalances in your Vata, Pitta, and Kapha doshas and organ health status.",
    image: "/images/ser-2.jpg",
  },
  {
    number: "04",
    title: "Treatment Plan",
    desc: "Receive a personalised Ayurvedic plan including diet recommendations, herbal supplements, lifestyle changes, and therapy sessions.",
    image: "/images/ser-4.jpg",
  },
];

export default function NadiProcessSection() {
  return (
    <section className="relative overflow-hidden bg-[#f5f2ec] py-16 md:py-24">
      {/* Background texture */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <Image
          src="/images/sec-2-bg.svg"
          alt="Background pattern"
          fill
          className="object-cover"
          priority={false}
        />
      </div>

      <div className="relative z-10 mx-auto w-[min(1200px,calc(100%-24px))] md:w-[min(1200px,calc(100%-40px))]">
        {/* Heading */}
        <RevealOnScroll className="text-center mb-12 md:mb-16">
          <p className="text-sm md:text-base font-semibold uppercase tracking-[0.2em] text-[#c29a2f]">
            The Process
          </p>
          <h2 className="mt-3 text-2xl md:text-4xl lg:text-[42px] font-bold leading-tight text-[#1f1a17]">
            How Nadi Pariksha Works
          </h2>
          <div className="mx-auto mt-4 h-[3px] w-[82px] rounded-full bg-gradient-to-r from-[#e7d58f] to-[#c79f31]" />
        </RevealOnScroll>

        {/* Steps */}
        <div className="space-y-8 md:space-y-0">
          {steps.map((step, idx) => {
            const isEven = idx % 2 === 1;
            return (
              <RevealOnScroll key={step.number} delay={idx * 0.1}>
                <div
                  className={`flex flex-col items-center gap-6 md:gap-12 lg:gap-16 md:flex-row ${
                    isEven ? "md:flex-row-reverse" : ""
                  } md:py-8`}
                >
                  {/* Image */}
                  <div className="w-full md:w-[45%] shrink-0">
                    <div className="group overflow-hidden rounded-[22px] bg-white p-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.06)] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.10)] md:rounded-[26px] md:p-3">
                      <div className="overflow-hidden rounded-[18px] md:rounded-[22px]">
                        <Image
                          src={step.image}
                          alt={step.title}
                          width={560}
                          height={380}
                          className="h-[240px] w-full object-cover object-center transition-transform duration-600 group-hover:scale-[1.04] md:h-[320px]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="text-[64px] md:text-[80px] font-bold leading-none text-[#1f1a17]/[0.06]">
                      {step.number}
                    </div>
                    <div className="-mt-6 md:-mt-8">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="h-[2px] w-10 rounded-full bg-[#c29a2f]" />
                        <span className="text-sm font-semibold uppercase tracking-[0.15em] text-[#c29a2f]">
                          Step {step.number}
                        </span>
                      </div>
                      <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1f1a17]">
                        {step.title}
                      </h3>
                      <p className="mt-3 max-w-[440px] text-base md:text-lg leading-7 text-[#5e5751] md:mt-4">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Connector line */}
                {idx < steps.length - 1 && (
                  <div className="hidden md:flex items-center justify-center py-2">
                    <div className="h-12 w-px bg-gradient-to-b from-[#c29a2f]/30 to-transparent" />
                  </div>
                )}
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}

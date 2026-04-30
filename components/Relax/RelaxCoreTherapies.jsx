"use client";

import Image from "next/image";
import { FaCheck } from "react-icons/fa6";
import RevealOnScroll from "../Main/RevealOnScroll";
import WellnessButton from "../layouts/WellnessButton";

export default function RelaxCoreTherapies({ coreTherapies }) {
  return (
    <section className="section-padding bg-[#f5f2ec]">
      <div className="container-width">
        {/* Heading */}
        <RevealOnScroll className="title-center mb-14 md:mb-18">
          <p className="eyebrow-text text-[#d0a93d]">Core Therapies</p>
          <h2 className="section-title mt-4 text-[#1f1a17] tracking-wide">
            Signature Relaxation Rituals
          </h2>
          <div className="mx-auto mt-4 h-[3px] w-[82px] rounded-full bg-gradient-to-r from-[#e7d58f] to-[#c79f31]" />
          <p className="para-text mx-auto mt-5 max-w-[680px] text-[#6b5f58]">
            Experience our most sought-after Ayurvedic therapies, masterfully
            crafted to restore your body&apos;s natural state of peace.
          </p>
        </RevealOnScroll>

        {/* Therapies — alternating layout */}
        <div className="flex flex-col gap-10 md:gap-14">
          {coreTherapies.map((therapy, index) => {
            const isEven = index % 2 === 0;
            return (
              <RevealOnScroll key={therapy.id} delay={0.05}>
                <div
                  className={`overflow-hidden rounded-[24px] bg-white shadow-[0_12px_40px_rgba(31,23,20,0.08)] md:flex ${
                    isEven ? "" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Image */}
                  <div className="relative min-h-[260px] md:w-[42%] md:min-h-[340px] flex-shrink-0">
                    <Image
                      src={therapy.image}
                      alt={therapy.name}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, 42vw"
                    />

                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-center p-7 md:p-10 lg:p-12">
                    {/* Category badge */}
                    <span
                      className="inline-flex w-fit rounded-full border border-[#d0a93d]/20 bg-[#fdf3e0] px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.14em] text-[#c79f31]"
                    >
                      {therapy.category}
                    </span>

                    <h3 className="section-title mt-4 text-[#1b1714]">
                      {therapy.name}
                    </h3>
                    <div className="mt-3 h-[2px] w-[40px] bg-[#d0a93d]" />

                    <p className="para-text mt-5 text-[#5f5550] leading-relaxed">
                      {therapy.shortDesc}
                    </p>

                    {/* Benefits */}
                    <ul className="mt-6 space-y-3">
                      {therapy.benefits.map((b) => (
                        <li key={b} className="flex items-start gap-3">
                          <span className="mt-1 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#d0a93d] text-white">
                            <FaCheck className="text-[9px]" />
                          </span>
                          <span className="small-text text-[#5f5550]">{b}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Duration badge */}
                    <div className="mt-8 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#d0a93d]">
                      <span className="h-px w-8 bg-[#d0a93d]/30" />
                      {therapy.duration}
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>

        {/* CTA after core therapies */}
        <RevealOnScroll delay={0.1}>
          <div className="mt-14 md:mt-18 text-center">
            <WellnessButton
              href="/contact"
              label="Enquire About Relaxation"
            />
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

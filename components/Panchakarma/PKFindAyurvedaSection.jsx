"use client";

import RevealOnScroll from "../Main/RevealOnScroll";
import WellnessButton from "../layouts/WellnessButton";

const ayurvedaMatches = [
  "Digestive reset and detox planning",
  "Stress, sleep, and nervous system support",
  "Joint stiffness and mobility recovery",
  "Seasonal cleansing and immunity care",
];

export default function PKFindAyurvedaSection() {
  return (
    <section className="section-padding bg-[#3b2218]">
      <div className="container-width">
        <RevealOnScroll className="title-center mx-auto max-w-3xl">
          <p className="eyebrow-text mb-3 text-[#e7d58f]">Find Ayurveda</p>
          <h2 className="section-title text-white">
            Find The Right Panchakarma Path For Your Condition
          </h2>
          <p className="para-text mx-auto mt-5 max-w-2xl text-white/75">
            Panchakarma is never one-size-fits-all. We assess your current
            imbalance, build the right sequence of therapies, and guide the
            pace of detoxification safely.
          </p>
        </RevealOnScroll>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {ayurvedaMatches.map((item, index) => (
            <RevealOnScroll key={item} delay={index * 0.06}>
              <div className="rounded-[22px] border border-white/10 bg-white/5 p-5">
                <div className="flex items-start gap-3">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#e7d58f]" />
                  <p className="text-sm leading-7 text-white/85">{item}</p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={0.15} className="mt-10 flex justify-center">
          <WellnessButton href="/contact" label="Book a Consultation" />
        </RevealOnScroll>
      </div>
    </section>
  );
}

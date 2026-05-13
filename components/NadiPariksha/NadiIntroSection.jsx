"use client";

import RevealOnScroll from "../Main/RevealOnScroll";
import WellnessButton from "../layouts/WellnessButton";
import { heroContent, featuredCities } from "./nadiParikshaData";

export default function NadiIntroSection() {
  return (
    <section className="section-padding bg-[#fcfaf7]">
      <div className="container-width">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <RevealOnScroll>
            <p className="eyebrow-text mb-3 text-[#c79f31]">Pulse Diagnosis</p>
            <h2 className="section-title text-[#1f1a17]">
              Begin With A Clearer Understanding Of Your Body
            </h2>
            <div className="mt-4 h-[3px] w-[72px] rounded-full bg-[#c79f31]" />
            <div className="mt-6 space-y-4">
              {heroContent.description.map((paragraph) => (
                <p key={paragraph} className="para-text text-[#5e5751]">
                  {paragraph}
                </p>
              ))}
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.15}>
            <div className="rounded-[28px] bg-[#3b2218] p-6 text-white shadow-[0_18px_42px_rgba(31,23,20,0.18)] md:p-8">
              <p className="eyebrow-text text-[#e7d58f]">Available Locations</p>
              <h3 className="section-subtitle mt-3 text-white">
                Book Your Nadi Pariksha In Chennai Or Pondicherry
              </h3>
              <div className="mt-6 space-y-4">
                {featuredCities.map((city) => (
                  <div
                    key={city.name}
                    className="rounded-[22px] border border-white/10 bg-white/5 p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-lg font-semibold text-white">
                          {city.name}
                        </p>
                        <p className="mt-1 text-sm text-white/70">
                          {city.description}
                        </p>
                      </div>
                      <span className="rounded-full bg-[#e7d58f] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#3b2218]">
                        {city.tag}
                      </span>
                    </div>
                    <div className="mt-4">
                      <WellnessButton href="/contact" label="Book Now" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

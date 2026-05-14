"use client";

import RevealOnScroll from "../Main/RevealOnScroll";
import { heroContent } from "./nadiParikshaData";

export default function NadiIntroSection() {
  return (
    <section className="section-padding bg-[#fcfaf7]">
      <div className="container-width">
        <div className="max-w-4xl">
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
        </div>
      </div>
    </section>
  );
}

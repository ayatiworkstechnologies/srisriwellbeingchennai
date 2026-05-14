"use client";

import Image from "next/image";
import RevealOnScroll from "../Main/RevealOnScroll";
import { heroContent } from "./nadiParikshaData";

export default function NadiIntroSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <Image
        src="/images/sec-1.svg"
        alt=""
        fill
        className="object-cover opacity-35"
        priority={false}
        aria-hidden="true"
      />
      <div className="absolute inset-0 " aria-hidden="true" />
      <div className="container-width relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <RevealOnScroll>
            <p className="eyebrow-text mb-3 text-[#b6841d]">
              Pulse Diagnosis
            </p>
            <h2 className="section-title text-[#3b2218]">
              Begin With A Clearer Understanding Of Your Body
            </h2>
            <div className="mx-auto mt-4 h-[3px] w-[72px] rounded-full bg-[#b6841d]" />
            <div className="mt-6 space-y-4">
              {heroContent.description.map((paragraph) => (
                <p key={paragraph} className="para-text text-[#4f423a]">
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

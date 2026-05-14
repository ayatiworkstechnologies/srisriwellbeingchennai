"use client";

import Image from "next/image";
import RevealOnScroll from "../Main/RevealOnScroll";
import { heroContent } from "./nadiParikshaData";

export default function NadiIntroSection() {
  return (
    <section className="relative overflow-hidden px-4 py-16 md:px-6 md:py-20 lg:py-24">
      <Image
        src="/images/sec-1.svg"
        alt=""
        fill
        className="object-cover"
        priority={false}
        aria-hidden="true"
      />
      <div className="container-width relative z-10">
        <div className="mx-auto max-w-5xl text-center">
          <RevealOnScroll>
            <p className="text-[12px] font-bold uppercase tracking-[0.24em] text-[#b88f28]">
              Pulse Diagnosis
            </p>
            <h2 className="mx-auto mt-4 max-w-4xl text-[28px] font-bold leading-tight text-[#2d1a12] md:text-[40px]">
              Begin With A Clearer Understanding Of Your Body
            </h2>
            <div className="mx-auto mt-5 h-[3px] w-[72px] rounded-full bg-[#c79f31]" />
            <div className="mx-auto mt-8 max-w-3xl space-y-5">
              {heroContent.description.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-[15px] font-medium leading-8 text-[#5f554e] md:text-[17px]"
                >
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

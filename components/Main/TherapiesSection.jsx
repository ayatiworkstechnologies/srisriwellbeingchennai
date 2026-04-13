"use client";

import Image from "next/image";

const therapyCards = [
  {
    title: "Ayurveda Therapy",
    desc: "Therapeutic oil-based treatments designed to detoxify, rejuvenate, and restore systemic balance.",
    image: "/images/therapy-1.jpg",
  },
  {
    title: "Beauty Rituals",
    desc: "Herbal therapies that enhance skin vitality, revealing a natural, lasting radiance.",
    image: "/images/therapy-2.jpg",
  },
  {
    title: "Eye & Mind Therapy",
    desc: "Specialised care to relieve digital strain, enhance clarity, and restore ocular balance.",
    image: "/images/therapy-3.jpg",
  },
];

export default function TherapiesSection() {
  return (
    <section className="bg-gradient-to-b from-[#f8f6f1] to-[#f7f4ef] py-14 md:py-20">
      <div className="mx-auto w-[min(1200px,calc(100%-24px))] md:w-[min(1200px,calc(100%-40px))]">
        <div className="mb-8 text-center md:mb-10">
          <h2 className="text-[28px] leading-tight font-bold text-[#1f1a17] md:text-[46px]">
            Precision Therapies. Profound Impact.
          </h2>
          <div className="mx-auto mt-3 h-[3px] w-[72px] rounded-full bg-gradient-to-r from-[#e7d58f] to-[#c79f31]" />
        </div>

        <div className="mx-auto grid max-w-[1080px] gap-5 rounded-[26px] bg-white/80 p-4 shadow-[0_18px_40px_rgba(0,0,0,0.06)] md:grid-cols-3 md:gap-6 md:p-6">
          {therapyCards.map((card) => (
            <div
              key={card.title}
              className="overflow-hidden rounded-[18px] bg-white shadow-[0_10px_24px_rgba(0,0,0,0.05)] transition hover:-translate-y-1.5 hover:shadow-[0_16px_28px_rgba(0,0,0,0.08)]"
            >
              <div className="p-3 pb-0">
                <Image
                  src={card.image}
                  alt={card.title}
                  width={320}
                  height={320}
                  className="h-[220px] w-full rounded-[14px] object-cover md:h-[250px]"
                />
              </div>

              <div className="p-4 md:p-5">
                <h3 className="text-[20px] leading-tight font-bold text-[#231c17] md:text-[22px]">
                  {card.title}
                </h3>
                <p className="mt-2 text-[13px] leading-7 text-[#6a635d]">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
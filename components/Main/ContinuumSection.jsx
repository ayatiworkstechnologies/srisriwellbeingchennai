"use client";

import Image from "next/image";
import RevealOnScroll from "./RevealOnScroll";

const pathways = [
  {
    number: "01",
    tag: "Deep Relaxation Therapies",
    title: "Relax",
    desc: "Signature Ayurvedic experiences designed to release physical and mental fatigue, restoring deep calm.",
    image: "/images/img-1.png",
  },
  {
    number: "02",
    tag: "Therapeutic Healing Programs",
    title: "Heal",
    desc: "Targeted treatments guided by Ayurvedic diagnostics to address chronic imbalances and lifestyle conditions.",
    image: "/images/img-2.png",
  },
  {
    number: "03",
    tag: "Guided Wellness Sessions",
    title: "Webinars",
    desc: "Expert-led knowledge sessions to deepen awareness of holistic health and sustainable living.",
    image: "/images/img-3.png",
  },
  // {
  //   number: "04",
  //   tag: "Transformational Training Experiences",
  //   title: "Trainings",
  //   desc: "Immersive programs that empower long-term lifestyle shifts through ancient wisdom and modern application.",
  //   image: "/images/img-01.png",
  // },
];

const marqueeItems = [...pathways, ...pathways];

export default function ContinuumSection() {
  return (
    <section
      id="relax"
      className="relative overflow-hidden bg-[#f6f3ee] py-14 md:py-20"
    >
      {/* Background Image */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/images/sec-2-bg.svg"
          alt="Background Pattern"
          fill
          className="object-cover"
          priority={false}
        />
      </div>

      <RevealOnScroll className="relative z-10 mx-auto mb-10 w-[min(1200px,calc(100%-24px))] md:mb-12 md:w-[min(1200px,calc(100%-40px))]">
        <h2 className="text-4xl md:text-5xl font-bold leading-tight text-[#1f1a17]">
          Curated Pathways to Restoration
        </h2>
        <div className="mt-3 h-[3px] w-[72px] rounded-full bg-linear-to-r from-[#e7d58f] to-[#c79f31]" />
      </RevealOnScroll>

      <div className="relative z-10">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-10 bg-linear-to-r from-[#f6f3ee] to-transparent md:w-20" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-10 bg-linear-to-l from-[#f6f3ee] to-transparent md:w-20" />

        <RevealOnScroll direction="left" delay={0.2}>
          <div className="pathways-marquee flex w-max gap-6 md:gap-8">
            {marqueeItems.map((item, index) => (
              <div
                key={`${item.number}-${index}`}
                className="flex min-h-[280px] w-[380px] shrink-0 items-center gap-6 rounded-[24px] bg-transparent px-3 py-3 md:min-h-[360px] md:w-[600px] md:gap-8"
              >
                <div className="min-w-0 flex-1">
                  <div className="text-[58px] font-semibold leading-none text-black/10 md:text-[96px]">
                    {item.number}
                  </div>

                  <div className="-mt-2 mb-4 flex items-center gap-2 md:mb-6 md:gap-3">
                    <span className="h-[2px] w-10 rounded-full bg-[#d0a93d] md:w-12" />
                    <p className="text-2xl md:text-3xl font-medium text-[#c29a2f]">
                      {item.title}
                    </p>
                  </div>

                  <h3 className="max-w-[220px] text-xl md:text-2xl font-bold leading-tight text-[#191512] md:max-w-[280px]">
                    {item.tag}
                  </h3>

                  <p className="mt-3 max-w-[230px] text-base md:text-lg leading-6 text-[#5e5751] md:mt-4 md:max-w-[300px]">
                    {item.desc}
                  </p>
                </div>

                <div className="w-[150px] shrink-0 overflow-hidden rounded-[14px] shadow-[0_12px_30px_rgba(0,0,0,0.08)] md:w-[240px] md:rounded-[18px]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={300}
                    height={380}
                    className="h-[200px] w-full object-cover md:h-[300px]"
                  />
                </div>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>

      {/* bottom pattern image */}
      <div className="relative z-10 mx-auto mt-8 w-[min(1200px,calc(100%-24px))] md:mt-10 md:w-[min(1200px,calc(100%-40px))]">
        <Image
          src="/images/pathway-patten.svg"
          alt="Bottom pattern"
          width={1400}
          height={80}
          className="h-auto w-full object-contain"
        />
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";

const pathways = [
  {
    number: "01",
    tag: "Restore Balance Naturally",
    title: "Deep Relaxation Therapies",
    desc: "Signature Ayurvedic experiences designed to release physical and mental fatigue, restoring deep calm.",
    image: "/images/img-01.png",
  },
  {
    number: "02",
    tag: "Radiance Rooted in Nature",
    title: "Therapeutic Healing Programs",
    desc: "Targeted treatments guided by Ayurvedic principles to address chronic imbalance and lifestyle conditions.",
    image: "/images/img-02.png",
  },
  {
    number: "03",
    tag: "Balance Through Ritual",
    title: "Ayurvedic Detox Experiences",
    desc: "Rejuvenating therapies that gently cleanse the body, calm the nerves, and support internal harmony.",
    image: "/images/img-01.png",
  },
  {
    number: "04",
    tag: "Mindful Inner Renewal",
    title: "Emotional Wellness Sessions",
    desc: "Thoughtfully guided experiences that help restore clarity, emotional calm, and mindful awareness.",
    image: "/images/img-02.png",
  },
];

const marqueeItems = [...pathways, ...pathways];

export default function PathwaysSection() {
  return (
    <section className="relative overflow-hidden bg-[#f6f3ee] py-14 md:py-20">
      <div className="mx-auto mb-10 w-[min(1200px,calc(100%-24px))] md:mb-12 md:w-[min(1200px,calc(100%-40px))]">
        <h2 className="text-[28px] font-bold leading-tight text-[#1f1a17] md:text-[46px]">
          Curated Pathways to Restoration
        </h2>
        <div className="mt-3 h-[3px] w-[72px] rounded-full bg-gradient-to-r from-[#e7d58f] to-[#c79f31]" />
      </div>

      <div className="relative z-10">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-10 bg-gradient-to-r from-[#f6f3ee] to-transparent md:w-20" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-10 bg-gradient-to-l from-[#f6f3ee] to-transparent md:w-20" />

        <div className="pathways-marquee flex w-max gap-5 md:gap-7">
          {marqueeItems.map((item, index) => (
            <div
              key={`${item.number}-${index}`}
              className="flex min-h-[250px] w-[320px] shrink-0 items-center gap-4 rounded-[24px] bg-transparent px-2 py-2 md:min-h-[300px] md:w-[520px] md:gap-6"
            >
              <div className="min-w-0 flex-1">
                <div className="text-[58px] font-semibold leading-none text-black/10 md:text-[96px]">
                  {item.number}
                </div>

                <div className="-mt-2 mb-4 flex items-center gap-2 md:mb-5 md:gap-3">
                  <span className="h-[2px] w-10 rounded-full bg-[#d0a93d] md:w-12" />
                  <p className="text-[11px] font-medium text-[#c29a2f] md:text-[13px]">
                    {item.tag}
                  </p>
                </div>

                <h3 className="max-w-[220px] text-[20px] font-bold leading-tight text-[#191512] md:max-w-[260px] md:text-[30px]">
                  {item.title}
                </h3>

                <p className="mt-3 max-w-[230px] text-[12px] leading-6 text-[#5e5751] md:max-w-[280px] md:text-[14px] md:leading-7">
                  {item.desc}
                </p>
              </div>

              <div className="w-[110px] shrink-0 overflow-hidden rounded-[14px] shadow-[0_12px_30px_rgba(0,0,0,0.08)] md:w-[180px] md:rounded-[18px]">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={220}
                  height={280}
                  className="h-[150px] w-full object-cover md:h-[240px]"
                />
              </div>
            </div>
          ))}
        </div>
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
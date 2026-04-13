"use client";

import Image from "next/image";

const pathways = [
  {
    number: "01",
    tag: "Restore Balance Naturally",
    title: "Deep Relaxation Therapies",
    desc: "Signature Ayurvedic experiences designed to release physical and mental fatigue, restoring deep calm.",
    image: "/images/pathway-1.jpg",
  },
  {
    number: "02",
    tag: "Radiance Rooted in Nature",
    title: "Therapeutic Healing Programs",
    desc: "Targeted treatments guided by Ayurvedic principles to address chronic imbalance and lifestyle conditions.",
    image: "/images/pathway-2.jpg",
  },
];

export default function PathwaysSection() {
  return (
    <section className="bg-[#f6f3ee] py-14 md:py-20">
      <div className="mx-auto w-[min(1200px,calc(100%-24px))] md:w-[min(1200px,calc(100%-40px))]">
        <div className="mb-10">
          <h2 className="text-[28px] leading-tight font-bold text-[#1f1a17] md:text-[46px]">
            Curated Pathways to Restoration
          </h2>
          <div className="mt-3 h-[3px] w-[72px] rounded-full bg-gradient-to-r from-[#e7d58f] to-[#c79f31]" />
        </div>

        <div className="space-y-10 md:space-y-12">
          {pathways.map((item) => (
            <div
              key={item.number}
              className="grid items-center gap-6 md:grid-cols-[1fr_280px] md:gap-10"
            >
              <div>
                <div className="text-[62px] leading-none font-semibold text-black/10 md:text-[110px]">
                  {item.number}
                </div>

                <div className="-mt-2 mb-4 flex items-center gap-3 md:mb-5">
                  <span className="h-[2px] w-12 rounded-full bg-[#d0a93d]" />
                  <p className="text-[12px] font-medium text-[#c29a2f] md:text-[13px]">
                    {item.tag}
                  </p>
                </div>

                <h3 className="max-w-[420px] text-[24px] leading-tight font-bold text-[#191512] md:text-[34px]">
                  {item.title}
                </h3>

                <p className="mt-3 max-w-[430px] text-[13px] leading-7 text-[#5e5751] md:text-[14px] md:leading-8">
                  {item.desc}
                </p>
              </div>

              <div className="max-w-[320px] overflow-hidden rounded-2xl shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={320}
                  height={380}
                  className="h-[320px] w-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
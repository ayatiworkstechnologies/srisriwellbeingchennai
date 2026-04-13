"use client";

import Image from "next/image";

const therapyCards = [
  {
    title: "Nadi Pariksha",
    desc: "A refined diagnostic ritual that reveals subtle imbalances.",
    image: "/images/therapy-01.png",
  },
  {
    title: "Panchakarma Rituals",
    desc: "A classical detox immersion designed to cleanse, recalibrate.",
    image: "/images/therapy-02.png",
  },
  {
    title: "Marma Therapy",
    desc: "An ancient energy-based technique that activates vital points.",
    image: "/images/therapy-03.png",
  },
  {
    title: "Osteopathic Alignment",
    desc: "A gentle, hands-on approach that restores structural balance.",
    image: "/images/Image-01.png",
  },
  {
    title: "Ozone Therapy",
    desc: "An advanced restorative therapy that revitalises cellular function.",
    image: "/images/img-01.png",
  },
  {
    title: "Meru Alignment Therapy",
    desc: "A specialised spinal care experience that refines posture.",
    image: "/images/img-02.png",
  },
  {
    title: "Craniosacral Therapy",
    desc: "A subtle, meditative therapy that harmonises the nervous system.",
    image: "/images/therapy-01.png",
  },
  {
    title: "Pain Management",
    desc: "Targeted therapeutic interventions designed to ease chronic discomfort.",
    image: "/images/therapy-02.png",
  },
];

export default function ServicesSection() {
  return (
    <section
      id="heal"
      className="relative overflow-hidden bg-[#f8f6f1] py-14 md:py-20"
    >
      {/* background pattern image */}
      <div className="absolute inset-0">
        <Image
          src="/images/therapy-bg-pattern.svg"
          alt="Background pattern"
          fill
          className="object-cover"
        />
      </div>

      <div className="relative z-10 mx-auto w-[min(1200px,calc(100%-24px))] md:w-[min(1200px,calc(100%-40px))]">
        <div className="mb-8 text-center md:mb-10">
          <h2 className="text-[26px] leading-tight font-bold text-[#1f1a17] md:text-[46px]">
            Precision Therapies. Profound Impact.
          </h2>
          <div className="mx-auto mt-3 h-[3px] w-[72px] rounded-full bg-gradient-to-r from-[#e7d58f] to-[#c79f31]" />
        </div>

        <div className="relative mx-auto max-w-[1080px] rounded-[24px] bg-white/90 px-4 py-5 shadow-[0_18px_40px_rgba(0,0,0,0.08)] backdrop-blur-sm md:px-7 md:py-7">
          {/* left arrow */}
          <button
            type="button"
            className="absolute left-[-10px] top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-[#d9be69] bg-white text-[#c8a53a] shadow-sm transition hover:bg-[#d0a93d] hover:text-white md:left-[-18px] md:h-10 md:w-10"
          >
            ‹
          </button>

          {/* right arrow */}
          <button
            type="button"
            className="absolute right-[-10px] top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-[#d9be69] bg-white text-[#c8a53a] shadow-sm transition hover:bg-[#d0a93d] hover:text-white md:right-[-18px] md:h-10 md:w-10"
          >
            ›
          </button>

          <div className="grid gap-4 md:grid-cols-4 md:gap-6">
            {therapyCards.slice(0, 4).map((card) => (
              <div
                key={card.title}
                className="overflow-hidden rounded-[14px] bg-white shadow-[0_8px_20px_rgba(0,0,0,0.05)]"
              >
                <div className="p-3 pb-0">
                  <div className="overflow-hidden p-2">
                    <Image
                      src={card.image}
                      alt={card.title}
                      width={320}
                      height={320}
                      className="h-[140px] w-full rounded-[8px] object-cover"
                    />
                  </div>
                </div>

                <div className="px-3 pb-4 pt-3 md:px-4 md:pb-5">
                  <h3 className="text-[14px] font-bold leading-tight text-[#231c17] md:text-[18px]">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-[11px] leading-5 text-[#7a726c] md:text-[12px] md:leading-6">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

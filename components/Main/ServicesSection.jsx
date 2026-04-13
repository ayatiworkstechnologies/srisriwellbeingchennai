"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

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
  const [cardsPerPage, setCardsPerPage] = useState(4);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const updateCardsPerPage = () => {
      if (window.innerWidth < 768) {
        setCardsPerPage(1);
        return;
      }

      if (window.innerWidth < 1024) {
        setCardsPerPage(2);
        return;
      }

      setCardsPerPage(4);
    };

    updateCardsPerPage();
    window.addEventListener("resize", updateCardsPerPage);

    return () => window.removeEventListener("resize", updateCardsPerPage);
  }, []);

  const totalPages = Math.ceil(therapyCards.length / cardsPerPage);
  const currentPage = Math.min(page, Math.max(totalPages - 1, 0));

  const visibleCards = useMemo(() => {
    const start = currentPage * cardsPerPage;
    return therapyCards.slice(start, start + cardsPerPage);
  }, [currentPage, cardsPerPage]);

  const canGoPrev = currentPage > 0;
  const canGoNext = currentPage < totalPages - 1;

  return (
    <section
      id="heal"
      className="relative overflow-hidden bg-[#f8f6f1] py-16 md:py-24"
    >
      <div className="absolute inset-0">
        <Image
          src="/images/therapy-bg-pattern.svg"
          alt="Background pattern"
          fill
          className="object-cover opacity-70"
        />
      </div>

      <div className="relative z-10 mx-auto w-[min(1380px,calc(100%-24px))] md:w-[min(1380px,calc(100%-40px))]">
        <div className="mb-10 text-center md:mb-14">
          <h2 className="text-[28px] font-bold leading-tight text-[#1f1a17] md:text-[52px]">
            Precision Therapies. Profound Impact.
          </h2>
          <div className="mx-auto mt-4 h-[3px] w-[82px] rounded-full bg-gradient-to-r from-[#e7d58f] to-[#c79f31]" />
        </div>

        <div className="relative mx-auto max-w-[1320px] rounded-[30px] bg-white/90 px-5 py-6 shadow-[0_20px_50px_rgba(0,0,0,0.08)] backdrop-blur-sm md:px-8 md:py-8 lg:px-10 lg:py-10">
          <button
            type="button"
            onClick={() => canGoPrev && setPage(currentPage - 1)}
            disabled={!canGoPrev}
            className="absolute left-[-8px] top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#d9be69] bg-white text-[20px] text-[#c8a53a] shadow-sm transition hover:bg-[#d0a93d] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 md:left-[-18px] md:h-12 md:w-12"
            aria-label="Previous services"
          >
            &#8249;
          </button>

          <button
            type="button"
            onClick={() => canGoNext && setPage(currentPage + 1)}
            disabled={!canGoNext}
            className="absolute right-[-8px] top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#d9be69] bg-white text-[20px] text-[#c8a53a] shadow-sm transition hover:bg-[#d0a93d] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 md:right-[-18px] md:h-12 md:w-12"
            aria-label="Next services"
          >
            &#8250;
          </button>

          <div className="grid gap-5 md:grid-cols-2 md:gap-7 lg:grid-cols-4">
            {visibleCards.map((card) => (
              <div
                key={card.title}
                className="group flex h-full min-h-[470px] flex-col overflow-hidden rounded-[22px] bg-white shadow-[0_12px_30px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgba(0,0,0,0.10)]"
              >
                <div className="p-4 pb-0">
                  <div className="overflow-hidden rounded-[18px]">
                    <Image
                      src={card.image}
                      alt={card.title}
                      width={520}
                      height={520}
                      className="h-[240px] w-full object-cover transition duration-500 group-hover:scale-[1.05] md:h-[270px]"
                    />
                  </div>
                </div>

                <div className="flex flex-1 flex-col px-4 pb-5 pt-4 md:px-5 md:pb-6 md:pt-5">
                  <h3 className="text-[17px] font-bold leading-tight text-[#231c17] md:text-[22px]">
                    {card.title}
                  </h3>

                  <p className="mt-3 text-[12px] leading-6 text-[#7a726c] md:text-[13px] md:leading-7">
                    {card.desc}
                  </p>

                  <button
                    type="button"
                    className="mt-5 inline-flex w-fit items-center rounded-full border border-[#d9be69] px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#b88621] transition hover:bg-[#d0a93d] hover:text-white"
                  >
                    Explore
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center gap-2.5">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={`page-dot-${idx}`}
                type="button"
                onClick={() => setPage(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  idx === currentPage ? "w-8 bg-[#c79f31]" : "w-2.5 bg-[#d8c8a2]"
                }`}
                aria-label={`Go to services page ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
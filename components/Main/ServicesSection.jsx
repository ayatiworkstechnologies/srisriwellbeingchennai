"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import RevealOnScroll from "./RevealOnScroll";

const therapyCards = [
  {
    title: "Nadi Pariksha",
    desc: "A refined diagnostic ritual that reveals subtle imbalances, guiding deeply personalised pathways to restore internal harmony.",
    image: "/images/ser-1.jpg",
  },
  {
    title: "Panchakarma Rituals",
    desc: "A classical detox immersion designed to cleanse, recalibrate, and awaken the body's innate intelligence for renewal.",
    image: "/images/ser-2.jpg",
  },
  {
    title: "Marma Therapy",
    desc: "An ancient energy-based technique that activates vital points to release stagnation and enhance overall vitality.",
    image: "/images/ser-3.jpg",
  },
  {
    title: "Osteopathic Alignment",
    desc: "A gentle, hands-on approach that restores structural balance, improving mobility, ease, and functional wellbeing.",
    image: "/images/ser-4.jpg",
  },
  {
    title: "Ozone Therapy",
    desc: "An advanced restorative therapy that revitalises cellular function, supporting recovery and systemic rejuvenation.",
    image: "/images/ser-5.jpg",
  },
  {
    title: "Meru Alignment Therapy",
    desc: "A specialised spinal care experience that refines posture, releases deep tension, and restores fluid movement.",
    image: "/images/ser-6.jpg",
  },
  {
    title: "Craniosacral Therapy",
    desc: "A subtle, meditative therapy that harmonises the nervous system, promoting deep relaxation and inner balance.",
    image: "/images/ser-7.jpg",
  },
  {
    title: "Pain Management Therapies",
    desc: "Targeted therapeutic interventions designed to ease chronic discomfort and restore natural movement with precision.",
    image: "/images/ser-8.jpg",
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
          src="/images/bg.svg"
          alt="Background pattern"
          fill
          className="object-cover"
        />
      </div>

      <div className="relative z-10 mx-auto w-[min(1380px,calc(100%-24px))] md:w-[min(1380px,calc(100%-40px))]">
        <RevealOnScroll className="mb-10 text-center md:mb-14">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight text-[#1f1a17]">
            Precision Therapies. Profound Impact.
          </h2>
          <div className="mx-auto mt-4 h-[3px] w-[82px] rounded-full bg-linear-to-r from-[#e7d58f] to-[#c79f31]" />
        </RevealOnScroll>

        <RevealOnScroll delay={0.2} className="relative mx-auto max-w-[1320px] rounded-[30px] bg-white/90 px-5 py-6 shadow-[0_20px_50px_rgba(0,0,0,0.08)] backdrop-blur-sm md:px-8 md:py-8 lg:px-10 lg:py-10">
          <button
            type="button"
            onClick={() => canGoPrev && setPage(currentPage - 1)}
            disabled={!canGoPrev}
            className="absolute left-[2px] top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#d9be69] bg-white text-[20px] text-[#c8a53a] shadow-sm transition hover:bg-[#d0a93d] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 md:left-[-18px] md:h-12 md:w-12"
            aria-label="Previous services"
          >
            &#8249;
          </button>

          <button
            type="button"
            onClick={() => canGoNext && setPage(currentPage + 1)}
            disabled={!canGoNext}
            className="absolute right-[2px] top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#d9be69] bg-white text-[20px] text-[#c8a53a] shadow-sm transition hover:bg-[#d0a93d] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 md:right-[-18px] md:h-12 md:w-12"
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
                  <h3 className="text-xl md:text-2xl font-bold leading-tight text-[#231c17]">
                    {card.title}
                  </h3>

                  <p className="mt-3 text-base md:text-lg leading-7 text-[#7a726c]">
                    {card.desc}
                  </p>

                  <button
                    type="button"
                    className="mt-auto inline-flex w-fit items-center rounded-full border border-[#d9be69] px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#b88621] transition hover:bg-[#d0a93d] hover:text-white"
                  >
                    Explore Therapy
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
                className={`h-2.5 rounded-full transition-all duration-300 ${idx === currentPage ? "w-8 bg-[#c79f31]" : "w-2.5 bg-[#d8c8a2]"
                  }`}
                aria-label={`Go to services page ${idx + 1}`}
              />
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
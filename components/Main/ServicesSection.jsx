"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import RevealOnScroll from "./RevealOnScroll";

const therapyCards = [
  {
    title: "Nadi Pariksha",
    desc: "A non-invasive Ayurvedic pulse diagnosis technique used by our practitioners to assess your doshas and identify imbalances, serving as the starting point for your personalized wellness journey.",
    image: "/images/ser-1.jpg",
  },
  {
    title: "Panchakarma Rituals",
    desc: "A comprehensive Ayurvedic detoxification and cleansing program designed to eliminate deep-seated toxins and effectively restore balance to the body and mind.",
    image: "/images/ser-2.jpg",
  },
  {
    title: "Marma Therapy",
    desc: "An Ayurvedic technique involving gentle stimulation of specific vital energy points on the body to improve energy flow, reduce stress, and support deep healing.",
    image: "/images/ser-3.jpg",
  },
  {
    title: "Osteopathic Therapy",
    desc: "A manual therapy focused on the body's musculoskeletal system, aiming to improve overall health by strengthening the framework of the body and managing pain.",
    image: "/images/ser-4.jpg",
  },
  {
    title: "Ozone Therapy",
    desc: "An advanced restorative treatment utilized to address various chronic conditions and enhance overall systemic vitality through the healing properties of ozone.",
    image: "/images/ser-5.jpg",
  },
  {
    title: "Meru Therapy",
    desc: "A specialized therapy deeply focused on spinal health and alignment, aiming to restore harmony and balance to the body's structural and energetic systems.",
    image: "/images/ser-6.jpg",
  },
  {
    title: "Craniosacral Therapy",
    desc: "A gentle, hands-on technique that monitors the rhythm of cerebrospinal fluid to release tensions deep in the body, relieving pain and dysfunction.",
    image: "/images/ser-7.jpg",
  },
  {
    title: "Pain Management Therapies",
    desc: "Integrative treatments combining classical and contemporary therapies, including L&B pain management, to address chronic discomfort and restore natural mobility.",
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
          <h2 className="text-2xl md:text-4xl font-bold leading-tight text-[#1f1a17]">
            Precision Therapies. Profound Impact.
          </h2>
          <div className="mx-auto mt-4 h-[3px] w-[82px] rounded-full bg-linear-to-r from-[#e7d58f] to-[#c79f31]" />
        </RevealOnScroll>

        <RevealOnScroll
          delay={0.2}
          className="relative mx-auto max-w-[1320px] rounded-[30px] bg-white/90 px-5 py-6 shadow-[0_20px_50px_rgba(0,0,0,0.08)] backdrop-blur-sm md:px-8 md:py-8 lg:px-10 lg:py-10"
        >
          <button
            type="button"
            onClick={() => canGoPrev && setPage(currentPage - 1)}
            disabled={!canGoPrev}
            className="absolute left-[8px] top-1/2 z-20 group ripple-container flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#d0a93d] shadow-lg transition-all duration-300 hover:scale-110 disabled:cursor-not-allowed disabled:opacity-40 md:left-[-22px] md:h-14 md:w-14"
            aria-label="Previous services"
          >
            {/* Ripple Rings */}
            <span
              className="ripple-element pulse-ring absolute inset-0 rounded-full border border-[#d0a93d]/30"
              style={{ animationDelay: "0s" }}
            />
            <span
              className="ripple-element pulse-ring absolute inset-[-8px] rounded-full border border-[#d0a93d]/20"
              style={{ animationDelay: "0.4s" }}
            />
            <span
              className="ripple-element pulse-ring absolute inset-[-16px] rounded-full border border-[#d0a93d]/10"
              style={{ animationDelay: "0.8s" }}
            />

            <FaChevronLeft className="relative z-10 text-[16px] md:text-[20px]" />
          </button>

          <button
            type="button"
            onClick={() => canGoNext && setPage(currentPage + 1)}
            disabled={!canGoNext}
            className="absolute right-[8px] top-1/2 z-20 group ripple-container flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#d0a93d] shadow-lg transition-all duration-300 hover:scale-110 disabled:cursor-not-allowed disabled:opacity-40 md:right-[-22px] md:h-14 md:w-14"
            aria-label="Next services"
          >
            {/* Ripple Rings */}
            <span
              className="ripple-element pulse-ring absolute inset-0 rounded-full border border-[#d0a93d]/30"
              style={{ animationDelay: "0s" }}
            />
            <span
              className="ripple-element pulse-ring absolute inset-[-8px] rounded-full border border-[#d0a93d]/20"
              style={{ animationDelay: "0.4s" }}
            />
            <span
              className="ripple-element pulse-ring absolute inset-[-16px] rounded-full border border-[#d0a93d]/10"
              style={{ animationDelay: "0.8s" }}
            />

            <FaChevronRight className="relative z-10 text-[16px] md:text-[20px]" />
          </button>

          <div className="grid gap-5 md:grid-cols-2 md:gap-7 lg:grid-cols-4">
            {visibleCards.map((card) => (
              <div
                key={card.title}
                className="group flex h-full min-h-[470px] flex-col overflow-hidden rounded-[22px] bg-white shadow-[0_12px_30px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgba(0,0,0,0.10)]"
              >
                <div className="p-4 pb-0">
                  <div className="overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.title}
                      width={520}
                      height={520}
                      className="h-[350px] w-full object-cover object-top transition duration-500 group-hover:scale-[1.05] md:h-[270px] md:object-center"
                    />
                  </div>
                </div>

                <div className="flex flex-1 flex-col px-4 pb-5 pt-4 md:px-5 md:pb-6 md:pt-5">
                  <h3 className="text-lg md:text-xl font-bold leading-tight text-[#231c17]">
                    {card.title}
                  </h3>

                  <p className="mt-3 text-base md:text-lg leading-7 text-[#7a726c]">
                    {card.desc}
                  </p>

                  <button
                    type="button"
                    className="mt-auto inline-flex w-fit items-center rounded-full border border-[#d9be69] px-5 py-2 text-[14px] font-semibold uppercase tracking-[0.12em] text-[#b88621] transition hover:bg-[#d0a93d] hover:text-white"
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
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  idx === currentPage
                    ? "w-8 bg-[#c79f31]"
                    : "w-2.5 bg-[#d8c8a2]"
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

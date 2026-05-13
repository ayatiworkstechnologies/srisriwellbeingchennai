"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa6";
import RevealOnScroll from "./RevealOnScroll";
import WellnessButton from "../layouts/WellnessButton";
import TherapyModal from "../Relax/TherapyModal";
import { AnimatePresence } from "framer-motion";
import { listPublicServices } from "@/lib/api";

function normalizeServiceTitle(title = "") {
  if (title.trim().toLowerCase() === "marma therapy") {
    return "Marma Chikitsa";
  }

  return title;
}

function normalizeServiceImage(title = "", image = "") {
  if (title.trim().toLowerCase() === "pain management therapies") {
    return "/images/heal/manual.png";
  }

  return image;
}

function normalizeBenefits(value) {
  if (Array.isArray(value)) {
    return value.map((item) => (typeof item === "string" ? item.trim() : "")).filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(/\r?\n|,/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

export default function ServicesSection() {
  const [cardsPerPage, setCardsPerPage] = useState(4);
  const [page, setPage] = useState(0);
  const [selectedService, setSelectedService] = useState(null);
  const [therapyCards, setTherapyCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let active = true;

    async function loadServices() {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const result = await listPublicServices();
        if (!active) return;
        setTherapyCards(
          (result || []).map((item) => ({
            id: item.id,
            title: normalizeServiceTitle(item.title),
            shortDescription: item.short_description || item.shortDescription || "",
            desc: item.short_description || item.shortDescription || "",
            details: item.description,
            image: normalizeServiceImage(item.title, item.image),
            rating: item.rating,
            benefits: normalizeBenefits(item.benefits),
          }))
        );
      } catch (error) {
        if (!active) return;
        setErrorMessage(error.message || "Unable to load services right now.");
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    loadServices();

    return () => {
      active = false;
    };
  }, []);

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
  }, [currentPage, cardsPerPage, therapyCards]);

  const canGoPrev = currentPage > 0;
  const canGoNext = currentPage < totalPages - 1;

  return (
    <section
      id="heal"
      className="section-padding relative overflow-hidden bg-[#f8f6f1]"
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
        <RevealOnScroll className="title-center mb-10 md:mb-14">
          <h2 className="section-title text-[#1f1a17]">
            Precision Therapies. Profound Impact.
          </h2>
          <div className="mx-auto mt-4 h-[3px] w-[82px] rounded-full bg-linear-to-r from-[#e7d58f] to-[#c79f31]" />
        </RevealOnScroll>

        <RevealOnScroll
          delay={0.2}
          className="relative mx-auto max-w-[1320px] rounded-[30px] bg-white/90 px-5 py-6 shadow-[0_20px_50px_rgba(0,0,0,0.08)] backdrop-blur-sm md:px-8 md:py-8 lg:px-10 lg:py-10"
        >
          {/* Prev button */}
          <button
            type="button"
            onClick={() => canGoPrev && setPage(currentPage - 1)}
            disabled={!canGoPrev}
            className="absolute left-2 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#d0a93d] shadow-lg transition-all duration-300 hover:scale-110 disabled:cursor-not-allowed disabled:opacity-40 md:flex md:h-12 md:w-12 lg:left-[-22px] lg:h-14 lg:w-14"
            aria-label="Previous services"
          >
            {/* Ripple Rings — animate on hover/click only */}
            <span
              className="hover-pulse-ring absolute inset-0 rounded-full border border-[#d0a93d]/30"
              style={{ animationDelay: "0s" }}
            />
            <span
              className="hover-pulse-ring absolute inset-[-8px] rounded-full border border-[#d0a93d]/20"
              style={{ animationDelay: "0.4s" }}
            />
            <span
              className="hover-pulse-ring absolute inset-[-16px] rounded-full border border-[#d0a93d]/10"
              style={{ animationDelay: "0.8s" }}
            />
            <FaChevronLeft className="relative z-10 text-[16px] md:text-[20px]" />
          </button>

          {/* Next button */}
          <button
            type="button"
            onClick={() => canGoNext && setPage(currentPage + 1)}
            disabled={!canGoNext}
            className="absolute right-2 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#d0a93d] shadow-lg transition-all duration-300 hover:scale-110 disabled:cursor-not-allowed disabled:opacity-40 md:flex md:h-12 md:w-12 lg:right-[-22px] lg:h-14 lg:w-14"
            aria-label="Next services"
          >
            {/* Ripple Rings — animate on hover/click only */}
            <span
              className="hover-pulse-ring absolute inset-0 rounded-full border border-[#d0a93d]/30"
              style={{ animationDelay: "0s" }}
            />
            <span
              className="hover-pulse-ring absolute inset-[-8px] rounded-full border border-[#d0a93d]/20"
              style={{ animationDelay: "0.4s" }}
            />
            <span
              className="hover-pulse-ring absolute inset-[-16px] rounded-full border border-[#d0a93d]/10"
              style={{ animationDelay: "0.8s" }}
            />
            <FaChevronRight className="relative z-10 text-[16px] md:text-[20px]" />
          </button>

          {isLoading ? (
            <div className="rounded-[22px] border border-[#eadfcf] bg-[#fcfaf6] px-6 py-16 text-center text-sm text-[#7a726c]">
              Loading services from the API...
            </div>
          ) : errorMessage ? (
            <div className="rounded-[22px] border border-red-200 bg-red-50 px-6 py-16 text-center text-sm text-red-700">
              {errorMessage}
            </div>
          ) : visibleCards.length === 0 ? (
            <div className="rounded-[22px] border border-[#eadfcf] bg-[#fcfaf6] px-6 py-16 text-center text-sm text-[#7a726c]">
              No services available right now.
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 md:gap-7 lg:grid-cols-4">
              {visibleCards.map((card) => (
                <div
                  key={card.id || card.title}
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
                    <h3 className="section-subtitle text-[#231c17]">
                      {card.title}
                    </h3>

                    {card.rating ? (
                      <div className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-[#b88f28]">
                        <FaStar className="text-[13px]" />
                        <span>{Number(card.rating).toFixed(1)}</span>
                      </div>
                    ) : null}

                    <p className="para-text mt-3 text-[#7a726c]">
                      {card.desc}
                    </p>

                    <WellnessButton
                      onClick={() => setSelectedService(card)}
                      label="Explore Therapy"
                      className="mt-auto scale-90 origin-left"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {totalPages > 1 ? (
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
          ) : null}
        </RevealOnScroll>
      </div>

      <AnimatePresence>
        {selectedService && (
          <TherapyModal
            therapy={selectedService}
            onClose={() => setSelectedService(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

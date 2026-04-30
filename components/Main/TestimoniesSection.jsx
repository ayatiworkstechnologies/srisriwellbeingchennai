"use client";

import { useEffect, useMemo, useState } from "react";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import RevealOnScroll from "./RevealOnScroll";

const testimonies = [
  {
    name: "Anusha Rajan",
    review:
      "A deeply soothing and authentic experience. Netra Tejas felt gentle yet remarkably effective, bringing clarity and comfort in the most natural way. A refined approach to non-invasive care that truly delivers.",
  },
  {
    name: "Muthukrishnan Gopal",
    review:
      "An exceptional destination for authentic Ayurvedic care. The experience is thoughtfully curated, offering both depth and genuine healing in a calm, welcoming environment.",
  },
  {
    name: "Meera Venkatesh",
    review:
      "What stood out was the level of personalisation. Beginning with Nadi Pariksha, every therapy felt aligned to my body's needs. The experience was unhurried, intuitive, and deeply restorative.",
  },
  {
    name: "Rohit Subramanian",
    review:
      "From Abhyanga to relaxation therapies, each session brought a noticeable sense of lightness and ease. The care extended to every member of the family, making it a truly holistic experience.",
  },
  {
    name: "Priya Narayanan",
    review:
      "I arrived seeking relief, but discovered something far more profound, a sense of stillness. Therapies like Shirodhara brought a quiet calm that stayed long after the session ended. A space where healing feels effortless",
  },
];

export default function TestimoniesSection() {
  const [cardsPerPage, setCardsPerPage] = useState(1);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const updateCardsPerPage = () => {
      if (window.innerWidth < 768) {
        setCardsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerPage(2);
      } else {
        setCardsPerPage(3);
      }
    };

    updateCardsPerPage();
    window.addEventListener("resize", updateCardsPerPage);
    return () => window.removeEventListener("resize", updateCardsPerPage);
  }, []);

  const totalPages = Math.ceil(testimonies.length / cardsPerPage);
  const currentPage = Math.min(page, Math.max(totalPages - 1, 0));

  const canGoPrev = currentPage > 0;
  const canGoNext = currentPage < totalPages - 1;

  return (
    <section
      id="testimonial"
      className="section-padding relative overflow-hidden bg-[#f6f3ee]"
    >
      <div className="mx-auto w-[min(1320px,calc(100%-24px))] md:w-[min(1320px,calc(100%-40px))]">
        <RevealOnScroll className="title-center mb-12 md:mb-16">
          <p className="eyebrow-text mb-3 text-[#c29a2f]">
            Journeys of Restoration
          </p>
          <h2 className="section-title text-[#1f1a17]">
            Voices of Wellbeing
          </h2>
          <div className="mx-auto mt-6 h-[3px] w-[72px] rounded-full bg-linear-to-r from-[#e7d58f] to-[#c79f31]" />
        </RevealOnScroll>

        <div className="relative">
          {/* Prev button */}
          <div className="absolute top-1/2 left-[-10px] z-20 -translate-y-1/2 md:left-[-30px]">
            <button
              onClick={() => canGoPrev && setPage(currentPage - 1)}
              disabled={!canGoPrev}
              className="group relative flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#c29a2f] shadow-[0_4px_15px_rgba(0,0,0,0.08)] transition-all duration-300 hover:scale-110 disabled:cursor-not-allowed disabled:opacity-40 md:h-14 md:w-14"
              aria-label="Previous testimonies"
            >
              <span
                className="hover-pulse-ring absolute inset-0 rounded-full border border-[#c29a2f]/30"
                style={{ animationDelay: "0s" }}
              />
              <span
                className="hover-pulse-ring absolute inset-[-8px] rounded-full border border-[#c29a2f]/20"
                style={{ animationDelay: "0.4s" }}
              />
              <FaChevronLeft className="relative z-10 text-[16px] md:text-[20px]" />
            </button>
          </div>

          {/* Next button */}
          <div className="absolute top-1/2 right-[-10px] z-20 -translate-y-1/2 md:right-[-30px]">
            <button
              onClick={() => canGoNext && setPage(currentPage + 1)}
              disabled={!canGoNext}
              className="group relative flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#c29a2f] shadow-[0_4px_15px_rgba(0,0,0,0.08)] transition-all duration-300 hover:scale-110 disabled:cursor-not-allowed disabled:opacity-40 md:h-14 md:w-14"
              aria-label="Next testimonies"
            >
              <span
                className="hover-pulse-ring absolute inset-0 rounded-full border border-[#c29a2f]/30"
                style={{ animationDelay: "0s" }}
              />
              <span
                className="hover-pulse-ring absolute inset-[-8px] rounded-full border border-[#c29a2f]/20"
                style={{ animationDelay: "0.4s" }}
              />
              <FaChevronRight className="relative z-10 text-[16px] md:text-[20px]" />
            </button>
          </div>

          <div className="relative overflow-hidden px-4 md:px-0">
            <motion.div
              className="flex gap-6"
              initial={false}
              animate={{ x: `-${currentPage * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {testimonies.map((item, index) => (
                <div
                  key={`${item.name}-${index}`}
                  className="flex min-h-[350px] w-full shrink-0 flex-col rounded-[22px] bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.08)] md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] md:p-8"
                >
                  <div className="mb-5 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className="text-[13px] md:text-[14px] text-[#d0a93d]"
                      />
                    ))}
                  </div>

                  <p className="para-text mb-8 flex-1 text-[#5e5751] italic">
                    &ldquo;{item.review}&rdquo;
                  </p>

                  <div className="flex items-center gap-4 border-t border-[#eee7de] pt-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f6f3ee] text-[15px] font-bold text-[#b28b22]">
                      {item.name.charAt(0)}
                    </div>

                    <div>
                      <h4 className="section-subtitle text-[#1f1a17]">
                        {item.name}
                      </h4>
                      <p className="text-[12px] text-[#857b72]">Guest</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Dots */}
        <div className="mt-10 flex items-center justify-center gap-2.5">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={`page-dot-${idx}`}
              onClick={() => setPage(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === currentPage ? "w-8 bg-[#c79f31]" : "w-2.5 bg-[#d8c8a2]"
              }`}
              aria-label={`Go to page ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

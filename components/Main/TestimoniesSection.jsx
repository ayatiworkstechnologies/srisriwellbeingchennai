"use client";

import { useState, useEffect, useCallback } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import RevealOnScroll from "./RevealOnScroll";

const defaultTestimonies = [
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

export default function TestimoniesSection({
  data = defaultTestimonies,
  title = "Voices of Wellbeing",
  subtitle = "Journeys of Restoration",
  className = "bg-[#f6f3ee]",
}) {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goTo = useCallback(
    (index) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrent(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const goNext = useCallback(() => {
    if (!data || data.length <= 1) return;
    goTo((current + 1) % data.length);
  }, [current, goTo, data]);

  const goPrev = useCallback(() => {
    if (!data || data.length <= 1) return;
    goTo((current - 1 + data.length) % data.length);
  }, [current, goTo, data]);

  // Auto-advance
  useEffect(() => {
    if (!data || data.length <= 1) return;
    const timer = setInterval(goNext, 6000);
    return () => clearInterval(timer);
  }, [goNext, data]);

  if (!data || data.length === 0) return null;

  const t = data[current];

  return (
    <section className={`section-padding relative ${className}`}>
      <div className="mx-auto w-[min(900px,calc(100%-24px))] md:w-[min(900px,calc(100%-40px))]">
        {/* Heading */}
        <RevealOnScroll className="title-center mb-10 md:mb-14">
          {subtitle && (
            <p className="eyebrow-text mb-3 text-[#c29a2f]">{subtitle}</p>
          )}
          <h2 className="section-title text-[#1f1a17] lg:text-[42px]">
            {title}
          </h2>
          <div className="mx-auto mt-4 h-[3px] w-[82px] rounded-full bg-gradient-to-r from-[#e7d58f] to-[#c79f31]" />
        </RevealOnScroll>

        {/* Testimonial Card */}
        <div className="relative">
          <div
            className="mx-auto max-w-[720px] rounded-[24px] bg-white px-6 py-8 shadow-[0_12px_40px_rgba(0,0,0,0.06)] transition-all duration-500 md:px-10 md:py-10"
            key={current}
          >
            {/* Quote mark */}
            <div className="text-5xl leading-none text-[#d0a93d]/30 font-serif mb-2">
              &ldquo;
            </div>

            {/* Quote text */}
            <p
              className="para-text text-[#5e5751] transition-opacity duration-500 italic"
              style={{
                animation: "fadeUp 0.5s ease-out forwards",
              }}
            >
              {t.review || t.quote}
            </p>

            {/* Divider */}
            <div className="my-6 h-px w-16 bg-[#d0a93d]/40 mx-auto" />

            {/* Author */}
            <div className="flex flex-col items-center justify-center gap-3 md:flex-row md:gap-4 mt-2">
              {t.image ? (
                <img
                  src={t.image}
                  alt={t.name}
                  className="h-12 w-12 rounded-full object-cover shadow-sm"
                />
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f6f3ee] text-[16px] font-bold text-[#b28b22] shadow-inner">
                  {t.name ? t.name.charAt(0) : "G"}
                </div>
              )}
              <div className="text-center md:text-left">
                <p className="text-[18px] font-bold text-[#1f1a17]">
                  {t.name}
                  {t.location && (
                    <>
                      , <span className="font-normal text-[#5e5751]">{t.location}</span>
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          {data.length > 1 && (
            <>
              <button
                type="button"
                onClick={goPrev}
                className="group absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-14 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#c29a2f] shadow-[0_4px_15px_rgba(0,0,0,0.08)] transition-all duration-300 hover:scale-110 hover:shadow-[0_8px_25px_rgba(0,0,0,0.12)] md:h-14 md:w-14"
                aria-label="Previous testimonial"
              >
                <span
                  className="hover-pulse-ring absolute inset-0 rounded-full border border-[#c29a2f]/30"
                  style={{ animationDelay: "0s" }}
                />
                <span
                  className="hover-pulse-ring absolute inset-[-8px] rounded-full border border-[#c29a2f]/20"
                  style={{ animationDelay: "0.4s" }}
                />
                <FaChevronLeft className="relative z-10 text-[14px] md:text-[18px]" />
              </button>

              <button
                type="button"
                onClick={goNext}
                className="group absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-14 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#c29a2f] shadow-[0_4px_15px_rgba(0,0,0,0.08)] transition-all duration-300 hover:scale-110 hover:shadow-[0_8px_25px_rgba(0,0,0,0.12)] md:h-14 md:w-14"
                aria-label="Next testimonial"
              >
                <span
                  className="hover-pulse-ring absolute inset-0 rounded-full border border-[#c29a2f]/30"
                  style={{ animationDelay: "0s" }}
                />
                <span
                  className="hover-pulse-ring absolute inset-[-8px] rounded-full border border-[#c29a2f]/20"
                  style={{ animationDelay: "0.4s" }}
                />
                <FaChevronRight className="relative z-10 text-[14px] md:text-[18px]" />
              </button>
            </>
          )}
        </div>

        {/* Dots */}
        {data.length > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2.5">
            {data.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => goTo(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  idx === current
                    ? "w-8 bg-[#c79f31]"
                    : "w-2.5 bg-[#c79f31]/25"
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

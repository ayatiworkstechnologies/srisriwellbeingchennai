"use client";

import { useState, useEffect, useCallback } from "react";
import { FaLocationDot, FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import RevealOnScroll from "../Main/RevealOnScroll";

export default function NetraTejasTestimonials({ testimonials }) {
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
    goTo((current + 1) % testimonials.length);
  }, [current, goTo, testimonials.length]);

  const goPrev = useCallback(() => {
    goTo((current - 1 + testimonials.length) % testimonials.length);
  }, [current, goTo, testimonials.length]);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(goNext, 6000);
    return () => clearInterval(timer);
  }, [goNext]);

  const t = testimonials[current];

  return (
    <section className="section-padding relative bg-white">
      <div className="mx-auto w-[min(900px,calc(100%-24px))] md:w-[min(900px,calc(100%-40px))]">
        {/* Heading */}
        <RevealOnScroll className="title-center mb-12 md:mb-16">
          <p className="eyebrow-text text-[#d0a93d]">What Patients Say</p>
          <h2 className="section-title mt-4 text-[#1f1a17]">
            Healing Journeys Shared by Visitors
          </h2>
          <div className="mx-auto mt-4 h-[3px] w-[82px] rounded-full bg-gradient-to-r from-[#e7d58f] to-[#c79f31]" />
        </RevealOnScroll>

        {/* Testimonial Card */}
        <div className="relative">
          <div
            className="mx-auto max-w-[720px] rounded-[24px] bg-[#f5f2ec] px-6 py-8 shadow-[0_12px_40px_rgba(0,0,0,0.06)] transition-all duration-500 md:px-10 md:py-10"
            key={current}
          >
            {/* Quote mark */}
            <div className="mb-2 font-serif text-5xl leading-none text-[#d0a93d]/30">
              &ldquo;
            </div>

            {/* Quote text */}
            <p
              className="para-text text-[#5e5751] transition-opacity duration-500"
              style={{
                animation: "fadeUp 0.5s ease-out forwards",
              }}
            >
              {t.quote}
            </p>

            {/* Divider */}
            <div className="mx-auto my-6 h-px w-16 bg-[#d0a93d]/40" />

            {/* Author */}
            <div className="flex items-center justify-center gap-2">
              <p className="section-subtitle text-[#3b2218]">
                {t.name},{" "}
                <span className="font-normal text-[#7a726c]">{t.role}</span>
              </p>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-0 top-1/2 -translate-x-2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#3b2218] shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg md:-translate-x-14 md:h-12 md:w-12"
            aria-label="Previous testimonial"
          >
            <FaChevronLeft className="text-[14px]" />
          </button>
          <button
            type="button"
            onClick={goNext}
            className="absolute right-0 top-1/2 translate-x-2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#3b2218] shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg md:translate-x-14 md:h-12 md:w-12"
            aria-label="Next testimonial"
          >
            <FaChevronRight className="text-[14px]" />
          </button>
        </div>

        {/* Dots */}
        <div className="mt-8 flex items-center justify-center gap-2.5">
          {testimonials.map((_, idx) => (
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
      </div>
    </section>
  );
}

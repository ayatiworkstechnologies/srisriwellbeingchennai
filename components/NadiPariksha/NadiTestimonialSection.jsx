"use client";

import { useState, useEffect, useCallback } from "react";
import { FaLocationDot, FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import RevealOnScroll from "../Main/RevealOnScroll";

const testimonials = [
  {
    quote:
      "The Nadi Pariksha experience I had at Sri Sri Wellbeing was the best thing I've done for my health. The doctor immediately identified my issues and I got a customised set of treatments and supplements from my visits. Now I feel energised, and the improvement is unbelievable all around. My body feels healthy.",
    name: "Ruban Kumar",
    location: "Bangalore",
  },
  {
    quote:
      "I was suffering from chronic digestive issues for years. The Nadi Vaidya at Sri Sri Wellbeing accurately identified the root cause through pulse diagnosis and recommended a personalised treatment plan. Within weeks, I noticed significant improvement in my digestion and overall energy levels.",
    name: "Priya Sharma",
    location: "Chennai",
  },
  {
    quote:
      "As someone dealing with stress-related health problems, Nadi Pariksha was a revelation. The practitioner could sense my imbalances just through my pulse. The Ayurvedic treatments and lifestyle changes suggested have transformed my sleep quality and mental clarity.",
    name: "Arjun Menon",
    location: "Hyderabad",
  },
];

export default function NadiTestimonialSection() {
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
  }, [current, goTo]);

  const goPrev = useCallback(() => {
    goTo((current - 1 + testimonials.length) % testimonials.length);
  }, [current, goTo]);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(goNext, 6000);
    return () => clearInterval(timer);
  }, [goNext]);

  const t = testimonials[current];

  return (
    <section className="section-padding relative bg-[#f5f2ec]">
      <div className="mx-auto w-[min(900px,calc(100%-24px))] md:w-[min(900px,calc(100%-40px))]">
        {/* Heading */}
        <RevealOnScroll className="title-center mb-10 md:mb-14">
          <h2 className="section-title text-[#1f1a17] lg:text-[42px]">
            Testimonial
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
              className="para-text text-[#5e5751] transition-opacity duration-500"
              style={{
                animation: "fadeUp 0.5s ease-out forwards",
              }}
            >
              {t.quote}
            </p>

            {/* Divider */}
            <div className="my-6 h-px w-16 bg-[#d0a93d]/40 mx-auto" />

            {/* Author */}
            <div className="flex items-center justify-center gap-2">
              <FaLocationDot className="text-[14px] text-[#d0a93d]" />
              <p className="section-subtitle text-[#3b2218]">
                {t.name},{" "}
                <span className="font-normal text-[#7a726c]">
                  {t.location}
                </span>
              </p>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-14 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#3b2218] shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg md:h-12 md:w-12"
            aria-label="Previous testimonial"
          >
            <FaChevronLeft className="text-[14px]" />
          </button>
          <button
            type="button"
            onClick={goNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-14 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#3b2218] shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg md:h-12 md:w-12"
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

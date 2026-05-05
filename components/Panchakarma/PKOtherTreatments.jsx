"use client";

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { PiPlant } from "react-icons/pi";
import RevealOnScroll from "../Main/RevealOnScroll";
import WellnessButton from "../layouts/WellnessButton";
import { categoryColors } from "./panchakarmaData";

const PAGE_SIZE = 10;

export default function PKOtherTreatments({ treatments }) {
  const [expandedId, setExpandedId] = useState(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const visibleTreatments = treatments.slice(0, visibleCount);
  const hasMore = visibleCount < treatments.length;

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, treatments.length));
  };

  return (
    <section className="section-padding bg-[#faf9f6] relative overflow-hidden">
      <div className="container-width relative z-10">
        {/* Heading */}
        <RevealOnScroll className="title-center mb-10 md:mb-14">
          <p className="eyebrow-text text-[#d0a93d]">Also Available</p>
          <h2 className="section-title mt-4 text-[#1f1a17] tracking-wide">
            Other Treatments Available With Us
          </h2>
          <div className="mx-auto mt-4 h-[3px] w-[82px] rounded-full bg-gradient-to-r from-[#e7d58f] to-[#c79f31]" />
          <p className="para-text mx-auto mt-5 max-w-[700px] text-[#6b5f58]">
            Beyond the five core Panchakarma procedures, we offer a comprehensive
            range of complementary Ayurvedic therapies tailored to your needs.
          </p>
        </RevealOnScroll>

        {/* Treatments — Full-width Accordion Rows */}
        <div className="flex flex-col gap-3">
          {visibleTreatments.map((treatment, index) => {
            const colors = categoryColors[treatment.category] || {
              bg: "bg-gray-100", text: "text-gray-600", border: "border-gray-200",
            };
            const isOpen = expandedId === treatment.name;

            return (
              <RevealOnScroll key={treatment.name} delay={Math.min(index * 0.03, 0.3)}>
                <div
                  className={`rounded-[20px] border transition-all duration-300 ${
                    isOpen 
                      ? "bg-white border-[#d0a93d]/30 shadow-[0_8px_32px_rgba(31,23,20,0.10)]" 
                      : "bg-white border-[#f0ebe3] shadow-[0_2px_12px_rgba(31,23,20,0.04)] hover:shadow-[0_6px_24px_rgba(31,23,20,0.08)] hover:border-[#d0a93d]/20"
                  }`}
                >
                  {/* Header Row */}
                  <button
                    type="button"
                    onClick={() => setExpandedId(isOpen ? null : treatment.name)}
                    className="flex w-full items-center justify-between gap-4 p-5 md:p-6 text-left"
                  >
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      {/* Leaf Icon */}
                      <PiPlant className={`flex-shrink-0 text-[22px] ${isOpen ? "text-[#8cb14a]" : "text-[#c29a2f]"} transition-colors duration-300`} />

                      {/* Name */}
                      <h3 className="text-[16px] md:text-[18px] font-semibold text-[#1b1714] truncate">
                        {treatment.name}
                      </h3>

                      {/* Category badge */}
                      <span
                        className={`hidden sm:inline-block flex-shrink-0 rounded-full border px-3 py-0.5 text-[11px] font-semibold uppercase tracking-[0.12em] ${colors.bg} ${colors.text} ${colors.border}`}
                      >
                        {treatment.category}
                      </span>
                    </div>

                    {/* Chevron */}
                    <span
                      className={`inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                        isOpen 
                          ? "bg-[#3b2218] text-white rotate-180" 
                          : "bg-[#f5f2ec] text-[#d0a93d]"
                      }`}
                    >
                      <FaChevronDown className="text-[11px]" />
                    </span>
                  </button>

                  {/* Expanded Content */}
                  <div
                    className="overflow-hidden transition-all duration-500 ease-in-out"
                    style={{ maxHeight: isOpen ? "400px" : "0px", opacity: isOpen ? 1 : 0 }}
                  >
                    <div className="border-t border-[#f0ebe3] px-5 md:px-6 pb-6 pt-5">
                      {/* Mobile category badge */}
                      <span
                        className={`sm:hidden inline-block mb-3 rounded-full border px-3 py-0.5 text-[11px] font-semibold uppercase tracking-[0.12em] ${colors.bg} ${colors.text} ${colors.border}`}
                      >
                        {treatment.category}
                      </span>
                      <p className="para-text text-[#5c4a41] leading-relaxed">
                        {treatment.desc}
                      </p>
                      <div className="mt-5">
                        <WellnessButton href="/contact" label="Enquire Now" />
                      </div>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>

        {/* Show More Button */}
        {hasMore && (
          <RevealOnScroll delay={0.1}>
            <div className="mt-10 text-center">
              <button
                type="button"
                onClick={handleShowMore}
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#3b2218] px-8 py-3.5 text-sm font-semibold text-[#3b2218] transition-all duration-300 hover:bg-[#3b2218] hover:text-white hover:shadow-lg"
              >
                Show More Treatments
                <FaChevronDown className="text-[11px]" />
              </button>
            </div>
          </RevealOnScroll>
        )}

        {/* Bottom CTA */}
        <RevealOnScroll delay={0.1}>
          <div className="mt-16 md:mt-20 overflow-hidden rounded-[24px] bg-[#3b2218] relative p-8 md:p-12 text-center">
            <div
              className="absolute inset-0 rounded-[24px] opacity-[0.06]"
              style={{
                backgroundImage: "linear-gradient(#e7d58f 1px, transparent 1px), linear-gradient(90deg, #e7d58f 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            <div className="relative z-10">
              <p className="eyebrow-text text-[#d0a93d]">Personalised Care</p>
              <h2 className="section-title mt-4 text-white">
                Not Sure Which Therapy Is Right for You?
              </h2>
              <p className="para-text mx-auto mt-4 max-w-[580px] text-white/70">
                Our Ayurvedic specialists will assess your prakriti and design a
                personalised treatment programme for your specific health goals.
              </p>
              <div className="mt-8 flex justify-center">
                <WellnessButton
                  href="/contact"
                  label="Book a Free Consultation"
                />
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

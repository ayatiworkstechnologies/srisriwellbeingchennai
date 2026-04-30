"use client";

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa6";
import RevealOnScroll from "../Main/RevealOnScroll";
import WellnessButton from "../layouts/WellnessButton";
import { categoryColors } from "./panchakarmaData";

const ALL = "All";

export default function PKOtherTreatments({ treatments }) {
  const [activeCategory, setActiveCategory] = useState(ALL);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  const categories = [ALL, ...Array.from(new Set(treatments.map((t) => t.category)))];

  const filtered = treatments.filter((t) => {
    const matchesCat = activeCategory === ALL || t.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(#3b2218 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

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

        {/* Search + Filter Bar */}
        <RevealOnScroll delay={0.1}>
          <div className="mb-10 md:mb-12 flex flex-col gap-5 md:flex-row md:items-center md:gap-6">
            {/* Search */}
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search treatments..."
                className="w-full rounded-full border border-[#d9d0c3] bg-[#faf7f3] px-6 py-3.5 text-sm font-medium text-[#1f1a17] placeholder-[#9a8f87] outline-none transition-all focus:border-[#d0a93d] focus:ring-2 focus:ring-[#d0a93d]/20"
              />
            </div>

            {/* Category Dropdown on mobile */}
            <div className="relative md:hidden">
              <select
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="w-full appearance-none rounded-full border border-[#d9d0c3] bg-[#faf7f3] px-6 py-3.5 pr-10 text-sm font-medium text-[#1f1a17] outline-none"
              >
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <FaChevronDown className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-[12px] text-[#d0a93d]" />
            </div>
          </div>

          {/* Category Pills — desktop */}
          <div className="mb-10 hidden flex-wrap items-center gap-2.5 md:flex">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full border px-5 py-2 text-sm font-semibold tracking-wide transition-all duration-300 ${
                  activeCategory === cat
                    ? "border-[#3b2218] bg-[#3b2218] text-white shadow-md"
                    : "border-[#d9d0c3] bg-white text-[#5f5550] hover:border-[#3b2218] hover:text-[#3b2218]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </RevealOnScroll>

        {/* Results count */}
        <p className="mb-6 text-sm text-[#9a8f87]">
          Showing {filtered.length} of {treatments.length} treatments
        </p>

        {/* Treatments Accordion Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((treatment, index) => {
            const colors = categoryColors[treatment.category] || {
              bg: "bg-gray-100", text: "text-gray-600", border: "border-gray-200",
            };
            const isOpen = expandedId === treatment.name;

            return (
              <RevealOnScroll key={treatment.name} delay={Math.min(index * 0.04, 0.4)}>
                <div
                  className={`rounded-[18px] border bg-white shadow-[0_4px_20px_rgba(31,23,20,0.06)] transition-all duration-300 ${
                    isOpen ? "shadow-[0_8px_32px_rgba(31,23,20,0.12)]" : "hover:shadow-[0_6px_24px_rgba(31,23,20,0.09)]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setExpandedId(isOpen ? null : treatment.name)}
                    className="flex w-full items-start justify-between gap-3 p-5 text-left"
                  >
                    <div className="flex-1">
                      {/* Category badge */}
                      <span
                        className={`mb-2 inline-block rounded-full border px-3 py-0.5 text-[11px] font-semibold uppercase tracking-[0.12em] ${colors.bg} ${colors.text} ${colors.border}`}
                      >
                        {treatment.category}
                      </span>
                      <h3 className="section-subtitle text-[#1b1714] leading-snug">
                        {treatment.name}
                      </h3>
                    </div>
                    <span
                      className={`mt-1 inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#f5f2ec] text-[#d0a93d] transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    >
                      <FaChevronDown className="text-[11px]" />
                    </span>
                  </button>

                  {/* Description */}
                  <div
                    className="overflow-hidden transition-all duration-500 ease-in-out"
                    style={{ maxHeight: isOpen ? "300px" : "0px", opacity: isOpen ? 1 : 0 }}
                  >
                    <div className="border-t border-[#f0ebe3] px-5 pb-5 pt-4">
                      <p className="small-text text-[#6b5f58] leading-relaxed">
                        {treatment.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <p className="para-text text-[#9a8f87]">No treatments found. Try a different search or category.</p>
          </div>
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

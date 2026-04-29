"use client";

import Image from "next/image";
import { useState } from "react";
import { FaChevronRight } from "react-icons/fa6";
import RevealOnScroll from "../Main/RevealOnScroll";
import { categoryColors } from "./alternativeTreatmentsData";

const ALL_CATEGORIES = "All";

export default function AltTreatmentsGrid({ treatments }) {
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORIES);
  const [expanded, setExpanded] = useState(null);

  // Build unique category list
  const categories = [
    ALL_CATEGORIES,
    ...Array.from(new Set(treatments.map((t) => t.category))),
  ];

  const filtered =
    activeCategory === ALL_CATEGORIES
      ? treatments
      : treatments.filter((t) => t.category === activeCategory);

  return (
    <section className="section-padding bg-[#f5f2ec] relative overflow-hidden">
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(#3b2218 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="container-width relative z-10">
        {/* Heading */}
        <RevealOnScroll className="title-center mb-10 md:mb-14">
          <p className="eyebrow-text text-[#d0a93d]">Our Therapies</p>
          <h2 className="section-title mt-4 text-[#1f1a17] tracking-wide">
            Explore All Treatment Modalities
          </h2>
          <div className="mx-auto mt-4 h-[3px] w-[82px] rounded-full bg-gradient-to-r from-[#e7d58f] to-[#c79f31]" />
          <p className="para-text mx-auto mt-5 max-w-[680px] text-[#6b5f58]">
            Each therapy is delivered by certified specialists, integrated into
            your personalised treatment plan for optimal results.
          </p>
        </RevealOnScroll>

        {/* Category Filter Pills */}
        <RevealOnScroll delay={0.1}>
          <div className="mb-10 md:mb-14 flex flex-wrap items-center justify-center gap-2.5">
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

        {/* Treatments Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((treatment, index) => {
            const colors = categoryColors[treatment.category] || {
              bg: "bg-gray-100",
              text: "text-gray-600",
              border: "border-gray-200",
            };
            const isExpanded = expanded === treatment.id;

            return (
              <RevealOnScroll key={treatment.id} delay={index * 0.06}>
                <article
                  className="group relative flex flex-col overflow-hidden rounded-[20px] bg-white shadow-[0_8px_28px_rgba(31,23,20,0.08)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_16px_44px_rgba(31,23,20,0.14)]"
                >
                  {/* Image */}
                  <div className="relative h-[200px] overflow-hidden">
                    <Image
                      src={treatment.image}
                      alt={treatment.name}
                      fill
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    {/* Category Badge */}
                    <div className="absolute left-3 top-3">
                      <span
                        className={`inline-block rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${colors.bg} ${colors.text} ${colors.border}`}
                      >
                        {treatment.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="section-subtitle text-[#1b1714]">
                      {treatment.name}
                    </h3>
                    <div className="mt-2 h-[2px] w-[28px] bg-[#d0a93d]" />

                    {/* Description - expandable */}
                    <p
                      className={`mt-3 text-sm leading-relaxed text-[#6b625d] transition-all duration-300 ${
                        isExpanded ? "" : "line-clamp-3"
                      }`}
                    >
                      {treatment.shortDesc}
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        setExpanded(isExpanded ? null : treatment.id)
                      }
                      className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#d0a93d] transition-all hover:text-[#b8952b]"
                    >
                      {isExpanded ? "Read less" : "Read more"}
                      <FaChevronRight
                        className={`text-[10px] transition-transform duration-300 ${
                          isExpanded ? "rotate-90" : ""
                        }`}
                      />
                    </button>
                  </div>
                </article>
              </RevealOnScroll>
            );
          })}
        </div>

        {/* CTA Banner */}
        <RevealOnScroll delay={0.2}>
          <div className="mt-16 md:mt-20 overflow-hidden rounded-[24px] bg-[#3b2218] p-8 md:p-12 lg:p-14 text-center shadow-[0_20px_60px_rgba(59,34,24,0.25)]">
            {/* Grid pattern */}
            <div
              className="absolute inset-0 rounded-[24px] opacity-[0.07]"
              style={{
                backgroundImage:
                  "linear-gradient(#e7d58f 1px, transparent 1px), linear-gradient(90deg, #e7d58f 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            <div className="relative z-10">
              <p className="eyebrow-text text-[#d0a93d]">
                Start Your Healing Journey
              </p>
              <h2 className="section-title mt-4 text-white">
                Not Sure Which Therapy Is Right for You?
              </h2>
              <p className="para-text mx-auto mt-4 max-w-[600px] text-white/70">
                Our specialists will assess your health profile and recommend a
                personalised combination of therapies tailored to your needs.
              </p>
              <a
                href="/contact"
                className="mt-8 inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-[#d0a93d] px-10 text-base font-semibold tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#b8952b] hover:shadow-[0_12px_36px_rgba(208,169,61,0.35)]"
              >
                Book a Free Consultation
                <FaChevronRight className="text-xs" />
              </a>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

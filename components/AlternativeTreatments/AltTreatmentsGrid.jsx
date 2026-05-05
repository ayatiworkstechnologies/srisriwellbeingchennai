"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { FaChevronRight, FaXmark } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import RevealOnScroll from "../Main/RevealOnScroll";
import WellnessButton from "../layouts/WellnessButton";
import { categoryColors } from "./alternativeTreatmentsData";

const ALL_CATEGORIES = "All";

export default function AltTreatmentsGrid({ treatments }) {
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORIES);
  const [selectedTreatment, setSelectedTreatment] = useState(null);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (selectedTreatment) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedTreatment]);

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
    <section className="section-padding bg-[#f8f6f2] relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-radial from-[#e7d58f]/10 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-radial from-[#3b2218]/5 to-transparent pointer-events-none" />

      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(#3b2218 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="container-width relative z-10">
        {/* Heading */}
        <RevealOnScroll className="title-center mb-10 md:mb-16">
          <p className="eyebrow-text text-[#b88621]">Our Holistic Therapies</p>
          <h2 className="section-title mt-4 text-[#1f1a17] tracking-tight">
            Comprehensive Alternative Care
          </h2>
          <div className="mx-auto mt-5 h-[3px] w-[80px] rounded-full bg-gradient-to-r from-[#e7d58f] via-[#c79f31] to-[#e7d58f]" />
          <p className="para-text mx-auto mt-6 max-w-[720px] text-[#5c544f]">
            Discover our range of 14 specialized treatment modalities, where
            ancient wisdom converges with modern understanding to support your
            healing journey.
          </p>
        </RevealOnScroll>

        {/* Category Filter */}
        <RevealOnScroll delay={0.1}>
          <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`group relative overflow-hidden rounded-full border px-6 py-2.5 text-[13px] font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === cat
                    ? "border-[#3b2218] bg-[#3b2218] text-white shadow-lg"
                    : "border-[#e2dcd0] bg-white/80 text-[#5f5550] hover:border-[#3b2218] hover:text-[#3b2218] backdrop-blur-sm"
                }`}
              >
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>
        </RevealOnScroll>

        {/* Treatments Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((treatment, index) => {
            const colors = categoryColors[treatment.category] || {
              bg: "bg-gray-100",
              text: "text-gray-600",
              border: "border-gray-200",
            };

            return (
              <RevealOnScroll key={treatment.id} delay={index * 0.05}>
                <article className="group flex h-full flex-col overflow-hidden rounded-[24px] bg-white shadow-[0_10px_35px_rgba(0,0,0,0.05)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(31,23,20,0.12)]">
                  {/* Image Container */}
                  <div className="relative h-[240px] overflow-hidden">
                    <Image
                      src={treatment.image}
                      alt={treatment.name}
                      fill
                      className="object-cover object-center transition-transform duration-1000 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    {/* Category Badge */}
                    <div className="absolute left-4 top-4">
                      <span
                        className={`inline-block rounded-full border px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] backdrop-blur-md ${colors.bg}/80 ${colors.text} ${colors.border}`}
                      >
                        {treatment.category}
                      </span>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-xl font-bold text-[#1b1714] leading-tight">
                      {treatment.name}
                    </h3>

                    <div className="mt-3 flex-1">
                      <p className="line-clamp-3 text-[14px] leading-relaxed text-[#6b625d]">
                        {treatment.shortDesc}
                      </p>
                    </div>

                    <div className="mt-6">
                      <WellnessButton
                        label="Explore Therapy"
                        onClick={() => setSelectedTreatment(treatment)}
                      />
                    </div>
                  </div>
                </article>
              </RevealOnScroll>
            );
          })}
        </div>

        {/* CTA Banner */}
        <RevealOnScroll delay={0.2}>
          <div className="mt-20 relative overflow-hidden rounded-[32px]  p-10 md:p-16 text-center shadow-[0_25px_60px_rgba(59,34,24,0.3)]">
            <div className="absolute inset-0 ">
              <img
                src="/images/sec-1.svg"
                alt=""
                className="w-full h-full object-cover rounded-[32px]"
              />
            </div>
            <div className="relative z-10">
              <h2 className="section-title text-white">
                Not sure which therapy is right for you?
              </h2>
              <p className="para-text mx-auto mt-6 max-w-[640px] text-white/80">
                Our expert consultants can help you identify the most effective
                combination of therapies based on your unique health profile and
                goals.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <WellnessButton href="/contact" label="Get Expert Guidance" />
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>

      {/* Treatment Modal */}
      <AnimatePresence>
        {selectedTreatment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTreatment(null)}
              className="absolute inset-0 bg-[#1f1a17]/90 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl overflow-hidden rounded-[32px] bg-white shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedTreatment(null)}
                className="absolute right-6 top-6 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-all hover:bg-white hover:text-[#3b2218] md:h-12 md:w-12"
              >
                <FaXmark size={24} />
              </button>

              <div className="flex flex-col md:flex-row h-full max-h-[90vh] overflow-y-auto md:overflow-hidden">
                {/* Modal Image */}
                <div className="relative h-[250px] w-full md:h-auto md:w-2/5 shrink-0">
                  <Image
                    src={selectedTreatment.image}
                    alt={selectedTreatment.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />
                  <div className="absolute bottom-6 left-6 md:hidden">
                    <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
                      {selectedTreatment.category}
                    </span>
                  </div>
                </div>

                {/* Modal Info */}
                <div className="flex flex-1 flex-col p-8 md:p-12 lg:p-14 overflow-y-auto bg-white">
                  <div className="hidden md:block">
                    <span className="inline-block rounded-full bg-[#fdf4eb] px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[#c07030]">
                      {selectedTreatment.category}
                    </span>
                  </div>

                  <h3 className="mt-4 text-3xl md:text-4xl font-bold text-[#1f1a17]">
                    {selectedTreatment.name}
                  </h3>

                  <div className="mt-6 h-[2px] w-[60px] bg-[#d0a93d]" />

                  <div className="mt-8 space-y-6">
                    <p className="text-[16px] md:text-[18px] leading-relaxed text-[#5c544f]">
                      {selectedTreatment.shortDesc}
                    </p>

                    <div className="rounded-2xl bg-[#f8f6f2] p-6 border border-[#e2dcd0]">
                      <h4 className="font-bold text-[#1f1a17] text-[15px] uppercase tracking-wider mb-3">
                        Key Benefits
                      </h4>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3 text-[14px] text-[#5c544f]">
                          <span className="text-[#b88621] mt-1">✦</span>
                          Restores natural balance and vitality to the body
                          system.
                        </li>
                        <li className="flex items-start gap-3 text-[14px] text-[#5c544f]">
                          <span className="text-[#b88621] mt-1">✦</span>
                          Personalized approach tailored to your specific health
                          needs.
                        </li>
                        <li className="flex items-start gap-3 text-[14px] text-[#5c544f]">
                          <span className="text-[#b88621] mt-1">✦</span>
                          Non-invasive and drug-free holistic healing process.
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-auto pt-10">
                    <WellnessButton href="/contact" label="Book This Therapy" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

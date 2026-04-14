"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import RevealOnScroll from "./RevealOnScroll";
import Link from "next/link";

const experiences = [
  {
    title: "Reflexology",
    desc: "A focused practice that activates the body's natural healing responses through precise pressure techniques.",
    num: "01",
    image: "/images/sig-1.jpg",
    icon: "/images/ico-1.svg",
    accent: "#d4a84b",
  },
  {
    title: "Rakkenho",
    desc: "A traditional Japanese therapy that blends movement and pressure to release deep-seated tension and restore flow.",
    num: "02",
    image: "/images/sig-2.jpg",
    icon: "/images/ico-2.svg",
    accent: "#c49a3a",
  },
  {
    title: "Marma Chikitsa",
    desc: "An ancient Ayurvedic science that stimulates vital energy points to enhance vitality and inner balance.",
    num: "03",
    image: "/images/sig-3.jpg",
    icon: "/images/ico-3.svg",
    accent: "#b88621",
  },
  {
    title: "Meru Chikitsa",
    desc: "A specialised spinal therapy designed to realign, release, and restore structural harmony.",
    num: "04",
    image: "/images/sig-4.jpg",
    icon: "/images/ico-4.svg",
    accent: "#a87b1a",
  },
];

/* ------------------------------------------------------------------ */
/*  Horizontal scroll card                                             */
/* ------------------------------------------------------------------ */
function HorizontalCard({ item }) {
  return (
    <div className="w-[85vw] max-w-[1100px] flex-shrink-0 snap-center px-3 md:px-5">
      <div className="group relative grid h-[400px] w-full overflow-hidden rounded-[28px] bg-white shadow-[0_24px_60px_rgba(0,0,0,0.10)] md:h-[440px] md:grid-cols-[1.1fr_1fr]">
        {/* Left — Image */}
        <div className="relative h-[180px] overflow-hidden md:h-full">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/5 via-transparent to-black/15" />

          {/* Number watermark */}
          <div className="absolute bottom-3 left-4 text-[56px] font-black leading-none text-white/10 md:bottom-6 md:left-8 md:text-[96px]">
            {item.num}
          </div>

          {/* Icon badge */}
          <div className="absolute right-3 top-3 flex h-[56px] w-[56px] items-center justify-center rounded-full bg-white/85 md:bottom-6 md:right-6 md:top-auto md:h-[72px] md:w-[72px]">
            <Image
              src={item.icon}
              alt={`${item.title} icon`}
              width={72}
              height={72}
              className=""
            />
          </div>
        </div>

        {/* Right — Content */}
        <div className="relative flex flex-col justify-center bg-[#faf8f3] px-5 py-5 md:px-12 md:py-10">
          <div
            className="pointer-events-none absolute right-4 top-4 hidden h-[80px] w-[80px] opacity-[0.05] md:block"
            style={{
              backgroundImage: "radial-gradient(circle, #8a6a1e 1.5px, transparent 1.5px)",
              backgroundSize: "12px 12px",
            }}
          />
          <div
            className="absolute left-0 top-0 hidden h-full w-[4px] md:block"
            style={{ background: `linear-gradient(to bottom, ${item.accent}40, ${item.accent}, ${item.accent}40)` }}
          />

          <div className="relative z-10">
            <div className="mb-2 flex items-center gap-3">
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#b88621]">
                Pathway {item.num}
              </span>
              <span className="h-px flex-1 max-w-[40px] bg-[#d8bb6b]/40" />
            </div>

            <h3 className="mb-3 text-xl font-bold leading-tight text-[#1a1612] md:mb-4 md:text-3xl">
              {item.title}
            </h3>

            <p className="max-w-[400px] text-[14px] leading-relaxed text-[#6b6158] md:text-base">
              {item.desc}
            </p>

            <div className="mt-4 h-[2.5px] w-12 rounded-full bg-gradient-to-r from-[#e5cf86] to-[#c08f20] md:mt-5" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Section                                                       */
/* ------------------------------------------------------------------ */
export default function SignatureLearningSection() {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const totalCards = experiences.length;

  // Track scroll position for progress indicator
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll <= 0) return;

      const progress = scrollLeft / maxScroll;
      const index = Math.round(progress * (totalCards - 1));
      setActiveIndex(index);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [totalCards]);

  const scrollToCard = (index) => {
    const container = scrollRef.current;
    if (!container) return;

    const cardWidth = container.scrollWidth / totalCards;
    container.scrollTo({
      left: cardWidth * index,
      behavior: "smooth",
    });
  };

  const scrollPrev = () => scrollToCard(Math.max(0, activeIndex - 1));
  const scrollNext = () => scrollToCard(Math.min(totalCards - 1, activeIndex + 1));

  return (
    <section className="relative overflow-hidden bg-[#f5f2ec] pb-14 pt-16 md:pb-20 md:pt-24">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/images/bg.svg"
          alt="Background pattern"
          fill
          className="object-cover"
        />
      </div>

      {/* Radial glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-5%] top-[20%] h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(200,160,50,0.06),transparent_60%)]" />
        <div className="absolute bottom-[10%] right-[-3%] h-[350px] w-[350px] rounded-full bg-[radial-gradient(circle,rgba(200,160,50,0.04),transparent_60%)]" />
      </div>

      {/* Top line */}
      <div className="absolute left-0 right-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-[#d8bb6b]/25 to-transparent" />

      {/* Header */}
      <div className="relative z-10 mx-auto w-full max-w-[1300px] px-5 text-center md:px-8">
        <RevealOnScroll className="mb-3">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#c9a644] md:text-base">
            Signature Experiences
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <h2 className="text-3xl font-bold leading-tight text-[#1a1612] md:text-5xl">
            Master the Art of Healing
          </h2>
        </RevealOnScroll>

        <RevealOnScroll className="mx-auto max-w-[620px]" delay={0.15}>
          <p className="mt-3 text-sm leading-relaxed text-[#6b6158] md:text-base">
            For those who seek more than restoration, step into a deeper
            understanding of Ayurvedic therapies, guided by experts.
          </p>
          <div className="mx-auto mt-3 h-[3px] w-[60px] rounded-full bg-gradient-to-r from-[#e5cf86] to-[#c08f20]" />
        </RevealOnScroll>
      </div>

      {/* Horizontal scrolling cards */}
      <div className="relative z-10 mt-8 md:mt-10">
        {/* Navigation arrows */}
        <button
          onClick={scrollPrev}
          disabled={activeIndex === 0}
          className="absolute left-2 top-1/2 z-30 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg transition-all duration-300 hover:scale-110 disabled:opacity-30 md:flex md:h-12 md:w-12"
          aria-label="Previous card"
        >
          <FaChevronLeft className="text-[16px] text-[#b88621]" />
        </button>

        <button
          onClick={scrollNext}
          disabled={activeIndex === totalCards - 1}
          className="absolute right-2 top-1/2 z-30 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg transition-all duration-300 hover:scale-110 disabled:opacity-30 md:flex md:h-12 md:w-12"
          aria-label="Next card"
        >
          <FaChevronRight className="text-[16px] text-[#b88621]" />
        </button>

        {/* Scrollable container */}
        <div
          ref={scrollRef}
          className="flex snap-x snap-mandatory gap-0 overflow-x-auto scroll-smooth pb-2 pl-[7.5vw] pr-[7.5vw] scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {experiences.map((item) => (
            <HorizontalCard key={item.title} item={item} />
          ))}
        </div>
      </div>

      {/* Progress dots + indicator */}
      <div className="relative z-10 mt-6 flex flex-col items-center gap-4 md:mt-8">
        {/* Dots */}
        <div className="flex items-center gap-2.5">
          {experiences.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToCard(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${idx === activeIndex
                ? "w-8 bg-gradient-to-r from-[#e5cf86] to-[#b88621]"
                : "w-2.5 bg-[#d8c8a2]"
                }`}
              aria-label={`Go to card ${idx + 1}`}
            />
          ))}
        </div>

        {/* Counter */}
        <p className="text-[12px] font-semibold tracking-wider text-[#b88621]/50">
          0{activeIndex + 1} / 0{totalCards}
        </p>
      </div>

      {/* Bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d8bb6b]/25 to-transparent" />
    </section>
  );
}

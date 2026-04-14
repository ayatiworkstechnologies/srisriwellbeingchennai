"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FaArrowRight } from "react-icons/fa6";
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
function HorizontalCard({ item, index, total }) {
  return (
    <div
      className="flex h-full w-[85vw] max-w-[1100px] flex-shrink-0 snap-center items-center px-3 md:px-6"
    >
      <div className="group relative grid h-[420px] w-full overflow-hidden rounded-[28px] bg-white shadow-[0_24px_60px_rgba(0,0,0,0.10)] md:h-[480px] md:grid-cols-[1.1fr_1fr]">
        {/* Left — Image */}
        <div className="relative h-[200px] overflow-hidden md:h-full">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/20 md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-black/10" />

          {/* Number — large watermark */}
          <div className="absolute bottom-4 left-5 text-[64px] font-black leading-none text-white/10 md:bottom-6 md:left-8 md:text-[96px]">
            {item.num}
          </div>

          {/* Icon badge */}
          <div className="absolute right-4 top-4 flex h-[48px] w-[48px] items-center justify-center rounded-full border-2 border-white/30 bg-white/85 shadow-lg backdrop-blur-sm md:bottom-6 md:right-6 md:top-auto md:h-[56px] md:w-[56px]">
            <Image
              src={item.icon}
              alt={`${item.title} icon`}
              width={30}
              height={30}
              className="object-contain"
            />
          </div>
        </div>

        {/* Right — Content */}
        <div className="relative flex flex-col justify-center bg-[#faf8f3] px-6 py-6 md:px-12 md:py-10">
          {/* Dot pattern */}
          <div
            className="pointer-events-none absolute right-4 top-4 hidden h-[80px] w-[80px] opacity-[0.05] md:block"
            style={{
              backgroundImage: "radial-gradient(circle, #8a6a1e 1.5px, transparent 1.5px)",
              backgroundSize: "12px 12px",
            }}
          />

          {/* Top accent stripe */}
          <div className="absolute left-0 top-0 hidden h-full w-[4px] md:block" style={{ background: `linear-gradient(to bottom, ${item.accent}40, ${item.accent}, ${item.accent}40)` }} />

          <div className="relative z-10">
            <div className="mb-2 flex items-center gap-3">
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#b88621]">
                Pathway {item.num}
              </span>
              <span className="h-px flex-1 max-w-[40px] bg-[#d8bb6b]/40" />
            </div>

            <h3 className="mb-4 text-2xl font-bold leading-tight text-[#1a1612] md:text-3xl">
              {item.title}
            </h3>

            <p className="mb-6 max-w-[400px] text-[15px] leading-relaxed text-[#6b6158] md:text-base">
              {item.desc}
            </p>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-[#d8bb6b]/50 bg-white px-6 py-2.5 text-[13px] font-bold uppercase tracking-wider text-[#b88621] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d0a93d]/70 hover:shadow-md"
            >
              Explore Therapy
              <FaArrowRight className="text-[11px]" />
            </Link>

            <div className="mt-5 h-[2.5px] w-12 rounded-full bg-gradient-to-r from-[#e5cf86] to-[#c08f20]" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Progress Indicator                                                 */
/* ------------------------------------------------------------------ */
function ScrollIndicator({ progress, total }) {
  const width = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <div className="mx-auto mt-8 w-[200px] md:mt-10">
      <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-[#e0d5be]/50">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#e5cf86] to-[#b88621]"
          style={{ width }}
        />
      </div>
      <div className="mt-2 flex justify-between text-[11px] font-semibold tracking-wider text-[#b88621]/50">
        <span>01</span>
        <span>0{total}</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Section                                                       */
/* ------------------------------------------------------------------ */
export default function SignatureLearningSection() {
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Map vertical scroll to horizontal movement
  // Cards container needs to slide left by (totalCards - 1) * cardWidth
  const totalCards = experiences.length;
  const x = useTransform(
    scrollYProgress,
    [0.05, 0.95],
    ["0%", `-${(totalCards - 1) * 88}vw`]
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#f5f2ec]"
      style={{ height: `${totalCards * 30}vh` }}
    >
      <div className="sticky overflow-hidden" style={{ top: '-10vh', height: '110vh' }}>
        {/* Background */}
        <div className="pointer-events-none absolute inset-0">
          <Image
            src="/images/bg.svg"
            alt="Background pattern"
            fill
            className="object-cover opacity-30"
          />
        </div>

        {/* Radial glows */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-5%] top-[20%] h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(200,160,50,0.06),transparent_60%)]" />
          <div className="absolute bottom-[10%] right-[-3%] h-[350px] w-[350px] rounded-full bg-[radial-gradient(circle,rgba(200,160,50,0.04),transparent_60%)]" />
        </div>

        {/* Top line */}
        <div className="absolute left-0 right-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-[#d8bb6b]/25 to-transparent" />

        {/* Header — stays fixed in sticky */}
        <div className="relative z-10 mx-auto w-full max-w-[1300px] px-5 pt-12 text-center md:px-8 md:pt-16">
          <RevealOnScroll className="mb-3">
            <div className="inline-flex items-center gap-3 rounded-full border border-[#d8bb6b]/30 bg-white/70 px-5 py-2 shadow-sm backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c9a644]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#b88621]">
                Signature Learning Experiences
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#c9a644]" />
            </div>
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
        <div className="relative z-10 mt-6 flex h-[calc(100vh-280px)] items-center md:mt-8 md:h-[calc(100vh-300px)]">
          <motion.div
            ref={scrollContainerRef}
            style={{ x }}
            className="flex items-center pl-[7.5vw]"
          >
            {experiences.map((item, index) => (
              <HorizontalCard
                key={item.title}
                item={item}
                index={index}
                total={totalCards}
              />
            ))}

            {/* End CTA card */}
            <div className="flex h-full w-[60vw] max-w-[500px] flex-shrink-0 items-center justify-center px-6">
              <div className="text-center">
                <div className="mb-5 flex items-center justify-center gap-4">
                  <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#d8bb6b]/40" />
                  <div className="h-3 w-3 rotate-45 border border-[#d8bb6b]/40 bg-[#faf7f0]" />
                  <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#d8bb6b]/40" />
                </div>
                <p className="mb-6 text-sm text-[#8a7f74] md:text-base">
                  Ready to begin your healing journey?
                </p>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-3 rounded-full border border-[#d8bb6b]/40 bg-white px-7 py-3 text-[13px] font-bold uppercase tracking-[0.18em] text-[#b88621] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d0a93d]/60 hover:bg-[#fdf9f0] hover:shadow-md"
                >
                  Begin Your Journey
                  <FaArrowRight className="text-[12px] transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll progress indicator */}
        <div className="relative z-10">
          <ScrollIndicator progress={scrollYProgress} total={totalCards} />
        </div>

        {/* Bottom line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d8bb6b]/25 to-transparent" />
      </div>

      {/* Bottom spacing */}
      <div className="pointer-events-none h-[10vh]" />
    </section>
  );
}

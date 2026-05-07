"use client";

import Image from "next/image";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import RevealOnScroll from "../Main/RevealOnScroll";
import LeafGlyph from "../ui/LeafGlyph";

const pillars = [
  { label: "Root Cause Healing" },
  { label: "Mind-Body Integration" },
  { label: "Natural & Non-Invasive" },
  { label: "Personalised Care Plans" },
];

const PhilosophyIcon = () => (
  <div className="relative inline-flex items-center justify-center mr-3">
    <LeafGlyph className="h-8 w-8" />
    <div className="absolute -top-1 -left-1 rounded-full bg-[#3b2218] p-[1px]">
      <FaPlus className="text-[10px] text-white" />
    </div>
  </div>
);

export default function AltPhilosophySection() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const cards = [
    { image: "/images/alt-craniosacral.png", label: "Holistic Healing" },
    { image: "/images/alt-reflexology.png", label: "Natural Therapies" },
  ];

  return (
    <section className="section-padding relative overflow-hidden ">
      {/* Background pattern */}
      <div className="absolute inset-0">
        <img
          src="/images/sec-1.svg"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 mx-auto w-[min(1100px,calc(100%-24px))] md:w-[min(1100px,calc(100%-40px))]">
        <div className="flex flex-col items-center gap-12 md:flex-row md:items-center md:justify-between md:gap-16">
          {/* Left: Title + Pillars */}
          <RevealOnScroll className="flex-shrink-0 pt-4 md:pt-0">
            <p className="eyebrow-text text-[#d0a93d]">Our Approach</p>
            <h2 className="section-title mt-4 leading-[1.2] text-white tracking-wide lg:text-[42px]">
              Rooted in Ancient Wisdom,
              <br />
              Backed by Modern Science
            </h2>
            <div className="mt-4 h-[2px] w-[60px] bg-[#c79f31] md:mt-5" />

            <ul className="mt-8 space-y-6 md:mt-10 md:space-y-7">
              {pillars.map((item) => (
                <li key={item.label} className="flex items-center">
                  <PhilosophyIcon />
                  <span className="section-subtitle ml-1 text-white tracking-wide">
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </RevealOnScroll>

          {/* Right: Stacked Cards */}
          <RevealOnScroll
            delay={0.2}
            className="relative flex items-center justify-center mt-8 md:mt-0"
          >
            <div className="relative h-[340px] w-[300px] md:h-[400px] md:w-[360px]">
              {/* Back card */}
              <div
                className="absolute top-0 right-0 z-10 transition-all duration-500 ease-out cursor-pointer"
                style={{
                  transform:
                    hoveredCard === 0
                      ? "rotate(0deg) scale(1.03)"
                      : "rotate(8deg)",
                }}
                onMouseEnter={() => setHoveredCard(0)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="overflow-hidden rounded-[16px] bg-white p-3 shadow-[0_14px_44px_rgba(0,0,0,0.30)] md:rounded-[20px] md:p-4">
                  <p className="section-subtitle mb-3 pl-1 text-left text-black">
                    {cards[0].label}
                  </p>
                  <div className="overflow-hidden rounded-[12px] md:rounded-[16px]">
                    <Image
                      src={cards[0].image}
                      alt={cards[0].label}
                      width={280}
                      height={320}
                      className="h-[180px] w-[200px] object-cover object-center md:h-[240px] md:w-[250px]"
                    />
                  </div>
                </div>
              </div>

              {/* Front card */}
              <div
                className="absolute top-[40px] left-0 z-20 transition-all duration-500 ease-out cursor-pointer md:top-[50px]"
                style={{
                  transform:
                    hoveredCard === 1
                      ? "rotate(0deg) scale(1.03)"
                      : "rotate(-6deg)",
                }}
                onMouseEnter={() => setHoveredCard(1)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="overflow-hidden rounded-[16px] bg-white p-3 shadow-[0_18px_50px_rgba(0,0,0,0.35)] md:rounded-[20px] md:p-4">
                  <p className="section-subtitle mb-3 pl-1 text-left text-black">
                    {cards[1].label}
                  </p>
                  <div className="overflow-hidden rounded-[12px] md:rounded-[16px]">
                    <Image
                      src={cards[1].image}
                      alt={cards[1].label}
                      width={280}
                      height={320}
                      className="h-[180px] w-[200px] object-cover object-center md:h-[240px] md:w-[250px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

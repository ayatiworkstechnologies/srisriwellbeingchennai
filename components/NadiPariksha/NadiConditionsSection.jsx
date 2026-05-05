"use client";

import Image from "next/image";
import { useState } from "react";
import { PiPlant } from "react-icons/pi";
import RevealOnScroll from "../Main/RevealOnScroll";

// The exact icon from the design: A green leaf
const LeafIcon = () => (
  <div className="relative inline-flex flex-shrink-0 items-center justify-center mr-3 bg-white p-1.5 rounded-full shadow-sm">
    <PiPlant className="text-[24px] text-[#8cb14a]" />
  </div>
);

import { conditions, therapyCards } from "./nadiParikshaData";

export default function NadiConditionsSection() {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <section className="section-padding relative overflow-hidden bg-[#3b2218]">
      {/* Exact Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(#e7d58f 1px, transparent 1px), linear-gradient(90deg, #e7d58f 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          backgroundPosition: "center top"
        }}
      />

      <div className="relative z-10 mx-auto w-[min(1100px,calc(100%-24px))] md:w-[min(1100px,calc(100%-40px))]">
        <div className="flex flex-col items-center gap-12 md:flex-row md:items-center md:justify-between md:gap-16">
          {/* ── Left: Title + Conditions ── */}
          <RevealOnScroll className="flex-shrink-0 pt-4 md:pt-0">
            <h2 className="section-title leading-[1.2] text-white tracking-wide lg:text-[42px]">
              Find Ayurveda Solutions
              <br />
              For Conditions Like
            </h2>
            <div className="mt-4 h-[2px] w-[60px] bg-[#c79f31] md:mt-5" />

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 md:mt-10 md:gap-y-6">
              {conditions.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center"
                >
                  <LeafIcon />
                  <span className="section-subtitle ml-1 text-white tracking-wide">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </RevealOnScroll>

          {/* ── Right: Stacked Cards ── */}
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
                    {therapyCards[0].title}
                  </p>
                  <div className="overflow-hidden rounded-[12px] md:rounded-[16px]">
                    <Image
                      src={therapyCards[0].image}
                      alt={therapyCards[0].title}
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
                    {therapyCards[1].title}
                  </p>
                  <div className="overflow-hidden rounded-[12px] md:rounded-[16px]">
                    <Image
                      src={therapyCards[1].image}
                      alt={therapyCards[1].title}
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

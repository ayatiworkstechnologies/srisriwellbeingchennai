"use client";

import Image from "next/image";
import { useState } from "react";
import RevealOnScroll from "../Main/RevealOnScroll";
import LeafGlyph from "../ui/LeafGlyph";

const LeafIcon = () => (
  <div className="relative inline-flex flex-shrink-0 items-center justify-center mr-3">
    <LeafGlyph className="h-7 w-7" />
  </div>
);

import { conditions, therapyCards } from "./nadiParikshaData";

export default function NadiConditionsSection() {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0">
        <Image
          src="/images/sec-1.svg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="relative z-10 mx-auto w-[min(1100px,calc(100%-24px))] md:w-[min(1100px,calc(100%-40px))]">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          {/* ── Left: Title + Conditions ── */}
          <RevealOnScroll className="w-full max-w-[640px] flex-shrink-0 pt-4 lg:max-w-none lg:pt-0">
            <h2 className="section-title leading-[1.2] text-white tracking-wide lg:text-[42px]">
              Find Ayurveda Solutions
              <br />
              For Conditions Like
            </h2>
            <div className="mt-4 h-[2px] w-[60px] bg-[#c79f31] md:mt-5" />

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 md:mt-10 md:gap-y-6">
              {conditions.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div key={item.label} className="flex items-center group">
                    <div className="relative inline-flex flex-shrink-0 items-center justify-center mr-3 text-[#c79f31] transition-transform duration-300 group-hover:scale-110">
                      {IconComponent ? (
                        <IconComponent className="h-7 w-7" />
                      ) : (
                        <LeafGlyph className="h-7 w-7" />
                      )}
                    </div>
                    <span className="section-subtitle ml-1 text-white tracking-wide group-hover:text-[#c79f31] transition-colors duration-300">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </RevealOnScroll>

          {/* ── Right: Stacked Cards ── */}
          <RevealOnScroll
            delay={0.2}
            className="mt-8 flex w-full justify-center lg:mt-0 lg:w-auto"
          >
            <div className="grid w-full max-w-[760px] gap-5 md:grid-cols-2 lg:hidden">
              {therapyCards.map((card) => (
                <div
                  key={card.title}
                  className="overflow-hidden rounded-[20px] bg-white p-4 shadow-[0_18px_40px_rgba(0,0,0,0.24)]"
                >
                  <p className="section-subtitle mb-3 pl-1 text-left text-black">
                    {card.title}
                  </p>
                  <div className="overflow-hidden rounded-[16px]">
                    <Image
                      src={card.image}
                      alt={card.title}
                      width={360}
                      height={360}
                      className="h-[250px] w-full object-cover object-center"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="relative hidden h-[400px] w-[360px] lg:block">
              <div
                className="absolute top-0 right-0 z-10 cursor-pointer transition-all duration-500 ease-out"
                style={{
                  transform:
                    hoveredCard === 0
                      ? "rotate(0deg) scale(1.03)"
                      : "rotate(8deg)",
                }}
                onMouseEnter={() => setHoveredCard(0)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="overflow-hidden rounded-[20px] bg-white p-4 shadow-[0_14px_44px_rgba(0,0,0,0.30)]">
                  <p className="section-subtitle mb-3 pl-1 text-left text-black">
                    {therapyCards[0].title}
                  </p>
                  <div className="overflow-hidden rounded-[16px]">
                    <Image
                      src={therapyCards[0].image}
                      alt={therapyCards[0].title}
                      width={320}
                      height={320}
                      className="h-[320px] w-[320px] object-cover object-center"
                    />
                  </div>
                </div>
              </div>

              <div
                className="absolute left-0 top-[50px] z-20 cursor-pointer transition-all duration-500 ease-out"
                style={{
                  transform:
                    hoveredCard === 1
                      ? "rotate(0deg) scale(1.03)"
                      : "rotate(-6deg)",
                }}
                onMouseEnter={() => setHoveredCard(1)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="overflow-hidden rounded-[20px] bg-white p-4 shadow-[0_18px_50px_rgba(0,0,0,0.35)]">
                  <p className="section-subtitle mb-3 pl-1 text-left text-black">
                    {therapyCards[1].title}
                  </p>
                  <div className="overflow-hidden rounded-[16px]">
                    <Image
                      src={therapyCards[1].image}
                      alt={therapyCards[1].title}
                      width={320}
                      height={320}
                      className="h-[320px] w-[320px] object-cover object-center"
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

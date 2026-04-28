"use client";

import Image from "next/image";
import { useState } from "react";
import {
  GiKidneys,
  GiHeartBeats,
  GiLungs,
  GiDroplets,
} from "react-icons/gi";
import RevealOnScroll from "../Main/RevealOnScroll";

const conditions = [
  { label: "Kidney Care", Icon: GiKidneys },
  { label: "Diabetes", Icon: GiDroplets },
  { label: "Cardiac Care", Icon: GiHeartBeats },
  { label: "Asthma", Icon: GiLungs },
];

const therapyCards = [
  {
    title: "Reflexology",
    image: "/images/ser-3.jpg",
  },
  {
    title: "Reflexology",
    image: "/images/ser-1.jpg",
  },
];

export default function NadiConditionsSection() {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <section className="relative overflow-hidden bg-[#3b2218] py-14 md:py-20 lg:py-24">
      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #d0a93d 1.2px, transparent 1.2px)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="relative z-10 mx-auto w-[min(1100px,calc(100%-24px))] md:w-[min(1100px,calc(100%-40px))]">
        <div className="flex flex-col items-center gap-10 md:flex-row md:items-center md:justify-between md:gap-12">
          {/* ── Left: Title + Conditions ── */}
          <RevealOnScroll className="flex-shrink-0">
            <h2 className="text-[22px] md:text-[28px] lg:text-[34px] font-bold leading-[1.2] text-white">
              Find Ayurveda Solutions
              <br />
              For Conditions Like
            </h2>

            <ul className="mt-7 space-y-5 md:mt-9 md:space-y-6">
              {conditions.map((item, idx) => (
                <li
                  key={item.label}
                  className="flex items-center gap-3.5"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d0a93d] text-white">
                    <item.Icon className="text-[18px]" />
                  </span>
                  <span className="text-[15px] md:text-[17px] font-medium text-white/90">
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </RevealOnScroll>

          {/* ── Right: Stacked Cards ── */}
          <RevealOnScroll
            delay={0.2}
            className="relative flex items-center justify-center"
          >
            <div className="relative h-[340px] w-[300px] md:h-[400px] md:w-[360px]">
              {/* Back card */}
              <div
                className="absolute top-0 right-0 z-10 transition-all duration-500 ease-out cursor-pointer"
                style={{
                  transform:
                    hoveredCard === 0
                      ? "rotate(0deg) scale(1.03)"
                      : "rotate(6deg)",
                }}
                onMouseEnter={() => setHoveredCard(0)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="overflow-hidden rounded-[16px] bg-white p-[6px] shadow-[0_14px_44px_rgba(0,0,0,0.30)] md:rounded-[20px] md:p-2">
                  <div className="overflow-hidden rounded-[12px] md:rounded-[16px]">
                    <Image
                      src={therapyCards[0].image}
                      alt={therapyCards[0].title}
                      width={280}
                      height={320}
                      className="h-[220px] w-[200px] object-cover object-center md:h-[280px] md:w-[250px]"
                    />
                  </div>
                  <p className="py-2 text-center text-[13px] md:text-[15px] font-semibold text-[#3b2218] italic">
                    {therapyCards[0].title}
                  </p>
                </div>
              </div>

              {/* Front card */}
              <div
                className="absolute top-[50px] left-0 z-20 transition-all duration-500 ease-out cursor-pointer md:top-[60px]"
                style={{
                  transform:
                    hoveredCard === 1
                      ? "rotate(0deg) scale(1.03)"
                      : "rotate(-5deg)",
                }}
                onMouseEnter={() => setHoveredCard(1)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="overflow-hidden rounded-[16px] bg-white p-[6px] shadow-[0_18px_50px_rgba(0,0,0,0.35)] md:rounded-[20px] md:p-2">
                  <div className="overflow-hidden rounded-[12px] md:rounded-[16px]">
                    <Image
                      src={therapyCards[1].image}
                      alt={therapyCards[1].title}
                      width={280}
                      height={320}
                      className="h-[220px] w-[200px] object-cover object-center md:h-[280px] md:w-[250px]"
                    />
                  </div>
                  <p className="py-2 text-center text-[13px] md:text-[15px] font-semibold text-[#3b2218] italic">
                    {therapyCards[1].title}
                  </p>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

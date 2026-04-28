"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  FaHeartPulse,
  FaLeaf,
  FaBrain,
  FaShieldHalved,
  FaStethoscope,
  FaSpa,
} from "react-icons/fa6";
import RevealOnScroll from "../Main/RevealOnScroll";

const benefits = [
  {
    icon: FaHeartPulse,
    title: "Dosha Assessment",
    desc: "Accurately identifies your unique Vata, Pitta, and Kapha constitution and current imbalances through subtle pulse analysis.",
  },
  {
    icon: FaStethoscope,
    title: "Early Detection",
    desc: "Detects potential health issues at a sub-clinical level, long before they manifest as visible symptoms or diseases.",
  },
  {
    icon: FaBrain,
    title: "Mental Wellbeing",
    desc: "Evaluates emotional and psychological patterns, including stress levels, sleep quality, and mental clarity indicators.",
  },
  {
    icon: FaLeaf,
    title: "Personalised Treatment",
    desc: "Guides customised Ayurvedic diet plans, herbal supplements, and therapeutic treatments tailored specifically to your body.",
  },
  {
    icon: FaShieldHalved,
    title: "Organ Health Mapping",
    desc: "Provides insights into the functional status of vital organs, enabling targeted support and preventive care measures.",
  },
  {
    icon: FaSpa,
    title: "Holistic Restoration",
    desc: "Serves as the foundation for comprehensive Panchakarma and detox programs designed to restore complete mind-body balance.",
  },
];

export default function NadiBenefitsSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="relative overflow-hidden bg-[#f8f6f1] py-16 md:py-24">
      {/* Background texture */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <Image
          src="/images/sec-2-bg.svg"
          alt="Background pattern"
          fill
          className="object-cover"
          priority={false}
        />
      </div>

      <div className="relative z-10 mx-auto w-[min(1200px,calc(100%-24px))] md:w-[min(1200px,calc(100%-40px))]">
        {/* Header */}
        <RevealOnScroll className="mb-12 text-center md:mb-16">
          <p className="text-sm md:text-base font-semibold uppercase tracking-[0.2em] text-[#c29a2f]">
            Why Nadi Pariksha
          </p>
          <h2 className="mt-3 text-2xl md:text-4xl lg:text-[42px] font-bold leading-tight text-[#1f1a17]">
            The Science Behind the Pulse
          </h2>
          <div className="mx-auto mt-4 h-[3px] w-[82px] rounded-full bg-gradient-to-r from-[#e7d58f] to-[#c79f31]" />
          <p className="mx-auto mt-5 max-w-[680px] text-base md:text-lg leading-7 text-[#5e5751]">
            An ancient diagnostic art that reads the body&apos;s deepest
            signals, revealing the root cause of imbalance — not just the
            symptoms.
          </p>
        </RevealOnScroll>

        {/* Benefits Grid */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 md:gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <RevealOnScroll key={benefit.title} delay={index * 0.1}>
                <div
                  className={`group relative flex flex-col rounded-[22px] bg-white p-6 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.10)] cursor-pointer min-h-[260px] ${
                    activeIndex === index
                      ? "ring-2 ring-[#c29a2f]/40 shadow-[0_20px_50px_rgba(194,154,47,0.12)]"
                      : ""
                  }`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 h-20 w-20 overflow-hidden rounded-tr-[22px]">
                    <div className="absolute -right-10 -top-10 h-20 w-20 rotate-45 bg-gradient-to-br from-[#c29a2f]/8 to-transparent transition-all duration-500 group-hover:from-[#c29a2f]/15" />
                  </div>

                  {/* Icon */}
                  <div className="flex h-14 w-14 items-center justify-center rounded-[16px] bg-gradient-to-br from-[#f8f0dc] to-[#f0e4c4] shadow-[0_4px_14px_rgba(194,154,47,0.12)] transition-all duration-500 group-hover:shadow-[0_8px_24px_rgba(194,154,47,0.20)] group-hover:scale-110">
                    <Icon className="text-[22px] text-[#b8952b]" />
                  </div>

                  {/* Content */}
                  <h3 className="mt-5 text-lg md:text-xl font-bold text-[#1f1a17] transition-colors duration-300 group-hover:text-[#4b1f12]">
                    {benefit.title}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-[#7a726c] transition-colors duration-300 group-hover:text-[#5e5751]">
                    {benefit.desc}
                  </p>

                  {/* Bottom accent line */}
                  <div className="mt-auto pt-5">
                    <div className="h-[2px] w-0 rounded-full bg-gradient-to-r from-[#c29a2f] to-[#e7d58f] transition-all duration-500 group-hover:w-full" />
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <RevealOnScroll delay={0.4} className="mt-12 text-center md:mt-16">
          <a
            href="/contact"
            className="inline-flex h-12 md:h-14 items-center justify-center gap-3 rounded-full bg-[#3b2218] px-8 md:px-10 text-base md:text-lg font-semibold tracking-wide text-white transition-all duration-400 hover:-translate-y-1 hover:bg-[#4b1f12] hover:shadow-[0_12px_36px_rgba(59,34,24,0.30)]"
          >
            Book Your Nadi Pariksha
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </a>
        </RevealOnScroll>
      </div>
    </section>
  );
}

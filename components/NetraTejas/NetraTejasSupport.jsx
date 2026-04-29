"use client";

import {
  FaMoon,
  FaPersonWalking,
  FaMobileScreen,
  FaGraduationCap,
} from "react-icons/fa6";
import RevealOnScroll from "../Main/RevealOnScroll";

const factorIcons = [
  FaPersonWalking,
  FaGraduationCap,
  FaMobileScreen,
  FaMoon,
];

const factorColors = [
  { bg: "bg-[#fdf3e0]", icon: "text-[#c79f31]", border: "border-[#f5e0aa]" },
  { bg: "bg-[#edf5f0]", icon: "text-[#2d7a55]", border: "border-[#c3e0d0]" },
  { bg: "bg-[#f0f0fb]", icon: "text-[#5555c7]", border: "border-[#c8c8f0]" },
  { bg: "bg-[#fdf0f0]", icon: "text-[#c74545]", border: "border-[#f0c8c8]" },
];

export default function NetraTejasSupport({ youngEyesFactors }) {
  return (
    <section className="section-padding bg-white">
      <div className="container-width">
        <div className="flex flex-col gap-12 md:flex-row md:items-center md:gap-16 lg:gap-24">
          {/* Left: Heading + Description */}
          <RevealOnScroll className="flex-shrink-0 md:max-w-[420px]">
            <p className="eyebrow-text text-[#d0a93d]">Eye Health Awareness</p>
            <h2 className="section-title mt-4 text-[#191412] leading-snug">
              Addressing a Spectrum of Eye Disorders
            </h2>
            <div className="mt-4 h-[3px] w-[60px] rounded-full bg-gradient-to-r from-[#e7d58f] to-[#c79f31]" />
            <p className="para-text mt-6 text-[#6e6662]">
              In today&apos;s digital age, children and adults are facing
              unprecedented challenges in their eye health. Poor sleep habits,
              prolonged screen time, and academic pressure are affecting visual
              comfort at an alarming rate.
            </p>
            <p className="small-text mt-4 text-[#6e6662]">
              As visual health issues rise, we understand the importance of
              early intervention and preventive eye care. Our care model
              supports eye health through lifestyle guidance, natural therapies,
              and personalised wellness consultation.
            </p>
          </RevealOnScroll>

          {/* Right: Factor Cards Grid */}
          <div className="flex-1 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {youngEyesFactors.map((item, index) => {
              const Icon = factorIcons[index] || FaMoon;
              const colors = factorColors[index] || factorColors[0];
              return (
                <RevealOnScroll key={item} delay={index * 0.1}>
                  <div
                    className={`rounded-[20px] border ${colors.border} ${colors.bg} p-6 shadow-[0_8px_24px_rgba(23,18,15,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_36px_rgba(23,18,15,0.10)]`}
                  >
                    <div
                      className={`inline-flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm`}
                    >
                      <Icon className={`text-xl ${colors.icon}`} />
                    </div>
                    <p className="section-subtitle mt-4 text-[#201815]">
                      {item}
                    </p>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

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
    <section className="section-padding bg-[#faf9f6]">
      <div className="container-width">
        <div className="flex flex-col gap-10">
          {/* Top: Heading + Description */}
          <RevealOnScroll className="max-w-[800px]">
            <h2 className="section-title text-[#191412] leading-snug">
              Addressing a Spectrum of Eye Diseases
            </h2>
            <div className="mt-4 h-[3px] w-[60px] rounded-full bg-gradient-to-r from-[#e7d58f] to-[#c79f31]" />
            <p className="para-text mt-6 text-[#6e6662]">
              In today&apos;s digital age, children are facing unprecedented challenges in their eye
              health. Few factors that cause eye-related issues among children:
            </p>
          </RevealOnScroll>

          {/* Middle: Factor Cards Grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {youngEyesFactors.map((item, index) => {
              const Icon = factorIcons[index] || FaMoon;
              return (
                <RevealOnScroll key={item} delay={index * 0.1}>
                  <div
                    className="flex flex-col rounded-[20px] bg-white p-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_36px_rgba(0,0,0,0.10)]"
                  >
                    <div className="mb-4 text-3xl text-[#c79f31]">
                      <Icon />
                    </div>
                    <div className="h-px w-full bg-[#d8c8a2]/50 mb-4" />
                    <p className="text-[17px] font-bold text-[#191412]">
                      {item}
                    </p>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>

          {/* Bottom: Paragraph */}
          <RevealOnScroll delay={0.4}>
            <p className="small-text mt-2 text-[#6e6662]">
              At Sri Sri Netra Tejas, we understand the importance of early intervention and preventive care for children&apos;s eye health. Our personalised treatments cater to the unique needs of young eyes, promoting optimal vision development and overall well-being.
            </p>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

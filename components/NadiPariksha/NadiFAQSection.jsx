"use client";

import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import RevealOnScroll from "../Main/RevealOnScroll";

const faqs = [
  {
    q: "What is Nadi Pariksha?",
    a: "Nadi Pariksha is an ancient Ayurvedic technique of pulse diagnosis. By reading the subtle pulse vibrations at the wrist, a trained Nadi Vaidya can assess your dosha constitution (Vata, Pitta, Kapha), identify imbalances, and evaluate the functional status of vital organs.",
  },
  {
    q: "Is Nadi Pariksha painful or invasive?",
    a: "Not at all. Nadi Pariksha is completely non-invasive and painless. The practitioner simply places three fingers on your wrist and reads the pulse patterns. It requires no needles, blood tests, or any physical discomfort.",
  },
  {
    q: "How long does a Nadi Pariksha session take?",
    a: "A typical Nadi Pariksha session takes between 20 to 40 minutes. This includes the pulse reading, discussion of findings, and a personalised treatment or lifestyle recommendation plan.",
  },
  {
    q: "How accurate is Nadi Pariksha diagnosis?",
    a: "When performed by an experienced Nadi Vaidya, the accuracy is remarkably high. It can detect imbalances at a sub-clinical level — often identifying health concerns before they manifest as visible symptoms, making it an excellent preventive health tool.",
  },
  {
    q: "Do I need to prepare anything before a session?",
    a: "It is recommended to avoid heavy meals, caffeine, and intense exercise at least 2 hours before your appointment. Come with a calm and relaxed mind for the most accurate pulse reading.",
  },
  {
    q: "Can Nadi Pariksha help with chronic conditions?",
    a: "Yes. Nadi Pariksha is particularly effective for understanding the root cause of chronic conditions like diabetes, digestive issues, stress-related disorders, hormonal imbalances, and joint pain, enabling targeted Ayurvedic treatment.",
  },
];

export default function NadiFAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section className="relative bg-[#f5f2ec] py-16 md:py-24">
      <div className="mx-auto w-[min(900px,calc(100%-24px))] md:w-[min(900px,calc(100%-40px))]">
        {/* Heading */}
        <RevealOnScroll className="text-center mb-10 md:mb-14">
          <p className="text-sm md:text-base font-semibold uppercase tracking-[0.2em] text-[#c29a2f]">
            Common Questions
          </p>
          <h2 className="mt-3 text-2xl md:text-4xl lg:text-[42px] font-bold leading-tight text-[#1f1a17]">
            Frequently Asked Questions
          </h2>
          <div className="mx-auto mt-4 h-[3px] w-[82px] rounded-full bg-gradient-to-r from-[#e7d58f] to-[#c79f31]" />
        </RevealOnScroll>

        {/* FAQ Items */}
        <div className="space-y-3 md:space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <RevealOnScroll key={idx} delay={idx * 0.06}>
                <div
                  className={`overflow-hidden rounded-[18px] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-400 md:rounded-[22px] ${
                    isOpen
                      ? "shadow-[0_12px_36px_rgba(0,0,0,0.08)]"
                      : "hover:shadow-[0_8px_28px_rgba(0,0,0,0.06)]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left md:px-8 md:py-6"
                  >
                    <h3
                      className={`text-base md:text-lg font-semibold transition-colors duration-300 ${
                        isOpen ? "text-[#3b2218]" : "text-[#1f1a17]"
                      }`}
                    >
                      {faq.q}
                    </h3>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-400 ${
                        isOpen
                          ? "bg-[#3b2218] text-white rotate-0"
                          : "bg-[#f0ebe3] text-[#7a726c] rotate-0"
                      }`}
                    >
                      {isOpen ? (
                        <FaMinus className="text-[11px]" />
                      ) : (
                        <FaPlus className="text-[11px]" />
                      )}
                    </span>
                  </button>

                  <div
                    className="overflow-hidden transition-all duration-400"
                    style={{
                      maxHeight: isOpen ? "300px" : "0px",
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <div className="px-6 pb-5 md:px-8 md:pb-6">
                      <div className="mb-3 h-px w-full bg-[#e8e1d6]" />
                      <p className="text-base leading-7 text-[#5e5751]">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}

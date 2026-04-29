"use client";

import { useState } from "react";
import Image from "next/image";
import { FaPlus, FaTimes } from "react-icons/fa";
import RevealOnScroll from "../Main/RevealOnScroll";

const faqs = [
  {
    q: "What is Panchakarma and who is it suitable for?",
    a: "Panchakarma is the ancient Ayurvedic five-fold detoxification process consisting of Vamana, Virechana, Vasti, Nasya, and Raktamokshana. It is suitable for most adults looking to detoxify, manage chronic conditions, or restore balance — and is customised based on individual prakriti (body constitution).",
  },
  {
    q: "How long does a Panchakarma programme typically last?",
    a: "A standard Panchakarma programme typically lasts 7 to 21 days, depending on your health condition, dosha imbalance, and treatment goals. Shorter programmes of 3–5 days are also available for maintenance and stress relief.",
  },
  {
    q: "Is any preparation required before Panchakarma?",
    a: "Yes. Panchakarma typically involves a preparatory phase (Purvakarma) including Snehapana (internal oleation with medicated ghee) and Abhyanga (oil massage) before the main detoxification procedures. Our doctors will guide you through the entire process.",
  },
  {
    q: "Can I continue my regular diet during Panchakarma?",
    a: "During Panchakarma, a specific Ayurvedic diet is recommended to support the detoxification process. Our team provides detailed dietary guidelines and monitors your progress throughout the programme.",
  },
  {
    q: "Are there any side effects of Panchakarma?",
    a: "Panchakarma is generally safe when administered by trained Ayurvedic physicians. Some patients experience mild fatigue or detox reactions during the process, which are normal signs of toxin release. Our specialists continuously monitor your wellbeing.",
  },
  {
    q: "How soon will I see results after Panchakarma?",
    a: "Many patients experience improved energy, digestion, and mental clarity within days of starting treatment. Deeper benefits for chronic conditions may be observed over weeks to months following the programme, especially when combined with lifestyle and dietary changes.",
  },
];

export default function PKFAQSection() {
  const [openIndex, setOpenIndex] = useState(0);
  const toggle = (idx) => setOpenIndex(openIndex === idx ? -1 : idx);

  return (
    <section className="relative bg-[#f5f2ec] section-padding">
      <div className="container-width">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:gap-16 lg:gap-24">
          {/* Left: Image + badge */}
          <RevealOnScroll className="w-full md:w-[40%] flex-shrink-0">
            <div className="relative rounded-[24px] bg-white p-3 shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
              <div className="overflow-hidden rounded-[18px] border-8 border-[#3b2218]">
                <Image
                  src="/images/ser-1.jpg"
                  alt="Panchakarma Ayurvedic Treatment"
                  width={600}
                  height={800}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            <div className="mt-6 rounded-[16px] bg-[#3b2218] p-5 text-white">
              <p className="eyebrow-text text-[#d0a93d]">Ready to Begin?</p>
              <p className="para-text mt-3 text-white/80">
                Consult our Ayurvedic specialists for a personalised Panchakarma
                plan designed around your unique constitution and health goals.
              </p>
              <a
                href="/contact"
                className="btn-wellness mt-5 scale-90 origin-left"
              >
                <span className="btn-wellness-icon">☘</span>
                <span className="btn-wellness-text">Book a Consultation</span>
                <span className="btn-wellness-arrow">→</span>
              </a>
            </div>
          </RevealOnScroll>

          {/* Right: FAQ */}
          <RevealOnScroll delay={0.2} className="w-full flex-1">
            <h2 className="section-title text-[#1f1a17]">
              Frequently Asked Questions
            </h2>
            <div className="mt-4 mb-8 md:mb-10 h-[2px] w-[60px] bg-[#d0a93d]" />

            <div className="space-y-4 md:space-y-6">
              {faqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div key={idx} className="border-b border-[#d9d0c3] pb-4">
                    <button
                      type="button"
                      onClick={() => toggle(idx)}
                      className="flex w-full items-start justify-between gap-4 text-left"
                    >
                      <h3
                        className={`text-[15px] md:text-[16px] transition-colors duration-300 ${
                          isOpen ? "font-bold text-[#1f1a17]" : "font-semibold text-[#6b5f58]"
                        }`}
                      >
                        {faq.q}
                      </h3>
                      <span className="mt-1 flex-shrink-0 text-[#d0a93d]">
                        {isOpen ? <FaTimes className="text-[14px]" /> : <FaPlus className="text-[14px]" />}
                      </span>
                    </button>
                    <div
                      className="overflow-hidden transition-all duration-500 ease-in-out"
                      style={{ maxHeight: isOpen ? "300px" : "0px", opacity: isOpen ? 1 : 0 }}
                    >
                      <p className="mt-3 small-text text-[#6b5f58] pr-8 leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

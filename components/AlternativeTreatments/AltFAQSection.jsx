"use client";

import { useState } from "react";
import Image from "next/image";
import { FaPlus, FaTimes } from "react-icons/fa";
import RevealOnScroll from "../Main/RevealOnScroll";

const faqs = [
  {
    q: "What are Alternative Treatments?",
    a: "Alternative treatments encompass a wide range of healing practices outside conventional medicine, including Ayurveda, osteopathy, ozone therapy, craniosacral therapy, and more. They focus on treating the root cause of illness using natural and holistic approaches.",
  },
  {
    q: "Are these therapies safe to use alongside conventional medicine?",
    a: "In most cases, yes. Our specialists carefully evaluate your current medications and health status to create a treatment plan that safely integrates alternative therapies with any ongoing conventional treatments.",
  },
  {
    q: "How many sessions will I need?",
    a: "The number of sessions varies depending on your condition, the specific therapy, and your body's response. Our specialists will create a personalised plan and guide you through the process step by step.",
  },
  {
    q: "Who is eligible for these treatments?",
    a: "Most of our alternative therapies are suitable for adults across all age groups. Some modalities are also available for children. A detailed initial consultation helps determine the most appropriate therapies for each individual.",
  },
  {
    q: "Do you offer personalised treatment plans?",
    a: "Absolutely. We believe in a truly personalised approach. After an initial assessment, our specialists design a customised combination of therapies based on your unique health profile, lifestyle, and goals.",
  },
  {
    q: "How do I book an appointment?",
    a: "You can book a consultation through our Contact page or by calling us directly. Our team will schedule an initial assessment with the most appropriate specialist for your needs.",
  },
];

export default function AltFAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section className="relative bg-white section-padding">
      <div className="container-width">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:gap-16 lg:gap-24">
          {/* Left Side: Image */}
          <RevealOnScroll className="w-full md:w-[40%] flex-shrink-0">
            <div className="relative rounded-[24px] bg-white p-3 shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
              <div className="overflow-hidden rounded-[18px] border-8 border-[#3b2218]">
                <Image
                  src="/images/alt-marma.png"
                  alt="Alternative Therapy Treatment"
                  width={600}
                  height={800}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            {/* Floating badge */}
            <div className="mt-6 rounded-[16px] bg-[#3b2218] p-5 text-white">
              <p className="eyebrow-text text-[#d0a93d]">Why Choose Us?</p>
              <p className="para-text mt-3 text-white/80">
                Our integrative approach combines the best of ancient wisdom and
                modern science to deliver personalised, evidence-informed care.
              </p>
            </div>
          </RevealOnScroll>

          {/* Right Side: FAQ Accordion */}
          <RevealOnScroll delay={0.2} className="w-full flex-1">
            <h2 className="section-title text-[#1f1a17]">
              Frequently Asked Questions
            </h2>
            <div className="mt-4 mb-8 md:mb-10 h-[2px] w-[60px] bg-[#d0a93d]" />

            <div className="space-y-4 md:space-y-6">
              {faqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div key={idx} className="border-b border-gray-200 pb-4">
                    <button
                      type="button"
                      onClick={() => toggle(idx)}
                      className="flex w-full items-start justify-between gap-4 text-left"
                    >
                      <h3
                        className={`text-[15px] md:text-[16px] transition-colors duration-300 ${
                          isOpen
                            ? "font-bold text-[#1f1a17]"
                            : "font-semibold text-gray-600"
                        }`}
                      >
                        {faq.q}
                      </h3>
                      <span className="mt-1 flex-shrink-0 text-[#d0a93d]">
                        {isOpen ? (
                          <FaTimes className="text-[14px]" />
                        ) : (
                          <FaPlus className="text-[14px]" />
                        )}
                      </span>
                    </button>

                    <div
                      className="overflow-hidden transition-all duration-500 ease-in-out"
                      style={{
                        maxHeight: isOpen ? "200px" : "0px",
                        opacity: isOpen ? 1 : 0,
                      }}
                    >
                      <p className="mt-3 small-text text-gray-600 pr-8">
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

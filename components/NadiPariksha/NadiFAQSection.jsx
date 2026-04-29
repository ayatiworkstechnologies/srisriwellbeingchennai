"use client";

import { useState } from "react";
import Image from "next/image";
import { FaPlus, FaTimes } from "react-icons/fa";
import RevealOnScroll from "../Main/RevealOnScroll";

const faqs = [
  {
    q: "What is Nadi Pariksha and how does it help?",
    a: "Nadi Pariksha is an ancient pulse diagnosis technique used to assess the balance of doshas in the body. It helps detect imbalances in physical, mental and emotional health—often before symptoms appear.",
  },
  {
    q: "How is your treatment approach different from modern medicine?",
    a: "Unlike modern medicine which often treats symptoms, Ayurveda addresses the root cause of the problem using natural remedies, lifestyle changes, and personalized diet plans.",
  },
  {
    q: "What can I expect in my first consultation?",
    a: "Your first consultation will involve a detailed pulse diagnosis (Nadi Pariksha), a discussion about your medical history, lifestyle, and diet, followed by a personalized Ayurvedic treatment plan.",
  },
  {
    q: "Can Ayurveda help with chronic health issues?",
    a: "Yes, Ayurveda is highly effective in managing and treating chronic conditions like diabetes, arthritis, asthma, and digestive disorders by restoring the body's natural balance.",
  },
  {
    q: "Can I continue allopathic medicine with Ayurvedic treatment?",
    a: "In most cases, yes. However, it is crucial to inform your Nadi Vaidya about all your current medications so they can tailor your Ayurvedic treatment safely without adverse interactions.",
  },
  {
    q: "Is Ayurvedic treatment safe for all age groups?",
    a: "Absolutely. Ayurvedic treatments are natural and can be safely customized for children, adults, and the elderly based on their specific body constitution and health needs.",
  },
];

export default function NadiFAQSection() {
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
                  src="/images/ser-1.jpg" // Assuming this is the facial treatment image
                  alt="Ayurvedic Treatment"
                  width={600}
                  height={800}
                  className="w-full h-auto object-cover"
                />
              </div>
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

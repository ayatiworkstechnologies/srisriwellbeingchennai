"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import RevealOnScroll from "./RevealOnScroll";
import WellnessButton from "../layouts/WellnessButton";
import ServiceModal from "./ServiceModal";
import { AnimatePresence } from "framer-motion";

const therapyCards = [
  {
    title: "Nadi Pariksha",
    desc: "A non-invasive Ayurvedic pulse diagnosis technique used by our practitioners to assess your doshas and identify imbalances.",
    fullDesc: "Nadi Pariksha is an ancient Ayurvedic pulse diagnosis technique that provides a comprehensive insight into an individual's physical, mental, and emotional health. By feeling the pulse, our expert vaidyas can detect imbalances long before they manifest as physical symptoms, allowing for truly preventive care.",
    image: "/images/ser-1.jpg",
    benefits: [
      "Root cause identification of imbalances",
      "Assessment of organ health and function",
      "Personalized diet and lifestyle guidance",
      "Early detection of potential health issues"
    ]
  },
  {
    title: "Panchakarma Rituals",
    desc: "A comprehensive Ayurvedic detoxification and cleansing program designed to eliminate deep-seated toxins.",
    fullDesc: "Panchakarma is the ultimate Ayurvedic detox program. It consists of five therapeutic actions that cleanse the body of deep-seated toxins (Ama) while restoring the natural balance of the Doshas. It is a profound journey of purification and rejuvenation for the entire system.",
    image: "/images/ser-2.jpg",
    benefits: [
      "Deep detoxification of the entire body",
      "Strengthens the immune system",
      "Enhances metabolic and digestive function",
      "Restores cellular vitality and energy"
    ]
  },
  {
    title: "Marma Therapy",
    desc: "Gentle stimulation of specific vital energy points on the body to improve energy flow and reduce stress.",
    fullDesc: "Marma Therapy focuses on the 107 vital energy points where the body's consciousness and matter meet. Through gentle stimulation of these points, we release blocked energy, reduce physical and mental tension, and stimulate the body's natural healing mechanisms.",
    image: "/images/ser-3.jpg",
    benefits: [
      "Releases deep-seated physical and emotional stress",
      "Improves the flow of Prana (vital energy)",
      "Enhances organ function and systemic balance",
      "Promotes deep relaxation and mental clarity"
    ]
  },
  {
    title: "Osteopathic Therapy",
    desc: "Manual therapy focused on the musculoskeletal system to manage pain and improve framework strength.",
    fullDesc: "Our Osteopathic approach combines modern anatomical knowledge with traditional manual techniques. We focus on the structural integrity of the body, working with muscles, joints, and connective tissues to relieve pain, improve mobility, and support the body's self-healing capacity.",
    image: "/images/ser-4.jpg",
    benefits: [
      "Relieves chronic pain and structural tension",
      "Improves posture and spinal alignment",
      "Enhances mobility and flexibility",
      "Supports nervous system health"
    ]
  },
  {
    title: "Ozone Therapy",
    desc: "Advanced restorative treatment to address chronic conditions and enhance overall systemic vitality.",
    fullDesc: "Ozone Therapy is a cutting-edge integrative treatment that uses medical-grade ozone to stimulate the immune system and enhance oxygen delivery to tissues. It is highly effective for chronic inflammation, fatigue, and various systemic health concerns.",
    image: "/images/ser-5.jpg",
    benefits: [
      "Potent anti-inflammatory and antioxidant effect",
      "Boosts cellular energy and metabolic function",
      "Supports the immune system's response",
      "Enhances overall systemic vitality"
    ]
  },
  {
    title: "Meru Therapy",
    desc: "Specialized therapy deeply focused on spinal health and alignment to restore harmony.",
    fullDesc: "Meru Therapy is a unique approach centered on the spine (Meru Danda). It uses precise, gentle movements to release spinal tension and correct alignments, ensuring that the central channel of energy and information in the body functions optimally.",
    image: "/images/ser-6.jpg",
    benefits: [
      "Corrects spinal alignment and postural issues",
      "Relieves back, neck, and shoulder pain",
      "Enhances nervous system communication",
      "Promotes a profound sense of groundedness"
    ]
  },
  {
    title: "Craniosacral Therapy",
    desc: "Gentle, hands-on technique that monitors the rhythm of cerebrospinal fluid to release tensions.",
    fullDesc: "Craniosacral Therapy is a non-invasive, gentle touch therapy that works with the rhythm of the cerebrospinal fluid. By releasing restrictions in the craniosacral system, we allow the central nervous system to calm and the body to return to a state of deep equilibrium.",
    image: "/images/ser-7.jpg",
    benefits: [
      "Relieves migraine and tension headaches",
      "Calms the sympathetic nervous system",
      "Reduces stress, anxiety, and insomnia",
      "Supports emotional release and balance"
    ]
  },
  {
    title: "Pain Management",
    desc: "Integrative treatments combining classical and contemporary therapies to address chronic discomfort.",
    fullDesc: "Our Pain Management program is highly personalized, combining the best of Ayurvedic external therapies with modern holistic approaches. We don't just target the symptom; we look for the root cause of the discomfort to provide long-lasting relief and restored mobility.",
    image: "/images/ser-8.jpg",
    benefits: [
      "Effective relief from chronic musculoskeletal pain",
      "Reduces inflammation and swelling",
      "Restores natural range of motion",
      "Provides non-invasive alternatives to medication"
    ]
  },
];

export default function ServicesSection() {
  const [cardsPerPage, setCardsPerPage] = useState(4);
  const [page, setPage] = useState(0);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    const updateCardsPerPage = () => {
      if (window.innerWidth < 768) {
        setCardsPerPage(1);
        return;
      }

      if (window.innerWidth < 1024) {
        setCardsPerPage(2);
        return;
      }

      setCardsPerPage(4);
    };

    updateCardsPerPage();
    window.addEventListener("resize", updateCardsPerPage);

    return () => window.removeEventListener("resize", updateCardsPerPage);
  }, []);

  const totalPages = Math.ceil(therapyCards.length / cardsPerPage);
  const currentPage = Math.min(page, Math.max(totalPages - 1, 0));

  const visibleCards = useMemo(() => {
    const start = currentPage * cardsPerPage;
    return therapyCards.slice(start, start + cardsPerPage);
  }, [currentPage, cardsPerPage]);

  const canGoPrev = currentPage > 0;
  const canGoNext = currentPage < totalPages - 1;

  return (
    <section
      id="heal"
      className="section-padding relative overflow-hidden bg-[#f8f6f1]"
    >
      <div className="absolute inset-0">
        <Image
          src="/images/bg.svg"
          alt="Background pattern"
          fill
          className="object-cover"
        />
      </div>

      <div className="relative z-10 mx-auto w-[min(1380px,calc(100%-24px))] md:w-[min(1380px,calc(100%-40px))]">
        <RevealOnScroll className="title-center mb-10 md:mb-14">
          <h2 className="section-title text-[#1f1a17]">
            Precision Therapies. Profound Impact.
          </h2>
          <div className="mx-auto mt-4 h-[3px] w-[82px] rounded-full bg-linear-to-r from-[#e7d58f] to-[#c79f31]" />
        </RevealOnScroll>

        <RevealOnScroll
          delay={0.2}
          className="relative mx-auto max-w-[1320px] rounded-[30px] bg-white/90 px-5 py-6 shadow-[0_20px_50px_rgba(0,0,0,0.08)] backdrop-blur-sm md:px-8 md:py-8 lg:px-10 lg:py-10"
        >
          {/* Prev button */}
          <button
            type="button"
            onClick={() => canGoPrev && setPage(currentPage - 1)}
            disabled={!canGoPrev}
            className="absolute left-[8px] top-1/2 z-20 group flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#d0a93d] shadow-lg transition-all duration-300 hover:scale-110 disabled:cursor-not-allowed disabled:opacity-40 md:left-[-22px] md:h-14 md:w-14"
            aria-label="Previous services"
          >
            {/* Ripple Rings — animate on hover/click only */}
            <span
              className="hover-pulse-ring absolute inset-0 rounded-full border border-[#d0a93d]/30"
              style={{ animationDelay: "0s" }}
            />
            <span
              className="hover-pulse-ring absolute inset-[-8px] rounded-full border border-[#d0a93d]/20"
              style={{ animationDelay: "0.4s" }}
            />
            <span
              className="hover-pulse-ring absolute inset-[-16px] rounded-full border border-[#d0a93d]/10"
              style={{ animationDelay: "0.8s" }}
            />
            <FaChevronLeft className="relative z-10 text-[16px] md:text-[20px]" />
          </button>

          {/* Next button */}
          <button
            type="button"
            onClick={() => canGoNext && setPage(currentPage + 1)}
            disabled={!canGoNext}
            className="absolute right-[8px] top-1/2 z-20 group flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#d0a93d] shadow-lg transition-all duration-300 hover:scale-110 disabled:cursor-not-allowed disabled:opacity-40 md:right-[-22px] md:h-14 md:w-14"
            aria-label="Next services"
          >
            {/* Ripple Rings — animate on hover/click only */}
            <span
              className="hover-pulse-ring absolute inset-0 rounded-full border border-[#d0a93d]/30"
              style={{ animationDelay: "0s" }}
            />
            <span
              className="hover-pulse-ring absolute inset-[-8px] rounded-full border border-[#d0a93d]/20"
              style={{ animationDelay: "0.4s" }}
            />
            <span
              className="hover-pulse-ring absolute inset-[-16px] rounded-full border border-[#d0a93d]/10"
              style={{ animationDelay: "0.8s" }}
            />
            <FaChevronRight className="relative z-10 text-[16px] md:text-[20px]" />
          </button>

          <div className="grid gap-5 md:grid-cols-2 md:gap-7 lg:grid-cols-4">
            {visibleCards.map((card) => (
              <div
                key={card.title}
                className="group flex h-full min-h-[470px] flex-col overflow-hidden rounded-[22px] bg-white shadow-[0_12px_30px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgba(0,0,0,0.10)]"
              >
                <div className="p-4 pb-0">
                  <div className="overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.title}
                      width={520}
                      height={520}
                      className="h-[350px] w-full object-cover object-top transition duration-500 group-hover:scale-[1.05] md:h-[270px] md:object-center"
                    />
                  </div>
                </div>

                <div className="flex flex-1 flex-col px-4 pb-5 pt-4 md:px-5 md:pb-6 md:pt-5">
                  <h3 className="section-subtitle text-[#231c17]">
                    {card.title}
                  </h3>

                  <p className="para-text mt-3 text-[#7a726c]">
                    {card.desc}
                  </p>

                  <WellnessButton
                    onClick={() => setSelectedService(card)}
                    label="Explore Therapy"
                    className="mt-auto scale-90 origin-left"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center gap-2.5">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={`page-dot-${idx}`}
                type="button"
                onClick={() => setPage(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  idx === currentPage
                    ? "w-8 bg-[#c79f31]"
                    : "w-2.5 bg-[#d8c8a2]"
                }`}
                aria-label={`Go to services page ${idx + 1}`}
              />
            ))}
          </div>
        </RevealOnScroll>
      </div>

      <AnimatePresence>
        {selectedService && (
          <ServiceModal
            service={selectedService}
            onClose={() => setSelectedService(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

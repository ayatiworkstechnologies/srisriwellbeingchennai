"use client";

import Image from "next/image";
import RevealOnScroll from "@/components/Main/RevealOnScroll";
import { 
  FaWheelchair, 
  FaCar, 
  FaClock, 
  FaUserDoctor, 
  FaPersonPraying, 
  FaLeaf, 
  FaMortarPestle, 
  FaHouseMedical, 
  FaUsers, 
  FaStar, 
  FaSpa, 
  FaHeartPulse 
} from "react-icons/fa6";

const facilityPoints = [
  {
    title: "Elder-friendly and wheelchair-accessible spaces",
    icon: FaWheelchair,
  },
  {
    title: "Ample car parking for visitors and patients",
    icon: FaCar,
  },
  {
    title: "24/7 wellness and care support",
    icon: FaClock,
  },
  {
    title: "In-house Ayurveda doctors and consultation support",
    icon: FaUserDoctor,
  },
  {
    title: "Yoga and meditation studio for holistic well being",
    icon: FaPersonPraying,
  },
  {
    title: "Green landscaped surroundings with a calming atmosphere",
    icon: FaLeaf,
  },
  {
    title: "Ayurveda pharmacy and wellness essentials",
    icon: FaMortarPestle,
  },
  {
    title: "Daycare and wellness observation facilities",
    icon: FaHouseMedical,
  },
  {
    title: "Community-focused wellness environment",
    icon: FaUsers,
  },
  {
    title: "Clean, peaceful, and patient-friendly infrastructure",
    icon: FaStar,
  },
  {
    title: "Dedicated relaxation and healing spaces",
    icon: FaSpa,
  },
  {
    title: "Integrated support for long-term wellness programs",
    icon: FaHeartPulse,
  },
];

export default function FacilitiesGrid() {
  return (
    <section className="section-padding bg-[#f5ede1] relative overflow-hidden">
      <div className="absolute left-0 top-0 h-full w-full opacity-5 pointer-events-none">
        <Image src="/images/bg.svg" alt="Pattern" fill className="object-cover" />
      </div>
      
      <div className="container-width relative z-10">
        <RevealOnScroll className="title-center mb-10 max-w-3xl mx-auto">
          <h2 className="section-title text-[#23130d]">Designed for Comfort, Care & Everyday Wellness</h2>
          <div className="mx-auto mt-5 h-1 w-20 bg-[#d4af37]" />
        </RevealOnScroll>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-10 md:mt-12">
          {facilityPoints.map((point, index) => {
            const IconComponent = point.icon;
            return (
              <RevealOnScroll key={index} delay={index * 0.05}>
                <div className="group relative h-full rounded-[24px] border border-[#eadfce] bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(212,175,55,0.15)] hover:border-[#d4af37] flex flex-col items-center text-center overflow-hidden z-10">
                  
                  {/* Decorative expanding circle */}
                  <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[#d4af37]/5 transition-transform duration-700 ease-out group-hover:scale-[3] -z-10" />

                  {/* Animated Icon Container */}
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#fdf8ef] text-[#c29a2f] transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:bg-[#d4af37] group-hover:text-white group-hover:shadow-[0_8px_20px_rgba(212,175,55,0.4)]">
                    <IconComponent className="h-7 w-7 transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  
                  {/* Text */}
                  <p className="text-[15px] font-bold leading-relaxed text-[#4f443c] transition-colors duration-300 group-hover:text-[#23130d]">
                    {point.title}
                  </p>
                  
                  {/* Bottom animated border line */}
                  <div className="absolute bottom-0 left-1/2 h-1 w-0 -translate-x-1/2 bg-[#d4af37] transition-all duration-500 ease-out group-hover:w-1/2 rounded-t-full" />
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}

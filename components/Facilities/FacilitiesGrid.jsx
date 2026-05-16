"use client";

import Image from "next/image";
import RevealOnScroll from "@/components/Main/RevealOnScroll";

const facilityPoints = [
  {
    title: "Elder-Friendly & Wheelchair-Accessible Spaces",
    image: "/images/facilities/fac-1.png",
  },
  {
    title: "Ample Car Parking for Visitors & Patients",
    image: "/images/facilities/fac-2.png",
  },
  {
    title: "24/7 Wellness & Care Support",
    image: "/images/facilities/fac-3.png",
  },
  {
    title: "In-House Ayurveda Doctors & Consultation Support",
    image: "/images/facilities/fac-4.png",
  },
  {
    title: "Yoga & Meditation Studio for Holistic Well Being",
    image: "/images/facilities/fac-5.png",
  },
  {
    title: "Green Landscaped Surroundings with a Calming Atmosphere",
    image: "/images/facilities/fac-6.png",
  },
  {
    title: "Ayurveda Pharmacy & Wellness Essentials",
    image: "/images/facilities/fac-7.png",
  },
  {
    title: "Daycare & Wellness Observation Facilities",
    image: "/images/facilities/fac-8.png",
  },
  {
    title: "Community-Focused Wellness Environment",
    image: "/images/facilities/fac-9.png",
  },
  {
    title: "Clean, Peaceful & Patient-Friendly Infrastructure",
    image: "/images/facilities/fac-10.png",
  },
  {
    title: "Dedicated Relaxation & Healing Spaces",
    image: "/images/facilities/fac-11.png",
  },
  {
    title: "Integrated Support for Long-Term Wellness Programs",
    image: "/images/facilities/fac-12.png",
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
          <p className="eyebrow-text mb-3 text-[#c79f31]">Inside The Centre</p>
          <h2 className="section-title text-[#23130d]">Facilities Built For A Complete Healing Visit</h2>
          <div className="mx-auto mt-5 h-1 w-20 bg-[#d4af37]" />
          <p className="para-text mx-auto mt-5 max-w-2xl text-[#6b6158]">
            From consultation and therapy rooms to rest spaces, pharmacy support,
            and stay-friendly corners, every facility is arranged to make care feel
            calm, accessible, and well coordinated.
          </p>
        </RevealOnScroll>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-10 md:mt-12">
          {facilityPoints.map((point, index) => {
            return (
              <RevealOnScroll key={index} delay={index * 0.05}>
                <div className="group h-full flex flex-col overflow-hidden rounded-[24px] border border-[#eadfce] bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(212,175,55,0.15)] hover:border-[#d4af37]">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={point.image}
                      alt={point.title}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="p-6 flex-1 flex items-center">
                    <p className="text-lg font-bold leading-relaxed text-[#23130d]">
                      {point.title}
                    </p>
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

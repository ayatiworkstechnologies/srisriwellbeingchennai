"use client";

import Image from "next/image";
import RevealOnScroll from "@/components/Main/RevealOnScroll";

const facilityPoints = [
  {
    title: "Accessible Arrival",
    description:
      "Elder-friendly access, wheelchair support, and comfortable movement through key care areas.",
    image: "/images/facilities/facilities-1.png",
  },
  {
    title: "Parking & Entry",
    description:
      "Ample parking and easy arrival flow for guests, patients, families, and wellness visitors.",
    image: "/images/facilities/facilities-2.png",
  },
  {
    title: "Wellness Support",
    description:
      "Structured day support, guided assistance, and responsive coordination through your visit.",
    image: "/images/facilities/facilities-3.png",
  },
  {
    title: "Ayurveda Consultation",
    description:
      "In-house doctors, consultation spaces, and treatment planning support in one place.",
    image: "/images/facilities/facilities-4.png",
  },
  {
    title: "Yoga & Meditation",
    description:
      "Dedicated spaces for guided breathwork, yoga sessions, and calm restorative practices.",
    image: "/images/facilities/facilities-5.png",
  },
  {
    title: "Green Healing Ambience",
    description:
      "Natural surroundings and quiet visual relief that support focus, rest, and emotional ease.",
    image: "/images/facilities/facilities-6.png",
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

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-10 md:mt-12">
          {facilityPoints.map((point, index) => {
            return (
              <RevealOnScroll key={index} delay={index * 0.05}>
                <div className="group overflow-hidden rounded-[24px] border border-[#eadfce] bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(212,175,55,0.15)] hover:border-[#d4af37]">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={point.image}
                      alt={point.title}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-lg font-bold leading-relaxed text-[#23130d]">
                      {point.title}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[#5e5751]">
                      {point.description}
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

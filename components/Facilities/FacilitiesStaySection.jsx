"use client";

import Image from "next/image";
import RevealOnScroll from "@/components/Main/RevealOnScroll";
import WellnessButton from "@/components/layouts/WellnessButton";

const staySections = [
  {
    title: "Stay Rooms",
    description:
      "Private rooms planned for extended wellness stays, post-therapy recovery, and a calm day-to-day healing rhythm.",
    image: "/images/facilities/fac-5.png",
    points: [
      "Comfortable rest and recovery setup",
      "Easy access to therapies and consultations",
      "Quiet, clean, patient-friendly environment",
    ],
  },
  {
    title: "Work From Stay",
    description:
      "A balanced stay format for guests who need to remain productive while continuing their Ayurveda programme.",
    image: "/images/facilities/fac-11.png",
    points: [
      "Peaceful surroundings for focused work",
      "Flexible wellness schedule through the day",
      "Ideal for short retreats and longer resets",
    ],
  },
];

export default function FacilitiesStaySection() {
  return (
    <section className="section-padding bg-[#fcfaf7]">
      <div className="container-width space-y-8 md:space-y-10">
        {staySections.map((section, index) => (
          <RevealOnScroll key={section.title} delay={index * 0.08}>
            <div className="overflow-hidden rounded-[28px] border border-[#eadfce] bg-white shadow-[0_16px_40px_rgba(31,23,20,0.07)] md:grid md:grid-cols-[1fr_1fr]">
              <div className="relative min-h-[280px]">
                <Image
                  src={section.image}
                  alt={section.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 md:p-10">
                <p className="eyebrow-text text-[#c79f31]">Facilities</p>
                <h2 className="section-title mt-3 text-[#1f1a17]">
                  {section.title}
                </h2>
                <p className="para-text mt-4 text-[#6b6158]">
                  {section.description}
                </p>
                <div className="mt-6 space-y-3">
                  {section.points.map((point) => (
                    <div key={point} className="flex items-start gap-3">
                      <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#c79f31]" />
                      <p className="text-sm leading-7 text-[#5e5751]">{point}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <WellnessButton href="/contact" label="Enquire Now" />
                </div>
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import RevealOnScroll from "@/components/Main/RevealOnScroll";

const facilityPoints = [
  {
    title: "Reception & Guest Guidance",
    description:
      "A calm first point of contact where guests are welcomed, guided, and supported through their visit.",
    image: "/images/facilities/fac-1.png",
  },
  {
    title: "Ayurveda Consultation Rooms",
    description:
      "Private consultation spaces for pulse reading, doctor guidance, therapy planning, and follow-up care.",
    image: "/images/facilities/fac-2.png",
  },
  {
    title: "Therapy Suites",
    description:
      "Clean, quiet treatment rooms prepared for Ayurvedic therapies, relaxation rituals, and restorative care.",
    image: "/images/facilities/fac-3.png",
  },
  {
    title: "Panchakarma Care Spaces",
    description:
      "Dedicated areas that support deeper cleansing programmes with privacy, hygiene, and attentive care.",
    image: "/images/facilities/fac-4.png",
  },
  {
    title: "Rest & Recovery Rooms",
    description:
      "Comfortable rooms for post-therapy rest, longer wellness stays, and unhurried recovery time.",
    image: "/images/facilities/fac-5.png",
  },
  {
    title: "Yoga & Breathwork Areas",
    description:
      "Peaceful spaces for gentle movement, breath practices, meditation, and whole-person wellbeing.",
    image: "/images/facilities/fac-6.png",
  },
  {
    title: "Pharmacy & Product Support",
    description:
      "Easy access to recommended Ayurvedic products, supplements, and care essentials after consultation.",
    image: "/images/facilities/fac-7.png",
  },
  {
    title: "Family Waiting Lounges",
    description:
      "Warm waiting areas for family members and guests, designed for comfort during consultations or therapy.",
    image: "/images/facilities/fac-8.png",
  },
  {
    title: "Elder-Friendly Movement",
    description:
      "Thoughtful layouts that make movement easier for elders, patients, and visitors needing extra support.",
    image: "/images/facilities/fac-9.png",
  },
  {
    title: "Parking & Arrival Flow",
    description:
      "A smoother visit experience with convenient arrival support for appointments, stays, and follow-ups.",
    image: "/images/facilities/fac-10.png",
  },
  {
    title: "Work From Stay Corners",
    description:
      "Quiet corners for guests balancing wellness stays with light work, calls, and daily routines.",
    image: "/images/facilities/fac-11.png",
  },
  {
    title: "Healing Ambience",
    description:
      "A soothing environment shaped around cleanliness, calm, natural textures, and restorative energy.",
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

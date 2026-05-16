"use client";

import Image from "next/image";
import RevealOnScroll from "./RevealOnScroll";
import WellnessButton from "../layouts/WellnessButton";

const facilityHighlights = [
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
];

export default function HomeFacilitiesSection() {
  return (
    <section className="section-padding bg-[#fcfaf7]">
      <div className="container-width">
        <RevealOnScroll className="title-center mx-auto mb-10 max-w-3xl md:mb-14">
          <p className="eyebrow-text mb-3 text-[#c79f31]">Facilities</p>
          <h2 className="section-title text-[#1f1a17]">
            Facilities That Support Every Step Of Care
          </h2>
          <div className="mx-auto mt-4 h-[3px] w-[78px] rounded-full bg-[#c79f31]" />
          <p className="para-text mx-auto mt-5 max-w-2xl text-[#6b6158]">
            From consultation rooms and therapy suites to rest spaces and
            pharmacy support, the centre is arranged for calm, accessible, and
            well-coordinated wellness visits.
          </p>
        </RevealOnScroll>

        <div className="grid gap-6 md:grid-cols-3">
          {facilityHighlights.map((item, index) => (
            <RevealOnScroll key={item.title} delay={index * 0.08}>
              <div className="h-full flex flex-col overflow-hidden rounded-[24px] border border-[#eadfce] bg-white shadow-[0_14px_34px_rgba(31,23,20,0.06)]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition duration-500 hover:scale-[1.04]"
                  />
                </div>
                <div className="p-6 flex-1 flex items-center">
                  <h3 className="section-subtitle text-[#1f1a17]">
                    {item.title}
                  </h3>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={0.2} className="mt-10 flex justify-center">
          <WellnessButton href="/facilities" label="Explore Facilities" />
        </RevealOnScroll>
      </div>
    </section>
  );
}

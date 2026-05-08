"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import RevealOnScroll from "@/components/Main/RevealOnScroll";

const sliderFacilities = [
  { image: "/images/facilities/facilities-1.png", title: "Accessibility" },
  { image: "/images/facilities/facilities-2.png", title: "Parking" },
  { image: "/images/facilities/facilities-3.png", title: "24/7 Support" },
  { image: "/images/facilities/facilities-4.png", title: "Ayurveda Care" },
  { image: "/images/facilities/facilities-5.png", title: "Yoga Studio" },
  { image: "/images/facilities/facilities-6.png", title: "Green Spaces" },
  { image: "/images/facilities/facilities-7.png", title: "Pharmacy" },
];

export default function FacilitiesSlider() {
  const [activeId, setActiveId] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveId((prev) => (prev + 1) % sliderFacilities.length);
    }, 3000); // Auto-slides every 3 seconds

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="section-padding bg-[#fcfaf7] relative overflow-hidden">
      <div className="container-width relative z-10">
        <RevealOnScroll className="title-center mb-10 max-w-3xl mx-auto">
          <h2 className="section-title text-[#23130d]">Facility Highlights</h2>
          <div className="mx-auto mt-5 h-1 w-20 bg-[#d4af37]" />
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <div
            className="flex h-[400px] md:h-[400px] lg:h-[400px] w-full gap-2 md:gap-4 mt-8"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            {sliderFacilities.map((facility, index) => {
              const isActive = activeId === index;
              return (
                <div
                  key={index}
                  onMouseEnter={() => setActiveId(index)}
                  onClick={() => setActiveId(index)}
                  className={`relative overflow-hidden rounded-[20px] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer ${
                    isActive ? "flex-[6_6_0%]" : "flex-[1_1_0%]"
                  }`}
                >
                  <Image
                    src={facility.image}
                    alt={facility.title}
                    fill
                    className={`transition-all duration-1000 ease-out ${
                      isActive ? "object-contain bg-[#fcfaf7]" : "object-cover"
                    }`}
                    style={{ transform: isActive ? "scale(1.05)" : "scale(1)" }}
                  />

                  {/* Subtle darkening for inactive slides so the active one pops */}
                  <div
                    className={`absolute inset-0 bg-black transition-opacity duration-700 ${
                      isActive
                        ? "opacity-0"
                        : "opacity-30 group-hover:opacity-10"
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

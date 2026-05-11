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
    }, 4000); // Slower, more elegant 4-second auto-slide

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="section-padding bg-[#fcfaf7] relative overflow-hidden">
      <div className="container-width relative z-10">
        <RevealOnScroll delay={0.2}>
          <div
            className="flex h-[450px] md:h-[550px] w-full gap-3 md:gap-5 mt-8"
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
                  className={`group relative h-full overflow-hidden rounded-[24px] transition-all duration-[1.2s] ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer shadow-lg border border-[#eadfce] ${
                    isActive ? "flex-[8_8_0%]" : "flex-[1_1_0%]"
                  }`}
                >
                  <Image
                    src={facility.image}
                    alt={facility.title}
                    fill
                    className="object-cover transition-transform duration-[1.5s] ease-out"
                    style={{ transform: isActive ? "scale(1.05)" : "scale(1)" }}
                  />

                  {/* Elegant Dark Overlay */}
                  <div
                    className={`absolute inset-0 transition-all duration-[1.2s] ${
                      isActive
                        ? "bg-gradient-to-t from-[#1a0f0a]/90 via-[#1a0f0a]/20 to-transparent"
                        : "bg-[#1a0f0a]/60 group-hover:bg-[#1a0f0a]/40"
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

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import RevealOnScroll from "./RevealOnScroll";

const sanctuarySlides = [
  {
    desktopImage: "/images/gallery-1.jpg",
    mobileImage: "/images/gallery-mob-1.jpg",
    title: "Private Therapy Suites",
    desc: "Ten thoughtfully designed therapy rooms offering space, privacy, and an atmosphere of uninterrupted calm.",
  },
  {
    desktopImage: "/images/gallery-2.jpg",
    mobileImage: "/images/gallery-mob-2.jpg",
    title: "Expert-Led Care",
    desc: "Guided by experienced Ayurveda doctors and trained therapists, ensuring precision, discretion, and personalised attention.",
  },
  {
    desktopImage: "/images/gallery-3.jpg",
    mobileImage: "/images/gallery-mob-3.jpg",
    title: "Serene Ambience",
    desc: "A soothing environment where natural elements, gentle aromas, and quiet design come together to restore inner balance.",
  },
  {
    desktopImage: "/images/gallery-4.jpg",
    mobileImage: "/images/gallery-mob-4.jpg",
    title: "Authentic Rituals",
    desc: "Traditional preparations and classical techniques applied with uncompromising dedication to authentic healing.",
  },
  {
    desktopImage: "/images/gallery-5.jpg",
    mobileImage: "/images/gallery-mob-5.jpg",
    title: "Holistic Rejuvenation",
    desc: "An integrated approach that addresses physical alignment, mental clarity, and energetic harmony simultaneously.",
  },
];

export default function ExperienceSection() {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? sanctuarySlides.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrent((prev) =>
      prev === sanctuarySlides.length - 1 ? 0 : prev + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev === sanctuarySlides.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="specialties" className="relative bg-[#f6f3ee]">
      <div className="relative h-[85vh] min-h-[500px] overflow-hidden md:h-[85vh] md:min-h-[620px]">
        {sanctuarySlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${index === current
                ? "translate-x-0 opacity-100"
                : index < current
                  ? "-translate-x-full opacity-0"
                  : "translate-x-full opacity-0"
              }`}
          >
            {/* Desktop Image */}
            <Image
              src={slide.desktopImage}
              alt={slide.title}
              width={1600}
              height={900}
              className="hidden h-full w-full object-cover md:block"
              priority={index === 0}
            />
            {/* Mobile Image */}
            <Image
              src={slide.mobileImage}
              alt={slide.title}
              width={800}
              height={1000}
              className="block h-full w-full object-cover md:hidden"
              priority={index === 0}
            />
          </div>
        ))}



        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-3 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#d0a93d] bg-white/90 text-[20px] text-[#b28b22] backdrop-blur transition hover:bg-[#d0a93d] hover:text-white md:left-5 md:h-11 md:w-11 md:text-[26px]"
        >
          ‹
        </button>

        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-3 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#d0a93d] bg-white/90 text-[20px] text-[#b28b22] backdrop-blur transition hover:bg-[#d0a93d] hover:text-white md:right-5 md:h-11 md:w-11 md:text-[26px]"
        >
          ›
        </button>

        <div className="absolute bottom-5 left-0 right-0 z-20 md:bottom-9">
          <RevealOnScroll className="mx-auto w-[min(1200px,calc(100%-24px))] md:w-[min(1200px,calc(100%-40px))]">
            <div className="max-w-[520px]">
              <div
                key={current}
                className="animate-[fadeUp_.7s_ease]"
              >
                <p className="mb-2 text-2xl md:text-3xl font-bold uppercase tracking-[0.2em] text-[#e7d58f] drop-shadow-md">
                  The Experience of Care
                </p>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  {sanctuarySlides[current].title}
                </h2>

                <div className="mt-3 h-[3px] w-[72px] rounded-full bg-gradient-to-r from-[#e7d58f] to-[#c79f31]" />

                <p className="mt-3 max-w-[430px] text-base md:text-lg leading-7 text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  {sanctuarySlides[current].desc}
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>

        <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-2 md:bottom-5">
          {sanctuarySlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${current === index
                  ? "w-8 bg-[#d0a93d]"
                  : "w-2.5 bg-white/70"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const sanctuarySlides = [
  {
    image: "/images/Image-01.png",
    title: "A Glimpse Into Your Sanctuary",
    desc: "Experience the calming environment, thoughtfully designed spaces, and immersive healing atmosphere of our wellness sanctuary.",
  },
  {
    image: "/images/Image-01.png",
    title: "Spaces That Invite Stillness",
    desc: "Every corner is thoughtfully curated to create a serene and grounding atmosphere for healing and inner balance.",
  },
  {
     image: "/images/Image-01.png",
    title: "A Setting for Deeper Renewal",
    desc: "Soft light, mindful interiors, and peaceful surroundings come together to support your restorative journey.",
  },
];

export default function SanctuarySection() {
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
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-[#f6f3ee]">
      <div className="relative min-h-[420px] overflow-hidden md:min-h-[620px]">
        {sanctuarySlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === current
                ? "translate-x-0 opacity-100"
                : index < current
                ? "-translate-x-full opacity-0"
                : "translate-x-full opacity-0"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              width={1600}
              height={900}
              className="h-[420px] w-full object-cover md:h-[620px]"
              priority={index === 0}
            />
          </div>
        ))}

        <div className="absolute inset-0 bg-gradient-to-t from-[#120c08]/30 via-[#120c08]/10 to-transparent" />

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
          <div className="mx-auto w-[min(1200px,calc(100%-24px))] md:w-[min(1200px,calc(100%-40px))]">
            <div className="max-w-[520px]">
              <div
                key={current}
                className="animate-[fadeUp_.7s_ease]"
              >
                <h2 className="text-[26px] leading-tight font-bold text-[#111111] md:text-[46px]">
                  {sanctuarySlides[current].title}
                </h2>

                <div className="mt-3 h-[3px] w-[72px] rounded-full bg-gradient-to-r from-[#e7d58f] to-[#c79f31]" />

                <p className="mt-3 max-w-[430px] text-[13px] leading-7 text-[#2f2a26] md:text-[14px]">
                  {sanctuarySlides[current].desc}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-2 md:bottom-5">
          {sanctuarySlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                current === index
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
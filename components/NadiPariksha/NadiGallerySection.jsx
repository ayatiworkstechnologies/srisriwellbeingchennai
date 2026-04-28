"use client";

import Image from "next/image";
import RevealOnScroll from "../Main/RevealOnScroll";

const galleryImages = [
  {
    src: "/images/ser-1.jpg",
    alt: "Nadi Pariksha Pulse Diagnosis",
  },
  {
    src: "/images/ser-2.jpg",
    alt: "Panchakarma Treatment",
  },
  {
    src: "/images/ser-3.jpg",
    alt: "Marma Therapy Session",
  },
  {
    src: "/images/ser-4.jpg",
    alt: "Ayurvedic Healing",
  },
];

export default function NadiGallerySection() {
  return (
    <section className="relative bg-[#f5f2ec] pb-16 pt-4 md:pb-24 md:pt-8">
      <div className="mx-auto w-[min(1200px,calc(100%-24px))] md:w-[min(1200px,calc(100%-40px))]">
        {/* Heading */}
        <RevealOnScroll className="text-center mb-10 md:mb-14">
          <h2 className="text-2xl md:text-4xl lg:text-[42px] font-bold leading-tight text-[#1f1a17]">
            Know More About Nadi Pariksha
          </h2>
          <div className="mx-auto mt-4 h-[3px] w-[82px] rounded-full bg-gradient-to-r from-[#e7d58f] to-[#c79f31]" />
        </RevealOnScroll>

        {/* Gallery Grid */}
        <RevealOnScroll delay={0.2}>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-[18px] bg-white p-2 shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_18px_50px_rgba(0,0,0,0.12)] md:rounded-[22px] md:p-2.5"
              >
                <div className="relative overflow-hidden rounded-[14px] md:rounded-[18px]">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={400}
                    height={480}
                    className="h-[200px] w-full object-cover object-center transition-transform duration-600 group-hover:scale-[1.06] md:h-[280px]"
                  />

                  {/* Hover overlay with play icon hint */}
                  <div className="absolute inset-0 flex items-center justify-center bg-[#3b2218]/0 transition-all duration-400 group-hover:bg-[#3b2218]/20">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 opacity-0 shadow-lg transition-all duration-400 group-hover:opacity-100 group-hover:scale-100 scale-75 md:h-14 md:w-14">
                      <svg
                        className="h-5 w-5 text-[#3b2218] ml-0.5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

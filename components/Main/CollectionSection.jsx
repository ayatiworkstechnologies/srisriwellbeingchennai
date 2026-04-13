"use client";

import Image from "next/image";
import { FaArrowRight } from "react-icons/fa6";
import RevealOnScroll from "./RevealOnScroll";

const products = [
  {
    title: "Amruth",
    desc: "A time-honoured formulation designed to support immunity and restore natural vitality. Crafted to gently strengthen the body's internal resilience.",
    image: "/images/1.jpg",
  },
  {
    title: "Liv-On",
    desc: "A carefully balanced blend formulated to support metabolic function and internal detox. Designed to promote lightness, clarity, and digestive ease.",
    image: "/images/2.jpg",
  },
  {
    title: "Ashwagandha",
    desc: "A revered adaptogenic formulation known to restore energy and calm the nervous system. Ideal for enhancing strength, focus, and overall well-being.",
    image: "/images/3.jpg",
  },
];

export default function CollectionSection() {
  return (
    <section
      id="products"
      className="relative overflow-hidden bg-[#f5f5f5] py-14 md:py-20"
    >
      {/* Background Image */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/images/sec-4bg.svg"
          alt="Background Pattern"
          fill
          className="object-cover opacity-60"
          priority={false}
        />
      </div>

      <div className="relative z-10 mx-auto w-[min(1200px,calc(100%-24px))] md:w-[min(1200px,calc(100%-40px))]">
        <RevealOnScroll className="mb-10 text-center md:mb-14">
          <p className="mb-3 text-2xl md:text-3xl font-bold uppercase tracking-[0.2em] text-[#c29a2f]">
            The Healing Collection
          </p>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight text-[#111]">
            Curated Wellness Formulations
          </h2>

          <div className="mx-auto mt-3 h-[3px] w-[78px] rounded-full bg-[#d8b03f]" />

          <p className="mx-auto mt-6 max-w-[620px] text-base md:text-lg leading-6 text-[#555]">
            A refined selection of Ayurvedic formulations crafted to complement your wellness
            journey, designed for daily balance, vitality, and sustained inner harmony.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2} className="grid gap-6 md:grid-cols-3 md:gap-10">
          {products.map((card) => (
            <div
              key={card.title}
              className="group flex h-full flex-col overflow-hidden rounded-[18px] bg-[#fdfdfd] shadow-[0_14px_35px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex h-full flex-col p-3 md:p-4">
                <div className="overflow-hidden p-5">
                  <Image
                    src={card.image}
                    alt={card.title}
                    width={400}
                    height={400}
                    className="h-[165px] w-full rounded-[10px] object-cover transition duration-500 group-hover:scale-[1.05] md:h-[235px]"
                  />
                </div>

                <div className="flex flex-1 flex-col px-1 pb-2 pt-4">
                  <h3 className="text-xl md:text-2xl font-bold text-[#111] md:leading-none">
                    {card.title}
                  </h3>

                  <p className="mt-3 mb-3 text-base md:text-lg leading-5 text-[#6b6b6b]">
                    {card.desc}
                  </p>

                  <button
                    className="mt-auto mx-auto inline-flex w-fit items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-8 py-4 text-[15px] font-bold tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#b8952b] hover:shadow-lg"
                  >
                    View Product
                    <FaArrowRight className="text-[14px]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </RevealOnScroll>
      </div>
    </section>
  );
}
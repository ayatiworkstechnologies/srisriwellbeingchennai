"use client";

import Image from "next/image";
import RevealOnScroll from "../Main/RevealOnScroll";
import { FaEye } from "react-icons/fa6";

export default function NetraTejasExercises({ data }) {
  if (!data) return null;

  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="container-width">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left: Content */}
          <RevealOnScroll className="flex-1 order-2 lg:order-1">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="section-title text-[#1f1a17] !text-3xl lg:!text-4xl">
                {data.title}
              </h2>
            </div>
            <div className="h-[2px] w-[60px] bg-[#d0a93d] mb-8" />
            <p className="para-text text-[#5e5751] leading-relaxed">
              {data.description}
            </p>

            <div className="mt-8 p-6 rounded-2xl bg-[#f5f2ec]/50 border border-[#d9d0c3]/30">
              <p className="small-text font-semibold text-[#1f1a17]">
                Supervised Support
              </p>
              <p className="small-text mt-2 text-[#6d5f57]">
                Our trained therapists ensure each exercise is performed
                correctly to maximize benefits for your ocular health.
              </p>
            </div>
          </RevealOnScroll>

          {/* Right: Image */}
          <RevealOnScroll
            delay={0.2}
            className="flex-1 order-1 lg:order-2 w-full"
          >
            <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-8 border-white">
              <Image
                src={data.image}
                alt={data.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Subtle Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#3b2218]/10 to-transparent" />
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

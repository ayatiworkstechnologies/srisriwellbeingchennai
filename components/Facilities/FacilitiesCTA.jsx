"use client";

import Image from "next/image";
import WellnessButton from "@/components/layouts/WellnessButton";
import LeafGlyph from "@/components/ui/LeafGlyph";
import RevealOnScroll from "@/components/Main/RevealOnScroll";

export default function FacilitiesCTA() {
  return (
    <section className="section-padding">
      <div className="container-width">
        <div className="relative overflow-hidden rounded-[40px] bg-[#2f170d] px-8 py-16 text-center text-white shadow-2xl md:px-20 md:py-24">
          <div className="absolute inset-0 opacity-10">
            <Image src="/images/golden.jpg" alt="Golden Overlay" fill className="object-cover" />
          </div>
          
          <div className="relative z-10">
            <RevealOnScroll>
              <LeafGlyph className="mx-auto h-12 w-12 text-[#e5cc82]" />
              <h2 className="section-title mt-8 mx-auto max-w-2xl text-[#e5cc82]">
                Begin Your Journey Towards Better Health & Balanced Living
              </h2>
              <p className="para-text mt-6 mx-auto max-w-2xl text-white/90">
                Experience wellness in a space where healing, comfort, and holistic care come together seamlessly.
              </p>
              <div className="mt-12 flex flex-wrap justify-center gap-6">
                <WellnessButton href="/contact" label="Book A Consultation" />
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}

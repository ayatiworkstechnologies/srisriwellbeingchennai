"use client";

import RevealOnScroll from "@/components/Main/RevealOnScroll";

export default function FacilitiesIntro() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.08),transparent_70%)]" />
      
      <div className="container-width relative z-10">
        <RevealOnScroll className="title-center max-w-4xl mx-auto">
          <p className="eyebrow-text text-[#b88f28] mb-4">
            Healing Spaces Designed for Complete Well Being
          </p>
          <h1 className="section-title text-[#23130d] !leading-[1.15] md:!text-5xl">
            Wellness Facilities That Support Your Healing Journey
          </h1>
          <p className="mt-5 text-[18px] md:text-[20px] font-medium text-[#c29a2f]">
            Comfort, care, and holistic wellness thoughtfully integrated into every experience.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2} className="mt-12 md:mt-16 mx-auto max-w-3xl space-y-6 text-center">
          <p className="para-text text-[#5d5148]">
            At Sri Sri Well Being, every facility is designed to create a calm, supportive, and healing-focused environment.
          </p>
          <p className="para-text text-[#5d5148]">
            From elderly-friendly infrastructure and ample parking to yoga spaces and wellness support services, every aspect of the center is built around comfort, accessibility, and holistic care.
          </p>
          <p className="para-text text-[#5d5148]">
            Our integrated wellness ecosystem combines Ayurveda, yoga, relaxation spaces, consultation support, pharmacy access, and in-house care facilities to help individuals experience wellness in a peaceful and nurturing setting.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}

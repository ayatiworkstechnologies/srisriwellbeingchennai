import Image from "next/image";
import RevealOnScroll from "../Main/RevealOnScroll";

export default function NetraTejasTherapies({ therapies }) {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0">
        <img
          src="/images/sec-1.svg"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container-width relative z-10">
        {/* Section Heading */}
        <RevealOnScroll className="title-center mb-12 md:mb-16">
          <p className="eyebrow-text text-[#d0a93d]">Our Treatments</p>
          <h2 className="section-title mt-4 text-white tracking-wide">
            Natural Ocular Therapies
          </h2>
          <div className="mx-auto mt-4 h-[3px] w-[82px] rounded-full bg-gradient-to-r from-[#e7d58f] to-[#c79f31]" />
          <p className="para-text mx-auto mt-6 max-w-[640px] text-white/70">
            Our treatment focus is on holistic eye support through natural
            ocular therapies, backed by guided care and Ayurvedic consultation.
          </p>
        </RevealOnScroll>

        {/* Therapies Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-8">
          {therapies.map((therapy, index) => (
            <RevealOnScroll key={therapy.name} delay={index * 0.08}>
              <article className="group overflow-hidden rounded-[20px] bg-white shadow-[0_12px_32px_rgba(0,0,0,0.20)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(0,0,0,0.28)]">
                {/* Image */}
                <div className="relative h-[200px] overflow-hidden md:h-[220px]">
                  <Image
                    src={therapy.image}
                    alt={therapy.name}
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                {/* Content */}
                <div className="p-6">
                  <h3 className="section-subtitle text-[#1d140f]">
                    {therapy.name}
                  </h3>
                  <div className="mt-2 h-[2px] w-[32px] bg-[#d0a93d]" />
                  <p className="small-text mt-3 text-[#6b625d] leading-relaxed">
                    {therapy.description}
                  </p>
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

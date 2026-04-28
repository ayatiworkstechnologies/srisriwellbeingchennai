"use client";

import Image from "next/image";
import RevealOnScroll from "../Main/RevealOnScroll";

const experts = [
  {
    name: "Dr. Ananya Iyer",
    role: "Senior Nadi Vaidya",
    experience: "15+ years in Ayurvedic pulse diagnosis",
    image: "/images/ser-1.jpg",
  },
  {
    name: "Dr. Rajesh Menon",
    role: "Chief Ayurveda Physician",
    experience: "20+ years in Panchakarma & Nadi",
    image: "/images/ser-2.jpg",
  },
  {
    name: "Dr. Kavitha Sharma",
    role: "Nadi Pariksha Specialist",
    experience: "12+ years in holistic diagnostics",
    image: "/images/ser-3.jpg",
  },
];

export default function NadiExpertsSection() {
  return (
    <section className="relative overflow-hidden bg-[#3b2218] py-16 md:py-24">
      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #d0a93d 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 mx-auto w-[min(1200px,calc(100%-24px))] md:w-[min(1200px,calc(100%-40px))]">
        {/* Heading */}
        <RevealOnScroll className="text-center mb-12 md:mb-16">
          <p className="text-sm md:text-base font-semibold uppercase tracking-[0.2em] text-[#d0a93d]">
            Our Practitioners
          </p>
          <h2 className="mt-3 text-2xl md:text-4xl lg:text-[42px] font-bold leading-tight text-white">
            Expert Nadi Vaidyas
          </h2>
          <div className="mx-auto mt-4 h-[3px] w-[82px] rounded-full bg-gradient-to-r from-[#e7d58f] to-[#c79f31]" />
          <p className="mx-auto mt-5 max-w-[620px] text-base md:text-lg leading-7 text-white/60">
            Our experienced Ayurveda physicians bring decades of expertise in
            Nadi Pariksha and traditional pulse diagnosis.
          </p>
        </RevealOnScroll>

        {/* Experts Grid */}
        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {experts.map((expert, idx) => (
            <RevealOnScroll key={expert.name} delay={idx * 0.15}>
              <div className="group relative overflow-hidden rounded-[22px] bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] transition-all duration-500 hover:-translate-y-2 hover:bg-white/[0.10] hover:border-white/[0.15]">
                {/* Image */}
                <div className="overflow-hidden">
                  <Image
                    src={expert.image}
                    alt={expert.name}
                    width={420}
                    height={480}
                    className="h-[280px] w-full object-cover object-top transition-transform duration-600 group-hover:scale-[1.04] md:h-[320px]"
                  />
                </div>

                {/* Info */}
                <div className="p-5 md:p-6">
                  <h3 className="text-lg md:text-xl font-bold text-white">
                    {expert.name}
                  </h3>
                  <p className="mt-1 text-sm md:text-base font-medium text-[#d0a93d]">
                    {expert.role}
                  </p>
                  <p className="mt-2 text-sm md:text-base leading-relaxed text-white/50">
                    {expert.experience}
                  </p>

                  {/* Bottom accent */}
                  <div className="mt-4 h-[2px] w-0 rounded-full bg-gradient-to-r from-[#d0a93d] to-[#e7d58f] transition-all duration-500 group-hover:w-full" />
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

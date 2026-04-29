import Image from "next/image";
import Link from "next/link";
import RevealOnScroll from "../Main/RevealOnScroll";

export default function NetraTejasLocations({ featuredDoctor }) {
  return (
    <section className="section-padding bg-[#f5f2ec]">
      <div className="container-width">
        {/* Heading */}
        <RevealOnScroll className="title-center mb-12 md:mb-16">
          <p className="eyebrow-text text-[#d0a93d]">Our Specialist</p>
          <h2 className="section-title mt-4 text-[#1f1a17] tracking-wide">
            Meet Your Eye Care Expert
          </h2>
          <div className="mx-auto mt-4 h-[3px] w-[82px] rounded-full bg-gradient-to-r from-[#e7d58f] to-[#c79f31]" />
        </RevealOnScroll>

        {/* Doctor Card */}
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[24px] bg-white shadow-[0_14px_44px_rgba(31,23,20,0.12)] md:flex">
          {/* Doctor Image */}
          <RevealOnScroll className="relative min-h-[300px] md:w-[40%] md:min-h-[auto] flex-shrink-0">
            <Image
              src={featuredDoctor.image}
              alt={featuredDoctor.name}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
            {/* Gold overlay at bottom on mobile */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#3b2218]/60 to-transparent md:hidden" />
          </RevealOnScroll>

          {/* Content */}
          <RevealOnScroll delay={0.15} className="flex flex-col justify-center p-8 md:p-12 lg:p-14">
            <p className="eyebrow-text text-[#d0a93d]">Featured Doctor</p>
            <h3 className="section-subtitle mt-3 text-[#1b1714]">
              {featuredDoctor.name}
            </h3>
            <p className="small-text mt-1 font-semibold text-[#3b2218]">
              {featuredDoctor.title}
            </p>
            <p className="mt-1 text-sm text-[#8c7c74] md:text-base">
              {featuredDoctor.subtitle}
            </p>

            <div className="my-6 h-px w-full bg-[#ece3d8]" />

            <p className="para-text text-[#5f5550] leading-relaxed">
              {featuredDoctor.description}
            </p>
            <p className="small-text mt-5 text-[#5f5550]">
              {featuredDoctor.languages}
            </p>

            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex h-12 md:h-14 items-center justify-center gap-2.5 rounded-full bg-[#d0a93d] px-8 md:px-10 text-base font-semibold tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#b8952b] hover:shadow-[0_12px_36px_rgba(208,169,61,0.35)]"
              >
                Book a Consultation
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

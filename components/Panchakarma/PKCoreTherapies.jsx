import Image from "next/image";
import RevealOnScroll from "../Main/RevealOnScroll";
import WellnessButton from "../layouts/WellnessButton";
import LeafGlyph from "../ui/LeafGlyph";

export default function PKCoreTherapies({ coreTherapies }) {
  return (
    <section className="section-padding bg-[#f5f2ec]">
      <div className="container-width">
        {/* Heading */}
        <RevealOnScroll className="title-center mb-14 md:mb-18">
          <p className="eyebrow-text text-[#d0a93d]">The Five Pillars</p>
          <h2 className="section-title mt-4 text-[#1f1a17] tracking-wide">
            Core Panchakarma Therapies
          </h2>
          <div className="mx-auto mt-4 h-[3px] w-[82px] rounded-full bg-gradient-to-r from-[#e7d58f] to-[#c79f31]" />
          <p className="para-text mx-auto mt-5 max-w-[680px] text-[#6b5f58]">
            Each of the five classical Panchakarma procedures targets specific
            doshas and organ systems for a complete and systematic detoxification.
          </p>
        </RevealOnScroll>

        {/* Therapies — alternating layout */}
        <div className="flex flex-col gap-10 md:gap-14">
          {coreTherapies.map((therapy, index) => {
            const isEven = index % 2 === 0;
            return (
              <RevealOnScroll key={therapy.id} delay={0.05}>
                <div
                  className={`overflow-hidden rounded-[24px] bg-white shadow-[0_12px_40px_rgba(31,23,20,0.08)] md:flex ${
                    isEven ? "" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Image */}
                  <div className="relative min-h-[260px] md:w-[42%] md:min-h-[340px] flex-shrink-0">
                    <Image
                      src={therapy.image}
                      alt={therapy.name}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, 42vw"
                    />

                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-center p-7 md:p-10 lg:p-12">
                    {/* Duration badge */}
                    {therapy.duration && (
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f6f3ee] px-4 py-1.5 text-sm font-medium text-[#c29a2f]">
                          <span className="text-[11px] uppercase tracking-wider text-[#857b72] font-semibold">Duration:</span> {therapy.duration}
                        </span>
                      </div>
                    )}

                    <h3 className="section-title mt-4 text-[#1b1714]">
                      {therapy.name}
                    </h3>
                    <div className="mt-3 h-[2px] w-[40px] bg-[#d0a93d]" />

                    <p className="para-text mt-5 text-[#5f5550] leading-relaxed">
                      {therapy.shortDesc}
                    </p>

                    {/* Benefits */}
                    <div className="mt-6">
                      <h4 className="text-sm font-semibold text-[#1b1714] mb-3">Key Benefits</h4>
                      <ul className="space-y-3">
                        {therapy.benefits.map((b) => (
                          <li key={b} className="flex items-start gap-3">
                          <LeafGlyph
                            className="mt-0.5 h-6 w-6 flex-shrink-0"
                          />
                          <span className="small-text text-[#5f5550]">{b}</span>
                        </li>
                      ))}
                      </ul>
                    </div>

                    {/* Enquiry Button */}
                    <div className="mt-8 pt-6 border-t border-[#f2eee9]">
                      <div className="w-full sm:w-fit">
                        <WellnessButton href="/contact" label="Enquire Now" />
                      </div>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>

        {/* CTA after core therapies */}
        <RevealOnScroll delay={0.1}>
          <div className="mt-14 md:mt-18 text-center">
            <WellnessButton
              href="/contact"
              label="Enquire About Panchakarma"
            />
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

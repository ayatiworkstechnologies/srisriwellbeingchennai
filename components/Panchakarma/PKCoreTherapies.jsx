import { Droplets, Leaf, Recycle, ShieldPlus, Wind } from "lucide-react";
import RevealOnScroll from "../Main/RevealOnScroll";
import WellnessButton from "../layouts/WellnessButton";
import LeafGlyph from "../ui/LeafGlyph";

const therapyIcons = {
  vamana: Wind,
  virechana: Leaf,
  vasti: Recycle,
  nasya: Droplets,
  raktamokshana: ShieldPlus,
};

export default function PKCoreTherapies({ coreTherapies }) {
  return (
    <section className="section-padding bg-[#f5f2ec]">
      <div className="container-width">
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

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {coreTherapies.map((therapy, index) => {
            const Icon = therapyIcons[therapy.id] || Leaf;

            return (
              <RevealOnScroll key={therapy.id} delay={index * 0.05}>
                <article className="flex h-full flex-col rounded-[24px] border border-[#eadfce] bg-white p-6 shadow-[0_12px_34px_rgba(31,23,20,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(31,23,20,0.10)] md:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#f7efd9] text-[#b88621]">
                      <Icon className="h-7 w-7" strokeWidth={1.8} />
                    </div>

                    {therapy.duration ? (
                      <span className="rounded-full border border-[#eadfce] bg-[#fbf8f1] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#8a7b6e]">
                        {therapy.duration}
                      </span>
                    ) : null}
                  </div>

                  <h3 className="mt-6 text-2xl font-bold tracking-tight text-[#1b1714]">
                    {therapy.name}
                  </h3>
                  <div className="mt-3 h-[2px] w-[40px] bg-[#d0a93d]" />

                  <p className="mt-5 line-clamp-5 text-[15px] leading-relaxed text-[#5f5550]">
                    {therapy.shortDesc}
                  </p>

                  <div className="mt-6">
                    <h4 className="mb-3 text-sm font-semibold text-[#1b1714]">
                      Key Benefits
                    </h4>
                    <ul className="space-y-3">
                      {therapy.benefits.slice(0, 4).map((benefit) => (
                        <li key={benefit} className="flex items-start gap-3">
                          <LeafGlyph className="mt-0.5 h-6 w-6 flex-shrink-0" />
                          <span className="small-text text-[#5f5550]">
                            {benefit}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto pt-7">
                    <div className="border-t border-[#f2eee9] pt-6">
                      <WellnessButton href="/contact" label="Enquire Now" />
                    </div>
                  </div>
                </article>
              </RevealOnScroll>
            );
          })}
        </div>

        <RevealOnScroll delay={0.1}>
          <div className="mt-14 text-center md:mt-18">
            <WellnessButton href="/contact" label="Enquire About Panchakarma" />
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

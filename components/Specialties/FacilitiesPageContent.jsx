import Link from "next/link";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa6";

import WellnessButton from "@/components/layouts/WellnessButton";
import LeafGlyph from "@/components/ui/LeafGlyph";

const facilityPoints = [
  "Elder-friendly and wheelchair-accessible spaces",
  "Ample car parking for visitors and patients",
  "24/7 wellness and care support",
  "In-house Ayurveda doctors and consultation support",
  "Yoga and meditation studio for holistic well being",
  "Green landscaped surroundings with a calming atmosphere",
  "Ayurveda pharmacy and wellness essentials",
  "Daycare and wellness observation facilities",
  "Community-focused wellness environment",
  "Clean, peaceful, and patient-friendly infrastructure",
  "Dedicated relaxation and healing spaces",
  "Integrated support for long-term wellness programs",
];

const ecosystemHighlights = [
  {
    title: "Care-Centered Access",
    description:
      "Welcoming infrastructure designed for comfort, mobility, and ease for every visitor.",
  },
  {
    title: "Ayurveda-Led Guidance",
    description:
      "In-house doctors, consultation support, and pharmacy access come together under one roof.",
  },
  {
    title: "Spaces For Restoration",
    description:
      "Yoga, meditation, observation, and relaxation areas support a deeper healing rhythm.",
  },
];

const supportCards = [
  {
    title: "Accessibility First",
    description:
      "From wheelchair-friendly movement to elder-focused comfort, the centre is built to reduce friction and support confident movement.",
  },
  {
    title: "Integrated Daily Support",
    description:
      "Consultation guidance, pharmacy essentials, and ongoing care support help make wellness practical and continuous.",
  },
  {
    title: "Serene Healing Atmosphere",
    description:
      "Calming interiors, landscaped greens, and quiet restoration zones create an environment that supports healing beyond treatment hours.",
  },
  {
    title: "Community & Continuity",
    description:
      "Daycare observation, long-term wellness support, and a community-oriented environment encourage sustained wellbeing.",
  },
];

const assuranceItems = [
  {
    label: "Comfort",
    value: "Elder-friendly access and visitor ease",
  },
  {
    label: "Care",
    value: "Round-the-clock wellness support",
  },
  {
    label: "Holistic Living",
    value: "Yoga, Ayurveda, and restorative spaces",
  },
];

export default function FacilitiesPageContent() {
  return (
    <main id="specialties" className="bg-[#f7f2eb] text-[#1c1714]">
      <section className="relative overflow-hidden bg-[#2f170d] pt-28 text-white md:pt-36">
        <div className="absolute inset-0">
          <Image
            src="/images/golden.jpg"
            alt="Sri Sri Well Being healing spaces"
            fill
            priority
            className="object-cover opacity-20"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(47,23,13,0.96),rgba(47,23,13,0.78))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(212,175,55,0.1),transparent_30%)]" />

        <div className="container-width relative z-10 pb-16 md:pb-20 lg:pb-24">
          <div className="max-w-3xl">
            <p className="eyebrow-text text-[#e0bd5e]">
              Healing Spaces Designed for Complete Well Being
            </p>
            <h1 className="mt-5 text-[36px] font-bold leading-[1.05] text-white md:text-[54px] lg:text-[68px]">
              Wellness Facilities That Support Your Healing Journey
            </h1>
            <p className="mt-5 max-w-2xl text-[15px] leading-8 text-white/78 md:text-[17px]">
              Comfort, care, and holistic wellness thoughtfully integrated into
              every experience.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <WellnessButton href="/contact" label="Plan Your Visit" />
              <Link
                href="#facility-highlights"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-[15px] font-semibold text-white transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
              >
                Explore Facilities
                <FaArrowRight className="text-[12px]" />
              </Link>
            </div>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {assuranceItems.map(({ label, value }) => (
              <div
                key={label}
                className="rounded-[28px] border border-white/10 bg-white/8 p-6 backdrop-blur-sm"
              >
                <LeafGlyph className="h-8 w-8" />
                <p className="mt-5 text-sm font-semibold uppercase tracking-[0.22em] text-[#e5cc82]">
                  {label}
                </p>
                <p className="mt-2 text-[15px] leading-7 text-white/80">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.12),transparent_68%)]" />
        <div className="container-width relative z-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <p className="eyebrow-text text-[#b88f28]">
              Designed for Comfort, Care & Everyday Wellness
            </p>
            <h2 className="mt-4 max-w-2xl text-[30px] font-bold leading-tight text-[#23130d] md:text-[42px]">
              A peaceful environment shaped around accessibility, healing, and
              long-term wellbeing.
            </h2>
            <div className="mt-6 space-y-5 text-[16px] leading-8 text-[#5d5148]">
              <p>
                At Sri Sri Well Being, every facility is designed to create a
                calm, supportive, and healing-focused environment.
              </p>
              <p>
                From elderly-friendly infrastructure and ample parking to yoga
                spaces and wellness support services, every aspect of the
                center is built around comfort, accessibility, and holistic
                care.
              </p>
              <p>
                Our integrated wellness ecosystem combines Ayurveda, yoga,
                relaxation spaces, consultation support, pharmacy access, and
                in-house care facilities to help individuals experience
                wellness in a peaceful and nurturing setting.
              </p>
            </div>
          </div>

          <div className="rounded-[32px] border border-[#eadfce] bg-white p-7 shadow-[0_18px_40px_rgba(40,21,11,0.06)] md:p-9">
            <p className="eyebrow-text text-[#b88f28]">Integrated Wellness Ecosystem</p>
            <div className="mt-6 space-y-4">
              {ecosystemHighlights.map(({ title, description }) => (
                <div
                  key={title}
                  className="rounded-[24px] border border-[#efe3d2] bg-[#fcf8f2] p-5"
                >
                  <LeafGlyph className="h-7 w-7" />
                  <h3 className="mt-4 text-[20px] font-bold text-[#1f120d]">
                    {title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-7 text-[#685d55]">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="facility-highlights"
        className="section-padding bg-[linear-gradient(180deg,#fffaf3_0%,#f5ede1_100%)]"
      >
        <div className="container-width">
          <div className="title-center">
            <p className="eyebrow-text text-[#b88f28]">Facility Highlights</p>
            <h2 className="mt-4 text-[30px] font-bold leading-tight text-[#24150f] md:text-[42px]">
              Everyday details that make healing feel more supported.
            </h2>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {facilityPoints.map((point) => (
              <div
                key={point}
                className="rounded-[26px] border border-[#eadfce] bg-white p-5 shadow-[0_10px_22px_rgba(40,21,11,0.04)]"
              >
                <div className="flex items-start gap-4">
                  <LeafGlyph className="mt-1 h-5 w-5 shrink-0" />
                  <p className="text-[15px] leading-7 text-[#4f443c]">{point}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-width grid gap-6 lg:grid-cols-2">
          {supportCards.map(({ title, description }) => (
            <div
              key={title}
              className="rounded-[30px] border border-[#e6d9c9] bg-white p-7 shadow-[0_16px_34px_rgba(40,21,11,0.05)] md:p-8"
            >
              <LeafGlyph className="h-8 w-8" />
              <h3 className="mt-5 text-[24px] font-bold leading-tight text-[#21130d]">
                {title}
              </h3>
              <p className="mt-3 text-[15px] leading-8 text-[#665a52]">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="pb-16 md:pb-20">
        <div className="container-width">
          <div className="overflow-hidden rounded-[36px] bg-[#34190d] px-7 py-10 text-white shadow-[0_24px_55px_rgba(44,23,12,0.22)] md:px-10 md:py-14 lg:px-14">
            <p className="eyebrow-text text-[#dfbb5b]">
              Begin Your Journey Towards Better Health & Balanced Living
            </p>
            <h2 className="mt-4 max-w-3xl text-[30px] font-bold leading-tight md:text-[42px]">
              Experience wellness in a space where healing, comfort, and
              holistic care come together seamlessly.
            </h2>
            <div className="mt-8 flex flex-wrap gap-4">
              <WellnessButton href="/contact" label="Book A Consultation" />
              <Link
                href="/about-us"
                className="inline-flex items-center gap-2 rounded-full border border-white/18 px-7 py-3.5 text-[15px] font-semibold text-white transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
              >
                Learn More About Us
                <FaArrowRight className="text-[12px]" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

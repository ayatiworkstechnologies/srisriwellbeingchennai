"use client";

import Image from "next/image";
import RevealOnScroll from "../Main/RevealOnScroll";

export default function AboutContent() {
  return (
    <section className="section-padding relative bg-[#f9f6f0]">
      <div className="container-width relative z-10">
        <RevealOnScroll className="mx-auto max-w-4xl text-center">
          <div className="mx-auto mb-8 flex h-28 w-28 items-center justify-center md:h-40 md:w-40">
            <Image
              src="/logo.svg"
              alt="Sri Sri Wellbeing"
              width={160}
              height={160}
              className="h-full w-full object-contain"
            />
          </div>

          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-[#9c7a45]">
            About Us
          </p>

          <h2 className="section-title mb-8 text-[#3b2218]">
            Rediscover the Art of Wellbeing
          </h2>

          <div className="space-y-6 text-[#5c4a41]">
            <p className="para-text">
              In a world that rarely pauses, true wellbeing has become the
              ultimate luxury. At Sri Sri Wellbeing Chennai, we invite you into
              a refined sanctuary where ancient Ayurvedic wisdom meets
              contemporary living, crafted for those who seek balance, clarity,
              and restoration amidst the rhythm of the city.
            </p>

            <p className="para-text">
              Rooted in the timeless science of Ayurveda and guided by
              experienced doctors and skilled therapists, every experience is
              thoughtfully personalised to align with your body, lifestyle, and
              evolving wellbeing needs.
            </p>

            <p className="para-text">
              From restorative therapies and detox rituals to deep relaxation
              and holistic healing, each journey is designed to nurture harmony
              from within.
            </p>

            <p className="para-text">
              Located in the heart of Chennai, our centre brings together
              serene spaces, calming ambience, and elevated care to create an
              environment of quiet sophistication.
            </p>

            <p className="para-text">
              Spacious therapy suites, attentive wellness experts, and
              immersive healing experiences come together seamlessly, offering
              more than treatment, but a mindful return to self.
            </p>

            <p className="para-text">
              Inspired by the philosophy that wellbeing is not a moment, but a
              way of life, Sri Sri Wellbeing Chennai blends traditional healing
              practices with modern wellness perspectives to support physical
              vitality, mental clarity, and emotional ease.
            </p>

            <p className="para-text">
              Whether you seek stillness from a demanding lifestyle,
              therapeutic healing, or a deeper connection with holistic living,
              Sri Sri Wellbeing Chennai offers a sanctuary where health,
              happiness, and inner balance are gently restored.
            </p>

            <div className="mt-10 space-y-8 border-t border-black/5 pt-8 text-left">
              <div>
                <h3 className="mb-3 text-2xl font-serif text-[#3b2218]">
                  Our Vision
                </h3>
                <p className="para-text">
                  To redefine modern wellbeing through timeless Ayurvedic
                  wisdom, creating spaces where individuals can reconnect with
                  balance, vitality, and a more conscious way of living.
                </p>
              </div>

              <div>
                <h3 className="mb-3 text-2xl font-serif text-[#3b2218]">
                  Our Mission
                </h3>
                <p className="para-text">
                  To offer deeply personalised wellness experiences that
                  nurture physical health, mental clarity, and emotional
                  harmony through authentic Ayurveda, compassionate care, and
                  thoughtfully curated healing environments.
                </p>
              </div>

              <p className="para-text text-center font-medium text-[#9c7a45]">
                Sri Sri Wellbeing is Where healing becomes an experience of
                grace, balance, and renewal.
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

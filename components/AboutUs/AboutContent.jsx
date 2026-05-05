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

          <h2 className="section-title text-[#3b2218] mb-8">
            Rediscover Wellbeing
          </h2>

          <div className="space-y-6 text-[#5c4a41]">
            <p className="para-text">
              The easiest way to be healthy is when we live in accordance with
              nature. In earlier times this happened naturally—people rose and
              slept with the sun and ate according to the seasons and lived as
              per the rhythm of nature.
            </p>
            <p className="para-text">
              Today, living well has attained a new definition. With the fast
              paced lifestyle and the growing dependency on Technology, holistic
              health is a commitment that needs to be reiterated often. At Sri
              Sri Wellbeing, we aim to blend health into your daily lives.
            </p>

            <p className="para-text">
              Bringing you the timeless wisdom of ancient Ayurveda and the
              modern benefits of Scientific Research, Sri Sri Wellbeing centres
              across India and the world let you retreat into the best version
              of yourself.
            </p>

            <p className="para-text">
              The world has woken up to the premise of living an authentically
              holistic lifestyle. And Ayurveda is the journey to this wellness.
              Hence, today, we have redefined Wellness. It is time for you to
              rediscover Wellbeing.
            </p>

            <p className="para-text">
              In alignment with this philosophy, our top of the line wellness
              centers have integrated classical Ayurveda therapies with highly
              effective alternative therapies from around the globe. Yoga and
              Meditation programs add to the holistic experience.
            </p>

            <p className="para-text">
              Our Wellness regimes are carefully crafted by experienced Vaidyas
              (Ayurvedic doctors). We have a range of therapeutic massages, deep
              detoxification techniques and herbal medicines to ensure that your
              physical, mental and emotional well-being hit a peak. Therapies,
              diet and lifestyle change advice – all are highly personalized to
              put the ‘feel good’ factor back in your life.
            </p>

            <div className="mt-8 pt-8 border-t border-black/5">
              <h3 className="text-2xl font-serif text-[#3b2218] mb-4">
                Our Mission
              </h3>
              <p className="para-text font-medium text-[#c29a2f]">
                Enabling a holistic approach towards health and wellbeing in
                modern lifestyles. Providing authentic and effective products
                and services of the highest quality standards.
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

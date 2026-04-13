"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import RevealOnScroll from "./RevealOnScroll";

const learningItems = [
  {
    title: "Children's Wellbeing",
    desc: "Gentle, nurturing therapies designed to support growth, strengthen immunity, and cultivate balance from an early age.",
    image: "/images/img-01.png",
  },
  {
    title: "Women's Wellness",
    desc: "Holistic care that supports hormonal harmony, vitality, and overall wellbeing through every phase of life.",
    image: "/images/img-02.png",
  },
  {
    title: "Mental Wellbeing",
    desc: "Restorative therapies that calm the mind, ease emotional fatigue, and bring clarity to modern, high-paced living.",
    image: "/images/Image-01.png",
  },
];

function LearningCard({ item, index, progress, total }) {
  const segment = 1 / total;

  const start = index * segment;
  const center = start + segment * 0.45;
  const end = start + segment * 0.95;

  const y = useTransform(progress, [start, center, end], [140, 0, -40]);
  const scale = useTransform(progress, [start, center, end], [0.92, 1, 0.96]);
  const opacity = useTransform(
    progress,
    [start, start + 0.08, center, end],
    index === 0 ? [1, 1, 1, 0.9] : [0, 1, 1, 0.85]
  );

  return (
    <motion.div
      style={{
        y,
        scale,
        opacity,
        zIndex: index,
      }}
      className="absolute inset-0 flex items-center justify-center px-4 md:px-6"
    >
      <div className="relative w-full max-w-[1120px]">
        {/* back layers */}
        <div
          className="pointer-events-none absolute left-1/2 top-4 hidden h-full w-[96%] -translate-x-1/2 rounded-[26px] bg-[#ebe4d8] md:block"
          style={{ zIndex: 1 }}
        />
        <div
          className="pointer-events-none absolute left-1/2 top-2 hidden h-full w-[98%] -translate-x-1/2 rounded-[26px] bg-[#f3ede3] md:block"
          style={{ zIndex: 2 }}
        />

        {/* main card */}
        <div className="relative z-10 grid overflow-hidden rounded-[26px] bg-white shadow-[0_30px_80px_rgba(0,0,0,0.12)] md:grid-cols-[1.02fr_1fr]">
          {/* left content */}
          <div className="relative flex flex-col justify-center bg-[#f8f6f2] px-6 py-8 md:min-h-[460px] md:px-14 md:py-12">
            <div className="absolute inset-x-0 top-0 h-[130px] bg-[radial-gradient(circle_at_18px_18px,#f3ede3_12px,transparent_13px)] bg-size-[54px_42px] opacity-70" />

            <div className="relative z-10 max-w-[430px]">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-[#d8bb6b]/40 bg-white shadow-sm">
                <Image
                  src="/logo.jpeg"
                  alt="icon"
                  width={30}
                  height={30}
                  className="object-contain"
                />
              </div>

              <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#b88621]">
                Pathway 0{index + 1}
              </div>

              <h3 className="text-xl md:text-2xl font-bold leading-tight text-[#171310]">
                {item.title}
              </h3>

              <p className="mt-4 text-base md:text-lg leading-relaxed text-[#5f5852]">
                {item.desc}
              </p>

              <div className="mt-7 h-[2px] w-16 bg-linear-to-r from-[#e5cf86] to-[#c08f20]" />
            </div>
          </div>

          {/* right image */}
          <div className="relative h-[280px] overflow-hidden md:h-auto md:min-h-[460px]">
            <Image
              src={item.image}
              alt={item.title}
              fill
              priority={index === 0}
              className="object-cover"
            />

          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function TailoredPathwaysSection() {
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const setMode = () => setIsMobile(mediaQuery.matches);

    setMode();
    mediaQuery.addEventListener("change", setMode);

    return () => mediaQuery.removeEventListener("change", setMode);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001,
  });

  if (isMobile) {
    return (
      <section className="relative overflow-hidden bg-[#f5f2ec] py-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(192,143,32,0.08),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(192,143,32,0.06),transparent_35%)]" />

        <div className="relative z-10 mx-auto w-[min(1200px,calc(100%-24px))]">
          <div className="mb-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-[0.06em] text-[#111]">
              Tailored Pathways of Care
            </h2>
            <p className="mx-auto mt-3 max-w-[560px] text-base md:text-lg leading-6 text-[#5e5751]">
              Thoughtfully designed approaches that honour individual needs,
              life stages, and evolving wellbeing.
            </p>
            <div className="mx-auto mt-3 h-[3px] w-[74px] rounded-full bg-linear-to-r from-[#e5cf86] to-[#c08f20]" />
          </div>

          <div className="space-y-5">
            {learningItems.map((item, index) => (
              <article
                key={item.title}
                className="overflow-hidden rounded-[20px] bg-white shadow-[0_18px_40px_rgba(0,0,0,0.1)]"
              >
                <div className="relative h-[250px]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    priority={index === 0}
                    className="object-cover"
                  />

                </div>

                <div className="bg-[#f8f6f2] px-5 py-6">
                  <div className="mb-3 inline-flex rounded-full border border-[#d8bb6b]/40 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#b88621]">
                    Pathway 0{index + 1}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold leading-tight text-[#171310]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-base md:text-lg leading-7 text-[#5f5852]">
                    {item.desc}
                  </p>
                  <div className="mt-5 h-[2px] w-14 bg-linear-to-r from-[#e5cf86] to-[#c08f20]" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#f5f2ec] py-14 md:py-20"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(192,143,32,0.08),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(192,143,32,0.06),transparent_35%)]" />

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-4 md:px-6">
        <RevealOnScroll className="mb-8 text-center md:mb-10">
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-[0.06em] text-[#111]">
            Tailored Pathways of Care
          </h2>
          <p className="mx-auto mt-4 max-w-[600px] text-base md:text-lg leading-6 text-[#5e5751]">
            Thoughtfully designed approaches that honour individual needs, life
            stages, and evolving wellbeing.
          </p>
          <div className="mx-auto mt-3 h-[3px] w-[74px] rounded-full bg-linear-to-r from-[#e5cf86] to-[#c08f20]" />
        </RevealOnScroll>
      </div>

      <div className="relative h-[100vh] md:h-[100vh] lg:h-[100vh]">
        <div className="sticky top-[76px] flex h-[calc(100vh-76px)] items-center overflow-hidden md:top-[92px] md:h-[calc(100vh-92px)]">
          <div className="relative z-10 mx-auto w-full max-w-[1240px] px-4 md:px-6">
            <div className="relative h-[500px] md:h-[520px] lg:h-[540px]">
              {learningItems.map((item, index) => (
                <LearningCard
                  key={item.title}
                  item={item}
                  index={index}
                  progress={smoothProgress}
                  total={learningItems.length}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

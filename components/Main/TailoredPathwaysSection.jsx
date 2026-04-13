"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

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
    [0, 1, 1, 0.85]
  );

  return (
    <motion.div
      style={{
        y,
        scale,
        opacity,
        zIndex: index, // Reverse stacking so newer cards lay on top!
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
            <div className="absolute inset-x-0 top-0 h-[130px] bg-[radial-gradient(circle_at_18px_18px,#f3ede3_12px,transparent_13px)] bg-[length:54px_42px] opacity-70" />

            <div className="relative z-10 max-w-[430px]">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-[#d8bb6b]/40 bg-white shadow-sm">
                <Image
                  src="/logo.png"
                  alt="icon"
                  width={30}
                  height={30}
                  className="object-contain"
                />
              </div>

              <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#b88621]">
                Pathway 0{index + 1}
              </div>

              <h3 className="text-[28px] font-bold leading-tight text-[#171310] md:text-[40px]">
                {item.title}
              </h3>

              <p className="mt-4 text-[15px] leading-relaxed text-[#5f5852] md:text-[17px]">
                {item.desc}
              </p>

              <div className="mt-7 h-[2px] w-16 bg-gradient-to-r from-[#e5cf86] to-[#c08f20]" />
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function TailoredPathwaysSection() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001
  });

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#f5f2ec]">
      <div className="relative h-[120vh] md:h-[120vh]">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          {/* background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(192,143,32,0.08),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(192,143,32,0.06),transparent_35%)]" />

          <div className="relative z-10 mx-auto w-full max-w-[1240px] px-4 md:px-6">
            {/* heading */}
            <div className="mb-6 text-center md:mb-10">
              <h2 className="text-[24px] font-bold uppercase tracking-[0.06em] text-[#111] md:text-[42px]">
                Tailored Pathways of Care
              </h2>
              <p className="mx-auto mt-4 max-w-[600px] text-[14px] leading-6 text-[#5e5751] md:text-[15px]">
                Thoughtfully designed approaches that honour individual needs, life stages, and evolving wellbeing.
              </p>
              <div className="mx-auto mt-3 h-[3px] w-[74px] rounded-full bg-gradient-to-r from-[#e5cf86] to-[#c08f20]" />
            </div>

            {/* cards */}
            <div className="relative h-[520px] md:h-[540px]">
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

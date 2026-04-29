"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  {
    value: 380,
    suffix: "+",
    label: "Doctors",
    desc: "across India\nand the Globe",
  },
  {
    value: 5,
    suffix: "M+",
    label: "Patients",
    desc: "More than 5 Million\npatients addressed",
  },
  {
    value: 500,
    suffix: "+",
    label: "Districts",
    desc: "Nadi camps across\n500+ districts in India",
  },
  {
    value: 20,
    suffix: "+",
    label: "Countries",
    desc: "reached through our\ndoctors",
  },
];

function useCountUp(end, duration = 2000, startCounting) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCounting) return;

    let startTime = null;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, startCounting]);

  return count;
}

function StatItem({ stat, startCounting, index }) {
  const count = useCountUp(stat.value, 2200, startCounting);

  return (
    <div className="flex flex-col items-start px-6 py-8 md:px-8 md:py-10">
      <div className="text-4xl md:text-5xl lg:text-[56px] font-bold text-[#1f1a17] tracking-tight leading-none">
        {count}
        <span className="text-[#1f1a17]">{stat.suffix}</span>
      </div>
      <h3 className="section-subtitle mt-3 text-[#1f1a17] tracking-wide">
        {stat.label}
      </h3>
      <p className="mt-2 text-sm md:text-base leading-relaxed text-[#7a726c] whitespace-pre-line">
        {stat.desc}
      </p>
    </div>
  );
}

export default function NadiStatsSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#f5f2ec]"
    >
      <div className="container-width py-12 md:py-16">
        {/* Top divider line */}
        <div className="mb-8 md:mb-10 h-px w-full bg-[#d9d0c3]" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`relative transition-all duration-700 ${
                index < 3
                  ? "border-r border-[#d9d0c3]/60"
                  : ""
              } ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <StatItem
                stat={stat}
                startCounting={isVisible}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

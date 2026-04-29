import Image from "next/image";
import { FaCheck } from "react-icons/fa6";
import RevealOnScroll from "../Main/RevealOnScroll";

export default function NetraTejasOverview({ card, highlights = [] }) {
  return (
    <section className="section-padding bg-[#f5f2ec]">
      <div className="container-width">
        {/* Highlights Bar */}
        {highlights.length > 0 && (
          <RevealOnScroll>
            <div className="mb-10 grid gap-4 border-y border-[#d9d0c3] py-5 text-center md:grid-cols-3 md:gap-6 md:mb-14">
              {highlights.map((item) => (
                <p
                  key={item}
                  className="eyebrow-text text-[#6d5f57]"
                >
                  {item}
                </p>
              ))}
            </div>
          </RevealOnScroll>
        )}

        {/* Card */}
        <div className="grid overflow-hidden rounded-[24px] bg-white shadow-[0_14px_44px_rgba(59,34,24,0.10)] md:grid-cols-[0.95fr_1.05fr]">
          {/* Image Side */}
          <RevealOnScroll className="relative min-h-[280px] md:min-h-[420px]">
            <Image
              src={card.image}
              alt={card.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </RevealOnScroll>

          {/* Content Side */}
          <RevealOnScroll
            delay={0.15}
            className="bg-[#3b2218] p-8 md:p-12 lg:p-16 flex flex-col justify-center"
          >
            <p className="eyebrow-text text-[#d0a93d]">
              About Sri Sri Netra Tejas
            </p>
            <h2 className="section-title mt-4 text-white leading-snug">
              {card.title}
            </h2>
            <div className="mt-4 h-[3px] w-[60px] rounded-full bg-gradient-to-r from-[#e7d58f] to-[#c79f31]" />
            <p className="para-text mt-6 text-white/80">
              {card.description}
            </p>
            <div className="mt-8 space-y-4">
              {card.points.map((point) => (
                <div key={point} className="flex items-start gap-4">
                  <span className="mt-1 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#d0a93d] text-white">
                    <FaCheck className="text-[11px]" />
                  </span>
                  <p className="small-text text-white/85">{point}</p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

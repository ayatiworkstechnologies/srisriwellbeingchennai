"use client";

import Image from "next/image";
import Link from "next/link";
import RevealOnScroll from "../Main/RevealOnScroll";

/**
 * Reusable Page Hero — image on top, content below on dark background.
 *
 * @param {Object}   props
 * @param {string}   props.title              – Main heading
 * @param {string}   [props.subtitle]         – Small text above title
 * @param {string[]} [props.paragraphs]       – Array of body paragraphs
 * @param {string}   props.heroImage          – Full-width hero image path
 * @param {string}   [props.heroImageAlt]     – Alt text for hero image
 * @param {Object}   [props.primaryButton]    – { label, href }
 * @param {Object}   [props.secondaryButton]  – { label, href }
 * @param {string}   [props.bgColor]          – Content bg colour (default: #3b2218)
 */
export default function PageHero({
  title,
  subtitle,
  paragraphs = [],
  heroImage,
  heroImageAlt = "Hero",
  primaryButton,
  secondaryButton,
  bgColor = "#3b2218",
}) {
  return (
    <section className="overflow-hidden">
      {/* ── Full-width Image ── */}
      {heroImage && (
        <div className="relative w-full h-[320px] md:h-[440px] lg:h-[520px]">
          <Image
            src={heroImage}
            alt={heroImageAlt}
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        </div>
      )}

      {/* ── Content Area ── */}
      <div
        className="py-14 md:py-20 lg:py-24"
        style={{ backgroundColor: bgColor }}
      >
        <div className="mx-auto w-[min(900px,calc(100%-24px))] text-center md:w-[min(900px,calc(100%-40px))]">
          {/* Subtitle */}
          {subtitle && (
            <RevealOnScroll>
              <p className="text-sm md:text-base font-semibold uppercase tracking-[0.2em] text-[#d0a93d] mb-3 md:mb-4">
                {subtitle}
              </p>
            </RevealOnScroll>
          )}

          {/* Title */}
          <RevealOnScroll delay={0.1}>
            <h1 className="text-3xl md:text-5xl lg:text-[56px] font-bold leading-tight text-white tracking-wide">
              {title}
            </h1>
            <div className="mx-auto mt-4 h-[3px] w-[100px] rounded-full bg-gradient-to-r from-[#e7d58f] to-[#c79f31] md:mt-5 md:w-[120px]" />
          </RevealOnScroll>

          {/* Paragraphs */}
          {paragraphs.map((text, idx) => (
            <RevealOnScroll key={idx} delay={0.15 * (idx + 1)}>
              <p
                className={`mx-auto mt-5 max-w-[760px] text-base md:text-lg leading-7 md:mt-6 ${
                  idx === 0 ? "text-white/80" : "text-white/60"
                }`}
              >
                {text}
              </p>
            </RevealOnScroll>
          ))}

          {/* Buttons */}
          {(primaryButton || secondaryButton) && (
            <RevealOnScroll delay={0.3 + paragraphs.length * 0.1}>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:mt-10">
                {primaryButton && (
                  <Link
                    href={primaryButton.href || "/contact"}
                    className="group inline-flex h-12 md:h-14 items-center justify-center gap-2.5 rounded-full bg-[#d0a93d] px-7 md:px-9 text-base md:text-lg font-semibold tracking-wide text-white transition-all duration-400 hover:-translate-y-0.5 hover:bg-[#b8952b] hover:shadow-[0_12px_36px_rgba(208,169,61,0.35)]"
                  >
                    {primaryButton.label}
                    <svg
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </Link>
                )}

                {secondaryButton && (
                  <Link
                    href={secondaryButton.href || "#"}
                    className="inline-flex h-12 md:h-14 items-center justify-center gap-2 rounded-full border-2 border-white/30 px-7 md:px-9 text-base md:text-lg font-semibold tracking-wide text-white transition-all duration-400 hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/10"
                  >
                    {secondaryButton.label}
                  </Link>
                )}
              </div>
            </RevealOnScroll>
          )}
        </div>
      </div>
    </section>
  );
}

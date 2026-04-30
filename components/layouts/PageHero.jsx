"use client";

import Image from "next/image";
import Link from "next/link";
import RevealOnScroll from "../Main/RevealOnScroll";
import WellnessButton from "./WellnessButton";

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
  mobileImage,
  heroImageAlt = "Hero",
  primaryButton,
  secondaryButton,
  bgColor = "#3b2218",
}) {
  return (
    <section className="overflow-hidden">
      {/* ── Responsive Image ── */}
      <div className="relative w-full h-[60vh] md:h-[75vh] lg:h-[85vh]">
        {/* Desktop Image */}
        {heroImage && (
          <Image
            src={heroImage}
            alt={heroImageAlt}
            fill
            className={`${mobileImage ? "hidden md:block" : "block"} object-cover object-center`}
            priority
            sizes="100vw"
          />
        )}
        
        {/* Mobile Image */}
        {mobileImage && (
          <Image
            src={mobileImage}
            alt={heroImageAlt}
            fill
            className="block md:hidden object-cover object-center"
            priority
            sizes="100vw"
          />
        )}
      </div>

      {/* ── Content Area ── */}
      <div
        className="section-padding lg:py-24"
        style={{ backgroundColor: bgColor }}
      >
        <div className="mx-auto w-[min(900px,calc(100%-24px))] text-center md:w-[min(900px,calc(100%-40px))]">
          {/* Subtitle */}
          {subtitle && (
            <RevealOnScroll>
              <p className="eyebrow-text mb-3 text-[#d0a93d] md:mb-4">
                {subtitle}
              </p>
            </RevealOnScroll>
          )}

          {/* Title */}
          <RevealOnScroll delay={0.1}>
            <h1 className="section-title text-white tracking-wide md:text-5xl lg:text-[56px]">
              {title}
            </h1>
            <div className="mx-auto mt-4 h-[3px] w-[100px] rounded-full bg-gradient-to-r from-[#e7d58f] to-[#c79f31] md:mt-5 md:w-[120px]" />
          </RevealOnScroll>

          {/* Paragraphs */}
          {paragraphs.map((text, idx) => (
            <RevealOnScroll key={idx} delay={0.15 * (idx + 1)}>
              <p
                className={`para-text mx-auto mt-5 max-w-[760px] md:mt-6 ${
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
                  <WellnessButton
                    href={primaryButton.href || "/contact"}
                    label={primaryButton.label}
                  />
                )}

                {secondaryButton && (
                  <WellnessButton
                    href={secondaryButton.href || "#"}
                    label={secondaryButton.label}
                    className="!bg-[#3b2218] !shadow-none hover:!bg-[#4b2c20]"
                  />
                )}
              </div>
            </RevealOnScroll>
          )}
        </div>
      </div>
    </section>
  );
}

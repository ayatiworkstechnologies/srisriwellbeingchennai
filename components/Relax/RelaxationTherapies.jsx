"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RevealOnScroll from "../Main/RevealOnScroll";
import WellnessButton from "../layouts/WellnessButton";
import TherapyModal from "./TherapyModal";
import { listPublicRelaxationTherapies } from "@/lib/api";

const RENEWAL_THERAPY_IDS = new Set(["shirolepa", "keshavarna", "mukhalepa"]);

function normalizeRelaxationTherapy(item) {
  const title = item.title?.trim() || "";
  const lowered = title.toLowerCase();

  if (lowered === "aroma therapy" || lowered === "aromatherapy") {
    return null;
  }

  return {
    id: item.id,
    title:
      lowered === "foot reflexology"
        ? "Reflexology"
        : lowered === "chlorophyll body wrap"
          ? "Body Wrap"
          : title,
    duration: item.duration,
    shortDescription: item.short_description,
    details: item.details,
    benefits: item.benefits,
    image: lowered === "mukhalepa" ? "/images/relax/mukhalepa.png" : item.image,
  };
}

function TherapySection({
  title,
  eyebrow,
  description,
  therapies,
  setSelectedTherapy,
  className = "",
  titleClassName = "",
}) {
  if (!therapies.length) {
    return null;
  }

  return (
    <div className={className}>
      <RevealOnScroll className={`title-center mb-16 ${titleClassName}`}>
        {eyebrow ? (
          <p className="eyebrow-text mb-3 text-[#c29a2f]">{eyebrow}</p>
        ) : null}
        <h2 className="section-title mb-6 text-[#1f1a17] font-primary">
          {title}
        </h2>
        {description ? (
          <p className="para-text text-[#5e5751]">{description}</p>
        ) : null}
        <div className="mx-auto mt-8 h-[3px] w-20 rounded-full bg-[#c29a2f]" />
      </RevealOnScroll>

      <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2 lg:gap-10">
        {therapies.map((therapy, index) => (
          <motion.div
            key={therapy.id || index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: (index % 2) * 0.1 }}
            className="group relative min-h-[360px] overflow-hidden rounded-[28px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.07)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(0,0,0,0.12)] md:min-h-[340px] md:rounded-[36px]"
          >
            <div className="absolute inset-0 h-full w-full overflow-hidden">
              <Image
                src={therapy.image}
                alt={therapy.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>

            <div className="absolute inset-x-3 bottom-3 top-auto rounded-[24px] border border-white/60 bg-white/65 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.15)] backdrop-blur-md md:inset-y-4 md:left-[42%] md:right-4 md:rounded-[30px] md:p-6 lg:left-[45%]">
              <div className="flex h-full flex-col justify-between gap-4">
                <div>
                  <h3 className="section-title mb-2 font-primary text-[#1f1a17]">
                    {therapy.title}
                  </h3>
                  <p className="small-text mb-4 line-clamp-3 text-[#5e5751]">
                    {therapy.shortDescription}
                  </p>
                  <div className="small-text uppercase tracking-widest text-[#c29a2f]">
                    {therapy.duration}
                  </div>
                </div>

                <div className="mt-auto flex w-full justify-center">
                  <WellnessButton
                    onClick={() => setSelectedTherapy(therapy)}
                    label="Book Now"
                    className="scale-90"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function RelaxationTherapies() {
  const [selectedTherapy, setSelectedTherapy] = useState(null);
  const [relaxationTherapies, setRelaxationTherapies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let active = true;

    async function loadTherapies() {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const result = await listPublicRelaxationTherapies();
        if (!active) return;
        setRelaxationTherapies(
          (result || [])
            .map((item) => normalizeRelaxationTherapy(item))
            .filter(Boolean)
        );
      } catch (error) {
        if (!active) return;
        setErrorMessage(error.message || "Unable to load relaxation therapies right now.");
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    loadTherapies();

    return () => {
      active = false;
    };
  }, []);

  const renewalTherapies = relaxationTherapies.filter((therapy) =>
    RENEWAL_THERAPY_IDS.has(String(therapy.id).toLowerCase())
  );
  const featuredTherapies = relaxationTherapies.filter(
    (therapy) => !RENEWAL_THERAPY_IDS.has(String(therapy.id).toLowerCase())
  );

  return (
    <>
      <section
        id="relax-therapies"
        className="section-padding relative overflow-hidden bg-white"
      >
        <div className="container-width">
          {isLoading ? (
            <div className="rounded-[28px] border border-[#eadfcf] bg-[#fcfaf6] px-6 py-16 text-center text-sm text-[#7a726c]">
              Loading relaxation therapies from the API...
            </div>
          ) : errorMessage ? (
            <div className="rounded-[28px] border border-red-200 bg-red-50 px-6 py-16 text-center text-sm text-red-700">
              {errorMessage}
            </div>
          ) : relaxationTherapies.length === 0 ? (
            <div className="rounded-[28px] border border-[#eadfcf] bg-[#fcfaf6] px-6 py-16 text-center text-sm text-[#7a726c]">
              No relaxation therapies available right now.
            </div>
          ) : (
            <div className="space-y-20">
              <TherapySection
                eyebrow="Relaxation Rituals"
                title="Unveil Inner Peace"
                description="Elevate Your Mind, Rejuvenate Your Soul, and Radiate Beauty with Our Blissful Blend of Ayurveda Therapies, Beauty Treatments, and Hair Care."
                therapies={featuredTherapies}
                setSelectedTherapy={setSelectedTherapy}
              />

              <TherapySection
                eyebrow="Hair, Head & Face Care"
                title="Ayurvedic Renewal Therapies"
                description="Specialised head, hair, and facial rituals designed to restore glow, calm the senses, and support natural rejuvenation."
                therapies={renewalTherapies}
                setSelectedTherapy={setSelectedTherapy}
                className="rounded-[32px] border border-[#eadfcf] bg-[#fcfaf6] px-5 py-10 md:px-8 md:py-12"
              />
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {selectedTherapy && (
          <TherapyModal
            therapy={selectedTherapy}
            onClose={() => setSelectedTherapy(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RevealOnScroll from "../Main/RevealOnScroll";
import WellnessButton from "../layouts/WellnessButton";
import TherapyModal from "./TherapyModal";
import { relaxationTherapies } from "./relaxData";


export default function RelaxationTherapies() {
  const [selectedTherapy, setSelectedTherapy] = useState(null);

  return (
    <>
      <section
        id="relax-therapies"
        className="section-padding relative overflow-hidden bg-white"
      >
        <div className="container-width">
          <RevealOnScroll className="title-center mb-16">
            <h2 className="section-title mb-6 text-[#1f1a17] font-primary">
              Unveil Inner Peace
            </h2>
            <p className="para-text text-[#5e5751]">
              Elevate Your Mind, Rejuvenate Your Soul, and Radiate Beauty with
              Our Blissful Blend of Ayurveda Therapies, Beauty Treatments, and
              Hair Care.
            </p>
            <div className="mx-auto mt-8 h-[3px] w-20 rounded-full bg-[#c29a2f]" />
          </RevealOnScroll>

          <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2 lg:gap-10">
            {relaxationTherapies.map((therapy, index) => (
              <motion.div
                key={therapy.id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: (index % 2) * 0.1 }}
                className="group relative min-h-[360px] rounded-[28px] overflow-hidden bg-white shadow-[0_20px_60px_rgba(0,0,0,0.07)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(0,0,0,0.12)] md:min-h-[340px] md:rounded-[36px]"
              >
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <Image
                    src={therapy.image}
                    alt={therapy.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/10" />
                </div>

                {/* Glassy Content Panel */}
                <div className="absolute inset-x-3 bottom-3 top-auto rounded-[24px] border border-white/60 bg-white/65 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.15)] backdrop-blur-md md:inset-y-4 md:right-4 md:left-[42%] md:rounded-[30px] md:p-6 lg:left-[45%]">
                  <div className="flex h-full flex-col justify-between gap-4">
                  <div>
                    <h3 className="section-title mb-2 text-[#1f1a17] font-primary">
                      {therapy.title}
                    </h3>
                    <p className="small-text mb-4 text-[#5e5751] line-clamp-3">
                      {therapy.shortDescription}
                    </p>
                    <div className="small-text text-[#c29a2f] uppercase tracking-widest">
                      {therapy.duration}
                    </div>
                  </div>

                  <div className="mt-auto flex justify-center w-full">
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

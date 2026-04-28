"use client";

import RelaxationTherapies from "@/components/Relax/RelaxationTherapies";
import CampaignTestimonials from "@/components/Campaign/CampaignTestimonials";
import { motion } from "framer-motion";

export default function RelaxationTherapyPage() {
  return (
    <main className="min-h-screen bg-[#f8f6f1]">
      {/* Page Hero - Atmospheric & Cinematic */}
      <section className="relative pt-40 pb-28 overflow-hidden bg-[#1f1a17]">
        {/* Background Overlay with subtle texture/gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(194,154,47,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(194,154,47,0.08),transparent_50%)]" />

        {/* Floating blurred elements for depth */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-20 w-96 h-96 bg-[#c29a2f]/10 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-[#c29a2f]/5 rounded-full blur-[120px]"
        />

        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="inline-block text-[#c29a2f] font-bold tracking-[0.3em] uppercase text-xs md:text-sm mb-6">
              Divine Sanctuary
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 font-primary leading-tight">
              Relaxation{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c29a2f] via-[#e5c26b] to-[#c29a2f] italic font-light pr-4">
                Therapy
              </span>
            </h1>
            <p className="text-white/60 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
              Step into a world of profound stillness. Our ancient Ayurvedic
              protocols are meticulously designed to dissolve stress and awaken
              your inner vitality.
            </p>
          </motion.div>
        </div>

        {/* Scroll Indicator or Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#f8f6f1] to-transparent" />
      </section>

      {/* Main Content Section */}
      <div className="-mt-12 relative z-20">
        <RelaxationTherapies />
      </div>

      <CampaignTestimonials />
    </main>
  );
}

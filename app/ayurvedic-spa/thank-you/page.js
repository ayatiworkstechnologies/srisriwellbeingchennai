"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import AuthenticSpaHeader from "@/components/Campaign/AuthenticSpaHeader";
import AuthenticSpaFooter from "@/components/Campaign/AuthenticSpaFooter";

export default function ThankYouPage() {
  return (
    <div className="relative min-h-screen flex flex-col font-secondary overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/bg.svg"
          alt="Premium Ayurvedic spa treatment"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-white/10" />
      </div>

      <AuthenticSpaHeader />

      <main className="relative z-10 flex-1 flex items-center justify-center pt-32 pb-20 px-4">
        <div className="max-w-2xl w-full text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-10 flex justify-center"
          >
            <div className="relative w-32 h-32 md:w-40 md:h-40">
              <div className="absolute inset-0 bg-[#c29a2f]/20 rounded-full animate-pulse" />
              <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center shadow-lg">
                <span className="text-5xl md:text-6xl">🙏</span>
              </div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold text-[#1f1a17] mb-6 font-primary leading-tight"
          >
            Thank You for <br />
            <span className="text-[#c29a2f] italic font-light">
              Choosing Wellbeing
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-[#5e5751] mb-12 max-w-lg mx-auto leading-relaxed"
          >
            Your request has been received with gratitude. One of our wellness
            consultants will reach out to you within the next 24 hours to
            finalize your appointment.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link
              href="/ayurvedic-spa"
              className="inline-flex items-center justify-center rounded-full border border-[#c29a2f] bg-transparent px-10 py-4 text-sm md:text-base font-bold uppercase tracking-widest text-[#c29a2f] transition-all duration-300 hover:bg-[#c29a2f] hover:text-white active:scale-95"
            >
              Back to Sanctuary
            </Link>
          </motion.div>
        </div>
      </main>

      <AuthenticSpaFooter />
    </div>
  );
}

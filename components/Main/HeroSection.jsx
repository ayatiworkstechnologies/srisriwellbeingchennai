"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroSection() {
  const videoRef = useRef(null);
  const [showContent, setShowContent] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = async () => {
      try {
        video.muted = false; // Attempt to play with audio
        await video.play();
      } catch (error) {
        console.log("Autoplay with audio blocked by browser. Defaulting to muted autoplay:", error);
        // Fallback: play muted so the video still shows
        video.muted = true;
        video.play().catch((e) => console.log("Complete autoplay failure:", e));
      }
    };

    playVideo();

    // Hide content after 6 seconds
    const timer = setTimeout(() => {
      setShowContent(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        playsInline
        preload="auto"
      >
        <source src="/ssw-video-1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <AnimatePresence>
        {showContent && (
          <motion.div
            key="hero-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
            className="absolute inset-0 z-10"
          >
            {/* Dark overlay specifically for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />

            {/* Hero Text Content */}
            <div className="relative flex h-full flex-col items-center justify-center px-4 text-center md:px-6">
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#e6ce84] md:text-[13px]"
              >
                Sri Sri Wellbeing Chennai
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="max-w-[900px] text-[32px] font-bold leading-[1.15] text-white md:text-[60px] lg:text-[72px]"
              >
                Where Stillness Becomes a Lifestyle
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mx-auto mt-5 max-w-[640px] text-[14px] leading-7 text-white/80 md:mt-6 md:text-[17px] md:leading-8"
              >
                Personalised Ayurvedic therapies, crafted for those who carry the
                weight of high-performance living.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Link
                  href="/contact"
                  className="mt-8 inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-[14px] font-semibold text-white shadow-[0_14px_34px_rgba(187,147,39,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(187,147,39,0.45)] md:mt-10 md:px-10 md:py-4 md:text-[15px]"
                  style={{ background: "var(--gold-gradient)" }}
                >
                  Begin Your Wellness Journey
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>

              {/* Scroll indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 md:bottom-10"
              >
                <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/30 p-1">
                  <div className="h-2 w-1 animate-bounce rounded-full bg-white/70" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

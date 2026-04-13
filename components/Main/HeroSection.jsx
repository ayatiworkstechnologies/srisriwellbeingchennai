"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight } from "react-icons/fa6";

export default function HeroSection() {
  const videoRef = useRef(null);
  const [showContent, setShowContent] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

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
        className="absolute inset-0 h-full w-full object-cover object-center animate-[videoZoom_20s_infinite_alternate_ease-in-out] transition-opacity duration-1000"
        autoPlay
        loop
        playsInline
        preload="auto"
      >
        <source src="/ssw-video.mp4" type="video/mp4" />
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

            {/* Hero Text Content */}
            <div className="relative flex h-full flex-col items-center justify-center px-4 text-center md:px-6">

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-4 text-2xl md:text-3xl font-semibold uppercase tracking-[0.3em] text-[#e6ce84]"
              >
                Sri Sri Wellbeing Chennai
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="max-w-[900px] text-4xl md:text-5xl font-bold leading-[1.15] text-white"
              >
                Where Stillness Becomes a Lifestyle
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mx-auto mt-5 max-w-[640px] text-base md:text-lg leading-7 text-white/80 md:mt-6"
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
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-6 py-3.5 text-base font-semibold tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#b8952b] hover:shadow-lg md:mt-10 md:px-10 md:py-4.5 md:text-lg"
                >
                  Begin Your Wellness Journey
                  <FaArrowRight className="text-[18px] md:text-[20px]" />
                </Link>
              </motion.div>

              {/* Scroll indicator & Audio Toggle Container */}
              <div className="absolute bottom-8 left-0 right-0 px-4 md:bottom-10 md:px-8 flex justify-between items-end pointer-events-none">
                {/* Empty left spacer */}
                <div className="w-10"></div>

                {/* Scroll indicator (Centered) */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1.2 }}
                  className="pointer-events-auto"
                >
                  <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/30 p-1">
                    <div className="h-2 w-1 animate-bounce rounded-full bg-white/70" />
                  </div>
                </motion.div>

                {/* Audio Toggle (Right) */}
                <div className="pointer-events-auto">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (videoRef.current) {
                        videoRef.current.muted = !isMuted;
                        setIsMuted(!isMuted);
                      }
                    }}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60 hover:border-white/40"
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                  >
                    {isMuted ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                        <line x1="23" y1="9" x2="17" y2="15"></line>
                        <line x1="17" y1="9" x2="23" y2="15"></line>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

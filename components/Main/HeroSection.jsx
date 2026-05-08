"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight } from "react-icons/fa6";
import RevealOnScroll from "./RevealOnScroll";
import WellnessButton from "../layouts/WellnessButton";

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
        console.log(
          "Autoplay with audio blocked by browser. Defaulting to muted autoplay:",
          error,
        );
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
    <section
      id="home"
      className="relative mt-[80px] md:mt-[96px] h-[calc(100vh-80px)] md:h-[calc(100vh-96px)] w-full overflow-hidden bg-black"
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover object-center animate-[videoZoom_20s_infinite_alternate_ease-in-out] transition-opacity duration-1000"
        autoPlay
        loop
        playsInline
        preload="auto"
      >
        <source
          src="https://ik.imagekit.io/bf5g7wxrp/ayatiworks-storage/ssw-video.MP4/ik-video.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      <AnimatePresence>
        {showContent && (
          <motion.div
            key="hero-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 1.5, ease: "easeInOut" },
            }}
            className="absolute inset-0 z-10"
          ></motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

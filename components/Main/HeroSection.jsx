"use client";

import { useRef, useEffect } from "react";

export default function HeroSection() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    video.volume = 1;

    const tryPlay = async () => {
      try {
        await video.play();
      } catch (error) {
        console.log("Autoplay with sound blocked by browser:", error);
      }
    };

    tryPlay();
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        autoPlay
        loop
        playsInline
        controls
        preload="auto"
      >
        <source src="/ssw-video-1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </section>
  );
}
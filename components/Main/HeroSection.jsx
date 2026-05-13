"use client";

import { useEffect, useRef } from "react";

export default function HeroSection() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.play().catch(() => {});
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
        muted
        playsInline
        preload="metadata"
        poster="/images/1446.jpg"
      >
        <source
          src="https://ik.imagekit.io/bf5g7wxrp/ayatiworks-storage/ssw-video.MP4/ik-video.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </section>
  );
}

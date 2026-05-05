"use client";

import Image from "next/image";

/**
 * PageHero — a clean, full-width banner image placed immediately after the Header.
 * No text, no buttons. Just a premium visual banner.
 */
export default function PageHero({
  heroImage,
  mobileImage,
  videoSrc,
  heroImageAlt = "Page Banner",
  height = "h-[calc(100vh-80px)] md:h-[calc(100vh-96px)]",
}) {
  return (
    <div className="mt-[80px] md:mt-[96px]">
      <section className={`relative w-full overflow-hidden ${height}`}>
        {videoSrc ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover object-center"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : (
          <>
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
          </>
        )}
      </section>
    </div>
  );
}

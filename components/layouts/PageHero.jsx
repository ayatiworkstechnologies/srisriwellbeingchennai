"use client";

/**
 * PageHero - a clean, full-width banner image placed immediately after the Header.
 * No text, no buttons. Just a premium visual banner.
 */
export default function PageHero({
  heroImage,
  mobileImage,
  videoSrc,
  heroImageAlt = "Page Banner",
  height = "h-[calc(100vh-80px)] md:h-[calc(100vh-96px)]",
  imageClassName = "object-cover object-center",
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
        ) : mobileImage ? (
          <picture className="absolute inset-0 block h-full w-full">
            <source media="(max-width: 767px)" srcSet={mobileImage} />
            <img
              src={heroImage || mobileImage}
              alt={heroImageAlt}
              className={`h-full w-full ${imageClassName}`}
              loading="eager"
              fetchPriority="high"
            />
          </picture>
        ) : heroImage ? (
          <img
            src={heroImage}
            alt={heroImageAlt}
            className={`absolute inset-0 h-full w-full ${imageClassName}`}
            loading="eager"
            fetchPriority="high"
          />
        ) : null}
      </section>
    </div>
  );
}

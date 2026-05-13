import Image from "next/image";

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
          <>
            <Image
              src={mobileImage}
              alt={heroImageAlt}
              fill
              priority
              sizes="100vw"
              className={`block md:hidden ${imageClassName}`}
            />
            <Image
              src={heroImage || mobileImage}
              alt={heroImageAlt}
              fill
              priority
              sizes="100vw"
              className={`hidden md:block ${imageClassName}`}
            />
          </>
        ) : heroImage ? (
          <Image
            src={heroImage}
            alt={heroImageAlt}
            fill
            priority
            sizes="100vw"
            className={imageClassName}
          />
        ) : null}
      </section>
    </div>
  );
}

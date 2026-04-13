"use client";

import Image from "next/image";

export default function SanctuarySection() {
  return (
    <section className="relative bg-[#f6f3ee]">
      <div className="relative min-h-[420px] overflow-hidden md:min-h-[620px]">
        <Image
          src="/images/sanctuary-main.jpg"
          alt="A Glimpse Into Your Sanctuary"
          width={1600}
          height={900}
          className="h-[420px] w-full object-cover md:h-[620px]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#120c08]/35 via-[#120c08]/10 to-transparent" />

        <button className="absolute top-1/2 left-3 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#d0a93d] bg-white/90 text-[20px] text-[#b28b22] backdrop-blur transition hover:bg-[#d0a93d] hover:text-white md:left-5 md:h-11 md:w-11 md:text-[26px]">
          ‹
        </button>

        <button className="absolute top-1/2 right-3 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#d0a93d] bg-white/90 text-[20px] text-[#b28b22] backdrop-blur transition hover:bg-[#d0a93d] hover:text-white md:right-5 md:h-11 md:w-11 md:text-[26px]">
          ›
        </button>

        <div className="absolute bottom-5 left-0 right-0 z-10 md:bottom-9">
          <div className="mx-auto w-[min(1200px,calc(100%-24px))] md:w-[min(1200px,calc(100%-40px))]">
            <div className="max-w-[520px]">
              <h2 className="text-[26px] leading-tight font-bold text-[#111111] md:text-[46px]">
                A Glimpse Into Your Sanctuary
              </h2>
              <div className="mt-3 h-[3px] w-[72px] rounded-full bg-gradient-to-r from-[#e7d58f] to-[#c79f31]" />
              <p className="mt-3 max-w-[430px] text-[13px] leading-7 text-[#2f2a26] md:text-[14px]">
                Experience the calming environment, thoughtfully designed
                spaces, and immersive healing atmosphere of our wellness
                sanctuary.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
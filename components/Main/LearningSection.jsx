"use client";

import Image from "next/image";

export default function LearningSection() {
  return (
    <section className="bg-[#f5f2ec] py-14 md:py-20">
      <div className="mx-auto w-[min(1200px,calc(100%-24px))] md:w-[min(1200px,calc(100%-40px))]">
        <div className="mb-8 text-center md:mb-10">
          <h2 className="text-[26px] uppercase leading-tight font-bold text-[#1f1a17] md:text-[42px]">
            Signature Learning Experiences
          </h2>
          <div className="mx-auto mt-3 h-[3px] w-[72px] rounded-full bg-gradient-to-r from-[#e7d58f] to-[#c79f31]" />
        </div>

        <div className="mx-auto grid max-w-[1120px] overflow-hidden rounded-[20px] md:grid-cols-[1.02fr_1fr]">
          <div className="relative flex min-h-[360px] flex-col justify-end bg-[#fdfaf5] px-6 py-10 md:min-h-[460px] md:px-12 md:py-12">
            <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_18px_18px,rgba(212,196,168,0.45)_12px,transparent_13px)] [background-size:52px_52px]" />

            <div className="relative z-10">
              <div className="mb-5 flex h-12 w-12 items-center justify-center md:h-14 md:w-14">
                <Image
                  src="/logo.png"
                  alt="icon"
                  width={44}
                  height={44}
                  className="object-contain"
                />
              </div>

              <h3 className="text-[24px] font-bold text-[#171310] md:text-[30px]">
                Reflexology
              </h3>

              <p className="mt-3 max-w-[380px] text-[13px] leading-7 text-[#5f5852] md:text-[14px] md:leading-8">
                A focused practice that activates the body&apos;s natural
                healing responses through precise pressure techniques.
              </p>

              <div className="mt-5 h-[3px] w-[60px] rounded-full bg-gradient-to-r from-[#e7d58f] to-[#c79f31]" />
            </div>
          </div>

          <div className="min-h-[300px] md:min-h-[460px]">
            <Image
              src="/images/reflexology.jpg"
              alt="Reflexology"
              width={700}
              height={500}
              className="h-full min-h-[300px] w-full object-cover md:min-h-[460px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
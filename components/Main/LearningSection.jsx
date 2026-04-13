"use client";

import Image from "next/image";

const learningItems = [
  {
    title: "Reflexology",
    desc: "A focused practice that activates the body's natural healing responses through precise pressure techniques.",
    image: "/images/img-01.png",
  },
  {
    title: "Marma Therapy",
    desc: "A restorative therapy that works on vital energy points to support circulation, relaxation, and internal balance.",
    image: "/images/Image-01.png",
  },
  {
    title: "Abhyanga Learning",
    desc: "Experience the therapeutic value of rhythmic oil application designed to soothe the body and calm the nervous system.",
    image: "/images/img-02.png",
  },
];

export default function LearningSection() {
  return (
    <section className="relative bg-[#f5f2ec]">
      {/* scroll track */}
      <div className="relative h-[320vh]">
        {/* sticky viewport */}
        <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden py-10 md:py-16">
          {/* decorative bg */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(183,154,93,0.08),transparent_40%),radial-gradient(circle_at_85%_80%,rgba(199,165,98,0.06),transparent_40%)]" />

          <div className="relative z-10 mx-auto flex h-full w-[min(1200px,calc(100%-24px))] flex-col md:w-[min(1200px,calc(100%-40px))]">
            {/* heading */}
            <div className="mb-8 flex-shrink-0 text-center md:mb-10">
              <h2 className="text-[26px] font-bold uppercase tracking-[0.06em] text-[#111111] md:text-[42px]">
                Signature Learning Experiences
              </h2>
              <div className="mx-auto mt-3 h-[3px] w-[72px] rounded-full bg-gradient-to-r from-[#e5cf86] to-[#c08f20]" />
            </div>

            {/* stack area */}
            <div className="relative flex-1">
              {learningItems.map((item, index) => (
                <div
                  key={item.title}
                  className="sticky flex h-[78vh] items-center justify-center"
                  style={{
                    top: `calc(90px + ${index * 18}px)`,
                    zIndex: 10 + index,
                  }}
                >
                  <div
                    className="relative w-full max-w-[1140px] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{
                      transform: `scale(${0.94 + index * 0.025})`,
                    }}
                  >
                    {/* back stack layers */}
                    <div className="pointer-events-none absolute -top-6 left-1/2 z-0 hidden h-full w-[94%] -translate-x-1/2 rounded-[22px] bg-[#e8e2d5]/60 md:block" />
                    <div className="pointer-events-none absolute -top-3 left-1/2 z-0 hidden h-full w-[97%] -translate-x-1/2 rounded-[22px] bg-[#f2ede4]/80 md:block" />

                    {/* top right layered bars */}
                    <div className="pointer-events-none absolute right-[18%] top-[-22px] z-[1] hidden h-[72px] w-[220px] overflow-hidden rounded-t-[8px] md:block">
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="pointer-events-none absolute right-[7%] top-[-2px] z-[2] hidden h-[72px] w-[290px] overflow-hidden rounded-t-[8px] md:block">
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-[#9a7334]/35" />
                    </div>

                    {/* main card */}
                    <div className="group relative z-10 grid overflow-hidden rounded-[22px] bg-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] md:grid-cols-[1.05fr_1fr]">
                      {/* content panel */}
                      <div className="relative flex flex-col justify-end bg-[#f8f8f8] px-8 py-10 md:min-h-[520px] md:px-16">
                        <div className="absolute left-0 top-0 h-[150px] w-full bg-[radial-gradient(circle_at_16px_20px,#f9f6f0_14px,transparent_15px)] bg-[length:56px_44px] opacity-70" />

                        <div className="relative z-10 max-w-[420px]">
                          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-[#e5cf86]/40 bg-[#faf9f6]">
                            <Image
                              src="/logo.jpeg"
                              alt="icon"
                              width={32}
                              height={32}
                            />
                          </div>

                          <h3 className="text-[30px] font-bold leading-tight text-[#171310] md:text-[38px]">
                            {item.title}
                          </h3>

                          <p className="mt-4 text-[15px] leading-relaxed text-[#5f5852] md:text-[17px]">
                            {item.desc}
                          </p>

                          <div className="mt-8 flex items-center gap-3">
                            <div className="h-[2px] w-12 bg-gradient-to-r from-[#e5cf86] to-[#c08f20]" />
                            <span className="text-[11px] font-bold uppercase tracking-widest text-[#c08f20]">
                              Module 0{index + 1}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* image panel */}
                      <div className="relative h-[320px] w-full overflow-hidden md:h-auto md:min-h-[520px]">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-1000 group-hover:scale-105"
                          priority={index === 0}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
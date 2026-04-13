"use client";

import Image from "next/image";

const cards = [
  {
    title: "Reflexology",
    desc: "A focused practice that activates the body’s natural healing responses through precise pressure techniques.",
    image: "/images/reflexology.jpg",
  },
  {
    title: "Marma Therapy",
    desc: "A restorative therapy that works on vital energy points to support circulation, relaxation, and internal balance.",
    image: "/images/learning-2.jpg",
  },
  {
    title: "Abhyanga Learning",
    desc: "Experience the therapeutic value of rhythmic oil application designed to soothe the body and calm the nervous system.",
    image: "/images/learning-3.jpg",
  },
  {
    title: "Mindfulness Practice",
    desc: "Guided learning sessions that help cultivate deeper stillness, awareness, and emotional grounding.",
    image: "/images/learning-4.jpg",
  },
  {
    title: "Breath & Balance",
    desc: "A calming experience focused on breath-led restoration, helping the body and mind return to harmony.",
    image: "/images/learning-5.jpg",
  },
];

export default function ScrollCardsSection() {
  return (
    <section className="relative overflow-hidden bg-[#f5f2ec] py-16 md:py-24">
      <div className="absolute inset-0 bg-[url('/images/learning-bg-texture.png')] bg-cover bg-center opacity-[0.08]" />

      <div className="relative z-10 mx-auto w-[min(1200px,calc(100%-24px))] md:w-[min(1200px,calc(100%-40px))]">
        <div className="mb-10 text-center md:mb-14">
          <h2 className="text-[26px] font-bold uppercase leading-tight text-[#111111] md:text-[42px]">
            Signature Learning Experiences
          </h2>
          <div className="mx-auto mt-3 h-[3px] w-[72px] rounded-full bg-gradient-to-r from-[#e7d58f] to-[#c79f31]" />
        </div>

        <div className="relative">
          {cards.map((card, index) => (
            <article
              key={card.title}
              className="relative h-[85vh] md:h-[95vh]"
            >
              <div
                className="sticky top-[80px] md:top-[100px]"
                style={{ zIndex: index + 1 }}
              >
                <div className="relative mx-auto max-w-[1120px]">
                  {/* back stack left */}
                  <div className="pointer-events-none absolute left-[16px] top-[30px] z-0 hidden h-[84%] w-[52%] rounded-[18px] bg-[#eee7da] shadow-[0_8px_20px_rgba(0,0,0,0.04)] md:block" />
                  <div className="pointer-events-none absolute left-[38px] top-[12px] z-[1] hidden h-[84%] w-[52%] rounded-[18px] bg-[#faf5eb] shadow-[0_8px_20px_rgba(0,0,0,0.04)] md:block" />

                  {/* back stack right */}
                  <div className="pointer-events-none absolute right-[16px] top-[28px] z-0 hidden h-[84%] w-[44%] rounded-[18px] bg-[#b39157] shadow-[0_8px_20px_rgba(0,0,0,0.05)] md:block" />
                  <div className="pointer-events-none absolute right-[38px] top-[8px] z-[1] hidden h-[84%] w-[44%] rounded-[18px] bg-[#d3bd95] shadow-[0_8px_20px_rgba(0,0,0,0.05)] md:block" />

                  {/* front active card */}
                  <div className="relative z-10 grid overflow-hidden rounded-[22px] shadow-[0_16px_40px_rgba(0,0,0,0.06)] transition-transform duration-500 md:grid-cols-[1.02fr_1fr]">
                    {/* left content */}
                    <div className="relative flex min-h-[340px] flex-col justify-end rounded-t-[22px] bg-[#f5f5f5] px-6 py-10 md:min-h-[500px] md:rounded-l-[22px] md:rounded-tr-none md:px-12 md:py-12">
                      <div className="absolute left-0 top-0 h-[145px] w-full bg-[url('/images/learning-pattern.png')] bg-repeat-x bg-top opacity-45" />

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
                          {card.title}
                        </h3>

                        <p className="mt-3 max-w-[380px] text-[13px] leading-7 text-[#5f5852] md:text-[14px] md:leading-8">
                          {card.desc}
                        </p>

                        <div className="mt-5 h-[3px] w-[64px] rounded-full bg-gradient-to-r from-[#e7d58f] to-[#c79f31]" />
                      </div>
                    </div>

                    {/* right image */}
                    <div className="relative min-h-[300px] overflow-hidden rounded-b-[22px] bg-white md:min-h-[500px] md:rounded-r-[22px] md:rounded-bl-none">
                      <Image
                        src={card.image}
                        alt={card.title}
                        width={900}
                        height={700}
                        className="h-[300px] w-full object-cover transition-transform duration-700 md:h-[500px]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
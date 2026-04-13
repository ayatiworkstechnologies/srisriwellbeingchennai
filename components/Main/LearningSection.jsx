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
  {
    title: "Mindfulness Practice",
    desc: "Guided learning sessions that help cultivate deeper stillness, awareness, and emotional grounding.",
    image: "/images/img-01.png",
  },
  {
    title: "Breath & Balance",
    desc: "A calming experience focused on breath-led restoration, helping the body and mind return to harmony.",
    image: "/images/Image-01.png",
  },
];

export default function LearningSection() {
  return (
    <section className="relative overflow-hidden bg-[#f5f2ec] py-14 md:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(183,154,93,0.16),transparent_42%),radial-gradient(circle_at_85%_80%,rgba(199,165,98,0.12),transparent_38%)]" />

      <div className="relative z-10 mx-auto w-[min(1200px,calc(100%-24px))] md:w-[min(1200px,calc(100%-40px))]">
        <div className="mb-10 text-center md:mb-14">
          <h2 className="text-[26px] font-bold uppercase leading-tight tracking-[0.06em] text-[#111111] md:text-[42px]">
            Signature Learning Experiences
          </h2>
          <div className="mx-auto mt-3 h-[3px] w-[72px] rounded-full bg-gradient-to-r from-[#e5cf86] to-[#c08f20]" />
        </div>

        <div className="relative">
          {learningItems.map((item, index) => (
            <div key={item.title} className="relative h-[82vh] md:h-[92vh]">
              <div className="sticky top-20 md:top-24" style={{ zIndex: index + 1 }}>
                <div className="relative mx-auto max-w-[1140px]">
                  <div className="pointer-events-none absolute left-[10px] top-[34px] z-0 hidden h-[84%] w-[53.5%] rounded-[20px] bg-[#f0eadf] shadow-[0_8px_22px_rgba(0,0,0,0.05)] md:block" />
                  <div className="pointer-events-none absolute left-[32px] top-[14px] z-[1] hidden h-[84%] w-[53.5%] rounded-[20px] bg-[#faf6ee] shadow-[0_8px_22px_rgba(0,0,0,0.04)] md:block" />

                  <div className="pointer-events-none absolute right-[10px] top-[30px] z-0 hidden h-[84%] w-[44.5%] rounded-[20px] bg-[#a88653] shadow-[0_8px_22px_rgba(0,0,0,0.08)] md:block" />
                  <div className="pointer-events-none absolute right-[32px] top-[10px] z-[1] hidden h-[84%] w-[44.5%] rounded-[20px] bg-[#cfb48a] shadow-[0_8px_22px_rgba(0,0,0,0.08)] md:block" />

                  <div className="relative z-10 grid overflow-hidden rounded-[22px] bg-white shadow-[0_18px_45px_rgba(0,0,0,0.08)] md:grid-cols-[1.02fr_1fr]">
                    <div className="relative flex min-h-[340px] flex-col justify-end rounded-t-[22px] bg-[#f4f4f4] px-6 py-10 md:min-h-[500px] md:rounded-l-[22px] md:rounded-tr-none md:px-12 md:py-12">
                      <div className="absolute left-0 top-0 h-[150px] w-full bg-[radial-gradient(circle_at_16px_20px,#efe7d5_14px,transparent_15px),radial-gradient(circle_at_48px_20px,#efe7d5_14px,transparent_15px)] bg-[length:64px_44px] bg-repeat-x opacity-95" />

                      <div className="relative z-10">
                        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-[#dfcfad] bg-white/95 md:h-14 md:w-14">
                          <Image src="/logo.jpeg" alt="icon" width={44} height={44} className="object-contain" />
                        </div>

                        <h3 className="text-[24px] font-bold text-[#171310] md:text-[30px]">{item.title}</h3>

                        <p className="mt-3 max-w-[400px] text-[13px] leading-7 text-[#5f5852] md:text-[14px] md:leading-8">{item.desc}</p>

                        <div className="mt-5 h-[3px] w-[64px] rounded-full bg-gradient-to-r from-[#e7d58f] to-[#c79f31]" />
                      </div>
                    </div>

                    <div className="relative min-h-[300px] overflow-hidden rounded-b-[22px] bg-white md:min-h-[500px] md:rounded-r-[22px] md:rounded-bl-none">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={900}
                        height={700}
                        className="h-[300px] w-full object-cover md:h-[500px]"
                        priority={index === 0}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

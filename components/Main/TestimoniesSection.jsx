"use client";

const testimonies = [
  {
    name: "Anusha Rajan",
    review:
      "A deeply soothing and authentic experience. Netra Tejas felt gentle yet remarkably effective, bringing clarity and comfort in the most natural way. A refined approach to non-invasive care that truly delivers.",
  },
  {
    name: "Muthukrishnan Gopal",
    review:
      "An exceptional destination for authentic Ayurvedic care. The experience is thoughtfully curated, offering both depth and genuine healing in a calm, welcoming environment.",
  },
  {
    name: "Meera Venkatesh",
    review:
      "What stood out was the level of personalisation. Beginning with Nadi Pariksha, every therapy felt aligned to my body’s needs. The experience was unhurried, intuitive, and deeply restorative.",
  },
  {
    name: "Rohit Subramanian",
    review:
      "From Abhyanga to relaxation therapies, each session brought a noticeable sense of lightness and ease. The care extended to every member of the family, making it a truly holistic experience.",
  },
  {
    name: "Priya Narayanan",
    review:
      "I arrived seeking relief, but discovered something far more profound, a sense of stillness. Therapies like Shirodhara brought a quiet calm that stayed long after the session ended. A space where healing feels effortless",
  },
];

const marqueeTestimonies = [...testimonies, ...testimonies];

export default function TestimoniesSection() {
  return (
    <section id="testimonial" className="bg-[#f6f3ee] py-16 md:py-24">
      <div className="mx-auto w-[min(1320px,calc(100%-24px))] md:w-[min(1320px,calc(100%-40px))]">
        <div className="mb-12 text-center md:mb-16">
          <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.2em] text-[#c29a2f]">
            Journeys of Restoration
          </p>
          <h2 className="text-[28px] font-bold leading-tight text-[#1f1a17] md:text-[46px]">
            Voices of Wellbeing
          </h2>
          <div className="mx-auto mt-6 h-[3px] w-[72px] rounded-full bg-gradient-to-r from-[#e7d58f] to-[#c79f31]" />
        </div>

        <div className="relative overflow-hidden pb-4">
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-10 bg-gradient-to-r from-[#f6f3ee] to-transparent md:w-20" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-10 bg-gradient-to-l from-[#f6f3ee] to-transparent md:w-20" />

          <div className="testimonies-marquee flex min-w-max gap-6">
            {marqueeTestimonies.map((item, index) => (
              <div
                key={`${item.name}-${index}`}
                className="flex min-h-[320px] w-[280px] flex-col rounded-[22px] bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.08)] md:w-[320px] md:p-8"
              >
                <div className="mb-5 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-[15px] text-[#d0a93d]">
                      ★
                    </span>
                  ))}
                </div>

                <p className="mb-8 flex-1 text-[14px] leading-7 text-[#5e5751] italic">
                  &ldquo;{item.review}&rdquo;
                </p>

                <div className="flex items-center gap-4 border-t border-[#eee7de] pt-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f6f3ee] text-[15px] font-bold text-[#b28b22]">
                    {item.name.charAt(0)}
                  </div>

                  <div>
                    <h4 className="text-[15px] font-bold text-[#1f1a17]">
                      {item.name}
                    </h4>
                    <p className="text-[12px] text-[#857b72]">Guest</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

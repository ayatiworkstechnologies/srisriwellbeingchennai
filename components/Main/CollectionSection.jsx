"use client";

import Image from "next/image";

const products = [
  {
    title: "Amruth",
    desc: "A time-honoured formulation designed to support immunity and restore natural vitality. Crafted to gently strengthen the body's internal resilience.",
    image: "/images/img-01.png",
  },
  {
    title: "Liv-On",
    desc: "A carefully balanced blend formulated to support metabolic function and internal detox. Designed to promote lightness, clarity, and digestive ease.",
    image: "/images/img-02.png",
  },
  {
    title: "Ashwagandha",
    desc: "A revered adaptogenic formulation known to restore energy and calm the nervous system. Ideal for enhancing strength, focus, and overall well-being.",
    image: "/images/Image-01.png",
  },
];

export default function CollectionSection() {
  return (
    <section
      id="products"
      className="bg-[#f5f5f5] py-14 md:py-20"
    >
      <div className="mx-auto w-[min(1200px,calc(100%-24px))] md:w-[min(1200px,calc(100%-40px))]">
        <div className="mb-10 text-center md:mb-14">
          <h2 className="text-[28px] font-bold leading-tight text-[#111] md:text-[52px]">
            Curated Wellness Formulations
          </h2>

          <div className="mx-auto mt-3 h-[3px] w-[78px] rounded-full bg-[#d8b03f]" />

          <p className="mx-auto mt-6 max-w-[620px] text-[13px] leading-6 text-[#555] md:text-[15px]">
            A refined selection of Ayurvedic formulations crafted to complement your wellness
            journey, designed for daily balance, vitality, and sustained inner harmony.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 md:gap-10">
          {products.map((card) => (
            <div
              key={card.title}
              className="overflow-hidden rounded-[18px] bg-[#fdfdfd] shadow-[0_14px_35px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1"
            >
              <div className="p-3 md:p-4">
                <div className="overflow-hidden rounded-[12px] bg-[#4b240f] p-5">
                  <Image
                    src={card.image}
                    alt={card.title}
                    width={400}
                    height={400}
                    className="h-[165px] w-full rounded-[10px] object-cover md:h-[235px]"
                  />
                </div>

                <div className="px-1 pb-2 pt-4">
                  <h3 className="text-[18px] font-bold text-[#111] md:text-[34px] md:leading-none">
                    {card.title}
                  </h3>

                  <p className="mt-3 text-[13px] leading-5 text-[#6b6b6b] md:text-[14px]">
                    {card.desc}
                  </p>

                  <button className="mt-5 inline-flex rounded-full bg-[#4b240f] px-6 py-3 text-[14px] font-medium text-white transition duration-300 hover:scale-[1.03]">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RevealOnScroll from "../Main/RevealOnScroll";
import TherapyModal from "./TherapyModal";

const therapies = [
  {
    id: 1,
    title: "Abhyanga",
    duration: "45 mins",
    shortDescription:
      "An Ayurvedic procedure involving warm medicated oil and gentle massage for relaxation.",
    details:
      "Abhyanga is a traditional Ayurvedic full-body oil massage using warm herbal oils. It helps relax the body, improve blood circulation, nourish the skin, reduce fatigue, and calm the nervous system.",
    benefits: [
      "Relieves stress and tiredness",
      "Improves blood circulation",
      "Nourishes skin and body tissues",
      "Supports better sleep",
      "Helps relax muscles",
    ],
    image: "/images/1446.jpg",
  },
  {
    id: 2,
    title: "Shirodhara",
    duration: "45 mins",
    shortDescription:
      "A signature Ayurvedic therapy where warm oil is poured continuously over the forehead.",
    details:
      "Shirodhara is a deeply calming therapy where warm medicated oil flows gently over the forehead. It is commonly used for stress relief, mental relaxation, sleep support, and emotional balance.",
    benefits: [
      "Calms the mind",
      "Reduces stress and anxiety",
      "Promotes better sleep",
      "Supports mental clarity",
      "Deep relaxation",
    ],
    image: "/images/1446.jpg",
  },
  {
    id: 3,
    title: "Uzhichil",
    duration: "40 mins",
    shortDescription: "A deep Ayurvedic massage therapy using medicated oils.",
    details:
      "Uzhichil is an Ayurvedic oil massage that focuses on muscular relaxation, stiffness relief, and improving body flexibility. It is suitable for people with body fatigue and muscle tension.",
    benefits: [
      "Relieves muscle stiffness",
      "Improves flexibility",
      "Enhances circulation",
      "Reduces body fatigue",
      "Supports relaxation",
    ],
    image: "/images/1446.jpg",
  },
  {
    id: 4,
    title: "Head Massage",
    duration: "40 mins",
    shortDescription: "A relaxing scalp and head massage to reduce stress.",
    details:
      "Head Massage focuses on the scalp, head, neck, and upper shoulder area. It helps reduce stress, relieve heaviness, improve relaxation, and refresh the mind.",
    benefits: [
      "Relieves headache and stress",
      "Improves scalp circulation",
      "Reduces mental fatigue",
      "Refreshes the mind",
      "Promotes relaxation",
    ],
    image: "/images/1446.jpg",
  },
  {
    id: 5,
    title: "Foot Reflexology",
    duration: "40 mins",
    shortDescription:
      "A pressure-point foot therapy for relaxation and balance.",
    details:
      "Foot Reflexology applies pressure to specific points on the feet. It helps relax the body, improve energy flow, reduce foot fatigue, and support overall wellness.",
    benefits: [
      "Relieves foot pain",
      "Reduces body stress",
      "Improves relaxation",
      "Supports energy balance",
      "Helps reduce fatigue",
    ],
    image: "/images/1446.jpg",
  },
  {
    id: 6,
    title: "Head & Foot Massage",
    duration: "40 mins",
    shortDescription: "A combined therapy for head and foot relaxation.",
    details:
      "Head & Foot Massage combines scalp relaxation with foot pressure therapy. It is ideal for reducing fatigue, calming the mind, and relaxing the entire body.",
    benefits: [
      "Relaxes head and feet",
      "Reduces stress",
      "Improves blood circulation",
      "Helps with tiredness",
      "Supports better sleep",
    ],
    image: "/images/1446.jpg",
  },
  {
    id: 7,
    title: "Aroma Therapy",
    duration: "45 mins",
    shortDescription:
      "A relaxing therapy using essential oils and gentle massage.",
    details:
      "Aroma Therapy uses natural aromatic oils along with relaxing massage techniques. It helps improve mood, reduce stress, refresh the senses, and support emotional wellbeing.",
    benefits: [
      "Improves mood",
      "Reduces stress",
      "Refreshes senses",
      "Promotes relaxation",
      "Supports emotional balance",
    ],
    image: "/images/1446.jpg",
  },
  {
    id: 8,
    title: "Ksheeradhara",
    duration: "45 mins",
    shortDescription: "A soothing Ayurvedic therapy using medicated milk.",
    details:
      "Ksheeradhara involves the gentle pouring of medicated milk over the body or head. It is known for its cooling, calming, and nourishing effect on the body and mind.",
    benefits: [
      "Cools the body",
      "Calms the mind",
      "Nourishes skin",
      "Reduces stress",
      "Promotes relaxation",
    ],
    image: "/images/1446.jpg",
  },
  {
    id: 9,
    title: "Shirolepa",
    duration: "45 mins",
    shortDescription:
      "Application of herbal paste on the head for cooling and relaxation.",
    details:
      "Shirolepa is an Ayurvedic therapy where a herbal paste is applied over the head. It helps cool the system, relax the mind, reduce stress, and support peaceful sleep.",
    benefits: [
      "Cools the head",
      "Reduces stress",
      "Supports sleep",
      "Relieves mental fatigue",
      "Promotes calmness",
    ],
    image: "/images/1446.jpg",
  },
  {
    id: 10,
    title: "Mukhalepa",
    duration: "45 mins",
    shortDescription:
      "An Ayurvedic herbal facial therapy for skin rejuvenation.",
    details:
      "Mukhalepa is a natural facial therapy using herbal paste. It helps cleanse, nourish, refresh, and rejuvenate the skin while giving a cooling and relaxing experience.",
    benefits: [
      "Rejuvenates skin",
      "Improves skin freshness",
      "Cleanses naturally",
      "Nourishes the face",
      "Gives cooling effect",
    ],
    image: "/images/1446.jpg",
  },
  {
    id: 11,
    title: "Chlorophyll Body Wrap",
    duration: "90 mins",
    shortDescription:
      "A body wrap therapy for detoxification and skin nourishment.",
    details:
      "Chlorophyll Body Wrap is a relaxing body therapy that helps detoxify, refresh, and nourish the skin. It supports relaxation while improving the overall feel of the skin.",
    benefits: [
      "Helps detoxify skin",
      "Nourishes the body",
      "Refreshes skin texture",
      "Promotes relaxation",
      "Supports rejuvenation",
    ],
    image: "/images/1446.jpg",
  },
];

export default function RelaxationTherapies() {
  const [selectedTherapy, setSelectedTherapy] = useState(null);

  return (
    <>
      <section className="py-20 bg-white relative overflow-hidden">
        <div className=" mx-auto px-4 md:px-6">
          <RevealOnScroll className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl md:text-4xl font-bold text-[#1f1a17] font-primary mb-6">
              Unveil Inner Peace
            </h2>
            <p className="text-[#5e5751] text-lg leading-relaxed">
              Elevate Your Mind, Rejuvenate Your Soul, and Radiate Beauty with
              Our Blissful Blend of Ayurveda Therapies, Beauty Treatments, and
              Hair Care.
            </p>
            <div className="mx-auto mt-8 h-[3px] w-20 rounded-full bg-[#c29a2f]" />
          </RevealOnScroll>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {therapies.map((therapy, index) => (
              <motion.div
                key={therapy.id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: (index % 2) * 0.1 }}
                className="group relative h-[380px] md:h-[320px] rounded-[40px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.07)] transition-all duration-500 hover:shadow-[0_30px_80px_rgba(0,0,0,0.12)] hover:-translate-y-2 bg-white"
              >
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <Image
                    src={therapy.image}
                    alt={therapy.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/10" />
                </div>

                {/* Glassy Content Panel */}
                <div className="absolute top-4 bottom-4 right-4 left-[30%] md:left-[40%] lg:left-[45%] rounded-[32px] bg-white/40 backdrop-blur-md p-6 md:p-8 flex flex-col justify-between shadow-[0_8px_32px_rgba(0,0,0,0.15)] border border-white/60">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#1f1a17] mb-2 font-primary">
                      {therapy.title}
                    </h3>
                    <p className="text-[#5e5751] text-xs md:text-sm leading-relaxed mb-4 line-clamp-3">
                      {therapy.shortDescription}
                    </p>
                    <div className="text-[#c29a2f] font-bold text-sm md:text-base uppercase tracking-widest">
                      {therapy.duration}
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      onClick={() => setSelectedTherapy(therapy)}
                      className="w-full bg-[#c29a2f] text-white px-6 py-3.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:bg-[#a88528] hover:shadow-[0_10px_20px_rgba(194,154,47,0.3)] active:scale-95 text-center"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedTherapy && (
          <TherapyModal
            therapy={selectedTherapy}
            onClose={() => setSelectedTherapy(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

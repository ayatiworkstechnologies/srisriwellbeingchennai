"use client";

import { motion } from "framer-motion";
// removed react-icons

const testimonials = [
  {
    name: "Priya S.",
    review:
      "The Nadi Pariksha consultation was eye-opening. The doctors accurately pinpointed my digestive issues and the tailored Ayurvedic diet transformed my health within weeks.",
    rating: 5,
  },
  {
    name: "Ramesh K.",
    review:
      "I've been to many spas and wellness centers, but the authenticity and serene ambiance here is unmatched. The stress relief therapies are truly a lifesaver for my corporate lifestyle.",
    rating: 5,
  },
  {
    name: "Anita M.",
    review:
      "Exceptional care and truly personalized treatments. The staff goes above and beyond to make you feel comfortable and understood. Highly recommend for chronic joint pain.",
    rating: 5,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6 } },
};

export default function CampaignTestimonials() {
  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-[#D4AF37] font-semibold tracking-widest uppercase text-sm mb-3">
            Client Stories
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-[#35140b] font-primary mb-6">
            Healing Journeys That Inspire
          </h3>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-[#f5f2ec] rounded-2xl p-8 relative border border-transparent hover:border-[#D4AF37]/20 transition-all duration-300"
            >
              <div className="flex gap-1 mb-4 text-[#D4AF37] text-xl items-center">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>

              <p className="text-[#4b1f12]/80 leading-relaxed mb-6 italic">
                {` " ${testimonial.review} "`}
              </p>

              <div className="flex items-center gap-4 mt-auto">
                <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center font-bold text-[#35140b] font-primary">
                  {testimonial.name.charAt(0)}
                </div>
                <span className="font-bold text-[#35140b]">
                  {testimonial.name}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <button
            onClick={() => {
              const el = document.getElementById("lead-form");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex h-14 items-center justify-center gap-3 rounded-full bg-[#35140b] px-8 text-lg font-bold tracking-wide text-white transition-all duration-300 hover:-translate-y-1 hover:bg-black hover:shadow-[0_10px_20px_rgba(53,20,11,0.3)]"
          >
            Start Your Journey
          </button>
        </motion.div>
      </div>
    </section>
  );
}

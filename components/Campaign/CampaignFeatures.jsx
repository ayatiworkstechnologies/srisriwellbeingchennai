"use client";

import { motion } from "framer-motion";
// removed react-icons

const features = [
  {
    icon: "🩺",
    title: "Expert Nadi Pariksha",
    description: "Our experienced Vaidyas perform precise pulse diagnosis to identify the root cause of your ailments rather than just treating symptoms."
  },
  {
    icon: "🌿",
    title: "100% Authentic Ayurveda",
    description: "We use only pristine, natural herbs and traditional preparations sourced directly from trusted Ayurvedic pharmacies."
  },
  {
    icon: "🤝",
    title: "Personalized Care",
    description: "Every body is unique. We tailor diets, lifestyle recommendations, and treatments specifically to your individual Prakriti (body constitution)."
  },
  {
    icon: "🌸",
    title: "Premium Ambiance",
    description: "Experience treatments in a serene, luxurious environment designed to calm your mind the moment you step in."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function CampaignFeatures() {
  return (
    <section className="py-24 bg-[#f5f2ec] relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#c29a2f]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#4b1f12]/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-[#c29a2f] font-semibold tracking-widest uppercase text-sm mb-3">Why Choose Us</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-[#35140b] font-primary mb-6">
            The Sri Sri Wellbeing Difference
          </h3>
          <p className="text-[#4b1f12]/80 text-lg">
            We blend ancient Ayurvedic wisdom with modern lifestyle understanding to provide holistic healing protocols that truly work.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-[#c29a2f]/10 hover:border-[#c29a2f]/30 relative overflow-hidden"
            >
              {/* Hover gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#c29a2f]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-full bg-[#f5f2ec] flex items-center justify-center text-[#c29a2f] text-2xl mb-6 group-hover:scale-110 group-hover:bg-[#c29a2f] group-hover:text-white transition-all duration-300 shadow-sm">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold text-[#35140b] mb-3 font-primary">{feature.title}</h4>
                <p className="text-[#4b1f12]/70 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
// removed react-icons

export default function CampaignHero() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "https://api.ayatiworks.com/api/v1/public/srisriwelbeing-chennai/sri_sri_campain/records",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-API-Key":
              "cdbdf7f07d5395cdeac637f9c65d2925d04cf5cdd7a7d6a93f892daed491c46a",
          },
          body: JSON.stringify({ data: formData }),
        },
      );

      if (response.ok) {
        router.push("/ayurvedic-spa/thank-you");
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const leadFormCard = (
    <div className="rounded-2xl border border-black/5 bg-white p-5 md:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.08)] relative overflow-hidden">
      <h3 className="text-2xl font-bold text-[#1f1a17] mb-2 font-primary">
        Book Your Consultation
      </h3>
      <p className="text-[#5e5751] mb-6 text-sm">
        Take the first step towards your holistic healing journey.
      </p>

      <form
        className="flex flex-col gap-3 relative z-10"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#5e5751] ml-1">
              Full Name
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full h-11 rounded-xl border border-gray-200 bg-[#f8f6f1] px-4 text-[#1f1a17] placeholder:text-gray-400 focus:border-[#c29a2f] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#c29a2f] transition-all text-sm"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#5e5751] ml-1">
              Phone Number
            </label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 99430 13111"
              className="w-full h-11 rounded-xl border border-gray-200 bg-[#f8f6f1] px-4 text-[#1f1a17] placeholder:text-gray-400 focus:border-[#c29a2f] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#c29a2f] transition-all text-sm"
              required
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-[#5e5751] ml-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className="w-full h-11 rounded-xl border border-gray-200 bg-[#f8f6f1] px-4 text-[#1f1a17] placeholder:text-gray-400 focus:border-[#c29a2f] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#c29a2f] transition-all text-sm"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-[#5e5751] ml-1">
            Select Service
          </label>
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full h-11 rounded-xl border border-gray-200 bg-[#f8f6f1] px-4 text-[#1f1a17] focus:border-[#c29a2f] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#c29a2f] transition-all appearance-none text-sm"
            required
          >
            <option value="" disabled className="text-gray-400">
              Select an authentic spa service...
            </option>
            <option value="nadi-pariksha">Nadi Pariksha</option>
            <option value="panchakarma">Panchakarma Rituals</option>
            <option value="marma-therapy">Marma Therapy</option>
            <option value="osteopathic">Osteopathic Therapy</option>
            <option value="ozone">Ozone Therapy</option>
            <option value="meru">Meru Therapy</option>
            <option value="craniosacral">Craniosacral Therapy</option>
            <option value="pain-management">Pain Management Therapies</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-[#5e5751] ml-1">
            Your Message (Optional)
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="How can we help you?"
            rows="2"
            className="w-full rounded-xl border border-gray-200 bg-[#f8f6f1] px-4 py-2 text-[#1f1a17] placeholder:text-gray-400 focus:border-[#c29a2f] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#c29a2f] transition-all resize-none text-sm"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="group relative mt-2 w-full overflow-hidden rounded-full border border-[#c29a2f] bg-transparent py-4 text-sm font-bold uppercase tracking-widest text-[#c29a2f] transition-all duration-300 hover:text-white active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="absolute inset-0 z-0 translate-y-full bg-[#c29a2f] transition-transform duration-300 ease-out group-hover:translate-y-0" />
          <span className="relative z-10">
            {loading ? "Submitting..." : "Request Appointment"}
          </span>
        </button>
      </form>
    </div>
  );

  return (
    <>
      <section className="relative min-h-screen w-full overflow-hidden bg-[#f8f6f1] flex items-center pt-28 pb-10 md:pt-32 md:pb-12 lg:pt-32 lg:pb-12">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <div className="hidden md:block absolute inset-0">
            <Image
              src="/images/ayurveda-banner.png"
              alt="Ayurvedic Spa Campaign Hero Desktop"
              fill
              priority
              className="object-cover object-center"
            />
          </div>
          <div className="block md:hidden absolute inset-0">
            <Image
              src="/images/ayurveda-banner-mob.png"
              alt="Ayurvedic Spa Campaign Hero Mobile"
              fill
              priority
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10" />
          </div>
          {/* Cinematic Vignette (Top and Bottom Black Gradients) */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50 z-10" />
          <div className="absolute inset-0 bg-white/5 z-20" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-20 flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 lg:gap-8 mt-4 md:mt-12 lg:mt-0">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full lg:w-[55%] flex flex-col justify-center text-left"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-[2rem] md:text-6xl lg:text-7xl font-bold leading-[1.1] text-white mb-4 md:mb-6 font-primary drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]"
            >
              Awaken Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c29a2f] via-[#c29a2f] to-[#c29a2f] italic font-light pr-4">
                Deepest Vitality
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-base md:text-xl lg:text-2xl leading-relaxed text-white/90 mb-6 md:mb-10 max-w-[650px] font-light drop-shadow-md"
            >
              Step into a sanctuary of stillness in Chennai. Our master Vaidyas
              blend ancient wisdom with pristine, natural therapies to restore
              your body, mind, and spirit.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 md:gap-6 items-start sm:items-center"
            >
              <button
                onClick={() => {
                  const el = document.getElementById("contact-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="group relative overflow-hidden rounded-full border border-[#c29a2f] bg-transparent px-8 py-4 text-sm md:text-base font-bold uppercase tracking-widest text-[#c29a2f] transition-all duration-300 hover:text-white active:scale-95 w-full sm:w-auto"
              >
                <span className="absolute inset-0 z-0 translate-y-full bg-[#c29a2f] transition-transform duration-300 ease-out group-hover:translate-y-0" />
                <span className="relative z-10">Claim Offer</span>
              </button>

              <div className="flex items-center gap-4 text-white px-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#c29a2f]/20 text-[#c29a2f] font-bold text-xl shadow-[0_0_15px_rgba(194,154,47,0.3)]">
                  ✓
                </span>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">
                    Trusted by 5000+ Customers
                  </span>
                  <span className="text-xs text-white/60 uppercase tracking-widest">
                    in Chennai
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block w-full lg:w-[420px] xl:w-[450px] shrink-0"
            id="lead-form-desktop"
          >
            {leadFormCard}
          </motion.div>
        </div>
      </section>

      {/* Mobile Form Section */}
      <section
        className="block lg:hidden w-full bg-[#f8f6f1] py-12 px-4"
        id="lead-form-mobile"
      >
        <div className="container mx-auto max-w-md">{leadFormCard}</div>
      </section>
    </>
  );
}

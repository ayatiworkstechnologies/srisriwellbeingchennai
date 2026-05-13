"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaLocationDot, FaPhone, FaEnvelope, FaClock } from "react-icons/fa6";
import RevealOnScroll from "@/components/Main/RevealOnScroll";

export default function AuthenticSpaContact() {
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
            "X-API-Key": "cdbdf7f07d5395cdeac637f9c65d2925d04cf5cdd7a7d6a93f892daed491c46a",
          },
          body: JSON.stringify({ data: formData }),
        }
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
  return (
    <section
      id="contact-section"
      className="section-padding relative overflow-hidden bg-[#f5f2ec]"
    >
      {/* Background pattern */}
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/images/bg.svg"
          alt="Background pattern"
          fill
          className="object-cover"
        />
      </div>

      {/* Radial glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-5%] top-[20%] h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(200,160,50,0.06),transparent_60%)]" />
        <div className="absolute bottom-[10%] right-[-3%] h-[350px] w-[350px] rounded-full bg-[radial-gradient(circle,rgba(200,160,50,0.04),transparent_60%)]" />
      </div>

      {/* Top accent line */}
      <div className="absolute left-0 right-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-[#c29a2f]/25 to-transparent" />

      <div className="relative z-10 mx-auto w-[min(1320px,calc(100%-24px))] md:w-[min(1320px,calc(100%-40px))]">
        {/* Section Header */}
        <RevealOnScroll className="title-center mb-12 md:mb-16">
          <p className="eyebrow-text mb-3 text-[#c29a2f]">
            Begin Your Journey
          </p>
          <h2 className="section-title text-[#1f1a17]">
            Visit Our Sanctuary
          </h2>
          <div className="mx-auto mt-6 h-[3px] w-[72px] rounded-full bg-gradient-to-r from-[#c29a2f] to-[#c29a2f]" />
        </RevealOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Left Side – Address & Location */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col"
          >
            <div className="flex-1 rounded-[22px] bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)] md:p-10">
              {/* Logo + Title */}
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-[#f6f3ee]">
                  <Image
                    src="/logo.svg"
                    alt="Sri Sri Wellbeing"
                    width={56}
                    height={56}
                    className="h-10 w-10 object-contain"
                  />
                </div>
                <div>
                  <h3 className="section-subtitle text-[#1f1a17]">
                    Sri Sri Wellbeing
                  </h3>
                  <p className="small-text text-[#c29a2f] font-semibold tracking-wider uppercase">
                    Chennai
                  </p>
                </div>
              </div>

              <div className="space-y-6 text-[#5e5751]">
                {/* Address */}
                <div className="group flex items-start gap-4 rounded-2xl bg-[#faf8f3] p-5 transition-all duration-300 hover:shadow-[0_6px_20px_rgba(0,0,0,0.04)]">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#c29a2f] to-[#c29a2f] text-white shadow-sm">
                    <FaLocationDot className="text-[16px]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#1f1a17] mb-1">Address</p>
                    <p className="small-text leading-relaxed">
                      Mruthunjaya Ayur, New Avadi Rd,
                      <br />
                      Alagappa Nagar, Kilpauk,
                      <br />
                      Chennai, Tamil Nadu 600010
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="group flex items-start gap-4 rounded-2xl bg-[#faf8f3] p-5 transition-all duration-300 hover:shadow-[0_6px_20px_rgba(0,0,0,0.04)]">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#c29a2f] to-[#c29a2f] text-white shadow-sm">
                    <FaPhone className="text-[14px]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#1f1a17] mb-1">Phone</p>
                    <a
                      href="tel:+919943013111"
                      className="small-text transition-colors hover:text-[#c29a2f]"
                    >
                      +91 99430 13111
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="group flex items-start gap-4 rounded-2xl bg-[#faf8f3] p-5 transition-all duration-300 hover:shadow-[0_6px_20px_rgba(0,0,0,0.04)]">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#c29a2f] to-[#c29a2f] text-white shadow-sm">
                    <FaEnvelope className="text-[14px]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#1f1a17] mb-1">Email</p>
                    <a
                      href="mailto:chennai.reception@srisritattva.com"
                      className="small-text transition-colors hover:text-[#c29a2f]"
                    >
                      chennai.reception@srisritattva.com
                    </a>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="group flex items-start gap-4 rounded-2xl bg-[#faf8f3] p-5 transition-all duration-300 hover:shadow-[0_6px_20px_rgba(0,0,0,0.04)]">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#c29a2f] to-[#c29a2f] text-white shadow-sm">
                    <FaClock className="text-[14px]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#1f1a17] mb-1">
                      Availability
                    </p>
                    <p className="small-text">Open daily by appointment</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side – Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col"
          >
            <div className="flex-1 rounded-[22px] bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)] md:p-10 relative overflow-hidden">
              {/* Decorative dots */}
              <div
                className="pointer-events-none absolute right-4 top-4 hidden h-[80px] w-[80px] opacity-[0.05] md:block"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, #c29a2f 1.5px, transparent 1.5px)",
                  backgroundSize: "12px 12px",
                }}
              />
              {/* Left accent bar */}
              <div className="absolute left-0 top-0 hidden h-full w-[4px] md:block bg-gradient-to-b from-[#c29a2f]/40 via-[#c29a2f] to-[#c29a2f]/40" />

              <div className="relative z-10">
                <div className="mb-2 flex items-center gap-3">
                  <span className="eyebrow-text text-[#c29a2f]">
                    Book Now
                  </span>
                  <span className="h-px flex-1 max-w-[40px] bg-[#c29a2f]/40" />
                </div>

                <h3 className="section-subtitle mb-1 text-[#1f1a17]">
                  Book Your Consultation
                </h3>
                <p className="small-text text-[#6b6158] mb-6">
                  Take the first step towards your holistic healing journey.
                </p>

                <div className="mt-3 h-[2.5px] w-12 rounded-full bg-gradient-to-r from-[#c29a2f] to-[#c29a2f] mb-6" />

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#6b6158] ml-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full h-12 rounded-2xl border border-[#eee7de] bg-[#faf8f3] px-4 text-[#1f1a17] placeholder:text-[#b5ab9e] focus:border-[#c29a2f] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#c29a2f]/30 transition-all text-sm"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#6b6158] ml-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 99430 13111"
                        className="w-full h-12 rounded-2xl border border-[#eee7de] bg-[#faf8f3] px-4 text-[#1f1a17] placeholder:text-[#b5ab9e] focus:border-[#c29a2f] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#c29a2f]/30 transition-all text-sm"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#6b6158] ml-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full h-12 rounded-2xl border border-[#eee7de] bg-[#faf8f3] px-4 text-[#1f1a17] placeholder:text-[#b5ab9e] focus:border-[#c29a2f] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#c29a2f]/30 transition-all text-sm"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#6b6158] ml-1">
                      Select Service
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full h-12 rounded-2xl border border-[#eee7de] bg-[#faf8f3] px-4 text-[#1f1a17] focus:border-[#c29a2f] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#c29a2f]/30 transition-all appearance-none text-sm"
                      required
                    >
                      <option value="" disabled className="text-[#b5ab9e]">
                        Select an authentic spa service...
                      </option>
                      <option value="nadi-pariksha">Nadi Pariksha</option>
                      <option value="panchakarma">Panchakarma Rituals</option>
                      <option value="marma-therapy">Marma Chikitsa</option>
                      <option value="osteopathic">Osteopathic Therapy</option>
                      <option value="ozone">Ozone Therapy</option>
                      <option value="meru">Meru Therapy</option>
                      <option value="craniosacral">Craniosacral Therapy</option>
                      <option value="pain-management">
                        Pain Management Therapies
                      </option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#6b6158] ml-1">
                      Your Message (Optional)
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      rows="3"
                      className="w-full rounded-2xl border border-[#eee7de] bg-[#faf8f3] px-4 py-3 text-[#1f1a17] placeholder:text-[#b5ab9e] focus:border-[#c29a2f] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#c29a2f]/30 transition-all resize-none text-sm"
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
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c29a2f]/25 to-transparent" />
    </section>
  );
}

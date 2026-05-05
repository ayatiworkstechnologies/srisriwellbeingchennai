"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaTimes, FaLeaf, FaClock, FaUser, FaPhone, FaEnvelope, FaCalendarAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import WellnessButton from "../layouts/WellnessButton";

export default function ServiceModal({ service, onClose }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  if (!service || !mounted) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative my-auto flex w-full max-w-5xl flex-col overflow-hidden rounded-[32px] bg-white shadow-2xl lg:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-all hover:bg-white hover:text-[#3b2218]"
        >
          <FaTimes size={20} />
        </button>

        {/* Modal Left Side (Content) */}
        <div className="relative w-full bg-[#f8f6f2] lg:w-1/2">
          <div className="relative h-64 w-full lg:h-72">
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <h3 className="absolute bottom-6 left-8 text-3xl font-bold text-white">
              {service.title}
            </h3>
          </div>
          
          <div className="p-8 md:p-10">
            <div className="mt-2 space-y-6">
              <p className="text-[15px] leading-relaxed text-[#5c544f]">
                {service.fullDesc || service.desc}
              </p>
              
              {service.benefits && (
                <div className="rounded-2xl bg-white p-6 border border-[#e2dcd0] shadow-sm">
                  <h4 className="font-bold text-[#1f1a17] text-[14px] uppercase tracking-wider mb-4">
                    Key Benefits
                  </h4>
                  <ul className="grid grid-cols-1 gap-3">
                    {service.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3 text-[13px] text-[#5c544f]">
                        <FaLeaf className="text-[#c29a2f] mt-0.5 shrink-0" size={12} />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Right Side (Form) */}
        <div className="flex w-full flex-col justify-center bg-white p-8 md:p-10 lg:w-1/2">
          <div className="mb-8">
            <h4 className="text-2xl font-bold text-[#1f1a17]">
              Enquire Now
            </h4>
            <p className="mt-2 text-sm text-[#7a726c]">
              Leave your details below and our experts will contact you shortly to discuss your <strong className="text-[#c29a2f]">{service.title}</strong> session.
            </p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c29a2f]">
                <FaUser size={14} />
              </div>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full rounded-full border border-black/10 bg-[#f8f6f1] py-3 pl-11 pr-6 text-sm text-[#1f1a17] outline-none transition-all focus:border-[#c29a2f] focus:bg-white focus:ring-1 focus:ring-[#c29a2f]"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c29a2f]">
                <FaPhone size={14} />
              </div>
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full rounded-full border border-black/10 bg-[#f8f6f1] py-3 pl-11 pr-6 text-sm text-[#1f1a17] outline-none transition-all focus:border-[#c29a2f] focus:bg-white focus:ring-1 focus:ring-[#c29a2f]"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c29a2f]">
                <FaEnvelope size={14} />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full rounded-full border border-black/10 bg-[#f8f6f1] py-3 pl-11 pr-6 text-sm text-[#1f1a17] outline-none transition-all focus:border-[#c29a2f] focus:bg-white focus:ring-1 focus:ring-[#c29a2f]"
              />
            </div>

            <div className="relative">
              <textarea
                placeholder="How can we help you?"
                rows={3}
                className="w-full rounded-[20px] border border-black/10 bg-[#f8f6f1] py-3 px-6 text-sm text-[#1f1a17] outline-none transition-all focus:border-[#c29a2f] focus:bg-white focus:ring-1 focus:ring-[#c29a2f]"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-[#3b2218] text-white py-3.5 rounded-full font-bold uppercase tracking-widest text-[13px] transition-all duration-300 hover:bg-[#c29a2f] hover:shadow-[0_10px_20px_rgba(59,34,24,0.2)] active:scale-95 mt-4"
            >
              Submit Enquiry
            </button>
          </form>
          
          <p className="mt-6 text-[12px] text-[#8c8c8c] text-center italic">
            * Our team usually responds within 24 hours.
          </p>
        </div>
      </motion.div>
    </div>,
    document.body
  );
}

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaTimes, FaClock, FaCalendarAlt, FaUser, FaPhone, FaEnvelope, FaLeaf } from "react-icons/fa";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function TherapyModal({ therapy, onClose }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Prevent scrolling on body when modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  if (!therapy || !mounted) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm"
      onClick={onClose}
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 backdrop-blur-md text-[#1f1a17] transition-all duration-300 hover:bg-[#c29a2f] hover:text-white shadow-sm"
        >
          <FaTimes className="text-lg" />
        </button>

        {/* Therapy Details Side */}
        <div className="w-full lg:w-1/2 relative bg-[#f8f6f1]">
          <div className="relative h-64 lg:h-72 w-full">
            <Image
              src={therapy.image}
              alt={therapy.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1f1a17]/80 to-transparent" />
            <h3 className="absolute bottom-6 left-8 text-3xl font-bold text-white font-primary">
              {therapy.title}
            </h3>
          </div>
          
          <div className="p-8">
            <div className="flex items-center gap-2 text-[#c29a2f] font-bold text-sm uppercase tracking-widest mb-6 bg-white w-fit px-4 py-1.5 rounded-full shadow-sm">
              <FaClock />
              <span>{therapy.duration}</span>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-bold text-[#1f1a17] uppercase tracking-widest mb-2">
                Overview
              </h4>
              <p className="text-[#5e5751] leading-relaxed">
                {therapy.details}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-bold text-[#1f1a17] uppercase tracking-widest mb-2">
                Key Benefits
              </h4>
              <ul className="text-[#5e5751] leading-relaxed bg-white p-4 rounded-2xl shadow-sm border border-black/5 space-y-2">
                {therapy.benefits?.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <FaLeaf className="text-[#c29a2f] mt-1 shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Booking Form Side */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center bg-white">
          <div className="mb-8">
            <h4 className="text-2xl font-bold text-[#1f1a17] mb-2 font-primary">
              Book Your Session
            </h4>
            <p className="text-[#7a726c] text-sm">
              Fill out the form below to request an appointment for <strong className="text-[#c29a2f]">{therapy.title}</strong>.
            </p>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c29a2f]">
                  <FaUser />
                </div>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full rounded-full border border-black/10 bg-[#f8f6f1] py-3.5 pl-12 pr-6 text-sm text-[#1f1a17] outline-none transition-all focus:border-[#c29a2f] focus:bg-white focus:ring-1 focus:ring-[#c29a2f]"
                  required
                />
              </div>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c29a2f]">
                  <FaPhone />
                </div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full rounded-full border border-black/10 bg-[#f8f6f1] py-3.5 pl-12 pr-6 text-sm text-[#1f1a17] outline-none transition-all focus:border-[#c29a2f] focus:bg-white focus:ring-1 focus:ring-[#c29a2f]"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c29a2f]">
                <FaEnvelope />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full rounded-full border border-black/10 bg-[#f8f6f1] py-3.5 pl-12 pr-6 text-sm text-[#1f1a17] outline-none transition-all focus:border-[#c29a2f] focus:bg-white focus:ring-1 focus:ring-[#c29a2f]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c29a2f]">
                  <FaCalendarAlt />
                </div>
                <input
                  type="date"
                  className="w-full rounded-full border border-black/10 bg-[#f8f6f1] py-3.5 pl-12 pr-6 text-sm text-[#1f1a17] outline-none transition-all focus:border-[#c29a2f] focus:bg-white focus:ring-1 focus:ring-[#c29a2f]"
                  required
                />
              </div>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c29a2f]">
                  <FaClock />
                </div>
                <input
                  type="time"
                  className="w-full rounded-full border border-black/10 bg-[#f8f6f1] py-3.5 pl-12 pr-6 text-sm text-[#1f1a17] outline-none transition-all focus:border-[#c29a2f] focus:bg-white focus:ring-1 focus:ring-[#c29a2f]"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <textarea
                placeholder="Any specific health concerns or requests?"
                rows={3}
                className="w-full rounded-[24px] border border-black/10 bg-[#f8f6f1] py-4 px-6 text-sm text-[#1f1a17] outline-none transition-all focus:border-[#c29a2f] focus:bg-white focus:ring-1 focus:ring-[#c29a2f]"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-[#c29a2f] text-white py-4 rounded-full font-bold uppercase tracking-widest transition-all duration-300 hover:bg-[#a88528] hover:shadow-[0_10px_20px_rgba(194,154,47,0.3)] active:scale-95 mt-4"
            >
              Confirm Booking Request
            </button>
          </form>
        </div>
      </motion.div>
    </div>,
    document.body
  );
}

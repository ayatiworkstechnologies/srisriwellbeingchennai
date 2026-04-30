"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { FaCalendarAlt, FaClock, FaEnvelope, FaLeaf, FaPhone, FaTimes, FaUser } from "react-icons/fa";

import { apiRequest } from "@/lib/api";

const initialForm = {
  customer_name: "",
  phone: "",
  email: "",
  booking_date: "",
  therapist_id: "",
  start_time: "",
  end_time: "",
  notes: "",
};

export default function TherapyModal({ therapy, onClose }) {
  const portalTarget = typeof document === "undefined" ? null : document.body;
  const therapyName = therapy?.title ?? therapy?.name ?? "";
  const [form, setForm] = useState(initialForm);
  const [slots, setSlots] = useState([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successBooking, setSuccessBooking] = useState(null);

  useEffect(() => {
    if (!therapy) return undefined;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [therapy]);

  useEffect(() => {
    if (!therapyName) return;

    const initialDate = buildDateOptions()[0] || "";
    setForm((current) => ({ ...current, booking_date: current.booking_date || initialDate }));
  }, [therapyName]);

  useEffect(() => {
    if (!therapyName || !form.booking_date) return;

    let isCancelled = false;
    const loadSlots = async () => {
      setIsLoadingSlots(true);
      setErrorMessage("");
      try {
        const result = await apiRequest(`/api/v1/public/therapy-availability?therapy_name=${encodeURIComponent(therapyName)}&booking_date=${form.booking_date}`);
        if (!isCancelled) {
          setSlots(result || []);
          setForm((current) => {
            const nextSlot = result[0] || null;
            return {
              ...current,
              therapist_id: nextSlot ? nextSlot.therapist_id.toString() : "",
              start_time: nextSlot ? nextSlot.start_time : "",
              end_time: nextSlot ? nextSlot.end_time : "",
            };
          });
        }
      } catch (error) {
        if (!isCancelled) {
          setSlots([]);
          setErrorMessage(error.message || "Unable to load therapy slots");
        }
      } finally {
        if (!isCancelled) {
          setIsLoadingSlots(false);
        }
      }
    };

    loadSlots();
    return () => {
      isCancelled = true;
    };
  }, [therapyName, form.booking_date]);

  const availableDates = useMemo(() => buildDateOptions(), []);
  const availableSlots = useMemo(() => slots, [slots]);

  if (!therapy || !portalTarget) return null;

  const handleDateChange = (value) => {
    setForm((current) => ({
      ...current,
      booking_date: value,
      therapist_id: "",
      start_time: "",
      end_time: "",
    }));
  };

  const handleSlotChange = (value) => {
    const nextSlot = availableSlots.find((slot) => `${slot.therapist_id}|${slot.start_time}|${slot.end_time}` === value);
    setForm((current) => ({
      ...current,
      therapist_id: nextSlot ? nextSlot.therapist_id.toString() : "",
      start_time: nextSlot ? nextSlot.start_time : "",
      end_time: nextSlot ? nextSlot.end_time : "",
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    try {
      const result = await apiRequest("/api/v1/public/bookings", {
        method: "POST",
        body: JSON.stringify({
          therapy_name: therapyName,
          customer_name: form.customer_name,
          phone: form.phone,
          email: form.email,
          therapist_id: Number(form.therapist_id),
          booking_date: form.booking_date,
          slot_id: 0,
          start_time: form.start_time,
          end_time: form.end_time,
          notes: form.notes || null,
        }),
      });
      setSuccessBooking(result);
      setForm(initialForm);
    } catch (error) {
      setErrorMessage(error.message || "Unable to book therapy");
    } finally {
      setIsSubmitting(false);
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm sm:p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        className="relative my-auto flex w-full max-w-5xl flex-col overflow-hidden rounded-[28px] bg-white shadow-2xl lg:flex-row"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-[#1f1a17] shadow-sm transition-all duration-300 hover:bg-[#c29a2f] hover:text-white"
        >
          <FaTimes className="text-lg" />
        </button>

        <div className="relative w-full bg-[#f8f6f1] lg:w-1/2">
          <div className="relative h-56 w-full sm:h-64 lg:h-72">
            <Image src={therapy.image} alt={therapyName} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1f1a17]/80 to-transparent" />
            <h3 className="section-title absolute bottom-6 left-8 font-primary text-white">{therapyName}</h3>
          </div>

          <div className="p-5 sm:p-6 lg:p-8">
            <div className="small-text mb-6 flex w-fit items-center gap-2 rounded-full bg-white px-4 py-1.5 uppercase tracking-widest text-[#c29a2f] shadow-sm">
              <FaClock />
              <span>{therapy.duration}</span>
            </div>

            <div className="mb-6">
              <h4 className="section-subtitle mb-2 uppercase tracking-widest text-[#1f1a17]">Overview</h4>
              <p className="para-text text-[#5e5751]">{therapy.details}</p>
            </div>

            <div>
              <h4 className="section-subtitle mb-2 uppercase tracking-widest text-[#1f1a17]">Key Benefits</h4>
              <ul className="space-y-2 rounded-2xl border border-black/5 bg-white p-4 leading-relaxed text-[#5e5751] shadow-sm">
                {therapy.benefits?.map((benefit, index) => (
                  <li key={`${benefit}-${index}`} className="flex items-start gap-2">
                    <FaLeaf className="mt-1 shrink-0 text-[#c29a2f]" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col justify-center bg-white p-5 sm:p-6 lg:w-1/2 lg:p-10 xl:p-12">
          <div className="mb-8">
            <h4 className="section-title mb-2 font-primary text-[#1f1a17]">Book Your Session</h4>
            <p className="small-text text-[#7a726c]">
              Choose an available slot for <strong className="text-[#c29a2f]">{therapyName}</strong>. After booking, you&apos;ll receive a reference code for cancellation support.
            </p>
          </div>

          {successBooking ? (
            <div className="rounded-[28px] border border-[#e7d7b5] bg-[#fbf5e8] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#a47a18]">Booking Requested</p>
              <h5 className="mt-2 text-2xl font-bold text-[#1f1a17]">{successBooking.reference_code}</h5>
              <p className="mt-3 text-sm leading-7 text-[#5f5750]">
                We saved your booking for {successBooking.booking_date} at {successBooking.start_time.slice(0, 5)}. Keep this reference code to cancel later from the AI concierge.
              </p>
              <button
                type="button"
                onClick={() => setSuccessBooking(null)}
                className="mt-5 inline-flex h-11 items-center justify-center rounded-full bg-[#c29a2f] px-6 text-sm font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[#a88528]"
              >
                Book Another Slot
              </button>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={handleSubmit}>
              {errorMessage && <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{errorMessage}</div>}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <IconInput icon={<FaUser />} placeholder="Full Name" value={form.customer_name} onChange={(value) => setForm((current) => ({ ...current, customer_name: value }))} required />
                <IconInput icon={<FaPhone />} placeholder="Phone Number" value={form.phone} onChange={(value) => setForm((current) => ({ ...current, phone: value }))} required />
              </div>

              <IconInput icon={<FaEnvelope />} placeholder="Email Address" type="email" value={form.email} onChange={(value) => setForm((current) => ({ ...current, email: value }))} required />

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <IconSelect
                  icon={<FaCalendarAlt />}
                  value={form.booking_date}
                  onChange={handleDateChange}
                  disabled={availableDates.length === 0}
                  options={availableDates.map((value) => ({ label: value, value }))}
                  placeholder={availableDates.length === 0 ? "No dates available" : "Choose date"}
                />
                <IconSelect
                  icon={<FaClock />}
                  value={form.therapist_id && form.start_time ? `${form.therapist_id}|${form.start_time}|${form.end_time}` : ""}
                  onChange={handleSlotChange}
                  disabled={isLoadingSlots || availableSlots.length === 0}
                  options={availableSlots.map((slot) => ({ label: `${slot.start_time.slice(0, 5)} - ${slot.end_time.slice(0, 5)} | ${slot.therapist_name} (${slot.remaining_capacity} left)`, value: `${slot.therapist_id}|${slot.start_time}|${slot.end_time}` }))}
                  placeholder={isLoadingSlots ? "Loading therapist slots..." : availableSlots.length === 0 ? "No therapist slots" : "Choose time"}
                />
              </div>

              <div className="rounded-[24px] border border-black/10 bg-[#f8f6f1] px-4 py-4">
                <textarea
                  placeholder="Any specific health concerns or requests?"
                  rows={3}
                  value={form.notes}
                  onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))}
                  className="w-full bg-transparent text-sm text-[#1f1a17] outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isLoadingSlots || !form.booking_date || !form.therapist_id || !form.start_time}
                className="mt-4 w-full rounded-full bg-[#c29a2f] py-4 font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-[#a88528] hover:shadow-[0_10px_20px_rgba(194,154,47,0.3)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Saving Booking..." : "Confirm Booking Request"}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>,
    portalTarget
  );
}

function buildDateOptions() {
  const options = [];
  const today = new Date();
  for (let index = 0; index < 14; index += 1) {
    const next = new Date(today);
    next.setDate(today.getDate() + index);
    options.push(next.toISOString().slice(0, 10));
  }
  return options;
}

function IconInput({ icon, onChange, ...props }) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c29a2f]">{icon}</div>
      <input
        {...props}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-full border border-black/10 bg-[#f8f6f1] py-3.5 pl-12 pr-6 text-sm text-[#1f1a17] outline-none transition-all focus:border-[#c29a2f] focus:bg-white focus:ring-1 focus:ring-[#c29a2f]"
      />
    </div>
  );
}

function IconSelect({ icon, options, placeholder, onChange, ...props }) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c29a2f]">{icon}</div>
      <select
        {...props}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-full border border-black/10 bg-[#f8f6f1] py-3.5 pl-12 pr-6 text-sm text-[#1f1a17] outline-none transition-all focus:border-[#c29a2f] focus:bg-white focus:ring-1 focus:ring-[#c29a2f]"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

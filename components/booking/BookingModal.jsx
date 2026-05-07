"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight,
  FaClock,
  FaEnvelope,
  FaPhone,
  FaStar,
  FaTimes,
  FaUser,
} from "react-icons/fa";

import { createBookingAppointment, getBookingAvailability } from "@/lib/api";
import LeafGlyph from "@/components/ui/LeafGlyph";

function formatDateLabel(value) {
  if (!value) return "";
  return new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" }).format(new Date(value));
}

function formatTimeLabel(value) {
  if (!value) return "";
  const [hours, minutes] = value.split(":");
  const date = new Date();
  date.setHours(Number(hours), Number(minutes), 0, 0);
  return new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

export default function BookingModal({ offering, onClose, theme = "gold" }) {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(1);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    notes: "",
    date: "",
  });
  const [availability, setAvailability] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loadingAvailability, setLoadingAvailability] = useState(false);
  const [availabilityError, setAvailabilityError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [successBooking, setSuccessBooking] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const accentClass = theme === "brown" ? "bg-[#3b2218] hover:bg-[#c29a2f]" : "bg-[#c29a2f] hover:bg-[#a88528]";
  const accentTextClass = "text-[#c29a2f]";

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  useEffect(() => {
    if (!formData.date) {
      setAvailability([]);
      setSelectedSlot(null);
      setAvailabilityError("");
      return;
    }

    let active = true;

    async function loadAvailability() {
      setLoadingAvailability(true);
      setAvailabilityError("");
      setSelectedSlot(null);
      try {
        const result = await getBookingAvailability({
          therapyName: offering.title,
          bookingDate: formData.date,
        });
        if (!active) return;
        setAvailability(result || []);
        if (!result || result.length === 0) {
          setAvailabilityError("No slots are available for this date yet. Please try another date or contact the centre.");
        }
      } catch (error) {
        if (!active) return;
        setAvailability([]);
        setAvailabilityError(error.message || "Unable to load availability right now.");
      } finally {
        if (active) {
          setLoadingAvailability(false);
        }
      }
    }

    loadAvailability();

    return () => {
      active = false;
    };
  }, [formData.date, offering.title]);

  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const days = [];

    for (let i = 0; i < firstDay; i += 1) {
      days.push(<div key={`empty-${i}`} className="h-10 w-full" />);
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      const date = new Date(year, month, day);
      const normalizedDate = new Date(date);
      normalizedDate.setHours(0, 0, 0, 0);
      const value = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const isPast = normalizedDate < today;
      const isSelected = formData.date === value;

      days.push(
        <button
          key={value}
          type="button"
          disabled={isPast}
          onClick={() => setFormData((current) => ({ ...current, date: value }))}
          className={`h-10 w-full rounded-full text-sm transition-all ${
            isSelected
              ? "bg-[#c29a2f] font-bold text-white shadow-md"
              : isPast
                ? "cursor-not-allowed text-black/20"
                : "font-medium text-[#1f1a17] hover:bg-white hover:text-[#c29a2f]"
          }`}
        >
          {day}
        </button>
      );
    }

    return days;
  }, [currentMonth, formData.date]);

  if (!mounted || !offering) return null;

  const handleNext = () => {
    setSubmitError("");
    setStep((current) => current + 1);
  };

  const handleBack = () => {
    setSubmitError("");
    setStep((current) => current - 1);
  };

  const handlePreviousMonth = () => {
    const previous = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    const today = new Date();
    if (previous.getFullYear() > today.getFullYear() || (previous.getFullYear() === today.getFullYear() && previous.getMonth() >= today.getMonth())) {
      setCurrentMonth(previous);
    }
  };

  const handleSubmitBooking = async () => {
    if (!selectedSlot) return;

    setIsSubmitting(true);
    setSubmitError("");
    try {
      const result = await createBookingAppointment({
        therapy_name: offering.title,
        customer_name: formData.name,
        phone: formData.phone,
        email: formData.email,
        therapist_id: selectedSlot.therapist_id,
        booking_date: formData.date,
        slot_id: 0,
        start_time: selectedSlot.start_time,
        end_time: selectedSlot.end_time,
        notes: formData.notes || null,
      });
      setSuccessBooking(result);
      setStep(4);
    } catch (error) {
      setSubmitError(error.message || "Unable to complete your booking.");
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
        className="relative my-auto flex min-h-[600px] w-full max-w-5xl flex-col overflow-hidden rounded-[32px] bg-white shadow-2xl lg:flex-row"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-6 top-6 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/10 text-black transition-all hover:bg-black/20 lg:bg-white/20 lg:text-white lg:hover:bg-white lg:hover:text-[#3b2218]"
        >
          <FaTimes size={20} />
        </button>

        {step > 1 && step < 4 && (
          <button
            type="button"
            onClick={handleBack}
            className="absolute left-6 top-6 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#3b2218] shadow-md transition-all hover:bg-[#f8f6f1]"
          >
            <FaArrowLeft size={16} />
          </button>
        )}

        <div className="relative h-64 w-full bg-[#f8f6f2] lg:h-auto lg:w-[45%]">
          <Image src={offering.image} alt={offering.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent lg:from-black/90 lg:via-black/50" />

          <div className="absolute bottom-8 left-8 right-8">
            {step === 1 ? (
              <>
                <h3 className="mb-2 text-3xl font-bold text-white">{offering.title}</h3>
                {offering.duration ? (
                  <div className="mb-3 flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/20 px-3 py-1 text-xs uppercase tracking-widest text-white backdrop-blur-md">
                    <FaClock />
                    <span>{offering.duration}</span>
                  </div>
                ) : null}
                {offering.summary ? <p className="text-sm text-white/80">{offering.summary}</p> : null}
              </>
            ) : (
              <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md">
                <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Booking Summary</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-white/90">
                    <LeafGlyph className="h-4 w-4" />
                    {offering.title}
                  </li>
                  {selectedSlot ? (
                    <li className="text-sm text-white/90">
                      {formatDateLabel(formData.date)} | {formatTimeLabel(selectedSlot.start_time)}
                    </li>
                  ) : null}
                </ul>
                {step >= 3 ? (
                  <div className="mt-4 border-t border-white/20 pt-4">
                    <p className="mb-1 text-xs uppercase tracking-wider text-white/80">Guest</p>
                    <p className="text-sm font-medium text-white">{formData.name || "Pending..."}</p>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>

        <div className="relative flex w-full flex-col overflow-y-auto bg-white p-8 md:p-10 lg:w-[55%]">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="details"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex h-full flex-col"
              >
                <h4 className="mb-6 text-2xl font-bold text-[#1f1a17]">Therapy Details</h4>
                <div className="flex-1 space-y-6">
                  <p className="text-[15px] leading-relaxed text-[#5c544f]">{offering.description}</p>
                  {offering.benefits?.length ? (
                    <div className="rounded-2xl border border-black/5 bg-[#f8f6f1] p-6">
                      <h4 className="mb-4 text-[14px] font-bold uppercase tracking-wider text-[#1f1a17]">Key Benefits</h4>
                      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {offering.benefits.map((benefit) => (
                          <li key={benefit} className="flex items-start gap-3 text-[13px] text-[#5c544f]">
                            <LeafGlyph className="mt-0.5 h-4 w-4 shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  <div className="mt-4 flex items-center gap-4 border-t border-black/5 pt-6">
                    <div className="flex text-[#c29a2f]">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </div>
                    <p className="text-sm font-medium text-[#7a726c]">
                      4.9/5 <span className="font-normal">(124+ Reviews)</span>
                    </p>
                  </div>
                </div>
                <div className="mt-8 border-t border-black/5 pt-6">
                  <button
                    type="button"
                    onClick={handleNext}
                    className={`w-full rounded-full py-4 text-[13px] font-bold uppercase tracking-widest text-white transition-all duration-300 ${accentClass}`}
                  >
                    Proceed to Details
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.form
                key="personal"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex h-full flex-col"
                onSubmit={(event) => {
                  event.preventDefault();
                  handleNext();
                }}
              >
                <h4 className="mb-2 mt-8 text-2xl font-bold text-[#1f1a17] lg:mt-0">Personal Details</h4>
                <p className="mb-8 text-sm text-[#7a726c]">Please provide your details so we can confirm your booking.</p>
                <div className="flex-1 space-y-5">
                  <div className="relative">
                    <div className={`absolute left-4 top-1/2 -translate-y-1/2 ${accentTextClass}`}>
                      <FaUser size={14} />
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))}
                      className="w-full rounded-full border border-black/10 bg-[#f8f6f1] py-3.5 pl-11 pr-6 text-sm text-[#1f1a17] outline-none transition-all focus:border-[#c29a2f] focus:bg-white"
                    />
                  </div>
                  <div className="relative">
                    <div className={`absolute left-4 top-1/2 -translate-y-1/2 ${accentTextClass}`}>
                      <FaPhone size={14} />
                    </div>
                    <input
                      type="tel"
                      required
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(event) => setFormData((current) => ({ ...current, phone: event.target.value }))}
                      className="w-full rounded-full border border-black/10 bg-[#f8f6f1] py-3.5 pl-11 pr-6 text-sm text-[#1f1a17] outline-none transition-all focus:border-[#c29a2f] focus:bg-white"
                    />
                  </div>
                  <div className="relative">
                    <div className={`absolute left-4 top-1/2 -translate-y-1/2 ${accentTextClass}`}>
                      <FaEnvelope size={14} />
                    </div>
                    <input
                      type="email"
                      required
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
                      className="w-full rounded-full border border-black/10 bg-[#f8f6f1] py-3.5 pl-11 pr-6 text-sm text-[#1f1a17] outline-none transition-all focus:border-[#c29a2f] focus:bg-white"
                    />
                  </div>
                  <textarea
                    placeholder="Any specific health concerns? (Optional)"
                    rows={3}
                    value={formData.notes}
                    onChange={(event) => setFormData((current) => ({ ...current, notes: event.target.value }))}
                    className="w-full rounded-[20px] border border-black/10 bg-[#f8f6f1] px-6 py-3.5 text-sm text-[#1f1a17] outline-none transition-all focus:border-[#c29a2f] focus:bg-white"
                  />
                </div>
                <div className="mt-auto pt-6">
                  <button type="submit" className={`w-full rounded-full py-4 text-[13px] font-bold uppercase tracking-widest text-white transition-all duration-300 ${accentClass}`}>
                    Choose Date & Time
                  </button>
                </div>
              </motion.form>
            )}

            {step === 3 && (
              <motion.div
                key="availability"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex h-full flex-col"
              >
                <h4 className="mb-2 mt-8 text-2xl font-bold text-[#1f1a17] lg:mt-0">Select Slot</h4>
                <p className="mb-6 text-sm text-[#7a726c]">Choose your preferred date and live therapist slot from the backend.</p>

                <div className="flex-1 space-y-6">
                  <div>
                    <label className="mb-3 flex items-center gap-2 text-sm font-bold text-[#1f1a17]">
                      <FaCalendarAlt className={accentTextClass} /> Preferred Date
                    </label>
                    <div className="rounded-2xl border border-black/5 bg-[#f8f6f1] p-4">
                      <div className="mb-4 flex items-center justify-between px-2">
                        <button type="button" onClick={handlePreviousMonth} className="p-1 text-[#5c544f] transition-colors hover:text-[#c29a2f]">
                          <FaChevronLeft size={12} />
                        </button>
                        <h5 className="text-sm font-bold uppercase tracking-wider text-[#1f1a17]">
                          {currentMonth.toLocaleString("default", { month: "long", year: "numeric" })}
                        </h5>
                        <button
                          type="button"
                          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
                          className="p-1 text-[#5c544f] transition-colors hover:text-[#c29a2f]"
                        >
                          <FaChevronRight size={12} />
                        </button>
                      </div>
                      <div className="mb-2 grid grid-cols-7 gap-1">
                        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                          <div key={day} className="py-1 text-center text-xs font-bold text-[#c29a2f]">
                            {day}
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-7 gap-1">{calendarDays}</div>
                    </div>
                  </div>

                  {formData.date ? (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                      <label className="mb-3 flex items-center gap-2 text-sm font-bold text-[#1f1a17]">
                        <FaClock className={accentTextClass} /> Available Slots for {formatDateLabel(formData.date)}
                      </label>

                      {loadingAvailability ? (
                        <div className="rounded-xl border border-black/5 bg-[#f8f6f1] p-6 text-center text-sm text-[#7a726c]">
                          Loading live availability...
                        </div>
                      ) : availability.length > 0 ? (
                        <div className="grid gap-3">
                          {availability.map((slot) => {
                            const key = `${slot.therapist_id}-${slot.start_time}-${slot.end_time}`;
                            const isSelected = selectedSlot?.therapist_id === slot.therapist_id &&
                              selectedSlot?.start_time === slot.start_time &&
                              selectedSlot?.end_time === slot.end_time;
                            return (
                              <button
                                key={key}
                                type="button"
                                onClick={() => setSelectedSlot(slot)}
                                className={`rounded-2xl border px-4 py-3 text-left transition-all ${
                                  isSelected
                                    ? "border-[#c29a2f] bg-[#fff6df] shadow-md"
                                    : "border-black/10 bg-white hover:border-[#c29a2f]"
                                }`}
                              >
                                <div className="flex items-center justify-between gap-3">
                                  <div>
                                    <p className="text-sm font-bold text-[#1f1a17]">
                                      {formatTimeLabel(slot.start_time)} - {formatTimeLabel(slot.end_time)}
                                    </p>
                                    <p className="mt-1 text-xs text-[#5c544f]">Therapist: {slot.therapist_name}</p>
                                  </div>
                                  <span className="rounded-full bg-[#f8f6f1] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#7a5d1d]">
                                    {slot.remaining_capacity} left
                                  </span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="rounded-xl border border-black/5 bg-[#f8f6f1] p-6 text-center">
                          <FaClock className="mx-auto mb-2 text-2xl text-[#c29a2f]/50" />
                          <p className="text-sm text-[#7a726c]">
                            {availabilityError || "Please select another date to continue."}
                          </p>
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    <div className="flex flex-col items-center justify-center rounded-xl border border-black/5 bg-[#f8f6f1] p-6 text-center">
                      <FaClock className="mb-2 text-2xl text-[#c29a2f]/50" />
                      <p className="text-sm text-[#7a726c]">Please select a preferred date first to view available time slots.</p>
                    </div>
                  )}
                </div>

                {submitError ? (
                  <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{submitError}</p>
                ) : null}

                <div className="mt-8 border-t border-black/5 pt-6">
                  <button
                    type="button"
                    onClick={handleSubmitBooking}
                    disabled={!selectedSlot || isSubmitting}
                    className={`w-full rounded-full py-4 text-[13px] font-bold uppercase tracking-widest text-white transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${accentClass}`}
                  >
                    {isSubmitting ? "Confirming Booking..." : "Confirm Booking"}
                  </button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex h-full flex-col items-center justify-center py-10 text-center"
              >
                <div className="mb-6 flex items-center justify-center">
                  <LeafGlyph className="h-10 w-10" />
                </div>
                <h4 className="mb-3 text-2xl font-bold text-[#1f1a17]">Booking Requested!</h4>
                <p className="mb-4 max-w-sm text-sm leading-relaxed text-[#5c544f]">
                  Thank you, <strong className="text-black">{formData.name}</strong>. Your booking for <strong className="text-[#c29a2f]">{offering.title}</strong> on{" "}
                  <strong className="text-black">
                    {formatDateLabel(successBooking?.booking_date || formData.date)} at {formatTimeLabel(successBooking?.start_time || selectedSlot?.start_time || "")}
                  </strong>{" "}
                  has been created.
                </p>
                {successBooking?.reference_code ? (
                  <p className="mb-8 rounded-full bg-[#f8f6f1] px-4 py-2 text-sm font-semibold text-[#3b2218]">
                    Reference: {successBooking.reference_code}
                  </p>
                ) : null}
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full bg-[#f8f6f1] px-8 py-3 text-xs font-bold uppercase tracking-widest text-[#3b2218] transition-colors hover:bg-[#e2dcd0]"
                >
                  Close Window
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>,
    document.body
  );
}

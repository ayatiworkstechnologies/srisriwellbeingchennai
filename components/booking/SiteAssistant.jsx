"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaComments,
  FaLeaf,
  FaPaperPlane,
  FaRobot,
  FaSearch,
  FaShieldAlt,
  FaTimes,
} from "react-icons/fa";

import {
  cancelPublicBooking,
  createBookingAppointment,
  getBookingAvailability,
  listPublicRelaxationTherapies,
  lookupPublicBooking,
} from "@/lib/api";

function todayValue() {
  return new Date().toISOString().slice(0, 10);
}

function formatTime(value) {
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

function formatDate(value) {
  if (!value) return "";
  return new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" }).format(new Date(value));
}

function dateOffsetValue(daysToAdd) {
  const date = new Date();
  date.setDate(date.getDate() + daysToAdd);
  return date.toISOString().slice(0, 10);
}

function normalizeText(value) {
  return value.toLowerCase().replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
}

const quickActionPrompts = [
  "Show therapy options",
  "Book appointment",
  "Check my booking",
  "Cancel booking",
];

const toolTabs = [
  ["ask", "Ask", FaComments],
  ["therapies", "Therapies", FaLeaf],
  ["book", "Book", FaCalendarAlt],
  ["lookup", "Lookup", FaSearch],
  ["cancel", "Cancel", FaTimes],
];

function isGreeting(text) {
  return [
    "hi",
    "hello",
    "hey",
    "hii",
    "helo",
    "good morning",
    "good evening",
    "good afternoon",
  ].includes(text);
}

export default function SiteAssistant() {
  const messagesEndRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTool, setActiveTool] = useState("ask");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "I am AMMU from Sri Sri Wellbeing. I can show therapies, book an appointment, check booking details, and cancel a booking using your reference and email.",
      showActions: true,
    },
  ]);
  const [prompt, setPrompt] = useState("");
  const [therapies, setTherapies] = useState([]);
  const [hasLoadedTherapies, setHasLoadedTherapies] = useState(false);
  const [therapyState, setTherapyState] = useState({ loading: false, error: "" });
  const [bookingForm, setBookingForm] = useState({
    therapy_name: "",
    customer_name: "",
    phone: "",
    email: "",
    booking_date: todayValue(),
    notes: "",
  });
  const [availability, setAvailability] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookingState, setBookingState] = useState({ loading: false, message: "", error: "" });
  const [lookupForm, setLookupForm] = useState({ reference_code: "", email: "" });
  const [lookupState, setLookupState] = useState({ loading: false, booking: null, error: "" });
  const [cancelForm, setCancelForm] = useState({ reference_code: "", email: "", reason: "" });
  const [cancelState, setCancelState] = useState({ loading: false, message: "", error: "" });

  const therapySummary = useMemo(
    () =>
      therapies
        .slice(0, 6)
        .map((item) => `${item.title} (${item.duration || "duration shared by team"})`)
        .join(", "),
    [therapies]
  );
  const selectedTherapy = useMemo(
    () => therapies.find((therapy) => therapy.title === bookingForm.therapy_name) || null,
    [bookingForm.therapy_name, therapies]
  );

  const addMessage = (role, text) => {
    setMessages((current) => [...current, { role, text }]);
  };

  useEffect(() => {
    if (!isOpen || activeTool !== "ask") return;
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [activeTool, isOpen, messages]);

  const findMentionedTherapy = (text) => {
    const normalizedPrompt = normalizeText(text);
    return therapies.find((therapy) => normalizedPrompt.includes(normalizeText(therapy.title)));
  };

  useEffect(() => {
    if (!isOpen || hasLoadedTherapies || therapyState.loading) return;

    async function loadTherapies() {
      setTherapyState({ loading: true, error: "" });
      try {
        const items = await listPublicRelaxationTherapies();
        setHasLoadedTherapies(true);
        const nextTherapies = items || [];
        setTherapies(nextTherapies);
        if (nextTherapies[0]) {
          setBookingForm((current) => ({
            ...current,
            therapy_name: current.therapy_name || nextTherapies[0].title,
          }));
        }
      } catch (error) {
        setHasLoadedTherapies(true);
        setTherapyState({ loading: false, error: error.message || "Unable to load therapies." });
      } finally {
        setTherapyState((current) => ({ ...current, loading: false }));
      }
    }

    loadTherapies();
  }, [hasLoadedTherapies, isOpen, therapyState.loading]);

  useEffect(() => {
    if (!bookingForm.therapy_name || !bookingForm.booking_date || !isOpen) {
      return;
    }

    let active = true;

    async function loadAvailability() {
      setBookingState((current) => ({ ...current, error: "" }));
      try {
        const slots = await getBookingAvailability({
          therapyName: bookingForm.therapy_name,
          bookingDate: bookingForm.booking_date,
        });
        if (!active) return;
        setAvailability(slots || []);
        setSelectedSlot(null);
      } catch (error) {
        if (!active) return;
        setAvailability([]);
        setSelectedSlot(null);
        setBookingState((current) => ({
          ...current,
          error: error.message || "Unable to load slots.",
        }));
      }
    }

    loadAvailability();

    return () => {
      active = false;
    };
  }, [bookingForm.therapy_name, bookingForm.booking_date, isOpen]);

  const handleAsk = (question) => {
    const userText = question.trim();
    if (!userText) return;

    const lower = normalizeText(userText);
    const mentionedTherapy = findMentionedTherapy(userText);
    let reply = "I can help with therapy options, appointment booking, booking lookup, and cancellation.";
    let showActions = false;

    if (mentionedTherapy) {
      setBookingForm((current) => ({
        ...current,
        therapy_name: mentionedTherapy.title,
        booking_date: lower.includes("tomorrow")
          ? dateOffsetValue(1)
          : lower.includes("today")
            ? todayValue()
            : current.booking_date,
      }));
      reply = `${mentionedTherapy.title} is selected. ${mentionedTherapy.duration ? `Duration: ${mentionedTherapy.duration}. ` : ""}Choose a date and available slot to complete the booking.`;
      setActiveTool("book");
    } else if (isGreeting(lower)) {
      reply = "Hello. I can help you browse therapies, create a booking, check an existing booking, or cancel one. Choose an option below or type what you need.";
      showActions = true;
    } else if (lower.includes("therapy") || lower.includes("option") || lower.includes("show")) {
      reply = therapySummary
        ? `Current therapy options include: ${therapySummary}.`
        : "Open the therapy list in this assistant and I will load the available therapies from the backend.";
      setActiveTool("therapies");
    } else if (lower.includes("book")) {
      if (lower.includes("tomorrow")) {
        setBookingForm((current) => ({ ...current, booking_date: dateOffsetValue(1) }));
      } else if (lower.includes("today")) {
        setBookingForm((current) => ({ ...current, booking_date: todayValue() }));
      }
      reply = "Use the booking form below. Select therapy, date, slot, and enter your contact details.";
      setActiveTool("book");
    } else if (lower.includes("cancel")) {
      reply = "Use your booking reference and email address to cancel a pending or confirmed booking.";
      setActiveTool("cancel");
    } else if (lower.includes("check") || lower.includes("status") || lower.includes("reference")) {
      reply = "Enter your booking reference and email to view appointment details.";
      setActiveTool("lookup");
    } else {
      reply = "I can help with therapies, booking, booking lookup, and cancellation. Choose an option below or type something like book appointment or check my booking.";
      showActions = true;
    }

    setMessages((current) => [
      ...current,
      { role: "user", text: userText },
      { role: "assistant", text: reply, showActions },
    ]);
    setPrompt("");
  };

  const handleBookingSubmit = async (event) => {
    event.preventDefault();
    if (!selectedSlot) {
      setBookingState({ loading: false, message: "", error: "Please choose an available slot." });
      return;
    }

    setBookingState({ loading: true, message: "", error: "" });
    try {
      const result = await createBookingAppointment({
        therapy_name: bookingForm.therapy_name,
        customer_name: bookingForm.customer_name,
        phone: bookingForm.phone,
        email: bookingForm.email,
        therapist_id: selectedSlot.therapist_id,
        booking_date: bookingForm.booking_date,
        slot_id: 0,
        start_time: selectedSlot.start_time,
        end_time: selectedSlot.end_time,
        notes: bookingForm.notes || null,
      });
      setBookingState({
        loading: false,
        message: `Booking requested. Reference: ${result.reference_code}`,
        error: "",
      });
      addMessage(
        "assistant",
        `Booking requested for ${result.therapy_name}. Reference: ${result.reference_code}. Date: ${formatDate(result.booking_date)}, time: ${formatTime(result.start_time)}. Use this reference with your email to check or cancel later.`
      );
      setLookupForm({ reference_code: result.reference_code, email: result.email });
      setCancelForm((current) => ({ ...current, reference_code: result.reference_code, email: result.email }));
      setSelectedSlot(null);
    } catch (error) {
      setBookingState({ loading: false, message: "", error: error.message || "Unable to create booking." });
    }
  };

  const handleLookup = async (event) => {
    event.preventDefault();
    setLookupState({ loading: true, booking: null, error: "" });
    try {
      const result = await lookupPublicBooking(lookupForm);
      setLookupState({ loading: false, booking: result, error: "" });
      addMessage(
        "assistant",
        `${result.reference_code}: ${result.therapy_name} is ${result.status}. Appointment: ${formatDate(result.booking_date)} at ${formatTime(result.start_time)}.`
      );
    } catch (error) {
      setLookupState({ loading: false, booking: null, error: error.message || "Unable to find booking." });
    }
  };

  const handleCancel = async (event) => {
    event.preventDefault();
    setCancelState({ loading: true, message: "", error: "" });
    try {
      const result = await cancelPublicBooking(cancelForm);
      setCancelState({ loading: false, message: `${result.reference_code} has been cancelled.`, error: "" });
      addMessage("assistant", `${result.reference_code} has been cancelled successfully.`);
      setCancelForm({ reference_code: "", email: "", reason: "" });
    } catch (error) {
      setCancelState({ loading: false, message: "", error: error.message || "Unable to cancel booking." });
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-x-3 bottom-20 top-3 z-[9998] flex flex-col overflow-hidden rounded-[26px] border border-[#ead8ba] bg-[#fffaf4] shadow-[0_24px_90px_rgba(47,25,15,0.22)] sm:inset-x-auto sm:top-auto sm:right-5 sm:max-h-[calc(100dvh-6.5rem)] sm:w-[min(440px,calc(100vw-2rem))]">
          <div className="relative shrink-0 overflow-hidden bg-[#2f190f] px-5 py-4 text-white sm:py-5">
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#d7b65d] to-transparent" />
            <div className="flex items-start justify-between gap-4">
              <div className="flex min-w-0 gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10">
                  <FaRobot className="text-[#e1bf6f]" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#e1bf6f]">AI Concierge</p>
                  <h2 className="mt-1 text-base font-bold leading-tight text-white">Sri Sri booking assistant</h2>
                  <p className="mt-1 text-xs leading-5 text-white/75">Find therapies, book a slot, or manage an existing booking.</p>
                </div>
              </div>
              <button type="button" onClick={() => setIsOpen(false)} className="rounded-full bg-white/10 p-2 text-white hover:bg-white/15" aria-label="Close assistant">
                <FaTimes />
              </button>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-semibold text-white/80">
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5">
                <FaCheckCircle className="text-[#e1bf6f]" /> Live slots
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5">
                <FaShieldAlt className="text-[#e1bf6f]" /> Secure lookup
              </span>
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4">
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {toolTabs.map(([id, label, Icon]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveTool(id)}
                  className={`inline-flex h-10 shrink-0 items-center gap-2 rounded-full px-4 text-xs font-bold uppercase tracking-[0.12em] transition ${
                    activeTool === id
                      ? "bg-[#2f190f] text-white shadow-md"
                      : "border border-[#e8d6b4] bg-white text-[#7b5d16] hover:bg-[#fff5df]"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                </button>
              ))}
            </div>

            {activeTool === "ask" ? (
              <div className="mt-4 flex min-h-0 flex-col">
                <div className="min-h-0 flex-1 space-y-3 overflow-y-auto rounded-[22px] border border-[#eadcc7] bg-[#fcfaf6] p-3">
                  {messages.map((message, index) => (
                    <div
                      key={`${message.role}-${index}`}
                      className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
                    >
                      <div
                        className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm ${
                          message.role === "assistant"
                            ? "rounded-tl-md bg-white text-[#534b45]"
                            : "rounded-tr-md bg-[#2f190f] text-white"
                        }`}
                      >
                        {message.role === "assistant" ? (
                          <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#9a741d]">AMMU</p>
                        ) : null}
                        <p>{message.text}</p>
                        {message.role === "assistant" && message.showActions ? (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {quickActionPrompts.map((item) => (
                              <button
                                key={item}
                                type="button"
                                onClick={() => handleAsk(item)}
                                className="rounded-full border border-[#e8d6b4] bg-[#fffaf2] px-3 py-2 text-xs font-semibold text-[#7b5d16] transition hover:bg-[#fff1d1]"
                              >
                                {item}
                              </button>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    handleAsk(prompt);
                  }}
                  className="mt-4"
                >
                  <div className="flex items-end gap-3 rounded-[20px] border border-[#e4d7c6] bg-white p-2 shadow-sm">
                    <input
                    value={prompt}
                    onChange={(event) => setPrompt(event.target.value)}
                      placeholder="Type your message"
                      className="h-11 min-w-0 flex-1 bg-transparent px-3 text-sm text-[#1f1a17] outline-none placeholder:text-[#9f9487]"
                    />
                    <button
                      type="submit"
                      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#c29a2f] text-white transition hover:bg-[#a88528]"
                      aria-label="Send message"
                    >
                      <FaPaperPlane className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </form>
              </div>
            ) : null}

            {activeTool === "therapies" ? (
              <div className="mt-4 rounded-[20px] border border-[#e8dccd] bg-white p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#b88f28]">Therapy Data</p>
                <p className="mt-2 text-sm leading-6 text-[#6f665f]">
                  Select any therapy to move directly into booking with that therapy prefilled.
                </p>
                {therapyState.loading ? <p className="mt-3 text-sm text-[#7a726c]">Loading therapies...</p> : null}
                {therapyState.error ? <p className="mt-3 text-sm text-red-600">{therapyState.error}</p> : null}
                <div className="mt-3 grid gap-3">
                  {therapies.map((therapy) => (
                    <button
                      key={therapy.id}
                      type="button"
                      onClick={() => {
                        setBookingForm((current) => ({ ...current, therapy_name: therapy.title }));
                        setActiveTool("book");
                      }}
                      className="rounded-2xl border border-[#e8dccd] bg-[#fcfaf6] p-3 text-left hover:border-[#c29a2f]"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-sm font-bold text-[#2f190f]">{therapy.title}</p>
                        <span className="rounded-full bg-white px-2 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#9a741d]">Book</span>
                      </div>
                      <p className="mt-1 text-xs text-[#7a726c]">{therapy.duration || "Duration shared by team"}</p>
                      {therapy.short_description ? (
                        <p className="mt-2 line-clamp-2 text-xs leading-5 text-[#5f5650]">{therapy.short_description}</p>
                      ) : null}
                    </button>
                  ))}
                  {!therapyState.loading && !therapies.length ? (
                    <p className="rounded-xl bg-[#fcfaf6] p-3 text-sm text-[#7a726c]">No therapy data is available right now.</p>
                  ) : null}
                </div>
              </div>
            ) : null}

            {activeTool === "book" ? (
              <form onSubmit={handleBookingSubmit} className="mt-4 rounded-[20px] border border-[#e8dccd] bg-white p-4">
                <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#b88f28]">
                  <FaCalendarAlt /> Book Appointment
                </p>
                <select
                  value={bookingForm.therapy_name}
                  onChange={(event) => setBookingForm((current) => ({ ...current, therapy_name: event.target.value }))}
                  className="mt-3 h-11 w-full rounded-full border border-[#e4d7c6] bg-[#fcfaf6] px-4 text-sm outline-none focus:border-[#c29a2f]"
                  required
                >
                  {!therapies.length ? <option value="">Loading therapies...</option> : null}
                  {therapies.map((therapy) => (
                    <option key={therapy.id} value={therapy.title}>
                      {therapy.title}
                    </option>
                  ))}
                </select>
                {selectedTherapy ? (
                  <div className="mt-3 rounded-2xl border border-[#eadcc7] bg-[#fffaf2] p-3 text-sm text-[#5f5650]">
                    <p className="font-bold text-[#2f190f]">{selectedTherapy.title}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[#9a741d]">{selectedTherapy.duration || "Duration shared by team"}</p>
                    {selectedTherapy.short_description ? (
                      <p className="mt-2 leading-6">{selectedTherapy.short_description}</p>
                    ) : null}
                  </div>
                ) : null}
                <input
                  type="date"
                  min={todayValue()}
                  value={bookingForm.booking_date}
                  onChange={(event) => setBookingForm((current) => ({ ...current, booking_date: event.target.value }))}
                  className="mt-3 h-11 w-full rounded-full border border-[#e4d7c6] bg-[#fcfaf6] px-4 text-sm outline-none focus:border-[#c29a2f]"
                  required
                />
                <div className="mt-3 grid max-h-44 gap-2 overflow-y-auto">
                  {availability.length ? (
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9a741d]">
                      {availability.length} live slot{availability.length === 1 ? "" : "s"} available
                    </p>
                  ) : null}
                  {availability.map((slot) => {
                    const isSelected =
                      selectedSlot?.therapist_id === slot.therapist_id &&
                      selectedSlot?.start_time === slot.start_time &&
                      selectedSlot?.end_time === slot.end_time;
                    return (
                      <button
                        key={`${slot.therapist_id}-${slot.start_time}-${slot.end_time}`}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`rounded-2xl border px-3 py-2 text-left text-sm ${
                          isSelected ? "border-[#c29a2f] bg-[#fff5df]" : "border-[#e8dccd] bg-[#fcfaf6]"
                        }`}
                      >
                        <span className="font-bold text-[#2f190f]">{formatTime(slot.start_time)} - {formatTime(slot.end_time)}</span>
                        <span className="mt-1 block text-xs text-[#7a726c]">
                          {slot.therapist_name} | {slot.remaining_capacity} slot{slot.remaining_capacity === 1 ? "" : "s"} left
                        </span>
                      </button>
                    );
                  })}
                  {!availability.length ? <p className="rounded-xl bg-[#fcfaf6] p-3 text-sm text-[#7a726c]">No slots loaded for this therapy/date.</p> : null}
                </div>
                {selectedSlot ? (
                  <p className="mt-3 rounded-xl border border-[#eadcc7] bg-[#fff5df] px-3 py-2 text-sm font-semibold text-[#7b5d16]">
                    Selected: {formatTime(selectedSlot.start_time)} with {selectedSlot.therapist_name}
                  </p>
                ) : null}
                {[
                  ["customer_name", "Full name", "text"],
                  ["phone", "Phone number", "tel"],
                  ["email", "Email address", "email"],
                ].map(([name, placeholder, type]) => (
                  <input
                    key={name}
                    type={type}
                    value={bookingForm[name]}
                    onChange={(event) => setBookingForm((current) => ({ ...current, [name]: event.target.value }))}
                    placeholder={placeholder}
                    className="mt-3 h-11 w-full rounded-full border border-[#e4d7c6] bg-[#fcfaf6] px-4 text-sm outline-none focus:border-[#c29a2f]"
                    required
                  />
                ))}
                <textarea
                  value={bookingForm.notes}
                  onChange={(event) => setBookingForm((current) => ({ ...current, notes: event.target.value }))}
                  placeholder="Health concern or notes"
                  rows={2}
                  className="mt-3 w-full rounded-[18px] border border-[#e4d7c6] bg-[#fcfaf6] px-4 py-3 text-sm outline-none focus:border-[#c29a2f]"
                />
                {bookingState.error ? <p className="mt-3 text-sm text-red-600">{bookingState.error}</p> : null}
                {bookingState.message ? <p className="mt-3 text-sm text-green-700">{bookingState.message}</p> : null}
                <button type="submit" disabled={bookingState.loading} className="mt-3 inline-flex h-11 items-center justify-center rounded-full bg-[#c29a2f] px-5 text-sm font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[#a88528] disabled:opacity-60">
                  {bookingState.loading ? "Booking..." : "Create Booking"}
                </button>
              </form>
            ) : null}

            {activeTool === "lookup" ? (
              <form onSubmit={handleLookup} className="mt-4 rounded-[20px] border border-[#e8dccd] bg-white p-4">
                <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#b88f28]">
                  <FaSearch /> Check Booking
                </p>
                <input
                  value={lookupForm.reference_code}
                  onChange={(event) => setLookupForm((current) => ({ ...current, reference_code: event.target.value }))}
                  placeholder="Booking reference"
                  className="mt-3 h-11 w-full rounded-full border border-[#e4d7c6] bg-[#fcfaf6] px-4 text-sm outline-none focus:border-[#c29a2f]"
                  required
                />
                <input
                  type="email"
                  value={lookupForm.email}
                  onChange={(event) => setLookupForm((current) => ({ ...current, email: event.target.value }))}
                  placeholder="Email address"
                  className="mt-3 h-11 w-full rounded-full border border-[#e4d7c6] bg-[#fcfaf6] px-4 text-sm outline-none focus:border-[#c29a2f]"
                  required
                />
                {lookupState.error ? <p className="mt-3 text-sm text-red-600">{lookupState.error}</p> : null}
                {lookupState.booking ? (
                  <div className="mt-3 rounded-2xl border border-[#e8dccd] bg-[#fcfaf6] p-3 text-sm text-[#4b413a]">
                    <p className="font-bold text-[#2f190f]">{lookupState.booking.reference_code}</p>
                    <p>{lookupState.booking.therapy_name}</p>
                    <p>{formatDate(lookupState.booking.booking_date)} | {formatTime(lookupState.booking.start_time)}</p>
                    <p>Status: {lookupState.booking.status}</p>
                    {lookupState.booking.status !== "cancelled" && lookupState.booking.status !== "completed" ? (
                      <button
                        type="button"
                        onClick={() => {
                          setCancelForm({
                            reference_code: lookupState.booking.reference_code,
                            email: lookupState.booking.email,
                            reason: "",
                          });
                          setActiveTool("cancel");
                        }}
                        className="mt-3 rounded-full border border-[#d7c29a] bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#8a6510]"
                      >
                        Cancel This Booking
                      </button>
                    ) : null}
                  </div>
                ) : null}
                <button type="submit" disabled={lookupState.loading} className="mt-3 inline-flex h-11 items-center justify-center rounded-full bg-[#c29a2f] px-5 text-sm font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[#a88528] disabled:opacity-60">
                  {lookupState.loading ? "Checking..." : "Check Booking"}
                </button>
              </form>
            ) : null}

            {activeTool === "cancel" ? (
              <form onSubmit={handleCancel} className="mt-4 rounded-[20px] border border-[#e8dccd] bg-white p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#b88f28]">Cancel Booking</p>
                <input
                  value={cancelForm.reference_code}
                  onChange={(event) => setCancelForm((current) => ({ ...current, reference_code: event.target.value }))}
                  placeholder="Booking reference"
                  className="mt-3 h-11 w-full rounded-full border border-[#e4d7c6] bg-[#fcfaf6] px-4 text-sm outline-none focus:border-[#c29a2f]"
                  required
                />
                <input
                  type="email"
                  value={cancelForm.email}
                  onChange={(event) => setCancelForm((current) => ({ ...current, email: event.target.value }))}
                  placeholder="Email address"
                  className="mt-3 h-11 w-full rounded-full border border-[#e4d7c6] bg-[#fcfaf6] px-4 text-sm outline-none focus:border-[#c29a2f]"
                  required
                />
                <textarea
                  value={cancelForm.reason}
                  onChange={(event) => setCancelForm((current) => ({ ...current, reason: event.target.value }))}
                  placeholder="Reason for cancellation"
                  rows={2}
                  className="mt-3 w-full rounded-[18px] border border-[#e4d7c6] bg-[#fcfaf6] px-4 py-3 text-sm outline-none focus:border-[#c29a2f]"
                />
                {cancelState.error ? <p className="mt-3 text-sm text-red-600">{cancelState.error}</p> : null}
                {cancelState.message ? <p className="mt-3 text-sm text-green-700">{cancelState.message}</p> : null}
                <button type="submit" disabled={cancelState.loading} className="mt-3 inline-flex h-11 items-center justify-center rounded-full border border-[#d7c29a] bg-[#fff5df] px-5 text-sm font-bold uppercase tracking-[0.14em] text-[#8a6510] transition hover:bg-[#f8ebcb] disabled:opacity-60">
                  {cancelState.loading ? "Cancelling..." : "Cancel Booking"}
                </button>
              </form>
            ) : null}

            <p className="mt-4 text-xs leading-5 text-[#7a726c]">
              Need personal help? Visit the <Link href="/contact" className="font-semibold text-[#8a6510] underline">contact page</Link>.
            </p>
            <p className="mt-4 border-t border-[#eadcc7] pt-3 text-center text-[10px] font-bold uppercase tracking-[0.18em] text-[#9a8f84]">
              Developed by Ayati Inteligents
            </p>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="fixed bottom-5 right-4 z-[9998] inline-flex h-14 items-center gap-3 rounded-full bg-[#2f190f] px-5 text-sm font-bold uppercase tracking-[0.12em] text-white shadow-[0_18px_40px_rgba(31,23,20,0.24)] transition hover:-translate-y-0.5 hover:bg-[#4a2817]"
        aria-label={isOpen ? "Close AI concierge" : "Open AI concierge"}
      >
        <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#c29a2f]">
          <FaComments />
          <span className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full border border-[#2f190f] bg-[#5fd28f]" />
        </span>
        <span className="hidden sm:inline">{isOpen ? "Close Concierge" : "AI Concierge"}</span>
      </button>
    </>
  );
}

"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FaComments, FaTimes } from "react-icons/fa";

import { apiRequest } from "@/lib/api";

const therapyCatalog = [
  { name: "Abhyanga", benefit: "full-body relaxation", duration: "45 mins" },
  { name: "Shirodhara", benefit: "stress relief and better sleep", duration: "45 mins" },
  { name: "Uzhichil", benefit: "muscle relief and flexibility", duration: "40 mins" },
  { name: "Head Massage", benefit: "quick mind and neck relaxation", duration: "40 mins" },
  { name: "Foot Reflexology", benefit: "pressure-point calm and balance", duration: "40 mins" },
  { name: "Aroma Therapy", benefit: "mood uplift and sensory reset", duration: "45 mins" },
];

const starterPrompts = [
  "Which therapy is best for stress?",
  "How can I book Abhyanga?",
  "How do I cancel my booking?",
];

export default function SiteAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "I’m the Sri Sri Wellbeing AI concierge. I can suggest therapies, explain booking, and help cancel an appointment using your booking reference.",
    },
  ]);
  const [prompt, setPrompt] = useState("");
  const [cancelForm, setCancelForm] = useState({ reference_code: "", email: "", reason: "" });
  const [cancelState, setCancelState] = useState({ loading: false, message: "", error: "" });

  const quickSummary = useMemo(
    () => therapyCatalog.map((item) => `${item.name}: ${item.benefit}`).join(" | "),
    []
  );

  const handleAsk = (question) => {
    const userText = question.trim();
    if (!userText) return;

    const lower = userText.toLowerCase();
    let reply = `I can help with therapies, booking slots, and cancellation. Here are the main relaxation options: ${quickSummary}.`;

    if (lower.includes("stress") || lower.includes("sleep")) {
      reply = "For stress or sleep support, Shirodhara is usually the strongest fit. Abhyanga is also great if you want full-body relaxation. Open a therapy card and choose an available slot to book.";
    } else if (lower.includes("muscle") || lower.includes("pain") || lower.includes("stiff")) {
      reply = "For stiffness or muscular fatigue, Uzhichil is the best starting point. If you want something shorter, Head Massage or Foot Reflexology can also help.";
    } else if (lower.includes("book")) {
      reply = "Open any relaxation therapy card, choose a date and available time slot, then submit your contact details. After booking, you’ll receive a reference code you can use later for cancellation.";
    } else if (lower.includes("cancel")) {
      reply = "Use the cancellation form in this assistant with your booking reference and email. If the booking is still pending or confirmed, I can cancel it for you.";
    } else if (lower.includes("abhyanga")) {
      reply = "Abhyanga is a 45 minute full-body Ayurvedic oil therapy. It’s ideal when you want deep relaxation, better circulation, and nervous system calm.";
    }

    setMessages((current) => [...current, { role: "user", text: userText }, { role: "assistant", text: reply }]);
    setPrompt("");
  };

  const handleCancel = async (event) => {
    event.preventDefault();
    setCancelState({ loading: true, message: "", error: "" });
    try {
      const result = await apiRequest("/api/v1/public/bookings/cancel", {
        method: "POST",
        body: JSON.stringify(cancelForm),
      });
      setCancelState({ loading: false, message: `${result.reference_code} has been cancelled.`, error: "" });
      setCancelForm({ reference_code: "", email: "", reason: "" });
    } catch (error) {
      setCancelState({ loading: false, message: "", error: error.message || "Unable to cancel booking" });
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-24 right-4 z-[9998] w-[min(380px,calc(100vw-2rem))] overflow-hidden rounded-[28px] border border-[#e6d6bf] bg-[#fffaf2] shadow-[0_20px_70px_rgba(31,23,20,0.16)]">
          <div className="flex items-center justify-between bg-[#2f190f] px-5 py-4 text-white">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#e1bf6f]">AI Concierge</p>
              <p className="mt-1 text-sm text-white/80">Booking help and therapy guidance</p>
            </div>
            <button type="button" onClick={() => setIsOpen(false)} className="rounded-full bg-white/10 p-2 hover:bg-white/15">
              <FaTimes />
            </button>
          </div>

          <div className="max-h-[60vh] overflow-y-auto px-4 py-4">
            <div className="space-y-3">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`rounded-2xl px-4 py-3 text-sm leading-6 ${
                    message.role === "assistant" ? "bg-white text-[#534b45]" : "bg-[#f2e0bc] text-[#2f190f]"
                  }`}
                >
                  {message.text}
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {starterPrompts.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleAsk(item)}
                  className="rounded-full border border-[#e8d6b4] bg-white px-3 py-2 text-xs font-semibold text-[#7b5d16] transition hover:bg-[#fff5df]"
                >
                  {item}
                </button>
              ))}
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                handleAsk(prompt);
              }}
              className="mt-4"
            >
              <textarea
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                placeholder="Ask about therapies, booking, or cancellation..."
                rows={3}
                className="w-full rounded-[20px] border border-[#e4d7c6] bg-white px-4 py-3 text-sm text-[#1f1a17] outline-none focus:border-[#c29a2f] focus:ring-1 focus:ring-[#c29a2f]"
              />
              <button type="submit" className="mt-3 inline-flex h-11 items-center justify-center rounded-full bg-[#c29a2f] px-5 text-sm font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[#a88528]">
                Ask Concierge
              </button>
            </form>

            <div className="mt-6 rounded-[24px] border border-[#e8dccd] bg-white px-4 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#b88f28]">Cancel Booking</p>
              <form onSubmit={handleCancel} className="mt-3 space-y-3">
                <input
                  value={cancelForm.reference_code}
                  onChange={(event) => setCancelForm((current) => ({ ...current, reference_code: event.target.value }))}
                  placeholder="Booking reference"
                  className="h-11 w-full rounded-full border border-[#e4d7c6] bg-[#fcfaf6] px-4 text-sm outline-none focus:border-[#c29a2f]"
                  required
                />
                <input
                  type="email"
                  value={cancelForm.email}
                  onChange={(event) => setCancelForm((current) => ({ ...current, email: event.target.value }))}
                  placeholder="Email address"
                  className="h-11 w-full rounded-full border border-[#e4d7c6] bg-[#fcfaf6] px-4 text-sm outline-none focus:border-[#c29a2f]"
                  required
                />
                <textarea
                  value={cancelForm.reason}
                  onChange={(event) => setCancelForm((current) => ({ ...current, reason: event.target.value }))}
                  placeholder="Reason for cancellation"
                  rows={2}
                  className="w-full rounded-[18px] border border-[#e4d7c6] bg-[#fcfaf6] px-4 py-3 text-sm outline-none focus:border-[#c29a2f]"
                />
                {cancelState.error && <p className="text-sm text-red-600">{cancelState.error}</p>}
                {cancelState.message && <p className="text-sm text-green-700">{cancelState.message}</p>}
                <button type="submit" disabled={cancelState.loading} className="inline-flex h-11 items-center justify-center rounded-full border border-[#d7c29a] bg-[#fff5df] px-5 text-sm font-bold uppercase tracking-[0.14em] text-[#8a6510] transition hover:bg-[#f8ebcb] disabled:opacity-60">
                  {cancelState.loading ? "Cancelling..." : "Cancel Booking"}
                </button>
              </form>
            </div>

            <p className="mt-4 text-xs leading-5 text-[#7a726c]">
              Need personal help? Visit the <Link href="/contact" className="font-semibold text-[#8a6510] underline">contact page</Link>.
            </p>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="fixed bottom-5 right-4 z-[9998] inline-flex h-14 items-center gap-3 rounded-full bg-[#2f190f] px-5 text-sm font-bold uppercase tracking-[0.14em] text-white shadow-[0_18px_40px_rgba(31,23,20,0.22)] transition hover:bg-[#4a2817]"
      >
        <FaComments />
        AI Concierge
      </button>
    </>
  );
}

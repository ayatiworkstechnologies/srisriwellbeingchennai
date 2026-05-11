"use client";


import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  FaArrowRight,
  FaClock,
  FaEnvelope,
  FaLocationDot,
  FaPaperPlane,
  FaPhoneVolume,
  FaRegCircleCheck,
} from "react-icons/fa6";

export default function ContactPageRedesign() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    const formData = new FormData(e.target);
    const payload = {
      data: {
        name: formData.get("name"),
        phone: formData.get("phone"),
        email: formData.get("email"),
        topic: formData.get("topic"),
        message: formData.get("message"),
      },
    };

    try {
      const response = await fetch(
        "https://api.ayatiworks.com/api/v1/public/srisriwelbeing-chennai/contact_us/records",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-API-Key": "cdbdf7f07d5395cdeac637f9c65d2925d04cf5cdd7a7d6a93f892daed491c46a",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("API Error Response:", errorData);
        throw new Error(`Failed to submit form. Status: ${response.status}`);
      }

      setIsSuccess(true);
      e.target.reset();

      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Submission error:", error);
      setErrorMessage(
        "There was an error sending your message. Please try again or contact us directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-[#f7f2eb] text-[#1c1714]">
      {/* HERO */}
      <section className="relative min-h-[620px] overflow-hidden bg-[#31180d] text-white md:min-h-[700px]">
        {/* Desktop BG Image */}
        <div className="absolute inset-0 hidden md:block">
          <Image
            src="/banner/contact-web.png"
            alt="Sri Sri Wellbeing contact banner"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* Mobile BG Image */}
        <div className="absolute inset-0 md:hidden">
          <Image
            src="/banner/contact-mob.png"
            alt="Sri Sri Wellbeing contact banner mobile"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[52%_center]"
          />
        </div>

        {/* overlays */}
        <div className="absolute inset-0 bg-[#31180d]/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.16),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(212,175,55,0.08),transparent_30%)]" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] [background-size:22px_22px]" />

        <div className="relative mx-auto flex min-h-[620px] max-w-[1280px] items-center px-4 py-28 md:min-h-[700px] md:px-6 md:py-32 lg:px-8">
          <div>
            <p className="eyebrow-text text-[#D4AF37]">
              Connect With Sri Sri Wellbeing
            </p>

            <h1 className="mt-5 max-w-[760px] text-[34px] font-bold leading-[1.05] md:text-[54px] lg:text-[70px]">
              A mindful first step
              <span className="block text-white/72">
                toward better balance.
              </span>
            </h1>

            <p className="mt-6 max-w-[600px] text-[15px] leading-8 text-white/78 md:text-[17px]">
              Whether you are exploring therapies, looking for personalised
              guidance, or planning your visit, our team is here to help you
              move forward with clarity and ease.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="tel:+919943013111"
                className="inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-7 py-3.5 text-[15px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#bb9629]"
              >
                <FaPhoneVolume className="text-[14px]" />
                Speak With Us
              </Link>

              <Link
                href="mailto:chennai.reception@srisritattva.com"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-[15px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-[#D4AF37] hover:text-[#D4AF37]"
              >
                <FaEnvelope className="text-[14px]" />
                Write to Us
              </Link>
            </div>
          </div>
        </div>
      </section>



      {/* MAIN CONTENT */}
      <section className="px-4 py-12 md:px-6 md:py-16">
        <div className="mx-auto grid max-w-[1280px] gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          {/* FORM */}
          <div className="rounded-[32px] border border-[#eadfce] bg-white p-7 shadow-[0_14px_32px_rgba(32,18,10,0.05)] md:p-10 lg:p-12">
            <div className="mb-8">
              <p className="eyebrow-text text-[#b88f28]">
                Enquiry Form
              </p>
              <h2 className="mt-4 text-[28px] font-bold leading-tight text-[#14110f] md:text-[40px]">
                Share what you are looking for.
              </h2>
              <p className="mt-4 max-w-[620px] text-[15px] leading-7 text-[#645b54] md:text-[16px]">
                Tell us a little about your interest, and our team will respond
                with the right guidance, availability details, or next-step
                support.
              </p>
            </div>

            {isSuccess ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center rounded-[24px] bg-[#fcf8f2] p-8 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#D4AF37] text-white shadow-lg">
                  <FaRegCircleCheck className="text-[34px]" />
                </div>
                <h3 className="mt-7 text-[28px] font-bold text-[#111]">
                  Thank you for reaching out
                </h3>
                <p className="mt-3 max-w-[380px] text-[15px] leading-7 text-[#645b54]">
                  Your message has been received. Our team will get back to you
                  shortly with the appropriate assistance.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-5">
                {errorMessage && (
                  <div className="rounded-[16px] bg-red-50 p-4 text-[14px] text-red-600 border border-red-100">
                    {errorMessage}
                  </div>
                )}
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Full Name">
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Your full name"
                      className={inputClass}
                    />
                  </Field>

                  <Field label="Phone Number">
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+91"
                      className={inputClass}
                    />
                  </Field>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Email Address">
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="you@example.com"
                      className={inputClass}
                    />
                  </Field>

                  <Field label="Topic">
                    <select
                      name="topic"
                      required
                      defaultValue=""
                      className={`${inputClass} appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23111%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-size-[10px] bg-position-[calc(100%-18px)_center] bg-no-repeat`}
                    >
                      <option value="" disabled>
                        Select topic
                      </option>
                      <option value="therapy">Therapy Appointment</option>
                      <option value="product">Products</option>
                      <option value="consultation">Consultation</option>
                      <option value="general">General Enquiry</option>
                    </select>
                  </Field>
                </div>

                <Field label="Message">
                  <textarea
                    name="message"
                    rows="6"
                    required
                    placeholder="Tell us a little about your needs."
                    className="w-full rounded-[18px] border border-[#e7dccd] bg-[#fcfaf6] px-4 py-4 text-[15px] leading-7 text-[#111] outline-none transition duration-300 focus:border-[#D4AF37] focus:bg-white focus:ring-1 focus:ring-[#D4AF37]"
                  />
                </Field>

                <div className="mt-2 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex max-w-[380px] items-start gap-3 text-[13px] leading-6 text-[#7b726c]">
                    <FaRegCircleCheck className="mt-1 shrink-0 text-[#D4AF37]" />
                    <p>
                      All submitted information is handled with care and kept
                      confidential.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex shrink-0 whitespace-nowrap w-fit items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-8 py-4 text-[15px] font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#bb9629] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="h-4 w-4 animate-spin text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <>
                        <FaPaperPlane className="text-[14px]" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col gap-8">
            <div className="rounded-[32px] overflow-hidden border border-[#eadfce] bg-[#fdf9f3]">
              <div className="border-b border-[#eadfce] px-7 py-7 md:px-10">
                <p className="eyebrow-text text-[#b88f28]">
                  Visit The Centre
                </p>
                <h3 className="mt-4 text-[28px] font-bold leading-tight text-[#14110f] md:text-[34px]">
                  Sri Sri Wellbeing Holistic Health Mruthunjaya Ayur
                </h3>
                <p className="mt-4 text-[15px] leading-7 text-[#645b54]">
                  A thoughtfully designed wellness destination in Chennai for
                  restorative therapies, guided healing, and holistic support.
                </p>
              </div>

              <div className="grid gap-6 px-7 py-7 md:px-10">
                <VisitRow
                  icon={FaLocationDot}
                  title="Address"
                  content="Mruthunjaya Ayur, New Avadi Rd, Alagappa Nagar, Kilpauk, Chennai, Tamil Nadu 600010"
                />
                <VisitRow
                  icon={FaClock}
                  title="Availability"
                  content="Open daily by appointment"
                />
                <VisitRow
                  icon={FaPhoneVolume}
                  title="Direct Contact"
                  content={
                    <a href="tel:+919943013111" className="hover:text-[#D4AF37] transition">
                      +91 9943013111
                    </a>
                  }
                />
                <VisitRow
                  icon={FaEnvelope}
                  title="Email Support"
                  content={
                    <a
                      href="mailto:chennai.reception@srisritattva.com"
                      className="hover:text-[#D4AF37] transition"
                    >
                      chennai.reception@srisritattva.com
                    </a>
                  }
                />
              </div>
            </div>

            <div className="rounded-[32px] bg-[#31180d] p-7 text-white shadow-[0_16px_40px_rgba(30,16,8,0.12)] md:p-10">
              <p className="eyebrow-text text-[#D4AF37]">
                Need Directions?
              </p>
              <h3 className="mt-4 text-[26px] font-bold leading-tight md:text-[32px]">
                Find us easily and arrive with ease.
              </h3>
              <p className="mt-4 text-[15px] leading-7 text-white/78">
                Use Google Maps for the most convenient route to our Chennai
                centre.
              </p>

              <a
                href="https://maps.google.com/?q=Sri%20Sri%20Wellbeing%20Holistic%20Health%20Mruthunjaya%20Ayur"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-8 py-4 text-[15px] font-bold text-white! transition hover:bg-[#bb9629] shadow-sm"
              >
                Open Map
                <FaArrowRight className="text-[12px]" />
              </a>
            </div>
          </div>
        </div>

        {/* MAP BLOCK */}
        <div className="mx-auto mt-12 max-w-[1280px] overflow-hidden rounded-[32px] border border-[#eadfce] bg-white shadow-[0_14px_32px_rgba(32,18,10,0.05)] lg:mt-16 lg:px-8">
          <div className="grid md:grid-cols-[1.08fr_0.92fr]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d971.5871486254812!2d80.23289638266331!3d13.077079876095443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267da1c867203%3A0x796c52276b379c45!2sSri%20Sri%20Wellbeing%20Holistic%20Health%20Mruthunjaya%20Ayur!5e0!3m2!1sen!2sin!4v1776087225095!5m2!1sen!2sin"
              title="Sri Sri Wellbeing Chennai location"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="h-[400px] w-full border-0 grayscale transition duration-700 hover:grayscale-0 md:h-[480px] lg:h-[520px]"
            />
            <div className="flex flex-col justify-center px-7 py-10 md:px-10 lg:px-16">
              <p className="eyebrow-text text-[#b88f28]">
                Plan Your Visit
              </p>
              <h3 className="mt-4 text-[26px] font-bold leading-tight text-[#14110f] md:text-[32px]">
                A serene destination in Chennai for holistic wellbeing.
              </h3>
              <p className="mt-4 text-[15px] leading-7 text-[#645b54]">
                Before your visit, feel free to reach out for appointment
                guidance, directions, or support selecting the most suitable
                service.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="https://maps.google.com/?q=Sri%20Sri%20Wellbeing%20Holistic%20Health%20Mruthunjaya%20Ayur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#31180d] px-8 py-4 text-[15px] font-bold text-white! transition hover:bg-[#D4AF37]"
                >
                  Get Directions
                  <FaArrowRight className="text-[12px]" />
                </a>

                <a
                  href="tel:+919943013111"
                  className="inline-flex items-center gap-2 rounded-full border border-[#d9c7ae] px-8 py-4 text-[15px] font-bold text-[#31180d] transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
                >
                  Call Before Visit
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function InfoStripItem({ title, text }) {
  return (
    <div className="rounded-[22px] border border-[#eadfce] bg-white/60 p-5">
      <h3 className="text-[18px] font-bold leading-tight text-[#14110f]">
        {title}
      </h3>
      <p className="mt-3 text-[14px] leading-7 text-[#655d56]">{text}</p>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="eyebrow-text mb-3 block text-[#3a1d11]">
        {label}
      </span>
      {children}
    </label>
  );
}

function VisitRow({ icon: Icon, title, content }) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f3eadc] text-[#b88f28]">
        <Icon className="text-[15px]" />
      </div>
      <div>
        <p className="font-semibold text-[#14110f]">{title}</p>
        <div className="mt-1 text-[15px] leading-7 text-[#645b54]">
          {content}
        </div>
      </div>
    </div>
  );
}

const inputClass =
  "h-14 w-full rounded-[16px] border border-[#e7dccd] bg-[#fcfaf6] px-4 text-[15px] text-[#111] outline-none transition duration-300 focus:border-[#D4AF37] focus:bg-white focus:ring-1 focus:ring-[#D4AF37]";

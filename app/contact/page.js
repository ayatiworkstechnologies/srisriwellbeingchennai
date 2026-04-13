import Link from "next/link";
import {
  FaArrowRight,
  FaClock,
  FaEnvelope,
  FaLocationDot,
  FaPaperPlane,
  FaPhoneVolume,
  FaRegCircleCheck,
} from "react-icons/fa6";

export const metadata = {
  title: "Contact | Sri Sri Wellbeing",
  description: "Connect with Sri Sri Wellbeing Chennai for therapies, products, consultations, and appointments.",
};

const contactCards = [
  {
    icon: FaPhoneVolume,
    title: "Call Us",
    detail: "+91 73552 59588",
    href: "tel:+917355259588",
    note: "Speak with our team for appointments and enquiries.",
  },
  {
    icon: FaEnvelope,
    title: "Email Us",
    detail: "care@srisriwellbeing.com",
    href: "mailto:care@srisriwellbeing.com",
    note: "Send us your questions and we will get back to you.",
  },
  {
    icon: FaLocationDot,
    title: "Visit Us",
    detail: "Sri Sri Wellbeing Holistic Health Mruthunjaya Ayur, Chennai",
    href: "https://maps.google.com/?q=Sri%20Sri%20Wellbeing%20Holistic%20Health%20Mruthunjaya%20Ayur",
    note: "A calm wellness destination in the heart of Chennai.",
  },
];

export default function ContactPage() {
  return (
    <main className="bg-[#f5f2ec] text-[#1c1c1c]">
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#5b2413_0%,#3e190f_60%,#24110c_100%)] px-4 pb-18 pt-32 text-white md:px-6 md:pb-24 md:pt-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(224,193,112,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(224,193,112,0.1),transparent_28%)]" />
        <div className="relative mx-auto max-w-[1200px]">
          <p className="text-[12px] font-semibold uppercase tracking-[0.26em] text-[#e6ce84]">
            Contact Sri Sri Wellbeing
          </p>
          <h1 className="mt-4 max-w-[760px] text-[34px] font-bold leading-tight md:text-[62px]">
            Begin your wellbeing journey with a conversation.
          </h1>
          <p className="mt-5 max-w-[620px] text-[15px] leading-8 text-white/80 md:text-[17px]">
            Reach out for therapies, product guidance, tailored care pathways,
            or appointment support. We are here to help you find the right
            starting point.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="tel:+917355259588"
              className="inline-flex items-center gap-2 rounded-full bg-[#d0a93d] px-6 py-3 text-[14px] font-semibold text-[#2d160f] transition hover:-translate-y-0.5"
            >
              <FaPhoneVolume className="text-[13px]" />
              Call Now
            </Link>
            <Link
              href="mailto:care@srisriwellbeing.com"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-[14px] font-semibold text-white backdrop-blur transition hover:bg-white/15"
            >
              <FaEnvelope className="text-[13px]" />
              Email Us
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-14 md:px-6 md:py-20">
        <div className="mx-auto grid max-w-[1200px] gap-6 md:grid-cols-3">
          {contactCards.map((card) => (
            <article
              key={card.title}
              className="rounded-[24px] border border-[#e8dcc8] bg-white px-6 py-7 shadow-[0_18px_45px_rgba(65,32,17,0.06)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f8f1df] text-[18px] text-[#b8871f]">
                <card.icon />
              </div>
              <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#c29a2f]">
                {card.title}
              </p>
              <a
                href={card.href}
                target={card.href.startsWith("http") ? "_blank" : undefined}
                rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="mt-4 block text-[20px] font-bold leading-snug text-[#2d170f]"
              >
                {card.detail}
              </a>
              <p className="mt-3 text-[14px] leading-7 text-[#6b625b]">
                {card.note}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 pb-16 md:px-6 md:pb-24">
        <div className="mx-auto grid max-w-[1200px] gap-8 md:grid-cols-[1.02fr_0.98fr]">
          <div className="rounded-[30px] bg-white p-6 shadow-[0_24px_70px_rgba(65,32,17,0.08)] md:p-8">
            <div className="mb-8">
              <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#c29a2f]">
                Send an Enquiry
              </p>
              <h2 className="mt-3 text-[28px] font-bold leading-tight text-[#1f1a17] md:text-[42px]">
                Tell us how we can support you.
              </h2>
              <p className="mt-3 max-w-[560px] text-[14px] leading-7 text-[#6a6159] md:text-[15px]">
                Share your interest in therapies, products, consultations, or
                general wellbeing support, and our team will respond.
              </p>
            </div>

            <form className="grid gap-5">
              <div className="grid gap-5 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-[13px] font-medium text-[#4b1f12]">
                    Full Name
                  </span>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    className="h-13 w-full rounded-[16px] border border-[#eadfce] bg-[#fbf8f3] px-4 text-[14px] text-[#1f1a17] outline-none transition focus:border-[#d0a93d]"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-[13px] font-medium text-[#4b1f12]">
                    Phone Number
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91"
                    className="h-13 w-full rounded-[16px] border border-[#eadfce] bg-[#fbf8f3] px-4 text-[14px] text-[#1f1a17] outline-none transition focus:border-[#d0a93d]"
                  />
                </label>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-[13px] font-medium text-[#4b1f12]">
                    Email Address
                  </span>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    className="h-13 w-full rounded-[16px] border border-[#eadfce] bg-[#fbf8f3] px-4 text-[14px] text-[#1f1a17] outline-none transition focus:border-[#d0a93d]"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-[13px] font-medium text-[#4b1f12]">
                    Enquiry Type
                  </span>
                  <select
                    name="topic"
                    defaultValue=""
                    className="h-13 w-full rounded-[16px] border border-[#eadfce] bg-[#fbf8f3] px-4 text-[14px] text-[#1f1a17] outline-none transition focus:border-[#d0a93d]"
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    <option value="therapy">Therapy Appointment</option>
                    <option value="product">Products</option>
                    <option value="consultation">Consultation</option>
                    <option value="general">General Enquiry</option>
                  </select>
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block text-[13px] font-medium text-[#4b1f12]">
                  Message
                </span>
                <textarea
                  name="message"
                  rows="6"
                  placeholder="Tell us a little about what you are looking for."
                  className="w-full rounded-[18px] border border-[#eadfce] bg-[#fbf8f3] px-4 py-4 text-[14px] leading-7 text-[#1f1a17] outline-none transition focus:border-[#d0a93d]"
                />
              </label>

              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-start gap-3 text-[13px] leading-6 text-[#7c726a]">
                  <FaRegCircleCheck className="mt-1 shrink-0 text-[#b8871f]" />
                  <p>
                    This form is currently a front-end contact experience. We
                    can connect it to email, Formspree, or your backend next.
                  </p>
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#d7b64f] to-[#bb9327] px-7 py-3 text-[14px] font-semibold text-white shadow-[0_12px_24px_rgba(187,147,39,0.28)] transition hover:-translate-y-0.5"
                >
                  <FaPaperPlane className="text-[13px]" />
                  Send Enquiry
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-8">
            <div className="rounded-[30px] bg-[linear-gradient(180deg,#5a2614_0%,#441c0f_100%)] p-7 text-white shadow-[0_24px_70px_rgba(65,32,17,0.12)] md:p-8">
              <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#e6ce84]">
                Visit Our Centre
              </p>
              <h2 className="mt-3 text-[28px] font-bold leading-tight md:text-[38px]">
                Sri Sri Wellbeing Holistic Health Mruthunjaya Ayur
              </h2>
              <p className="mt-4 text-[15px] leading-8 text-white/80">
                Chennai, Tamil Nadu, India
              </p>

              <div className="mt-8 grid gap-5 text-[14px] text-white/85">
                <div className="flex items-start gap-3">
                  <FaPhoneVolume className="mt-1 shrink-0 text-[#e6ce84]" />
                  <div>
                    <p className="font-semibold text-white">Phone</p>
                    <a href="tel:+917355259588" className="mt-1 inline-block">
                      +91 73552 59588
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaEnvelope className="mt-1 shrink-0 text-[#e6ce84]" />
                  <div>
                    <p className="font-semibold text-white">Email</p>
                    <a
                      href="mailto:care@srisriwellbeing.com"
                      className="mt-1 inline-block"
                    >
                      care@srisriwellbeing.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaClock className="mt-1 shrink-0 text-[#e6ce84]" />
                  <div>
                    <p className="font-semibold text-white">Hours</p>
                    <p className="mt-1">Monday to Sunday, by appointment</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaLocationDot className="mt-1 shrink-0 text-[#e6ce84]" />
                  <div>
                    <p className="font-semibold text-white">Directions</p>
                    <a
                      href="https://maps.google.com/?q=Sri%20Sri%20Wellbeing%20Holistic%20Health%20Mruthunjaya%20Ayur"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex items-center gap-2"
                    >
                      Open in Google Maps
                      <FaArrowRight className="text-[12px]" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-[30px] border border-[#e8dcc8] bg-white shadow-[0_24px_70px_rgba(65,32,17,0.08)]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d971.5871486254812!2d80.23289638266331!3d13.077079876095443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267da1c867203%3A0x796c52276b379c45!2sSri%20Sri%20Wellbeing%20Holistic%20Health%20Mruthunjaya%20Ayur!5e0!3m2!1sen!2sin!4v1776087225095!5m2!1sen!2sin"
                title="Sri Sri Wellbeing Chennai location"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="h-[320px] w-full border-0 md:h-[420px]"
              />
              <div className="px-6 py-5">
                <p className="text-[16px] font-semibold text-[#2d170f]">
                  Easy to locate, designed to slow you down.
                </p>
                <p className="mt-2 text-[14px] leading-7 text-[#6b625b]">
                  Plan your visit, speak to our team before arrival, or reach
                  out for help choosing the right therapy or wellness program.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

"use client";

import Image from "next/image";
import { FiSearch, FiPhone, FiCalendar } from "react-icons/fi";
import { SlLocationPin } from "react-icons/sl";
import { FaChevronDown } from "react-icons/fa6";
import { RiUserLocationLine } from "react-icons/ri";
import RevealOnScroll from "../Main/RevealOnScroll";

const campData = {
  doctor: "Dr. K Aravindhan",
  date: "20/05/2026",
  location: "Chennai, Tamil Nadu",
  contact: "Manickam M (9444004975)",
  address: "Gurukripa Agencies, No : 16, Aadhi Street , Villivakkam",
};

// Generate 7 identical cards for the mockup
const leftCards = [campData, campData, campData];
const rightCards = [campData, campData, campData];
const middleCard = campData;

const CampCard = ({ data }) => (
  <div className="rounded-[20px] bg-white p-6 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
    <h3 className="section-subtitle text-[#1f1a17]">
      {data.doctor}
    </h3>
    <div className="mt-2 mb-6 h-[2px] w-[32px] bg-[#d0a93d]" />

    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <FiCalendar className="mt-0.5 text-[18px] text-[#d0a93d] shrink-0" />
        <p className="small-text text-[#1f1a17]">{data.date}</p>
      </div>

      <div className="flex items-start gap-3">
        <SlLocationPin className="mt-0.5 text-[18px] text-[#d0a93d] shrink-0" />
        <p className="small-text text-[#1f1a17]">{data.location}</p>
      </div>

      <div className="flex items-start gap-3">
        <FiPhone className="mt-0.5 text-[18px] text-[#d0a93d] shrink-0" />
        <p className="small-text text-[#1f1a17]">{data.contact}</p>
      </div>

      <div className="flex items-start gap-3">
        <RiUserLocationLine className="mt-0.5 text-[18px] text-[#d0a93d] shrink-0" />
        <p className="small-text text-[#1f1a17] leading-relaxed">
          {data.address}
        </p>
      </div>
    </div>
  </div>
);

export default function NadiCampsSection() {
  return (
    <section className="relative bg-[#f9f8f6] section-padding">
      <div className="container-width">
        {/* Title */}
        <RevealOnScroll className="title-center mb-10 md:mb-12">
          <h2 className="section-title text-[#1f1a17]">
            Search Upcoming Nadi Camps
          </h2>
          <div className="mx-auto mt-4 h-[3px] w-[60px] rounded-full bg-[#d0a93d]" />
        </RevealOnScroll>

        {/* Search Bar */}
        <RevealOnScroll delay={0.1}>
          <div className="mx-auto max-w-[800px] mb-12 md:mb-16 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
            {/* Dates Dropdown */}
            <div className="relative w-full md:w-auto">
              <select className="w-full appearance-none rounded-full border border-gray-200 bg-white px-6 py-3 md:py-3.5 pr-12 text-sm font-medium text-[#7a726c] shadow-sm outline-none focus:border-[#d0a93d] focus:ring-1 focus:ring-[#d0a93d]">
                <option value="">All Dates</option>
                <option value="today">Today</option>
                <option value="this-week">This Week</option>
                <option value="this-month">This Month</option>
              </select>
              <FaChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-[12px] text-[#d0a93d] pointer-events-none" />
            </div>

            {/* Search Input */}
            <div className="relative w-full md:flex-1">
              <input
                type="text"
                placeholder="Search Doctor,State,city..."
                className="w-full rounded-full border border-gray-200 bg-white px-6 py-3 md:py-3.5 text-sm font-medium text-[#1f1a17] placeholder-[#7a726c] shadow-sm outline-none focus:border-[#d0a93d] focus:ring-1 focus:ring-[#d0a93d]"
              />
            </div>

            {/* Reset Button */}
            <button
              type="button"
              className="btn-small w-full md:w-auto bg-[#d0a93d] text-white shadow-md hover:bg-[#b8952b]"
            >
              Reset
            </button>
          </div>
        </RevealOnScroll>

        {/* Masonry Grid */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* Left Column */}
          <RevealOnScroll className="flex-1 flex flex-col gap-6 md:gap-8" delay={0.2}>
            {leftCards.map((card, idx) => (
              <CampCard key={`left-${idx}`} data={card} />
            ))}
          </RevealOnScroll>

          {/* Middle Column */}
          <RevealOnScroll className="flex-1 flex flex-col gap-6 md:gap-8" delay={0.3}>
            {/* Top Image */}
            <div className="relative h-[240px] md:h-[280px] w-full overflow-hidden rounded-[20px]">
              <Image
                src="/images/ser-1.jpg"
                alt="Treatment"
                fill
                className="object-cover"
              />
              {/* Fade out to white at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#f9f8f6] to-transparent" />
            </div>

            {/* Middle Card */}
            <CampCard data={middleCard} />

            {/* Bottom Image */}
            <div className="relative h-[240px] md:h-[280px] w-full overflow-hidden rounded-[20px]">
              <Image
                src="/images/ser-2.jpg"
                alt="Treatment"
                fill
                className="object-cover"
              />
              {/* Fade out to white at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#f9f8f6] to-transparent" />
            </div>
          </RevealOnScroll>

          {/* Right Column */}
          <RevealOnScroll className="flex-1 flex flex-col gap-6 md:gap-8" delay={0.4}>
            {rightCards.map((card, idx) => (
              <CampCard key={`right-${idx}`} data={card} />
            ))}
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

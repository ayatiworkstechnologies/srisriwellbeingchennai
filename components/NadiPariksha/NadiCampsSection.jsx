"use client";

import { useState } from "react";
import Image from "next/image";
import { FiSearch, FiPhone, FiCalendar } from "react-icons/fi";
import { SlLocationPin } from "react-icons/sl";
import { FaChevronDown } from "react-icons/fa6";
import { RiUserLocationLine } from "react-icons/ri";
import RevealOnScroll from "../Main/RevealOnScroll";
import WellnessButton from "../layouts/WellnessButton";

import { camps } from "./nadiParikshaData";

const CampCard = ({ data }) => (
  <div className="rounded-[20px] bg-white p-6 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] h-fit">
    <h3 className="section-subtitle text-[#1f1a17]">{data.doctor}</h3>
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
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const filteredCamps = camps.filter((camp) => {
    const matchesSearch =
      camp.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      camp.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      camp.address.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDate = dateFilter === "" || camp.type === dateFilter;

    return matchesSearch && matchesDate;
  });

  const handleReset = () => {
    setSearchQuery("");
    setDateFilter("");
  };

  // Split filtered results into 3 columns for the masonry-like layout
  const leftCards = filteredCamps.filter((_, i) => i % 3 === 0);
  const middleCards = filteredCamps.filter((_, i) => i % 3 === 1);
  const rightCards = filteredCamps.filter((_, i) => i % 3 === 2);

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
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full appearance-none rounded-full border border-gray-200 bg-white px-6 py-3 md:py-3.5 pr-12 text-sm font-medium text-[#7a726c] shadow-sm outline-none focus:border-[#d0a93d] focus:ring-1 focus:ring-[#d0a93d]"
              >
                <option value="">All Dates</option>
                <option value="today">Today</option>
                <option value="this-week">This Week</option>
                <option value="this-month">This Month</option>
                <option value="upcoming">Upcoming</option>
              </select>
              <FaChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-[12px] text-[#d0a93d] pointer-events-none" />
            </div>

            {/* Search Input */}
            <div className="relative w-full md:flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Doctor, State, city..."
                className="w-full rounded-full border border-gray-200 bg-white px-6 py-3 md:py-3.5 text-sm font-medium text-[#1f1a17] placeholder-[#7a726c] shadow-sm outline-none focus:border-[#d0a93d] focus:ring-1 focus:ring-[#d0a93d]"
              />
            </div>

            {/* Reset Button */}
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-3 rounded-full bg-[#3b2218] text-white text-sm font-semibold hover:bg-[#c79f31] transition-colors duration-300"
            >
              Reset ↺
            </button>
          </div>
        </RevealOnScroll>

        {/* Masonry Grid */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 min-h-[400px]">
          {/* Left Column */}
          <RevealOnScroll
            className="flex-1 flex flex-col gap-6 md:gap-8"
            delay={0.2}
          >
            {leftCards.map((card) => (
              <CampCard key={card.id} data={card} />
            ))}
          </RevealOnScroll>

          {/* Middle Column */}
          <RevealOnScroll
            className="flex-1 flex flex-col gap-6 md:gap-8"
            delay={0.3}
          >
            {/* Top Image - always show if not empty? Or only on initial? */}
            <div className="relative h-[240px] md:h-[280px] w-full overflow-hidden rounded-[20px]">
              <Image
                src="/images/nadi/img-5.png"
                alt="Treatment"
                fill
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#f9f8f6] to-transparent" />
            </div>

            {middleCards.map((card) => (
              <CampCard key={card.id} data={card} />
            ))}

            {/* Bottom Image */}
            <div className="relative h-[240px] md:h-[280px] w-full overflow-hidden rounded-[20px]">
              <Image
                src="/images/nadi/img-4.png"
                alt="Treatment"
                fill
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#f9f8f6] to-transparent" />
            </div>
          </RevealOnScroll>

          {/* Right Column */}
          <RevealOnScroll
            className="flex-1 flex flex-col gap-6 md:gap-8"
            delay={0.4}
          >
            {rightCards.map((card) => (
              <CampCard key={card.id} data={card} />
            ))}
          </RevealOnScroll>
        </div>

        {filteredCamps.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[#7a726c] text-lg">
              No camps found matching your search.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

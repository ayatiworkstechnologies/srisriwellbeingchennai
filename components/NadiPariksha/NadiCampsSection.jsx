"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import { FiPhone, FiCalendar } from "react-icons/fi";
import { SlLocationPin } from "react-icons/sl";
import { FaChevronDown } from "react-icons/fa6";
import { RiUserLocationLine } from "react-icons/ri";
import RevealOnScroll from "../Main/RevealOnScroll";
import WellnessButton from "../layouts/WellnessButton";
import BookingModal from "../booking/BookingModal";
import { camps } from "./nadiParikshaData";
import { listPublicNadiCamps } from "@/lib/api";

function parseCampDate(value = "") {
  const [day, month, year] = value.split("/").map(Number);
  if (!day || !month || !year) return null;
  return new Date(year, month - 1, day);
}

function campDateToISO(value = "") {
  const [day, month, year] = value.split("/").map(Number);
  if (!day || !month || !year) return "";
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function getCampType(campDate) {
  const date = parseCampDate(campDate);
  if (!date) return "upcoming";

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);

  const diffDays = Math.round((date.getTime() - today.getTime()) / 86400000);

  if (diffDays === 0) return "today";
  if (diffDays >= 0 && diffDays <= 7) return "this-week";
  if (date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()) {
    return "this-month";
  }
  return "upcoming";
}

function normalizeCamp(item) {
  const date = item.camp_date || item.date || "";
  return {
    id: item.id,
    doctor: item.doctor,
    date,
    location: item.location,
    contact: item.contact,
    address: item.address,
    type: item.type || getCampType(date),
  };
}

const CampCard = ({ data, onBook }) => (
  <div className="h-fit rounded-[20px] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] md:p-8">
    <h3 className="section-subtitle text-[#1f1a17]">{data.doctor}</h3>
    <div className="mb-6 mt-2 h-[2px] w-[32px] bg-[#d0a93d]" />

    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <FiCalendar className="mt-0.5 shrink-0 text-[18px] text-[#d0a93d]" />
        <p className="small-text text-[#1f1a17]">{data.date}</p>
      </div>

      <div className="flex items-start gap-3">
        <SlLocationPin className="mt-0.5 shrink-0 text-[18px] text-[#d0a93d]" />
        <p className="small-text text-[#1f1a17]">{data.location}</p>
      </div>

      <div className="flex items-start gap-3">
        <FiPhone className="mt-0.5 shrink-0 text-[18px] text-[#d0a93d]" />
        <p className="small-text text-[#1f1a17]">{data.contact}</p>
      </div>

      <div className="flex items-start gap-3">
        <RiUserLocationLine className="mt-0.5 shrink-0 text-[18px] text-[#d0a93d]" />
        <p className="small-text leading-relaxed text-[#1f1a17]">
          {data.address}
        </p>
      </div>
    </div>

    <div className="mt-6">
      <WellnessButton label="Book Now" onClick={() => onBook(data)} />
    </div>
  </div>
);

export default function NadiCampsSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [campItems, setCampItems] = useState(() => camps.map(normalizeCamp));
  const [selectedCamp, setSelectedCamp] = useState(null);

  useEffect(() => {
    let active = true;

    async function loadCamps() {
      try {
        const items = await listPublicNadiCamps();
        if (!active || !Array.isArray(items) || items.length === 0) return;
        setCampItems(items.map(normalizeCamp));
      } catch {
        if (active) {
          setCampItems(camps.map(normalizeCamp));
        }
      }
    }

    loadCamps();

    return () => {
      active = false;
    };
  }, []);

  const filteredCamps = useMemo(() => campItems.filter((camp) => {
    const matchesSearch =
      camp.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      camp.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      camp.address.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDate = dateFilter === "" || camp.type === dateFilter;

    return matchesSearch && matchesDate;
  }), [campItems, dateFilter, searchQuery]);

  const handleReset = () => {
    setSearchQuery("");
    setDateFilter("");
  };

  const selectedCampOffering = selectedCamp
    ? {
        title: `Nadi Pariksha Camp - ${selectedCamp.location}`,
        bookingTitle: "Nadi Pariksha",
        detailsTitle: "Camp Details",
        image: "/images/nadi/img-2.png",
        duration: selectedCamp.date,
        summary: `${selectedCamp.doctor} | ${selectedCamp.location}`,
        description: `Book your Nadi Pariksha consultation with ${selectedCamp.doctor} at ${selectedCamp.address}. Our team will confirm your live slot after you choose an available time.`,
        benefits: [
          "Ayurvedic pulse diagnosis consultation",
          "Local camp support and guided follow-up",
          "Easy access to recommended therapies",
          `Contact support: ${selectedCamp.contact}`,
        ],
      }
    : null;

  return (
    <section className="section-padding relative bg-[#f9f8f6]">
      <div className="container-width">
        <RevealOnScroll className="title-center mb-10 md:mb-12">
          <h2 className="section-title text-[#1f1a17]">
            Search Upcoming Nadi Camps
          </h2>
          <div className="mx-auto mt-4 h-[3px] w-[60px] rounded-full bg-[#d0a93d]" />
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <div className="mx-auto mb-12 flex max-w-[800px] flex-col items-center justify-center gap-4 md:mb-16 md:flex-row md:gap-6">
            <div className="relative w-full md:w-auto">
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full appearance-none rounded-full border border-gray-200 bg-white px-6 py-3 pr-12 text-sm font-medium text-[#7a726c] shadow-sm outline-none focus:border-[#d0a93d] focus:ring-1 focus:ring-[#d0a93d] md:py-3.5"
              >
                <option value="">All Dates</option>
                <option value="today">Today</option>
                <option value="this-week">This Week</option>
                <option value="this-month">This Month</option>
                <option value="upcoming">Upcoming</option>
              </select>
              <FaChevronDown className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 text-[12px] text-[#d0a93d]" />
            </div>

            <div className="relative w-full md:flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search doctor, state, city..."
                className="w-full rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-medium text-[#1f1a17] shadow-sm outline-none focus:border-[#d0a93d] focus:ring-1 focus:ring-[#d0a93d] placeholder-[#7a726c] md:py-3.5"
              />
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="rounded-full bg-[#3b2218] px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#c79f31]"
            >
              Reset
            </button>
          </div>
        </RevealOnScroll>

        <div className="min-h-[400px]">
          <RevealOnScroll delay={0.2}>
            <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
              {filteredCamps.reduce((acc, card, index) => {
                acc.push(
                  <CampCard
                    key={card.id}
                    data={card}
                    onBook={setSelectedCamp}
                  />
                );

                if (index === 0) {
                  acc.push(
                    <div
                      key="img-1"
                      className="relative h-[280px] w-full overflow-hidden rounded-[20px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] sm:h-[350px]"
                    >
                      <Image
                        src="/images/nadi/img-2.png"
                        alt="Nadi Pariksha Care"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#f9f8f6] to-transparent opacity-80" />
                    </div>
                  );
                }

                if (index === 5) {
                  acc.push(
                    <div
                      key="img-2"
                      className="relative h-[280px] w-full overflow-hidden rounded-[20px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] sm:h-[350px]"
                    >
                      <Image
                        src="/images/nadi/img-6.png"
                        alt="Nadi Pariksha Wellness"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#f9f8f6] to-transparent opacity-80" />
                    </div>
                  );
                }

                return acc;
              }, [])}
            </div>
          </RevealOnScroll>
        </div>

        {filteredCamps.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-lg text-[#7a726c]">
              No camps found matching your search.
            </p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedCamp && selectedCampOffering ? (
          <BookingModal
            offering={selectedCampOffering}
            initialDate={campDateToISO(selectedCamp.date)}
            lockedDate
            initialNotes={`Nadi camp: ${selectedCamp.doctor}, ${selectedCamp.location}, ${selectedCamp.address}. Contact: ${selectedCamp.contact}.`}
            onClose={() => setSelectedCamp(null)}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
}

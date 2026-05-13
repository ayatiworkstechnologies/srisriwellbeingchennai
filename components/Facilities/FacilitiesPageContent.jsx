"use client";

import FacilitiesIntro from "./FacilitiesIntro";
import FacilitiesGrid from "./FacilitiesGrid";
import FacilitiesStaySection from "./FacilitiesStaySection";
import FacilitiesCTA from "./FacilitiesCTA";

export default function FacilitiesPageContent() {
  return (
    <main className="bg-[#fcfaf7] text-[#1c1714]">
      <FacilitiesIntro />
      <FacilitiesGrid />
      <FacilitiesStaySection />
      <FacilitiesCTA />
    </main>
  );
}

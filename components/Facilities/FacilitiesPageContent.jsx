"use client";

import FacilitiesIntro from "./FacilitiesIntro";
import FacilitiesSlider from "./FacilitiesSlider";
import FacilitiesGrid from "./FacilitiesGrid";
import FacilitiesCTA from "./FacilitiesCTA";

export default function FacilitiesPageContent() {
  return (
    <main className="bg-[#fcfaf7] text-[#1c1714]">
      <FacilitiesIntro />
      <FacilitiesSlider />
      <FacilitiesGrid />
      <FacilitiesCTA />
    </main>
  );
}

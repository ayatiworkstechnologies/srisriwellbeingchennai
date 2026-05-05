"use client";

import RelaxationTherapies from "@/components/Relax/RelaxationTherapies";
import TestimoniesSection from "@/components/Main/TestimoniesSection";
import PageHero from "@/components/layouts/PageHero";
import { relaxHero, testimonials } from "@/components/Relax/relaxData";

export default function RelaxationTherapyPage() {
  return (
    <main className="min-h-screen bg-[#f8f6f1]">
      <PageHero
        heroImage={relaxHero.image}
        mobileImage={relaxHero.mobimage}
        heroImageAlt="Relaxation Therapy Ayurvedic Rejuvenation"
      />
      <RelaxationTherapies />
      <TestimoniesSection data={testimonials} className="bg-white" />
    </main>
  );
}

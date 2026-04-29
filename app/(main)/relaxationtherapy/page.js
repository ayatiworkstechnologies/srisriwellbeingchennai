"use client";

import RelaxationTherapies from "@/components/Relax/RelaxationTherapies";
import CampaignTestimonials from "@/components/Campaign/CampaignTestimonials";
import PageHero from "@/components/layouts/PageHero";
import { relaxHero } from "@/components/Relax/relaxData";

export default function RelaxationTherapyPage() {
  return (
    <main className="min-h-screen bg-[#f8f6f1]">
      <PageHero
        title={relaxHero.title}
        subtitle={relaxHero.subtitle}
        heroImage={relaxHero.image}
        heroImageAlt="Relaxation Therapy Ayurvedic Rejuvenation"
        paragraphs={[relaxHero.description]}
        primaryButton={{ label: relaxHero.ctaLabel, href: relaxHero.ctaHref }}
        bgColor="#3b2218"
      />

      <RelaxationTherapies />
      <CampaignTestimonials />
    </main>
  );
}

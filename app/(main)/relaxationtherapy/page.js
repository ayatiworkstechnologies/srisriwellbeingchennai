"use client";

import RelaxationTherapies from "@/components/Relax/RelaxationTherapies";
import CampaignTestimonials from "@/components/Campaign/CampaignTestimonials";
import PageHero from "@/components/layouts/PageHero";

export default function RelaxationTherapyPage() {
  return (
    <main className="min-h-screen bg-[#f8f6f1]">
      <PageHero
        subtitle="Divine Sanctuary"
        title="Relaxation Therapy"
        heroImage="/images/1446.jpg"
        heroImageAlt="Relaxation therapy at Sri Sri Wellbeing"
       
        paragraphs={[
          "Step into a world of profound stillness. Our ancient Ayurvedic protocols are meticulously designed to dissolve stress and awaken your inner vitality.",
        ]}
      />

      <RelaxationTherapies />
      <CampaignTestimonials />
    </main>
  );
}

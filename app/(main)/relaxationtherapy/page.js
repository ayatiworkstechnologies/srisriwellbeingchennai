import RelaxationTherapies from "@/components/Relax/RelaxationTherapies";
import TestimoniesSection from "@/components/Main/TestimoniesSection";
import PageHero from "@/components/layouts/PageHero";
import { relaxHero } from "@/components/Relax/relaxData";
import { getPageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return getPageMetadata("relax", {
    title:
      "Relaxation Therapy | Ayurvedic Renewal & Rejuvenation | Sri Sri Wellbeing Chennai",
    description:
      "Explore Ayurvedic relaxation therapies, renewal rituals, hair care, and facial rejuvenation at Sri Sri Wellbeing Chennai.",
  });
}

export default function RelaxationTherapyPage() {
  return (
    <main className="min-h-screen bg-[#f8f6f1]">
      <PageHero
        heroImage={relaxHero.image}
        mobileImage={relaxHero.mobimage}
        heroImageAlt="Relaxation Therapy Ayurvedic Rejuvenation"
        imageClassName="object-cover object-center"
      />
      <RelaxationTherapies />
      <TestimoniesSection category="relax" className="bg-white" />
    </main>
  );
}

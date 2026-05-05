import PageHero from "@/components/layouts/PageHero";
import NadiStatsSection from "@/components/NadiPariksha/NadiStatsSection";
import NadiConditionsSection from "@/components/NadiPariksha/NadiConditionsSection";
import TestimoniesSection from "@/components/Main/TestimoniesSection";
import NadiCampsSection from "@/components/NadiPariksha/NadiCampsSection";
import NadiFAQSection from "@/components/NadiPariksha/NadiFAQSection";
import { heroContent, testimonials } from "@/components/NadiPariksha/nadiParikshaData";

export const metadata = {
  title:
    "Nadi Pariksha – Ayurvedic Pulse Diagnosis | Sri Sri Wellbeing Chennai",
  description:
    "Discover Nadi Pariksha, an ancient non-invasive pulse diagnosis technique rooted in Ayurveda. Assess your doshas, organ health, and get personalised treatment plans at Sri Sri Wellbeing Chennai.",
};

export default function NadiParikshaPage() {
  return (
    <>
      <PageHero
        heroImage={heroContent.image}
        mobileImage={heroContent.mobimage}
        heroImageAlt="Nadi Pariksha Ayurvedic Pulse Diagnosis"
      />
      <NadiStatsSection />
      <NadiConditionsSection />
      <TestimoniesSection data={testimonials} />
      <NadiCampsSection />
      <NadiFAQSection />
    </>
  );
}

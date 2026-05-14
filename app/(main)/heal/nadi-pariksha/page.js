import PageHero from "@/components/layouts/PageHero";
import NadiIntroSection from "@/components/NadiPariksha/NadiIntroSection";
import NadiStatsSection from "@/components/NadiPariksha/NadiStatsSection";
import NadiConditionsSection from "@/components/NadiPariksha/NadiConditionsSection";
import TestimoniesSection from "@/components/Main/TestimoniesSection";
import NadiCampsSection from "@/components/NadiPariksha/NadiCampsSection";
import NadiFAQSection from "@/components/NadiPariksha/NadiFAQSection";
import { heroContent } from "@/components/NadiPariksha/nadiParikshaData";
import { getPageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return getPageMetadata("nadi-pariksha", {
    title: "Nadi Pariksha - Ayurvedic Pulse Diagnosis | Sri Sri Wellbeing Chennai",
    description:
      "Discover Nadi Pariksha, an ancient non-invasive pulse diagnosis technique rooted in Ayurveda. Assess your doshas, organ health, and get personalised treatment plans at Sri Sri Wellbeing Chennai.",
  });
}

export default function NadiParikshaPage() {
  return (
    <>
      <PageHero
        heroImage={heroContent.image}
        mobileImage={heroContent.mobimage}
        heroImageAlt="Nadi Pariksha Ayurvedic Pulse Diagnosis"
      />
      <NadiIntroSection />
      <NadiStatsSection />
      <NadiConditionsSection />
      <TestimoniesSection category="nadi" />
      <NadiCampsSection />
      <NadiFAQSection />
    </>
  );
}

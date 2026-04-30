import PageHero from "@/components/layouts/PageHero";
import NadiStatsSection from "@/components/NadiPariksha/NadiStatsSection";
import NadiConditionsSection from "@/components/NadiPariksha/NadiConditionsSection";
import NadiTestimonialSection from "@/components/NadiPariksha/NadiTestimonialSection";
import NadiCampsSection from "@/components/NadiPariksha/NadiCampsSection";
import NadiFAQSection from "@/components/NadiPariksha/NadiFAQSection";
import { heroContent } from "@/components/NadiPariksha/nadiParikshaData";

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
        title={heroContent.title}
        heroImage={heroContent.image}
        mobileImage={heroContent.mobimage}
        heroImageAlt="Nadi Pariksha Ayurvedic Pulse Diagnosis"
        paragraphs={heroContent.description}
      />
      <NadiStatsSection />
      <NadiConditionsSection />
      <NadiTestimonialSection />
      <NadiCampsSection />
      <NadiFAQSection />
    </>
  );
}

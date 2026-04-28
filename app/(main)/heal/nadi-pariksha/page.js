import PageHero from "@/components/layouts/PageHero";
import NadiStatsSection from "@/components/NadiPariksha/NadiStatsSection";
import NadiBenefitsSection from "@/components/NadiPariksha/NadiBenefitsSection";
import NadiConditionsSection from "@/components/NadiPariksha/NadiConditionsSection";
import NadiTestimonialSection from "@/components/NadiPariksha/NadiTestimonialSection";
import NadiGallerySection from "@/components/NadiPariksha/NadiGallerySection";
import NadiProcessSection from "@/components/NadiPariksha/NadiProcessSection";
import NadiExpertsSection from "@/components/NadiPariksha/NadiExpertsSection";
import NadiFAQSection from "@/components/NadiPariksha/NadiFAQSection";
import NadiCTASection from "@/components/NadiPariksha/NadiCTASection";

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
        title="Nadi Pariksha"
        heroImage="/images/ser-1.jpg"
        heroImageAlt="Nadi Pariksha Ayurvedic Pulse Diagnosis"
        paragraphs={[
          "Nadi Pariksha is an ancient, non-invasive pulse diagnosis technique rooted in Ayurveda. By analysing your pulse, it reveals imbalances in your doshas, assesses organ health, and provides deep insights into your physical, emotional, and mental wellbeing.",
          "It helps identify potential health concerns early and the Ayurveda Nadi Vaidya can guide the right diet, lifestyle changes, Ayurvedic supplements, and treatments personalised just for you.",
        ]}
      />
      <NadiStatsSection />
      <NadiConditionsSection />
      <NadiProcessSection />
      <NadiExpertsSection />
      <NadiTestimonialSection />
      <NadiGallerySection />
      <NadiFAQSection />
      <NadiCTASection />
      <NadiBenefitsSection />
    </>
  );
}

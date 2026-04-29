import PageHero from "@/components/layouts/PageHero";
import AltStatsSection from "@/components/AlternativeTreatments/AltStatsSection";
import AltPhilosophySection from "@/components/AlternativeTreatments/AltPhilosophySection";
import AltTreatmentsGrid from "@/components/AlternativeTreatments/AltTreatmentsGrid";
import AltFAQSection from "@/components/AlternativeTreatments/AltFAQSection";
import {
  heroContent,
  stats,
  treatments,
} from "@/components/AlternativeTreatments/alternativeTreatmentsData";

export const metadata = {
  title:
    "Alternative Treatments | Holistic Healing Therapies | Sri Sri Wellbeing Chennai",
  description:
    "Explore 14+ alternative treatment modalities at Sri Sri Wellbeing Chennai — including Craniosacral Therapy, Osteopathy, Ozone Therapy, Marma, Meru Chikitsa, Reflexology, Live Blood Analysis, and more. Ancient wisdom meets modern science.",
};

export default function AlternativeTreatmentsPage() {
  return (
    <>
      <PageHero
        title={heroContent.title}
        subtitle={heroContent.subtitle}
        heroImage={heroContent.image}
        heroImageAlt="Alternative Treatments at Sri Sri Wellbeing"
        paragraphs={[heroContent.description]}
        primaryButton={{ label: heroContent.ctaLabel, href: heroContent.ctaHref }}
        bgColor="#3b2218"
      />
      <AltStatsSection stats={stats} />
      <AltPhilosophySection />
      <AltTreatmentsGrid treatments={treatments} />
      <AltFAQSection />
    </>
  );
}

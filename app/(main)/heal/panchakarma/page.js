// Panchakarma Page Component
import PageHero from "@/components/layouts/PageHero";
import PKStatsSection from "@/components/Panchakarma/PKStatsSection";
import PKPhilosophySection from "@/components/Panchakarma/PKPhilosophySection";
import PKCoreTherapies from "@/components/Panchakarma/PKCoreTherapies";
import PKOtherTreatments from "@/components/Panchakarma/PKOtherTreatments";
import PKFAQSection from "@/components/Panchakarma/PKFAQSection";
import {
  heroContent,
  stats,
  coreTherapies,
  otherTreatments,
} from "@/components/Panchakarma/panchakarmaData";

export const metadata = {
  title:
    "Panchakarma Therapies | Ayurvedic Detoxification | Sri Sri Wellbeing Chennai",
  description:
    "Experience authentic Panchakarma — the five-fold Ayurvedic detoxification process including Vamana, Virechana, Vasti, Nasya and Raktamokshana. Complemented by 30+ therapeutic treatments at Sri Sri Wellbeing Chennai.",
};

export default function PanchakarmaPage() {
  return (
    <>
      <PageHero
        title={heroContent.title}
        subtitle={heroContent.subtitle}
        heroImage={heroContent.image}
        heroImageAlt="Panchakarma Ayurvedic Detoxification Therapies"
        paragraphs={[heroContent.description]}
        primaryButton={{ label: heroContent.ctaLabel, href: heroContent.ctaHref }}
        bgColor="#3b2218"
      />
      <PKStatsSection stats={stats} />
      <PKPhilosophySection />
      <PKCoreTherapies coreTherapies={coreTherapies} />
      <PKOtherTreatments treatments={otherTreatments} />
      <PKFAQSection />
    </>
  );
}

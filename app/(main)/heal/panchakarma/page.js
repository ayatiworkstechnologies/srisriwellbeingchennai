// Panchakarma Page Component
import PageHero from "@/components/layouts/PageHero";
import PKCoreTherapies from "@/components/Panchakarma/PKCoreTherapies";
import PKOtherTreatments from "@/components/Panchakarma/PKOtherTreatments";
import PKFAQSection from "@/components/Panchakarma/PKFAQSection";
import {
  heroContent,
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
        heroImage={heroContent.image}
        mobileImage={heroContent.mobimage}
        heroImageAlt="Panchakarma Ayurvedic Detoxification Therapies"
      />

      <PKCoreTherapies coreTherapies={coreTherapies} />
      <PKOtherTreatments treatments={otherTreatments} />
      <PKFAQSection />
    </>
  );
}

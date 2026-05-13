import PageHero from "@/components/layouts/PageHero";
import AltTreatmentsGrid from "@/components/AlternativeTreatments/AltTreatmentsGrid";
import TestimoniesSection from "@/components/Main/TestimoniesSection";
import {
  heroContent,
  treatments,
} from "@/components/AlternativeTreatments/alternativeTreatmentsData";
import { getPageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return getPageMetadata("alternative-treatments", {
    title:
      "Alternative Treatments | Holistic Healing Therapies | Sri Sri Wellbeing Chennai",
    description:
      "Explore our specialized alternative treatment modalities at Sri Sri Wellbeing Chennai including Osteopathy, Ozone Therapy, Marma Chikitsa, Meru Chikitsa, Reflexology, Manual Lymphatic Drainage, and more. Ancient wisdom meets modern science.",
  });
}

export default function AlternativeTreatmentsPage() {
  return (
    <>
      <PageHero
        heroImage={heroContent.image}
        mobileImage={heroContent.mobimage}
        heroImageAlt="Alternative Treatments at Sri Sri Wellbeing"
      />
      <AltTreatmentsGrid treatments={treatments} />
      <TestimoniesSection />
    </>
  );
}

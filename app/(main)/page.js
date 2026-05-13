import dynamic from "next/dynamic";
import HeroSection from "@/components/Main/HeroSection";
import IntroSection from "@/components/Main/IntroSection";
import { getPageMetadata } from "@/lib/seo";

const HomeFacilitiesSection = dynamic(() => import("@/components/Main/HomeFacilitiesSection"), {
  loading: () => null,
});
const ServicesSection = dynamic(() => import("@/components/Main/ServicesSection"), {
  loading: () => null,
});
const NadiCampsSection = dynamic(() => import("@/components/NadiPariksha/NadiCampsSection"), {
  loading: () => null,
});
const ExperienceSection = dynamic(() => import("@/components/Main/ExperienceSection"), {
  loading: () => null,
});
const SignatureLearningSection = dynamic(() => import("@/components/Main/SignatureLearningSection"), {
  loading: () => null,
});
const TestimoniesSection = dynamic(() => import("@/components/Main/TestimoniesSection"), {
  loading: () => null,
});

export async function generateMetadata() {
  return getPageMetadata("home");
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <IntroSection />
      <HomeFacilitiesSection />
      <ServicesSection />
      <NadiCampsSection />
      <ExperienceSection />
      <SignatureLearningSection />
      <TestimoniesSection />
    </>
  );
}

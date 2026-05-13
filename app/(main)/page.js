import HeroSection from "@/components/Main/HeroSection";
import IntroSection from "@/components/Main/IntroSection";
import HomeFacilitiesSection from "@/components/Main/HomeFacilitiesSection";
import ServicesSection from "@/components/Main/ServicesSection";
import ExperienceSection from "@/components/Main/ExperienceSection";
import SignatureLearningSection from "@/components/Main/SignatureLearningSection";
import TestimoniesSection from "@/components/Main/TestimoniesSection";
import NadiCampsSection from "@/components/NadiPariksha/NadiCampsSection";
import { getPageMetadata } from "@/lib/seo";

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

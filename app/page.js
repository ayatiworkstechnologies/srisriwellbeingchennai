import HeroSection from "@/components/Main/HeroSection";
import IntroSection from "@/components/Main/IntroSection";
import ContinuumSection from "@/components/Main/ContinuumSection";
import ServicesSection from "@/components/Main/ServicesSection";
import CollectionSection from "@/components/Main/CollectionSection";
import ExperienceSection from "@/components/Main/ExperienceSection";
import SignatureLearningSection from "@/components/Main/SignatureLearningSection";
import TestimoniesSection from "@/components/Main/TestimoniesSection";
import ScrollStackSections from "@/components/Main/ScrollStackSections";
import TailoredPathwaysSection from "@/components/Main/TailoredPathwaysSection";


export default function HomePage() {
  return (
    <>
      <HeroSection />
      <IntroSection />
      <ContinuumSection />
      <ServicesSection />
      <CollectionSection />
      <ExperienceSection />
      <SignatureLearningSection />
      {/* <ScrollStackSections /> */}
      {/* <TailoredPathwaysSection /> */}
      <TestimoniesSection />
    </>
  );
}

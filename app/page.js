import HeroSection from "@/components/Main/HeroSection";
import IntroSection from "@/components/Main/IntroSection";
import ContinuumSection from "@/components/Main/ContinuumSection";
import ServicesSection from "@/components/Main/ServicesSection";
import CollectionSection from "@/components/Main/CollectionSection";
import ExperienceSection from "@/components/Main/ExperienceSection";
import TailoredPathwaysSection from "@/components/Main/TailoredPathwaysSection";
import TestimoniesSection from "@/components/Main/TestimoniesSection";
import SectionReveal from "@/components/Main/SectionReveal";
import LearningSection from "@/components/Main/LearningSection";

export default function HomePage() {
  return (
    <>
      <SectionReveal y={0}>
        <HeroSection />
      </SectionReveal>
      <SectionReveal delay={0.05}>
        <IntroSection />
      </SectionReveal>
      <SectionReveal delay={0.08}>
        <ContinuumSection />
      </SectionReveal>
      <SectionReveal delay={0.1}>
        <ServicesSection />
      </SectionReveal>
      <SectionReveal delay={0.1}>
        <CollectionSection />
      </SectionReveal>
      <SectionReveal delay={0.12}>
        <ExperienceSection />
      </SectionReveal>
      <TailoredPathwaysSection />
      {/* <LearningSection /> */}
      <SectionReveal delay={0.12}>
        <TestimoniesSection />
      </SectionReveal>
    </>
  );
}

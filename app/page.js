import HeroSection from "@/components/Main/HeroSection";
import IntroSection from "@/components/Main/IntroSection";
import ContinuumSection from "@/components/Main/ContinuumSection";
import ServicesSection from "@/components/Main/ServicesSection";
import CollectionSection from "@/components/Main/CollectionSection";
import ExperienceSection from "@/components/Main/ExperienceSection";
import TailoredPathwaysSection from "@/components/Main/TailoredPathwaysSection";
import TestimoniesSection from "@/components/Main/TestimoniesSection";
import RevealOnScroll from "@/components/Main/RevealOnScroll";

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <RevealOnScroll>
        <IntroSection />
      </RevealOnScroll>

      <RevealOnScroll delay={0.1}>
        <ContinuumSection />
      </RevealOnScroll>

      <RevealOnScroll delay={0.1}>
        <ServicesSection />
      </RevealOnScroll>

      <RevealOnScroll delay={0.15}>
        <CollectionSection />
      </RevealOnScroll>

      <RevealOnScroll delay={0.1}>
        <ExperienceSection />
      </RevealOnScroll>

      {/* <TailoredPathwaysSection /> */}

      <RevealOnScroll delay={0.1}>
        <TestimoniesSection />
      </RevealOnScroll>
    </>
  );
}

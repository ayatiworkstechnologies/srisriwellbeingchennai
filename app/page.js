
import HeroSection from "@/components/Main/HeroSection";
import IntroSection from "@/components/Main/IntroSection";
import PathwaysSection from "@/components/Main/PathwaysSection";
import TherapiesSection from "@/components/Main/TherapiesSection";
import SanctuarySection from "@/components/Main/SanctuarySection";
import LearningSection from "@/components/Main/LearningSection";
import SectionReveal from "@/components/Main/SectionReveal";


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
        <PathwaysSection />
      </SectionReveal>
      <SectionReveal delay={0.1}>
        <TherapiesSection />
      </SectionReveal>
      <SectionReveal delay={0.1}>
        <SanctuarySection />
      </SectionReveal>
      <SectionReveal delay={0.12}>
        <LearningSection />
      </SectionReveal>
    </>
  );
}

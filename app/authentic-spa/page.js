import AuthenticSpaHeader from "@/components/Campaign/AuthenticSpaHeader";
import AuthenticSpaFooter from "@/components/Campaign/AuthenticSpaFooter";
import AuthenticSpaContact from "@/components/Campaign/AuthenticSpaContact";
import CampaignHero from "@/components/Campaign/CampaignHero";
import IntroSection from "@/components/Main/IntroSection";
import ContinuumSection from "@/components/Main/ContinuumSection";
import ServicesSection from "@/components/Main/ServicesSection";
import CollectionSection from "@/components/Main/CollectionSection";
import ExperienceSection from "@/components/Main/ExperienceSection";
import SignatureLearningSection from "@/components/Main/SignatureLearningSection";
import TestimoniesSection from "@/components/Main/TestimoniesSection";

export const metadata = {
  title: "Authentic Spa Experience | Sri Sri Wellbeing Chennai",
  description:
    "Immerse yourself in our premium, authentic Ayurvedic spa treatments in Chennai. Discover holistic healing and deep relaxation today.",
};

export default function AuthenticSpaPage() {
  return (
    <div className="bg-[#f5f2ec] min-h-screen font-secondary">
      <AuthenticSpaHeader />
      <main>
        <CampaignHero />
        <IntroSection />
        <ContinuumSection />
        <ServicesSection />
        {/* <CollectionSection /> */}
        <ExperienceSection />
        <SignatureLearningSection />
        <TestimoniesSection />
        <AuthenticSpaContact />
      </main>
      <AuthenticSpaFooter />
    </div>
  );
}

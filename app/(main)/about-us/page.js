import PageHero from "@/components/layouts/PageHero";
import AboutContent from "@/components/AboutUs/AboutContent";

export const metadata = {
  title: "About Us | Sri Sri Wellbeing Chennai",
  description: "Learn about Sri Sri Wellbeing Chennai, an elevated Ayurvedic sanctuary where ancient wisdom is reinterpreted for the discerning modern lifestyle.",
};

export default function AboutUsPage() {
  return (
    <>
      <PageHero
        title="About Us"
        subtitle="Our Philosophy"
        heroImage="/images/ayurveda-banner.jpg"
        heroImageAlt="About Sri Sri Wellbeing"
        paragraphs={[
          "Redefining Wellness. Discovering Wellbeing.",
        ]}
        bgColor="#3b2218"
      />
      <AboutContent />
    </>
  );
}

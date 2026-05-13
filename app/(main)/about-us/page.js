import PageHero from "@/components/layouts/PageHero";
import AboutContent from "@/components/AboutUs/AboutContent";
import { getPageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return getPageMetadata("about", {
    title: "About Us | Sri Sri Wellbeing Chennai",
    description:
      "Learn about Sri Sri Wellbeing Chennai, an elevated Ayurvedic sanctuary where ancient wisdom is reinterpreted for the discerning modern lifestyle.",
  });
}

export default function AboutUsPage() {
  return (
    <>
      <PageHero
        heroImage="/banner/about-web.png"
        mobileImage="/banner/about-mob.png"
        heroImageAlt="About Sri Sri Wellbeing"
      />
      <AboutContent />
    </>
  );
}

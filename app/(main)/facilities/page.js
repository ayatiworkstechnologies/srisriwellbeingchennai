import FacilitiesPageContent from "@/components/Facilities/FacilitiesPageContent";
import PageHero from "@/components/layouts/PageHero";
import { getPageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return getPageMetadata("facilities", {
    title:
      "Facilities at Sri Sri Well Being | Holistic Healing & Wellness Spaces",
    description:
      "Explore thoughtfully designed facilities at Sri Sri Well Being including wellness spaces, Ayurveda care, pharmacy, yoga studio, elderly-friendly infrastructure, and holistic healing support.",
  });
}

export default function FacilitiesPage() {
  return (
    <>
      <PageHero
        heroImage="/banner/facilities-web.png"
        mobileImage="/banner/facilities-mob.png"
        heroImageAlt="Facilities at Sri Sri Wellbeing"
      />
      <FacilitiesPageContent />
    </>
  );
}
